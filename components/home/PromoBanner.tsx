"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="px-[3vw] lg:px-[4vw] py-6 lg:py-8">
      <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl bg-gradient-to-r from-[#e89980] via-[#e58a70] to-[#df7a60] text-white p-6 sm:p-10 lg:p-12 shadow-lg">
        {/* Decorative background elements */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-black/10 rounded-full blur-xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-6 items-center relative z-10">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase mb-3">
              <Sparkles size={12} />
              Festive Celebrations
            </span>
            <h2 className="text-[clamp(26px,4vw,44px)] font-extrabold tracking-tight leading-tight mb-3">
              Joyful Gifts To <br /> Make It Special
            </h2>
            <p className="text-white/90 text-[14px] max-w-md mb-6 leading-relaxed">
              Explore handcrafted floral creations, thoughtful hampers, and customized keepsake gifts made to turn moments into lifelong memories.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/shop?occasion=Birthday"
                className="inline-flex items-center gap-2 bg-white text-[#d66b50] font-semibold text-[13px] px-6 py-3 rounded-full hover:bg-cream shadow-md transition-all hover:scale-105"
              >
                Explore Celebration Gifts
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center md:justify-end">
            <div className="relative w-full max-w-[340px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
              <img
                src="https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=800&q=85"
                alt="Joyful Birthday & Celebration Gifting"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-black/40 backdrop-blur-md rounded-xl p-2.5 text-center text-white text-[12px] font-medium">
                ✨ Same Day & Midnight Gifting
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
