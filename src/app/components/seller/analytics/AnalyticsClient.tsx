"use client";

import { useState, useEffect, useRef } from "react";
import DashboardTopbar from "@/app/components/shared/DashboardTopbar";
import StatCard from "@/app/components/shared/StatCard";

const PERIODS = ["7 days", "30 days", "90 days", "This year"] as const;
type Period = typeof PERIODS[number];

const DATA: Record<Period, { labels: string[]; revenue: number[]; orders: number[]; visitors: number[] }> = {
  "7 days":    { labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], revenue: [95,140,88,175,210,260,185], orders: [12,18,10,22,28,34,24], visitors: [210,280,195,340,410,520,380] },
  "30 days":   { labels: ["W1","W2","W3","W4"], revenue: [520,840,640,980], orders: [68,112,85,137], visitors: [1200,1800,1400,2200] },
  "90 days":   { labels: ["Jan","Feb","Mar"], revenue: [1800,2400,1980], orders: [240,320,265], visitors: [4200,5800,4900] },
  "This year": { labels: ["Q1","Q2","Q3","Q4"], revenue: [6200,8400,7200,9800], orders: [820,1100,950,1300], visitors: [15000,20000,17000,24000] },
};

const TOP_PRODUCTS = [
  { name: "Premium Ankara Dress", emoji: "👗", sales: 128, revenue: 2368000, growth: 12 },
  { name: "Gold Earring Set",      emoji: "💍", sales: 201, revenue: 1909500, growth: 28 },
  { name: "Sneakers Pro Max",      emoji: "👟", sales: 89,  revenue: 3115000, growth: -5 },
  { name: "Men's Agbada Set",      emoji: "👔", sales: 64,  revenue: 1408000, growth: 8 },
  { name: "Leather Crossbody Bag", emoji: "👜", sales: 45,  revenue: 1260000, growth: 15 },
];

const CAT_BREAKDOWN = [
  { cat: "Fashion",     pct: 48, color: "#2b6777" },
  { cat: "Accessories", pct: 22, color: "#52ab98" },
  { cat: "Footwear",    pct: 18, color: "#cbd8e4" },
  { cat: "Home",        pct: 8,  color: "#1d4d5a" },
  { cat: "Jewellery",   pct: 4,  color: "#3a8a9e" },
];

