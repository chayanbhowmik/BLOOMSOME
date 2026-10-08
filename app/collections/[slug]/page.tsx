import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Sparkles } from "lucide-react";
import { collections, getProductsByCollection } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) return { title: "Collection Not Found" };

  return {
    title: `${collection.name} — BLOOMSOME Collections`,
    description: collection.description,
  };
}

export async function generateStaticParams() {
  return collections.map((col) => ({
    slug: col.slug,
  }));
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);

  if (!collection) {
    notFound();
  }

  const productsInCol = getProductsByCollection(slug);

  return (
    <main className="min-h-screen bg-cream">
      {/* Back Link & Breadcrumb */}
      <div className="px-[5vw] pt-8 max-w-7xl mx-auto">
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted hover:text-ink transition-colors"
        >
          <ArrowLeft size={14} />
          <span>All Collections</span>
        </Link>
      </div>

      {/* Hero Header */}
      <section className="px-[5vw] py-12 lg:py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="inline-block text-[11px] font-mono tracking-[0.25em] text-muted uppercase mb-3">
              Handcrafted Collection
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-ink tracking-tight mb-4">
              {collection.name}
            </h1>
            <p className="text-muted text-base sm:text-lg leading-relaxed mb-6">
              {collection.longDescription}
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-muted">
              <span className="bg-paper border border-line px-3 py-1.5 rounded-full">
                {productsInCol.length} {productsInCol.length === 1 ? "Product" : "Products"}
              </span>
              <span>100% Hand-shaped with Love</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-line shadow-sm">
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="border-t border-line px-[5vw] py-16 max-w-7xl mx-auto">
        {productsInCol.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {productsInCol.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-paper rounded-2xl border border-line max-w-md mx-auto">
            <Sparkles size={32} className="mx-auto text-muted mb-3" />
            <p className="font-display text-lg mb-2">New pieces crafting soon</p>
            <p className="text-xs text-muted mb-6">
              Our artisans are hand-crafting new designs for this collection.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center bg-ink text-cream text-xs px-5 py-2.5 rounded-full hover:bg-ink/90"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
