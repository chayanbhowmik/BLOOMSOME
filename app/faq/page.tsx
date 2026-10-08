"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, MessageCircle, Mail, HelpCircle } from "lucide-react";
import { usePublicFaqs } from "@/lib/publicContent";

const categories = ["All", "Product", "Customization", "Orders", "Shipping", "Payment", "Returns"];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const faqs = usePublicFaqs();
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "All" || faq.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <section className="border-b border-line px-[5vw] py-16 lg:py-20 text-center max-w-4xl mx-auto">
        <span className="inline-block text-[11px] font-mono tracking-[0.25em] text-muted uppercase mb-3">
          Help & Knowledge
        </span>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-ink tracking-tight mb-6">
          Frequently Asked <span className="italic font-serif">Questions</span>
        </h1>
        <p className="text-muted text-base max-w-xl mx-auto mb-8">
          Find quick answers about our handmade flowers, custom orders, shipping times, and care tips.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search keywords (e.g. shipping, care, return)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-paper border border-line rounded-full py-3.5 pl-12 pr-6 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-ink shadow-xs"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
        </div>
      </section>

      {/* Main FAQ Container */}
      <section className="px-[5vw] py-12 lg:py-16 max-w-4xl mx-auto">
        {/* Category Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all whitespace-nowrap ${
                  isSelected
                    ? "bg-ink text-cream"
                    : "bg-paper border border-line text-muted hover:text-ink hover:border-ink/40"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-paper border border-line rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-medium text-ink hover:text-ink/80 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-base sm:text-lg">{faq.question}</span>
                    <ChevronDown
                      size={18}
                      className={`text-muted shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-0 text-muted text-sm sm:text-base leading-relaxed border-t border-line/40">
                          <p className="mt-4">{faq.answer}</p>
                          <span className="inline-block mt-4 text-[10px] font-mono uppercase tracking-widest text-muted/70 bg-cream px-2 py-0.5 rounded border border-line">
                            {faq.category}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-paper border border-line rounded-2xl">
              <HelpCircle size={32} className="mx-auto text-muted mb-3" />
              <p className="font-display text-lg mb-1">No matching questions found</p>
              <p className="text-xs text-muted mb-4">
                Try searching for a different keyword or browse by category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="text-xs font-mono uppercase tracking-wider underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Still Need Help Box */}
        <div className="mt-16 bg-sage/20 border border-sage/40 rounded-2xl p-8 text-center sm:text-left sm:flex items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl text-ink font-normal mb-1">
              Have a specific question not listed here?
            </h3>
            <p className="text-xs sm:text-sm text-muted">
              Our support team and master florists reply within a few hours.
            </p>
          </div>
          <div className="mt-6 sm:mt-0 flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-ink text-cream text-xs font-mono uppercase px-5 py-3 rounded-full hover:bg-ink/90 transition-colors"
            >
              <MessageCircle size={15} />
              WhatsApp Us
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-paper border border-line text-ink text-xs font-mono uppercase px-5 py-3 rounded-full hover:border-ink transition-colors"
            >
              <Mail size={15} />
              Email Form
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
