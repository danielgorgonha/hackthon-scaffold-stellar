import React, { useState } from "react";

const BetsSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"bets" | "previous" | "top">("bets");

  const mockBets = [
    { player: "GBZXN...MADI", amount: 10.0, multiplier: null, payout: null, avatar: "🎈" },
    { player: "GCZJM...XPTO", amount: 50.0, multiplier: 3.59, payout: 179.5, avatar: "🎯" },
    { player: "GDABC...KLMN", amount: 25.0, multiplier: null, payout: null, avatar: "⭐" },
    { player: "GDEFG...HIJK", amount: 100.0, multiplier: 1.22, payout: 122.0, avatar: "💎" },
    { player: "GHIJK...LMNO", amount: 75.5, multiplier: 12.11, payout: 914.3, avatar: "🚀" },
    { player: "GLMNO...PQRS", amount: 30.0, multiplier: 5.30, payout: 159.0, avatar: "🌟" },
    { player: "GPQRS...TUVW", amount: 15.0, multiplier: 4.16, payout: 62.4, avatar: "🎲" },
    { player: "GTUVW...XYZA", amount: 200.0, multiplier: 1.85, payout: 370.0, avatar: "🏆" },
  ];

  const getMultiplierColor = (mult: number | null) => {
    if (!mult) return "";
    if (mult < 2.0) return "#3B82F6";
    if (mult < 10.0) return "#A855F7";
    return "#EF4444";
  };

  return (
    <div style={{
      width: "340px",
      background: "#1e2130",
      borderRight: "1px solid #2a2d3e",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Navigation Tabs */}
      <div style={{
        display: "flex",
        background: "#252837",
        padding: "8px",
        gap: "4px"
      }}>
        {(["bets", "previous", "top"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: "10px 16px",
              background: activeTab === tab ? "#1e2130" : "transparent",
              border: "none",
              color: activeTab === tab ? "#fff" : "#8b8fa3",
              cursor: "pointer",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: 500,
              transition: "all 0.2s"
            }}
          >
            {tab === "bets" ? "Bets" : tab === "previous" ? "Previous" : "Top"}
          </button>
        ))}
      </div>

      {/* Total Win Widget */}
      <div style={{
        background: "linear-gradient(135deg, #2d1b4e 0%, #1e1535 100%)",
        padding: "16px",
        margin: "12px",
        borderRadius: "12px"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <div style={{ display: "flex", gap: "4px" }}>
            {["🎈", "🎯", "⭐"].map((emoji, i) => (
              <div key={i} style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "2px solid #1e2130",
                background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                marginLeft: i > 0 ? "-10px" : "0"
              }}>
                {emoji}
              </div>
            ))}
          </div>
          <span style={{ fontSize: "24px", fontWeight: 700, color: "#fff" }}>30,887.08</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#8b8fa3" }}>
          <span><strong style={{ color: "#fff" }}>1746/4471</strong> Bets</span>
          <span>Total Prize XLM</span>
        </div>
        <div style={{
          height: "4px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "2px",
          marginTop: "12px",
          overflow: "hidden"
        }}>
          <div style={{
            height: "100%",
            background: "linear-gradient(90deg, #7c3aed 0%, #a78bfa 100%)",
            width: "60.9%",
            borderRadius: "2px",
            transition: "width 0.3s"
          }} />
        </div>
      </div>

      {/* Bets List Header */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        padding: "12px 16px",
        background: "#252837",
        fontSize: "11px",
        color: "#8b8fa3",
        textTransform: "uppercase",
        fontWeight: 600
      }}>
        <span>Player</span>
        <span>Bet</span>
        <span>X</span>
        <span>Prize</span>
      </div>

      {/* Bets List */}
      <div style={{
        flex: 1,
        overflowY: "auto"
      }}>
        {mockBets.map((bet, idx) => (
          <div
            key={idx}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              padding: "12px 16px",
              borderBottom: "1px solid #252837",
              alignItems: "center",
              background: bet.payout ? "rgba(124, 58, 237, 0.05)" : "transparent",
              transition: "background 0.2s"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px"
              }}>
                {bet.avatar}
              </div>
              <span style={{ fontSize: "11px", color: "#fff", fontFamily: "'Courier New', monospace" }}>
                {bet.player}
              </span>
            </div>
            <span style={{ fontSize: "13px", color: "#8b8fa3" }}>{bet.amount}</span>
            <span style={{ fontSize: "13px", color: bet.multiplier ? getMultiplierColor(bet.multiplier) : "#8b8fa3", fontWeight: bet.multiplier ? 600 : 400 }}>
              {bet.multiplier ? `${bet.multiplier}x` : ""}
            </span>
            <span style={{ fontSize: "13px", color: bet.payout ? "#10b981" : "#8b8fa3", fontWeight: bet.payout ? 600 : 400 }}>
              {bet.payout || ""}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        padding: "12px 16px",
        background: "#252837",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: "1px solid #2a2d3e"
      }}>
        <button style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 12px",
          background: "transparent",
          border: "1px solid #3a3f5c",
          borderRadius: "6px",
          color: "#8b8fa3",
          fontSize: "11px",
          cursor: "pointer",
          transition: "all 0.2s"
        }}>
          🔒 Provably Fair Game
        </button>
        <span style={{ color: "#8b8fa3", fontSize: "11px" }}>Powered by Stellar</span>
      </div>
    </div>
  );
};

export default BetsSidebar;

