"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import Link from "next/link";
import { useStorefrontProducts, useCommerce } from "@/lib/storefrontStore";
import { formatPrice, formatDiscount } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  {
    label: "Flowers",
    thumb: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=120&q=80",
    filter: (p: any) => p.category === "Flowers" || p.category === "Bouquets",
  },
  {
    label: "Cakes",
    thumb: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=120&q=80",
    filter: (p: any) => p.category === "Cakes" || p.tags?.includes("cake"),
  },
  {
    label: "Personalised",
    thumb: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=120&q=80",
    filter: (p: any) => p.category === "Personalised" || p.isCustomizable,
  },
  {
    label: "Hampers",
    thumb: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=120&q=80",
    filter: (p: any) => p.category === "Gift Boxes" || p.tags?.includes("hamper"),
  },
  {
    label: "Chocolates",
    thumb: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=120&q=80",
    filter: (p: any) => p.category === "Chocolates" || p.tags?.includes("chocolate"),
  },
];

export default function BestSellers() {
  const allProducts = useStorefrontProducts();
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toggleWishlist, isWishlisted } = useCommerce();

  // Filter products by selected tab or fallback to all products if filtered is empty
  const activeFilter = tabs[activeTab].filter;
  const filtered = allProducts.filter(activeFilter);
  const displayProducts = filtered.length > 0 ? filtered : allProducts;

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="px-[3vw] lg:px-[4vw] py-8 lg:py-14">
      {/* Title & Subtitle */}
      <div className="mb-4">
        <h2 className="text-[clamp(24px,3.5vw,34px)] font-bold text-ink tracking-tight">
          Shop By Bestsellers
        </h2>
        <p className="text-muted text-[13px] sm:text-[14px] mt-1">
          Discover favourite handcrafted gifting options, curated bestsellers that make every celebration extra special
        </p>
      </div>

      {/* Tabs with rounded thumbnails */}
      <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-hide py-3 mb-6 border-b border-line">
        {tabs.map((tab, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2.5 pb-2.5 text-[14px] font-semibold whitespace-nowrap transition-all border-b-2 -mb-[13px] ${
                isActive
                  ? "border-sage-deep text-ink"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-line shrink-0 bg-cream-dark">
                <img
                  src={tab.thumb}
                  alt={tab.label}
                  className="w-full h-full object-cover"
                />
              </div>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Product Carousel */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-[40%] -translate-y-1/2 z-10 w-10 h-10 bg-ivory shadow-lg rounded-full flex items-center justify-center hover:bg-cream transition-colors -ml-3 border border-line"
          aria-label="Previous products"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
        >
          <AnimatePresence mode="popLayout">
            {displayProducts.map((product, index) => {
              const discount = product.oldPrice
                ? formatDiscount(product.price, product.oldPrice)
                : null;

              return (
                <motion.div
                  key={product.id}
                  className="snap-start shrink-0 w-[220px] sm:w-[250px] lg:w-[calc(20%-13px)]"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                >
                  <article className="group">
                    {/* Product Card Container */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream-dark/60 border border-line/60 shadow-xs group-hover:shadow-md transition-all">
                      <Link href={`/product/${product.slug}`} className="block w-full h-full">
                        <img
                          src={product.images[0]}
                          alt={product.alt || product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </Link>

                      {/* Wishlist Button */}
                      <button
                        className="absolute top-2.5 right-2.5 bg-ivory/90 backdrop-blur-sm rounded-full p-2 hover:scale-110 transition-transform shadow-xs"
                        aria-label="Wishlist"
                        onClick={() => toggleWishlist(product.id)}
                      >
                        <Heart
                          size={15}
                          fill={isWishlisted(product.id) ? "#e07a7a" : "none"}
                          stroke={isWishlisted(product.id) ? "#e07a7a" : "currentColor"}
                        />
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="pt-2.5 px-0.5">
                      <Link href={`/product/${product.slug}`}>
                        <h3 className="text-[13px] sm:text-[14px] font-medium text-ink truncate group-hover:text-sage-deep transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      {/* Tag / Badge */}
                      {product.tag && (
                        <div className="mt-1">
                          <span
                            className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide ${
                              product.tag === "LUXE"
                                ? "bg-black text-white"
                                : product.tag === "Bestseller"
                                ? "bg-[#713f9c] text-white"
                                : "bg-sage-deep text-white"
                            }`}
                          >
                            {product.tag}
                          </span>
                        </div>
                      )}

                      {/* Price Row */}
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="text-[15px] font-bold text-ink">
                          {formatPrice(product.price)}
                        </span>
                        {product.oldPrice && (
                          <del className="text-[12px] text-muted">
                            {formatPrice(product.oldPrice)}
                          </del>
                        )}
                        {discount && (
                          <span className="text-[11px] font-bold text-[#1f8745]">
                            {discount}% OFF
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-[40%] -translate-y-1/2 z-10 w-10 h-10 bg-ivory shadow-lg rounded-full flex items-center justify-center hover:bg-cream transition-colors -mr-3 border border-line"
          aria-label="Next products"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
