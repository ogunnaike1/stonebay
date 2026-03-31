"use client";
import Link from "next/link";

const footerLinks = {
  Shop: [
    { label: "New arrivals", href: "/products?filter=new" },
    { label: "Best sellers", href: "/products?filter=best" },
    { label: "Deals & offers", href: "/products?filter=deals" },
    { label: "All categories", href: "/categories" },
    { label: "Gift cards", href: "/gift-cards" },
  ],
  Sellers: [
    { label: "Start selling", href: "/seller/onboard" },
    { label: "Seller login", href: "/seller" },
    { label: "Seller guide", href: "/seller/guide" },
    { label: "Fees & payouts", href: "/seller/payouts" },
    { label: "Success stories", href: "/sellers" },
  ],
  Support: [
    { label: "Help centre", href: "/help" },
    { label: "Track my order", href: "/account/orders" },
    { label: "Returns policy", href: "/returns" },
    { label: "Contact us", href: "/contact" },
    { label: "Report a seller", href: "/report" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: "var(--text-dark)", padding: "64px 48px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2.5fr 1fr 1fr 1fr",
            gap: 48,
            marginBottom: 48,
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                fontWeight: 700,
                color: "white",
                marginBottom: 16,
              }}
            >
              Stone<span style={{ color: "var(--sage)" }}>bay</span>
            </div>
            <p
              style={{
                fontSize: 13,
                color: "rgba(203,216,228,0.5)",
                lineHeight: 1.75,
                maxWidth: 260,
                marginBottom: 28,
              }}
            >
              Nigeria&apos;s premier online marketplace connecting verified sellers
              with buyers who expect quality, variety, and a seamless experience.
            </p>
            {/* Socials */}
            <div style={{ display: "flex", gap: 10 }}>
              {["𝕏", "f", "in", "▶"].map((icon, i) => (
                <button
                  key={i}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.07)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(203,216,228,0.6)",
                    fontSize: 15,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--teal)";
                    (e.currentTarget as HTMLElement).style.color = "white";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--teal)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(203,216,228,0.6)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--blue-grey)",
                  marginBottom: 20,
                }}
              >
                {title}
              </h4>
              <ul style={{ listStyle: "none" }}>
                {links.map((link) => (
                  <li key={link.href} style={{ marginBottom: 12 }}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: 13,
                        color: "rgba(203,216,228,0.45)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "var(--sage-light)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "rgba(203,216,228,0.45)")
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 12,
            color: "rgba(203,216,228,0.3)",
          }}
        >
          <span>© 2026 Stonebay Technologies Ltd. All rights reserved.</span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((t) => (
              <Link
                key={t}
                href="#"
                style={{ color: "rgba(203,216,228,0.3)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "rgba(203,216,228,0.6)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "rgba(203,216,228,0.3)")
                }
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}