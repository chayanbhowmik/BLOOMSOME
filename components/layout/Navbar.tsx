"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  User,
  X,
  ArrowRight,
  MapPin,
  Calendar,
  Briefcase,
  ChevronDown,
  Gift,
  Sparkles,
  Flower2,
  Cake,
  Package,
  Palette,
  PartyPopper,
  MoreHorizontal,
  Check,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import SearchModal from "@/components/search/SearchModal";
import { useCommerce } from "@/lib/storefrontStore";

const topCategories = [
  {
    label: "Birthday",
    href: "/shop?occasion=Birthday",
    subItems: ["Birthday Flowers", "Birthday Cakes", "Personalised Gifts", "Midnight Delivery"],
  },
  {
    label: "Occasions",
    href: "/shop?category=Occasions",
    subItems: ["Diwali Special", "Boss Day", "Congratulations", "Housewarming", "Get Well Soon"],
  },
  {
    label: "Anniversary",
    href: "/shop?occasion=Anniversary",
    subItems: ["Romantic Flowers", "Couple Hampers", "Heart Bouquets", "Anniversary Cakes"],
  },
  {
    label: "Flowers",
    href: "/shop?category=Flowers",
    subItems: ["Orchids", "Roses", "Lilies", "Sunflowers", "Everlasting Dried Flowers"],
  },
  {
    label: "Cakes",
    href: "/shop?category=Cakes",
    subItems: ["Designer Cakes", "Chocolate Truffle", "Red Velvet", "Bento Mini Cakes"],
  },
  {
    label: "Personalised",
    href: "/custom",
    subItems: ["Photo Frames", "Custom Mugs", "Engraved Keepsakes", "Memory Boxes"],
  },
  {
    label: "Plants",
    href: "/shop?category=Plants",
    subItems: ["Potted Tulips", "Succulents", "Ceramic Planters", "Desk Beauties"],
  },
  {
    label: "Chocolates",
    href: "/shop?category=Chocolates",
    subItems: ["Handmade Truffles", "Gourmet Bars", "Chocolate Bouquets"],
  },
  {
    label: "LUXE",
    href: "/collections",
    subItems: ["Grand Centerpieces", "Luxury Hampers", "Premium Glass Domes"],
  },
  {
    label: "Hampers",
    href: "/shop?category=Gift+Boxes",
    subItems: ["Festive Gift Boxes", "Self Care Kits", "Gourmet Treat Baskets"],
  },
];

