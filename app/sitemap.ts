import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bloomsome.store";

  const staticRoutes = [
    "",
    "/shop",
    "/collections",
    "/custom",
    "/about",
    "/faq",
    "/contact",
    "/track-order",
    "/cart",
    "/wishlist",
    "/shipping-policy",
    "/return-policy",
    "/privacy-policy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  return staticRoutes;
}
