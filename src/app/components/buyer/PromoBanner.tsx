import Link from "next/link";

export default function PromoBanner() {
  return (
    <div style={{ padding: "0 48px 88px" }}>
      <div
        style={{
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          background: "linear-gradient(135deg, #1d4d5a, #2b6777)",
          boxShadow: "0 32px 80px rgba(43,103,119,0.2)",
          minHeight: 320,
        }}
      >
        {/* Left */}
        <div
          style={{
            padding: "64px 56px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--sage-light)",
              marginBottom: 14,
              fontWeight: 600,
            }}
          >
            Welcome offer
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 40,
              fontWeight: 700,
              color: "white",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Your First Order.{" "}
            <em style={{ fontStyle: "italic", color: "var(--sage-light)" }}>
              15% Off.
            </em>
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "rgba(203,216,228,0.75)",
              marginBottom: 36,
              lineHeight: 1.65,
              maxWidth: 360,
            }}
          >
            Create a free account today and get an exclusive welcome discount on
            your very first purchase — no minimum spend required.
          </p>
          <Link href="/auth/register">
            <button
              style={{
                background: "var(--sage)",
                color: "white",
                padding: "16px 36px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.04em",
                boxShadow: "0 8px 24px rgba(82,171,152,0.4)",
                transition: "all 0.25s",
                width: "fit-content",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--sage-light)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--sage)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Claim Discount
            </button>
          </Link>
        </div>

        {/* Right */}
        <div
          style={{
            background: "rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Orb decorations */}
          <div
            style={{
              position: "absolute",
              width: 280,
              height: 280,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(82,171,152,0.2), transparent 70%)",
              top: -60,
              right: -60,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(203,216,228,0.12), transparent 70%)",
              bottom: -40,
              left: -40,
            }}
          />

          {/* Code box */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              textAlign: "center",
              padding: "36px 48px",
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(203,216,228,0.5)",
                marginBottom: 12,
              }}
            >
              Your welcome code
            </div>
            <div
              style={{
                border: "2px dashed rgba(82,171,152,0.3)",
                borderRadius: 12,
                padding: "20px 32px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 52,
                  fontWeight: 700,
                  color: "var(--sage-light)",
                  letterSpacing: 6,
                  lineHeight: 1,
                }}
              >
                WELCOME
              </div>
            </div>
            <div
              style={{
                fontSize: 13,
                color: "rgba(203,216,228,0.5)",
                marginTop: 12,
              }}
            >
              15% off · All categories · One-time use
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}