"use client";

import { useState } from "react";
import DashboardTopbar from "@/app/components/shared/DashboardTopbar";
import { Shield, Bell, Eye, Smartphone, Trash2, LogOut, ChevronRight, Check, AlertTriangle } from "lucide-react";

type Section = "security" | "privacy" | "notifications" | "sessions" | "danger";

function Toggle({ initial = true }: { initial?: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <button onClick={() => setOn(!on)} style={{ width: 44, height: 24, borderRadius: 12, background: on ? "var(--teal)" : "var(--border)", border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
      <span style={{ position: "absolute", top: 2, left: on ? 22 : 2, width: 20, height: 20, borderRadius: "50%", background: "white", transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
    </button>
  );
}

function SettingRow({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderBottom: "1px solid var(--border)" }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-dark)", marginBottom: desc ? 3 : 0 }}>{label}</div>
        {desc && <div style={{ fontSize: 12, color: "var(--text-light)", maxWidth: 380 }}>{desc}</div>}
      </div>
      <div style={{ flexShrink: 0, marginLeft: 20 }}>{children}</div>
    </div>
  );
}

const SESSIONS = [
  { id: "1", device: "Chrome on Windows", location: "Lagos, Nigeria", time: "Active now", current: true },
  { id: "2", device: "Safari on iPhone", location: "Lagos, Nigeria", time: "2 hours ago", current: false },
  { id: "3", device: "Firefox on MacOS", location: "Abuja, Nigeria", time: "3 days ago", current: false },
];

export default function SettingsClient() {
  const [activeSection, setActiveSection] = useState<Section>("security");
  const [twoFA, setTwoFA] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [sessions, setSessions] = useState(SESSIONS);

  const navItems: { key: Section; label: string; icon: React.ReactNode }[] = [
    { key: "security", label: "Security", icon: <Shield size={15} /> },
    { key: "privacy", label: "Privacy", icon: <Eye size={15} /> },
    { key: "notifications", label: "Notifications", icon: <Bell size={15} /> },
    { key: "sessions", label: "Active sessions", icon: <Smartphone size={15} /> },
    { key: "danger", label: "Danger zone", icon: <Trash2 size={15} /> },
  ];

  return (
    <>
      <DashboardTopbar title="Settings" />
      <div style={{ padding: "24px 28px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}>
          {/* Nav */}
          <div style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", overflow: "hidden", height: "fit-content" }}>
            {navItems.map((item) => (
              <button key={item.key} onClick={() => setActiveSection(item.key)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "13px 18px", background: activeSection === item.key ? "rgba(43,103,119,0.06)" : "none", border: "none", borderLeft: `3px solid ${activeSection === item.key ? "var(--teal)" : "transparent"}`, textAlign: "left", fontSize: 13, fontWeight: activeSection === item.key ? 600 : 400, color: activeSection === item.key ? "var(--teal)" : item.key === "danger" ? "#e05c5c" : "var(--text-mid)", cursor: "pointer", transition: "all 0.15s" }}>
                <span style={{ opacity: 0.8 }}>{item.icon}</span>
                {item.label}
                {activeSection === item.key && <ChevronRight size={13} style={{ marginLeft: "auto" }} />}
              </button>
            ))}
          </div>

          {/* Content */}
          <div style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", padding: "24px 28px" }}>
            {activeSection === "security" && (
              <>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--text-dark)", marginBottom: 6 }}>Security</h2>
                <p style={{ fontSize: 13, color: "var(--text-light)", marginBottom: 24 }}>Manage your account security settings</p>

                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-mid)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 0 }}>Change password</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16, maxWidth: 400 }}>
                    {["Current password", "New password", "Confirm new password"].map((label) => (
                      <div key={label}>
                        <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 6 }}>{label}</label>
                        <input type="password" style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 14, outline: "none" }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--teal)")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                        />
                      </div>
                    ))}
                    <button onClick={() => { setPasswordSaved(true); setTimeout(() => setPasswordSaved(false), 2500); }} style={{ padding: "11px 24px", background: "var(--teal)", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 14, fontWeight: 600, cursor: "pointer", width: "fit-content", display: "flex", alignItems: "center", gap: 7 }}>
                      {passwordSaved ? <><Check size={15} /> Updated!</> : "Update password"}
                    </button>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-mid)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 0 }}>Two-factor authentication</div>
                  <SettingRow label="Enable 2FA" desc="Add an extra layer of security to your account with SMS or authenticator app verification.">
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {twoFA && <span style={{ fontSize: 11, background: "rgba(82,171,152,0.1)", color: "var(--sage)", padding: "2px 8px", borderRadius: 20, fontWeight: 500 }}>Enabled</span>}
                      <button onClick={() => setTwoFA(!twoFA)} style={{ width: 44, height: 24, borderRadius: 12, background: twoFA ? "var(--teal)" : "var(--border)", border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s" }}>
                        <span style={{ position: "absolute", top: 2, left: twoFA ? 22 : 2, width: 20, height: 20, borderRadius: "50%", background: "white", transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
                      </button>
                    </div>
                  </SettingRow>
                  <SettingRow label="Login alerts" desc="Get notified by email when someone signs into your account from a new device.">
                    <Toggle initial={true} />
                  </SettingRow>
                </div>
              </>
            )}

            {activeSection === "privacy" && (
              <>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--text-dark)", marginBottom: 6 }}>Privacy</h2>
                <p style={{ fontSize: 13, color: "var(--text-light)", marginBottom: 24 }}>Control how your data is used and shared</p>
                <SettingRow label="Profile visibility" desc="Allow sellers to see your profile when you make a purchase or write a review.">
                  <Toggle initial={true} />
                </SettingRow>
                <SettingRow label="Order history sharing" desc="Let Stonebay use your order history to personalise product recommendations.">
                  <Toggle initial={true} />
                </SettingRow>
                <SettingRow label="Analytics cookies" desc="Allow us to collect anonymous usage data to improve the platform.">
                  <Toggle initial={false} />
                </SettingRow>
                <SettingRow label="Marketing cookies" desc="Allow third-party advertising cookies for personalised ads.">
                  <Toggle initial={false} />
                </SettingRow>
                <div style={{ marginTop: 24, padding: "16px", background: "var(--off-white)", borderRadius: "var(--radius-md)" }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 8 }}>Data & privacy requests</div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button style={{ padding: "8px 16px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "white", fontSize: 13, cursor: "pointer", color: "var(--text-dark)" }}>Download my data</button>
                    <button style={{ padding: "8px 16px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "white", fontSize: 13, cursor: "pointer", color: "var(--text-dark)" }}>View privacy policy</button>
                  </div>
                </div>
              </>
            )}

            {activeSection === "notifications" && (
              <>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--text-dark)", marginBottom: 6 }}>Notifications</h2>
                <p style={{ fontSize: 13, color: "var(--text-light)", marginBottom: 24 }}>Choose what you'd like to be notified about</p>

                {[
                  { section: "Orders", items: [
                    { label: "Order confirmed", desc: "When your order is successfully placed" },
                    { label: "Order shipped", desc: "When your order is dispatched by the seller" },
                    { label: "Order delivered", desc: "When your order is marked as delivered" },
                    { label: "Order cancelled", desc: "When an order is cancelled by you or the seller" },
                  ]},
                  { section: "Account", items: [
                    { label: "Promotions & deals", desc: "Discount codes and limited-time offers" },
                    { label: "Price drops", desc: "When wishlist items go on sale" },
                    { label: "Back in stock", desc: "When out-of-stock wishlist items are available" },
                    { label: "Review reminders", desc: "Reminders to review your purchases" },
                  ]},
                ].map((group) => (
                  <div key={group.section} style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-mid)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 0, paddingTop: 8 }}>{group.section}</div>
                    {group.items.map((item) => (
                      <SettingRow key={item.label} label={item.label} desc={item.desc}>
                        <Toggle initial={!item.label.includes("cancelled") && !item.label.includes("reminders")} />
                      </SettingRow>
                    ))}
                  </div>
                ))}
              </>
            )}

            {activeSection === "sessions" && (
              <>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--text-dark)", marginBottom: 6 }}>Active sessions</h2>
                <p style={{ fontSize: 13, color: "var(--text-light)", marginBottom: 24 }}>Devices currently signed in to your account</p>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                  {sessions.map((s) => (
                    <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px", border: `1px solid ${s.current ? "var(--teal)" : "var(--border)"}`, borderRadius: "var(--radius-md)", background: s.current ? "rgba(43,103,119,0.03)" : "white" }}>
                      <div style={{ width: 40, height: 40, borderRadius: "var(--radius-sm)", background: "var(--off-white)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-mid)", flexShrink: 0 }}>
                        <Smartphone size={18} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                          <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text-dark)" }}>{s.device}</span>
                          {s.current && <span style={{ fontSize: 10, background: "rgba(82,171,152,0.15)", color: "var(--sage)", padding: "2px 8px", borderRadius: 20, fontWeight: 600 }}>Current</span>}
                        </div>
                        <div style={{ fontSize: 12, color: "var(--text-light)" }}>{s.location} · {s.time}</div>
                      </div>
                      {!s.current && (
                        <button onClick={() => setSessions((prev) => prev.filter((x) => x.id !== s.id))} style={{ padding: "6px 14px", border: "1px solid #F09595", borderRadius: "var(--radius-sm)", background: "white", fontSize: 12, color: "#e05c5c", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                          <LogOut size={12} /> Sign out
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {sessions.length > 1 && (
                  <button onClick={() => setSessions((prev) => prev.filter((s) => s.current))} style={{ padding: "10px 20px", border: "1px solid #F09595", borderRadius: "var(--radius-sm)", background: "white", fontSize: 13, color: "#e05c5c", cursor: "pointer", fontWeight: 500, display: "flex", alignItems: "center", gap: 7 }}>
                    <LogOut size={14} /> Sign out all other sessions
                  </button>
                )}
              </>
            )}

            {activeSection === "danger" && (
              <>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "#791F1F", marginBottom: 6 }}>Danger zone</h2>
                <p style={{ fontSize: 13, color: "var(--text-light)", marginBottom: 24 }}>Irreversible and destructive actions</p>

                <div style={{ border: "1px solid #F09595", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
                  <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-dark)", marginBottom: 4 }}>Deactivate account</div>
                      <div style={{ fontSize: 13, color: "var(--text-light)" }}>Temporarily disable your account. You can reactivate it at any time.</div>
                    </div>
                    <button style={{ padding: "9px 18px", border: "1px solid #F09595", borderRadius: "var(--radius-sm)", background: "white", fontSize: 13, fontWeight: 500, color: "#e05c5c", cursor: "pointer", flexShrink: 0, marginLeft: 20 }}>
                      Deactivate
                    </button>
                  </div>
                  <div style={{ height: 1, background: "#F7C1C1" }} />
                  <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FCEBEB" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#791F1F", marginBottom: 4 }}>Delete account permanently</div>
                      <div style={{ fontSize: 13, color: "#A32D2D" }}>Once deleted, all your data, orders, and reviews will be removed forever.</div>
                    </div>
                    <button onClick={() => setShowDeleteModal(true)} style={{ padding: "9px 18px", background: "#e05c5c", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 13, fontWeight: 600, cursor: "pointer", flexShrink: 0, marginLeft: 20, display: "flex", alignItems: "center", gap: 6 }}>
                      <Trash2 size={14} /> Delete account
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Delete account modal */}
      {showDeleteModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 24 }}>
          <div style={{ background: "white", borderRadius: "var(--radius-xl)", width: "100%", maxWidth: 440, padding: "28px", boxShadow: "var(--shadow-lg)" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#FCEBEB", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: "#e05c5c" }}>
              <AlertTriangle size={22} />
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--text-dark)", textAlign: "center", marginBottom: 10 }}>
              Delete your account?
            </h3>
            <p style={{ fontSize: 14, color: "var(--text-mid)", textAlign: "center", lineHeight: 1.65, marginBottom: 20 }}>
              This will permanently delete your account, all your orders, reviews, and saved data. This action cannot be undone.
            </p>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 8 }}>
                Type <strong>DELETE</strong> to confirm
              </label>
              <input value={deleteConfirmText} onChange={(e) => setDeleteConfirmText(e.target.value)} placeholder="DELETE" style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 14, outline: "none", fontFamily: "var(--font-mono, monospace)", letterSpacing: 2 }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#e05c5c")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => { setShowDeleteModal(false); setDeleteConfirmText(""); }} style={{ flex: 1, padding: "11px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "white", fontSize: 14, fontWeight: 500, cursor: "pointer", color: "var(--text-dark)" }}>Cancel</button>
              <button disabled={deleteConfirmText !== "DELETE"} style={{ flex: 1, padding: "11px", background: deleteConfirmText === "DELETE" ? "#e05c5c" : "#F09595", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 14, fontWeight: 600, cursor: deleteConfirmText === "DELETE" ? "pointer" : "not-allowed" }}>
                Delete account
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}