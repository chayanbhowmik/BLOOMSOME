"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useCommerce } from "@/lib/storefrontStore";
import { formatPrice } from "@/lib/utils";

interface LaunchItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  badge?: string;
  badgeColor?: string;
  image: string;
}

const newlyLaunchedProducts: LaunchItem[] = [
  {
    id: "new-1",
    name: "Birthday Truffle Floral Surprise Box",
    slug: "birthday-truffle-floral-surprise",
    price: 1549,
    oldPrice: 1999,
    discount: "23% OFF",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "new-2",
    name: "80s Trendy Wooden Photo Frame",
    slug: "80s-trendy-wooden-photo-frame",
    price: 549,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "new-3",
    name: "Rose Melange Everlasting Bunch",
    slug: "rose-melange-everlasting-bunch",
    price: 4499,
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "new-4",
    name: "Personalised Velvet Jewellery Box",
    slug: "personalised-velvet-jewellery-box",
    price: 1199,
    oldPrice: 1499,
    discount: "20% OFF",
    badge: "PERSONALISE IT!",
    badgeColor: "bg-[#2563eb] text-white",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "new-5",
    name: "Bloom & Blossom Keepsake Gift Hamper",
    slug: "bloom-blossom-keepsake-hamper",
    price: 4299,
    oldPrice: 6299,
    badge: "LUXE EDITION",
    badgeColor: "bg-[#713f9c] text-white",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "new-6",
    name: "Pastel Meadow Crochet Hand-Tied Bouquet",
    slug: "pastel-meadow-crochet-bouquet",
    price: 1899,
    oldPrice: 2299,
    discount: "17% OFF",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=85",
  },
];

export default function NewlyLaunched() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toggleWishlist, isWishlisted } = useCommerce();

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="px-[3vw] lg:px-[4vw] py-10 lg:py-14 bg-sage/10 border-y border-line/40">
      {/* Title */}
      <div className="mb-6 lg:mb-8">
        <h2 className="text-[clamp(24px,3.5vw,34px)] font-bold text-ink tracking-tight">
          Newly Launched
        </h2>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
        >
          {newlyLaunchedProducts.map((item, idx) => (
            <motion.div
              key={item.id}
              className="snap-start shrink-0 w-[220px] sm:w-[250px] lg:w-[calc(20%-13px)]"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <div className="bg-white rounded-2xl p-3 border border-line/60 shadow-xs hover:shadow-md transition-all group flex flex-col h-full">
                {/* Product Image */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-cream-dark/40 mb-3">
                  <Link href={`/product/${item.slug}`} className="block w-full h-full">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </Link>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(item.id)}
                    className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs rounded-full p-2 hover:scale-110 transition-transform shadow-xs"
                    aria-label="Add to wishlist"
                  >
                    <Heart
                      size={14}
                      fill={isWishlisted(item.id) ? "#e07a7a" : "none"}
                      stroke={isWishlisted(item.id) ? "#e07a7a" : "currentColor"}
                    />
                  </button>
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <Link href={`/product/${item.slug}`}>
                    <h3 className="text-[13px] sm:text-[14px] font-medium text-ink line-clamp-2 group-hover:text-sage-deep transition-colors mb-1.5">
                      {item.name}
                    </h3>
                  </Link>

                  {/* Badge */}
                  {item.badge && (
                    <div className="mb-1.5">
                      <span
                        className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide ${
                          item.badgeColor || "bg-sage-deep text-white"
                        }`}
                      >
                        {item.badge}
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center gap-1.5 mt-auto pt-1">
                    <span className="text-[15px] font-bold text-ink">
                      {formatPrice(item.price)}
                    </span>
                    {item.oldPrice && (
                      <del className="text-[12px] text-muted">
                        {formatPrice(item.oldPrice)}
                      </del>
                    )}
                    {item.discount && (
                      <span className="text-[11px] font-bold text-[#1f8745]">
                        {item.discount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel Arrow */}
        <button
          onClick={() => scroll("right")}
          className="hidden lg:flex absolute right-0 top-[40%] -translate-y-1/2 z-10 w-9 h-9 bg-white shadow-lg rounded-full items-center justify-center hover:bg-cream border border-line -mr-3"
          aria-label="Next launches"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* View All Launches Button */}
      <div className="text-center mt-8">
        <Link
          href="/shop?tag=new-launch"
          className="inline-flex items-center gap-2 bg-white text-ink border border-line text-[13px] font-semibold px-7 py-3 rounded-full hover:bg-cream-dark/60 shadow-xs transition-all hover:scale-105"
        >
          <span>View All Launches</span>
          <ChevronRight size={16} className="text-sage-deep" />
        </Link>
      </div>
    </section>
  );
}
