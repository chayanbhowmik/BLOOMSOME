"use client";

import { useState, useMemo, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown, ArrowUpDown } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { categories } from "@/lib/products";
import { useStorefrontProducts } from "@/lib/storefrontStore";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Best Rating" },
];

const priceRanges = [
  { label: "Under ₹300", min: 0, max: 300 },
  { label: "₹300 – ₹500", min: 300, max: 500 },
  { label: "₹500 – ₹1000", min: 500, max: 1000 },
  { label: "Over ₹1000", min: 1000, max: Infinity },
];

const occasionOptions = ["Birthday", "Anniversary", "Valentine's Day", "Mother's Day", "Graduation", "Just Because", "Friendship", "Proposal"];

function ShopContent() {
  const searchParams = useSearchParams();
  const products = useStorefrontProducts();
  const initialCategory = searchParams.get("category") || "All";
  const initialOccasion = searchParams.get("occasion") || "";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sort, setSort] = useState("featured");
  const [priceRange, setPriceRange] = useState<number | null>(null);
  const [occasion, setOccasion] = useState(initialOccasion);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Occasion filter
    if (occasion) {
      result = result.filter((p) => p.occasions?.includes(occasion));
    }

    // Price filter
    if (priceRange !== null) {
      const range = priceRanges[priceRange];
      result = result.filter((p) => p.price >= range.min && p.price < range.max);
    }

    // Sort
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [activeCategory, sort, priceRange, occasion]);

  const clearFilters = useCallback(() => {
    setActiveCategory("All");
    setPriceRange(null);
    setOccasion("");
    setSort("featured");
  }, []);

  const hasFilters = activeCategory !== "All" || priceRange !== null || occasion !== "";

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="px-[5vw] pt-12 pb-8 lg:pt-16 lg:pb-10">
        <p className="text-muted text-[11px] uppercase tracking-[0.12em] mb-3">Browse</p>
        <h1 className="text-[clamp(36px,5vw,65px)] font-medium leading-[0.95] tracking-[-0.04em]">
          Shop all <em className="font-display font-medium">blooms.</em>
        </h1>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-[5vw] py-4 border-y border-line">
        <div className="flex items-center gap-4">
          {/* Filter Button */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 text-[12px] uppercase tracking-wide hover:opacity-60 transition-opacity"
          >
            <SlidersHorizontal size={16} />
            Filters
            {hasFilters && (
              <span className="w-5 h-5 bg-ink text-ivory rounded-full text-[10px] flex items-center justify-center">
                {(activeCategory !== "All" ? 1 : 0) + (priceRange !== null ? 1 : 0) + (occasion ? 1 : 0)}
              </span>
            )}
          </button>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-muted text-[11px] underline hover:text-ink transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="relative">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-2 text-[12px] uppercase tracking-wide hover:opacity-60 transition-opacity"
          >
            <ArrowUpDown size={14} />
            <span className="hidden sm:inline">Sort by:</span> {sortOptions.find((o) => o.value === sort)?.label}
            <ChevronDown size={14} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {sortOpen && (
              <motion.div
                className="absolute right-0 top-full mt-2 bg-cream border border-line shadow-lg z-30 min-w-[200px]"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => { setSort(option.value); setSortOpen(false); }}
                    className={`block w-full text-left px-4 py-3 text-[12px] hover:bg-cream-dark transition-colors ${
                      sort === option.value ? "font-semibold bg-cream-dark" : ""
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results count */}
        <span className="hidden lg:block text-muted text-[11px]">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="flex">
        {/* Sidebar Filters (Desktop) */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.aside
              className="fixed lg:relative inset-0 lg:inset-auto bg-cream lg:bg-transparent z-40 lg:z-auto p-6 lg:p-0 lg:w-[260px] lg:shrink-0 lg:border-r lg:border-line overflow-y-auto"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: "tween", duration: 0.2 }}
            >
              <div className="lg:p-6">
                {/* Mobile close */}
                <div className="flex items-center justify-between lg:hidden mb-8">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button onClick={() => setFiltersOpen(false)}><X size={20} /></button>
                </div>

                {/* Category */}
                <div className="mb-8">
                  <h4 className="text-[11px] uppercase tracking-[0.1em] text-muted mb-4 font-medium">Category</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => setActiveCategory("All")}
                      className={`block text-[13px] py-1 transition-opacity ${activeCategory === "All" ? "font-semibold" : "text-muted hover:text-ink"}`}
                    >
                      All Products
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => setActiveCategory(cat.name)}
                        className={`block text-[13px] py-1 transition-opacity ${activeCategory === cat.name ? "font-semibold" : "text-muted hover:text-ink"}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <h4 className="text-[11px] uppercase tracking-[0.1em] text-muted mb-4 font-medium">Price</h4>
                  <div className="space-y-2">
                    {priceRanges.map((range, i) => (
                      <button
                        key={i}
                        onClick={() => setPriceRange(priceRange === i ? null : i)}
                        className={`block text-[13px] py-1 transition-opacity ${priceRange === i ? "font-semibold" : "text-muted hover:text-ink"}`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Occasion */}
                <div className="mb-8">
                  <h4 className="text-[11px] uppercase tracking-[0.1em] text-muted mb-4 font-medium">Occasion</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => setOccasion("")}
                      className={`block text-[13px] py-1 transition-opacity ${occasion === "" ? "font-semibold" : "text-muted hover:text-ink"}`}
                    >
                      All Occasions
                    </button>
                    {occasionOptions.map((occ) => (
                      <button
                        key={occ}
                        onClick={() => setOccasion(occasion === occ ? "" : occ)}
                        className={`block text-[13px] py-1 transition-opacity ${occasion === occ ? "font-semibold" : "text-muted hover:text-ink"}`}
                      >
                        {occ}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile apply */}
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="lg:hidden w-full bg-ink text-ivory py-3 text-[12px] tracking-wide mt-4"
                >
                  Show {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""}
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="flex-1 px-[5vw] py-8 lg:py-10">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-muted text-lg mb-2">No blooms found</p>
              <p className="text-muted text-sm mb-6">Try adjusting your filters</p>
              <button
                onClick={clearFilters}
                className="bg-ink text-ivory px-5 py-3 text-[12px] tracking-wide"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
