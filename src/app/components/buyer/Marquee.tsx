const items = [
    "Free delivery on orders over ₦50,000",
    "Verified sellers only",
    "Secure Paystack payments",
    "30-day easy returns",
    "New products daily",
    "Buyer protection guaranteed",
  ];
  
  export default function Marquee() {
    const doubled = [...items, ...items];
  
    return (
      <div
        style={{
          background: "var(--off-white)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "14px 0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            animation: "marquee 22s linear infinite",
            whiteSpace: "nowrap",
          }}
        >
          {doubled.map((item, i) => (
            <span
              key={i}
              style={{
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-mid)",
                padding: "0 28px",
                display: "inline-flex",
                alignItems: "center",
                gap: 28,
              }}
            >
              {item}
              <span style={{ fontSize: 7, color: "var(--sage)" }}>◆</span>
            </span>
          ))}
        </div>
      </div>
    );
  }