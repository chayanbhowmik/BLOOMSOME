"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const floralCollections = [
  {
    title: "Centerpiece Flower Collection",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=85",
    href: "/shop?category=Centerpiece",
    bg: "bg-[#f2e6dc]",
  },
  {
    title: "Orchid Flower Collection",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=85",
    href: "/shop?category=Flowers",
    bg: "bg-[#eedfd2]",
  },
  {
    title: "Dried Flower Collection",
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=600&q=85",
    href: "/shop?tag=dried",
    bg: "bg-[#f2e7db]",
  },
  {
    title: "Crochet Flower Collection",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=85",
    href: "/shop?category=Bouquets",
    bg: "bg-[#f6eae0]",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="px-[3vw] lg:px-[4vw] py-8 lg:py-12">
      {/* Heading */}
      <div className="mb-6 lg:mb-8">
        <h2 className="text-[clamp(24px,3.5vw,34px)] font-bold text-ink tracking-tight">
          Designer Floral Edit
        </h2>
      </div>

      {/* 4 Spotlight Pedestal Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {floralCollections.map((col, idx) => (
          <motion.div
            key={col.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
          >
            <Link href={col.href} className="group block">
              <div
                className={`relative rounded-2xl lg:rounded-3xl p-5 lg:p-6 h-[260px] sm:h-[280px] flex flex-col justify-between overflow-hidden ${col.bg} transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1`}
              >
                {/* Text Content */}
                <div className="z-10 max-w-[170px]">
                  <h3 className="text-[17px] sm:text-[18px] font-bold text-ink leading-snug mb-3">
                    {col.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[12px] font-semibold bg-white/90 backdrop-blur-sm text-ink px-3.5 py-1.5 rounded-full shadow-xs group-hover:bg-white group-hover:shadow-sm transition-all">
                    Order Now
                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform text-sage-deep" />
                  </span>
                </div>

                {/* Pedestal / Floral Image */}
                <div className="absolute right-0 bottom-0 w-[65%] h-[80%] flex items-end justify-end pointer-events-none">
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-contain object-bottom-right drop-shadow-md group-hover:scale-105 transition-transform duration-500 rounded-bl-3xl"
                    loading="lazy"
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
