"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  DollarSign,
  AlertTriangle,
  Clock,
  ArrowRight,
  Package,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";
import { formatPrice } from "@/lib/utils";

interface Props {
  onNavigateTab: (tab: string) => void;
}

export default function AdminOverview({ onNavigateTab }: Props) {
  const { stats, orders, products } = useAdminStore();

  const recentOrders = orders.slice(0, 5);

  const statusColors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800 border-amber-300",
    confirmed: "bg-blue-100 text-blue-800 border-blue-300",
    processing: "bg-purple-100 text-purple-800 border-purple-300",
    shipped: "bg-indigo-100 text-indigo-800 border-indigo-300",
    delivered: "bg-emerald-100 text-emerald-800 border-emerald-300",
    refunded: "bg-rose-100 text-rose-800 border-rose-300",
    cancelled: "bg-neutral-100 text-neutral-800 border-neutral-300",
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-ink via-neutral-900 to-neutral-800 text-cream p-8 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-cream/10 border border-cream/20 px-3 py-1 rounded-full text-xs font-mono mb-3 text-cream">
            <Sparkles size={13} />
            <span>Store Operations Live</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-light tracking-tight">
            BLOOMSOME <span className="italic font-serif">Command Center</span>
          </h1>
          <p className="text-cream/70 text-xs sm:text-sm mt-1 max-w-xl">
            Real-time analytics, artisan crafting queue, inventory alerts, and customer insights.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab("products")}
            className="bg-cream text-ink px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-white transition-colors shadow-sm"
          >
            + Add New Product
          </button>
          <button
            onClick={() => onNavigateTab("orders")}
            className="bg-white/10 border border-white/20 text-cream px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-white/20 transition-colors"
          >
            View Orders ({stats.totalOrdersCount})
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Sales */}
        <div className="bg-paper border border-line p-6 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-muted uppercase">Gross Revenue</span>
            <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <DollarSign size={16} />
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-sans text-ink">
            {formatPrice(stats.totalSales)}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 mt-2">
            <TrendingUp size={13} />
            <span>+18.4% from last month</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-paper border border-line p-6 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-muted uppercase">Total Orders</span>
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
              <ShoppingBag size={16} />
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-sans text-ink">
            {stats.totalOrdersCount}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-muted mt-2">
            <span>Avg Value: <strong>{formatPrice(stats.averageOrderValue)}</strong></span>
          </div>
        </div>

        {/* Pending Crafting Orders */}
        <div className="bg-paper border border-line p-6 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-muted uppercase">In Crafting / Pending</span>
            <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <Clock size={16} />
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-sans text-ink">
            {stats.pendingOrdersCount}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-amber-800 mt-2">
            <span>Requires artisan attention</span>
          </div>
        </div>

        {/* Active Customers */}
        <div className="bg-paper border border-line p-6 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-muted uppercase">Customers</span>
            <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center">
              <Users size={16} />
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-sans text-ink">
            {stats.totalCustomersCount}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-purple-800 mt-2">
            <span>100% Verified profiles</span>
          </div>
        </div>

      </div>

      {/* Main Split: Recent Orders & Inventory Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Orders (Left 8 cols) */}
        <div className="lg:col-span-8 bg-paper border border-line rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <div>
              <h2 className="font-display text-xl font-medium text-ink">Recent Orders</h2>
              <p className="text-xs text-muted">Latest handcrafted gift commissions and stem orders</p>
            </div>
            <button
              onClick={() => onNavigateTab("orders")}
              className="inline-flex items-center gap-1 text-xs font-mono uppercase text-ink hover:underline"
            >
              <span>View all</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-line font-mono text-muted uppercase">
                  <th className="pb-3">Order</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Items</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-cream/40 transition-colors">
                    <td className="py-3.5 font-mono font-semibold text-ink">
                      {ord.orderNumber}
                    </td>
                    <td className="py-3.5">
                      <strong className="block text-ink font-medium">{ord.customerName}</strong>
                      <span className="text-[11px] text-muted">{ord.city}</span>
                    </td>
                    <td className="py-3.5 text-muted">
                      {ord.items.length} {ord.items.length === 1 ? "item" : "items"}
                    </td>
                    <td className="py-3.5 font-bold font-sans text-ink">
                      {formatPrice(ord.total)}
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono border capitalize ${
                          statusColors[ord.status] || "bg-cream text-ink border-line"
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => onNavigateTab("orders")}
                        className="p-1 text-muted hover:text-ink hover:bg-cream rounded"
                        title="View details"
                      >
                        <ArrowUpRight size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts & Quick Stats (Right 4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Low Stock Card */}
          <div className="bg-paper border border-line rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} className="text-amber-600" />
                <h3 className="font-display text-base font-medium text-ink">Low Stock Alert</h3>
              </div>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-mono px-2 py-0.5 rounded-full">
                {stats.lowStockCount} items
              </span>
            </div>

            {stats.lowStockProducts.length > 0 ? (
              <div className="space-y-3">
                {stats.lowStockProducts.slice(0, 4).map((p) => (
                  <div key={p.id} className="flex items-center justify-between text-xs p-2 rounded-xl bg-cream/50 border border-line">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-line shrink-0">
                        <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                      </div>
                      <div className="truncate">
                        <p className="font-medium text-ink truncate">{p.name}</p>
                        <p className="text-[10px] text-muted">{p.category}</p>
                      </div>
                    </div>
                    <span className="font-mono text-red-600 font-bold ml-2 shrink-0">
                      {p.stockQuantity ?? 3} left
                    </span>
                  </div>
                ))}
                <button
                  onClick={() => onNavigateTab("products")}
                  className="w-full text-center text-xs font-mono uppercase tracking-wider text-ink hover:underline pt-2 block"
                >
                  Manage inventory →
                </button>
              </div>
            ) : (
              <p className="text-xs text-muted text-center py-4">
                All handcrafted materials and stock levels are healthy!
              </p>
            )}
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-paper border border-line rounded-2xl p-6 shadow-xs space-y-3">
            <h3 className="font-display text-base font-medium text-ink mb-2">Quick Shortcuts</h3>
            
            <button
              onClick={() => onNavigateTab("coupons")}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-line bg-cream hover:border-ink/40 transition-colors text-xs text-left"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">🏷️</span>
                <div>
                  <strong className="block text-ink">Manage Promo Codes</strong>
                  <span className="text-muted text-[11px]">3 Active coupons</span>
                </div>
              </div>
              <ArrowRight size={14} className="text-muted" />
            </button>

            <button
              onClick={() => onNavigateTab("homepage")}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-line bg-cream hover:border-ink/40 transition-colors text-xs text-left"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">🏠</span>
                <div>
                  <strong className="block text-ink">Edit Homepage & Banners</strong>
                  <span className="text-muted text-[11px]">Hero headline & ribbons</span>
                </div>
              </div>
              <ArrowRight size={14} className="text-muted" />
            </button>

            <button
              onClick={() => onNavigateTab("cms")}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-line bg-cream hover:border-ink/40 transition-colors text-xs text-left"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">📝</span>
                <div>
                  <strong className="block text-ink">Manage CMS & FAQs</strong>
                  <span className="text-muted text-[11px]">Edit store policies & FAQ</span>
                </div>
              </div>
              <ArrowRight size={14} className="text-muted" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
