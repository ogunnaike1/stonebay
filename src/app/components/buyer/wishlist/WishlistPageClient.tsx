"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardTopbar from "../../shared/DashboardTopbar";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

const INIT_ITEMS = [
  { id: "1", name: "Sneakers Pro Max", seller: "KickZone", price: 35000, originalPrice: null, rating: 4.7, reviews: 156, emoji: "👟", bg: "#e8f0f5", inStock: true },
  { id: "2", name: "Rattan Wall Art Set", seller: "HomeDecor", price: 12800, originalPrice: null, rating: 4.7, reviews: 56, emoji: "🏺", bg: "#c8e4d8", inStock: true },
  { id: "3", name: "Gold Earring Set", seller: "GoldSmith", price: 9500, originalPrice: 14000, rating: 4.9, reviews: 88, emoji: "💍", bg: "#f0e8d0", inStock: true },
  { id: "4", name: "Smart Watch Pro", seller: "TechHub", price: 89000, originalPrice: null, rating: 4.6, reviews: 128, emoji: "⌚", bg: "#d8e0e8", inStock: false },
  { id: "5", name: "Leather Crossbody Bag", seller: "LeatherCo", price: 28000, originalPrice: 38000, rating: 4.8, reviews: 67, emoji: "👜", bg: "#ede8f0", inStock: true },
  { id: "6", name: "Scented Candle Gift Set", seller: "HomeDecor", price: 5500, originalPrice: null, rating: 4.5, reviews: 89, emoji: "🕯️", bg: "#f0ece0", inStock: true },
];

export default function WishlistPageClient() {
  const [items, setItems] = useState(INIT_ITEMS);

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <>
      <DashboardTopbar title="My Wishlist" />
      <div style={{ padding: "24px 28px" }}>
        {/* Summary bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ fontSize: 14, color: "var(--text-mid)" }}>
            {items.length} saved items · {items.filter((i) => !i.inStock).length} out of stock
          </div>
          <button style={{ padding: "9px 18px", background: "var(--teal)", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 7 }}>
            <ShoppingCart size={14} /> Add all to cart
          </button>
        </div>

        {items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
            <Heart size={48} color="var(--text-light)" style={{ margin: "0 auto 16px" }} />
            <div style={{ fontSize: 18, fontWeight: 500, color: "var(--text-dark)", marginBottom: 8 }}>Your wishlist is empty</div>
            <p style={{ fontSize: 14, color: "var(--text-mid)", marginBottom: 24 }}>Save items you love and come back to them later.</p>
            <Link href="/products">
              <button style={{ background: "var(--teal)", color: "white", border: "none", padding: "12px 28px", borderRadius: "var(--radius-sm)", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                Browse products
              </button>
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {items.map((item) => {
              const discount = item.originalPrice ? Math.round((1 - item.price / item.originalPrice) * 100) : null;
              return (
                <WishCard key={item.id} item={item} discount={discount} onRemove={() => removeItem(item.id)} />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

function WishCard({ item, discount, onRemove }: { item: typeof INIT_ITEMS[0]; discount: number | null; onRemove: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", overflow: "hidden", transition: "transform 0.2s, box-shadow 0.2s", transform: hovered ? "translateY(-3px)" : "none", boxShadow: hovered ? "var(--shadow-md)" : "none" }}
    >
      {/* Image */}
      <div style={{ height: 160, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64, position: "relative" }}>
        {item.emoji}
        {!item.inStock && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ background: "rgba(0,0,0,0.6)", color: "white", fontSize: 12, fontWeight: 600, padding: "4px 14px", borderRadius: 20 }}>Out of stock</span>
          </div>
        )}
        {discount && (
          <span style={{ position: "absolute", top: 12, left: 12, background: "#e05c5c", color: "white", fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 20 }}>−{discount}%</span>
        )}
        <button onClick={onRemove} style={{ position: "absolute", top: 12, right: 12, width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.9)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#e05c5c", opacity: hovered ? 1 : 0, transition: "opacity 0.2s" }}>
          <Trash2 size={13} />
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: "14px 16px" }}>
        <div style={{ fontSize: 11, color: "var(--text-light)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 5 }}>{item.seller}</div>
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-dark)", marginBottom: 8, lineHeight: 1.4 }}>{item.name}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div>
            <span style={{ fontSize: 17, fontWeight: 700, color: "var(--teal)" }}>₦{item.price.toLocaleString()}</span>
            {item.originalPrice && <span style={{ fontSize: 12, color: "var(--text-light)", textDecoration: "line-through", marginLeft: 6 }}>₦{item.originalPrice.toLocaleString()}</span>}
          </div>
          <span style={{ fontSize: 12, color: "var(--text-light)" }}>⭐ {item.rating} ({item.reviews})</span>
        </div>
        <button
          disabled={!item.inStock}
          style={{ width: "100%", padding: "10px", background: item.inStock ? "var(--teal)" : "var(--border)", color: item.inStock ? "white" : "var(--text-light)", border: "none", borderRadius: "var(--radius-sm)", fontSize: 13, fontWeight: 500, cursor: item.inStock ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, transition: "background 0.2s" }}
          onMouseEnter={(e) => { if (item.inStock) (e.currentTarget as HTMLElement).style.background = "var(--teal-dark)"; }}
          onMouseLeave={(e) => { if (item.inStock) (e.currentTarget as HTMLElement).style.background = "var(--teal)"; }}
        >
          <ShoppingCart size={14} />
          {item.inStock ? "Add to cart" : "Out of stock"}
        </button>
      </div>
    </div>
  );
}