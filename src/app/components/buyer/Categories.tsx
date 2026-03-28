"use client";

import Link from "next/link";

const categories = [
  { icon: "👗", name: "Fashion", count: "2,400+", slug: "fashion" },
  { icon: "📱", name: "Electronics", count: "1,800+", slug: "electronics" },
  { icon: "🏠", name: "Home & Living", count: "3,100+", slug: "home-living" },
  { icon: "💄", name: "Beauty", count: "920+", slug: "beauty" },
  { icon: "⚽", name: "Sports", count: "640+", slug: "sports" },
];

export default function Categories() {
  return (
    <section style={{ padding: "88px 48px" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 52,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--sage)",
                marginBottom: 10,
              }}
            >
              Browse
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 38,
                fontWeight: 700,
                color: "var(--text-dark)",
              }}
            >
              Shop by Category
            </h2>
          </div>
          <Link
            href="/categories"
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "var(--teal)",
              borderBottom: "1px solid var(--teal)",
              paddingBottom: 2,
              transition: "opacity 0.2s",
            }}
          >
            All categories →
          </Link>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 16,
          }}
        >
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  icon,
  name,
  count,
  slug,
}: {
  icon: string;
  name: string;
  count: string;
  slug: string;
}) {
  return (
    <Link href={`/category/${slug}`} style={{ textDecoration: "none" }}>
      <div
        className="cat-card-hover"
        style={{
          background: "var(--off-white)",
          borderRadius: "var(--radius-lg)",
          padding: "28px 20px",
          textAlign: "center",
          border: "1px solid var(--border)",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(-4px)";
          el.style.boxShadow = "0 16px 40px rgba(43,103,119,0.2)";
          el.style.background = "var(--teal)";
          const nameEl = el.querySelector(".cat-name") as HTMLElement;
          const countEl = el.querySelector(".cat-count") as HTMLElement;
          if (nameEl) nameEl.style.color = "white";
          if (countEl) countEl.style.color = "rgba(255,255,255,0.7)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "none";
          el.style.background = "var(--off-white)";
          const nameEl = el.querySelector(".cat-name") as HTMLElement;
          const countEl = el.querySelector(".cat-count") as HTMLElement;
          if (nameEl) nameEl.style.color = "var(--text-dark)";
          if (countEl) countEl.style.color = "var(--text-light)";
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "rgba(43,103,119,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: 26,
          }}
        >
          {icon}
        </div>
        <div
          className="cat-name"
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--text-dark)",
            marginBottom: 4,
            transition: "color 0.3s",
          }}
        >
          {name}
        </div>
        <div
          className="cat-count"
          style={{
            fontSize: 12,
            color: "var(--text-light)",
            transition: "color 0.3s",
          }}
        >
          {count} items
        </div>
      </div>
    </Link>
  );
}