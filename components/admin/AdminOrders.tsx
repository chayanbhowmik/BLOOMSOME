"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Search,
  Filter,
  Truck,
  Printer,
  RotateCcw,
  CheckCircle2,
  Clock,
  MapPin,
  ExternalLink,
  Gift,
  X,
  User,
  Phone,
  Mail,
  ChevronDown,
} from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";
import type { AdminOrder } from "@/lib/adminTypes";
import type { OrderStatus } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import AdminInvoiceModal from "./AdminInvoiceModal";

const statusList: { key: string; label: string }[] = [
  { key: "all", label: "All Orders" },
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "processing", label: "Being Handcrafted" },
  { key: "shipped", label: "Shipped / In Transit" },
  { key: "delivered", label: "Delivered" },
  { key: "refunded", label: "Refunded" },
  { key: "cancelled", label: "Cancelled" },
];

const carriers = [
  "BlueDart Express",
  "Delhivery Logistics",
  "Xpressbees",
  "DTDC Courier",
  "IndiaPost Speed Post",
  "Shadowfax",
];

export default function AdminOrders() {
  const { orders, updateOrderStatus, updateOrderTracking, issueRefund } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [showInvoiceOrder, setShowInvoiceOrder] = useState<AdminOrder | null>(null);

  // Tracking edit state inside modal
  const [trackingNumberInput, setTrackingNumberInput] = useState("");
  const [carrierInput, setCarrierInput] = useState(carriers[0]);
  const [isSavingTracking, setIsSavingTracking] = useState(false);

  // Refund state
  const [showRefundForm, setShowRefundForm] = useState(false);
  const [refundReason, setRefundReason] = useState("");
  const [refundAmount, setRefundAmount] = useState<number>(0);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchStatus = selectedStatus === "all" || o.status === selectedStatus;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q) ||
        o.customerPhone.includes(q) ||
        o.city.toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [orders, selectedStatus, searchQuery]);

  const openOrderDetail = (order: AdminOrder) => {
    setSelectedOrder(order);
    setTrackingNumberInput(order.trackingNumber || "");
    setCarrierInput(order.carrier || carriers[0]);
    setShowRefundForm(false);
    setRefundAmount(order.total);
  };

  const handleSaveTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;
    updateOrderTracking(selectedOrder.id, trackingNumberInput, carrierInput);
    setIsSavingTracking(true);
    setTimeout(() => {
      setIsSavingTracking(false);
      // update local reference
      setSelectedOrder({
        ...selectedOrder,
        trackingNumber: trackingNumberInput,
        carrier: carrierInput,
      });
    }, 400);
  };

  const handleStatusChange = (newStatus: OrderStatus) => {
    if (!selectedOrder) return;
    updateOrderStatus(selectedOrder.id, newStatus);
    setSelectedOrder({ ...selectedOrder, status: newStatus });
  };

  const handleProcessRefund = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;
    issueRefund(selectedOrder.id, refundAmount, refundReason);
    setShowRefundForm(false);
    setSelectedOrder({
      ...selectedOrder,
      paymentStatus: "Refunded",
      status: "refunded",
      refundAmount,
      refundReason,
    });
  };

  const statusBadgeStyle = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "processing":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "shipped":
        return "bg-indigo-100 text-indigo-800 border-indigo-300";
      case "delivered":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "refunded":
        return "bg-rose-100 text-rose-800 border-rose-300";
      default:
        return "bg-neutral-100 text-neutral-800 border-neutral-300";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-light text-ink tracking-tight">
            Orders & Fulfillment ({orders.length})
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Manage customer purchases, assign courier AWB tracking, view custom gift notes, and print tax invoices.
          </p>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-paper border border-line rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input
              type="text"
              placeholder="Search by Order ID (BLM-...), customer name, email, phone, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-cream border border-line rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-ink focus:outline-none focus:border-ink"
            />
          </div>

          {/* Quick Clear */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs font-mono uppercase text-muted hover:text-ink shrink-0"
            >
              Clear
            </button>
          )}
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {statusList.map((st) => {
            const isSelected = selectedStatus === st.key;
            return (
              <button
                key={st.key}
                onClick={() => setSelectedStatus(st.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-ink text-cream font-medium"
                    : "bg-cream border border-line text-muted hover:text-ink hover:border-ink/40"
                }`}
              >
                {st.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-paper border border-line rounded-2xl shadow-xs overflow-hidden">
        {filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-cream/60 border-b border-line font-mono text-muted uppercase">
                  <th className="py-3.5 px-6">Order ID</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Items</th>
                  <th className="py-3.5 px-4">Total</th>
                  <th className="py-3.5 px-4">Payment</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => openOrderDetail(order)}
                    className="hover:bg-cream/50 transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-6 font-mono font-bold text-ink">
                      {order.orderNumber}
                      {order.customizationDetails && (
                        <span className="block text-[10px] font-sans text-amber-700 font-normal">
                          ✨ Bespoke Custom
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-muted whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-4 px-4">
                      <strong className="block text-ink font-medium">{order.customerName}</strong>
                      <span className="text-[11px] text-muted">{order.city}</span>
                    </td>
                    <td className="py-4 px-4 text-muted">
                      {order.items.length} {order.items.length === 1 ? "item" : "items"}
                    </td>
                    <td className="py-4 px-4 font-bold font-sans text-ink whitespace-nowrap">
                      {formatPrice(order.total)}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="text-ink font-medium block">{order.paymentMethod}</span>
                      <span className={`text-[10px] ${order.paymentStatus === "Paid" ? "text-emerald-700 font-semibold" : "text-amber-700"}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono border capitalize ${statusBadgeStyle(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setShowInvoiceOrder(order)}
                        className="inline-flex items-center gap-1.5 bg-cream border border-line px-3 py-1.5 rounded-lg text-[11px] font-mono hover:bg-paper hover:border-ink transition-colors mr-2"
                        title="Print Invoice"
                      >
                        <Printer size={13} />
                        Invoice
                      </button>
                      <button
                        onClick={() => openOrderDetail(order)}
                        className="inline-flex items-center gap-1 bg-ink text-cream px-3 py-1.5 rounded-lg text-[11px] font-mono hover:bg-ink/90 transition-colors"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 px-4">
            <p className="font-display text-lg text-ink mb-1">No orders found</p>
            <p className="text-xs text-muted">
              Try adjusting your search query or status filter.
            </p>
          </div>
        )}
      </div>

      {/* Order Detail Drawer / Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-paper border border-line text-ink w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Topbar */}
            <div className="bg-cream px-6 sm:px-8 py-5 border-b border-line flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-mono text-base sm:text-lg font-bold text-ink">
                  {selectedOrder.orderNumber}
                </span>
                <span
                  className={`px-3 py-0.5 rounded-full text-xs font-mono border capitalize ${statusBadgeStyle(
                    selectedOrder.status
                  )}`}
                >
                  {selectedOrder.status}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowInvoiceOrder(selectedOrder)}
                  className="inline-flex items-center gap-1.5 bg-paper border border-line px-3 py-1.5 rounded-xl text-xs font-mono uppercase hover:border-ink transition-colors"
                >
                  <Printer size={14} />
                  Print Invoice
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 text-muted hover:text-ink rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
              
              {/* Status Update Bar */}
              <div className="bg-cream p-5 rounded-2xl border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1">
                    Update Order Status
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
                      className="bg-paper border border-line rounded-xl px-4 py-2 text-xs font-medium focus:outline-none focus:border-ink capitalize"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Being Handcrafted (Processing)</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="refunded">Refunded</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Refund action button */}
                <div>
                  {selectedOrder.paymentStatus === "Refunded" ? (
                    <div className="text-rose-700 text-xs font-mono font-medium">
                      ✓ Refund of {formatPrice(selectedOrder.refundAmount || selectedOrder.total)} processed
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowRefundForm(!showRefundForm)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-rose-700 hover:text-rose-900 border border-rose-200 px-3 py-2 rounded-xl bg-rose-50"
                    >
                      <RotateCcw size={13} />
                      Issue Refund
                    </button>
                  )}
                </div>
              </div>

              {/* Refund Form if active */}
              {showRefundForm && (
                <form onSubmit={handleProcessRefund} className="bg-rose-50 border border-rose-200 p-5 rounded-2xl space-y-4">
                  <h4 className="font-display text-sm font-medium text-rose-900">
                    Process Refund for {selectedOrder.orderNumber}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-rose-800 mb-1">
                        Refund Amount (₹)
                      </label>
                      <input
                        type="number"
                        max={selectedOrder.total}
                        min={1}
                        value={refundAmount}
                        onChange={(e) => setRefundAmount(Number(e.target.value))}
                        className="w-full bg-white border border-rose-300 rounded-xl px-3 py-2 text-xs text-ink"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-rose-800 mb-1">
                        Reason for Refund
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Customer cancelled before crafting"
                        value={refundReason}
                        onChange={(e) => setRefundReason(e.target.value)}
                        className="w-full bg-white border border-rose-300 rounded-xl px-3 py-2 text-xs text-ink"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setShowRefundForm(false)}
                      className="px-4 py-2 text-xs font-mono uppercase text-muted hover:text-ink"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-rose-700 text-white px-5 py-2 rounded-xl text-xs font-mono uppercase hover:bg-rose-800"
                    >
                      Confirm Refund
                    </button>
                  </div>
                </form>
              )}

              {/* Courier & Tracking Assignment */}
              <div className="bg-cream p-5 rounded-2xl border border-line space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-muted">
                  <Truck size={15} />
                  <span>Courier & Dispatch Tracking</span>
                </div>
                <form onSubmit={handleSaveTracking} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-muted mb-1">Carrier</label>
                    <select
                      value={carrierInput}
                      onChange={(e) => setCarrierInput(e.target.value)}
                      className="w-full bg-paper border border-line rounded-xl px-3 py-2 text-xs text-ink focus:outline-none"
                    >
                      {carriers.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-muted mb-1">AWB / Tracking Number</label>
                    <input
                      type="text"
                      placeholder="e.g. BD938201948"
                      value={trackingNumberInput}
                      onChange={(e) => setTrackingNumberInput(e.target.value)}
                      className="w-full bg-paper border border-line rounded-xl px-3 py-2 text-xs text-ink focus:outline-none"
                      required
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full bg-ink text-cream py-2 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-ink/90 transition-colors"
                    >
                      {isSavingTracking ? "Saving..." : "Save Tracking"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Customer & Address Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Customer Details */}
                <div className="bg-cream p-5 rounded-2xl border border-line space-y-3">
                  <h4 className="font-display text-base font-medium text-ink flex items-center gap-2">
                    <User size={16} />
                    Customer Information
                  </h4>
                  <div className="text-xs space-y-1.5 text-muted">
                    <p className="text-sm font-semibold text-ink">{selectedOrder.customerName}</p>
                    <p className="flex items-center gap-2">
                      <Mail size={13} /> {selectedOrder.customerEmail}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone size={13} /> {selectedOrder.customerPhone}
                    </p>
                    <div className="pt-2 border-t border-line flex items-center gap-2">
                      <a
                        href={`https://wa.me/${selectedOrder.customerPhone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-mono text-emerald-800 hover:underline flex items-center gap-1"
                      >
                        WhatsApp Customer <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Shipping Destination */}
                <div className="bg-cream p-5 rounded-2xl border border-line space-y-3">
                  <h4 className="font-display text-base font-medium text-ink flex items-center gap-2">
                    <MapPin size={16} />
                    Delivery Destination
                  </h4>
                  <div className="text-xs space-y-1 text-muted">
                    <p className="text-ink leading-relaxed">
                      {selectedOrder.shippingAddress}
                    </p>
                    <p className="font-medium text-ink">
                      {selectedOrder.city}, {selectedOrder.state} - {selectedOrder.pincode}
                    </p>
                    <p className="text-[11px] pt-1">
                      Payment Method: <strong className="text-ink">{selectedOrder.paymentMethod}</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Customization Details if bespoke */}
              {selectedOrder.customizationDetails && (
                <div className="bg-yellow/20 border border-yellow/40 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-ink">
                    <Gift size={16} />
                    <h4 className="font-display text-base font-medium">Bespoke Customization Spec</h4>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-muted block">Occasion</span>
                      <strong className="text-ink">{selectedOrder.customizationDetails.occasion}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-muted block">Size</span>
                      <strong className="text-ink">{selectedOrder.customizationDetails.size}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-muted block">Palette</span>
                      <strong className="text-ink">{selectedOrder.customizationDetails.palette}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-muted block">Recipient</span>
                      <strong className="text-ink italic">{selectedOrder.customizationDetails.recipientName || "None specified"}</strong>
                    </div>
                  </div>

                  {selectedOrder.customizationDetails.giftNote && (
                    <div className="pt-2 border-t border-yellow/30 text-xs">
                      <span className="text-[10px] font-mono uppercase text-muted block">Handwritten Message:</span>
                      <p className="italic text-ink font-serif text-sm mt-0.5">
                        &ldquo;{selectedOrder.customizationDetails.giftNote}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Order Items Table */}
              <div className="space-y-3">
                <h4 className="font-display text-base font-medium text-ink">Items in Order</h4>
                <div className="bg-cream rounded-2xl border border-line divide-y divide-line overflow-hidden">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-line bg-mist shrink-0">
                          <Image src={item.image} alt={item.productName} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-xs sm:text-sm text-ink">{item.productName}</p>
                          {item.variantName && (
                            <p className="text-[11px] text-muted">{item.variantName}</p>
                          )}
                          <p className="text-xs text-muted mt-0.5">
                            Qty: {item.quantity} × {formatPrice(item.price)}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-sm text-ink font-sans">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost Summary */}
              <div className="flex justify-end pt-2">
                <div className="w-64 space-y-2 text-xs">
                  <div className="flex justify-between text-muted">
                    <span>Subtotal:</span>
                    <span>{formatPrice(selectedOrder.subtotal)}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-800">
                      <span>Discount:</span>
                      <span>-{formatPrice(selectedOrder.discount)}</span>
                    </div>
                  )}
                  {selectedOrder.giftWrap > 0 && (
                    <div className="flex justify-between text-muted">
                      <span>Gift Box & Confetti:</span>
                      <span>+{formatPrice(selectedOrder.giftWrap)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted">
                    <span>Shipping:</span>
                    <span>{selectedOrder.shipping === 0 ? "FREE" : formatPrice(selectedOrder.shipping)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-ink pt-2 border-t border-line">
                    <span>Grand Total:</span>
                    <span>{formatPrice(selectedOrder.total)}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {showInvoiceOrder && (
        <AdminInvoiceModal
          order={showInvoiceOrder}
          onClose={() => setShowInvoiceOrder(null)}
        />
      )}

    </div>
  );
}
