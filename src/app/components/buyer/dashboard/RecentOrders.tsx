import Link from "next/link";

const orders = [
  {
    id: "SB-4821",
    name: "Premium Ankara Dress",
    seller: "StyleHaus",
    date: "14 Mar 2026",
    price: "₦18,500",
    status: "Delivered",
    emoji: "👗",
  },
  {
    id: "SB-4819",
    name: "Wireless Headphones",
    seller: "TechHub",
    date: "18 Mar 2026",
    price: "₦42,000",
    status: "In transit",
    emoji: "🎧",
  },
  {
    id: "SB-4814",
    name: "Skincare Essentials Kit",
    seller: "GlowUp",
    date: "22 Mar 2026",
    price: "₦8,900",
    status: "Processing",
    emoji: "✨",
  },
];

const statusStyles: Record<string, { background: string; color: string }> = {
  Delivered: { background: "#E1F5EE", color: "#085041" },
  "In transit": { background: "#E6F1FB", color: "#0C447C" },
  Processing: { background: "#FAEEDA", color: "#633806" },
};

export default function RecentOrders() {
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
        <Link href="/account/orders" style={{ fontSize: 12, color: "var(--teal)" }}>
          View all →
        </Link>
      </div>

      {orders.map((order, i) => (
        <div
          key={order.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 0",
            borderBottom: i < orders.length - 1 ? "1px solid var(--border)" : "none",
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "var(--radius-md)",
              background: "var(--off-white)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              flexShrink: 0,
            }}
          >
            {order.emoji}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "var(--text-dark)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {order.name}
            </div>
            <div style={{ fontSize: 11, color: "var(--text-light)", marginTop: 2 }}>
              {order.seller} · {order.date}
            </div>
          </div>

          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-dark)" }}>
              {order.price}
            </div>
            <span
              style={{
                fontSize: 10,
                fontWeight: 500,
                padding: "2px 8px",
                borderRadius: 20,
                display: "inline-block",
                marginTop: 3,
                ...statusStyles[order.status],
              }}
            >
              {order.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}