import DashboardSidebar, { NavItem } from "../../components/shared/DashboardSidebar";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  BarChart2,
  CreditCard,
  Star,
  Tag,
  Settings,
} from "lucide-react";

const navSections = [
  {
    title: "Store",
    items: [
      { label: "Dashboard", href: "/seller", icon: <LayoutDashboard size={16} /> },
      { label: "Orders", href: "/seller/orders", icon: <ShoppingBag size={16} />, badge: 5 },
      { label: "Products", href: "/seller/products", icon: <Package size={16} /> },
      { label: "Analytics", href: "/seller/analytics", icon: <BarChart2 size={16} /> },
      { label: "Payouts", href: "/seller/payouts", icon: <CreditCard size={16} /> },
    ] as NavItem[],
  },
  {
    title: "Manage",
    items: [
      { label: "Reviews", href: "/seller/reviews", icon: <Star size={16} /> },
      { label: "Promotions", href: "/seller/promotions", icon: <Tag size={16} /> },
      { label: "Settings", href: "/seller/settings", icon: <Settings size={16} /> },
    ] as NavItem[],
  },
];

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--off-white)" }}>
      <DashboardSidebar
        navSections={navSections}
        userName="StyleHaus Lagos"
        userSub="Seller account"
        avatarInitials="SH"
        storeBadge="Active store"
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}