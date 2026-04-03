"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardTopbar from "@/app/components/shared/DashboardTopbar";
import { ChevronLeft, Upload, Plus, X, Check } from "lucide-react";

const CATEGORIES = ["Fashion", "Electronics", "Home & Living", "Beauty", "Sports", "Footwear", "Accessories", "Jewellery", "Food & Drinks", "Books", "Other"];
const EMOJIS = ["👗", "🧵", "🪡", "📦", "✨", "🏷️"];

export default function AddProductClient() {
  const [form, setForm] = useState({ name: "", description: "", category: "", price: "", comparePrice: "", sku: "", stock: "", weight: "", tags: "" });
  const [status, setStatus] = useState<"Active" | "Draft">("Active");
  const [sizes, setSizes] = useState<string[]>([]);
  const [newSize, setNewSize] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const addSize = () => {
    const s = newSize.trim().toUpperCase();
    if (s && !sizes.includes(s)) { setSizes([...sizes, s]); setNewSize(""); }
  };
  const save = (s: "Active" | "Draft") => { setStatus(s); setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 14, color: "var(--text-dark)", outline: "none", background: "white", fontFamily: "var(--font-body)" };
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => (e.currentTarget.style.borderColor = "var(--teal)");
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => (e.currentTarget.style.borderColor = "var(--border)");

  return (
    <>
      <DashboardTopbar
        title="Add new product"
        actions={
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => save("Draft")} style={{ padding: "8px 16px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "white", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "var(--text-dark)" }}>Save draft</button>
            <button onClick={() => save("Active")} style={{ background: saved ? "var(--sage)" : "var(--teal)", color: "white", border: "none", padding: "8px 20px", borderRadius: "var(--radius-sm)", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 7, transition: "background .2s" }}>
              {saved ? <><Check size={14} /> Published!</> : "Publish product"}
            </button>
          </div>
        }
      />
      <div style={{ padding: "20px 28px", overflowY: "auto" }}>
        <Link href="/seller/products" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-mid)", textDecoration: "none", marginBottom: 20 }}>
          <ChevronLeft size={14} /> Back to products
        </Link>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>

          {/* ── LEFT ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Product info */}
            <Card title="Product information">
              <div style={{ marginBottom: 16 }}>
                <Label>Product name</Label>
                <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Premium Ankara Print Dress" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>
              <div>
                <Label>Description</Label>
                <textarea value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Describe your product — materials, features, what makes it special…" rows={5} style={{ ...inputStyle, resize: "vertical" }} onFocus={onFocus} onBlur={onBlur} />
              </div>
            </Card>

            {/* Images */}
            <Card title="Product images">
              <p style={{ fontSize: 13, color: "var(--text-light)", marginBottom: 14 }}>Add up to 6 images. The first image will be the cover photo shown to buyers.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                {images.map((_, i) => (
                  <div key={i} style={{ aspectRatio: "1", borderRadius: "var(--radius-md)", background: "var(--off-white)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, position: "relative" }}>
                    {EMOJIS[i]}
                    <button onClick={() => setImages(images.filter((__, j) => j !== i))} style={{ position: "absolute", top: 6, right: 6, width: 22, height: 22, borderRadius: "50%", background: "rgba(0,0,0,.5)", border: "none", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={12} /></button>
                    {i === 0 && <span style={{ position: "absolute", bottom: 7, left: 7, fontSize: 9, background: "var(--teal)", color: "white", padding: "2px 7px", borderRadius: 10, fontWeight: 700, letterSpacing: ".04em" }}>COVER</span>}
                  </div>
                ))}
                {images.length < 6 && (
                  <button onClick={() => setImages([...images, `img-${Date.now()}`])}
                    style={{ aspectRatio: "1", borderRadius: "var(--radius-md)", border: "2px dashed var(--border)", background: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, transition: "all .15s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--teal)"; (e.currentTarget as HTMLElement).style.background = "rgba(43,103,119,.03)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.background = "none"; }}
                  >
                    <Upload size={20} color="var(--text-light)" />
                    <span style={{ fontSize: 12, color: "var(--text-light)" }}>Upload image</span>
                  </button>
                )}
              </div>
            </Card>

            {/* Pricing */}
            <Card title="Pricing">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <Label>Selling price (₦)</Label>
                  <input type="number" value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="0" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                  <div style={{ fontSize: 11, color: "var(--text-light)", marginTop: 4 }}>The price buyers will pay</div>
                </div>
                <div>
                  <Label>Original price (₦) — <span style={{ fontWeight: 400, color: "var(--text-light)" }}>optional</span></Label>
                  <input type="number" value={form.comparePrice} onChange={(e) => update("comparePrice", e.target.value)} placeholder="0" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                  <div style={{ fontSize: 11, color: "var(--text-light)", marginTop: 4 }}>Shown as crossed-out price (sale)</div>
                </div>
              </div>
              {form.price && form.comparePrice && Number(form.comparePrice) > Number(form.price) && (
                <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(82,171,152,.08)", borderRadius: "var(--radius-sm)", fontSize: 13, color: "var(--sage)", display: "flex", gap: 8, alignItems: "center" }}>
                  <span>🏷️</span> Discount: {Math.round((1 - Number(form.price) / Number(form.comparePrice)) * 100)}% off shown to buyers
                </div>
              )}
            </Card>

            {/* Inventory */}
            <Card title="Inventory & shipping">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 20 }}>
                <div>
                  <Label>SKU</Label>
                  <input value={form.sku} onChange={(e) => update("sku", e.target.value)} placeholder="SKU-001" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div>
                  <Label>Stock quantity</Label>
                  <input type="number" value={form.stock} onChange={(e) => update("stock", e.target.value)} placeholder="0" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div>
                  <Label>Weight (kg)</Label>
                  <input type="number" step="0.1" value={form.weight} onChange={(e) => update("weight", e.target.value)} placeholder="0.5" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
              </div>

              <div>
                <Label>Sizes / variants — <span style={{ fontWeight: 400, color: "var(--text-light)" }}>optional</span></Label>
                <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                  <input value={newSize} onChange={(e) => setNewSize(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addSize()} placeholder="e.g. S, M, XL, 42…" style={{ ...inputStyle, flex: 1 }} onFocus={onFocus} onBlur={onBlur} />
                  <button onClick={addSize} style={{ padding: "10px 16px", background: "var(--teal)", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}><Plus size={14} /> Add</button>
                </div>
                {sizes.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {sizes.map((s) => (
                      <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", background: "rgba(43,103,119,.08)", borderRadius: 20, fontSize: 13, fontWeight: 500, color: "var(--teal)" }}>
                        {s}
                        <button onClick={() => setSizes(sizes.filter((x) => x !== s))} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--teal)", display: "flex", padding: 0 }}><X size={12} /></button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Card>

          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Status */}
            <Card title="Status">
              {(["Active", "Draft"] as const).map((s) => (
                <button key={s} onClick={() => setStatus(s)}
                  style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 14px", border: `1.5px solid ${status === s ? "var(--teal)" : "var(--border)"}`, borderRadius: "var(--radius-sm)", background: status === s ? "rgba(43,103,119,.05)" : "white", cursor: "pointer", marginBottom: s === "Active" ? 10 : 0, transition: "all .15s" }}
                >
                  <div style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${status === s ? "var(--teal)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {status === s && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--teal)" }} />}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: status === s ? "var(--teal)" : "var(--text-dark)" }}>{s}</div>
                    <div style={{ fontSize: 11, color: "var(--text-light)" }}>{s === "Active" ? "Visible to buyers now" : "Hidden, save for later"}</div>
                  </div>
                </button>
              ))}
            </Card>

            {/* Category */}
            <Card title="Category">
              <select value={form.category} onChange={(e) => update("category", e.target.value)} style={{ ...inputStyle, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}>
                <option value="">Select a category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Card>

            {/* Tags */}
            <Card title="Tags">
              <input value={form.tags} onChange={(e) => update("tags", e.target.value)} placeholder="ankara, dress, fashion, wax…" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              <div style={{ fontSize: 11, color: "var(--text-light)", marginTop: 8 }}>Separate tags with commas. Tags help buyers find your product.</div>
            </Card>

            {/* Summary */}
            <Card title="Summary">
              {[
                { label: "Name", value: form.name || "—" },
                { label: "Category", value: form.category || "—" },
                { label: "Price", value: form.price ? `₦${Number(form.price).toLocaleString()}` : "—" },
                { label: "Stock", value: form.stock || "—" },
                { label: "Sizes", value: sizes.length > 0 ? sizes.join(", ") : "—" },
                { label: "Status", value: status },
              ].map((r) => (
                <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
                  <span style={{ color: "var(--text-light)" }}>{r.label}</span>
                  <span style={{ fontWeight: 500, color: "var(--text-dark)", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "right" }}>{r.value}</span>
                </div>
              ))}
              <button onClick={() => save("Active")} style={{ width: "100%", marginTop: 16, padding: "12px", background: saved ? "var(--sage)" : "var(--teal)", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, transition: "background .2s" }}>
                {saved ? <><Check size={15} /> Published!</> : "Publish product"}
              </button>
            </Card>

          </div>
        </div>
      </div>
    </>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", padding: "20px 22px" }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-dark)", marginBottom: 16 }}>{title}</div>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 6 }}>{children}</label>;
}