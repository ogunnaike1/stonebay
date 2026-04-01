"use client";

import Link from "next/link";

const items = [
  { name: "Sneakers Pro Max", price: "₦35,000", emoji: "👟" },
  { name: "Rattan Wall Art", price: "₦12,800", emoji: "🏺" },
  { name: "Gold Earring Set", price: "₦9,500", emoji: "💍" },
  { name: "Smart Watch", price: "₦89,000", emoji: "⌚" },
];

export default function WishlistPreview() {
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
          Wishlist
        </div>
        <Link href="/account/wishlist" style={{ fontSize: 12, color: "var(--teal)" }}>
          View all →
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {items.map((item) => (
          <div
            key={item.name}
            style={{
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "10px",
              display: "flex",
              gap: 10,
              alignItems: "center",
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
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "var(--radius-sm)",
                background: "var(--off-white)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              {item.emoji}
            </div>
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--text-dark)",
                  lineHeight: 1.3,
                }}
              >
                {item.name}
              </div>
              <div
                style={{ fontSize: 13, fontWeight: 500, color: "var(--teal)", marginTop: 2 }}
              >
                {item.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}