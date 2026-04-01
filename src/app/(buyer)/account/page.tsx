import DashboardTopbar from "@/app/components/shared/DashboardTopbar";
import StatCard from "@/app/components/shared/StatCard";
import RecentOrders from "@/app/components/buyer/dashboard/RecentOrders";
import WishlistPreview from "@/app/components/buyer/dashboard/WishlistPreview";
import RecommendedProducts from "@/app/components/buyer/dashboard/RecommendedProducts";
import Link from "next/link";

export const metadata = { title: "My Account" };

export default function BuyerDashboardPage() {
  return (
    <>
      <DashboardTopbar title="Dashboard" notifCount={2} />

      <div style={{ padding: "24px 28px", overflowY: "auto" }}>
        {/* Welcome bar */}
        <div
          style={{
            background: "linear-gradient(120deg, #1d4d5a, #2b6777)",
            borderRadius: "var(--radius-lg)",
            padding: "20px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <div>
            <div style={{ fontSize: 13, color: "rgba(203,216,228,0.7)", marginBottom: 4 }}>
              Good morning,
            </div>
            <div style={{ fontSize: 20, fontWeight: 500, color: "white" }}>
              Adeola 👋
            </div>
          </div>
          <Link href="/products">
            <button
              style={{
                background: "var(--sage)",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "var(--radius-sm)",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Shop Now
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <StatCard label="Total orders" value="24" sub="↑ 3 this month" subColor="up" />
          <StatCard label="Total spent" value="₦312K" sub="↑ ₦48K this month" subColor="up" />
          <StatCard label="Wishlist items" value="8" sub="2 back in stock" />
          <StatCard label="Loyalty points" value="1,240" sub="≈ ₦6,200 value" />
        </div>

        {/* Orders + Wishlist */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <RecentOrders />
          <WishlistPreview />
        </div>

        {/* Recommended */}
        <RecommendedProducts />
      </div>
    </>
  );
}