const quickCities = ["Mumbai", "Delhi NCR", "Bengaluru", "Hyderabad", "Kolkata", "Chennai", "Pune", "Ahmedabad"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>("Select City / Pincode");
  const [pincodeInput, setPincodeInput] = useState("");
  const { cartCount } = useCommerce();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleApplyPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincodeInput.trim()) {
      setSelectedCity(`PIN: ${pincodeInput.trim()}`);
      setLocationModalOpen(false);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled ? "bg-cream/95 backdrop-blur-md shadow-sm" : "bg-cream"
        }`}
      >
        {/* Main Header Top Row */}
        <div className="flex items-center justify-between h-[68px] lg:h-[78px] px-[3vw] lg:px-[4vw] border-b border-line gap-4">
          {/* Left: Logo & Location */}
          <div className="flex items-center gap-4 lg:gap-6">
            <Link href="/" className="shrink-0 flex items-center" aria-label="BLOOMSOME Home">
              <Image
                src="/logo.png"
                alt="BLOOMSOME"
                width={150}
                height={44}
                className="h-7 sm:h-9 lg:h-10 w-auto object-contain"
                priority
              />
            </Link>

            {/* Delivery Location Selector */}
            <button
              onClick={() => setLocationModalOpen(true)}
              className="hidden md:flex items-center gap-2 text-left p-1.5 rounded-lg hover:bg-cream-dark/60 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-sage/30 flex items-center justify-center text-sage-deep shrink-0">
                <MapPin size={16} />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-ink leading-tight">Where to deliver?</p>
                <p className="text-[10px] text-muted flex items-center gap-0.5 truncate max-w-[130px]">
                  {selectedCity} <ChevronDown size={10} />
                </p>
              </div>
            </button>
          </div>

          {/* Center: Search Bar & Finder */}
          <div className="flex-1 max-w-[540px] flex items-center gap-2.5">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center w-full bg-white border border-line rounded-lg px-3.5 py-2.5 text-[13px] text-muted hover:border-sage-deep transition-all shadow-xs gap-2.5 text-left"
            >
              <Search size={17} className="text-sage-deep shrink-0" />
              <span className="truncate">Search flowers, gifts, cakes, occasions...</span>
            </button>

            {/* FNP Style Finder Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-semibold text-ink bg-gradient-to-r from-yellow/30 via-peach/30 to-sage/30 border border-yellow/60 hover:shadow-xs transition-all shrink-0"
            >
              <Gift size={14} className="text-sage-deep" />
              <span>Finder</span>
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            {/* My Reminders */}
            <Link
              href="/account"
              className="hidden xl:flex flex-col items-center text-center gap-0.5 p-1 text-ink/80 hover:text-sage-deep transition-colors"
            >
              <Calendar size={19} strokeWidth={1.5} />
              <span className="text-[10px] font-medium leading-none">My Reminders</span>
            </Link>

            {/* Currency INR */}
            <div className="hidden xl:flex flex-col items-center text-center gap-0.5 p-1 text-ink/80 cursor-pointer">
              <span className="text-[14px] font-bold leading-none mt-0.5">₹</span>
              <span className="text-[10px] font-medium leading-none">INR</span>
            </div>

            {/* Corporate */}
            <Link
              href="/contact?type=corporate"
              className="hidden lg:flex flex-col items-center text-center gap-0.5 p-1 text-ink/80 hover:text-sage-deep transition-colors"
            >
              <Briefcase size={19} strokeWidth={1.5} />
              <span className="text-[10px] font-medium leading-none">Corporate</span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="flex flex-col items-center text-center gap-0.5 p-1 text-ink hover:text-sage-deep transition-colors relative"
            >
              <div className="relative">
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex items-center justify-center w-[17px] h-[17px] bg-yellow rounded-full text-[9px] font-bold text-ink border border-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:block text-[10px] font-medium leading-none">Cart</span>
            </Link>

            {/* Hi Guest / User */}
            <Link
              href="/account"
              className="flex flex-col items-center text-center gap-0.5 p-1 text-ink hover:text-sage-deep transition-colors"
            >
              <User size={20} strokeWidth={1.5} />
              <span className="hidden sm:block text-[10px] font-medium leading-none">Hi Guest</span>
            </Link>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden p-1.5 hover:bg-cream-dark rounded-md transition-colors"
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* Second Row: Full Category Strip Navigation with Dropdowns */}
        <nav
          className="hidden lg:block border-b border-line bg-cream relative"
          aria-label="Category Navigation"
        >
          <div className="flex items-center justify-between px-[3vw] lg:px-[4vw] overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-1 xl:gap-2">
              {topCategories.map((cat) => (
                <div
                  key={cat.label}
                  className="relative py-2.5"
                  onMouseEnter={() => handleMouseEnter(cat.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={cat.href}
                    className="flex items-center gap-1 px-2.5 py-1 text-[13px] font-medium text-ink hover:text-sage-deep rounded-md transition-colors whitespace-nowrap"
                  >
                    <span>{cat.label}</span>
                    <ChevronDown size={11} className="text-muted opacity-70" />
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {activeDropdown === cat.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 w-52 bg-white rounded-xl shadow-xl border border-line p-2 z-50"
                      >
                        <div className="py-1">
                          {cat.subItems.map((sub) => (
                            <Link
                              key={sub}
                              href={`${cat.href}&sub=${encodeURIComponent(sub)}`}
                              className="block px-3 py-2 text-[12px] font-medium text-ink hover:bg-cream hover:text-sage-deep rounded-lg transition-colors"
                            >
                              {sub}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Location Selector Modal */}
      <AnimatePresence>
        {locationModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative border border-line"
            >
              <button
                onClick={() => setLocationModalOpen(false)}
                className="absolute top-4 right-4 p-1 text-muted hover:text-ink"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-full bg-sage/30 flex items-center justify-center text-sage-deep">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-ink">Choose Delivery Location</h3>
                  <p className="text-[12px] text-muted">Select delivery city or enter your 6-digit pincode</p>
                </div>
              </div>

              {/* Pincode Input Form */}
              <form onSubmit={handleApplyPincode} className="flex gap-2 mb-6">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit pincode"
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value)}
                  className="flex-1 border border-line rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-sage-deep"
                />
                <button
                  type="submit"
                  className="bg-ink text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl hover:bg-ink/90 transition-colors"
                >
                  Apply
                </button>
              </form>

              {/* Quick Popular Cities */}
              <h4 className="text-[12px] font-bold text-muted uppercase tracking-wider mb-3">Popular Cities</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {quickCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setLocationModalOpen(false);
                    }}
                    className={`text-[12px] font-medium p-2.5 rounded-xl border text-center transition-all ${
                      selectedCity === city
                        ? "border-sage-deep bg-sage/20 text-ink font-bold"
                        : "border-line hover:border-sage-deep hover:bg-cream"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-cream z-50 p-6 flex flex-col overflow-y-auto"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <Link href="/" onClick={() => setMenuOpen(false)}>
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
                className="p-1.5 rounded-lg hover:bg-cream-dark"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Mobile Categories */}
            <div className="py-4 flex-1">
              <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-2">Categories</p>
              {topCategories.map((cat) => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-3.5 border-b border-line/60 text-[16px] font-medium text-ink"
                >
                  <span>{cat.label}</span>
                  <ArrowRight size={16} className="text-muted" />
                </Link>
              ))}

              <div className="mt-6 pt-4 border-t border-line">
                <Link
                  href="/custom"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 py-2.5 text-[14px] font-semibold text-sage-deep"
                >
                  <Sparkles size={16} /> Customise a Gift
                </Link>
                <Link
                  href="/track-order"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 py-2.5 text-[14px] font-medium text-ink"
                >
                  <Package size={16} /> Track Order
                </Link>
                <Link
                  href="/account"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 py-2.5 text-[14px] font-medium text-ink"
                >
                  <User size={16} /> My Account
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
