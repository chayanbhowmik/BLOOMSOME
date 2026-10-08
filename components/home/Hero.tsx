"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[0.93fr_1.07fr] min-h-[520px] lg:min-h-[620px] px-[5vw] py-14 lg:py-[62px]">
      {/* Copy */}
      <motion.div
        className="self-center pr-4 lg:px-[3vw]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <p className="flex items-center gap-2 text-muted text-[11px] uppercase tracking-[0.12em] mb-5 lg:mb-6">
          <Sparkles size={14} className="text-[#b5b526]" />
          Flowers that stay
        </p>

        <h1 className="text-[clamp(44px,6.5vw,94px)] font-medium leading-[0.92] tracking-[-0.04em] mb-6 lg:mb-7">
          Little blooms,<br />
          <em className="font-display font-medium">big feelings.</em>
        </h1>

        <p className="text-muted text-base leading-relaxed max-w-[300px]">
          Handmade flowers and thoughtful little gifts, made to last.
        </p>

        <div className="flex items-center gap-6 mt-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-5 bg-ink text-ivory text-[12px] tracking-[0.04em] px-5 py-[15px] hover:bg-ink/90 transition-colors"
          >
            Shop flowers
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/custom"
            className="group inline-flex items-center gap-2 text-[12px]"
          >
            Make it personal
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex items-center gap-3 mt-14 lg:mt-[72px]">
          <div className="flex -space-x-1.5">
            <span className="flex items-center justify-center w-7 h-7 bg-yellow border-2 border-cream rounded-full text-[9px] font-medium">J</span>
            <span className="flex items-center justify-center w-7 h-7 bg-peach border-2 border-cream rounded-full text-[9px] font-medium">M</span>
            <span className="flex items-center justify-center w-7 h-7 bg-sage border-2 border-cream rounded-full text-[9px] font-medium">R</span>
          </div>
          <span className="text-muted text-[11px]">Loved by 2,000+ thoughtful gifters</span>
        </div>
      </motion.div>

      {/* Art */}
      <motion.div
        className="relative overflow-hidden mt-10 lg:mt-0 h-[360px] sm:h-[420px] lg:h-auto"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <img
          src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=90"
          alt="A soft, joyful bouquet of flowers"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-0 bg-yellow text-[10px] tracking-[0.07em] leading-[1.4] px-4 py-3 z-[1]">
          Handmade<br /><strong className="font-bold">with feeling</strong>
        </div>
        <span className="absolute bottom-6 right-6 flex items-center justify-center w-[98px] h-[98px] bg-ivory rounded-full font-display text-[17px] italic leading-tight text-center -rotate-[10deg]">
          good things<br />take time
        </span>
      </motion.div>
    </section>
  );
}
