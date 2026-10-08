"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const tiles = [
  {
    name: "Flowers",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=85",
    bg: "bg-[#e8eee4]",
    href: "/shop?category=Flowers",
  },
  {
    name: "Cakes",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=85",
    bg: "bg-[#f7f0e3]",
    href: "/shop?category=Cakes",
  },
  {
    name: "Personalised",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=85",
    bg: "bg-[#f8e9e4]",
    href: "/custom",
  },
  {
    name: "Plants",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=85",
    bg: "bg-[#ece9f2]",
    href: "/shop?category=Plants",
  },
  {
    name: "Hampers",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=85",
    bg: "bg-[#e5f0f3]",
    href: "/shop?category=Gift+Boxes",
  },
];

export default function CategoryVisualTiles() {
  return (
    <section className="px-[3vw] lg:px-[4vw] py-8 lg:py-12">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
        {tiles.map((tile, idx) => (
          <motion.div
            key={tile.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
          >
            <Link href={tile.href} className="group flex flex-col items-center">
              {/* Tile Container */}
              <div
                className={`w-full aspect-square rounded-2xl lg:rounded-3xl p-4 lg:p-6 ${tile.bg} overflow-hidden flex items-center justify-center relative shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:-translate-y-1`}
              >
                <img
                  src={tile.image}
                  alt={tile.name}
                  className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500 rounded-xl"
                  loading="lazy"
                />
              </div>

              {/* Title */}
              <h3 className="text-[15px] lg:text-[17px] font-semibold text-ink mt-3 group-hover:text-sage-deep transition-colors text-center">
                {tile.name}
              </h3>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
