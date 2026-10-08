"use client";

import React, { useState } from "react";
import { Plus, Trash2, Tag, Percent, Calendar, Check, X } from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";
import type { AdminCoupon } from "@/lib/adminTypes";
import { formatPrice } from "@/lib/utils";

export default function AdminCoupons() {
  const { coupons, addCoupon, updateCoupon, deleteCoupon } = useAdminStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [discountValue, setDiscountValue] = useState(10);
  const [minSpend, setMinSpend] = useState(499);
  const [usageLimit, setUsageLimit] = useState(100);
  const [expiryDate, setExpiryDate] = useState("2026-12-31");

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    const coupon: AdminCoupon = {
      id: `coup-${Date.now()}`,
      code: newCode.trim().toUpperCase(),
      discountType,
      discountValue: Number(discountValue),
      minSpend: Number(minSpend),
      usageLimit: Number(usageLimit),
      usageCount: 0,
      expiryDate,
      isActive: true,
      createdAt: new Date().toISOString().split("T")[0],
    };

    addCoupon(coupon);
    setIsModalOpen(false);
    setNewCode("");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-light text-ink tracking-tight">
            Discount Coupons & Promo Codes ({coupons.length})
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Create promotional codes, set minimum order values, define percentage or flat deductions, and monitor usage limits.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-ink text-cream px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-ink/90 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus size={15} />
          Create New Coupon
        </button>
      </div>

      {/* Coupons Table */}
      <div className="bg-paper border border-line rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-cream/60 border-b border-line font-mono text-muted uppercase">
                <th className="py-3.5 px-6">Coupon Code</th>
                <th className="py-3.5 px-4">Discount Value</th>
                <th className="py-3.5 px-4">Min. Spend</th>
                <th className="py-3.5 px-4">Usage (Used / Limit)</th>
                <th className="py-3.5 px-4">Expires On</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-cream/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm bg-cream border border-line px-3 py-1 rounded-lg text-ink">
                        {c.code}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4 font-bold text-sm text-emerald-800">
                    {c.discountType === "percentage" ? `${c.discountValue}% OFF` : `₹${c.discountValue} FLAT OFF`}
                  </td>

                  <td className="py-4 px-4 text-muted font-sans">
                    {formatPrice(c.minSpend)}
                  </td>

                  <td className="py-4 px-4 font-mono text-muted">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-ink">{c.usageCount}</span>
                      <span>/ {c.usageLimit}</span>
                    </div>
                    <div className="w-24 h-1 bg-line rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-ink"
                        style={{ width: `${Math.min(100, (c.usageCount / c.usageLimit) * 100)}%` }}
                      />
                    </div>
                  </td>

                  <td className="py-4 px-4 font-mono text-muted">
                    {c.expiryDate}
                  </td>

                  <td className="py-4 px-4">
                    <button
                      onClick={() => updateCoupon(c.id, { isActive: !c.isActive })}
                      className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase font-bold border transition-colors ${
                        c.isActive
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                          : "bg-neutral-100 text-neutral-600 border-neutral-300"
                      }`}
                    >
                      {c.isActive ? "Active" : "Disabled"}
                    </button>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => deleteCoupon(c.id)}
                      className="p-1.5 text-muted hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete coupon"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Coupon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="bg-paper border border-line text-ink w-full max-w-md rounded-3xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-line mb-6">
              <h3 className="font-display text-xl font-medium text-ink">Create Promo Code</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-muted hover:text-ink">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FESTIVE20"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  className="w-full bg-cream border border-line rounded-xl px-4 py-2.5 text-sm uppercase font-mono font-bold text-ink focus:outline-none focus:border-ink"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1">
                    Discount Type
                  </label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as "percentage" | "fixed")}
                    className="w-full bg-cream border border-line rounded-xl px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Flat Amount (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1">
                    Discount Value *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full bg-cream border border-line rounded-xl px-4 py-2 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1">
                    Min Spend (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={minSpend}
                    onChange={(e) => setMinSpend(Number(e.target.value))}
                    className="w-full bg-cream border border-line rounded-xl px-4 py-2 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1">
                    Usage Limit
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={usageLimit}
                    onChange={(e) => setUsageLimit(Number(e.target.value))}
                    className="w-full bg-cream border border-line rounded-xl px-4 py-2 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full bg-cream border border-line rounded-xl px-4 py-2 text-xs focus:outline-none"
                />
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t border-line">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-mono uppercase text-muted hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-ink text-cream px-6 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-ink/90"
                >
                  Create Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
