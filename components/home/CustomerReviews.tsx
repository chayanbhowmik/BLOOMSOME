"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { usePublicReviews } from "@/lib/publicContent";

export default function CustomerReviews() {
  const displayReviews = usePublicReviews().slice(0, 3);

  return (
    <section className="px-[5vw] py-20 lg:py-28">
      {/* Heading */}
      <div className="text-center mb-12 lg:mb-16">
        <p className="text-muted text-[11px] uppercase tracking-[0.12em] mb-5">
          Love letters
        </p>
        <h2 className="text-[clamp(36px,4.5vw,65px)] font-medium leading-[0.95] tracking-[-0.04em]">
          What they&apos;re<br />
          <em className="font-display font-medium">saying about us.</em>
        </h2>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {displayReviews.map((review, index) => (
          <motion.div
            key={review.id}
            className="border border-line p-7 lg:p-8 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <Quote size={20} className="text-sage-deep mb-4 rotate-180" />

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

            <p className="text-[14px] leading-[1.7] text-muted mb-5">
              &ldquo;{review.text}&rdquo;
            </p>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-sage rounded-full flex items-center justify-center text-[11px] font-semibold text-ink">
                {review.userName.charAt(0)}
              </div>
              <div>
                <p className="text-[13px] font-medium">{review.userName}</p>
                {review.isVerified && (
                  <p className="text-[10px] text-muted uppercase tracking-wide">Verified purchase</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {displayReviews.length === 0 && <p className="text-center text-sm text-muted">Customer reviews will appear here after approved purchases.</p>}
    </section>
  );
}
