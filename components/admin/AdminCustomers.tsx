"use client";

import React, { useState, useMemo } from "react";
import { Search, Mail, Phone, ExternalLink, Crown, Sparkles, MessageCircle, MapPin } from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";
import { formatPrice } from "@/lib/utils";

export default function AdminCustomers() {
  const { customers, updateCustomer } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.city.toLowerCase().includes(q)
      );
    });
  }, [customers, searchQuery]);

  const toggleVip = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "vip" ? "active" : "vip";
    updateCustomer(id, { status: nextStatus });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-light text-ink tracking-tight">
          Customers Directory ({customers.length})
        </h1>
        <p className="text-xs sm:text-sm text-muted">
          View customer purchase history, total lifetime value, contact information, and VIP loyalty status.
        </p>
      </div>

      {/* Search Input */}
      <div className="bg-paper border border-line rounded-2xl p-4 sm:p-6 shadow-xs">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" size={16} />
          <input
            type="text"
            placeholder="Search customers by name, email, phone number, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-cream border border-line rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-ink focus:outline-none focus:border-ink"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-paper border border-line rounded-2xl shadow-xs overflow-hidden">
        {filteredCustomers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-cream/60 border-b border-line font-mono text-muted uppercase">
                  <th className="py-3.5 px-6">Customer</th>
                  <th className="py-3.5 px-4">Contact Info</th>
                  <th className="py-3.5 px-4">City</th>
                  <th className="py-3.5 px-4">Orders</th>
                  <th className="py-3.5 px-4">Total Spent</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Quick Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filteredCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-cream/40 transition-colors">
                    <td className="py-4 px-6">
                      <strong className="block font-medium text-ink text-sm">{cust.name}</strong>
                      <span className="text-[11px] text-muted">Last order: {cust.lastOrderDate}</span>
                      {cust.notes && (
                        <p className="text-[10px] text-amber-800 italic mt-0.5">Note: {cust.notes}</p>
                      )}
                    </td>

                    <td className="py-4 px-4 text-muted">
                      <div className="space-y-0.5">
                        <p className="flex items-center gap-1.5 text-ink">
                          <Mail size={12} className="text-muted" /> {cust.email}
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Phone size={12} className="text-muted" /> {cust.phone}
                        </p>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-mono text-muted">
                      {cust.city}
                    </td>

                    <td className="py-4 px-4 font-mono font-bold text-ink">
                      {cust.totalOrders} {cust.totalOrders === 1 ? "order" : "orders"}
                    </td>

                    <td className="py-4 px-4 font-sans font-bold text-sm text-emerald-800">
                      {formatPrice(cust.totalSpent)}
                    </td>

                    <td className="py-4 px-4">
                      <button
                        onClick={() => toggleVip(cust.id, cust.status)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono border transition-all ${
                          cust.status === "vip"
                            ? "bg-amber-100 border-amber-300 text-amber-800 font-bold"
                            : "bg-cream border-line text-muted hover:border-ink"
                        }`}
                        title="Click to toggle VIP status"
                      >
                        {cust.status === "vip" ? <Crown size={11} /> : null}
                        <span className="uppercase">{cust.status}</span>
                      </button>
                    </td>

                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`https://wa.me/${cust.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="WhatsApp customer"
                        >
                          <MessageCircle size={15} />
                        </a>
                        <a
                          href={`mailto:${cust.email}`}
                          className="p-1.5 text-muted hover:text-ink hover:bg-cream rounded-lg transition-colors"
                          title="Email customer"
                        >
                          <Mail size={15} />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 px-4">
            <p className="font-display text-lg text-ink mb-1">No customers found</p>
            <p className="text-xs text-muted">Try a different name or search term.</p>
          </div>
        )}
      </div>

    </div>
  );
}