export default function AnalyticsClient() {
  const [period, setPeriod] = useState<Period>("7 days");
  const revenueRef = useRef<HTMLCanvasElement>(null);
  const trafficRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const charts: { destroy: () => void }[] = [];
    (async () => {
      const { Chart, registerables } = await import("chart.js");
      Chart.register(...registerables);
      const d = DATA[period];
      const dark = window.matchMedia("(prefers-color-scheme:dark)").matches;
      const grid = dark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.06)";
      const tick = dark ? "#888" : "#999";

      if (revenueRef.current) {
        charts.push(new Chart(revenueRef.current, {
          type: "bar",
          data: { labels: d.labels, datasets: [
            { label: "Revenue (₦K)", data: d.revenue, backgroundColor: "#2b6777", borderRadius: 5, yAxisID: "y" },
            { label: "Orders", data: d.orders, type: "line" as const, borderColor: "#52ab98", backgroundColor: "rgba(82,171,152,.08)", borderWidth: 2, pointRadius: 3, pointBackgroundColor: "#52ab98", tension: .4, fill: true, yAxisID: "y1" },
          ]},
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
            scales: { x: { grid: { color: grid }, ticks: { color: tick, font: { size: 11 } } }, y: { grid: { color: grid }, ticks: { color: tick, font: { size: 11 }, callback: (v) => "₦" + v + "K" }, position: "left" }, y1: { display: false } },
          },
        }) as unknown as { destroy: () => void });
      }

      if (trafficRef.current) {
        charts.push(new Chart(trafficRef.current, {
          type: "line",
          data: { labels: d.labels, datasets: [
            { label: "Visitors", data: d.visitors, borderColor: "#2b6777", backgroundColor: "rgba(43,103,119,.08)", borderWidth: 2, pointRadius: 3, tension: .4, fill: true },
          ]},
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
            scales: { x: { grid: { color: grid }, ticks: { color: tick, font: { size: 11 } } }, y: { grid: { color: grid }, ticks: { color: tick, font: { size: 11 } } } },
          },
        }) as unknown as { destroy: () => void });
      }
    })();
    return () => charts.forEach((c) => c.destroy());
  }, [period]);

  const d = DATA[period];
  const totalRevenue = d.revenue.reduce((a, b) => a + b, 0);
  const totalOrders  = d.orders.reduce((a, b) => a + b, 0);
  const totalVisitors = d.visitors.reduce((a, b) => a + b, 0);
  const convRate = ((totalOrders / totalVisitors) * 100).toFixed(1);

  return (
    <>
      <DashboardTopbar
        title="Analytics"
        actions={
          <div style={{ display: "flex", background: "white", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
            {PERIODS.map((p) => (
              <button key={p} onClick={() => setPeriod(p)}
                style={{ padding: "7px 14px", border: "none", borderRight: p !== "This year" ? "1px solid var(--border)" : "none", background: period === p ? "var(--teal)" : "transparent", color: period === p ? "white" : "var(--text-mid)", fontSize: 12, fontWeight: period === p ? 600 : 400, cursor: "pointer", whiteSpace: "nowrap" }}
              >{p}</button>
            ))}
          </div>
        }
      />
      <div style={{ padding: "24px 28px", overflowY: "auto" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
          <StatCard label="Total revenue" value={`₦${(totalRevenue * 1000).toLocaleString()}`} sub="↑ 18% vs previous" subColor="up" />
          <StatCard label="Total orders" value={totalOrders.toString()} sub="↑ 12% vs previous" subColor="up" />
          <StatCard label="Store visitors" value={totalVisitors.toLocaleString()} sub="↑ 24% vs previous" subColor="up" />
          <StatCard label="Conversion rate" value={`${convRate}%`} sub="↑ 0.4% vs previous" subColor="up" />
        </div>

        {/* Charts row */}
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, marginBottom: 16 }}>
          {/* Revenue + orders */}
          <div style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-dark)" }}>Revenue & orders</div>
              <div style={{ display: "flex", gap: 14, fontSize: 12, color: "var(--text-mid)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "#2b6777", display: "inline-block" }} />Revenue</span>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "#52ab98", display: "inline-block" }} />Orders</span>
              </div>
            </div>
            <div style={{ position: "relative", height: 220 }}><canvas ref={revenueRef} /></div>
          </div>

          {/* Traffic */}
          <div style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", padding: "18px 20px" }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-dark)", marginBottom: 10 }}>Store traffic</div>
            <div style={{ position: "relative", height: 220 }}><canvas ref={trafficRef} /></div>
          </div>
        </div>

        {/* Top products + category breakdown */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>

          {/* Top products */}
          <div style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", padding: "18px 20px" }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-dark)", marginBottom: 16 }}>Top performing products</div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["#", "Product", "Units sold", "Revenue", "Growth"].map((h) => (
                    <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--text-mid)", letterSpacing: ".06em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TOP_PRODUCTS.map((p, i) => (
                  <tr key={p.name} style={{ borderBottom: i < TOP_PRODUCTS.length - 1 ? "1px solid var(--border)" : "none" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(43,103,119,.02)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                  >
                    <td style={{ padding: "12px 10px", fontSize: 13, color: "var(--text-light)", fontWeight: 600 }}>{i + 1}</td>
                    <td style={{ padding: "12px 10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 20 }}>{p.emoji}</span>
                        <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text-dark)" }}>{p.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 10px", fontSize: 13, color: "var(--text-mid)" }}>{p.sales}</td>
                    <td style={{ padding: "12px 10px", fontSize: 13, fontWeight: 600, color: "var(--text-dark)" }}>₦{Math.round(p.revenue / 1000)}K</td>
                    <td style={{ padding: "12px 10px" }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: p.growth >= 0 ? "#0F6E56" : "#A32D2D" }}>
                        {p.growth >= 0 ? "↑" : "↓"} {Math.abs(p.growth)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Category breakdown */}
          <div style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", padding: "18px 20px" }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-dark)", marginBottom: 20 }}>Sales by category</div>
            {CAT_BREAKDOWN.map((c) => (
              <div key={c.cat} style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                  <span style={{ fontWeight: 500, color: "var(--text-dark)" }}>{c.cat}</span>
                  <span style={{ color: "var(--text-mid)" }}>{c.pct}%</span>
                </div>
                <div style={{ height: 7, background: "var(--off-white)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${c.pct}%`, background: c.color, borderRadius: 4, transition: "width .6s ease" }} />
                </div>
              </div>
            ))}

            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, marginTop: 4 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-dark)", marginBottom: 10 }}>Period totals</div>
              {[
                { label: "Total revenue", value: `₦${(totalRevenue * 1000).toLocaleString()}` },
                { label: "Total orders", value: totalOrders.toLocaleString() },
                { label: "Avg order value", value: `₦${Math.round((totalRevenue * 1000) / totalOrders).toLocaleString()}` },
              ].map((r) => (
                <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13 }}>
                  <span style={{ color: "var(--text-light)" }}>{r.label}</span>
                  <span style={{ fontWeight: 600, color: "var(--text-dark)" }}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}