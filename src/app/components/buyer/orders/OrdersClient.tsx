"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardTopbar from "../../shared/DashboardTopbar";
import { Package, ChevronRight } from "lucide-react";

const TABS = ["All", "Processing", "In transit", "Delivered", "Cancelled"];

const ORDERS = [
  { id: "SB-4821", date: "22 Mar 2026", items: [{ name: "Premium Ankara Print Dress", emoji: "👗", qty: 1, price: 18500 }, { name: "Skincare Kit", emoji: "✨", qty: 2, price: 17800 }], total: 36300, status: "Processing", seller: "StyleHaus" },
  { id: "SB-4819", date: "18 Mar 2026", items: [{ name: "Wireless Headphones", emoji: "🎧", qty: 1, price: 42000 }], total: 42000, status: "In transit", seller: "TechHub" },
  { id: "SB-4814", date: "10 Mar 2026", items: [{ name: "Rattan Wall Art", emoji: "🏺", qty: 1, price: 12800 }], total: 12800, status: "Delivered", seller: "HomeDecor" },
  { id: "SB-4801", date: "2 Mar 2026", items: [{ name: "Men's Agbada Set", emoji: "👔", qty: 1, price: 22000 }], total: 22000, status: "Delivered", seller: "RoyalThreads" },
  { id: "SB-4788", date: "20 Feb 2026", items: [{ name: "Smart Watch", emoji: "⌚", qty: 1, price: 89000 }], total: 89000, status: "Cancelled", seller: "TechHub" },
];

const statusStyles: Record<string, { bg: string; color: string; dot: string }> = {
  Processing: { bg: "#FAEEDA", color: "#633806", dot: "#EF9F27" },
  "In transit": { bg: "#E6F1FB", color: "#0C447C", dot: "#378ADD" },
  Delivered: { bg: "#E1F5EE", color: "#085041", dot: "#1D9E75" },
  Cancelled: { bg: "#FCEBEB", color: "#791F1F", dot: "#E24B4A" },
};

export default function OrdersClient() {
  const [tab, setTab] = useState("All");

  const filtered = ORDERS.filter((o) => tab === "All" || o.status === tab);

  return (
    <>
      <DashboardTopbar title="My Orders" />
      <div style={{ padding: "24px 28px" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--border)", marginBottom: 20, background: "white", borderRadius: "var(--radius-lg) var(--radius-lg) 0 0", padding: "0 4px", border: "1px solid var(--border)" }}>
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: "12px 18px", background: "none", border: "none", borderBottom: `2px solid ${tab === t ? "var(--teal)" : "transparent"}`, color: tab === t ? "var(--teal)" : "var(--text-mid)", fontSize: 13, fontWeight: tab === t ? 600 : 400, cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}>
              {t}
              {t !== "All" && (
                <span style={{ marginLeft: 6, background: tab === t ? "var(--teal)" : "var(--off-white)", color: tab === t ? "white" : "var(--text-mid)", fontSize: 10, fontWeight: 600, padding: "1px 6px", borderRadius: 10 }}>
                  {ORDERS.filter((o) => o.status === t).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
            <Package size={40} color="var(--text-light)" style={{ margin: "0 auto 12px" }} />
            <div style={{ fontSize: 16, fontWeight: 500, color: "var(--text-dark)", marginBottom: 6 }}>No {tab.toLowerCase()} orders</div>
            <div style={{ fontSize: 13, color: "var(--text-light)" }}>Your orders will appear here</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filtered.map((order) => {
              const s = statusStyles[order.status];
              return (
                <div key={order.id} style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", overflow: "hidden" }}>
                  {/* Order header */}
                  <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--off-white)" }}>
                    <div style={{ display: "flex", gap: 20 }}>
                      <div>
                        <div style={{ fontSize: 11, color: "var(--text-light)", marginBottom: 2 }}>Order ID</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-dark)" }}>#{order.id}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: "var(--text-light)", marginBottom: 2 }}>Date</div>
                        <div style={{ fontSize: 13, color: "var(--text-dark)" }}>{order.date}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: "var(--text-light)", marginBottom: 2 }}>Seller</div>
                        <div style={{ fontSize: 13, color: "var(--text-dark)" }}>{order.seller}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 20, background: s.bg, color: s.color, display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, display: "inline-block" }} />
                      {order.status}
                    </span>
                  </div>

                  {/* Items */}
                  <div style={{ padding: "16px 20px" }}>
                    {order.items.map((item) => (
                      <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                        <div style={{ width: 44, height: 44, borderRadius: "var(--radius-sm)", background: "var(--off-white)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                          {item.emoji}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-dark)" }}>{item.name}</div>
                          <div style={{ fontSize: 12, color: "var(--text-light)" }}>Qty: {item.qty}</div>
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-dark)" }}>₦{item.price.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div style={{ padding: "12px 20px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-dark)" }}>
                      Total: <span style={{ color: "var(--teal)" }}>₦{order.total.toLocaleString()}</span>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      {order.status === "Delivered" && (
                        <button style={{ padding: "8px 14px", background: "none", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 12, fontWeight: 500, cursor: "pointer", color: "var(--text-dark)" }}>
                          Leave review
                        </button>
                      )}
                      <Link href={`/account/orders/${order.id}`}>
                        <button style={{ padding: "8px 14px", background: "var(--teal)", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 12, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                          View details <ChevronRight size={13} />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}