import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — BLOOMSOME",
  description: "Terms of service and usage conditions for bloomsome.store.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-cream px-[5vw] py-16 max-w-4xl mx-auto text-ink">
      <span className="text-[11px] font-mono tracking-[0.2em] text-muted uppercase block mb-3">
        Legal
      </span>
      <h1 className="font-display text-4xl sm:text-5xl font-light mb-8">
        Terms of Service
      </h1>

      <div className="bg-paper border border-line rounded-2xl p-8 sm:p-12 space-y-6 text-sm leading-relaxed text-muted">
        <div>
          <h2 className="font-display text-xl text-ink font-medium mb-2">1. Handmade Nature & Variations</h2>
          <p>
            Because every single flower, stem, and bouquet is individually shaped by human hands, slight variations in petal curvature, dimensions (±1-2cm), and color tone are natural characteristics of artisan craft that make each piece uniquely one-of-a-kind.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-ink font-medium mb-2">2. Pricing & Orders</h2>
          <p>
            All listed prices are in Indian Rupees (INR) and inclusive of applicable GST taxes. We reserve the right to modify prices or discontinue products without prior notice.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-ink font-medium mb-2">3. Intellectual Property</h2>
          <p>
            The BLOOMSOME brand, photography, product designs, slogans, and website content are the intellectual property of BLOOMSOME. Unauthorized reproduction or commercial use is strictly prohibited.
          </p>
        </div>
      </div>
    </main>
  );
}
