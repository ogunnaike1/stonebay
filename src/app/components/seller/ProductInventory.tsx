"use client";
import Link from "next/link";

const products = [
  { name: "Premium Ankara Dress", sku: "SKU-001", category: "Fashion", stock: 32, price: "₦18,500", emoji: "👗" },
  { name: "Men's Agbada Set", sku: "SKU-002", category: "Fashion", stock: 4, price: "₦22,000", emoji: "👔" },
  { name: "Sneakers Pro Max", sku: "SKU-003", category: "Footwear", stock: 0, price: "₦35,000", emoji: "👟" },
  { name: "Leather Crossbody Bag", sku: "SKU-004", category: "Accessories", stock: 18, price: "₦28,000", emoji: "👜" },
];

function stockLabel(stock: number) {
  if (stock === 0) return { label: "Out of stock", color: "#A32D2D" };
  if (stock <= 5) return { label: `${stock} left`, color: "#854F0B" };
  return { label: `${stock} in stock`, color: "#0F6E56" };
}

export default function ProductInventory() {
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
          Product inventory
        </div>
        <Link href="/seller/products" style={{ fontSize: 12, color: "var(--teal)" }}>
          Manage all →
        </Link>
      </div>

      {products.map((p, i) => {
        const { label, color } = stockLabel(p.stock);
        return (
          <div
            key={p.sku}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "9px 0",
              borderBottom: i < products.length - 1 ? "1px solid var(--border)" : "none",
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "var(--radius-sm)",
                background: "var(--off-white)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              {p.emoji}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--text-dark)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {p.name}
              </div>
              <div style={{ fontSize: 11, color: "var(--text-light)" }}>
                {p.sku} · {p.category}
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color }}>{label}</div>
              <div style={{ fontSize: 11, color: "var(--text-light)", marginTop: 1 }}>
                {p.price}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}