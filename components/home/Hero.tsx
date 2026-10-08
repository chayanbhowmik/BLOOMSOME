"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sage/30 via-peach/20 to-yellow/15">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] min-h-[400px] lg:min-h-[520px] px-[5vw] lg:px-[6vw] py-10 lg:py-0">
        {/* Copy */}
        <motion.div
          className="self-center pr-4 lg:pr-[3vw] py-8 lg:py-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2 bg-yellow/30 text-ink text-[11px] font-medium uppercase tracking-[0.08em] px-4 py-2 rounded-full mb-6">
            <Sparkles size={13} className="text-[#b5b526]" />
            Handmade with heart
          </div>

          <h1 className="text-[clamp(38px,5.5vw,72px)] font-semibold leading-[1.05] tracking-[-0.03em] mb-5">
            Joyful Gifts To<br />
            <em className="font-display font-medium">Make It Special</em>
          </h1>

          <p className="text-muted text-[15px] leading-relaxed max-w-[360px] mb-7">
            Handmade flowers and thoughtful little gifts that last forever.
            Perfect for every occasion and every feeling.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 bg-ink text-ivory text-[13px] font-medium tracking-[0.02em] px-7 py-3.5 rounded-md hover:bg-ink/90 transition-colors shadow-md"
            >
              Shop Now
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/custom"
              className="group inline-flex items-center gap-2 text-[13px] font-medium border-2 border-ink/20 px-6 py-3 rounded-md hover:border-ink/40 transition-colors"
            >
              Customise a Gift
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          <div className="flex items-center gap-3 mt-10 lg:mt-14">
            <div className="flex -space-x-2">
              <span className="flex items-center justify-center w-8 h-8 bg-yellow border-2 border-cream rounded-full text-[10px] font-semibold">
                J
              </span>
              <span className="flex items-center justify-center w-8 h-8 bg-peach border-2 border-cream rounded-full text-[10px] font-semibold">
                M
              </span>
              <span className="flex items-center justify-center w-8 h-8 bg-sage border-2 border-cream rounded-full text-[10px] font-semibold">
                R
              </span>
              <span className="flex items-center justify-center w-8 h-8 bg-pink border-2 border-cream rounded-full text-[10px] font-semibold">
                A
              </span>
            </div>
            <span className="text-muted text-[12px]">
              Loved by <strong className="text-ink">2,000+</strong> happy gifters
            </span>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="relative h-[320px] sm:h-[380px] lg:h-auto flex items-end lg:items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <img
            src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=90"
            alt="A beautiful handmade bouquet of everlasting flowers"
            className="w-full h-full object-cover rounded-2xl lg:rounded-3xl shadow-xl"
          />

          {/* Floating badge */}
          <motion.div
            className="absolute top-6 left-4 lg:top-10 lg:left-6 bg-ivory/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <p className="text-[10px] text-muted uppercase tracking-wider">Handmade</p>
            <p className="text-[14px] font-semibold">with feeling ✿</p>
          </motion.div>

          {/* Floating circle badge */}
          <motion.span
            className="absolute bottom-6 right-4 lg:bottom-12 lg:right-8 flex items-center justify-center w-[90px] h-[90px] lg:w-[100px] lg:h-[100px] bg-yellow/90 backdrop-blur-sm rounded-full font-display text-[15px] lg:text-[16px] italic leading-tight text-center shadow-lg -rotate-[8deg]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            good things
            <br />
            take time
          </motion.span>
        </motion.div>
      </div>

      {/* Decorative bottom curve */}
      <div className="absolute bottom-0 left-0 right-0 h-[40px] bg-cream" style={{ borderTopLeftRadius: '50% 100%', borderTopRightRadius: '50% 100%' }} />
    </section>
  );
}
