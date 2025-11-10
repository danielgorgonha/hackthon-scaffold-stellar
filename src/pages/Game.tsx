import React from "react";
import { useWallet } from "../hooks/useWallet";
import { useNavigate } from "react-router-dom";
import BetsSidebar from "../components/game/BetsSidebar";
import GameCanvas from "../components/game/GameCanvas";
import HistoryBar from "../components/game/HistoryBar";
import BettingControls from "../components/game/BettingControls";

const Game: React.FC = () => {
  const { address } = useWallet();
  const navigate = useNavigate();

  // Redirect to home if not connected
  React.useEffect(() => {
    if (!address) {
      navigate("/");
    }
  }, [address, navigate]);

  if (!address) {
    return null; // or loading spinner
  }

  return (
    <div style={{
      display: "flex",
      height: "calc(100vh - 120px)", // Adjust for header/footer
      position: "relative",
      background: "#0a0e1a"
    }}>
      <BetsSidebar />
      
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "#1a1d29"
      }}>
        <HistoryBar />
        <GameCanvas />
        <BettingControls />
      </div>
    </div>
  );
};

export default Game;

