"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MessageCircle, MapPin, Clock, Send, CheckCircle2, Sparkles } from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Order Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <section className="border-b border-line px-[5vw] py-16 lg:py-20 text-center max-w-4xl mx-auto">
        <span className="inline-block text-[11px] font-mono tracking-[0.25em] text-muted uppercase mb-3">
          Get in Touch
        </span>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-ink tracking-tight mb-6">
          We&apos;d Love to <span className="italic font-serif">Hear</span> From You
        </h1>
        <p className="text-muted text-base max-w-xl mx-auto">
          Have a question about an order, custom commission, bulk gifting, or just want to say hi? Send us a note below.
        </p>
      </section>

      {/* Main Grid */}
      <section className="px-[5vw] py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details & Info (Left 5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-paper border border-line rounded-2xl p-8 space-y-6">
              <h2 className="font-display text-2xl text-ink font-normal">
                Direct Channels
              </h2>
              <p className="text-sm text-muted">
                Need immediate assistance? Reach out directly to our artisan desk.
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-line bg-cream hover:border-ink/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-paper border border-line flex items-center justify-center text-ink">
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <span className="block text-xs font-mono uppercase text-muted">WhatsApp Support</span>
                    <span className="font-medium text-sm text-ink">+91 99999 99999</span>
                  </div>
                </a>

                <a
                  href="mailto:hello@bloomsome.store"
                  className="flex items-center gap-4 p-4 rounded-xl border border-line bg-cream hover:border-ink/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-paper border border-line flex items-center justify-center text-ink">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="block text-xs font-mono uppercase text-muted">Email Inquiries</span>
                    <span className="font-medium text-sm text-ink">hello@bloomsome.store</span>
                  </div>
                </a>

                <a
                  href="https://instagram.com/bloomsome.store"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-line bg-cream hover:border-ink/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-paper border border-line flex items-center justify-center text-ink">
                    <InstagramIcon size={18} />
                  </div>
                  <div>
                    <span className="block text-xs font-mono uppercase text-muted">Instagram Community</span>
                    <span className="font-medium text-sm text-ink">@bloomsome.store</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Studio Hours */}
            <div className="bg-paper border border-line rounded-2xl p-8 space-y-4">
              <div className="flex items-center gap-3 text-ink">
                <Clock size={18} />
                <h3 className="font-display text-lg font-medium">Studio & Support Hours</h3>
              </div>
              <div className="text-sm text-muted space-y-1.5 pt-1">
                <p className="flex justify-between">
                  <span>Monday – Saturday:</span>
                  <span className="font-medium text-ink">10:00 AM – 7:00 PM IST</span>
                </p>
                <p className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-medium text-ink">Artisan Studio Rest Day</span>
                </p>
                <p className="text-xs text-muted pt-3 border-t border-line">
                  * Online orders and tracking inquiries are accepted 24/7.
                </p>
              </div>
            </div>
          </div>

          {/* Form (Right 7 cols) */}
          <div className="lg:col-span-7 bg-paper border border-line rounded-2xl p-8 sm:p-10">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-14 h-14 bg-sage/30 border border-sage/60 rounded-full flex items-center justify-center mx-auto text-emerald-800">
                  <CheckCircle2 size={28} />
                </div>
                <h2 className="font-display text-2xl text-ink font-light">
                  Thank You for Reaching Out!
                </h2>
                <p className="text-sm text-muted max-w-md mx-auto">
                  We have received your message. One of our florists will get back to you at <span className="font-medium text-ink">{formData.email}</span> within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", subject: "Order Inquiry", message: "" });
                  }}
                  className="mt-4 inline-flex items-center text-xs font-mono uppercase tracking-wider underline text-ink"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl text-ink font-normal mb-1">
                    Send a Message
                  </h2>
                  <p className="text-xs text-muted">
                    Fill out the form below and we will respond promptly.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Verma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-cream border border-line rounded-xl px-4 py-3 text-sm text-ink focus:outline-none focus:border-ink"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="maya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-cream border border-line rounded-xl px-4 py-3 text-sm text-ink focus:outline-none focus:border-ink"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-cream border border-line rounded-xl px-4 py-3 text-sm text-ink focus:outline-none focus:border-ink"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
                      Topic / Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-cream border border-line rounded-xl px-4 py-3 text-sm text-ink focus:outline-none focus:border-ink"
                    >
                      <option value="Order Inquiry">Order Status / Tracking</option>
                      <option value="Custom Commission">Custom Bouquet Request</option>
                      <option value="Bulk Gifting">Bulk / Corporate Gifting</option>
                      <option value="Collaboration">Collaboration / Press</option>
                      <option value="Feedback">Feedback & Suggestions</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us what you have in mind or provide your order ID..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-cream border border-line rounded-xl p-4 text-sm text-ink focus:outline-none focus:border-ink resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-ink text-cream py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-ink/90 transition-colors shadow-sm"
                >
                  <Send size={14} />
                  Send Message
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Corporate & Bulk Gifting Banner */}
      <section className="border-t border-line bg-mist/50 px-[5vw] py-16 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-yellow/40 border border-yellow/60 px-3.5 py-1.5 rounded-full text-xs font-mono text-ink">
            <Sparkles size={14} />
            <span>Corporate & Weddings</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-ink font-light">
            Planning Bulk Gifts or Wedding Favors?
          </h2>
          <p className="text-muted text-sm sm:text-base">
            We curate bespoke packaging, custom tag branding, and volume pricing for corporate hampers, events, and wedding return gifts.
          </p>
          <div className="pt-2">
            <a
              href="mailto:hello@bloomsome.store?subject=Bulk Gifting Inquiry"
              className="inline-flex items-center gap-2 bg-ink text-cream px-8 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider hover:bg-ink/90"
            >
              Request Bulk Catalog
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
