"use client";

import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { usePublicReviews } from "@/lib/publicContent";
import { defaultReviews } from "@/lib/products";
import { useRef, useState } from "react";

export default function CustomerReviews() {
  const liveReviews = usePublicReviews();
  const displayReviews = (liveReviews.length > 0 ? liveReviews : defaultReviews).slice(0, 6);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  return (
    <section className="px-[5vw] py-14 lg:py-20">
      {/* Heading */}
      <div className="flex items-end justify-between gap-6 mb-8 lg:mb-10">
        <div>
          <div className="inline-flex items-center gap-2 bg-yellow/25 text-ink text-[10px] font-medium uppercase tracking-[0.08em] px-3 py-1.5 rounded-full mb-4">
            ★ Love letters
          </div>
          <h2 className="text-[clamp(24px,3.5vw,36px)] font-semibold leading-[1.15] tracking-[-0.02em]">
            What they&apos;re saying about us
          </h2>
        </div>

        {/* Navigation arrows */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 bg-cream-dark rounded-full flex items-center justify-center hover:bg-line transition-colors"
            aria-label="Previous reviews"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 bg-cream-dark rounded-full flex items-center justify-center hover:bg-line transition-colors"
            aria-label="Next reviews"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Reviews Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
      >
        {displayReviews.map((review, index) => (
          <motion.div
            key={review.id}
            className="snap-start shrink-0 w-[300px] sm:w-[330px] lg:w-[calc(33.333%-14px)] bg-cream-dark rounded-2xl p-7 lg:p-8 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Quote size={20} className="text-sage-deep/50 mb-4 rotate-180" />

            {/* Stars */}
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < review.rating ? "#c9b82e" : "none"}
                  stroke={i < review.rating ? "#c9b82e" : "#ddd"}
                  strokeWidth={1.5}
                />
              ))}
            </div>

            <p className="text-[14px] leading-[1.7] text-muted mb-6">
              &ldquo;{review.text}&rdquo;
            </p>

            <div className="flex items-center gap-3 mt-auto">
              <div className="w-9 h-9 bg-sage/60 rounded-full flex items-center justify-center text-[12px] font-semibold text-ink">
                {review.userName.charAt(0)}
              </div>
              <div>
                <p className="text-[13px] font-semibold">{review.userName}</p>
                {review.isVerified && (
                  <p className="text-[10px] text-sage-deep uppercase tracking-wide flex items-center gap-1">
                    ✓ Verified purchase
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {displayReviews.length === 0 && (
        <p className="text-center text-sm text-muted py-10">
          Customer reviews will appear here after approved purchases.
        </p>
      )}
    </section>
  );
}
