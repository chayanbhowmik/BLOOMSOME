"use client";

import React from "react";
import Image from "next/image";
import { Printer, X, Download } from "lucide-react";
import type { AdminOrder } from "@/lib/adminTypes";
import { formatPrice } from "@/lib/utils";

interface Props {
  order: AdminOrder;
  onClose: () => void;
}

export default function AdminInvoiceModal({ order, onClose }: Props) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white text-ink w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto border border-line animate-in fade-in zoom-in-95 duration-200">
        
        {/* Controls Bar */}
        <div className="bg-cream px-6 py-4 border-b border-line flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-xs font-mono text-muted">
            <span>INVOICE #{order.orderNumber}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-ink text-cream text-xs font-mono uppercase px-4 py-2 rounded-lg hover:bg-ink/90 transition-colors shadow-sm"
            >
              <Printer size={14} />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-muted hover:text-ink rounded-lg hover:bg-paper transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Invoice Area */}
        <div className="p-8 sm:p-12 space-y-8 bg-white text-neutral-900" id="printable-invoice">
          
          {/* Header */}
          <div className="flex items-start justify-between border-b pb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Image
                  src="/logo.png"
                  alt="BLOOMSOME"
                  width={140}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </div>
              <p className="text-xs text-neutral-500 font-sans">
                BLOOMSOME Handicrafts Pvt. Ltd.<br />
                Artisan Studio & Floral Atelier<br />
                GSTIN: 29AABCB1234F1Z5<br />
                hello@bloomsome.store • bloomsome.store
              </p>
            </div>

            <div className="text-right">
              <span className="text-2xl font-light font-display text-neutral-900 block tracking-tight">
                TAX INVOICE
              </span>
              <p className="text-xs font-mono text-neutral-500 mt-1">
                Invoice No: <strong className="text-neutral-900">INV-{order.orderNumber}</strong><br />
                Order Date: {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}<br />
                Payment: <strong className="text-emerald-700">{order.paymentMethod} ({order.paymentStatus})</strong>
              </p>
            </div>
          </div>

          {/* Customer & Shipping Details */}
          <div className="grid grid-cols-2 gap-8 text-xs">
            <div>
              <span className="font-mono uppercase text-neutral-400 font-medium block mb-1">
                Billed / Shipped To:
              </span>
              <p className="font-semibold text-neutral-900 text-sm">{order.customerName}</p>
              <p className="text-neutral-600 mt-1 leading-relaxed">
                {order.shippingAddress}<br />
                {order.city}, {order.state} - {order.pincode}<br />
                Phone: {order.customerPhone}<br />
                Email: {order.customerEmail}
              </p>
            </div>

            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200">
              <span className="font-mono uppercase text-neutral-400 font-medium block mb-1">
                Fulfillment & Tracking:
              </span>
              <p className="text-neutral-700">
                Status: <strong className="capitalize text-neutral-900">{order.status}</strong><br />
                Carrier: {order.carrier || "Standard Express"}<br />
                Tracking AWB: <span className="font-mono">{order.trackingNumber || "Assigned upon dispatch"}</span>
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-neutral-900 font-mono text-neutral-500 uppercase">
                  <th className="py-2.5">Item Description</th>
                  <th className="py-2.5 text-center">Qty</th>
                  <th className="py-2.5 text-right">Unit Price</th>
                  <th className="py-2.5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3">
                      <strong className="text-neutral-900 block font-medium">{item.productName}</strong>
                      {item.variantName && (
                        <span className="text-[11px] text-neutral-500">{item.variantName}</span>
                      )}
                    </td>
                    <td className="py-3 text-center text-neutral-700">{item.quantity}</td>
                    <td className="py-3 text-right text-neutral-700">{formatPrice(item.price)}</td>
                    <td className="py-3 text-right font-medium text-neutral-900">
                      {formatPrice(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Subtotal & Summary */}
          <div className="flex justify-end pt-4 border-t border-neutral-200">
            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal:</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount Applied:</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              {order.giftWrap > 0 && (
                <div className="flex justify-between text-neutral-600">
                  <span>Gift Box & Card:</span>
                  <span>+{formatPrice(order.giftWrap)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600">
                <span>Shipping:</span>
                <span>{order.shipping === 0 ? "FREE" : formatPrice(order.shipping)}</span>
              </div>
              <div className="flex justify-between border-t-2 border-neutral-900 pt-2 font-bold text-sm text-neutral-900">
                <span>Total Amount:</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Custom Gift Note if present */}
          {order.customizationDetails?.giftNote && (
            <div className="border border-neutral-200 bg-neutral-50 p-4 rounded-xl text-xs space-y-1">
              <span className="font-mono text-neutral-400 uppercase block font-medium">
                Handwritten Calligraphy Message Card:
              </span>
              <p className="italic text-neutral-800 text-sm font-serif">
                &ldquo;{order.customizationDetails.giftNote}&rdquo;
              </p>
            </div>
          )}

          {/* Footer note */}
          <div className="border-t pt-6 text-center text-[10px] text-neutral-400 space-y-1">
            <p>Thank you for supporting artisan handcrafted blooms! Every flower is shaped by human hands to last forever.</p>
            <p>For inquiries regarding this order, contact support@bloomsome.store or WhatsApp +91 99999 99999</p>
          </div>

        </div>
      </div>
    </div>
  );
}
