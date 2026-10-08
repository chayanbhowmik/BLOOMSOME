"use client";

import ProductCard from "@/components/product/ProductCard";
import { useStorefrontProducts } from "@/lib/storefrontStore";

export default function BestSellers() {
  const featured = useStorefrontProducts().filter((product) => product.isFeatured || product.isBestSeller).slice(0, 4);

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
      {featured.length === 0 && <p className="border border-dashed border-line p-10 text-center text-sm text-muted">Products will appear here once published from the admin catalog.</p>}
    </section>
  );
}
