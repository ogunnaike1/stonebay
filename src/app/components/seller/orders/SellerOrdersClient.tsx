"use client";

import { useState } from "react";
import DashboardTopbar from "@/app/components/shared/DashboardTopbar";
import { Search, Eye, X, Package } from "lucide-react";

type Status = "All" | "New" | "Packed" | "Shipped" | "Delivered" | "Cancelled";
const STATUSES: Status[] = ["All", "New", "Packed", "Shipped", "Delivered", "Cancelled"];
const SS: Record<string, { bg: string; color: string; dot: string }> = {
  New:       { bg: "#E1F5EE", color: "#085041", dot: "#1D9E75" },
  Packed:    { bg: "#E6F1FB", color: "#0C447C", dot: "#378ADD" },
  Shipped:   { bg: "#FAEEDA", color: "#633806", dot: "#EF9F27" },
  Delivered: { bg: "#F1EFE8", color: "#444441", dot: "#888780" },
  Cancelled: { bg: "#FCEBEB", color: "#791F1F", dot: "#E24B4A" },
};
const NEXT: Partial<Record<Status, Status>> = { New: "Packed", Packed: "Shipped", Shipped: "Delivered" };

const ORDERS = [
  { id: "SB-4821", buyer: "Adeola Kamara", phone: "+234 801 234 5678", address: "15 Admiralty Way, Lekki Phase 1, Lagos", items: [{ name: "Premium Ankara Dress", qty: 1, price: 18500, emoji: "👗" }, { name: "Skincare Essentials Kit", qty: 2, price: 8900, emoji: "✨" }], total: 36300, status: "New" as Status, date: "22 Mar 2026", time: "09:14 AM", payment: "Paystack" },
  { id: "SB-4819", buyer: "Chidi Okonkwo", phone: "+234 802 345 6789", address: "Plot 44 Wuse Zone 5, Abuja", items: [{ name: "Wireless Headphones", qty: 1, price: 42000, emoji: "🎧" }], total: 42000, status: "Packed" as Status, date: "20 Mar 2026", time: "02:31 PM", payment: "Bank Transfer" },
  { id: "SB-4814", buyer: "Ngozi Adeyemi", phone: "+234 803 456 7890", address: "12 Trans Amadi Road, Port Harcourt", items: [{ name: "Men's Agbada Set", qty: 1, price: 22000, emoji: "👔" }, { name: "Leather Crossbody Bag", qty: 1, price: 28000, emoji: "👜" }, { name: "Sneakers Pro Max", qty: 1, price: 35000, emoji: "👟" }], total: 85000, status: "Shipped" as Status, date: "18 Mar 2026", time: "11:05 AM", payment: "Paystack" },
  { id: "SB-4809", buyer: "Emeka Balogun", phone: "+234 804 567 8901", address: "22 Old Ife Road, Ibadan", items: [{ name: "Gold Earring Set", qty: 2, price: 9500, emoji: "💍" }], total: 19000, status: "Delivered" as Status, date: "15 Mar 2026", time: "04:22 PM", payment: "Paystack" },
  { id: "SB-4801", buyer: "Fatima Suleiman", phone: "+234 805 678 9012", address: "Block B Flat 3, Kaduna GRA", items: [{ name: "Smart Watch Pro", qty: 1, price: 89000, emoji: "⌚" }], total: 89000, status: "Delivered" as Status, date: "12 Mar 2026", time: "10:18 AM", payment: "Bank Transfer" },
  { id: "SB-4795", buyer: "Yetunde Fashola", phone: "+234 806 789 0123", address: "5 Allen Avenue, Ikeja, Lagos", items: [{ name: "Scented Candle Set", qty: 3, price: 5500, emoji: "🕯️" }], total: 16500, status: "Cancelled" as Status, date: "10 Mar 2026", time: "08:50 AM", payment: "Paystack" },
];

