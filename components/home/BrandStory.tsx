"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function BrandStory() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sage/20 via-cream to-peach/15">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px] lg:min-h-[560px]">
        {/* Image */}
        <motion.div
          className="h-[320px] lg:h-auto overflow-hidden relative"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="https://images.unsplash.com/photo-1455582916367-25f75bfc6710?auto=format&fit=crop&w=1100&q=85"
            alt="Hands arranging a colorful bouquet"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Decorative overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-sage/10" />
        </motion.div>

        {/* Copy */}
        <motion.div
          className="self-center max-w-[480px] px-[8vw] py-14 lg:py-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 bg-sage/30 text-ink text-[10px] font-medium uppercase tracking-[0.08em] px-3 py-1.5 rounded-full mb-6">
            ✿ Our Story
          </div>

          <h2 className="text-[clamp(30px,4vw,50px)] font-semibold leading-[1.1] tracking-[-0.03em] mb-6">
            For the moments<br />
            you want to <em className="font-display font-medium">keep.</em>
          </h2>

          <p className="text-muted text-[14px] leading-[1.8] max-w-[360px] mb-4">
            We believe the best gifts don&apos;t need a reason. Just a little thought, a little
            color, and a feeling that stays long after the wrapping comes off.
          </p>
          <p className="text-muted text-[14px] leading-[1.8] max-w-[360px]">
            Every BLOOMSOME piece is made slowly, by hand, so it can carry something personal
            from you to them.
          </p>

          <Link
            href="/about"
            className="inline-flex items-center gap-3 bg-ink text-ivory text-[13px] font-medium px-6 py-3.5 rounded-md mt-8 hover:bg-ink/90 transition-colors shadow-md"
          >
            Meet the makers
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
