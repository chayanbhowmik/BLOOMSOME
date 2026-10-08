import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — BLOOMSOME",
  description: "How BLOOMSOME collects, protects, and respects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-cream px-[5vw] py-16 max-w-4xl mx-auto text-ink">
      <span className="text-[11px] font-mono tracking-[0.2em] text-muted uppercase block mb-3">
        Legal
      </span>
      <h1 className="font-display text-4xl sm:text-5xl font-light mb-8">
        Privacy Policy
      </h1>

      <div className="bg-paper border border-line rounded-2xl p-8 sm:p-12 space-y-6 text-sm leading-relaxed text-muted">
        <div>
          <h2 className="font-display text-xl text-ink font-medium mb-2">1. Information We Collect</h2>
          <p>
            When you purchase from bloomsome.store or interact with our custom gift builders, we collect necessary transaction details including your name, shipping address, contact phone number, email address, and custom recipient messages.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-ink font-medium mb-2">2. How We Use Your Data</h2>
          <p>
            We use your data solely to fulfill your handcrafted orders, communicate tracking updates, process payments securely, and send newsletter drops if opted in. We never sell or rent your personal data to third parties.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-ink font-medium mb-2">3. Payment Security</h2>
          <p>
            All online transactions are encrypted via 256-bit SSL technology. BLOOMSOME does not store credit card or CVV details on our servers.
          </p>
        </div>
      </div>
    </main>
  );
}
