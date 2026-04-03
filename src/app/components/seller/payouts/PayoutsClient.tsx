"use client";

import { useState } from "react";
import DashboardTopbar from "@/app/components/shared/DashboardTopbar";
import StatCard from "@/app/components/shared/StatCard";
import { CreditCard, Building2, Check, AlertCircle, X } from "lucide-react";

type PayoutTab = "overview" | "history" | "bank";

const HISTORY = [
  { id: "PAY-001", date: "Mar 15, 2026", amount: 320000, method: "Bank Transfer", bank: "GTBank ****4521", status: "Paid" },
  { id: "PAY-002", date: "Mar 1, 2026",  amount: 285000, method: "Bank Transfer", bank: "GTBank ****4521", status: "Paid" },
  { id: "PAY-003", date: "Feb 15, 2026", amount: 410000, method: "Bank Transfer", bank: "GTBank ****4521", status: "Paid" },
  { id: "PAY-004", date: "Feb 1, 2026",  amount: 198000, method: "Bank Transfer", bank: "GTBank ****4521", status: "Paid" },
  { id: "PAY-005", date: "Mar 31, 2026", amount: 218000, method: "Bank Transfer", bank: "GTBank ****4521", status: "Pending" },
];

const BANKS = ["GTBank","Access Bank","First Bank","UBA","Zenith Bank","Stanbic IBTC","FCMB","Fidelity Bank","Union Bank","Sterling Bank"];

