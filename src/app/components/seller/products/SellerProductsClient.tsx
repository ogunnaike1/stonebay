"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardTopbar from "@/app/components/shared/DashboardTopbar";
import { Search, Plus, Edit2, Trash2, Eye, EyeOff, AlertTriangle } from "lucide-react";

type ProductStatus = "Active" | "Draft" | "Out of stock";

type Product = {
  id: string; name: string; category: string; price: number;
  stock: number; sold: number; status: ProductStatus; emoji: string; sku: string;
};

const PRODUCTS: Product[] = [
  { id: "1", name: "Premium Ankara Print Dress", category: "Fashion", price: 18500, stock: 32, sold: 128, status: "Active", emoji: "👗", sku: "SKU-001" },
  { id: "2", name: "Men's Premium Agbada Set", category: "Fashion", price: 22000, stock: 4, sold: 64, status: "Active", emoji: "👔", sku: "SKU-002" },
  { id: "3", name: "Sneakers Pro Max", category: "Footwear", price: 35000, stock: 0, sold: 89, status: "Out of stock", emoji: "👟", sku: "SKU-003" },
  { id: "4", name: "Leather Crossbody Bag", category: "Accessories", price: 28000, stock: 18, sold: 45, status: "Active", emoji: "👜", sku: "SKU-004" },
  { id: "5", name: "Gold Earring Set", category: "Jewellery", price: 9500, stock: 24, sold: 201, status: "Active", emoji: "💍", sku: "SKU-005" },
  { id: "6", name: "Luxury Scented Candle", category: "Home", price: 5500, stock: 60, sold: 312, status: "Draft", emoji: "🕯️", sku: "SKU-006" },
  { id: "7", name: "Rattan Wall Art", category: "Home", price: 12800, stock: 11, sold: 56, status: "Active", emoji: "🏺", sku: "SKU-007" },
  { id: "8", name: "Ankara Face Cap", category: "Fashion", price: 3500, stock: 60, sold: 78, status: "Active", emoji: "🧢", sku: "SKU-008" },
];

const STATUS_STYLE: Record<ProductStatus, { bg: string; color: string }> = {
  Active:         { bg: "#E1F5EE", color: "#085041" },
  Draft:          { bg: "#FAEEDA", color: "#633806" },
  "Out of stock": { bg: "#FCEBEB", color: "#791F1F" },
};

const stockColor = (n: number) => n === 0 ? "#A32D2D" : n <= 5 ? "#854F0B" : "#0F6E56";

export default function SellerProductsClient() {
  const [products, setProducts] = useState(PRODUCTS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const categories = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

  const filtered = products
    .filter((p) => category === "All" || p.category === category)
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
    );

  const toggleStatus = (id: string) =>
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        if (p.stock === 0) return p; // can't activate if out of stock
        return { ...p, status: p.status === "Active" ? "Draft" : "Active" };
      })
    );

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
  };

  const stats = [
    { label: "Total products", value: products.length, sub: "Listed" },
    { label: "Active", value: products.filter((p) => p.status === "Active").length, sub: "Live now" },
    { label: "Low stock", value: products.filter((p) => p.stock > 0 && p.stock <= 5).length, sub: "Need restock" },
    { label: "Out of stock", value: products.filter((p) => p.stock === 0).length, sub: "Unavailable" },
  ];

  return (
    <>
      <DashboardTopbar
        title="Products"
        actions={
          <Link href="/seller/products/new">
            <button style={{ background: "var(--teal)", color: "white", border: "none", padding: "8px 16px", borderRadius: "var(--radius-sm)", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--teal-dark)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--teal)")}
            >
              <Plus size={14} /> Add product
            </button>
          </Link>
        }
      />
      <div style={{ padding: "24px 28px", overflowY: "auto" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ background: "var(--off-white)", borderRadius: "var(--radius-md)", padding: "14px 16px" }}>
              <div style={{ fontSize: 12, color: "var(--text-mid)", marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 600, color: "var(--text-dark)", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "var(--text-light)", marginTop: 4 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-light)", pointerEvents: "none" }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products or SKU…"
              style={{ width: "100%", paddingLeft: 36, paddingRight: 14, paddingTop: 9, paddingBottom: 9, border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 13, color: "var(--text-dark)", outline: "none", background: "white" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--teal)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value)}
            style={{ padding: "9px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 13, color: "var(--text-dark)", background: "white", outline: "none", cursor: "pointer" }}
          >
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Table */}
        <div style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--off-white)", borderBottom: "1px solid var(--border)" }}>
                {["Product", "SKU", "Category", "Price", "Stock", "Sold", "Status", "Actions"].map((h) => (
                  <th key={h} style={{ padding: "11px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--text-mid)", letterSpacing: ".06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} style={{ padding: "48px", textAlign: "center", color: "var(--text-light)", fontSize: 14 }}>No products found</td></tr>
              ) : filtered.map((p, i) => (
                <tr key={p.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none", transition: "background .1s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(43,103,119,.02)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                >
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 38, height: 38, borderRadius: "var(--radius-sm)", background: "var(--off-white)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{p.emoji}</div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-dark)", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "var(--text-light)", fontFamily: "monospace" }}>{p.sku}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: "var(--text-mid)" }}>{p.category}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "var(--text-dark)" }}>₦{p.price.toLocaleString()}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: stockColor(p.stock) }}>{p.stock === 0 ? "Out" : p.stock}</span>
                    {p.stock > 0 && p.stock <= 5 && <span style={{ marginLeft: 6, fontSize: 11 }}>⚠️</span>}
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: "var(--text-mid)" }}>{p.sold}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, ...STATUS_STYLE[p.status] }}>{p.status}</span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => toggleStatus(p.id)} title={p.status === "Active" ? "Unpublish" : "Publish"}
                        style={{ width: 30, height: 30, border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-mid)", transition: "all .15s" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--teal)"; (e.currentTarget as HTMLElement).style.color = "var(--teal)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-mid)"; }}
                      >
                        {p.status === "Active" ? <EyeOff size={13} /> : <Eye size={13} />}
                      </button>
                      <Link href={`/seller/products/${p.id}/edit`}>
                        <button style={{ width: 30, height: 30, border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-mid)", transition: "all .15s" }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--teal)"; (e.currentTarget as HTMLElement).style.color = "var(--teal)"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-mid)"; }}
                        ><Edit2 size={13} /></button>
                      </Link>
                      <button onClick={() => setDeleteId(p.id)}
                        style={{ width: 30, height: 30, border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#e05c5c", transition: "border-color .15s" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#e05c5c")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
                      ><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirm modal */}
      {deleteId && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
          <div style={{ background: "white", borderRadius: "var(--radius-xl)", padding: "28px", maxWidth: 380, width: "100%", margin: "0 24px", textAlign: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#FCEBEB", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: "#e05c5c" }}><AlertTriangle size={22} /></div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--text-dark)", marginBottom: 10 }}>Delete product?</div>
            <p style={{ fontSize: 14, color: "var(--text-mid)", marginBottom: 24, lineHeight: 1.6 }}>This product will be permanently removed and buyers won&apos;t be able to find it anymore.</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setDeleteId(null)} style={{ flex: 1, padding: "11px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "white", fontSize: 14, fontWeight: 500, cursor: "pointer", color: "var(--text-dark)" }}>Cancel</button>
              <button onClick={() => deleteProduct(deleteId)} style={{ flex: 1, padding: "11px", background: "#e05c5c", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}