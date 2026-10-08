"use client";

import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRef } from "react";
import { motion } from "framer-motion";

const occasions = [
  {
    title: "Birthday",
    dateTag: null,
    bg: "bg-[#f4e2d8]",
    image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=600&q=85",
    href: "/shop?occasion=Birthday",
  },
  {
    title: "Boss Day",
    dateTag: "16TH OCT",
    bg: "bg-[#eedfc9]",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=85",
    href: "/shop?occasion=Corporate",
  },
  {
    title: "Anniversary",
    dateTag: null,
    bg: "bg-[#f6dcdb]",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=85",
    href: "/shop?occasion=Anniversary",
  },
  {
    title: "Diwali",
    dateTag: "8TH NOV",
    bg: "bg-[#cb3d43]",
    textColor: "text-white",
    badgeBg: "bg-[#f5cf84] text-ink",
    image: "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=600&q=85",
    href: "/shop?occasion=Diwali",
  },
  {
    title: "Congratulations",
    dateTag: null,
    bg: "bg-[#d3e5eb]",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=85",
    href: "/shop?occasion=Congratulations",
  },
];

export default function OccasionGifting() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="px-[3vw] lg:px-[4vw] py-8 lg:py-12">
      {/* Section Title */}
      <div className="flex items-center justify-between mb-6 lg:mb-8">
        <div>
          <h2 className="text-[clamp(24px,3.5vw,34px)] font-bold text-ink tracking-tight">
            Gifts For Every Occasion
          </h2>
          <p className="text-muted text-[13px] mt-1">
            Carefully curated moments for all your milestone dates and surprise celebrations.
          </p>
        </div>
      </div>

      {/* Occasion Cards Carousel */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 lg:gap-5 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
        >
          {occasions.map((occ, idx) => (
            <motion.div
              key={occ.title}
              className="snap-start shrink-0 w-[240px] sm:w-[280px] lg:w-[calc(20%-13px)]"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
            >
              <Link href={occ.href} className="group block">
                <div
                  className={`relative rounded-2xl lg:rounded-3xl p-5 h-[230px] sm:h-[250px] flex flex-col justify-between overflow-hidden ${occ.bg} shadow-xs group-hover:shadow-md transition-all duration-300 group-hover:-translate-y-1`}
                >
                  {/* Header Tag / Date */}
                  <div className="flex items-center justify-between z-10">
                    <span
                      className={`text-[15px] sm:text-[16px] font-bold flex items-center gap-1 ${
                        occ.textColor || "text-ink"
                      }`}
                    >
                      {occ.title}
                      <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform opacity-75" />
                    </span>

                    {occ.dateTag && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                          occ.badgeBg || "bg-white/90 text-ink shadow-xs"
                        }`}
                      >
                        {occ.dateTag}
                      </span>
                    )}
                  </div>

                  {/* Occasion Image */}
                  <div className="absolute inset-x-0 bottom-0 h-[70%] flex items-end justify-center pointer-events-none p-3">
                    <img
                      src={occ.image}
                      alt={occ.title}
                      className="w-full h-full object-contain object-bottom drop-shadow-md group-hover:scale-105 transition-transform duration-500 rounded-xl"
                      loading="lazy"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-ivory shadow-lg rounded-full items-center justify-center hover:bg-cream -mr-3 border border-line"
          aria-label="Scroll occasions right"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
