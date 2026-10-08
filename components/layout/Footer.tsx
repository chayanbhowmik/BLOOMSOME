"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/Icons";

const shopLinks = [
  { label: "Flowers", href: "/shop?category=Flowers" },
  { label: "Bouquets", href: "/shop?category=Bouquets" },
  { label: "Keychains", href: "/shop?category=Keychains" },
  { label: "Gift Boxes", href: "/shop?category=Gift+Boxes" },
  { label: "Custom Gifts", href: "/custom" },
];

const helpLinks = [
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Track Order", href: "/track-order" },
  { label: "Shipping", href: "/shipping-policy" },
  { label: "Returns", href: "/return-policy" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Our Story", href: "/about#our-story" },
  { label: "Instagram", href: "https://instagram.com/bloomsome", external: true },
];

const legalLinks = [
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
  { label: "Refund Policy", href: "/return-policy" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      {/* Newsletter section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[8vw] px-[5vw] lg:px-[8vw] py-20 lg:py-28 border-b border-white/10">
        <div>
          <p className="text-muted text-[11px] uppercase tracking-[0.12em] mb-5 flex items-center gap-2">
            A note from us
          </p>
          <h2 className="text-[clamp(36px,4vw,55px)] font-medium leading-[0.95] tracking-[-0.04em] mb-0">
            Get little blooms<br />
            <em className="font-display font-medium">in your inbox.</em>
          </h2>
        </div>
        <div className="max-w-[430px]">
          <p className="text-[#aeb3a7] text-[13px] leading-relaxed mb-6">
            For first dibs on new drops, gifting notes and good things.
          </p>
          <form
            className="flex border-b border-ivory/40 mb-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="bg-transparent outline-none py-3 w-full text-ivory placeholder:text-[#aeb3a7]"
              required
            />
            <button type="submit" className="p-3 hover:opacity-70 transition-opacity" aria-label="Subscribe">
              <ArrowRight size={18} />
            </button>
          </form>
          <small className="text-[#aeb3a7] text-[10px]">
            By subscribing, you agree to receive occasional notes from BLOOMSOME.
          </small>
        </div>
      </div>

      {/* Links */}
      <div className="grid grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr] gap-10 lg:gap-6 px-[5vw] lg:px-[8vw] py-14 lg:py-16">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-1 mb-4 lg:mb-0">
          <Link href="/" className="inline-block" aria-label="BLOOMSOME">
            <Image
              src="/logo.png"
              alt="BLOOMSOME"
              width={160}
              height={48}
              className="h-10 w-auto object-contain brightness-0 invert"
            />
          </Link>
          <p className="text-[#aeb3a7] font-display text-xl leading-tight mt-6 italic">
            Little blooms,<br />big feelings.
          </p>
          <div className="flex gap-4 mt-8">
            <a
              href="https://instagram.com/bloomsome"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#aeb3a7] hover:text-ivory transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#aeb3a7] hover:text-ivory transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
            <a
              href="https://facebook.com/bloomsome"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#aeb3a7] hover:text-ivory transition-colors"
              aria-label="Facebook"
            >
              <FacebookIcon size={18} />
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-[#aeb3a7] text-[10px] font-normal uppercase tracking-[0.1em] mb-5">
            Shop
          </h4>
          {shopLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-[12px] mb-3 hover:opacity-60 transition-opacity"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Help */}
        <div>
          <h4 className="text-[#aeb3a7] text-[10px] font-normal uppercase tracking-[0.1em] mb-5">
            Help
          </h4>
          {helpLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-[12px] mb-3 hover:opacity-60 transition-opacity"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Company */}
        <div>
          <h4 className="text-[#aeb3a7] text-[10px] font-normal uppercase tracking-[0.1em] mb-5">
            Company
          </h4>
          {companyLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-[12px] mb-3 hover:opacity-60 transition-opacity"
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-[#aeb3a7] text-[10px] font-normal uppercase tracking-[0.1em] mb-5">
            Legal
          </h4>
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-[12px] mb-3 hover:opacity-60 transition-opacity"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 px-[5vw] lg:px-[8vw] py-4 text-[#aeb3a7] text-[10px]">
        <span>© {new Date().getFullYear()} BLOOMSOME. All rights reserved.</span>
        <span>Made in India, with love.</span>
      </div>
    </footer>
  );
}
