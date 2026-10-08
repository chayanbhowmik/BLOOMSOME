"use client";

import { getFeaturedProducts } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";

export default function BestSellers() {
  const featured = getFeaturedProducts();

  return (
    <section className="bg-cream-dark px-[5vw] py-20 lg:py-28">
      {/* Heading */}
      <div className="mb-10 lg:mb-12">
        <p className="text-muted text-[11px] uppercase tracking-[0.12em] mb-5">
          The little edit
        </p>
        <h2 className="text-[clamp(36px,4.5vw,65px)] font-medium leading-[0.95] tracking-[-0.04em]">
          Made to make<br />
          <em className="font-display font-medium">someone smile.</em>
        </h2>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
        {featured.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
