"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  revenue: [95, 140, 88, 175, 210, 260, 185],
  orders: [12, 18, 10, 22, 28, 34, 24],
};

export default function RevenueChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let chart: unknown;

    async function init() {
      const { Chart, registerables } = await import("chart.js");
      Chart.register(...registerables);

      if (!canvasRef.current) return;

      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const gridColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
      const tickColor = isDark ? "#888" : "#999";

      chart = new Chart(canvasRef.current, {
        type: "bar",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: "Revenue (₦K)",
              data: data.revenue,
              backgroundColor: "#2b6777",
              borderRadius: 4,
              yAxisID: "y",
            },
            {
              label: "Orders",
              data: data.orders,
              type: "line" as const,
              borderColor: "#52ab98",
              backgroundColor: "rgba(82,171,152,0.1)",
              borderWidth: 2,
              pointRadius: 3,
              pointBackgroundColor: "#52ab98",
              tension: 0.4,
              fill: true,
              yAxisID: "y1",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              grid: { color: gridColor },
              ticks: { color: tickColor, font: { size: 11 } },
            },
            y: {
              grid: { color: gridColor },
              ticks: {
                color: tickColor,
                font: { size: 11 },
                callback: (v) => "₦" + v + "K",
              },
              position: "left",
            },
            y1: { display: false, position: "right" },
          },
        },
      });
    }

    init();
    return () => {
      if (chart && typeof (chart as { destroy: () => void }).destroy === "function") {
        (chart as { destroy: () => void }).destroy();
      }
    };
  }, []);

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
          marginBottom: 10,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-dark)" }}>
          Revenue — last 7 days
        </div>
        <Link href="/seller/analytics" style={{ fontSize: 12, color: "var(--teal)" }}>
          Full report →
        </Link>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, marginBottom: 12, fontSize: 12, color: "var(--text-mid)" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: "#2b6777", display: "inline-block" }} />
          Revenue
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: "#52ab98", display: "inline-block" }} />
          Orders
        </span>
      </div>

      <div style={{ position: "relative", width: "100%", height: 200 }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}