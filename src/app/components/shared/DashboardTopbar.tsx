"use client";

import Link from "next/link";
import { Bell, Search } from "lucide-react";

type Props = {
  title: string;
  actions?: React.ReactNode;
  notifCount?: number;
};

export default function DashboardTopbar({ title, actions, notifCount = 0 }: Props) {
  return (
    <div
      style={{
        background: "var(--white)",
        borderBottom: "1px solid var(--border)",
        padding: "0 28px",
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 500, color: "var(--text-dark)" }}>
        {title}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {actions}
        <button
          style={{
            width: 32,
            height: 32,
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border)",
            background: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--text-mid)",
          }}
        >
          <Search size={15} />
        </button>
        <div style={{ position: "relative" }}>
          <button
            style={{
              width: 32,
              height: 32,
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border)",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-mid)",
            }}
          >
            <Bell size={15} />
          </button>
          {notifCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: 5,
                right: 5,
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#e05c5c",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}