import React, { useState, useEffect } from "react";

const GameCanvas: React.FC = () => {
  const [multiplier, setMultiplier] = useState(1.0);
  const [isFlying, setIsFlying] = useState(false);
  const [balloonEmoji, setBalloonEmoji] = useState("🎈");
  const [statusMessage, setStatusMessage] = useState("🎈 Waiting for bets...");

  const getMultiplierColor = (mult: number) => {
    if (mult < 2.0) return "#3B82F6";
    if (mult < 10.0) return "#A855F7";
    return "#EF4444";
  };

  useEffect(() => {
    // Simulate game loop
    const startGame = () => {
      setIsFlying(true);
      setStatusMessage("");
      setBalloonEmoji("🎈");
      setMultiplier(1.0);
      
      const interval = setInterval(() => {
        setMultiplier((prev) => {
          const newMult = prev + 0.01;
          
          // Random crash
          if (newMult >= 5.0 && Math.random() < 0.02) {
            clearInterval(interval);
            setBalloonEmoji("💥");
            setIsFlying(false);
            
            setTimeout(() => {
              setMultiplier(1.0);
              setBalloonEmoji("🎈");
              setStatusMessage("🎈 Waiting for bets...");
              setTimeout(startGame, 3000);
            }, 2000);
          }
          
          return newMult;
        });
      }, 100);
    };

    setTimeout(startGame, 3000);
  }, []);

  return (
    <div style={{
      flex: 1,
      position: "relative",
      background: "linear-gradient(135deg, #1a1d29 0%, #2d1b4e 50%, #1a1d29 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      {/* Multiplier Display */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "140px",
        fontWeight: 900,
        color: getMultiplierColor(multiplier),
        textShadow: `0 0 40px ${getMultiplierColor(multiplier)}`,
        zIndex: 10,
        transition: "all 0.1s"
      }}>
        {multiplier.toFixed(2)}x
      </div>

      {/* Balloon */}
      <div style={{
        position: "absolute",
        bottom: "30%",
        left: "35%",
        fontSize: "120px",
        filter: `drop-shadow(0 0 20px ${getMultiplierColor(multiplier)})`,
        color: getMultiplierColor(multiplier),
        animation: balloonEmoji === "🎈" ? "float 3s ease-in-out infinite" : "none"
      }}>
        {balloonEmoji}
      </div>

      {/* Status Message */}
      {statusMessage && (
        <div style={{
          position: "absolute",
          top: "80px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(139, 92, 246, 0.2)",
          backdropFilter: "blur(10px)",
          padding: "16px 32px",
          borderRadius: "12px",
          border: "2px solid #8b5cf6",
          fontSize: "24px",
          fontWeight: 700,
          color: "#8b5cf6",
          animation: "bounce 2s ease-in-out infinite"
        }}>
          {statusMessage}
        </div>
      )}

      {/* Active Players Widget */}
      <div style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        background: "rgba(30, 33, 48, 0.9)",
        padding: "12px 16px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        backdropFilter: "blur(10px)"
      }}>
        <div style={{ display: "flex", gap: "4px" }}>
          {["🎈", "🎯", "⭐"].map((emoji, i) => (
            <div key={i} style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              border: "2px solid #1e2130",
              background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              marginLeft: i > 0 ? "-8px" : "0"
            }}>
              {emoji}
            </div>
          ))}
        </div>
        <span style={{ fontSize: "16px", fontWeight: 700, color: "#fff" }}>2,367</span>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default GameCanvas;

