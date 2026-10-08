"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function BrandStory() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[640px]">
      {/* Image */}
      <motion.div
        className="h-[350px] lg:h-auto overflow-hidden"
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
      </motion.div>

      {/* Copy */}
      <motion.div
        className="self-center max-w-[480px] px-[8vw] py-16 lg:py-[70px]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p className="text-muted text-[11px] uppercase tracking-[0.12em] mb-5">
          A little more feeling
        </p>
        <h2 className="text-[clamp(36px,4.5vw,65px)] font-medium leading-[0.95] tracking-[-0.04em] mb-7">
          For the moments<br />
          you want to <em className="font-display font-medium">keep.</em>
        </h2>
        <p className="text-muted text-[15px] leading-[1.75] max-w-[360px] mb-4">
          We believe the best gifts don&apos;t need a reason. Just a little thought, a little
          color, and a feeling that stays long after the wrapping comes off.
        </p>
        <p className="text-muted text-[15px] leading-[1.75] max-w-[360px]">
          Every BLOOMSOME piece is made slowly, by hand, so it can carry something personal
          from you to them.
        </p>
        <Link
          href="/about"
          className="inline-flex items-center gap-5 border border-ink text-[12px] tracking-[0.04em] px-5 py-[15px] mt-8 hover:bg-ink hover:text-ivory transition-colors"
        >
          Meet the makers
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </section>
  );
}
