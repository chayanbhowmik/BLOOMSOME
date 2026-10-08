"use client";

import { motion } from "framer-motion";
import { Leaf, Clock, Heart, Package } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Handmade with love",
    description: "Every piece is crafted by hand, petal by petal, using premium pipe cleaners.",
  },
  {
    icon: Clock,
    title: "Flowers that last",
    description: "No water, no wilting. Our flowers stay beautiful for years, not days.",
  },
  {
    icon: Heart,
    title: "Thoughtful gifting",
    description: "Add personal messages, choose colors, and make every gift one of a kind.",
  },
  {
    icon: Package,
    title: "Gift-ready packaging",
    description: "Every order arrives in beautiful packaging, ready to make someone smile.",
  },
];

export default function WhyBloomsome() {
  return (
    <section className="px-[5vw] py-20 lg:py-28">
      {/* Heading */}
      <div className="text-center mb-14">
        <p className="text-muted text-[11px] uppercase tracking-[0.12em] mb-5">
          The BLOOMSOME difference
        </p>
        <h2 className="text-[clamp(36px,4.5vw,65px)] font-medium leading-[0.95] tracking-[-0.04em]">
          Why choose<br />
          <em className="font-display font-medium">handmade?</em>
        </h2>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 max-w-5xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <div className="w-14 h-14 mx-auto mb-5 bg-sage/40 rounded-full flex items-center justify-center">
                <Icon size={22} strokeWidth={1.5} />
              </div>
              <h3 className="text-[15px] font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted text-[13px] leading-relaxed max-w-[240px] mx-auto">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
