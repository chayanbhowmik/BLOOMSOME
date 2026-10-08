import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://bloomsome.store"),
  title: {
    default: "BLOOMSOME — Little blooms, big feelings.",
    template: "%s | BLOOMSOME",
  },
  description:
    "Handmade pipe cleaner flowers, everlasting bouquets, flower keychains, charms, and personalized gifts. Made by hand, sent with heart.",
  keywords: [
    "handmade flowers",
    "pipe cleaner flowers",
    "everlasting flowers",
    "handmade bouquets",
    "flower keychains",
    "personalized gifts",
    "handmade gifts India",
    "gifts for girlfriend",
    "birthday gifts",
    "anniversary gifts",
  ],
  openGraph: {
    title: "BLOOMSOME — Little blooms, big feelings.",
    description: "Handmade flowers and thoughtful little gifts, made to last.",
    url: "https://bloomsome.store",
    siteName: "BLOOMSOME",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "BLOOMSOME — Little blooms, big feelings.",
    description: "Handmade flowers and thoughtful little gifts, made to last.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "any" },
      { url: "/favicon.ico" },
    ],
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-cream text-ink antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
