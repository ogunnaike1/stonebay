type Props = {
    label: string;
    value: string;
    sub?: string;
    subColor?: "up" | "down" | "neutral";
  };
  
  const subColors = {
    up: "#0F6E56",
    down: "#A32D2D",
    neutral: "var(--text-light)",
  };
  
  export default function StatCard({ label, value, sub, subColor = "neutral" }: Props) {
    return (
      <div
        style={{
          background: "var(--off-white)",
          borderRadius: "var(--radius-md)",
          padding: "14px 16px",
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: "var(--text-mid)",
            marginBottom: 6,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 500,
            color: "var(--text-dark)",
          }}
        >
          {value}
        </div>
        {sub && (
          <div
            style={{
              fontSize: 11,
              color: subColors[subColor],
              marginTop: 3,
            }}
          >
            {sub}
          </div>
        )}
      </div>
    );
  }