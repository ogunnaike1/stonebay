import Link from "next/link";

const payouts = [
  { date: "Mar 15, 2026", amount: "₦320,000", status: "Paid" },
  { date: "Mar 1, 2026", amount: "₦285,000", status: "Paid" },
  { date: "Feb 15, 2026", amount: "₦410,000", status: "Paid" },
  { date: "Mar 31, 2026", amount: "₦218,000", status: "Pending" },
];

export default function PayoutHistory() {
  return (
    <div
      style={{
        background: "white",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "16px 18px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-dark)" }}>
          Payout history
        </div>
        <Link href="/seller/payouts" style={{ fontSize: 12, color: "var(--teal)" }}>
          All →
        </Link>
      </div>

      {payouts.map((p, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "9px 0",
            borderBottom: i < payouts.length - 1 ? "1px solid var(--border)" : "none",
          }}
        >
          <div>
            <div style={{ fontSize: 12, color: "var(--text-mid)" }}>{p.date}</div>
            <div
              style={{
                fontSize: 11,
                marginTop: 2,
                color: p.status === "Paid" ? "#0F6E56" : "#854F0B",
              }}
            >
              {p.status === "Paid" ? "✓ Paid" : "⏳ Pending"}
            </div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-dark)" }}>
            {p.amount}
          </div>
        </div>
      ))}

      <div
        style={{
          marginTop: 14,
          paddingTop: 14,
          borderTop: "1px solid var(--border)",
        }}
      >
        <Link href="/seller/payouts">
          <button
            style={{
              width: "100%",
              padding: "10px",
              background: "var(--teal)",
              color: "white",
              border: "none",
              borderRadius: "var(--radius-sm)",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "var(--teal-dark)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "var(--teal)")
            }
          >
            Request payout
          </button>
        </Link>
      </div>
    </div>
  );
}