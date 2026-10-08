"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const flowerTypes = [
  {
    name: "Roses",
    slug: "roses",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=85",
    bg: "bg-[#f5ebe1]",
    href: "/shop?flower=roses",
  },
  {
    name: "Orchids",
    slug: "orchids",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=85",
    bg: "bg-[#f3ebe4]",
    href: "/shop?flower=orchids",
  },
  {
    name: "Carnations",
    slug: "carnations",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=85",
    bg: "bg-[#f6eee5]",
    href: "/shop?flower=carnations",
  },
  {
    name: "Gerberas",
    slug: "gerberas",
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=600&q=85",
    bg: "bg-[#f4ebe1]",
    href: "/shop?flower=gerberas",
  },
  {
    name: "Sunflowers",
    slug: "sunflowers",
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=85",
    bg: "bg-[#f7efe6]",
    href: "/shop?flower=sunflowers",
  },
];

export default function PickFavouriteFlower() {
  return (
    <section className="px-[3vw] lg:px-[4vw] py-10 lg:py-14">
      {/* Title */}
      <div className="mb-6 lg:mb-8">
        <h2 className="text-[clamp(24px,3.5vw,34px)] font-bold text-ink tracking-tight">
          Pick their favourite Flower
        </h2>
      </div>

      {/* 5 Floral Pedestal Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
        {flowerTypes.map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.07 }}
          >
            <Link href={item.href} className="group flex flex-col items-center">
              {/* Pedestal Container */}
              <div
                className={`w-full aspect-[4/5] rounded-2xl lg:rounded-3xl p-4 sm:p-5 ${item.bg} flex flex-col items-center justify-end relative overflow-hidden shadow-xs group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300`}
              >
                {/* Flower arrangement on pedestal */}
                <div className="relative w-full h-[85%] flex items-end justify-center mb-2">
                  <img
                    src={item.image}
                    alt={`${item.name} floral arrangement`}
                    className="w-full h-full object-contain filter drop-shadow-lg group-hover:scale-105 transition-transform duration-500 rounded-xl"
                    loading="lazy"
                  />
                </div>

                {/* Wooden Pedestal base visual */}
                <div className="w-[75%] h-5 bg-[#c8a882] rounded-md shadow-inner opacity-85" />
              </div>

              {/* Title */}
              <h3 className="text-[14px] sm:text-[16px] font-semibold text-ink mt-3 group-hover:text-sage-deep transition-colors text-center">
                {item.name}
              </h3>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
