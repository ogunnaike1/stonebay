"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";

const products = [
  { id: "1", name: "Men's Agbada Set", price: "₦22,000", rating: "★★★★★", reviews: 42, emoji: "👔", bg: "#e8f0f5" },
  { id: "2", name: "Luxury Scented Candle", price: "₦5,500", rating: "★★★★☆", reviews: 89, emoji: "🕯️", bg: "#f0ece0" },
  { id: "3", name: "Leather Crossbody Bag", price: "₦28,000", rating: "★★★★★", reviews: 67, emoji: "👜", bg: "#ede8f0" },
  { id: "4", name: "Non-stick Cookware Set", price: "₦15,900", rating: "★★★★☆", reviews: 114, emoji: "🍳", bg: "#e0f0e8" },
];

export default function RecommendedProducts() {
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
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-dark)" }}>
          Recommended for you
        </div>
        <Link href="/products" style={{ fontSize: 12, color: "var(--teal)" }}>
          See more →
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {products.map((p) => (
          <ProductMiniCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

function ProductMiniCard({ product }: { product: (typeof products)[0] }) {
  const [wished, setWished] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 0.2s, transform 0.2s",
        borderColor: hovered ? "var(--teal)" : "var(--border)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <div
        style={{
          height: 80,
          background: product.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 32,
          position: "relative",
        }}
      >
        {product.emoji}
        <button
          onClick={(e) => { e.stopPropagation(); setWished(!wished); }}
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            opacity: hovered || wished ? 1 : 0,
            transition: "opacity 0.2s",
            color: wished ? "#e05c5c" : "var(--text-mid)",
          }}
        >
          <Heart size={13} fill={wished ? "#e05c5c" : "none"} />
        </button>
      </div>
      <div style={{ padding: "10px" }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: "var(--text-dark)",
            lineHeight: 1.35,
            marginBottom: 4,
          }}
        >
          {product.name}
        </div>
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--teal)", marginBottom: 4 }}>
          {product.price}
        </div>
        <div style={{ fontSize: 11, color: "var(--text-light)" }}>
          {product.rating} ({product.reviews})
        </div>
        <button
          style={{
            width: "100%",
            marginTop: 8,
            padding: "7px",
            background: "var(--teal)",
            color: "white",
            border: "none",
            borderRadius: "var(--radius-sm)",
            fontSize: 11,
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "var(--teal-dark)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "var(--teal)")
          }
        >
          <ShoppingCart size={12} />
          Add to cart
        </button>
      </div>
    </div>
  );
}