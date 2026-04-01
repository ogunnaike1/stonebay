"use client";

import { useState } from "react";
import DashboardTopbar from "@/app/components/shared/DashboardTopbar";
import { Star, Edit2, Trash2, X, Check } from "lucide-react";

type Review = {
  id: string;
  product: string;
  seller: string;
  emoji: string;
  bg: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
};

type Pending = {
  id: string;
  product: string;
  seller: string;
  emoji: string;
  bg: string;
  orderId: string;
  deliveredDate: string;
};

const REVIEWS: Review[] = [
  { id: "1", product: "Premium Ankara Print Dress", seller: "StyleHaus", emoji: "👗", bg: "#e8f0f5", rating: 5, date: "14 Mar 2026", comment: "Absolutely gorgeous dress! The fabric quality is excellent and the fit is perfect. Got so many compliments at the event. Delivery was also very fast. Will definitely order more from StyleHaus.", helpful: 12 },
  { id: "2", product: "Rattan Wall Art Set", seller: "HomeDecor", emoji: "🏺", bg: "#c8e4d8", rating: 4, date: "5 Mar 2026", comment: "Beautiful piece, looks exactly as pictured. Assembly was straightforward. Only giving 4 stars because one piece had a minor scratch. Seller responded quickly and offered a partial refund.", helpful: 7 },
  { id: "3", product: "Natural Skincare Kit", seller: "GlowUp", emoji: "✨", bg: "#ead8e0", rating: 5, date: "20 Feb 2026", comment: "My skin has never looked better! These products are genuinely natural and my skin loves them. Will be a repeat customer for sure.", helpful: 24 },
];

const PENDING: Pending[] = [
  { id: "p1", product: "Wireless Headphones", seller: "TechHub", emoji: "🎧", bg: "#d4e8f0", orderId: "SB-4819", deliveredDate: "18 Mar 2026" },
  { id: "p2", product: "Men's Agbada Set", seller: "RoyalThreads", emoji: "👔", bg: "#e8e0d0", orderId: "SB-4801", deliveredDate: "5 Mar 2026" },
];

function StarRating({ rating, onChange }: { rating: number; onChange?: (r: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <button key={s} type="button"
          onClick={() => onChange?.(s)}
          onMouseEnter={() => onChange && setHovered(s)}
          onMouseLeave={() => onChange && setHovered(0)}
          style={{ background: "none", border: "none", padding: 1, cursor: onChange ? "pointer" : "default" }}
        >
          <Star size={onChange ? 22 : 15}
            fill={(hovered || rating) >= s ? "#52ab98" : "none"}
            color={(hovered || rating) >= s ? "#52ab98" : "#cbd8e4"}
          />
        </button>
      ))}
    </div>
  );
}

