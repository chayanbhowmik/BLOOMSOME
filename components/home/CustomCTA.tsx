"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CustomCTA() {
  return (
    <section className="mx-[5vw] my-10 lg:my-16 rounded-3xl overflow-hidden bg-gradient-to-br from-peach via-peach/80 to-coral/60 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[400px] lg:min-h-[480px] px-[8vw] lg:px-[6vw] py-14 lg:py-0 gap-10 lg:gap-0">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-ivory/60 backdrop-blur-sm text-ink text-[10px] font-medium uppercase tracking-[0.08em] px-3 py-1.5 rounded-full mb-6">
            ✦ Make it yours
          </div>

          <h2 className="text-[clamp(30px,4.5vw,54px)] font-semibold leading-[1.05] tracking-[-0.03em] mb-5">
            A bouquet with<br />
            <em className="font-display font-medium">your story in it.</em>
          </h2>

          <p className="text-[#665e55] text-[14px] leading-[1.7] max-w-[320px] mb-6">
            Choose the colors, flowers and words that feel like them. We&apos;ll make the rest
            with care.
          </p>

          <Link
            href="/custom"
            className="inline-flex items-center gap-3 bg-ink text-ivory text-[13px] font-medium px-7 py-3.5 rounded-md hover:bg-ink/90 transition-colors shadow-md"
          >
            Build a custom gift
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Art */}
        <motion.div
          className="relative h-[280px] lg:h-[380px] w-full max-w-[400px] ml-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <motion.span
            className="absolute -right-3 -top-3 lg:-right-5 lg:-top-5 flex items-center justify-center w-[80px] h-[80px] lg:w-[90px] lg:h-[90px] bg-yellow/90 backdrop-blur-sm rounded-full font-display text-[15px] lg:text-[16px] italic leading-tight text-center rotate-[8deg] z-10 shadow-lg"
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            you + me
            <br />
            always
          </motion.span>
          <img
            src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=85"
            alt="A thoughtful gift wrapped with ribbon"
            className="w-full h-full object-cover rounded-2xl shadow-xl"
            loading="lazy"
          />
        </motion.div>
      </div>

      {/* Decorative circles */}
      <div className="absolute -bottom-20 -left-20 w-[200px] h-[200px] bg-yellow/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-10 -right-10 w-[150px] h-[150px] bg-ivory/20 rounded-full blur-2xl pointer-events-none" />
    </section>
  );
}
