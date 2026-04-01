"use client";

import { useState } from "react";
import DashboardTopbar from "../../shared/DashboardTopbar";
import { Camera, Check } from "lucide-react";

export default function ProfileClient() {
  const [form, setForm] = useState({ firstName: "Usman", lastName: "Kamara", email: "usman@email.com", phone: "+234 801 234 5678", city: "Lagos", state: "Lagos State" });
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<"profile" | "password" | "notifications">("profile");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <>
      <DashboardTopbar title="My Profile" />
      <div style={{ padding: "24px 28px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 20 }}>
          {/* Left: Avatar card */}
          <div>
            <div style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", padding: "28px 20px", textAlign: "center", marginBottom: 12 }}>
              <div style={{ position: "relative", display: "inline-block", marginBottom: 16 }}>
                <div style={{ width: 88, height: 88, borderRadius: "50%", background: "linear-gradient(135deg, var(--teal), var(--sage))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 700, color: "white", fontFamily: "var(--font-display)" }}>
                  AK
                </div>
                <button style={{ position: "absolute", bottom: 0, right: 0, width: 28, height: 28, borderRadius: "50%", background: "var(--teal)", border: "2px solid white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}>
                  <Camera size={13} />
                </button>
              </div>
              <div style={{ fontSize: 17, fontWeight: 600, color: "var(--text-dark)", marginBottom: 4 }}>{form.firstName} {form.lastName}</div>
              <div style={{ fontSize: 13, color: "var(--text-light)", marginBottom: 16 }}>{form.email}</div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(82,171,152,0.1)", borderRadius: 20, padding: "4px 14px", fontSize: 12, color: "var(--sage)", fontWeight: 500 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--sage)", display: "inline-block" }} />
                Verified buyer
              </div>
            </div>
            {/* Nav */}
            <div style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", overflow: "hidden" }}>
              {(["profile", "password", "notifications"] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)} style={{ display: "block", width: "100%", padding: "13px 18px", background: tab === t ? "rgba(43,103,119,0.06)" : "none", border: "none", borderLeft: `3px solid ${tab === t ? "var(--teal)" : "transparent"}`, textAlign: "left", fontSize: 13, fontWeight: tab === t ? 600 : 400, color: tab === t ? "var(--teal)" : "var(--text-mid)", cursor: "pointer", textTransform: "capitalize" }}>
                  {t === "notifications" ? "Notifications" : t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", padding: "28px" }}>
            {tab === "profile" && (
              <>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-dark)", marginBottom: 24 }}>Personal information</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <Field label="First name" name="firstName" value={form.firstName} onChange={handleChange} />
                  <Field label="Last name" name="lastName" value={form.lastName} onChange={handleChange} />
                </div>
                <div style={{ marginBottom: 16 }}><Field label="Email address" name="email" type="email" value={form.email} onChange={handleChange} /></div>
                <div style={{ marginBottom: 16 }}><Field label="Phone number" name="phone" type="tel" value={form.phone} onChange={handleChange} /></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
                  <Field label="City" name="city" value={form.city} onChange={handleChange} />
                  <Field label="State" name="state" value={form.state} onChange={handleChange} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <button onClick={handleSave} style={{ padding: "12px 28px", background: "var(--teal)", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "background 0.2s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--teal-dark)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--teal)")}
                  >
                    {saved ? <><Check size={16} /> Saved!</> : "Save changes"}
                  </button>
                  {saved && <span style={{ fontSize: 13, color: "var(--sage)" }}>Your profile has been updated.</span>}
                </div>
              </>
            )}

            {tab === "password" && (
              <>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-dark)", marginBottom: 24 }}>Change password</div>
                <div style={{ maxWidth: 400, display: "flex", flexDirection: "column", gap: 16 }}>
                  <Field label="Current password" name="current" type="password" value="" onChange={() => {}} />
                  <Field label="New password" name="new" type="password" value="" onChange={() => {}} />
                  <Field label="Confirm new password" name="confirm" type="password" value="" onChange={() => {}} />
                  <button style={{ padding: "12px 28px", background: "var(--teal)", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 14, fontWeight: 600, cursor: "pointer", width: "fit-content" }}>
                    Update password
                  </button>
                </div>
              </>
            )}

            {tab === "notifications" && (
              <>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-dark)", marginBottom: 24 }}>Notification preferences</div>
                {[
                  { label: "Order updates", desc: "Get notified when your order status changes" },
                  { label: "Promotions & deals", desc: "Receive discount codes and special offers" },
                  { label: "New arrivals", desc: "Be the first to know about new products" },
                  { label: "Review reminders", desc: "Reminders to review your purchased items" },
                ].map((item) => (
                  <NotifToggle key={item.label} label={item.label} desc={item.desc} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function Field({ label, name, type = "text", value, onChange }: { label: string; name: string; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 6 }}>{label}</label>
      <input name={name} type={type} defaultValue={value} onChange={onChange} style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 14, color: "var(--text-dark)", outline: "none", background: "var(--off-white)" }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--teal)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
      />
    </div>
  );
}

function NotifToggle({ label, desc }: { label: string; desc: string }) {
  const [on, setOn] = useState(true);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderBottom: "1px solid var(--border)" }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-dark)", marginBottom: 3 }}>{label}</div>
        <div style={{ fontSize: 12, color: "var(--text-light)" }}>{desc}</div>
      </div>
      <button onClick={() => setOn(!on)} style={{ width: 44, height: 24, borderRadius: 12, background: on ? "var(--teal)" : "var(--border)", border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
        <span style={{ position: "absolute", top: 2, left: on ? 22 : 2, width: 20, height: 20, borderRadius: "50%", background: "white", transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
      </button>
    </div>
  );
}