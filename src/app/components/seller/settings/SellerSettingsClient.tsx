"use client";

import { useState } from "react";
import DashboardTopbar from "@/app/components/shared/DashboardTopbar";
import { Camera, Check, ChevronRight } from "lucide-react";

type Section = "store" | "policies" | "notifications" | "account";

const STATES = ["Abia","Abuja FCT","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos State","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"];
const CATEGORIES = ["Fashion","Electronics","Home & Living","Beauty","Sports","Footwear","Accessories","Jewellery","Food & Drinks","Books","Other"];

function Toggle({ initial = true }: { initial?: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <button onClick={() => setOn(!on)} style={{ width: 44, height: 24, borderRadius: 12, background: on ? "var(--teal)" : "var(--border)", border: "none", cursor: "pointer", position: "relative", transition: "background .2s", flexShrink: 0 }}>
      <span style={{ position: "absolute", top: 2, left: on ? 22 : 2, width: 20, height: 20, borderRadius: "50%", background: "white", transition: "left .2s", boxShadow: "0 1px 4px rgba(0,0,0,.2)" }} />
    </button>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", sub }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; sub?: string }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 6 }}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 14, color: "var(--text-dark)", outline: "none", background: "white" }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--teal)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
      />
      {sub && <div style={{ fontSize: 11, color: "var(--text-light)", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function TextareaField({ label, value, onChange, placeholder, rows = 4 }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 6 }}>{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 14, color: "var(--text-dark)", outline: "none", background: "white", resize: "vertical", fontFamily: "var(--font-body)" }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--teal)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
      />
    </div>
  );
}

function SettingRow({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-dark)", marginBottom: desc ? 3 : 0 }}>{label}</div>
        {desc && <div style={{ fontSize: 12, color: "var(--text-light)", maxWidth: 380 }}>{desc}</div>}
      </div>
      <div style={{ flexShrink: 0, marginLeft: 20 }}>{children}</div>
    </div>
  );
}