export default function SellerOrdersClient() {
  const [tab, setTab] = useState<Status>("All");
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState(ORDERS);
  const [drawer, setDrawer] = useState<typeof ORDERS[0] | null>(null);

  const filtered = orders
    .filter((o) => tab === "All" || o.status === tab)
    .filter((o) => o.id.toLowerCase().includes(search.toLowerCase()) || o.buyer.toLowerCase().includes(search.toLowerCase()));

  const advance = (id: string) => {
    setOrders((prev) => prev.map((o) => o.id === id && NEXT[o.status] ? { ...o, status: NEXT[o.status]! } : o));
    setDrawer((d) => d?.id === id && NEXT[d.status] ? { ...d, status: NEXT[d.status]! } : d);
  };

  return (
    <>
      <DashboardTopbar title="Orders" notifCount={3} />
      <div style={{ padding: "24px 28px", overflowY: "auto" }}>

        {/* Status summary */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10, marginBottom: 20 }}>
          {STATUSES.filter((s) => s !== "All").map((s) => {
            const count = orders.filter((o) => o.status === s).length;
            const st = SS[s];
            return (
              <div key={s} onClick={() => setTab(s)} style={{ background: "white", border: `1.5px solid ${tab === s ? st.dot : "var(--border)"}`, borderRadius: "var(--radius-md)", padding: "14px 16px", cursor: "pointer", transition: "all .15s" }}>
                <div style={{ fontSize: 11, color: "var(--text-light)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4 }}>{s}</div>
                <div style={{ fontSize: 26, fontWeight: 600, color: "var(--text-dark)", lineHeight: 1 }}>{count}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: st.dot, display: "inline-block" }} />
                  <span style={{ fontSize: 11, color: st.color }}>{count === 1 ? "order" : "orders"}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-light)", pointerEvents: "none" }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by order ID or buyer name…"
              style={{ width: "100%", paddingLeft: 36, paddingRight: 14, paddingTop: 9, paddingBottom: 9, border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 13, color: "var(--text-dark)", outline: "none", background: "white" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--teal)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />
          </div>
          <div style={{ display: "flex", background: "white", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
            {STATUSES.map((s) => (
              <button key={s} onClick={() => setTab(s)} style={{ padding: "9px 14px", border: "none", borderRight: s !== "Cancelled" ? "1px solid var(--border)" : "none", background: tab === s ? "var(--teal)" : "transparent", color: tab === s ? "white" : "var(--text-mid)", fontSize: 12, fontWeight: tab === s ? 600 : 400, cursor: "pointer", whiteSpace: "nowrap" }}>{s}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--off-white)", borderBottom: "1px solid var(--border)" }}>
                {["Order ID", "Buyer", "Items", "Total", "Date", "Status", "Actions"].map((h) => (
                  <th key={h} style={{ padding: "11px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--text-mid)", letterSpacing: ".06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: "56px 0", textAlign: "center" }}>
                  <Package size={36} color="var(--text-light)" style={{ margin: "0 auto 12px", display: "block" }} />
                  <div style={{ fontSize: 15, fontWeight: 500, color: "var(--text-mid)", marginBottom: 4 }}>No orders found</div>
                  <div style={{ fontSize: 13, color: "var(--text-light)" }}>Try a different filter or search term</div>
                </td></tr>
              ) : filtered.map((o, i) => {
                const st = SS[o.status]; const next = NEXT[o.status];
                return (
                  <tr key={o.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none", transition: "background .1s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(43,103,119,.02)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                  >
                    <td style={{ padding: "13px 16px" }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--teal)" }}>#{o.id}</div>
                      <div style={{ fontSize: 11, color: "var(--text-light)", marginTop: 2 }}>{o.payment}</div>
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-dark)" }}>{o.buyer}</div>
                      <div style={{ fontSize: 11, color: "var(--text-light)", marginTop: 2 }}>{o.phone}</div>
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <div style={{ display: "flex", gap: 2, marginBottom: 3 }}>{o.items.map((item) => <span key={item.name} style={{ fontSize: 18 }} title={item.name}>{item.emoji}</span>)}</div>
                      <div style={{ fontSize: 11, color: "var(--text-light)" }}>{o.items.length} item{o.items.length > 1 ? "s" : ""}</div>
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-dark)" }}>₦{o.total.toLocaleString()}</div>
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <div style={{ fontSize: 13, color: "var(--text-dark)" }}>{o.date}</div>
                      <div style={{ fontSize: 11, color: "var(--text-light)", marginTop: 2 }}>{o.time}</div>
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, display: "inline-flex", alignItems: "center", gap: 4, background: st.bg, color: st.color }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: st.dot, display: "inline-block" }} />{o.status}
                      </span>
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => setDrawer(o)} style={{ padding: "6px 10px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "white", fontSize: 12, cursor: "pointer", color: "var(--text-mid)", display: "flex", alignItems: "center", gap: 4 }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--teal)"; (e.currentTarget as HTMLElement).style.color = "var(--teal)"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-mid)"; }}
                        ><Eye size={12} /> View</button>
                        {next && (
                          <button onClick={() => advance(o.id)} style={{ padding: "6px 10px", border: "none", borderRadius: "var(--radius-sm)", background: "var(--teal)", color: "white", fontSize: 12, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap" }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--teal-dark)")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--teal)")}
                          >Mark {next}</button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail drawer */}
      {drawer && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, display: "flex", justifyContent: "flex-end" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.4)" }} onClick={() => setDrawer(null)} />
          <div style={{ position: "relative", width: 460, background: "white", height: "100%", overflowY: "auto", boxShadow: "-8px 0 40px rgba(0,0,0,.15)", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "white", zIndex: 1 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-dark)" }}>Order #{drawer.id}</div>
                <div style={{ fontSize: 12, color: "var(--text-light)", marginTop: 2 }}>{drawer.date} · {drawer.time}</div>
              </div>
              <button onClick={() => setDrawer(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-mid)", display: "flex" }}><X size={20} /></button>
            </div>

            <div style={{ padding: "20px 24px", flex: 1 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 22 }}>
                {[{ label: "Status", value: drawer.status }, { label: "Payment", value: drawer.payment }, { label: "Total", value: `₦${drawer.total.toLocaleString()}` }, { label: "Items", value: `${drawer.items.length} item${drawer.items.length > 1 ? "s" : ""}` }].map((d) => (
                  <div key={d.label} style={{ background: "var(--off-white)", borderRadius: "var(--radius-md)", padding: "12px 14px" }}>
                    <div style={{ fontSize: 11, color: "var(--text-light)", marginBottom: 4 }}>{d.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-dark)" }}>{d.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-dark)", marginBottom: 10 }}>Buyer details</div>
                <div style={{ background: "var(--off-white)", borderRadius: "var(--radius-md)", padding: "14px 16px" }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-dark)", marginBottom: 4 }}>{drawer.buyer}</div>
                  <div style={{ fontSize: 13, color: "var(--text-mid)", marginBottom: 4 }}>{drawer.phone}</div>
                  <div style={{ fontSize: 13, color: "var(--text-mid)" }}>{drawer.address}</div>
                </div>
              </div>

              <div style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-dark)", marginBottom: 10 }}>Order items</div>
                <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
                  {drawer.items.map((item, i) => (
                    <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderBottom: i < drawer.items.length - 1 ? "1px solid var(--border)" : "none" }}>
                      <div style={{ width: 40, height: 40, borderRadius: "var(--radius-sm)", background: "var(--off-white)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{item.emoji}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-dark)" }}>{item.name}</div>
                        <div style={{ fontSize: 12, color: "var(--text-light)", marginTop: 2 }}>Qty: {item.qty}</div>
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--teal)" }}>₦{(item.price * item.qty).toLocaleString()}</div>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 14px", background: "var(--off-white)" }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-dark)" }}>Total</span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: "var(--teal)" }}>₦{drawer.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-dark)", marginBottom: 10 }}>Add tracking number</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input placeholder="e.g. GIGL-123456789" style={{ flex: 1, padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 13, outline: "none", color: "var(--text-dark)" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--teal)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  />
                  <button style={{ padding: "10px 16px", background: "var(--off-white)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "var(--text-dark)", whiteSpace: "nowrap" }}>Save</button>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-dark)", marginBottom: 14 }}>Order timeline</div>
                {[
                  { label: "Order placed", done: true, time: drawer.date },
                  { label: "Payment confirmed", done: true, time: drawer.date },
                  { label: "Order packed", done: ["Packed","Shipped","Delivered"].includes(drawer.status), time: "" },
                  { label: "Shipped to buyer", done: ["Shipped","Delivered"].includes(drawer.status), time: "" },
                  { label: "Delivered", done: drawer.status === "Delivered", time: "" },
                ].map((step, i) => (
                  <div key={step.label} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                      <div style={{ width: 22, height: 22, borderRadius: "50%", background: step.done ? "var(--teal)" : "var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {step.done && <span style={{ color: "white", fontSize: 11, fontWeight: 700 }}>✓</span>}
                      </div>
                      {i < 4 && <div style={{ width: 2, height: 24, background: step.done ? "var(--teal)" : "var(--border)", marginTop: 3 }} />}
                    </div>
                    <div style={{ paddingTop: 2 }}>
                      <div style={{ fontSize: 13, fontWeight: step.done ? 500 : 400, color: step.done ? "var(--text-dark)" : "var(--text-light)" }}>{step.label}</div>
                      {step.time && <div style={{ fontSize: 11, color: "var(--text-light)", marginTop: 2 }}>{step.time}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: "16px 24px", borderTop: "1px solid var(--border)", background: "white" }}>
              {NEXT[drawer.status] ? (
                <button onClick={() => advance(drawer.id)} style={{ width: "100%", padding: "13px", background: "var(--teal)", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--teal-dark)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--teal)")}
                >Mark as {NEXT[drawer.status]}</button>
              ) : (
                <div style={{ padding: "13px", background: "var(--off-white)", borderRadius: "var(--radius-sm)", textAlign: "center", fontSize: 13, color: "var(--text-light)" }}>
                  {drawer.status === "Delivered" ? "✓ Order completed" : "✕ Order cancelled"}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}