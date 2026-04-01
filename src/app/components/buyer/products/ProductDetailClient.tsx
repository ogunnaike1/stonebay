"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, ChevronDown } from "lucide-react";

const PRODUCT = {
  name: "Premium Ankara Print Dress",
  price: 18500,
  originalPrice: 24000,
  seller: "StyleHaus",
  city: "Lagos",
  rating: 4.9,
  reviews: 84,
  sold: 320,
  emoji: "👗",
  bg: "#e8f0f5",
  description: "Beautifully crafted Ankara print dress made from premium Dutch wax fabric. Features a flattering A-line silhouette, elegant puff sleeves, and a hidden zip closure at the back. Perfect for weddings, parties, and cultural events.",
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: ["#c8a96e", "#2b6777", "#e05c5c", "#333"],
  category: "Fashion",
};

const REVIEWS = [
  { name: "Amaka O.", rating: 5, date: "Mar 12, 2026", comment: "Absolutely stunning! The fabric quality is top notch and the fit is perfect. Will definitely order again.", avatar: "AO" },
  { name: "Chidinma E.", rating: 5, date: "Feb 28, 2026", comment: "Received so many compliments at the event. Fast delivery too. StyleHaus never disappoints!", avatar: "CE" },
  { name: "Folake A.", rating: 4, date: "Feb 15, 2026", comment: "Beautiful dress, love the pattern. Sizing runs slightly small so I'd suggest going up one size.", avatar: "FA" },
];

