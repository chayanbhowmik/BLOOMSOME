import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All — Handmade Flowers & Gifts",
  description:
    "Browse BLOOMSOME's collection of handmade pipe cleaner flowers, everlasting bouquets, flower keychains, charms, and curated gift boxes.",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
