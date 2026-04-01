import DashboardSidebar, { NavItem } from "@/app/components/shared/DashboardSidebar";
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  ShoppingCart,
  User,
  MapPin,
  Settings,
  Star,
} from "lucide-react";

const navSections = [
  {
    title: "Main",
    items: [
      { label: "Overview", href: "/account", icon: <LayoutDashboard size={16} /> },
      { label: "My Orders", href: "/account/orders", icon: <ShoppingBag size={16} />, badge: 3 },
      { label: "Wishlist", href: "/account/wishlist", icon: <Heart size={16} /> },
      { label: "Cart", href: "/cart", icon: <ShoppingCart size={16} /> },
    ] as NavItem[],
  },
  {
    title: "Account",
    items: [
      { label: "Profile", href: "/account/profile", icon: <User size={16} /> },
      { label: "Addresses", href: "/account/addresses", icon: <MapPin size={16} /> },
      { label: "Reviews", href: "/account/reviews", icon: <Star size={16} /> },
      { label: "Settings", href: "/account/settings", icon: <Settings size={16} /> },
    ] as NavItem[],
  },
];

export default function BuyerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--off-white)" }}>
      <DashboardSidebar
        navSections={navSections}
        userName="Adeola Kamara"
        userSub="Buyer account"
        avatarInitials="AK"
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}