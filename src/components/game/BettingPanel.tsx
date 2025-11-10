import React, { useState } from "react";

interface BettingPanelProps {
  panelNumber: number;
  isActive?: boolean;
  onBet?: (amount: number) => void;
  onCashOut?: () => void;
}

const BettingPanel: React.FC<BettingPanelProps> = ({ 
  panelNumber, 
  isActive = false,
  onBet,
  onCashOut 
}) => {
  const [betAmount, setBetAmount] = useState(1.0);
  const [activeTab, setActiveTab] = useState<"manual" | "auto">("manual");

  const quickAmounts = [10, 20, 50, 100];

  const handleIncrement = () => {
    setBetAmount(prev => prev + 1.0);
  };

  const handleDecrement = () => {
    setBetAmount(prev => Math.max(1.0, prev - 1.0));
  };

  const handleQuickAmount = (amount: number) => {
    setBetAmount(amount);
  };

  const handleAction = () => {
    if (isActive && onCashOut) {
      onCashOut();
    } else if (onBet) {
      onBet(betAmount);
    }
  };

  return (
    <div style={{
      flex: 1,
      background: "#252837",
      borderRadius: "12px",
      padding: "20px"
    }}>
      {/* Tabs */}
      <div style={{
        display: "flex",
        background: "#1e2130",
        padding: "4px",
        gap: "4px",
        borderRadius: "8px",
        marginBottom: "16px"
      }}>
        <button
          onClick={() => setActiveTab("manual")}
          style={{
            flex: 1,
            padding: "10px 16px",
            background: activeTab === "manual" ? "#252837" : "transparent",
            border: "none",
            color: activeTab === "manual" ? "#fff" : "#8b8fa3",
            cursor: "pointer",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: 500,
            transition: "all 0.2s"
          }}
        >
          Bet
        </button>
        <button
          onClick={() => setActiveTab("auto")}
          style={{
            flex: 1,
            padding: "10px 16px",
            background: activeTab === "auto" ? "#252837" : "transparent",
            border: "none",
            color: activeTab === "auto" ? "#fff" : "#8b8fa3",
            cursor: "pointer",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: 500,
            transition: "all 0.2s"
          }}
        >
          Auto
        </button>
      </div>

      <div style={{
        display: "flex",
        gap: "16px",
        alignItems: "flex-end"
      }}>
        {/* Bet Amount Section */}
        <div style={{ flex: 1 }}>
          <div style={{
            color: "#8b8fa3",
            fontSize: "14px",
            fontWeight: 600,
            marginBottom: "8px"
          }}>
            Bet Amount (XLM)
          </div>

          {/* Spinner */}
          <div style={{
            background: "#1e2130",
            borderRadius: "8px",
            padding: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "12px",
            border: "2px solid #3a3f5c"
          }}>
            <button
              onClick={handleDecrement}
              style={{
                width: "36px",
                height: "36px",
                background: "#3a3f5c",
                border: "none",
                borderRadius: "6px",
                color: "#fff",
                cursor: "pointer",
                fontSize: "20px",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#8b5cf6";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#3a3f5c";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              −
            </button>
            <input
              type="text"
              value={betAmount.toFixed(2)}
              readOnly
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "20px",
                fontWeight: 600,
                width: "120px",
                textAlign: "center",
                outline: "none"
              }}
            />
            <button
              onClick={handleIncrement}
              style={{
                width: "36px",
                height: "36px",
                background: "#3a3f5c",
                border: "none",
                borderRadius: "6px",
                color: "#fff",
                cursor: "pointer",
                fontSize: "20px",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#8b5cf6";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#3a3f5c";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              +
            </button>
          </div>

          {/* Quick Amount Buttons */}
          <div style={{
            display: "flex",
            gap: "8px"
          }}>
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => handleQuickAmount(amount)}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "#3a3f5c",
                  border: "none",
                  borderRadius: "6px",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#8b5cf6";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#3a3f5c";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {amount}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div style={{ flex: 1 }}>
          <button
            onClick={handleAction}
            style={{
              width: "100%",
              padding: "18px",
              background: isActive 
                ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              animation: isActive ? "pulse 1s ease-in-out infinite" : "none"
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(16, 185, 129, 0.3)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }
            }}
          >
            <span style={{
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              {isActive ? "💰 Cash Out Now!" : "Bet"}
            </span>
            <span style={{
              fontSize: "18px",
              fontWeight: 700
            }}>
              {isActive ? "1.06 XLM" : `${betAmount.toFixed(2)} XLM`}
            </span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default BettingPanel;

