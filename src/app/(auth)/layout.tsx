import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Auth | Stonebay",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1d4d5a 0%, #2b6777 50%, #2e7a6e 100%)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorations */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", border: "1px solid rgba(203,216,228,0.08)", top: -300, right: -200 }} />
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", border: "1px solid rgba(82,171,152,0.1)", top: -100, right: 0 }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", border: "1px solid rgba(203,216,228,0.06)", bottom: -150, left: -100 }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 75% 30%, rgba(82,171,152,0.12) 0%, transparent 50%)",
        }} />
      </div>

      {/* Top bar */}
      <div style={{ position: "relative", zIndex: 10, padding: "24px 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "white" }}>
            Stone<span style={{ color: "var(--sage-light)" }}>bay</span>
          </span>
        </Link>
        <Link href="/" style={{ fontSize: 13, color: "rgba(203,216,228,0.7)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6, transition: "color 0.2s" }}>
          ← Back to home
        </Link>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 24px 48px", position: "relative", zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
}