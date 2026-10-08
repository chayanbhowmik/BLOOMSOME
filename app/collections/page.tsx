import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { collections, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Collections — Handcrafted Floral Series",
  description:
    "Explore curated handmade flower collections by BLOOMSOME. From everlasting single stems to bespoke bouquets and everyday charms.",
};

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Header Banner */}
      <section className="border-b border-line px-[5vw] py-16 lg:py-24 text-center max-w-4xl mx-auto">
        <span className="inline-block text-[11px] uppercase tracking-[0.25em] text-muted mb-3 font-mono">
          Curated Series
        </span>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-ink tracking-tight mb-6">
          Collections Made to <span className="italic font-serif">Cherish</span>
        </h1>
        <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Each collection is thoughtfully designed around special emotions, celebrations, and everyday moments. Handcrafted to stay vibrant forever.
        </p>
      </section>

      {/* Collections Grid */}
      <section className="px-[5vw] py-16 lg:py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {collections.map((col, idx) => {
            const itemCount = col.productIds.length;
            return (
              <Link
                key={col.slug}
                href={`/collections/${col.slug}`}
                className="group block border border-line bg-paper rounded-2xl overflow-hidden hover:border-ink/40 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-mist">
                  <Image
                    src={col.image}
                    alt={col.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-cream/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-mono tracking-wider text-ink uppercase">
                    {itemCount} {itemCount === 1 ? "Style" : "Styles"}
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 text-cream">
                    <h2 className="font-display text-2xl sm:text-3xl font-normal mb-1 group-hover:translate-x-1 transition-transform">
                      {col.name}
                    </h2>
                    <p className="text-cream/80 text-sm line-clamp-1">
                      {col.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex items-center justify-between border-t border-line">
                  <p className="text-xs sm:text-sm text-muted line-clamp-2 max-w-[80%]">
                    {col.longDescription}
                  </p>
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-line bg-cream group-hover:bg-ink group-hover:text-cream group-hover:border-ink transition-all shrink-0 ml-4">
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Custom Commission CTA */}
      <section className="border-t border-line bg-mist/50 px-[5vw] py-16 sm:py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-yellow/40 border border-yellow/60 px-3.5 py-1.5 rounded-full text-xs font-mono mb-4 text-ink">
            <Sparkles size={14} />
            <span>Looking for something bespoke?</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-ink font-light mb-4">
            Build Your Own Custom Bouquet
          </h2>
          <p className="text-muted text-sm sm:text-base mb-8">
            Pick your favorite flowers, match custom color palettes, choose sizes, and add a personalized note for the ultimate gift.
          </p>
          <Link
            href="/custom"
            className="inline-flex items-center gap-3 bg-ink text-cream px-8 py-3.5 rounded-full text-sm font-medium hover:bg-ink/90 transition-colors shadow-sm"
          >
            Start Bouquet Builder
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
