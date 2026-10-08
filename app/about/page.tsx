import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Heart, Clock, ShieldCheck, ArrowRight, Flower2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — The Story of BLOOMSOME",
  description:
    "Discover the heart behind BLOOMSOME: everlasting handmade pipe-cleaner flowers crafted petal by petal to hold memories that never fade.",
};

const stats = [
  { value: "100%", label: "Handmade by Artisans" },
  { value: "5,000+", label: "Happy Moments Delivered" },
  { value: "0 ml", label: "Water Needed Ever" },
  { value: "∞", label: "Years of Lifespan" },
];

const pillars = [
  {
    icon: Heart,
    title: "Emotions over Objects",
    desc: "We don't just sell decor. Every flower is built to convey what words sometimes can't — deep affection, gentle support, quiet gratitude, or joyful celebration.",
  },
  {
    icon: Clock,
    title: "Everlasting Craft",
    desc: "Fresh flowers wilt in days, but BLOOMSOME blooms stay vibrant forever on your favorite shelf, desk, or bedside table as an enduring keepsake.",
  },
  {
    icon: Sparkles,
    title: "Meticulous Attention",
    desc: "From bending flexible inner wires to curling fuzzy pipe cleaners and tying satin bows, each piece takes hours of skilled hands and immense patience.",
  },
  {
    icon: ShieldCheck,
    title: "Thoughtful Gifting",
    desc: "Delivered in eco-conscious packaging with handwritten calligraphy notes and custom dried petal confetti for a magical unboxing feeling.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="px-[5vw] py-16 lg:py-24 max-w-5xl mx-auto text-center">
        <span className="inline-block text-[11px] font-mono tracking-[0.25em] text-muted uppercase mb-4">
          Our Story & Philosophy
        </span>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-ink tracking-tight mb-8">
          Little blooms, <span className="italic font-serif">big feelings.</span>
        </h1>
        <p className="text-muted text-base sm:text-xl leading-relaxed max-w-3xl mx-auto">
          BLOOMSOME was born from a simple observation: real flowers are breathtaking, but their beauty is painfully brief. We wanted to create blooms that hold your memories and feelings forever without fading away.
        </p>
      </section>

      {/* Visual Showcase */}
      <section className="px-[5vw] pb-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-line">
            <Image
              src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=85"
              alt="Artisan shaping pipe cleaner petals"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-line md:-translate-y-6">
            <Image
              src="https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=85"
              alt="Handcrafted bouquet with warm wrapping"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-line">
            <Image
              src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=85"
              alt="Artisan flower assembly"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-line bg-paper px-[5vw] py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-ink mb-1">
                {stat.value}
              </p>
              <p className="text-xs font-mono uppercase tracking-wider text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Making Process */}
      <section className="px-[5vw] py-20 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-mono tracking-[0.25em] text-muted uppercase block mb-2">
            The Craft
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink font-light">
            How a BLOOMSOME Flower Comes to Life
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-paper border border-line p-8 rounded-2xl">
            <span className="text-2xl font-mono text-muted block mb-4">01</span>
            <h3 className="font-display text-xl mb-2 text-ink">Sourcing & Shaping</h3>
            <p className="text-muted text-sm leading-relaxed">
              We select ultra-dense, velvety chenille stems with bendable alloy cores that hold intricate 3D curves without snapping or losing tension.
            </p>
          </div>

          <div className="bg-paper border border-line p-8 rounded-2xl">
            <span className="text-2xl font-mono text-muted block mb-4">02</span>
            <h3 className="font-display text-xl mb-2 text-ink">Petal Articulation</h3>
            <p className="text-muted text-sm leading-relaxed">
              Every petal is individually rolled, crimped, and woven together around floral wire stems to mimic the authentic geometry of nature.
            </p>
          </div>

          <div className="bg-paper border border-line p-8 rounded-2xl">
            <span className="text-2xl font-mono text-muted block mb-4">03</span>
            <h3 className="font-display text-xl mb-2 text-ink">Boutique Presentation</h3>
            <p className="text-muted text-sm leading-relaxed">
              Arrangements are gathered with delicate greenery, bundled in Korean-style waterproof frosted papers, and tied with bespoke fabric ribbons.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="border-t border-line bg-mist/30 px-[5vw] py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-mono tracking-[0.25em] text-muted uppercase block mb-2">
              Our Values
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-ink font-light">
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="bg-cream border border-line p-8 rounded-2xl flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-paper border border-line flex items-center justify-center shrink-0 text-ink">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium text-ink mb-2">{pillar.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-[5vw] py-20 text-center border-t border-line">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl text-ink font-light">
            Ready to give a gift that lasts forever?
          </h2>
          <p className="text-muted text-sm sm:text-base">
            Explore our curated catalog or create a custom bouquet that speaks directly to someone special.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-ink text-cream px-8 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider hover:bg-ink/90 transition-colors"
            >
              Shop All Flowers
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/custom"
              className="inline-flex items-center gap-2 bg-paper border border-line text-ink px-8 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider hover:border-ink transition-colors"
            >
              Custom Bouquet
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
