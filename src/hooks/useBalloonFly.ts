import { useState, useEffect, useCallback } from "react";
import { useWallet } from "./useWallet";
import balloonFlyClient from "../contracts/balloonfly";

// Types matching the Rust contract
export enum RoundStatus {
  Waiting = "Waiting",
  InProgress = "InProgress",
  Ended = "Ended",
}

export enum BetStatus {
  Active = "Active",
  CashedOut = "CashedOut",
  Lost = "Lost",
}

export interface Round {
  id: bigint;
  status: RoundStatus;
  server_seed_hash: Buffer;
  crash_multiplier: bigint;
  created_at: bigint;
  started_at: bigint;
  ended_at: bigint;
  total_bet_amount: bigint;
  total_payout: bigint;
  bet_count: number;
  client_seeds: Buffer[];
}

export interface Bet {
  id: bigint;
  round_id: bigint;
  player: string;
  amount: bigint;
  cash_out_multiplier: bigint;
  payout: bigint;
  status: BetStatus;
  timestamp: bigint;
}

export interface Pool {
  total_bets: bigint;
  total_payouts: bigint;
  total_house_earnings: bigint;
}

interface UseBalloonFlyReturn {
  // State
  currentRound: Round | null;
  currentMultiplier: number;
  isFlying: boolean;
  userBet: Bet | null;
  pool: Pool | null;
  loading: boolean;
  error: string | null;

  // Actions
  placeBet: (amount: number) => Promise<void>;
  cashOut: () => Promise<void>;
  
  // Utilities
  formatXLM: (stroops: bigint) => string;
  multiplierToNumber: (mult: bigint) => number;
}

export const useBalloonFly = (): UseBalloonFlyReturn => {
  const { address } = useWallet();
  
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const [currentMultiplier, setCurrentMultiplier] = useState(1.0);
  const [isFlying, setIsFlying] = useState(false);
  const [userBet, setUserBet] = useState<Bet | null>(null);
  const [pool, setPool] = useState<Pool | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Utility functions
  const formatXLM = useCallback((stroops: bigint): string => {
    return (Number(stroops) / 10_000_000).toFixed(2);
  }, []);

  const multiplierToNumber = useCallback((mult: bigint): number => {
    return Number(mult) / 100;
  }, []);

  // Fetch pool statistics
  const fetchPool = useCallback(async () => {
    try {
      const poolData = await balloonFlyClient.get_pool();
      setPool(poolData.result);
    } catch (err) {
      console.error("Error fetching pool:", err);
    }
  }, []);

  // Fetch current round
  const fetchCurrentRound = useCallback(async (roundId: bigint) => {
    try {
      const roundData = await balloonFlyClient.get_round({ round_id: roundId });
      setCurrentRound(roundData.result);
      
      // Update flying state based on round status
      if (roundData.result.status === RoundStatus.InProgress) {
        setIsFlying(true);
      } else {
        setIsFlying(false);
      }
    } catch (err) {
      console.error("Error fetching round:", err);
    }
  }, []);

  // Place bet
  const placeBet = useCallback(async (amount: number) => {
    if (!address) {
      setError("Please connect your wallet");
      return;
    }

    if (!currentRound) {
      setError("No active round");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const amountInStroops = BigInt(Math.floor(amount * 10_000_000));
      
      // Generate random client seed
      const clientSeed = new Uint8Array(32);
      crypto.getRandomValues(clientSeed);
      
      const result = await balloonFlyClient.place_bet({
        player: address,
        round_id: currentRound.id,
        amount: amountInStroops,
        client_seed: Buffer.from(clientSeed),
      });

      console.log("Bet placed:", result);
      
      // Fetch the bet details
      if (result.result) {
        const betId = result.result;
        const betData = await balloonFlyClient.get_bet({ bet_id: betId });
        setUserBet(betData.result);
      }

      // Refresh round data
      await fetchCurrentRound(currentRound.id);
    } catch (err: any) {
      console.error("Error placing bet:", err);
      setError(err.message || "Failed to place bet");
    } finally {
      setLoading(false);
    }
  }, [address, currentRound, fetchCurrentRound]);

  // Cash out
  const cashOut = useCallback(async () => {
    if (!address) {
      setError("Please connect your wallet");
      return;
    }

    if (!userBet || userBet.status !== BetStatus.Active) {
      setError("No active bet to cash out");
      return;
    }

    if (!isFlying) {
      setError("Round is not in progress");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const currentMultiplierInContract = BigInt(Math.floor(currentMultiplier * 100));
      
      const result = await balloonFlyClient.cash_out({
        player: address,
        bet_id: userBet.id,
        current_multiplier: currentMultiplierInContract,
      });

      console.log("Cashed out:", result);
      
      // Refresh bet data
      const betData = await balloonFlyClient.get_bet({ bet_id: userBet.id });
      setUserBet(betData.result);

      // Refresh round data
      if (currentRound) {
        await fetchCurrentRound(currentRound.id);
      }
    } catch (err: any) {
      console.error("Error cashing out:", err);
      setError(err.message || "Failed to cash out");
    } finally {
      setLoading(false);
    }
  }, [address, userBet, isFlying, currentMultiplier, currentRound, fetchCurrentRound]);

  // Simulate multiplier increase (in production, this would come from contract events)
  useEffect(() => {
    if (!isFlying) {
      setCurrentMultiplier(1.0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentMultiplier((prev) => {
        const newMult = prev + 0.01;
        
        // Check if crashed
        if (currentRound && currentRound.crash_multiplier > 0) {
          const crashMult = multiplierToNumber(currentRound.crash_multiplier);
          if (newMult >= crashMult) {
            setIsFlying(false);
            return crashMult;
          }
        }
        
        return newMult;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isFlying, currentRound, multiplierToNumber]);

  // Fetch pool on mount
  useEffect(() => {
    fetchPool();
    
    // Refresh pool every 10 seconds
    const interval = setInterval(fetchPool, 10000);
    return () => clearInterval(interval);
  }, [fetchPool]);

  return {
    currentRound,
    currentMultiplier,
    isFlying,
    userBet,
    pool,
    loading,
    error,
    placeBet,
    cashOut,
    formatXLM,
    multiplierToNumber,
  };
};

