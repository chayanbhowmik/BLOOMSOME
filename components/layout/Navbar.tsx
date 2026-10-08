"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Heart, Menu, User, X, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import SearchModal from "@/components/search/SearchModal";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Custom Gifts", href: "/custom" },
  { label: "About", href: "/about" },
  { label: "Track Order", href: "/track-order" },
];

const mobileNavLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Custom Gifts", href: "/custom" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Track Order", href: "/track-order" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 flex items-center justify-between h-[70px] lg:h-[82px] px-[5vw] border-b transition-all duration-300 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-md border-line shadow-sm"
            : "bg-cream border-line"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 py-1"
          aria-label="BLOOMSOME home"
        >
          <Image
            src="/logo.png"
            alt="BLOOMSOME"
            width={160}
            height={48}
            className="h-9 lg:h-11 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-8 ml-[8vw]" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] hover:opacity-55 transition-opacity duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4 lg:gap-5">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-1.5 hover:opacity-55 transition-opacity"
            aria-label="Search"
          >
            <Search size={19} strokeWidth={1.6} />
          </button>

          <Link
            href="/account"
            className="hidden lg:inline-flex p-1.5 hover:opacity-55 transition-opacity"
            aria-label="Account"
          >
            <User size={19} strokeWidth={1.6} />
          </Link>

          <Link
            href="/wishlist"
            className="hidden lg:inline-flex p-1.5 hover:opacity-55 transition-opacity"
            aria-label="Wishlist"
          >
            <Heart size={19} strokeWidth={1.6} />
          </Link>

          <Link
            href="/cart"
            className="flex items-center gap-1.5 p-1.5 hover:opacity-55 transition-opacity"
            aria-label="Shopping bag"
          >
            <ShoppingBag size={19} strokeWidth={1.6} />
            <span className="flex items-center justify-center w-[17px] h-[17px] bg-yellow rounded-full text-[10px] font-semibold text-ink">
              0
            </span>
          </Link>

          {/* Mobile menu trigger */}
          <button
            className="lg:hidden p-1.5"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={21} strokeWidth={1.6} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-cream z-50 p-7 flex flex-col"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <Image
                  src="/logo.png"
                  alt="BLOOMSOME"
                  width={140}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1"
                aria-label="Close menu"
              >
                <X size={23} strokeWidth={1.6} />
              </button>
            </div>

            <nav className="mt-16 flex-1">
              {mobileNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between border-b border-line py-5 text-2xl sm:text-[34px]"
                >
                  {link.label}
                  <ArrowRight size={18} />
                </Link>
              ))}
            </nav>

            <p className="text-muted font-display text-2xl italic mt-auto pb-6">
              Little blooms,<br />big feelings.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
