"use client";

import { motion } from "framer-motion";
import { InstagramIcon } from "@/components/ui/Icons";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=85", alt: "Sunflower bouquet" },
  { src: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=85", alt: "Daisy flowers" },
  { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=85", alt: "Gift wrapping" },
  { src: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=85", alt: "Gift box" },
  { src: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=600&q=85", alt: "Pink rose" },
  { src: "https://images.unsplash.com/photo-1455582916367-25f75bfc6710?auto=format&fit=crop&w=600&q=85", alt: "Bouquet arrangement" },
];

export default function InstagramGallery() {
  return (
    <section className="py-16 lg:py-20">
      {/* Heading */}
      <div className="text-center mb-10 px-[5vw]">
        <p className="flex items-center justify-center gap-2 text-muted text-[11px] uppercase tracking-[0.12em] mb-5">
          <InstagramIcon size={14} /> Follow along
        </p>
        <h2 className="text-[clamp(28px,3.5vw,45px)] font-medium leading-[0.95] tracking-[-0.04em]">
          @bloomsome
        </h2>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-1">
        {galleryImages.map((img, index) => (
          <motion.a
            key={index}
            href="https://instagram.com/bloomsome"
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square overflow-hidden group"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors flex items-center justify-center">
              <InstagramIcon
                size={24}
                className="text-ivory opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
