import Link from "next/link";

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "92vh",
        background: "linear-gradient(135deg, #1d4d5a 0%, #2b6777 45%, #3a6b6e 100%)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative circles */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {[
          { size: 600, top: -200, right: -100, opacity: 0.12 },
          { size: 400, top: 100, right: 100, opacity: 0.15 },
          { size: 200, top: 220, right: 250, opacity: 0.2 },
        ].map((c, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: c.size,
              height: c.size,
              borderRadius: "50%",
              border: `1px solid rgba(203,216,228,${c.opacity})`,
              top: c.top,
              right: c.right,
            }}
          />
        ))}
      </div>

      {/* Left: copy */}
      <div
        style={{
          padding: "80px 64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
          maxWidth: 640,
        }}
      >
        {/* Live badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(82,171,152,0.2)",
            border: "1px solid rgba(82,171,152,0.35)",
            borderRadius: 40,
            padding: "6px 16px",
            fontSize: 12,
            fontWeight: 500,
            color: "var(--sage-light)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 32,
            width: "fit-content",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--sage-light)",
              display: "inline-block",
              animation: "pulse-dot 2s ease-in-out infinite",
            }}
          />
          Nigeria&apos;s #1 Marketplace
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(44px, 5.5vw, 76px)",
            fontWeight: 700,
            lineHeight: 1.05,
            color: "white",
            marginBottom: 24,
          }}
        >
          Everything You Need,{" "}
          <em style={{ fontStyle: "italic", color: "var(--sage-light)" }}>
            All in One Place.
          </em>
        </h1>

        <p
          style={{
            fontSize: 16,
            fontWeight: 300,
            lineHeight: 1.75,
            color: "rgba(203,216,228,0.8)",
            maxWidth: 420,
            marginBottom: 48,
          }}
        >
          Shop from thousands of verified sellers across fashion, electronics,
          home goods, beauty, and more — delivered to your door.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 56 }}>
          <Link href="/products">
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
              Explore Now
            </button>
          </Link>
          <Link href="/seller/onboard">
            <button
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "16px 36px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 400,
                letterSpacing: "0.04em",
                backdropFilter: "blur(8px)",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.14)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
              }}
            >
              Become a Seller
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: 0,
            borderTop: "1px solid rgba(203,216,228,0.15)",
            paddingTop: 32,
          }}
        >
          {[
            { num: "15K+", label: "Products" },
            { num: "850+", label: "Sellers" },
            { num: "4.9★", label: "Avg Rating" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                paddingRight: i < 2 ? 32 : 0,
                marginRight: i < 2 ? 32 : 0,
                borderRight: i < 2 ? "1px solid rgba(203,216,228,0.15)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 34,
                  fontWeight: 700,
                  color: "white",
                  lineHeight: 1,
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(203,216,228,0.6)",
                  marginTop: 4,
                  letterSpacing: "0.05em",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: 3D floating cards */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
          perspective: 1000,
        }}
      >
        <div style={{ position: "relative", width: 420, height: 480 }}>
          {/* Main card */}
          <div
            className="animate-float"
            style={{
              position: "absolute",
              width: 280,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%) rotateY(-8deg) rotateX(4deg)",
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 20,
              padding: 20,
              boxShadow:
                "0 24px 64px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
              zIndex: 3,
            }}
          >
            <div
              style={{
                height: 180,
                borderRadius: 12,
                background:
                  "linear-gradient(135deg, rgba(82,171,152,0.3), rgba(203,216,228,0.2))",
                marginBottom: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 48 }}>👗</span>
            </div>
            <div style={{ fontSize: 11, color: "rgba(203,216,228,0.7)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Fashion · Lagos</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "white", marginBottom: 8 }}>Premium Linen Set</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "var(--sage-light)" }}>₦24,500</div>
              <div style={{ background: "rgba(82,171,152,0.25)", color: "var(--sage-light)", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 500 }}>New</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
              <div style={{ color: "var(--sage-light)", fontSize: 12 }}>★★★★★</div>
              <div style={{ fontSize: 11, color: "rgba(203,216,228,0.5)" }}>128 sold</div>
            </div>
          </div>

          {/* Side card */}
          <div
            className="animate-float-slow"
            style={{
              position: "absolute",
              width: 200,
              right: 10,
              top: 30,
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 20,
              padding: 20,
              boxShadow: "0 24px 64px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
              zIndex: 2,
            }}
          >
            <div
              style={{
                height: 100,
                borderRadius: 12,
                background: "linear-gradient(135deg, rgba(203,216,228,0.25), rgba(82,171,152,0.15))",
                marginBottom: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 36 }}>📱</span>
            </div>
            <div style={{ fontSize: 11, color: "rgba(203,216,228,0.7)", letterSpacing: "0.06em", marginBottom: 4 }}>Electronics</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "white", marginBottom: 8 }}>Smart Watch Pro</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--sage-light)" }}>₦89,000</div>
              <div style={{ fontSize: 11, color: "var(--sage-light)" }}>★★★★</div>
            </div>
          </div>

          {/* Bottom trust card */}
          <div
            style={{
              position: "absolute",
              width: 220,
              left: 20,
              bottom: 20,
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 20,
              padding: 20,
              boxShadow: "0 24px 64px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              gap: 12,
              animation: "floatSlow 6s ease-in-out infinite 1.4s",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "rgba(82,171,152,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                flexShrink: 0,
              }}
            >
              🔒
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "white" }}>Buyer Protection</div>
              <div style={{ fontSize: 11, color: "rgba(203,216,228,0.5)", marginTop: 2 }}>100% secure checkout</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}