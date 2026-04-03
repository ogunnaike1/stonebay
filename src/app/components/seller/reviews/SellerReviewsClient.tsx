"use client";

import { useState } from "react";
import DashboardTopbar from "@/app/components/shared/DashboardTopbar";
import StatCard from "@/app/components/shared/StatCard";
import { Star, MessageSquare, Flag, X, Check } from "lucide-react";

type ReviewFilter = "All" | "5" | "4" | "3" | "2" | "1" | "Unanswered";

const REVIEWS = [
  { id: "1", buyer: "Adeola K.", avatar: "AK", product: "Premium Ankara Dress", emoji: "👗", rating: 5, date: "14 Mar 2026", comment: "Absolutely stunning dress! The fabric quality is excellent and the fit is perfect. Got so many compliments at the event. StyleHaus never disappoints!", replied: false, reply: "" },
  { id: "2", buyer: "Ngozi A.", avatar: "NA", product: "Men's Agbada Set", emoji: "👔", rating: 4, date: "10 Mar 2026", comment: "Beautiful set, arrived on time. The embroidery is very detailed and elegant. Only minor thing is the fabric is slightly stiffer than expected — softens after washing.", replied: true, reply: "Thank you for your kind words! You're right about the fabric — it softens beautifully after the first wash. We recommend a gentle machine wash. Enjoy wearing it!" },
  { id: "3", buyer: "Chidinma E.", avatar: "CE", product: "Premium Ankara Dress", emoji: "👗", rating: 5, date: "8 Mar 2026", comment: "Received so many compliments! Fast delivery and packaging was excellent. StyleHaus is my go-to for fashion now.", replied: false, reply: "" },
  { id: "4", buyer: "Emeka B.", avatar: "EB", product: "Leather Crossbody Bag", emoji: "👜", rating: 3, date: "5 Mar 2026", comment: "The bag looks good but the zipper felt a bit stiff at first. Quality overall is decent for the price. Delivery took longer than expected.", replied: false, reply: "" },
  { id: "5", buyer: "Fatima S.", avatar: "FS", product: "Gold Earring Set", emoji: "💍", rating: 5, date: "1 Mar 2026", comment: "Absolutely love these earrings! Great quality, beautiful packaging. Will be ordering more jewellery soon.", replied: true, reply: "Thank you so much! We're so glad you love them. Check our new collection dropping next week 💛" },
  { id: "6", buyer: "Bola T.", avatar: "BT", product: "Rattan Wall Art", emoji: "🏺", rating: 4, date: "26 Feb 2026", comment: "Really nice wall art. Arrived well packaged and looks beautiful in my living room. Slight colour difference from the photo but still great.", replied: false, reply: "" },
];

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1,2,3,4,5].map((s) => (
        <Star key={s} size={size} fill={s <= rating ? "#52ab98" : "none"} color="#52ab98" />
      ))}
    </div>
  );
}

