"use client";

import Link from "next/link";

const actions = [
  { label: "Add product", emoji: "📦", href: "/seller/products/new" },
  { label: "Create discount", emoji: "🏷️", href: "/seller/promotions/new" },
  { label: "View analytics", emoji: "📊", href: "/seller/analytics" },
  { label: "Request payout", emoji: "💳", href: "/seller/payouts" },
];

export default function QuickActions() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 10,
        marginBottom: 20,
      }}
    >
      {actions.map((a) => (
        <Link key={a.href} href={a.href} style={{ textDecoration: "none" }}>
          <div
            style={{
              background: "white",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "14px",
              textAlign: "center",
              cursor: "pointer",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor = "var(--teal)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")
            }
          >
            <div style={{ fontSize: 22, marginBottom: 6 }}>{a.emoji}</div>
            <div style={{ fontSize: 12, fontWeight: 500, color: "var(--text-dark)" }}>
              {a.label}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}