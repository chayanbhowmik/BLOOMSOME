"use client";

import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

const personas = [
  {
    name: "Him",
    avatar: "👦",
    bg: "bg-[#fff2e2]",
    border: "border-[#fae3c6]",
    watermark: "⌚",
    href: "/shop?recipient=him",
  },
  {
    name: "Her",
    avatar: "👩",
    bg: "bg-[#fcebee]",
    border: "border-[#f7d6dc]",
    watermark: "💐",
    href: "/shop?recipient=her",
  },
  {
    name: "Kids",
    avatar: "🧒",
    bg: "bg-[#ebf4fd]",
    border: "border-[#d4e6f9]",
    watermark: "🧸",
    href: "/shop?recipient=kids",
  },
  {
    name: "Friend",
    avatar: "🧑‍🤝‍🧑",
    bg: "bg-[#f4ebf8]",
    border: "border-[#e5d5ec]",
    watermark: "🎂",
    href: "/shop?recipient=friend",
  },
  {
    name: "Wife",
    avatar: "👰",
    bg: "bg-[#fcf0e7]",
    border: "border-[#f7decb]",
    watermark: "💎",
    href: "/shop?recipient=wife",
  },
  {
    name: "Husband",
    avatar: "🤵",
    bg: "bg-[#ebf3ec]",
    border: "border-[#d3e5d5]",
    watermark: "👔",
    href: "/shop?recipient=husband",
  },
];

export default function GiftsForEveryone() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress((scrollLeft / maxScroll) * 100);
    }
  };

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  return (
    <section className="px-[3vw] lg:px-[4vw] py-10 lg:py-14">
      {/* Title */}
      <div className="mb-6 lg:mb-8">
        <h2 className="text-[clamp(24px,3.5vw,34px)] font-bold text-ink tracking-tight">
          Gifts for Everyone
        </h2>
      </div>

      {/* Avatar Cards Carousel */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide pb-3 snap-x snap-mandatory"
        >
          {personas.map((persona, idx) => (
            <motion.div
              key={persona.name}
              className="snap-start shrink-0 w-[145px] sm:w-[170px] lg:w-[calc(16.666%-14px)]"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Link href={persona.href} className="group block text-center">
                {/* 3D Character Avatar Container */}
                <div
                  className={`w-full aspect-square rounded-2xl ${persona.bg} border ${persona.border} p-3 flex flex-col items-center justify-center relative overflow-hidden shadow-xs group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300`}
                >
                  {/* Watermark background icon */}
                  <span className="absolute -bottom-2 -right-2 text-4xl opacity-15 select-none pointer-events-none">
                    {persona.watermark}
                  </span>

                  {/* Character Avatar */}
                  <span className="text-5xl sm:text-6xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300 z-10">
                    {persona.avatar}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-[14px] sm:text-[15px] font-semibold text-ink mt-2.5 group-hover:text-sage-deep transition-colors">
                  {persona.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Arrow on desktop */}
        <button
          onClick={() => scroll("right")}
          className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white shadow-lg rounded-full items-center justify-center hover:bg-cream -mr-3 border border-line"
          aria-label="Next personas"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Progress Indicator Bar */}
      <div className="flex justify-center mt-6">
        <div className="w-48 h-1.5 bg-line/80 rounded-full overflow-hidden">
          <div
            className="h-full bg-sage-deep rounded-full transition-all duration-150"
            style={{ width: "45%", transform: `translateX(${scrollProgress * 1.2}%)` }}
          />
        </div>
      </div>
    </section>
  );
}
