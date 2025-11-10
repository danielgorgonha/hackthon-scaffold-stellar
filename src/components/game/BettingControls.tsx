import React from "react";
import BettingPanel from "./BettingPanel";

const BettingControls: React.FC = () => {
  const handleBet = (amount: number) => {
    console.log(`Bet placed: ${amount} XLM`);
    // TODO: Integrate with contract
  };

  const handleCashOut = () => {
    console.log("Cash out!");
    // TODO: Integrate with contract
  };

  return (
    <div style={{
      padding: "20px",
      background: "#1e2130",
      borderTop: "1px solid #2a2d3e"
    }}>
      <div style={{
        display: "flex",
        gap: "16px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        <BettingPanel 
          panelNumber={1}
          isActive={false}
          onBet={handleBet}
        />
        <BettingPanel 
          panelNumber={2}
          isActive={true}
          onCashOut={handleCashOut}
        />
      </div>
    </div>
  );
};

export default BettingControls;