export default function ReviewsClient() {
  const [tab, setTab] = useState<"written" | "pending">("written");
  const [reviews, setReviews] = useState(REVIEWS);
  const [pending, setPending] = useState(PENDING);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [writingId, setWritingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ rating: 5, comment: "" });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [helpfulClicked, setHelpfulClicked] = useState<Set<string>>(new Set());

  const openEdit = (r: Review) => { setEditingId(r.id); setEditForm({ rating: r.rating, comment: r.comment }); };
  const saveEdit = () => {
    setReviews((prev) => prev.map((r) => r.id === editingId ? { ...r, ...editForm } : r));
    setEditingId(null);
  };

  const openWrite = (p: Pending) => { setWritingId(p.id); setEditForm({ rating: 5, comment: "" }); };
  const submitReview = (p: Pending) => {
    setReviews((prev) => [{ id: Date.now().toString(), product: p.product, seller: p.seller, emoji: p.emoji, bg: p.bg, rating: editForm.rating, date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }), comment: editForm.comment, helpful: 0 }, ...prev]);
    setPending((prev) => prev.filter((x) => x.id !== p.id));
    setWritingId(null);
    setTab("written");
  };

  const toggleHelpful = (id: string) => setHelpfulClicked((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });

  return (
    <>
      <DashboardTopbar title="My Reviews" />
      <div style={{ padding: "24px 28px" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, background: "white", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "4px", marginBottom: 20, width: "fit-content" }}>
          {([["written", `Written (${reviews.length})`], ["pending", `Pending (${pending.length})`]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{ padding: "8px 20px", borderRadius: "var(--radius-md)", border: "none", background: tab === key ? "var(--teal)" : "transparent", color: tab === key ? "white" : "var(--text-mid)", fontSize: 13, fontWeight: tab === key ? 600 : 400, cursor: "pointer", transition: "all 0.2s" }}>
              {label}
            </button>
          ))}
        </div>

        {tab === "written" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {reviews.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px", background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>⭐</div>
                <div style={{ fontSize: 16, fontWeight: 500, color: "var(--text-dark)", marginBottom: 6 }}>No reviews yet</div>
                <div style={{ fontSize: 13, color: "var(--text-light)" }}>Your written reviews will appear here</div>
              </div>
            )}
            {reviews.map((r) => (
              <div key={r.id} style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", overflow: "hidden" }}>
                {/* Product row */}
                <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", background: "var(--off-white)", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "var(--radius-md)", background: r.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{r.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-dark)" }}>{r.product}</div>
                    <div style={{ fontSize: 12, color: "var(--text-light)" }}>{r.seller} · Reviewed {r.date}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => openEdit(r)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "white", fontSize: 12, fontWeight: 500, color: "var(--text-dark)", cursor: "pointer" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--teal)"; (e.currentTarget as HTMLElement).style.color = "var(--teal)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-dark)"; }}
                    >
                      <Edit2 size={12} /> Edit
                    </button>
                    <button onClick={() => setDeleteConfirm(r.id)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "white", fontSize: 12, color: "#e05c5c", cursor: "pointer" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#e05c5c")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>

                {/* Review body */}
                <div style={{ padding: "16px 20px" }}>
                  {editingId === r.id ? (
                    <div>
                      <div style={{ marginBottom: 12 }}>
                        <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-dark)", display: "block", marginBottom: 8 }}>Rating</label>
                        <StarRating rating={editForm.rating} onChange={(v) => setEditForm((f) => ({ ...f, rating: v }))} />
                      </div>
                      <textarea value={editForm.comment} onChange={(e) => setEditForm((f) => ({ ...f, comment: e.target.value }))} rows={4} style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 14, color: "var(--text-dark)", outline: "none", resize: "vertical", fontFamily: "var(--font-body)", marginBottom: 12 }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--teal)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                      />
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={saveEdit} style={{ padding: "8px 18px", background: "var(--teal)", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                          <Check size={14} /> Save changes
                        </button>
                        <button onClick={() => setEditingId(null)} style={{ padding: "8px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "white", fontSize: 13, cursor: "pointer", color: "var(--text-dark)" }}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                        <StarRating rating={r.rating} />
                        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-dark)" }}>{r.rating}.0</span>
                      </div>
                      <p style={{ fontSize: 14, color: "var(--text-mid)", lineHeight: 1.7, marginBottom: 12 }}>{r.comment}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 12, color: "var(--text-light)" }}>Was this helpful?</span>
                        <button onClick={() => toggleHelpful(r.id)} style={{ padding: "4px 12px", border: `1px solid ${helpfulClicked.has(r.id) ? "var(--sage)" : "var(--border)"}`, borderRadius: 20, background: helpfulClicked.has(r.id) ? "rgba(82,171,152,0.1)" : "white", fontSize: 12, color: helpfulClicked.has(r.id) ? "var(--sage)" : "var(--text-mid)", cursor: "pointer", transition: "all 0.15s" }}>
                          👍 Yes ({r.helpful + (helpfulClicked.has(r.id) ? 1 : 0)})
                        </button>
                      </div>
                    </>
                  )}

                  {deleteConfirm === r.id && (
                    <div style={{ marginTop: 12, padding: "12px 14px", background: "#FCEBEB", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 13, color: "#791F1F" }}>Delete this review permanently?</span>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => setDeleteConfirm(null)} style={{ padding: "5px 12px", border: "1px solid #F09595", borderRadius: "var(--radius-sm)", background: "white", fontSize: 12, cursor: "pointer" }}>Cancel</button>
                        <button onClick={() => { setReviews((prev) => prev.filter((x) => x.id !== r.id)); setDeleteConfirm(null); }} style={{ padding: "5px 12px", background: "#e05c5c", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "pending" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {pending.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px", background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
                <div style={{ fontSize: 16, fontWeight: 500, color: "var(--text-dark)", marginBottom: 6 }}>All caught up!</div>
                <div style={{ fontSize: 13, color: "var(--text-light)" }}>You've reviewed all your recent purchases</div>
              </div>
            )}
            {pending.map((p) => (
              <div key={p.id} style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: writingId === p.id ? "1px solid var(--border)" : "none", background: "var(--off-white)", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "var(--radius-md)", background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{p.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-dark)" }}>{p.product}</div>
                    <div style={{ fontSize: 12, color: "var(--text-light)" }}>{p.seller} · Order #{p.orderId} · Delivered {p.deliveredDate}</div>
                  </div>
                  {writingId !== p.id && (
                    <button onClick={() => openWrite(p)} style={{ padding: "8px 16px", background: "var(--teal)", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                      <Star size={13} /> Write review
                    </button>
                  )}
                </div>

                {writingId === p.id && (
                  <div style={{ padding: "20px" }}>
                    <div style={{ marginBottom: 14 }}>
                      <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-dark)", display: "block", marginBottom: 8 }}>Your rating</label>
                      <StarRating rating={editForm.rating} onChange={(v) => setEditForm((f) => ({ ...f, rating: v }))} />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-dark)", display: "block", marginBottom: 8 }}>Your review</label>
                      <textarea value={editForm.comment} onChange={(e) => setEditForm((f) => ({ ...f, comment: e.target.value }))} placeholder="Share your experience with this product..." rows={4} style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 14, color: "var(--text-dark)", outline: "none", resize: "vertical", fontFamily: "var(--font-body)" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--teal)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                      />
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => submitReview(p)} disabled={!editForm.comment.trim()} style={{ padding: "10px 22px", background: editForm.comment.trim() ? "var(--teal)" : "var(--border)", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 14, fontWeight: 600, cursor: editForm.comment.trim() ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 7 }}>
                        <Check size={15} /> Submit review
                      </button>
                      <button onClick={() => setWritingId(null)} style={{ padding: "10px 16px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "white", fontSize: 14, cursor: "pointer", color: "var(--text-dark)", display: "flex", alignItems: "center", gap: 6 }}>
                        <X size={14} /> Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}