export default function SellerReviewsClient() {
  const [reviews, setReviews] = useState(REVIEWS);
  const [filter, setFilter] = useState<ReviewFilter>("All");
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [helpfulSet, setHelpfulSet] = useState<Set<string>>(new Set());

  const submitReply = (id: string) => {
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, replied: true, reply: replyText } : r));
    setReplyingId(null); setReplyText("");
  };

  const toggleHelpful = (id: string) =>
    setHelpfulSet((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const filtered = reviews.filter((r) => {
    if (filter === "All") return true;
    if (filter === "Unanswered") return !r.replied;
    return r.rating === Number(filter);
  });

  const avg = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);
  const dist = [5,4,3,2,1].map((s) => ({ star: s, count: reviews.filter((r) => r.rating === s).length }));

  const filterItems: { key: ReviewFilter; label: string }[] = [
    { key: "All", label: `All reviews (${reviews.length})` },
    ...dist.map((d) => ({ key: d.star.toString() as ReviewFilter, label: `${d.star} ★ (${d.count})` })),
    { key: "Unanswered", label: `⚡ Unanswered (${reviews.filter((r) => !r.replied).length})` },
  ];

  return (
    <>
      <DashboardTopbar title="Reviews" />
      <div style={{ padding: "24px 28px", overflowY: "auto" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
          <StatCard label="Average rating"  value={`${avg} ★`} sub={`${reviews.length} total reviews`} />
          <StatCard label="5-star reviews"  value={`${dist[0].count}`} sub={`${Math.round((dist[0].count / reviews.length) * 100)}% of total`} subColor="up" />
          <StatCard label="Unanswered"      value={`${reviews.filter((r) => !r.replied).length}`} sub="Need your response" />
          <StatCard label="Response rate"   value={`${Math.round((reviews.filter((r) => r.replied).length / reviews.length) * 100)}%`} sub="Aim for 100%" subColor="up" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 16 }}>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Rating summary */}
            <div style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", padding: "20px" }}>
              <div style={{ textAlign: "center", marginBottom: 18 }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 52, fontWeight: 700, color: "var(--text-dark)", lineHeight: 1 }}>{avg}</div>
                <div style={{ display: "flex", justifyContent: "center", margin: "10px 0 6px" }}>
                  <Stars rating={Math.round(Number(avg))} size={18} />
                </div>
                <div style={{ fontSize: 13, color: "var(--text-light)" }}>{reviews.length} reviews</div>
              </div>
              {dist.map((d) => (
                <div key={d.star} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: "var(--text-mid)", width: 12 }}>{d.star}</span>
                  <Star size={12} fill="#52ab98" color="#52ab98" />
                  <div style={{ flex: 1, height: 6, background: "var(--off-white)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${reviews.length > 0 ? (d.count / reviews.length) * 100 : 0}%`, background: "#52ab98", borderRadius: 3 }} />
                  </div>
                  <span style={{ fontSize: 12, color: "var(--text-light)", width: 14, textAlign: "right" }}>{d.count}</span>
                </div>
              ))}
            </div>

            {/* Filter */}
            <div style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", overflow: "hidden" }}>
              {filterItems.map((f) => (
                <button key={f.key} onClick={() => setFilter(f.key)}
                  style={{ display: "block", width: "100%", padding: "11px 18px", border: "none", borderLeft: `3px solid ${filter === f.key ? "var(--teal)" : "transparent"}`, background: filter === f.key ? "rgba(43,103,119,.05)" : "transparent", textAlign: "left", fontSize: 13, fontWeight: filter === f.key ? 600 : 400, color: filter === f.key ? "var(--teal)" : "var(--text-mid)", cursor: "pointer", transition: "all .15s" }}
                >{f.label}</button>
              ))}
            </div>
          </div>

          {/* Reviews list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filtered.length === 0 ? (
              <div style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", padding: "56px 20px", textAlign: "center" }}>
                <Star size={36} color="var(--text-light)" style={{ margin: "0 auto 12px", display: "block" }} />
                <div style={{ fontSize: 15, fontWeight: 500, color: "var(--text-mid)" }}>No reviews here</div>
              </div>
            ) : filtered.map((r) => (
              <div key={r.id} style={{ background: "white", borderRadius: "var(--radius-lg)", border: `1px solid ${!r.replied ? "rgba(43,103,119,.2)" : "var(--border)"}`, overflow: "hidden" }}>
                {/* Review header */}
                <div style={{ padding: "16px 20px", borderBottom: r.replied || replyingId === r.id ? "1px solid var(--border)" : "none", display: "flex", gap: 14 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(43,103,119,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "var(--teal)", flexShrink: 0 }}>{r.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-dark)" }}>{r.buyer}</span>
                        <span style={{ fontSize: 11, color: "var(--text-light)" }}>{r.date}</span>
                      </div>
                      <Stars rating={r.rating} />
                    </div>
                    <div style={{ fontSize: 12, color: "var(--teal)", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                      {r.emoji} {r.product}
                    </div>
                    <p style={{ fontSize: 14, color: "var(--text-mid)", lineHeight: 1.65, marginBottom: 12 }}>{r.comment}</p>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: "var(--text-light)" }}>Helpful?</span>
                      <button onClick={() => toggleHelpful(r.id)} style={{ padding: "4px 12px", border: `1px solid ${helpfulSet.has(r.id) ? "var(--sage)" : "var(--border)"}`, borderRadius: 20, background: helpfulSet.has(r.id) ? "rgba(82,171,152,.1)" : "white", fontSize: 12, color: helpfulSet.has(r.id) ? "var(--sage)" : "var(--text-mid)", cursor: "pointer", transition: "all .15s" }}>
                        👍 Yes
                      </button>
                      {!r.replied && replyingId !== r.id && (
                        <button onClick={() => { setReplyingId(r.id); setReplyText(""); }} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", border: "1px solid var(--teal)", borderRadius: "var(--radius-sm)", background: "rgba(43,103,119,.05)", fontSize: 12, fontWeight: 500, color: "var(--teal)", cursor: "pointer" }}>
                          <MessageSquare size={12} /> Reply to review
                        </button>
                      )}
                      <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "white", fontSize: 12, color: "var(--text-mid)", cursor: "pointer" }}>
                        <Flag size={12} /> Report
                      </button>
                    </div>
                  </div>
                </div>

                {/* Seller reply */}
                {r.replied && (
                  <div style={{ padding: "14px 20px 14px 70px", background: "rgba(43,103,119,.03)" }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "var(--teal)", marginBottom: 6 }}>🏪 StyleHaus replied</div>
                    <p style={{ fontSize: 13, color: "var(--text-mid)", lineHeight: 1.65 }}>{r.reply}</p>
                  </div>
                )}

                {/* Reply form */}
                {replyingId === r.id && (
                  <div style={{ padding: "16px 20px", background: "var(--off-white)" }}>
                    <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write a helpful and professional reply to this customer…" rows={3}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 14, color: "var(--text-dark)", outline: "none", resize: "vertical", fontFamily: "var(--font-body)", marginBottom: 10, background: "white" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--teal)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                    />
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => submitReply(r.id)} disabled={!replyText.trim()} style={{ padding: "9px 18px", background: replyText.trim() ? "var(--teal)" : "var(--border)", color: "white", border: "none", borderRadius: "var(--radius-sm)", fontSize: 13, fontWeight: 600, cursor: replyText.trim() ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 6 }}>
                        <Check size={14} /> Post reply
                      </button>
                      <button onClick={() => setReplyingId(null)} style={{ padding: "9px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "white", fontSize: 13, cursor: "pointer", color: "var(--text-dark)", display: "flex", alignItems: "center", gap: 5 }}>
                        <X size={13} /> Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}