"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, Heart, ShoppingCart, X } from "lucide-react";

const CATEGORIES = ["All", "Fashion", "Electronics", "Home & Living", "Beauty", "Sports"];

const PRODUCTS = [
  { id: "1", slug: "premium-ankara-dress", name: "Premium Ankara Print Dress", price: 18500, seller: "StyleHaus", city: "Lagos", category: "Fashion", rating: 4.9, reviews: 84, badge: "New", emoji: "👗", bg: "#e8f0f5" },
  { id: "2", slug: "wireless-headphones", name: "Wireless Noise-Cancelling Headphones", price: 42000, originalPrice: 60000, seller: "TechHub", city: "Abuja", category: "Electronics", rating: 4.8, reviews: 210, badge: "Sale", emoji: "🎧", bg: "#d4e8f0" },
  { id: "3", slug: "rattan-wall-art", name: "Handwoven Rattan Wall Art Set", price: 12800, seller: "HomeDecor", city: "Port Harcourt", category: "Home & Living", rating: 4.7, reviews: 56, badge: "Hot", emoji: "🏺", bg: "#c8e4d8" },
  { id: "4", slug: "skincare-kit", name: "Natural Skincare Essentials Kit", price: 8900, originalPrice: 14000, seller: "GlowUp", city: "Lagos", category: "Beauty", rating: 5.0, reviews: 312, badge: "Sale", emoji: "✨", bg: "#ead8e0" },
  { id: "5", slug: "agbada-set", name: "Men's Premium Agbada Set", price: 22000, seller: "RoyalThreads", city: "Kano", category: "Fashion", rating: 4.9, reviews: 42, badge: "", emoji: "👔", bg: "#e8e0d0" },
  { id: "6", slug: "smart-watch", name: "Smart Watch Pro Series", price: 89000, seller: "TechHub", city: "Lagos", category: "Electronics", rating: 4.6, reviews: 128, badge: "", emoji: "⌚", bg: "#d8e0e8" },
  { id: "7", slug: "scented-candle", name: "Luxury Scented Candle Set", price: 5500, seller: "HomeDecor", city: "Ibadan", category: "Home & Living", rating: 4.5, reviews: 89, badge: "", emoji: "🕯️", bg: "#f0ece0" },
  { id: "8", slug: "leather-bag", name: "Genuine Leather Crossbody Bag", price: 28000, seller: "LeatherCo", city: "Lagos", category: "Fashion", rating: 4.8, reviews: 67, badge: "New", emoji: "👜", bg: "#ede8f0" },
];

const badgeColors: Record<string, { bg: string; color: string }> = {
  New: { bg: "#2b6777", color: "white" },
  Sale: { bg: "#e05c5c", color: "white" },
  Hot: { bg: "#52ab98", color: "white" },
};

export default function ProductsClient() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [wishlisted, setWishlisted] = useState<Set<string>>(new Set());

  const toggleWish = (id: string) => {
    setWishlisted((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = PRODUCTS
    .filter((p) => category === "All" || p.category === category)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div style={{ background: "var(--off-white)", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "white", borderBottom: "1px solid var(--border)", padding: "28px 48px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ fontSize: 11, color: "var(--text-light)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
            <Link href="/" style={{ color: "var(--text-light)" }}>Home</Link> / Products
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "var(--text-dark)" }}>
                All Products
              </h1>
              <p style={{ fontSize: 14, color: "var(--text-mid)", marginTop: 4 }}>
                {filtered.length} products found
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Search */}
              <div style={{ position: "relative" }}>
                <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-light)" }} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  style={{ paddingLeft: 36, paddingRight: search ? 36 : 14, paddingTop: 9, paddingBottom: 9, border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 13, color: "var(--text-dark)", outline: "none", width: 220, background: "var(--off-white)" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--teal)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
                {search && (
                  <button onClick={() => setSearch("")} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-light)", display: "flex" }}>
                    <X size={14} />
                  </button>
                )}
              </div>
              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                style={{ padding: "9px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 13, color: "var(--text-dark)", background: "var(--off-white)", outline: "none", cursor: "pointer" }}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
          {/* Category tabs */}
          <div style={{ display: "flex", gap: 0, overflowX: "auto" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  padding: "10px 20px",
                  background: "none",
                  border: "none",
                  borderBottom: `2px solid ${category === cat ? "var(--teal)" : "transparent"}`,
                  color: category === cat ? "var(--teal)" : "var(--text-mid)",
                  fontSize: 14,
                  fontWeight: category === cat ? 500 : 400,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 48px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-mid)" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 8 }}>No products found</div>
            <div style={{ fontSize: 14 }}>Try a different search or category</div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                wished={wishlisted.has(p.id)}
                onWish={() => toggleWish(p.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product: p, wished, onWish }: { product: typeof PRODUCTS[0]; wished: boolean; onWish: () => void }) {
  const [hovered, setHovered] = useState(false);
  const badge = p.badge ? badgeColors[p.badge] : null;
  const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : null;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: "white", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border)", transition: "transform 0.25s, box-shadow 0.25s", transform: hovered ? "translateY(-5px)" : "none", boxShadow: hovered ? "var(--shadow-lg)" : "none" }}
    >
      {/* Image */}
      <div style={{ aspectRatio: "1", background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64, position: "relative", overflow: "hidden" }}>
        <span style={{ transition: "transform 0.4s", transform: hovered ? "scale(1.08)" : "scale(1)", display: "block" }}>{p.emoji}</span>
        {badge && (
          <span style={{ position: "absolute", top: 12, left: 12, fontSize: 10, fontWeight: 600, padding: "4px 10px", borderRadius: 20, background: badge.bg, color: badge.color }}>
            {discount ? `−${discount}%` : p.badge}
          </span>
        )}
        <button
          onClick={onWish}
          style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.92)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: hovered || wished ? 1 : 0, transition: "opacity 0.2s", color: wished ? "#e05c5c" : "var(--text-mid)" }}
        >
          <Heart size={15} fill={wished ? "#e05c5c" : "none"} />
        </button>
      </div>
      {/* Body */}
      <div style={{ padding: "14px 16px" }}>
        <div style={{ fontSize: 11, color: "var(--text-light)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 5 }}>{p.seller} · {p.city}</div>
        <Link href={`/products/${p.slug}`} style={{ textDecoration: "none" }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-dark)", marginBottom: 10, lineHeight: 1.4, transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--teal)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-dark)")}
          >{p.name}</div>
        </Link>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div>
            <span style={{ fontSize: 17, fontWeight: 600, color: "var(--teal)" }}>₦{p.price.toLocaleString()}</span>
            {p.originalPrice && <span style={{ fontSize: 12, color: "var(--text-light)", textDecoration: "line-through", marginLeft: 6 }}>₦{p.originalPrice.toLocaleString()}</span>}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-light)" }}>⭐ {p.rating} ({p.reviews})</div>
        </div>
        <button style={{ width: "100%", padding: "10px", background: "var(--teal)", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, transition: "background 0.2s" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--teal-dark)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--teal)")}
        >
          <ShoppingCart size={14} /> Add to cart
        </button>
      </div>
    </div>
  );
}