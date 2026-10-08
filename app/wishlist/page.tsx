"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ArrowRight, ShoppingBag } from "lucide-react";
import { products } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(products.slice(0, 3));

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <section className="border-b border-line px-[5vw] py-12 lg:py-16 text-center max-w-4xl mx-auto">
        <span className="inline-block text-[11px] font-mono tracking-[0.25em] text-muted uppercase mb-3">
          Saved Keepsakes
        </span>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-ink tracking-tight mb-3">
          Your <span className="italic font-serif">Wishlist</span> ({wishlistItems.length})
        </h1>
        <p className="text-muted text-sm max-w-md mx-auto">
          Pieces you love and want to come back to. Saved for your next special gifting moment.
        </p>
      </section>

      {/* Grid */}
      <section className="px-[5vw] py-12 lg:py-16 max-w-7xl mx-auto">
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {wishlistItems.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        ) : (
          <div className="bg-paper border border-line rounded-2xl p-16 text-center max-w-md mx-auto space-y-4">
            <Heart size={40} className="mx-auto text-muted" />
            <h2 className="font-display text-2xl text-ink font-light">Your Wishlist is Empty</h2>
            <p className="text-xs text-muted">
              Tap the heart icon on any flower or gift to save it here for later.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-ink text-cream text-xs font-mono uppercase px-6 py-3 rounded-full hover:bg-ink/90 mt-2"
            >
              Start Exploring
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
