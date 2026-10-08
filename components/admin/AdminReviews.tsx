"use client";

import React, { useState } from "react";
import { Star, CheckCircle, XCircle, Trash2, Check, ShieldCheck } from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";

export default function AdminReviews() {
  const { reviews, updateReviewStatus, deleteReview } = useAdminStore();
  const [filter, setFilter] = useState<"all" | "approved" | "pending" | "rejected">("all");

  const filteredReviews = reviews.filter(
    (r) => filter === "all" || r.status === filter
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-light text-ink tracking-tight">
            Customer Reviews Moderation ({reviews.length})
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Moderate community feedback, approve genuine verified buyer testimonials, or reject spam.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {(["all", "approved", "pending", "rejected"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                filter === st
                  ? "bg-ink text-cream font-medium"
                  : "bg-paper border border-line text-muted hover:text-ink"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReviews.map((rev) => {
          const isApproved = rev.status === "approved";
          const isRejected = rev.status === "rejected";

          return (
            <div
              key={rev.id}
              className={`bg-paper border rounded-2xl p-6 shadow-xs flex flex-col justify-between transition-all ${
                isApproved
                  ? "border-emerald-200 bg-emerald-50/10"
                  : isRejected
                  ? "border-rose-200 opacity-60 bg-rose-50/10"
                  : "border-amber-200 bg-amber-50/10"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-1 text-yellow-600 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          fill={i < rev.rating ? "currentColor" : "none"}
                          strokeWidth={1}
                        />
                      ))}
                      <span className="font-mono text-xs font-bold text-ink ml-1">
                        {rev.rating}.0
                      </span>
                    </div>
                    <strong className="text-ink font-medium text-sm block">{rev.userName}</strong>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase font-bold border ${
                      isApproved
                        ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                        : isRejected
                        ? "bg-rose-100 text-rose-800 border-rose-300"
                        : "bg-amber-100 text-amber-800 border-amber-300"
                    }`}
                  >
                    {rev.status || "Approved"}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic font-serif">
                  &ldquo;{rev.text}&rdquo;
                </p>
                <div className="flex items-center gap-2 mt-3 text-[10px] font-mono text-muted">
                  <span>Product: <strong>{rev.productId}</strong></span>
                  <span>•</span>
                  <span>Date: {rev.createdAt}</span>
                </div>
              </div>

              {/* Moderation Controls */}
              <div className="pt-4 mt-4 border-t border-line flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateReviewStatus(rev.id, "approved")}
                    disabled={isApproved}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-mono uppercase ${
                      isApproved
                        ? "bg-emerald-800 text-white opacity-50 cursor-default"
                        : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                    }`}
                  >
                    <CheckCircle size={13} />
                    Approve
                  </button>

                  <button
                    onClick={() => updateReviewStatus(rev.id, "rejected")}
                    disabled={isRejected}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-mono uppercase ${
                      isRejected
                        ? "bg-rose-800 text-white opacity-50 cursor-default"
                        : "bg-rose-100 text-rose-800 hover:bg-rose-200"
                    }`}
                  >
                    <XCircle size={13} />
                    Reject
                  </button>
                </div>

                <button
                  onClick={() => deleteReview(rev.id)}
                  className="text-muted hover:text-red-600 p-1 transition-colors"
                  title="Delete review"
                >
                  <Trash2 size={15} />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
