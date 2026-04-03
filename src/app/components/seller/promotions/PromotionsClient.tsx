"use client";

import { useState } from "react";
import DashboardTopbar from "@/app/components/shared/DashboardTopbar";
import { Plus, Copy, Trash2, Tag, Zap, Check, X } from "lucide-react";

type DiscType   = "Percentage" | "Fixed";
type PromoStatus = "Active" | "Expired" | "Draft";

type Promo = {
  id: string; code: string; type: DiscType; value: number;
  minOrder: number; uses: number; maxUses: number; expiry: string; status: PromoStatus;
};

const STATUS_STYLE: Record<PromoStatus, { bg: string; color: string }> = {
  Active:  { bg: "#E1F5EE", color: "#085041" },
  Expired: { bg: "#FCEBEB", color: "#791F1F" },
  Draft:   { bg: "#FAEEDA", color: "#633806" },
};

const INIT_PROMOS: Promo[] = [
  { id: "1", code: "WELCOME15",  type: "Percentage", value: 15, minOrder: 0,     uses: 142, maxUses: 500, expiry: "30 Apr 2026", status: "Active" },
  { id: "2", code: "SUMMER2026", type: "Percentage", value: 20, minOrder: 10000, uses: 89,  maxUses: 200, expiry: "30 Jun 2026", status: "Active" },
  { id: "3", code: "FLAT5K",     type: "Fixed",      value: 5000, minOrder: 25000, uses: 34, maxUses: 100, expiry: "15 Apr 2026", status: "Active" },
  { id: "4", code: "NEWYEAR25",  type: "Percentage", value: 25, minOrder: 0,     uses: 500, maxUses: 500, expiry: "1 Jan 2026",  status: "Expired" },
];

const FLASH_SALES = [
  { name: "Weekend Sale",   discount: 30, ends: "Sun 23:59", products: 12, status: "Active" },
  { name: "Clearance Event", discount: 50, ends: "Tue 23:59", products: 5,  status: "Scheduled" },
];

