"use client";
import Link from "next/link";

const orders = [
  { id: "SB-4821", buyer: "Usman o.", items: 2, amount: "₦36,500", status: "New order" },
  { id: "SB-4819", buyer: "Chidi O.", items: 1, amount: "₦18,500", status: "Packed" },
  { id: "SB-4814", buyer: "Ngozi A.", items: 3, amount: "₦72,000", status: "Shipped" },
  { id: "SB-4809", buyer: "Emeka B.", items: 1, amount: "₦24,500", status: "Delivered" },
];

const statusStyles: Record<string, { background: string; color: string }> = {
  "New order": { background: "#E1F5EE", color: "#085041" },
  Packed: { background: "#E6F1FB", color: "#0C447C" },
  Shipped: { background: "#FAEEDA", color: "#633806" },
  Delivered: { background: "#F1EFE8", color: "#444441" },
};

export default function SellerOrders() {
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
          marginBottom: 14,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-dark)" }}>
          Recent orders
        </div>
        <Link href="/seller/orders" style={{ fontSize: 12, color: "var(--teal)" }}>
          View all →
        </Link>
      </div>

      {orders.map((o, i) => (
        <div
          key={o.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "9px 0",
            borderBottom: i < orders.length - 1 ? "1px solid var(--border)" : "none",
          }}
        >
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: "var(--text-dark)" }}>
              #{o.id}
            </div>
            <div style={{ fontSize: 11, color: "var(--text-light)", marginTop: 1 }}>
              {o.buyer} · {o.items} item{o.items > 1 ? "s" : ""}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-dark)" }}>
              {o.amount}
            </div>
            <span
              style={{
                fontSize: 10,
                fontWeight: 500,
                padding: "2px 8px",
                borderRadius: 20,
                display: "inline-block",
                marginTop: 3,
                ...statusStyles[o.status],
              }}
            >
              {o.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}