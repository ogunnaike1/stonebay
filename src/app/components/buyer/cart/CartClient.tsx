"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from "lucide-react";

const INIT_ITEMS = [
  { id: "1", name: "Premium Ankara Print Dress", seller: "StyleHaus", price: 18500, qty: 1, size: "M", emoji: "👗", bg: "#e8f0f5" },
  { id: "2", name: "Wireless Headphones", seller: "TechHub", price: 42000, qty: 1, size: null, emoji: "🎧", bg: "#d4e8f0" },
  { id: "3", name: "Natural Skincare Kit", seller: "GlowUp", price: 8900, qty: 2, size: null, emoji: "✨", bg: "#ead8e0" },
];

export default function CartClient() {
  const [items, setItems] = useState(INIT_ITEMS);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const updateQty = (id: string, delta: number) => {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const subtotal = items.reduce((acc, i) => acc + i.price * i.qty, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.15) : 0;
  const delivery = subtotal >= 50000 ? 0 : 2500;
  const total = subtotal - discount + delivery;

  return (
    <div style={{ background: "var(--off-white)", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "white", borderBottom: "1px solid var(--border)", padding: "20px 48px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ fontSize: 11, color: "var(--text-light)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
            <Link href="/" style={{ color: "var(--text-light)" }}>Home</Link> / Cart
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "var(--text-dark)" }}>
            Shopping Cart
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-mid)", marginTop: 4 }}>{items.length} items</p>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 48px" }}>
        {items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "var(--text-dark)", marginBottom: 8 }}>Your cart is empty</div>
            <p style={{ fontSize: 14, color: "var(--text-mid)", marginBottom: 28 }}>Looks like you haven't added anything yet.</p>
            <Link href="/products">
              <button style={{ background: "var(--teal)", color: "white", border: "none", padding: "14px 32px", borderRadius: "var(--radius-sm)", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24 }}>
            {/* Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {items.map((item) => (
                <div key={item.id} style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", padding: "20px", display: "flex", gap: 16, alignItems: "center" }}>
                  <div style={{ width: 80, height: 80, borderRadius: "var(--radius-md)", background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, flexShrink: 0 }}>
                    {item.emoji}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Link href="#" style={{ textDecoration: "none" }}>
                      <div style={{ fontSize: 15, fontWeight: 500, color: "var(--text-dark)", marginBottom: 4 }}>{item.name}</div>
                    </Link>
                    <div style={{ fontSize: 12, color: "var(--text-light)", marginBottom: 8 }}>
                      {item.seller}{item.size ? ` · Size: ${item.size}` : ""}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                        <button onClick={() => updateQty(item.id, -1)} style={{ width: 32, height: 32, background: "var(--off-white)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-dark)" }}>
                          <Minus size={13} />
                        </button>
                        <span style={{ width: 32, textAlign: "center", fontSize: 14, fontWeight: 500 }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} style={{ width: 32, height: 32, background: "var(--off-white)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-dark)" }}>
                          <Plus size={13} />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.id)} style={{ background: "none", border: "none", color: "#e05c5c", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 13 }}>
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: "var(--teal)", flexShrink: 0 }}>
                    ₦{(item.price * item.qty).toLocaleString()}
                  </div>
                </div>
              ))}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link href="/products" style={{ fontSize: 14, color: "var(--teal)", display: "flex", alignItems: "center", gap: 6 }}>
                  ← Continue shopping
                </Link>
              </div>
            </div>

            {/* Summary */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Coupon */}
              <div style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", padding: "18px" }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                  <Tag size={14} color="var(--sage)" /> Promo code
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                    placeholder="Enter code"
                    disabled={couponApplied}
                    style={{ flex: 1, padding: "9px 12px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 13, outline: "none", background: couponApplied ? "var(--off-white)" : "white", color: "var(--text-dark)" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--teal)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  />
                  <button
                    onClick={() => { if (coupon === "WELCOME") setCouponApplied(true); }}
                    disabled={couponApplied}
                    style={{ padding: "9px 16px", background: couponApplied ? "var(--sage)" : "var(--teal)", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 13, fontWeight: 500, cursor: couponApplied ? "default" : "pointer" }}
                  >
                    {couponApplied ? "✓ Applied" : "Apply"}
                  </button>
                </div>
                {couponApplied && (
                  <div style={{ fontSize: 12, color: "var(--sage)", marginTop: 8 }}>
                    🎉 WELCOME code applied — 15% off!
                  </div>
                )}
              </div>

              {/* Order summary */}
              <div style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", padding: "20px" }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-dark)", marginBottom: 16 }}>Order summary</div>
                {[
                  { label: "Subtotal", value: `₦${subtotal.toLocaleString()}` },
                  ...(couponApplied ? [{ label: "Discount (15%)", value: `−₦${discount.toLocaleString()}`, color: "#e05c5c" }] : []),
                  { label: "Delivery", value: delivery === 0 ? "Free" : `₦${delivery.toLocaleString()}` },
                ].map((row) => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--text-mid)", marginBottom: 10 }}>
                    <span>{row.label}</span>
                    <span style={{ color: (row as { color?: string }).color || "var(--text-dark)", fontWeight: 500 }}>{row.value}</span>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14, marginTop: 4, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 16, fontWeight: 600, color: "var(--text-dark)" }}>Total</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: "var(--teal)" }}>₦{total.toLocaleString()}</span>
                </div>

                {delivery > 0 && (
                  <div style={{ background: "rgba(82,171,152,0.08)", borderRadius: "var(--radius-sm)", padding: "8px 12px", marginTop: 12, fontSize: 12, color: "var(--sage)" }}>
                    Add ₦{(50000 - subtotal).toLocaleString()} more for free delivery
                  </div>
                )}

                <Link href="/checkout">
                  <button style={{ width: "100%", marginTop: 16, padding: "15px", background: "var(--teal)", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--teal-dark)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--teal)")}
                  >
                    Proceed to checkout <ArrowRight size={16} />
                  </button>
                </Link>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 14, fontSize: 12, color: "var(--text-light)" }}>
                  <ShoppingBag size={13} /> Secured by Paystack
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}