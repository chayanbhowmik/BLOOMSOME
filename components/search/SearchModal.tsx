"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, TrendingUp, Clock, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { searchProducts } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

const popularSearches = ["sunflower", "rose", "bouquet", "keychain", "gift box", "lavender"];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      const stored = localStorage.getItem("bloomsome-recent-searches");
      if (stored) setRecentSearches(JSON.parse(stored));
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const results = query.length >= 2 ? searchProducts(query) : [];

  const handleSearch = (term: string) => {
    setQuery(term);
    const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("bloomsome-recent-searches", JSON.stringify(updated));
  };

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-ink/30 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Search Panel */}
          <motion.div
            className="fixed inset-x-0 top-0 z-50 bg-cream max-h-[85vh] overflow-y-auto shadow-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "tween", duration: 0.2 }}
          >
            {/* Input */}
            <div className="flex items-center gap-4 px-[5vw] py-5 border-b border-line">
              <Search size={22} strokeWidth={1.5} className="text-muted shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search little happy things..."
                className="bg-transparent outline-none text-lg w-full"
                aria-label="Search products"
              />
              <button
                onClick={handleClose}
                className="p-1 hover:opacity-60 transition-opacity shrink-0"
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-[5vw] py-8 max-w-4xl mx-auto">
              {query.length >= 2 ? (
                <>
                  {results.length > 0 ? (
                    <div>
                      <p className="text-muted text-[11px] uppercase tracking-[0.1em] mb-4">
                        {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {results.map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            onClick={handleClose}
                            className="flex gap-4 p-3 rounded-lg hover:bg-cream-dark transition-colors group"
                          >
                            <div className="w-16 h-16 bg-cream-dark rounded overflow-hidden shrink-0">
                              <img
                                src={product.images[0]}
                                alt={product.alt}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium truncate">{product.name}</h4>
                              <p className="text-muted text-[11px] mt-0.5">{product.category}</p>
                              <p className="text-sm font-semibold mt-1">{formatPrice(product.price)}</p>
                            </div>
                            <ArrowRight size={16} className="self-center text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted text-lg mb-2">No blooms found for &ldquo;{query}&rdquo;</p>
                      <p className="text-muted text-sm">Try searching for flowers, bouquets, or keychains</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      <p className="flex items-center gap-2 text-muted text-[11px] uppercase tracking-[0.1em] mb-4">
                        <Clock size={13} /> Recent searches
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((term) => (
                          <button
                            key={term}
                            onClick={() => handleSearch(term)}
                            className="px-3 py-1.5 bg-cream-dark text-sm rounded-full hover:bg-line transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular Searches */}
                  <div>
                    <p className="flex items-center gap-2 text-muted text-[11px] uppercase tracking-[0.1em] mb-4">
                      <TrendingUp size={13} /> Popular searches
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((term) => (
                        <button
                          key={term}
                          onClick={() => handleSearch(term)}
                          className="px-3 py-1.5 bg-cream-dark text-sm rounded-full hover:bg-line transition-colors capitalize"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
