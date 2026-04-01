import DashboardTopbar from "../../components/shared/DashboardTopbar";
import StatCard from "../../components/shared/StatCard";
import RevenueChart from "@/app/components/seller/RevenueChart";
import SellerOrders from "@/app/components/seller/SellerOrders";
import ProductInventory from "@/app/components/seller/ProductInventory";
import PayoutHistory from "@/app/components/seller/PayoutHistory";
import Link from "next/link";

export const metadata = { title: "Seller Dashboard" };

const QuickActions = [
  { label: "Add product", emoji: "📦", href: "/seller/products/new" },
  { label: "Create discount", emoji: "🏷️", href: "/seller/promotions/new" },
  { label: "View analytics", emoji: "📊", href: "/seller/analytics" },
  { label: "Request payout", emoji: "💳", href: "/seller/payouts" },
];

export default function SellerDashboardPage() {
  return (
    <>
      <DashboardTopbar
        title="Seller dashboard"
        notifCount={5}
        actions={
          <Link href="/seller/products/new">
            <button
              style={{
                background: "var(--teal)",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "var(--radius-sm)",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              + Add product
            </button>
          </Link>
        }
      />

      <div style={{ padding: "24px 28px", overflowY: "auto" }}>
        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <StatCard label="Revenue this month" value="₦842K" sub="↑ 18% vs last month" subColor="up" />
          <StatCard label="Total orders" value="137" sub="↑ 24 new today" subColor="up" />
          <StatCard label="Products listed" value="48" sub="3 low stock" subColor="neutral" />
          <StatCard label="Pending payout" value="₦218K" sub="Processing" subColor="neutral" />
        </div>

        {/* Quick actions */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
            marginBottom: 20,
          }}
        >
          {QuickActions.map((a) => (
            <Link key={a.href} href={a.href} style={{ textDecoration: "none" }}>
              <div
                style={{
                  background: "white",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  padding: "14px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "border-color 0.15s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor = "var(--teal)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")
                }
              >
                <div style={{ fontSize: 22, marginBottom: 6 }}>{a.emoji}</div>
                <div style={{ fontSize: 12, fontWeight: 500, color: "var(--text-dark)" }}>
                  {a.label}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Chart + Orders */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <RevenueChart />
          <SellerOrders />
        </div>

        {/* Inventory + Payouts */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr",
            gap: 16,
          }}
        >
          <ProductInventory />
          <PayoutHistory />
        </div>
      </div>
    </>
  );
}