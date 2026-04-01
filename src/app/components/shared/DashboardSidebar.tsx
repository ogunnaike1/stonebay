"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
};

type Props = {
  navSections: { title: string; items: NavItem[] }[];
  userName: string;
  userSub: string;
  avatarInitials: string;
  storeBadge?: string;
};

export default function DashboardSidebar({
  navSections,
  userName,
  userSub,
  avatarInitials,
  storeBadge,
}: Props) {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: 220,
        flexShrink: 0,
        background: "#1d4d5a",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "24px 20px",
          borderBottom: "0.5px solid rgba(255,255,255,0.1)",
          marginBottom: 16,
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 700,
              color: "white",
            }}
          >
            Stone<span style={{ color: "#7ec8b8" }}>bay</span>
          </span>
        </Link>
      </div>

      {/* Nav sections */}
      <nav style={{ flex: 1, overflowY: "auto" }}>
        {navSections.map((section) => (
          <div key={section.title}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(203,216,228,0.4)",
                padding: "12px 20px 6px",
              }}
            >
              {section.title}
            </div>
            {section.items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "9px 20px",
                      fontSize: 13,
                      color: active ? "white" : "rgba(203,216,228,0.7)",
                      background: active
                        ? "rgba(82,171,152,0.15)"
                        : "transparent",
                      borderLeft: `2px solid ${active ? "#52ab98" : "transparent"}`,
                      transition: "all 0.15s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLElement).style.background =
                          "rgba(255,255,255,0.06)";
                        (e.currentTarget as HTMLElement).style.color = "white";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLElement).style.background =
                          "transparent";
                        (e.currentTarget as HTMLElement).style.color =
                          "rgba(203,216,228,0.7)";
                      }
                    }}
                  >
                    <span style={{ flexShrink: 0, opacity: 0.85 }}>
                      {item.icon}
                    </span>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span
                        style={{
                          background: "#e05c5c",
                          color: "white",
                          fontSize: 10,
                          fontWeight: 500,
                          padding: "2px 7px",
                          borderRadius: 10,
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User bottom */}
      <div
        style={{
          padding: "16px 20px",
          borderTop: "0.5px solid rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(82,171,152,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 500,
              color: "#7ec8b8",
              flexShrink: 0,
            }}
          >
            {avatarInitials}
          </div>
          <div style={{ overflow: "hidden" }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "white",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {userName}
            </div>
            {storeBadge ? (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  background: "rgba(82,171,152,0.2)",
                  borderRadius: 4,
                  padding: "1px 7px",
                  fontSize: 10,
                  color: "#7ec8b8",
                  marginTop: 2,
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "#7ec8b8",
                    display: "inline-block",
                  }}
                />
                {storeBadge}
              </div>
            ) : (
              <div style={{ fontSize: 11, color: "rgba(203,216,228,0.5)" }}>
                {userSub}
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}