export default function PayoutsClient() {
  const [tab, setTab] = useState<PayoutTab>("overview");
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [done, setDone] = useState(false);

  const available = 218000;

  const handleWithdraw = () => {
    const n = Number(amount);
    if (n > 0 && n <= available) {
      setDone(true);
      setTimeout(() => { setDone(false); setShowModal(false); setAmount(""); }, 2500);
    }
  };

  const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 14, color: "var(--text-dark)", outline: "none", background: "white" };
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => (e.currentTarget.style.borderColor = "var(--teal)");
  const onBlur  = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => (e.currentTarget.style.borderColor = "var(--border)");

  return (
    <>
      <DashboardTopbar title="Payouts" />
      <div style={{ padding: "24px 28px", overflowY: "auto" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
          <StatCard label="Available balance"  value="₦218,000" sub="Ready to withdraw" />
          <StatCard label="Pending clearance"  value="₦64,500"  sub="Clears in 2–3 days" />
          <StatCard label="Total paid out"     value="₦1,213,000" sub="All time" />
          <StatCard label="This month"         value="₦320,000" sub="↑ 12% vs last month" subColor="up" />
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", background: "white", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", overflow: "hidden", width: "fit-content", marginBottom: 20 }}>
          {(["overview", "history", "bank"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              style={{ padding: "9px 20px", border: "none", borderRight: t !== "bank" ? "1px solid var(--border)" : "none", background: tab === t ? "var(--teal)" : "transparent", color: tab === t ? "white" : "var(--text-mid)", fontSize: 13, fontWeight: tab === t ? 600 : 400, cursor: "pointer", textTransform: "capitalize" }}
            >{t === "bank" ? "Bank account" : t}</button>
          ))}
        </div>

        {/* Overview */}
        {tab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16 }}>
            <div style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", overflow: "hidden" }}>
              <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", fontSize: 14, fontWeight: 600, color: "var(--text-dark)" }}>Recent transactions</div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "var(--off-white)", borderBottom: "1px solid var(--border)" }}>
                    {["ID","Date","Amount","Method","Status"].map((h) => (
                      <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--text-mid)", letterSpacing: ".06em", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {HISTORY.map((p, i) => (
                    <tr key={p.id} style={{ borderBottom: i < HISTORY.length - 1 ? "1px solid var(--border)" : "none" }}>
                      <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 500, color: "var(--teal)" }}>{p.id}</td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "var(--text-dark)" }}>{p.date}</td>
                      <td style={{ padding: "12px 16px", fontSize: 14, fontWeight: 700, color: "var(--text-dark)" }}>₦{p.amount.toLocaleString()}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ fontSize: 13, color: "var(--text-dark)" }}>{p.method}</div>
                        <div style={{ fontSize: 11, color: "var(--text-light)" }}>{p.bank}</div>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, display: "inline-flex", alignItems: "center", gap: 4, background: p.status === "Paid" ? "#E1F5EE" : "#FAEEDA", color: p.status === "Paid" ? "#085041" : "#633806" }}>
                          {p.status === "Paid" ? <Check size={10} /> : <AlertCircle size={10} />} {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Balance card */}
              <div style={{ background: "linear-gradient(135deg, #1d4d5a, #2b6777)", borderRadius: "var(--radius-lg)", padding: "24px" }}>
                <div style={{ fontSize: 13, color: "rgba(203,216,228,.7)", marginBottom: 8 }}>Available to withdraw</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700, color: "white", marginBottom: 20 }}>₦218,000</div>
                <button onClick={() => setShowModal(true)} style={{ width: "100%", padding: "12px", background: "var(--sage)", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "background .2s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--sage-light)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--sage)")}
                >Withdraw funds</button>
              </div>

              {/* Schedule */}
              <div style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", padding: "18px 20px" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-dark)", marginBottom: 14 }}>Payout schedule</div>
                {[
                  { label: "Frequency",   value: "Twice monthly" },
                  { label: "Next payout", value: "Apr 1, 2026" },
                  { label: "Minimum",     value: "₦5,000" },
                  { label: "Processing",  value: "1–2 business days" },
                ].map((r) => (
                  <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
                    <span style={{ color: "var(--text-light)" }}>{r.label}</span>
                    <span style={{ fontWeight: 500, color: "var(--text-dark)" }}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* History */}
        {tab === "history" && (
          <div style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", overflow: "hidden" }}>
            <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", fontSize: 14, fontWeight: 600, color: "var(--text-dark)" }}>All payouts</div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--off-white)", borderBottom: "1px solid var(--border)" }}>
                  {["ID","Date","Amount","Bank","Status"].map((h) => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--text-mid)", letterSpacing: ".06em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HISTORY.map((p, i) => (
                  <tr key={p.id} style={{ borderBottom: i < HISTORY.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 600, color: "var(--teal)" }}>{p.id}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--text-dark)" }}>{p.date}</td>
                    <td style={{ padding: "14px 16px", fontSize: 15, fontWeight: 700, color: "var(--text-dark)" }}>₦{p.amount.toLocaleString()}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--text-mid)" }}>{p.bank}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: p.status === "Paid" ? "#E1F5EE" : "#FAEEDA", color: p.status === "Paid" ? "#085041" : "#633806" }}>{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Bank */}
        {tab === "bank" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* Current */}
            <div style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", padding: "22px" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-dark)", marginBottom: 18 }}>Current bank account</div>
              {[
                { label: "Account name",   value: "StyleHaus Nigeria Ltd" },
                { label: "Bank",           value: "Guaranty Trust Bank (GTBank)" },
                { label: "Account number", value: "****4521" },
                { label: "Account type",   value: "Business current" },
              ].map((f) => (
                <div key={f.label} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: "var(--text-light)", marginBottom: 5 }}>{f.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-dark)", padding: "10px 14px", background: "var(--off-white)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>{f.value}</div>
                </div>
              ))}
              <button style={{ width: "100%", marginTop: 6, padding: "11px", background: "var(--teal)", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Update bank details</button>
            </div>

            {/* Add new */}
            <div style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", padding: "22px" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-dark)", marginBottom: 18 }}>Add new bank account</div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 6 }}>Bank name</label>
                <select style={{ ...inputStyle, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}>
                  <option value="">Select bank</option>
                  {BANKS.map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>
              {[
                { label: "Account number", ph: "0123456789" },
                { label: "Account name",   ph: "As it appears on your bank records" },
              ].map((f) => (
                <div key={f.label} style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 6 }}>{f.label}</label>
                  <input placeholder={f.ph} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "rgba(82,171,152,.08)", borderRadius: "var(--radius-sm)", marginBottom: 16, fontSize: 13, color: "var(--sage)" }}>
                <Building2 size={14} /> Account name verified automatically via BVN
              </div>
              <button style={{ width: "100%", padding: "11px", background: "var(--teal)", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Save bank account</button>
            </div>
          </div>
        )}

      </div>

      {/* Withdrawal modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
          <div style={{ background: "white", borderRadius: "var(--radius-xl)", padding: "28px", maxWidth: 400, width: "100%", margin: "0 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(43,103,119,.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--teal)" }}><CreditCard size={20} /></div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--text-dark)" }}>Withdraw funds</div>
                  <div style={{ fontSize: 12, color: "var(--text-light)" }}>Available: ₦{available.toLocaleString()}</div>
                </div>
              </div>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-light)", display: "flex" }}><X size={20} /></button>
            </div>

            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text-dark)", marginBottom: 8 }}>Amount (₦)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" max={available}
              style={{ width: "100%", padding: "12px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 18, fontWeight: 700, color: "var(--text-dark)", outline: "none", marginBottom: 8 }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--teal)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />
            <div style={{ fontSize: 12, color: "var(--text-light)", marginBottom: 20 }}>To: GTBank ****4521 · Processing: 1–2 business days</div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: "11px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "white", fontSize: 14, fontWeight: 500, cursor: "pointer", color: "var(--text-dark)" }}>Cancel</button>
              <button onClick={handleWithdraw} style={{ flex: 1, padding: "11px", background: done ? "var(--sage)" : "var(--teal)", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, transition: "background .2s" }}>
                {done ? <><Check size={15} /> Requested!</> : "Confirm withdrawal"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}