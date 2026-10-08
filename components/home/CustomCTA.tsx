"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CustomCTA() {
  return (
    <section className="bg-peach grid grid-cols-1 lg:grid-cols-2 items-center min-h-[480px] lg:min-h-[545px] px-[8vw] lg:px-[12vw] py-16 lg:py-[70px] gap-12 lg:gap-0">
      {/* Copy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-muted text-[11px] uppercase tracking-[0.12em] mb-5">
          Make it yours
        </p>
        <h2 className="text-[clamp(36px,4.5vw,65px)] font-medium leading-[0.95] tracking-[-0.04em] mb-6">
          A bouquet with<br />
          <em className="font-display font-medium">your story in it.</em>
        </h2>
        <p className="text-[#665e55] leading-[1.7] max-w-[300px]">
          Choose the colors, flowers and words that feel like them. We&apos;ll make the rest
          with care.
        </p>
        <Link
          href="/custom"
          className="inline-flex items-center gap-5 bg-ink text-ivory text-[12px] tracking-[0.04em] px-5 py-[15px] mt-6 hover:bg-ink/90 transition-colors"
        >
          Build a custom gift
          <ArrowRight size={16} />
        </Link>
      </motion.div>

      {/* Art */}
      <motion.div
        className="relative h-[300px] lg:h-[360px] w-full max-w-[380px] ml-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <span className="absolute -right-5 -top-5 flex items-center justify-center w-[87px] h-[87px] bg-yellow rounded-full font-display text-[17px] italic leading-tight text-center rotate-[8deg] z-[1]">
          you + me<br />always
        </span>
        <img
          src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=85"
          alt="A thoughtful gift wrapped with ribbon"
          className="w-full h-full object-cover saturate-[0.8]"
          loading="lazy"
        />
      </motion.div>
    </section>
  );
}
