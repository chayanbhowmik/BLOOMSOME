"use client";

import { motion } from "framer-motion";
import { Leaf, Clock, Heart, Package } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Handmade with love",
    description: "Every piece is crafted by hand, petal by petal, using premium pipe cleaners.",
    bg: "from-sage/30 to-sage/10",
  },
  {
    icon: Clock,
    title: "Flowers that last",
    description: "No water, no wilting. Our flowers stay beautiful for years, not days.",
    bg: "from-yellow/25 to-yellow/8",
  },
  {
    icon: Heart,
    title: "Thoughtful gifting",
    description: "Add personal messages, choose colors, and make every gift one of a kind.",
    bg: "from-pink/30 to-pink/10",
  },
  {
    icon: Package,
    title: "Gift-ready packaging",
    description: "Every order arrives in beautiful packaging, ready to make someone smile.",
    bg: "from-peach/30 to-peach/10",
  },
];

export default function WhyBloomsome() {
  return (
    <section className="px-[5vw] py-14 lg:py-20 bg-cream-dark">
      {/* Heading */}
      <div className="text-center mb-10 lg:mb-14">
        <div className="inline-flex items-center gap-2 bg-sage/30 text-ink text-[10px] font-medium uppercase tracking-[0.08em] px-3 py-1.5 rounded-full mb-5">
          ✦ The BLOOMSOME difference
        </div>
        <h2 className="text-[clamp(24px,3.5vw,36px)] font-semibold leading-[1.15] tracking-[-0.02em]">
          Why choose <em className="font-display font-medium">handmade?</em>
        </h2>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${feature.bg} p-7 lg:p-8 text-center group hover:shadow-md transition-shadow`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-14 h-14 mx-auto mb-5 bg-ivory/70 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                <Icon size={24} strokeWidth={1.5} className="text-ink" />
              </div>
              <h3 className="text-[15px] font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted text-[13px] leading-relaxed max-w-[220px] mx-auto">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
