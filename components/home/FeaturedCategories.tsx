"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { categories } from "@/lib/products";

const accentColors: Record<string, string> = {
  sage: "bg-sage",
  yellow: "bg-yellow",
  peach: "bg-peach",
  pink: "bg-pink",
};

export default function FeaturedCategories() {
  return (
    <section className="px-[5vw] py-20 lg:py-28">
      {/* Heading */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-muted text-[11px] uppercase tracking-[0.12em] mb-5">
            Find your kind of happy
          </p>
          <h2 className="text-[clamp(36px,4.5vw,65px)] font-medium leading-[0.95] tracking-[-0.04em]">
            Small gestures,<br />
            <em className="font-display font-medium">beautifully made.</em>
          </h2>
        </div>
        <Link
          href="/collections"
          className="group inline-flex items-center gap-2 text-[12px] shrink-0"
        >
          View all collections
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {categories.slice(0, 4).map((category, index) => (
          <motion.div
            key={category.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/shop?category=${category.name}`} className="block group">
              <div
                className={`relative h-[210px] lg:h-[280px] overflow-hidden ${
                  accentColors[category.accent] || "bg-cream-dark"
                }`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.045]"
                  loading="lazy"
                />
                <span className="absolute bottom-0 right-0 bg-ivory text-[11px] px-3 py-2">
                  0{index + 1}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-line py-4 px-0.5">
                <div>
                  <h3 className="text-[15px] font-semibold mb-1">{category.name}</h3>
                  <p className="text-muted text-[11px]">{category.count}</p>
                </div>
                <ArrowRight size={17} className="text-muted group-hover:text-ink transition-colors" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
