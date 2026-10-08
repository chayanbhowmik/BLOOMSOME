"use client";

import Link from "next/link";
import { Heart, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { formatPrice, formatDiscount } from "@/lib/utils";
import { useCommerce } from "@/lib/storefrontStore";

const toneColors: Record<string, string> = {
  yellow: "bg-[#f5f0dc]",
  pink: "bg-[#f5efe8]",
  coral: "bg-[#f5ece5]",
  lavender: "bg-[#eeebf0]",
  peach: "bg-[#f5ece5]",
  sage: "bg-[#ecf0e8]",
};

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, toggleWishlist, isWishlisted } = useCommerce();
  const discount = product.oldPrice
    ? formatDiscount(product.price, product.oldPrice)
    : null;

  return (
    <motion.article
      className="group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {/* Image */}
      <div
        className={`relative h-[220px] sm:h-[260px] lg:h-[300px] overflow-hidden rounded-2xl ${
          toneColors[product.tone] || "bg-cream-dark"
        }`}
      >
        <Link href={`/product/${product.slug}`} className="block h-full">
          <img
            src={product.images[0]}
            alt={product.alt}
            className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.05]"
            loading="lazy"
          />
        </Link>

        {/* Tag */}
        {product.tag && (
          <span className="absolute top-3 left-3 bg-sage-deep/90 text-ivory text-[10px] px-2.5 py-1.5 font-semibold tracking-wide rounded-md">
            {product.tag}
          </span>
        )}

        {/* Discount badge */}
        {discount && (
          <span className="absolute top-3 right-12 bg-yellow text-ink text-[10px] px-2 py-1 font-bold rounded-md">
            -{discount}%
          </span>
        )}

        {/* Wishlist */}
        <button
          className="absolute top-3 right-3 bg-ivory/90 backdrop-blur-sm rounded-full p-2 hover:scale-110 transition-transform shadow-sm"
          aria-label={`${isWishlisted(product.id) ? "Remove" : "Add"} ${product.name} ${isWishlisted(product.id) ? "from" : "to"} wishlist`}
          onClick={() => toggleWishlist(product.id)}
        >
          <Heart
            size={16}
            strokeWidth={1.6}
            fill={isWishlisted(product.id) ? "#e07a7a" : "none"}
            stroke={isWishlisted(product.id) ? "#e07a7a" : "currentColor"}
          />
        </button>

        {/* Quick Add — Desktop hover */}
        <button
          className="absolute bottom-0 inset-x-0 bg-ink/90 backdrop-blur-sm text-ivory flex items-center justify-between px-4 py-3 text-[11px] font-medium opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-250 ease-out lg:flex hidden rounded-b-2xl"
          onClick={() => addToCart(product.id)}
        >
          Add to bag
          <ArrowRight size={15} />
        </button>
      </div>

      {/* Info */}
      <div className="pt-3.5 px-0.5">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-[14px] font-semibold mb-0.5 truncate hover:opacity-70 transition-opacity">
            {product.name}
          </h3>
        </Link>

        {/* Price row */}
        <div className="flex items-center gap-2 mt-1">
          <strong className="text-[15px] font-bold">{formatPrice(product.price)}</strong>
          {product.oldPrice && (
            <del className="text-muted text-[12px]">{formatPrice(product.oldPrice)}</del>
          )}
          {discount && (
            <span className="text-[11px] font-semibold text-[#2a8f4f]">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1.5 text-[11px] text-[#a39b2a]">
          <Star size={12} fill="currentColor" strokeWidth={0} />
          <span>{product.rating}</span>
          <span className="text-muted">({product.reviews})</span>
        </div>
      </div>

      {/* Mobile quick add */}
      <Link
        href={`/product/${product.slug}`}
        className="lg:hidden mt-3 flex items-center justify-center gap-2 bg-ink text-ivory text-[11px] font-medium py-3 rounded-xl hover:bg-ink/90 transition-colors"
      >
        View product
        <ArrowRight size={14} />
      </Link>
    </motion.article>
  );
}
