"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Search, User, Menu, X } from "lucide-react";

const navLinks = [
  { label: "New Arrivals", href: "/products?filter=new" },
  { label: "Shop", href: "/products" },
  { label: "Sellers", href: "/sellers" },
  { label: "Deals", href: "/products?filter=deals" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = 3; // will come from Zustand store later

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 200,
          background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
          transition: "all 0.3s ease",
          boxShadow: scrolled ? "var(--shadow-sm)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 48px",
            height: 68,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 26,
                fontWeight: 700,
                color: "var(--teal)",
                letterSpacing: "-0.3px",
              }}
            >
              Stone<span style={{ color: "var(--sage)" }}>bay</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul
            style={{
              display: "flex",
              gap: 36,
              listStyle: "none",
            }}
            className="hidden md:flex"
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--text-mid)",
                    letterSpacing: "0.03em",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "var(--teal)")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = "var(--text-mid)")
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Search */}
            <NavIconButton href="/search" aria-label="Search">
              <Search size={18} />
            </NavIconButton>

            {/* Account */}
            <NavIconButton href="/account" aria-label="Account">
              <User size={18} />
            </NavIconButton>

            {/* Cart */}
            <Link
              href="/cart"
              style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 38, height: 38 }}
            >
              <ShoppingBag size={20} color="var(--text-mid)" />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 2,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: "var(--sage)",
                    color: "white",
                    fontSize: 9,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* CTA */}
            <Link href="/seller/onboard">
              <button
                style={{
                  background: "var(--teal)",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: "0.03em",
                  transition: "background 0.2s, transform 0.15s",
                  marginLeft: 8,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--teal-dark)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--teal)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                Start Selling
              </button>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "transparent",
                color: "var(--text-mid)",
                marginLeft: 4,
              }}
              className="flex md:hidden"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            style={{
              background: "white",
              borderTop: "1px solid var(--border)",
              padding: "16px 24px 24px",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 0",
                  fontSize: 15,
                  fontWeight: 500,
                  color: "var(--text-dark)",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}

function NavIconButton({
  href,
  children,
  "aria-label": ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  "aria-label": string;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      style={{
        width: 38,
        height: 38,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text-mid)",
        transition: "background 0.2s, color 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--off-white)";
        (e.currentTarget as HTMLElement).style.color = "var(--teal)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "transparent";
        (e.currentTarget as HTMLElement).style.color = "var(--text-mid)";
      }}
    >
      {children}
    </Link>
  );
}