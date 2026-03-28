"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";

// Later this will come from GraphQL query
const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Premium Ankara Print Dress",
    price: 18500,
    seller: { name: "StyleHaus", city: "Lagos" },
    badge: "New" as const,
    rating: 4.9,
    reviews: 84,
    emoji: "👗",
    bg: "linear-gradient(135deg, #cbd8e4, #e8f0f5)",
  },
  {
    id: "2",
    name: "Wireless Noise-Cancelling Headphones",
    price: 42000,
    originalPrice: 60000,
    seller: { name: "TechHub", city: "Abuja" },
    badge: "Sale" as const,
    rating: 4.8,
    reviews: 210,
    emoji: "🎧",
    bg: "linear-gradient(135deg, #d4e8f0, #b8d4e8)",
  },
  {
    id: "3",
    name: "Handwoven Rattan Wall Art Set",
    price: 12800,
    seller: { name: "HomeDecor", city: "Port Harcourt" },
    badge: "Hot" as const,
    rating: 4.7,
    reviews: 56,
    emoji: "🏺",
    bg: "linear-gradient(135deg, #c8e4d8, #a8d4c0)",
  },
  {
    id: "4",
    name: "Natural Skincare Essentials Kit",
    price: 8900,
    originalPrice: 14000,
    seller: { name: "GlowUp", city: "Lagos" },
    badge: "Sale" as const,
    rating: 5.0,
    reviews: 312,
    emoji: "✨",
    bg: "linear-gradient(135deg, #ead8e0, #d4b8c8)",
  },
];

const badgeColors: Record<string, { bg: string; color: string }> = {
  New: { bg: "var(--teal)", color: "white" },
  Sale: { bg: "#e05c5c", color: "white" },
  Hot: { bg: "var(--sage)", color: "white" },
};

function formatPrice(price: number) {
  return `₦${price.toLocaleString()}`;
}

export default function FeaturedProducts() {
  return (
    <section style={{ padding: "88px 48px", background: "var(--off-white)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 52,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--sage)",
                marginBottom: 10,
              }}
            >
              Handpicked
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 38,
                fontWeight: 700,
                color: "var(--text-dark)",
              }}
            >
              Featured Products
            </h2>
          </div>
          <Link
            href="/products"
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "var(--teal)",
              borderBottom: "1px solid var(--teal)",
              paddingBottom: 2,
            }}
          >
            View all →
          </Link>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          }}
        >
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: (typeof MOCK_PRODUCTS)[0] }) {
  const [wished, setWished] = useState(false);
  const [hovered, setHovered] = useState(false);
  const badge = badgeColors[product.badge];
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        border: "1px solid var(--border)",
        cursor: "pointer",
        transition: "transform 0.3s, box-shadow 0.3s",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "var(--shadow-lg)" : "none",
      }}
    >
      {/* Image */}
      <div style={{ aspectRatio: "1", position: "relative", overflow: "hidden" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: product.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 64,
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        >
          {product.emoji}
        </div>

        {/* Badge */}
        <span
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "5px 12px",
            borderRadius: 20,
            background: badge.bg,
            color: badge.color,
          }}
        >
          {discount ? `−${discount}%` : product.badge}
        </span>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setWished(!wished);
          }}
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
            transition: "opacity 0.2s",
            opacity: hovered || wished ? 1 : 0,
            color: wished ? "#e05c5c" : "var(--text-mid)",
          }}
        >
          <Heart size={16} fill={wished ? "#e05c5c" : "none"} />
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: 18 }}>
        <div
          style={{
            fontSize: 11,
            color: "var(--text-light)",
            letterSpacing: "0.05em",
            marginBottom: 6,
            textTransform: "uppercase",
          }}
        >
          {product.seller.name} · {product.seller.city}
        </div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "var(--text-dark)",
            marginBottom: 12,
            lineHeight: 1.4,
          }}
        >
          {product.name}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <div>
            <span
              style={{ fontSize: 18, fontWeight: 700, color: "var(--teal)" }}
            >
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span
                style={{
                  fontSize: 12,
                  color: "var(--text-light)",
                  textDecoration: "line-through",
                  marginLeft: 6,
                }}
              >
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "var(--text-light)",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span style={{ color: "var(--sage)" }}>★</span>
            {product.rating} ({product.reviews})
          </div>
        </div>

        <button
          style={{
            width: "100%",
            background: "var(--teal)",
            color: "white",
            padding: "12px",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.04em",
            transition: "background 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "var(--teal-dark)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "var(--teal)")
          }
        >
          <ShoppingCart size={15} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}