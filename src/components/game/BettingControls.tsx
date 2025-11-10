import React from "react";
import BettingPanel from "./BettingPanel";
import { useBalloonFlyContext } from "../../contexts/BalloonFlyContext";

const BettingControls: React.FC = () => {
  const { placeBet, cashOut, userBet, loading, error, isFlying } = useBalloonFlyContext();

  const handleBet1 = async (amount: number) => {
    try {
      await placeBet(amount);
    } catch (err) {
      console.error("Error placing bet:", err);
    }
  };

  const handleBet2 = async (amount: number) => {
    try {
      await placeBet(amount);
    } catch (err) {
      console.error("Error placing bet:", err);
    }
  };

  const handleCashOut1 = async () => {
    try {
      await cashOut();
    } catch (err) {
      console.error("Error cashing out:", err);
    }
  };

  const handleCashOut2 = async () => {
    try {
      await cashOut();
    } catch (err) {
      console.error("Error cashing out:", err);
    }
  };

  const hasActiveBet = userBet && userBet.status === "Active" && isFlying;

  return (
    <div style={{
      padding: "20px",
      background: "#1e2130",
      borderTop: "1px solid #2a2d3e"
    }}>
      {/* Error Message */}
      {error && (
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto 16px",
          padding: "12px 16px",
          background: "rgba(239, 68, 68, 0.1)",
          border: "1px solid #EF4444",
          borderRadius: "8px",
          color: "#EF4444",
          fontSize: "14px",
          textAlign: "center"
        }}>
          ⚠️ {error}
        </div>
      )}

      <div style={{
        display: "flex",
        gap: "16px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        <BettingPanel 
          isActive={hasActiveBet || false}
          onBet={handleBet1}
          onCashOut={handleCashOut1}
          loading={loading}
        />
        <BettingPanel 
          isActive={hasActiveBet || false}
          onBet={handleBet2}
          onCashOut={handleCashOut2}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default BettingControls;
