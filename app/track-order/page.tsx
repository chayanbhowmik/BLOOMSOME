"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  HelpCircle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

// Mock orders database for tracking lookup
const sampleOrders: Record<
  string,
  {
    orderNumber: string;
    customerName: string;
    createdAt: string;
    status: string;
    currentStepIndex: number;
    carrier: string;
    trackingNumber: string;
    estimatedDelivery: string;
    destination: string;
    items: { name: string; variant: string; price: number; quantity: number; image: string }[];
    subtotal: number;
    shipping: number;
    total: number;
  }
> = {
  "BLM-84920": {
    orderNumber: "BLM-84920",
    customerName: "Riya S.",
    createdAt: "2026-10-06",
    status: "Being Handcrafted",
    currentStepIndex: 1,
    carrier: "BlueDart Express",
    trackingNumber: "BD938201948",
    estimatedDelivery: "October 11, 2026",
    destination: "Indiranagar, Bengaluru, Karnataka - 560038",
    items: [
      {
        name: "Everlasting Sunflower Bouquet",
        variant: "Medium (9 stems) / Sunshine Yellow",
        price: 1299,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=400&q=85",
      },
      {
        name: "Sunflower Bag Charm & Keychain",
        variant: "Mini Stem / Antique Brass Clasp",
        price: 349,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=400&q=85",
      },
    ],
    subtotal: 1648,
    shipping: 0,
    total: 1648,
  },
  "BLM-10293": {
    orderNumber: "BLM-10293",
    customerName: "Aditya K.",
    createdAt: "2026-10-04",
    status: "Out for Delivery",
    currentStepIndex: 3,
    carrier: "Delhivery Logistics",
    trackingNumber: "DLH7729104",
    estimatedDelivery: "Today by 6:00 PM",
    destination: "Bandra West, Mumbai, Maharashtra - 400050",
    items: [
      {
        name: "Forever Red Rose Posy",
        variant: "Single Stem Gift Box",
        price: 799,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=400&q=85",
      },
    ],
    subtotal: 799,
    shipping: 99,
    total: 898,
  },
};

const timelineSteps = [
  { title: "Order Confirmed", desc: "Payment received & pattern assigned" },
  { title: "Being Handcrafted", desc: "Artisan bending wires & shaping petals" },
  { title: "Packed with Care", desc: "Wax-sealed card, dried confetti & boxed" },
  { title: "Dispatched / On the Way", desc: "Handed over to courier partner" },
  { title: "Delivered", desc: "Arrived at destination" },
];