export default function ProductDetailClient({ slug }: { slug: string }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(PRODUCT.colors[0]);
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [tab, setTab] = useState<"description" | "reviews">("description");

  const discount = Math.round((1 - PRODUCT.price / PRODUCT.originalPrice) * 100);

  return (
    <div style={{ background: "var(--off-white)", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div style={{ background: "white", borderBottom: "1px solid var(--border)", padding: "14px 48px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", fontSize: 12, color: "var(--text-light)" }}>
          <Link href="/" style={{ color: "var(--text-light)" }}>Home</Link>
          {" / "}
          <Link href="/products" style={{ color: "var(--text-light)" }}>Products</Link>
          {" / "}
          <span style={{ color: "var(--text-dark)" }}>{PRODUCT.name}</span>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginBottom: 48 }}>
          {/* Left: Image */}
          <div>
            <div style={{ background: PRODUCT.bg, borderRadius: "var(--radius-xl)", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 160, marginBottom: 12, border: "1px solid var(--border)" }}>
              {PRODUCT.emoji}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {[PRODUCT.emoji, "🪡", "🧵", "📦"].map((e, i) => (
                <div key={i} style={{ background: PRODUCT.bg, borderRadius: "var(--radius-md)", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, border: `2px solid ${i === 0 ? "var(--teal)" : "var(--border)"}`, cursor: "pointer" }}>
                  {e}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div>
            <div style={{ fontSize: 12, color: "var(--sage)", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
              {PRODUCT.category}
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "var(--text-dark)", marginBottom: 14, lineHeight: 1.2 }}>
              {PRODUCT.name}
            </h1>
            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{ display: "flex", gap: 2 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(PRODUCT.rating) ? "#52ab98" : "none"} color="#52ab98" />
                ))}
              </div>
              <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text-dark)" }}>{PRODUCT.rating}</span>
              <span style={{ fontSize: 13, color: "var(--text-light)" }}>({PRODUCT.reviews} reviews)</span>
              <span style={{ fontSize: 13, color: "var(--text-light)" }}>· {PRODUCT.sold} sold</span>
            </div>
            {/* Price */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, padding: "16px", background: "var(--off-white)", borderRadius: "var(--radius-md)" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700, color: "var(--teal)" }}>₦{PRODUCT.price.toLocaleString()}</span>
              <span style={{ fontSize: 16, color: "var(--text-light)", textDecoration: "line-through" }}>₦{PRODUCT.originalPrice.toLocaleString()}</span>
              <span style={{ background: "#e05c5c", color: "white", fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>−{discount}%</span>
            </div>

            {/* Color */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 10 }}>Colour</div>
              <div style={{ display: "flex", gap: 10 }}>
                {PRODUCT.colors.map((c) => (
                  <button key={c} onClick={() => setSelectedColor(c)} style={{ width: 28, height: 28, borderRadius: "50%", background: c, border: selectedColor === c ? "3px solid var(--teal)" : "2px solid transparent", outline: selectedColor === c ? "2px solid white" : "none", cursor: "pointer", transition: "all 0.15s" }} />
                ))}
              </div>
            </div>

            {/* Size */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 10 }}>
                Size {selectedSize && <span style={{ color: "var(--teal)", fontWeight: 400 }}>— {selectedSize}</span>}
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {PRODUCT.sizes.map((s) => (
                  <button key={s} onClick={() => setSelectedSize(s)} style={{ width: 44, height: 44, border: `1.5px solid ${selectedSize === s ? "var(--teal)" : "var(--border)"}`, borderRadius: "var(--radius-sm)", background: selectedSize === s ? "rgba(43,103,119,0.06)" : "white", color: selectedSize === s ? "var(--teal)" : "var(--text-dark)", fontSize: 13, fontWeight: selectedSize === s ? 600 : 400, cursor: "pointer", transition: "all 0.15s" }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty + CTA */}
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 40, height: 48, background: "var(--off-white)", border: "none", fontSize: 18, cursor: "pointer", color: "var(--text-dark)" }}>−</button>
                <span style={{ width: 40, textAlign: "center", fontSize: 15, fontWeight: 500, color: "var(--text-dark)" }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ width: 40, height: 48, background: "var(--off-white)", border: "none", fontSize: 18, cursor: "pointer", color: "var(--text-dark)" }}>+</button>
              </div>
              <button style={{ flex: 1, background: "var(--teal)", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--teal-dark)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--teal)")}
              >
                <ShoppingCart size={18} /> Add to cart
              </button>
              <button onClick={() => setWished(!wished)} style={{ width: 48, height: 48, border: `1.5px solid ${wished ? "#e05c5c" : "var(--border)"}`, borderRadius: "var(--radius-sm)", background: wished ? "#fff0f0" : "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s", color: wished ? "#e05c5c" : "var(--text-mid)" }}>
                <Heart size={18} fill={wished ? "#e05c5c" : "none"} />
              </button>
            </div>

            {/* Buy now */}
            <button style={{ width: "100%", padding: "14px", background: "var(--sage)", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 15, fontWeight: 600, cursor: "pointer", marginBottom: 24, transition: "background 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--sage-light)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--sage)")}
            >
              Buy Now
            </button>

            {/* Trust badges */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {[
                { icon: <Truck size={16} />, label: "Free delivery", sub: "Orders over ₦50K" },
                { icon: <Shield size={16} />, label: "Buyer protection", sub: "100% guaranteed" },
                { icon: <RotateCcw size={16} />, label: "Easy returns", sub: "30-day policy" },
              ].map((b) => (
                <div key={b.label} style={{ background: "var(--off-white)", borderRadius: "var(--radius-md)", padding: "12px", textAlign: "center" }}>
                  <div style={{ color: "var(--teal)", display: "flex", justifyContent: "center", marginBottom: 6 }}>{b.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: "var(--text-dark)" }}>{b.label}</div>
                  <div style={{ fontSize: 11, color: "var(--text-light)", marginTop: 2 }}>{b.sub}</div>
                </div>
              ))}
            </div>

            {/* Seller */}
            <div style={{ marginTop: 20, padding: "14px 16px", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(43,103,119,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏪</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-dark)" }}>{PRODUCT.seller}</div>
                  <div style={{ fontSize: 12, color: "var(--text-light)" }}>{PRODUCT.city} · Verified seller</div>
                </div>
              </div>
              <Link href={`/store/${PRODUCT.seller.toLowerCase()}`}>
                <button style={{ padding: "8px 16px", border: "1px solid var(--teal)", borderRadius: "var(--radius-sm)", background: "transparent", color: "var(--teal)", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
                  Visit store
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs: Description / Reviews */}
        <div style={{ background: "white", borderRadius: "var(--radius-xl)", border: "1px solid var(--border)", overflow: "hidden" }}>
          <div style={{ display: "flex", borderBottom: "1px solid var(--border)" }}>
            {(["description", "reviews"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{ padding: "16px 28px", background: "none", border: "none", borderBottom: `2px solid ${tab === t ? "var(--teal)" : "transparent"}`, color: tab === t ? "var(--teal)" : "var(--text-mid)", fontSize: 14, fontWeight: tab === t ? 600 : 400, cursor: "pointer", textTransform: "capitalize" }}>
                {t} {t === "reviews" && `(${PRODUCT.reviews})`}
              </button>
            ))}
          </div>
          <div style={{ padding: "28px 32px" }}>
            {tab === "description" ? (
              <p style={{ fontSize: 15, color: "var(--text-mid)", lineHeight: 1.8 }}>{PRODUCT.description}</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {REVIEWS.map((r) => (
                  <div key={r.name} style={{ display: "flex", gap: 16, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(43,103,119,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 500, color: "var(--teal)", flexShrink: 0 }}>
                      {r.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-dark)" }}>{r.name}</div>
                        <div style={{ fontSize: 12, color: "var(--text-light)" }}>{r.date}</div>
                      </div>
                      <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={13} fill={i < r.rating ? "#52ab98" : "none"} color="#52ab98" />
                        ))}
                      </div>
                      <p style={{ fontSize: 14, color: "var(--text-mid)", lineHeight: 1.65 }}>{r.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}