import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy — BLOOMSOME",
  description: "Information regarding processing times, packaging, and shipping across India.",
};

export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen bg-cream px-[5vw] py-16 max-w-4xl mx-auto text-ink">
      <span className="text-[11px] font-mono tracking-[0.2em] text-muted uppercase block mb-3">
        Customer Care
      </span>
      <h1 className="font-display text-4xl sm:text-5xl font-light mb-8">
        Shipping & Delivery Policy
      </h1>

      <div className="bg-paper border border-line rounded-2xl p-8 sm:p-12 space-y-6 text-sm leading-relaxed text-muted">
        <div>
          <h2 className="font-display text-xl text-ink font-medium mb-2">1. Handcrafting & Dispatch Time</h2>
          <p>
            Because all BLOOMSOME flowers and bouquets are meticulously handmade by our artisans, ready-to-ship designs are dispatched within 1–2 business days. Custom-made commissions and bespoke color orders require 3–5 business days to craft before dispatch.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-ink font-medium mb-2">2. Delivery Timeframes</h2>
          <p>
            Once handed over to our courier partners (BlueDart, Delhivery, Expressbees), delivery typically takes:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Metro Cities (Delhi, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata): 2–4 business days</li>
            <li>Rest of India: 4–7 business days</li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-xl text-ink font-medium mb-2">3. Shipping Rates</h2>
          <p>
            We offer <strong>FREE standard delivery</strong> on all prepaid orders above ₹1,499. For orders below this threshold, a flat nominal shipping fee of ₹99 applies nationwide.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-ink font-medium mb-2">4. Packaging & Fragile Handling</h2>
          <p>
            Every bouquet is secured in custom rigid cardboard boxes, wrapped with protective foam and tissue paper to ensure stems and delicate petals remain in pristine condition during transit.
          </p>
        </div>
      </div>
    </main>
  );
}
