"use client";

import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRef, useState } from "react";

interface StoryItem {
  name: string;
  badge?: string;
  icon: string; // emoji or clean icon illustration
  href: string;
}

const stories: StoryItem[] = [
  { name: "Diwali", badge: "8th Nov", icon: "🪔", href: "/shop?occasion=Diwali" },
  { name: "Same Day", badge: "⚡ Fast", icon: "🛵", href: "/shop?tag=same-day" },
  { name: "Flowers", icon: "💐", href: "/shop?category=Flowers" },
  { name: "Cakes", icon: "🎂", href: "/shop?category=Cakes" },
  { name: "Personalised", icon: "🖼️", href: "/custom" },
  { name: "Plants", icon: "🪴", href: "/shop?category=Plants" },
  { name: "Chocolates", icon: "🍫", href: "/shop?category=Chocolates" },
  { name: "Hampers", icon: "🎁", href: "/shop?category=Gift+Boxes" },
  { name: "Balloon Decor", icon: "🎈", href: "/shop?category=Decor" },
  { name: "Corporate", icon: "💼", href: "/contact?type=corporate" },
  { name: "Trendy Gifts", badge: "Hot", icon: "✨", href: "/shop?tag=trending" },
  { name: "LUXE Gifts", badge: "Royal", icon: "👑", href: "/collections" },
];

export default function CategoryStoryBar() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -240 : 240,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative border-b border-line bg-cream/40 py-3 lg:py-4">
      <div className="px-[3vw] lg:px-[4vw] relative">
        <div
          ref={scrollRef}
          className="flex items-center gap-4 sm:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide py-1"
        >
          {stories.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform hover:-translate-y-0.5"
            >
              <div className="relative">
                {item.badge && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-yellow text-ink text-[8px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap shadow-xs z-10 scale-90">
                    {item.badge}
                  </span>
                )}
                <div className="w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-full bg-ivory border border-line shadow-xs flex items-center justify-center text-2xl sm:text-[26px] group-hover:border-sage-deep group-hover:shadow-md transition-all">
                  {item.icon}
                </div>
              </div>
              <span className="text-[11px] sm:text-[12px] font-medium text-ink/85 group-hover:text-sage-deep text-center whitespace-nowrap">
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Scroll right hint arrow on desktop */}
        <button
          onClick={() => scroll("right")}
          className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-ivory/95 rounded-full shadow-md items-center justify-center hover:bg-cream border border-line"
          aria-label="Scroll categories right"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
