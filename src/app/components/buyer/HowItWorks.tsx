"use client";

const steps = [
    {
      icon: "🔍",
      n: "01",
      title: "Browse & Discover",
      desc: "Search thousands of products across all categories from verified sellers across Nigeria.",
    },
    {
      icon: "🛒",
      n: "02",
      title: "Add to Cart",
      desc: "Select your items, choose your size or variant, and add them to your secure cart.",
    },
    {
      icon: "💳",
      n: "03",
      title: "Secure Checkout",
      desc: "Pay safely with Paystack — cards, bank transfer, or USSD. Your money is always protected.",
    },
    {
      icon: "📦",
      n: "04",
      title: "Fast Delivery",
      desc: "Your order is dispatched by the seller and delivered straight to your doorstep.",
    },
  ];
  
  export default function HowItWorks() {
    return (
      <section
        style={{
          padding: "88px 48px",
          background: "var(--teal)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 80% 50%, rgba(82,171,152,0.15) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
  
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div style={{ marginBottom: 52 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--sage-light)",
                marginBottom: 10,
              }}
            >
              Simple process
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 38,
                fontWeight: 700,
                color: "white",
              }}
            >
              How Stonebay Works
            </h2>
          </div>
  
          {/* Steps grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 24,
            }}
          >
            {steps.map((step) => (
              <StepCard key={step.n} {...step} />
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  function StepCard({
    icon,
    n,
    title,
    desc,
  }: {
    icon: string;
    n: string;
    title: string;
    desc: string;
  }) {
    return (
      <div
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "var(--radius-lg)",
          padding: "36px 28px",
          position: "relative",
          overflow: "hidden",
          transition: "background 0.3s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)")
        }
      >
        {/* Ghost number */}
        <div
          style={{
            position: "absolute",
            bottom: -20,
            right: 10,
            fontFamily: "var(--font-display)",
            fontSize: 100,
            fontWeight: 700,
            color: "rgba(255,255,255,0.04)",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {n}
        </div>
  
        {/* Icon */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: "rgba(82,171,152,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            fontSize: 24,
          }}
        >
          {icon}
        </div>
  
        <h3
          style={{
            fontSize: 17,
            fontWeight: 600,
            color: "white",
            marginBottom: 10,
            fontFamily: "var(--font-body)",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 13,
            color: "rgba(203,216,228,0.7)",
            lineHeight: 1.7,
            position: "relative",
            zIndex: 1,
          }}
        >
          {desc}
        </p>
      </div>
    );
  }