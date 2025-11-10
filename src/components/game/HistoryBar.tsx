import React from "react";

const HistoryBar: React.FC = () => {
  const mockHistory = [
    { value: 1.41, color: "blue" },
    { value: 4.77, color: "purple" },
    { value: 2.16, color: "purple" },
    { value: 1.07, color: "blue" },
    { value: 169.62, color: "red" },
    { value: 1.00, color: "blue" },
    { value: 5.86, color: "purple" },
    { value: 2.93, color: "purple" },
    { value: 1.00, color: "blue" },
    { value: 2.33, color: "purple" },
    { value: 1.16, color: "blue" },
    { value: 4.29, color: "purple" },
    { value: 3.25, color: "purple" },
    { value: 3.57, color: "purple" },
    { value: 3.98, color: "purple" },
    { value: 1.88, color: "blue" },
    { value: 1.40, color: "blue" },
  ];

  const getColorStyles = (color: string) => {
    const colors = {
      blue: { bg: "rgba(59, 130, 246, 0.2)", text: "#3B82F6", border: "none" },
      purple: { bg: "rgba(168, 85, 247, 0.2)", text: "#A855F7", border: "none" },
      red: { bg: "rgba(239, 68, 68, 0.2)", text: "#EF4444", border: "2px solid #EF4444" }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div style={{
      padding: "16px",
      background: "#1e2130",
      borderBottom: "1px solid #2a2d3e"
    }}>
      <div style={{
        display: "flex",
        gap: "6px",
        alignItems: "center",
        overflowX: "auto",
        padding: "4px 0"
      }}>
        {mockHistory.map((item, idx) => {
          const styles = getColorStyles(item.color);
          return (
            <div
              key={idx}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 700,
                whiteSpace: "nowrap",
                cursor: "pointer",
                transition: "all 0.2s",
                background: styles.bg,
                color: styles.text,
                border: styles.border
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {item.value}x
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryBar;