export default function PromotionsClient() {
  const [tab, setTab] = useState<"codes" | "flash">("codes");
  const [promos, setPromos] = useState(INIT_PROMOS);
  const [showModal, setShowModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [form, setForm] = useState({ code: "", type: "Percentage" as DiscType, value: "", minOrder: "", maxUses: "", expiry: "" });

  const copyCode = (id: string, code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const savePromo = () => {
    if (!form.code || !form.value) return;
    setPromos((prev) => [{
      id: Date.now().toString(), code: form.code.toUpperCase(), type: form.type,
      value: Number(form.value), minOrder: Number(form.minOrder) || 0,
      uses: 0, maxUses: Number(form.maxUses) || 9999,
      expiry: form.expiry || "No expiry", status: "Active",
    }, ...prev]);
    setShowModal(false);
    setForm({ code: "", type: "Percentage", value: "", minOrder: "", maxUses: "", expiry: "" });
  };

  const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 14, color: "var(--text-dark)", outline: "none", background: "white" };
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => (e.currentTarget.style.borderColor = "var(--teal)");
  const onBlur  = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => (e.currentTarget.style.borderColor = "var(--border)");

  return (
    <>
      <DashboardTopbar
        title="Promotions"
        actions={
          <button onClick={() => setShowModal(true)} style={{ background: "var(--teal)", color: "white", border: "none", padding: "8px 16px", borderRadius: "var(--radius-sm)", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <Plus size={14} /> Create promotion
          </button>
        }
      />
      <div style={{ padding: "24px 28px", overflowY: "auto" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
          {[
            { label: "Active promos",      value: promos.filter((p) => p.status === "Active").length.toString() },
            { label: "Total redemptions",  value: promos.reduce((a, p) => a + p.uses, 0).toString() },
            { label: "Avg discount",       value: "18%" },
            { label: "Revenue from promos", value: "₦42K" },
          ].map((s) => (
            <div key={s.label} style={{ background: "var(--off-white)", borderRadius: "var(--radius-md)", padding: "14px 16px" }}>
              <div style={{ fontSize: 12, color: "var(--text-mid)", marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 600, color: "var(--text-dark)", lineHeight: 1 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", background: "white", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", overflow: "hidden", width: "fit-content", marginBottom: 20 }}>
          {([["codes", <Tag size={13} key="t" />, "Discount codes"], ["flash", <Zap size={13} key="z" />, "Flash sales"]] as const).map(([key, icon, label]) => (
            <button key={key} onClick={() => setTab(key as typeof tab)} style={{ padding: "9px 18px", border: "none", borderRight: key === "codes" ? "1px solid var(--border)" : "none", background: tab === key ? "var(--teal)" : "transparent", color: tab === key ? "white" : "var(--text-mid)", fontSize: 13, fontWeight: tab === key ? 600 : 400, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              {icon} {label}
            </button>
          ))}
        </div>

        {/* Codes table */}
        {tab === "codes" && (
          <div style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--off-white)", borderBottom: "1px solid var(--border)" }}>
                  {["Code","Discount","Min order","Usage","Expiry","Status",""].map((h) => (
                    <th key={h} style={{ padding: "11px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--text-mid)", letterSpacing: ".06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {promos.length === 0 ? (
                  <tr><td colSpan={7} style={{ padding: "48px", textAlign: "center", color: "var(--text-light)", fontSize: 14 }}>No promotions yet. Create your first one!</td></tr>
                ) : promos.map((p, i) => (
                  <tr key={p.id} style={{ borderBottom: i < promos.length - 1 ? "1px solid var(--border)" : "none", transition: "background .1s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(43,103,119,.02)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                  >
                    <td style={{ padding: "13px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <code style={{ fontSize: 13, fontWeight: 700, color: "var(--teal)", background: "rgba(43,103,119,.08)", padding: "3px 10px", borderRadius: "var(--radius-sm)", letterSpacing: 1 }}>{p.code}</code>
                        <button onClick={() => copyCode(p.id, p.code)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-light)", display: "flex", padding: 0 }}>
                          {copiedId === p.id ? <Check size={13} color="var(--sage)" /> : <Copy size={13} />}
                        </button>
                      </div>
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-dark)" }}>{p.type === "Percentage" ? `${p.value}%` : `₦${p.value.toLocaleString()}`}</div>
                      <div style={{ fontSize: 11, color: "var(--text-light)", fontWeight: 400, marginTop: 1 }}>{p.type}</div>
                    </td>
                    <td style={{ padding: "13px 16px", fontSize: 13, color: "var(--text-mid)" }}>{p.minOrder > 0 ? `₦${p.minOrder.toLocaleString()}` : "No minimum"}</td>
                    <td style={{ padding: "13px 16px", minWidth: 120 }}>
                      <div style={{ fontSize: 13, color: "var(--text-dark)", marginBottom: 5 }}>{p.uses} / {p.maxUses}</div>
                      <div style={{ height: 5, background: "var(--off-white)", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${Math.min((p.uses / p.maxUses) * 100, 100)}%`, background: p.uses >= p.maxUses ? "#e05c5c" : "var(--teal)", borderRadius: 3 }} />
                      </div>
                    </td>
                    <td style={{ padding: "13px 16px", fontSize: 13, color: "var(--text-mid)" }}>{p.expiry}</td>
                    <td style={{ padding: "13px 16px" }}>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, ...STATUS_STYLE[p.status] }}>{p.status}</span>
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <button onClick={() => setPromos((prev) => prev.filter((x) => x.id !== p.id))} style={{ width: 28, height: 28, border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#e05c5c", transition: "border-color .15s" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#e05c5c")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
                      ><Trash2 size={13} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Flash sales */}
        {tab === "flash" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
            {FLASH_SALES.map((sale) => (
              <div key={sale.name} style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", padding: "20px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, var(--teal), var(--sage))" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-dark)" }}>{sale.name}</div>
                  <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 20, background: sale.status === "Active" ? "#E1F5EE" : "#E6F1FB", color: sale.status === "Active" ? "#085041" : "#0C447C" }}>{sale.status}</span>
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 700, color: "var(--teal)", marginBottom: 10 }}>{sale.discount}% off</div>
                <div style={{ fontSize: 13, color: "var(--text-mid)", marginBottom: 4 }}>⏰ Ends: {sale.ends}</div>
                <div style={{ fontSize: 13, color: "var(--text-mid)", marginBottom: 18 }}>📦 {sale.products} products included</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{ flex: 1, padding: "9px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "white", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "var(--text-dark)" }}>Edit</button>
                  <button style={{ flex: 1, padding: "9px", background: "#e05c5c", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>End sale</button>
                </div>
              </div>
            ))}
            <button style={{ background: "none", border: "2px dashed var(--border)", borderRadius: "var(--radius-lg)", padding: "40px 20px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, transition: "all .15s", minHeight: 200 }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--teal)"; (e.currentTarget as HTMLElement).style.background = "rgba(43,103,119,.03)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.background = "none"; }}
            >
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(43,103,119,.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--teal)" }}><Zap size={20} /></div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-mid)" }}>Create flash sale</div>
            </button>
          </div>
        )}

      </div>

      {/* Create code modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 24 }}>
          <div style={{ background: "white", borderRadius: "var(--radius-xl)", width: "100%", maxWidth: 480, padding: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--text-dark)" }}>Create discount code</h3>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-light)", display: "flex" }}><X size={20} /></button>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 6 }}>Discount code</label>
              <div style={{ display: "flex", gap: 8 }}>
                <input value={form.code} onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))} placeholder="e.g. SUMMER20" style={{ ...inputStyle, flex: 1, fontWeight: 700, letterSpacing: 1 }} onFocus={onFocus} onBlur={onBlur} />
                <button onClick={() => setForm((f) => ({ ...f, code: "STYLE" + Math.random().toString(36).slice(2,7).toUpperCase() }))} style={{ padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--off-white)", fontSize: 13, cursor: "pointer", color: "var(--text-mid)", whiteSpace: "nowrap" }}>Generate</button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 6 }}>Discount type</label>
                <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as DiscType }))} style={{ ...inputStyle, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}>
                  <option value="Percentage">Percentage (%)</option>
                  <option value="Fixed">Fixed amount (₦)</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 6 }}>{form.type === "Percentage" ? "Percentage (%)" : "Amount (₦)"}</label>
                <input type="number" value={form.value} onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))} placeholder={form.type === "Percentage" ? "20" : "5000"} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 6 }}>Minimum order (₦)</label>
                <input type="number" value={form.minOrder} onChange={(e) => setForm((f) => ({ ...f, minOrder: e.target.value }))} placeholder="0 = no minimum" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 6 }}>Max uses</label>
                <input type="number" value={form.maxUses} onChange={(e) => setForm((f) => ({ ...f, maxUses: e.target.value }))} placeholder="Leave blank = unlimited" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 6 }}>Expiry date — <span style={{ fontWeight: 400, color: "var(--text-light)" }}>optional</span></label>
              <input type="date" value={form.expiry} onChange={(e) => setForm((f) => ({ ...f, expiry: e.target.value }))} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: "11px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "white", fontSize: 14, fontWeight: 500, cursor: "pointer", color: "var(--text-dark)" }}>Cancel</button>
              <button onClick={savePromo} disabled={!form.code || !form.value} style={{ flex: 1, padding: "11px", background: form.code && form.value ? "var(--teal)" : "var(--border)", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 14, fontWeight: 600, cursor: form.code && form.value ? "pointer" : "not-allowed" }}>
                Create code
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}