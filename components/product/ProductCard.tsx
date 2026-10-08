"use client";

import Link from "next/link";
import { Heart, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { formatPrice, formatDiscount } from "@/lib/utils";

const toneColors: Record<string, string> = {
  yellow: "bg-[#e8db8b]",
  pink: "bg-[#dfe1c8]",
  coral: "bg-[#eac0a8]",
  lavender: "bg-[#d3ccd0]",
  peach: "bg-peach",
  sage: "bg-sage",
};

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const discount = product.oldPrice
    ? formatDiscount(product.price, product.oldPrice)
    : null;

  return (
    <motion.article
      className="group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Image */}
      <Link href={`/product/${product.slug}`} className="block">
        <div
          className={`relative h-[240px] sm:h-[300px] lg:h-[355px] overflow-hidden ${
            toneColors[product.tone] || "bg-cream-dark"
          }`}
        >
          <img
            src={product.images[0]}
            alt={product.alt}
            className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.045]"
            loading="lazy"
          />

          {/* Tag */}
          {product.tag && (
            <span className="absolute top-3 left-3 bg-ivory text-[10px] px-2.5 py-2 font-medium tracking-wide">
              {product.tag}
            </span>
          )}

          {/* Discount badge */}
          {discount && (
            <span className="absolute top-3 right-14 bg-yellow text-[10px] px-2 py-1 font-semibold">
              -{discount}%
            </span>
          )}

          {/* Wishlist */}
          <button
            className="absolute top-3 right-3 bg-ivory rounded-full p-2 hover:scale-110 transition-transform"
            aria-label={`Add ${product.name} to wishlist`}
          >
            <Heart size={16} strokeWidth={1.6} />
          </button>

          {/* Quick Add */}
          <button
            className="absolute bottom-0 inset-x-0 bg-ink text-ivory flex items-center justify-between px-4 py-3.5 text-[11px] opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-250 ease-out lg:flex hidden"
          >
            Add to bag
            <ArrowRight size={15} />
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="flex items-start justify-between pt-4">
        <div className="min-w-0">
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-[15px] font-semibold mb-1 truncate hover:opacity-70 transition-opacity">
              {product.name}
            </h3>
          </Link>
          <p className="text-muted text-[11px]">{product.category}</p>
        </div>
        <div className="text-right shrink-0 ml-3">
          <strong className="block text-sm font-semibold">{formatPrice(product.price)}</strong>
          {product.oldPrice && (
            <del className="text-muted text-[11px]">{formatPrice(product.oldPrice)}</del>
          )}
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-2 text-[11px] text-[#a39b2a]">
        <Star size={12} fill="currentColor" strokeWidth={0} />
        <span>{product.rating}</span>
        <span className="text-muted">({product.reviews})</span>
      </div>

      {/* Mobile quick add */}
      <Link
        href={`/product/${product.slug}`}
        className="lg:hidden mt-3 flex items-center justify-center gap-2 bg-ink text-ivory text-[11px] py-3 hover:bg-ink/90 transition-colors"
      >
        View product
        <ArrowRight size={14} />
      </Link>
    </motion.article>
  );
}