export default function TrackOrderPage() {
  const [orderQuery, setOrderQuery] = useState("BLM-84920");
  const [activeOrder, setActiveOrder] = useState<typeof sampleOrders[string] | null>(
    sampleOrders["BLM-84920"]
  );
  const [searched, setSearched] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = orderQuery.trim().toUpperCase();
    if (sampleOrders[cleanId]) {
      setActiveOrder(sampleOrders[cleanId]);
      setHasError(false);
    } else {
      setActiveOrder(null);
      setHasError(true);
    }
    setSearched(true);
  };

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <section className="border-b border-line px-[5vw] py-14 lg:py-20 text-center max-w-4xl mx-auto">
        <span className="inline-block text-[11px] font-mono tracking-[0.25em] text-muted uppercase mb-3">
          Real-Time Tracking
        </span>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-ink tracking-tight mb-6">
          Track Your <span className="italic font-serif">Blooms</span>
        </h1>
        <p className="text-muted text-base max-w-xl mx-auto mb-8">
          Enter your BLOOMSOME order number to track crafting progress and courier delivery.
        </p>

        {/* Tracking Search Input */}
        <form onSubmit={handleTrack} className="max-w-md mx-auto">
          <div className="flex gap-2 bg-paper p-1.5 rounded-full border border-line shadow-xs">
            <input
              type="text"
              placeholder="e.g. BLM-84920"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              className="flex-1 bg-transparent px-4 py-2 text-sm text-ink uppercase focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-ink text-cream px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider hover:bg-ink/90 transition-colors shrink-0"
            >
              Track Order
            </button>
          </div>
          <div className="mt-3 text-[11px] font-mono text-muted flex items-center justify-center gap-2">
            <span>Try sample orders:</span>
            <button
              type="button"
              onClick={() => {
                setOrderQuery("BLM-84920");
                setActiveOrder(sampleOrders["BLM-84920"]);
                setHasError(false);
              }}
              className="underline hover:text-ink"
            >
              BLM-84920
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                setOrderQuery("BLM-10293");
                setActiveOrder(sampleOrders["BLM-10293"]);
                setHasError(false);
              }}
              className="underline hover:text-ink"
            >
              BLM-10293
            </button>
          </div>
        </form>
      </section>

      {/* Results Container */}
      <section className="px-[5vw] py-12 max-w-5xl mx-auto">
        {hasError && (
          <div className="bg-paper border border-line rounded-2xl p-10 text-center max-w-md mx-auto">
            <HelpCircle size={32} className="mx-auto text-muted mb-3" />
            <h3 className="font-display text-lg font-medium mb-1">Order Not Found</h3>
            <p className="text-xs text-muted mb-4">
              We couldn&apos;t find an order matching &ldquo;{orderQuery}&rdquo;. Please double check your order confirmation email or contact our desk.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center text-xs font-mono uppercase tracking-wider underline text-ink"
            >
              Contact Support
            </Link>
          </div>
        )}

        {activeOrder && (
          <div className="space-y-8">
            
            {/* Status Header Banner */}
            <div className="bg-paper border border-line rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-sm font-semibold text-ink">
                    {activeOrder.orderNumber}
                  </span>
                  <span className="bg-yellow/40 border border-yellow/60 text-ink text-[11px] font-mono px-2.5 py-0.5 rounded-full font-medium">
                    {activeOrder.status}
                  </span>
                </div>
                <p className="text-xs text-muted">
                  Ordered on {activeOrder.createdAt} • Recipient: {activeOrder.customerName}
                </p>
              </div>

              <div className="text-left sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-line w-full sm:w-auto">
                <span className="text-[11px] font-mono uppercase text-muted block">
                  Estimated Delivery
                </span>
                <span className="font-display text-lg font-semibold text-ink">
                  {activeOrder.estimatedDelivery}
                </span>
              </div>
            </div>

            {/* Visual Timeline */}
            <div className="bg-paper border border-line rounded-2xl p-6 sm:p-8 shadow-sm">
              <h3 className="font-display text-lg font-medium text-ink mb-6">
                Crafting & Delivery Timeline
              </h3>

              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-[11px] sm:before:left-[15px] before:top-3 before:bottom-3 before:w-[2px] before:bg-line">
                {timelineSteps.map((step, idx) => {
                  const isCompleted = idx <= activeOrder.currentStepIndex;
                  const isCurrent = idx === activeOrder.currentStepIndex;

                  return (
                    <div key={idx} className="relative flex items-start gap-4">
                      {/* Status Dot */}
                      <span
                        className={`absolute -left-[19px] sm:-left-[23px] top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] transition-colors ${
                          isCompleted
                            ? "bg-ink border-ink text-cream"
                            : "bg-paper border-line text-transparent"
                        }`}
                      >
                        {isCompleted && "✓"}
                      </span>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-medium ${
                              isCurrent
                                ? "text-ink font-semibold"
                                : isCompleted
                                ? "text-ink"
                                : "text-muted"
                            }`}
                          >
                            {step.title}
                          </span>
                          {isCurrent && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-sage/40 text-ink px-2 py-0.5 rounded-full">
                              <Sparkles size={11} /> In Progress
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {activeOrder.trackingNumber && (
                <div className="mt-8 pt-6 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-muted">
                    <Truck size={16} />
                    <span>Carrier: <strong className="text-ink">{activeOrder.carrier}</strong></span>
                    <span>•</span>
                    <span>AWB: <strong className="text-ink font-mono">{activeOrder.trackingNumber}</strong></span>
                  </div>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center gap-1 font-mono uppercase tracking-wider text-ink hover:underline text-[11px]"
                  >
                    <span>Courier Portal</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </div>

            {/* Order Items & Summary */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-7 bg-paper border border-line rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="font-display text-base font-medium text-ink">
                  Items in this package
                </h3>
                <div className="space-y-4">
                  {activeOrder.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-line bg-mist shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-medium text-ink truncate">{item.name}</h4>
                        <p className="text-[11px] text-muted truncate">{item.variant}</p>
                        <span className="text-xs font-semibold text-ink mt-0.5 block">
                          Qty: {item.quantity} × {formatPrice(item.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-5 bg-paper border border-line rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="font-display text-base font-medium text-ink">
                  Delivery Details
                </h3>
                <div className="text-xs text-muted space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin size={15} className="text-ink shrink-0 mt-0.5" />
                    <span>{activeOrder.destination}</span>
                  </div>
                </div>

                <div className="border-t border-line pt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-muted">
                    <span>Subtotal</span>
                    <span>{formatPrice(activeOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Shipping</span>
                    <span>{activeOrder.shipping === 0 ? "FREE" : formatPrice(activeOrder.shipping)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-ink text-sm pt-2 border-t border-line">
                    <span>Total Paid</span>
                    <span>{formatPrice(activeOrder.total)}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </section>
    </main>
  );
}
