import DashboardTopbar from "@/app/components/shared/DashboardTopbar";
import StatCard from "@/app/components/shared/StatCard";
import RevenueChart from "@/app/components/seller/RevenueChart";
import SellerOrders from "@/app/components/seller/SellerOrders";
import ProductInventory from "@/app/components/seller/ProductInventory";
import PayoutHistory from "@/app/components/seller/PayoutHistory";
import QuickActions from "@/app/components/seller/QuickActions";
import Link from "next/link";

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

        <QuickActions />

        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, marginBottom: 16 }}>
          <RevenueChart />
          <SellerOrders />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16 }}>
          <ProductInventory />
          <PayoutHistory />
        </div>
      </div>
    </>
  );
}