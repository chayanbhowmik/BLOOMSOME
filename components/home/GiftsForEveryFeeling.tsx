"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const feelings = [
  {
    name: "Love & Romance",
    slug: "love-and-romance",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=85",
    bg: "bg-[#fbe8eb]",
    border: "border-[#f4d1d6]",
    href: "/shop?feeling=love-romance",
  },
  {
    name: "Thinking of You",
    slug: "thinking-of-you",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=85",
    bg: "bg-[#eee8f8]",
    border: "border-[#dfd3f4]",
    href: "/shop?feeling=thinking-of-you",
  },
  {
    name: "Miss You",
    slug: "miss-you",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=85",
    bg: "bg-[#fceae4]",
    border: "border-[#f7d6cc]",
    href: "/shop?feeling=miss-you",
  },
  {
    name: "I am Sorry",
    slug: "i-am-sorry",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=85",
    bg: "bg-[#eaf1e8]",
    border: "border-[#d5e2d1]",
    href: "/shop?feeling=sorry",
  },
  {
    name: "Sympathy",
    slug: "sympathy",
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=600&q=85",
    bg: "bg-[#f4efe5]",
    border: "border-[#e5dcce]",
    href: "/shop?feeling=sympathy",
  },
];

export default function GiftsForEveryFeeling() {
  return (
    <section className="px-[3vw] lg:px-[4vw] py-10 lg:py-14">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h2 className="text-[clamp(24px,3.5vw,34px)] font-bold text-ink tracking-tight">
          Gifts for Every Feeling
        </h2>
        <p className="text-muted text-[13px] sm:text-[14px] mt-1">
          When emotions matter most, send a gift that speaks from the heart.
        </p>
      </div>

      {/* 5 Feeling Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
        {feelings.map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.07 }}
          >
            <Link href={item.href} className="group flex flex-col items-center">
              {/* Card Container */}
              <div
                className={`w-full aspect-[4/5] rounded-2xl lg:rounded-3xl p-4 sm:p-5 ${item.bg} border ${item.border} flex items-center justify-center relative overflow-hidden shadow-xs group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500 rounded-xl"
                  loading="lazy"
                />
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
