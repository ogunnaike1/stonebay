"use client";

import { useState } from "react";
import DashboardTopbar from "@/app/components/shared/DashboardTopbar";
import { Plus, MapPin, Edit2, Trash2, Check, X, Home, Briefcase } from "lucide-react";

type Address = {
  id: string;
  label: "Home" | "Work" | "Other";
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  isDefault: boolean;
};

const INIT_ADDRESSES: Address[] = [
  { id: "1", label: "Home", fullName: "Adeola Kamara", phone: "+234 801 234 5678", street: "15 Admiralty Way, Lekki Phase 1", city: "Lagos", state: "Lagos State", isDefault: true },
  { id: "2", label: "Work", fullName: "Adeola Kamara", phone: "+234 801 234 5678", street: "Plot 1234, Adeola Odeku Street, Victoria Island", city: "Lagos", state: "Lagos State", isDefault: false },
];

const EMPTY_FORM = { label: "Home" as Address["label"], fullName: "", phone: "", street: "", city: "", state: "" };
const STATES = ["Abia", "Abuja FCT", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos State", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"];

export default function AddressesClient() {
  const [addresses, setAddresses] = useState<Address[]>(INIT_ADDRESSES);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Address | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openAdd = () => { setEditing(null); setForm(EMPTY_FORM); setShowModal(true); };
  const openEdit = (addr: Address) => { setEditing(addr); setForm({ label: addr.label, fullName: addr.fullName, phone: addr.phone, street: addr.street, city: addr.city, state: addr.state }); setShowModal(true); };

  const handleSave = () => {
    if (editing) {
      setAddresses((prev) => prev.map((a) => a.id === editing.id ? { ...a, ...form } : a));
    } else {
      setAddresses((prev) => [...prev, { id: Date.now().toString(), ...form, isDefault: prev.length === 0 }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => { setAddresses((prev) => prev.filter((a) => a.id !== id)); setDeleteConfirm(null); };
  const setDefault = (id: string) => setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));

  const labelIcon = (label: Address["label"]) => label === "Home" ? <Home size={14} /> : label === "Work" ? <Briefcase size={14} /> : <MapPin size={14} />;

  return (
    <>
      <DashboardTopbar title="Saved Addresses" />
      <div style={{ padding: "24px 28px" }}>
        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <p style={{ fontSize: 14, color: "var(--text-mid)" }}>
            {addresses.length} saved address{addresses.length !== 1 ? "es" : ""}
          </p>
          <button onClick={openAdd} style={{ background: "var(--teal)", color: "white", border: "none", padding: "10px 18px", borderRadius: "var(--radius-sm)", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 7 }}>
            <Plus size={15} /> Add new address
          </button>
        </div>

        {/* Address cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          {addresses.map((addr) => (
            <div key={addr.id} style={{ background: "white", borderRadius: "var(--radius-lg)", border: `1.5px solid ${addr.isDefault ? "var(--teal)" : "var(--border)"}`, padding: "20px", position: "relative", transition: "box-shadow 0.2s" }}>
              {/* Default badge */}
              {addr.isDefault && (
                <span style={{ position: "absolute", top: 16, right: 16, background: "rgba(43,103,119,0.1)", color: "var(--teal)", fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 20, letterSpacing: "0.06em" }}>
                  DEFAULT
                </span>
              )}

              {/* Label */}
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
                <div style={{ width: 32, height: 32, borderRadius: "var(--radius-sm)", background: "rgba(43,103,119,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--teal)" }}>
                  {labelIcon(addr.label)}
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-dark)" }}>{addr.label}</span>
              </div>

              {/* Details */}
              <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-dark)", marginBottom: 4 }}>{addr.fullName}</div>
              <div style={{ fontSize: 13, color: "var(--text-mid)", marginBottom: 2 }}>{addr.street}</div>
              <div style={{ fontSize: 13, color: "var(--text-mid)", marginBottom: 2 }}>{addr.city}, {addr.state}</div>
              <div style={{ fontSize: 13, color: "var(--text-mid)", marginBottom: 16 }}>{addr.phone}</div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button onClick={() => openEdit(addr)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "white", fontSize: 12, fontWeight: 500, color: "var(--text-dark)", cursor: "pointer", transition: "all 0.15s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--teal)"; (e.currentTarget as HTMLElement).style.color = "var(--teal)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-dark)"; }}
                >
                  <Edit2 size={12} /> Edit
                </button>
                {!addr.isDefault && (
                  <>
                    <button onClick={() => setDefault(addr.id)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "white", fontSize: 12, fontWeight: 500, color: "var(--text-dark)", cursor: "pointer", transition: "all 0.15s" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--sage)"; (e.currentTarget as HTMLElement).style.color = "var(--sage)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-dark)"; }}
                    >
                      <Check size={12} /> Set default
                    </button>
                    <button onClick={() => setDeleteConfirm(addr.id)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "white", fontSize: 12, fontWeight: 500, color: "#e05c5c", cursor: "pointer", transition: "border-color 0.15s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#e05c5c")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </>
                )}
              </div>

              {/* Delete confirm */}
              {deleteConfirm === addr.id && (
                <div style={{ marginTop: 14, padding: "12px 14px", background: "#FCEBEB", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, color: "#791F1F" }}>Delete this address?</span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setDeleteConfirm(null)} style={{ padding: "5px 12px", border: "1px solid #F09595", borderRadius: "var(--radius-sm)", background: "white", fontSize: 12, cursor: "pointer", color: "var(--text-dark)" }}>Cancel</button>
                    <button onClick={() => handleDelete(addr.id)} style={{ padding: "5px 12px", background: "#e05c5c", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Add card */}
          <button onClick={openAdd} style={{ background: "none", border: "2px dashed var(--border)", borderRadius: "var(--radius-lg)", padding: "40px 20px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, transition: "border-color 0.2s, background 0.2s", minHeight: 180 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--teal)"; (e.currentTarget as HTMLElement).style.background = "rgba(43,103,119,0.03)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.background = "none"; }}
          >
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(43,103,119,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--teal)" }}>
              <Plus size={20} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-mid)" }}>Add new address</div>
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 24 }}>
          <div style={{ background: "white", borderRadius: "var(--radius-xl)", width: "100%", maxWidth: 520, padding: "28px", boxShadow: "var(--shadow-lg)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--text-dark)" }}>
                {editing ? "Edit address" : "Add new address"}
              </h2>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-light)", display: "flex" }}>
                <X size={20} />
              </button>
            </div>

            {/* Label selector */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 8 }}>Address type</label>
              <div style={{ display: "flex", gap: 8 }}>
                {(["Home", "Work", "Other"] as const).map((l) => (
                  <button key={l} onClick={() => setForm((f) => ({ ...f, label: l }))} style={{ flex: 1, padding: "9px", border: `1.5px solid ${form.label === l ? "var(--teal)" : "var(--border)"}`, borderRadius: "var(--radius-sm)", background: form.label === l ? "rgba(43,103,119,0.06)" : "white", color: form.label === l ? "var(--teal)" : "var(--text-mid)", fontSize: 13, fontWeight: form.label === l ? 600 : 400, cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    {labelIcon(l)} {l}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <ModalField label="Full name" value={form.fullName} onChange={(v) => setForm((f) => ({ ...f, fullName: v }))} placeholder="John Doe" />
              <ModalField label="Phone number" value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} placeholder="+234 800 000 0000" />
            </div>
            <div style={{ marginBottom: 12 }}>
              <ModalField label="Street address" value={form.street} onChange={(v) => setForm((f) => ({ ...f, street: v }))} placeholder="15 Admiralty Way, Lekki Phase 1" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
              <ModalField label="City" value={form.city} onChange={(v) => setForm((f) => ({ ...f, city: v }))} placeholder="Lagos" />
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 6 }}>State</label>
                <select value={form.state} onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))} style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 14, color: "var(--text-dark)", outline: "none", background: "white", cursor: "pointer" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--teal)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                >
                  <option value="">Select state</option>
                  {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => setShowModal(false)} style={{ padding: "11px 22px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "white", fontSize: 14, fontWeight: 500, cursor: "pointer", color: "var(--text-dark)" }}>Cancel</button>
              <button onClick={handleSave} style={{ padding: "11px 28px", background: "var(--teal)", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--teal-dark)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--teal)")}
              >
                Save address
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ModalField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 6 }}>{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 14, color: "var(--text-dark)", outline: "none", background: "white" }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--teal)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
      />
    </div>
  );
}