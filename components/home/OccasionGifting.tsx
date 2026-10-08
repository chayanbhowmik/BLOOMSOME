"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gift, Heart, Cake, GraduationCap, Sparkles, PartyPopper } from "lucide-react";

const occasions = [
  { name: "Birthday", icon: Cake, color: "bg-yellow/30", href: "/shop?occasion=Birthday" },
  { name: "Anniversary", icon: Heart, color: "bg-pink/50", href: "/shop?occasion=Anniversary" },
  { name: "Valentine's Day", icon: Heart, color: "bg-coral/40", href: "/shop?occasion=Valentine's+Day" },
  { name: "Mother's Day", icon: Sparkles, color: "bg-sage/50", href: "/shop?occasion=Mother's+Day" },
  { name: "Graduation", icon: GraduationCap, color: "bg-yellow/20", href: "/shop?occasion=Graduation" },
  { name: "Just Because", icon: Gift, color: "bg-peach/40", href: "/shop?occasion=Just+Because" },
];

export default function OccasionGifting() {
  return (
    <section className="px-[5vw] py-20 lg:py-28 bg-cream-dark">
      {/* Heading */}
      <div className="text-center mb-12">
        <p className="text-muted text-[11px] uppercase tracking-[0.12em] mb-5">
          Gifting made easy
        </p>
        <h2 className="text-[clamp(36px,4.5vw,65px)] font-medium leading-[0.95] tracking-[-0.04em]">
          Shop by<br />
          <em className="font-display font-medium">occasion.</em>
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
        {occasions.map((occasion, index) => {
          const Icon = occasion.icon;
          return (
            <motion.div
              key={occasion.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Link
                href={occasion.href}
                className="flex flex-col items-center gap-3 py-8 px-4 border border-line hover:border-ink/20 hover:shadow-sm transition-all group bg-cream"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${occasion.color} group-hover:scale-110 transition-transform`}>
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <span className="text-[12px] font-medium text-center">{occasion.name}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