export default function SellerSettingsClient() {
  const [section, setSection] = useState<Section>("store");
  const [saved, setSaved] = useState(false);

  const [store, setStore] = useState({
    name: "StyleHaus Lagos", tagline: "Premium African fashion for every occasion",
    description: "We create and curate the finest Ankara and African print fashion pieces. Every garment is handcrafted with love.",
    email: "hello@stylehauslagos.com", phone: "+234 801 234 5678",
    instagram: "@stylehauslagos", twitter: "@stylehaus_ng",
    city: "Lagos", state: "Lagos State", category: "Fashion",
  });

  const [policies, setPolicies] = useState({
    returns: "We accept returns within 7 days of delivery. Items must be unworn and in original packaging. Contact us via chat to initiate a return.",
    shipping: "Orders are dispatched within 24 hours. Standard delivery takes 2–5 business days within Lagos, and 5–7 business days for other states.",
    processing: "Orders are processed Monday to Friday, 9am–5pm. Orders placed on weekends are processed the next business day.",
  });

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const navItems: { key: Section; label: string }[] = [
    { key: "store",         label: "Store profile" },
    { key: "policies",      label: "Store policies" },
    { key: "notifications", label: "Notifications" },
    { key: "account",       label: "Account & security" },
  ];

  return (
    <>
      <DashboardTopbar
        title="Store settings"
        actions={
          <button onClick={handleSave} style={{ background: "var(--teal)", color: "white", border: "none", padding: "8px 20px", borderRadius: "var(--radius-sm)", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 7 }}>
            {saved ? <><Check size={14} /> Saved!</> : "Save changes"}
          </button>
        }
      />
      <div style={{ padding: "24px 28px", overflowY: "auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}>

          {/* Nav */}
          <div style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", overflow: "hidden", height: "fit-content" }}>
            {navItems.map((item) => (
              <button key={item.key} onClick={() => setSection(item.key)}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "13px 18px", background: section === item.key ? "rgba(43,103,119,.06)" : "none", border: "none", borderLeft: `3px solid ${section === item.key ? "var(--teal)" : "transparent"}`, textAlign: "left", fontSize: 13, fontWeight: section === item.key ? 600 : 400, color: section === item.key ? "var(--teal)" : "var(--text-mid)", cursor: "pointer", transition: "all .15s" }}
              >
                {item.label}
                {section === item.key && <ChevronRight size={13} />}
              </button>
            ))}
          </div>

          {/* Content */}
          <div style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", padding: "26px 28px" }}>

            {/* ── STORE PROFILE ── */}
            {section === "store" && (
              <>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-dark)", marginBottom: 22 }}>Store profile</div>

                {/* Banner + logo */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{ height: 120, background: "linear-gradient(135deg, #1d4d5a, #2b6777)", borderRadius: "var(--radius-md)", position: "relative", marginBottom: 0 }}>
                    <button style={{ position: "absolute", right: 12, top: 12, background: "rgba(255,255,255,.2)", border: "none", borderRadius: "var(--radius-sm)", padding: "6px 12px", color: "white", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                      <Camera size={13} /> Change banner
                    </button>
                  </div>
                  <div style={{ paddingLeft: 24, marginTop: -28, paddingBottom: 8 }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(82,171,152,.3)", border: "3px solid white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--teal)", position: "relative" }}>
                      SH
                      <button style={{ position: "absolute", bottom: -2, right: -2, width: 22, height: 22, borderRadius: "50%", background: "var(--teal)", border: "2px solid white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}>
                        <Camera size={11} />
                      </button>
                    </div>
                  </div>
                </div>

                <div style={{ display: "grid", gap: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <Field label="Store name" value={store.name} onChange={(v) => setStore((s) => ({ ...s, name: v }))} />
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 6 }}>Category</label>
                      <select value={store.category} onChange={(e) => setStore((s) => ({ ...s, category: e.target.value }))}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 14, color: "var(--text-dark)", outline: "none", background: "white", cursor: "pointer" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--teal)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                      >
                        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <Field label="Tagline" value={store.tagline} onChange={(v) => setStore((s) => ({ ...s, tagline: v }))} placeholder="Short description shown on your store page" sub="Shown to buyers below your store name" />
                  <TextareaField label="Store description" value={store.description} onChange={(v) => setStore((s) => ({ ...s, description: v }))} placeholder="Tell buyers about your brand, what you sell, and what makes you special…" />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <Field label="Business email" value={store.email} type="email" onChange={(v) => setStore((s) => ({ ...s, email: v }))} />
                    <Field label="Phone number" value={store.phone} type="tel" onChange={(v) => setStore((s) => ({ ...s, phone: v }))} />
                    <Field label="Instagram" value={store.instagram} onChange={(v) => setStore((s) => ({ ...s, instagram: v }))} placeholder="@yourstorename" />
                    <Field label="Twitter / X" value={store.twitter} onChange={(v) => setStore((s) => ({ ...s, twitter: v }))} placeholder="@yourstorename" />
                    <Field label="City" value={store.city} onChange={(v) => setStore((s) => ({ ...s, city: v }))} />
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 6 }}>State</label>
                      <select value={store.state} onChange={(e) => setStore((s) => ({ ...s, state: e.target.value }))}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 14, color: "var(--text-dark)", outline: "none", background: "white", cursor: "pointer" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--teal)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                      >
                        {STATES.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ── POLICIES ── */}
            {section === "policies" && (
              <>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-dark)", marginBottom: 6 }}>Store policies</div>
                <p style={{ fontSize: 13, color: "var(--text-light)", marginBottom: 24 }}>These policies are displayed to buyers on your store page and product listings. Clear policies build buyer trust.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <TextareaField label="Returns & refunds policy" value={policies.returns} onChange={(v) => setPolicies((p) => ({ ...p, returns: v }))} placeholder="Describe your return and refund policy…" rows={4} />
                  <TextareaField label="Shipping policy" value={policies.shipping} onChange={(v) => setPolicies((p) => ({ ...p, shipping: v }))} placeholder="Describe your shipping process, carriers, and delivery timeframes…" rows={4} />
                  <TextareaField label="Processing time" value={policies.processing} onChange={(v) => setPolicies((p) => ({ ...p, processing: v }))} placeholder="When do you process and dispatch orders?…" rows={3} />
                </div>
              </>
            )}

            {/* ── NOTIFICATIONS ── */}
            {section === "notifications" && (
              <>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-dark)", marginBottom: 22 }}>Notification preferences</div>
                {[
                  { section: "Orders", items: [
                    { label: "New order received",   desc: "Instant alert when a buyer places an order" },
                    { label: "Order cancelled",      desc: "When a buyer cancels an order" },
                    { label: "Return requested",     desc: "When a buyer submits a return request" },
                  ]},
                  { section: "Store", items: [
                    { label: "New review posted",    desc: "When a buyer leaves a review on one of your products" },
                    { label: "Low stock alert",      desc: "When any product's stock drops below 5 units" },
                    { label: "Payout processed",     desc: "When a payout is successfully sent to your bank" },
                    { label: "Weekly sales report",  desc: "A summary of your store performance every Monday" },
                    { label: "Promotions expiring",  desc: "Reminder when a promo code is about to expire" },
                  ]},
                ].map((group) => (
                  <div key={group.section} style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-mid)", letterSpacing: ".08em", textTransform: "uppercase", padding: "12px 0 2px" }}>{group.section}</div>
                    {group.items.map((item) => (
                      <SettingRow key={item.label} label={item.label} desc={item.desc}>
                        <Toggle />
                      </SettingRow>
                    ))}
                  </div>
                ))}
              </>
            )}

            {/* ── ACCOUNT & SECURITY ── */}
            {section === "account" && (
              <>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-dark)", marginBottom: 22 }}>Account & security</div>

                {/* Change password */}
                <div style={{ marginBottom: 32 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-mid)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 16 }}>Change password</div>
                  <div style={{ maxWidth: 420, display: "flex", flexDirection: "column", gap: 14 }}>
                    {["Current password", "New password", "Confirm new password"].map((label) => (
                      <Field key={label} label={label} value="" onChange={() => {}} type="password" placeholder="••••••••" />
                    ))}
                    <button style={{ padding: "11px 24px", background: "var(--teal)", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 14, fontWeight: 600, cursor: "pointer", width: "fit-content" }}>Update password</button>
                  </div>
                </div>

                {/* 2FA */}
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, marginBottom: 32 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-mid)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 2 }}>Security</div>
                  <SettingRow label="Two-factor authentication" desc="Add an extra layer of security. Require a verification code on login.">
                    <Toggle initial={false} />
                  </SettingRow>
                  <SettingRow label="Login alerts" desc="Get an email notification whenever your account is accessed from a new device.">
                    <Toggle initial={true} />
                  </SettingRow>
                </div>

                {/* Danger zone */}
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-mid)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 14 }}>Danger zone</div>
                  <div style={{ border: "1px solid #F09595", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
                    <div style={{ padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-dark)", marginBottom: 4 }}>Deactivate store</div>
                        <div style={{ fontSize: 13, color: "var(--text-light)" }}>Temporarily hide your store and all products. You can reactivate anytime.</div>
                      </div>
                      <button style={{ padding: "9px 18px", border: "1px solid #F09595", borderRadius: "var(--radius-sm)", background: "white", fontSize: 13, fontWeight: 500, color: "#e05c5c", cursor: "pointer", flexShrink: 0, marginLeft: 20 }}>Deactivate</button>
                    </div>
                    <div style={{ borderTop: "1px solid #F09595" }} />
                    <div style={{ padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FCEBEB" }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#791F1F", marginBottom: 4 }}>Close seller account permanently</div>
                        <div style={{ fontSize: 13, color: "#A32D2D" }}>All products, orders, and store data will be permanently deleted. This cannot be undone.</div>
                      </div>
                      <button style={{ padding: "9px 18px", background: "#e05c5c", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 13, fontWeight: 600, cursor: "pointer", flexShrink: 0, marginLeft: 20 }}>Close account</button>
                    </div>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  );
}