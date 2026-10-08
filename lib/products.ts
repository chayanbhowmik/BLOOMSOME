import type { Category, Collection, FAQ, Product, Review } from "./types";

// Firestore is the source of truth. These exports remain for route compatibility only.
export const products: Product[] = [];
export const categories: Category[] = [];
export const collections: Collection[] = [];
export const reviews: Review[] = [];
export const faqs: FAQ[] = [];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCollection(slug: string) {
  return products.filter((product) => product.collection === slug);
}

export function getFeaturedProducts() {
  return products.filter((product) => product.isFeatured || product.isBestSeller);
}

export function searchProducts(query: string) {
  const normalized = query.trim().toLowerCase();
  return products.filter((product) => `${product.name} ${product.category} ${product.tags.join(" ")}`.toLowerCase().includes(normalized));
}
