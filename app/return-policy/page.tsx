import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Refund Policy — BLOOMSOME",
  description: "Our policies regarding returns, exchanges, cancellations, and damaged item replacements.",
};

export default function ReturnPolicyPage() {
  return (
    <main className="min-h-screen bg-cream px-[5vw] py-16 max-w-4xl mx-auto text-ink">
      <span className="text-[11px] font-mono tracking-[0.2em] text-muted uppercase block mb-3">
        Customer Care
      </span>
      <h1 className="font-display text-4xl sm:text-5xl font-light mb-8">
        Return & Refund Policy
      </h1>

      <div className="bg-paper border border-line rounded-2xl p-8 sm:p-12 space-y-6 text-sm leading-relaxed text-muted">
        <div>
          <h2 className="font-display text-xl text-ink font-medium mb-2">1. 7-Day Return Window</h2>
          <p>
            We take pride in every petal we create. If you are not completely enchanted by your non-customized product, you may initiate a return within 7 calendar days of delivery.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-ink font-medium mb-2">2. Custom & Personalized Items</h2>
          <p>
            Because custom bouquets and personalized name cards are uniquely crafted according to individual instructions, they cannot be returned or refunded unless there is transit damage or a manufacturing defect.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-ink font-medium mb-2">3. Transit Damage & Replacements</h2>
          <p>
            If your package arrives damaged, please take a quick photo or unboxing video and WhatsApp us at <strong>+91 99999 99999</strong> or email <strong>hello@bloomsome.store</strong> within 48 hours. We will promptly ship a brand new replacement free of charge.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-ink font-medium mb-2">4. Refund Processing</h2>
          <p>
            Approved refunds are credited back to your original payment method within 5–7 business days of receiving the returned item at our studio.
          </p>
        </div>
      </div>
    </main>
  );
}
