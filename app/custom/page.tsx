"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Check,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Gift,
  Heart,
  Palette,
  Flower2,
  Calendar,
  MessageSquareHeart,
  CheckCircle2,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

// Custom builder options
const occasions = [
  { id: "birthday", label: "Birthday", emoji: "🎂", desc: "Celebrate another year" },
  { id: "anniversary", label: "Anniversary", emoji: "💍", desc: "For lifelong memories" },
  { id: "valentines", label: "Romance & Valentine's", emoji: "🌹", desc: "Pure heartfelt love" },
  { id: "proposal", label: "Proposal", emoji: "✨", desc: "A forever yes" },
  { id: "friendship", label: "Friendship", emoji: "🌻", desc: "Bestie appreciation" },
  { id: "mothers-day", label: "Mother's Day", emoji: "🌸", desc: "For the warmest heart" },
  { id: "graduation", label: "Graduation", emoji: "🎓", desc: "Cheers to milestones" },
  { id: "just-because", label: "Just Because", emoji: "💛", desc: "Unexpected joy" },
];

const sizes = [
  { id: "mini", name: "Mini Posy", stems: "3 stems", price: 499, desc: "Delicate & sweet, fits on any desk" },
  { id: "small", name: "Classic Small", stems: "5-6 stems", price: 899, desc: "Our most popular everyday bunch" },
  { id: "medium", name: "Lush Medium", stems: "9-10 stems", price: 1499, desc: "Generous arrangement with fillers" },
  { id: "large", name: "Grand Bouquet", stems: "15-18 stems", price: 2399, desc: "Statement bouquet in premium wrap" },
  { id: "premium", name: "Masterpiece", stems: "24+ stems", price: 3499, desc: "The ultimate handcrafted floral sculpture" },
];

const flowerTypes = [
  { id: "sunflower", name: "Sunflowers", emoji: "🌻", desc: "Bright, cheerful & warm" },
  { id: "rose", name: "Forever Roses", emoji: "🌹", desc: "Timeless classic romance" },
  { id: "tulip", name: "Spring Tulips", emoji: "🌷", desc: "Graceful and elegant" },
  { id: "daisy", name: "Field Daisies", emoji: "🌼", desc: "Carefree & playful" },
  { id: "lavender", name: "Lavender Sprigs", emoji: "🪻", desc: "Calming botanical touch" },
  { id: "lily", name: "Stargazer Lilies", emoji: "🌺", desc: "Bold, exquisite petals" },
];

const palettes = [
  { id: "pastel", name: "Pastel Dream", colors: ["#F9D5E5", "#EEAC99", "#E06377", "#C8D6AF"], desc: "Soft blush, peach & mint" },
  { id: "sunshine", name: "Golden Sunset", colors: ["#F4D06F", "#FF8811", "#FFF8F0", "#392F5A"], desc: "Vibrant yellow, marigold & amber" },
  { id: "romantic", name: "Crimson Romance", colors: ["#9B111E", "#D8A47F", "#F4ACB7", "#681B2B"], desc: "Deep red, ruby & dusty pink" },
  { id: "lavender-mist", name: "Lavender Mist", colors: ["#C8B6FF", "#B8C0FF", "#E7C6FF", "#FFD6FF"], desc: "Lilac, wisteria & soft purple" },
  { id: "meadow", name: "Wild Meadow", colors: ["#84A98C", "#CAD2C5", "#F4A261", "#E76F51"], desc: "Earthy greens, terracotta & wild bloom" },
  { id: "custom", name: "Surprise Mix", colors: ["#FFADAD", "#FFD6A5", "#FDFFB6", "#CAFFBF"], desc: "Let our artisan pick a harmonious blend" },
];

const addOns = [
  { id: "card", name: "Handwritten Calligraphy Card", price: 99, desc: "Personalized message on wax-sealed parchment" },
  { id: "keychain", name: "Matching Mini Keychain", price: 199, desc: "Carry a pocket mini blossom everywhere" },
  { id: "luxury-box", name: "Keepsake Luxury Gift Box", price: 299, desc: "Embossed matte gift box with satin ribbon" },
  { id: "fairy-lights", name: "Warm LED Fairy Lights", price: 149, desc: "Pre-woven micro lights with switch" },
  { id: "polaroid", name: "Custom Polaroid Print", price: 99, desc: "Include your special photo memory inside" },
];

export default function CustomBouquetPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [occasion, setOccasion] = useState(occasions[0].id);
  const [size, setSize] = useState(sizes[1].id);
  const [selectedFlowers, setSelectedFlowers] = useState<string[]>(["sunflower", "daisy"]);
  const [palette, setPalette] = useState(palettes[0].id);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(["card"]);
  const [recipientName, setRecipientName] = useState("");
  const [personalMessage, setPersonalMessage] = useState("");
  const [isOrdered, setIsOrdered] = useState(false);

  const selectedSizeObj = sizes.find((s) => s.id === size) || sizes[1];
  const addOnsTotal = selectedAddOns.reduce((sum, id) => {
    const item = addOns.find((a) => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);
  const totalPrice = selectedSizeObj.price + addOnsTotal;

  const toggleFlower = (id: string) => {
    if (selectedFlowers.includes(id)) {
      if (selectedFlowers.length > 1) {
        setSelectedFlowers(selectedFlowers.filter((f) => f !== id));
      }
    } else {
      setSelectedFlowers([...selectedFlowers, id]);
    }
  };

  const toggleAddOn = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  const handleAddToCart = () => {
    setIsOrdered(true);
  };

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <section className="border-b border-line px-[5vw] py-12 lg:py-16 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-yellow/40 border border-yellow/60 px-3.5 py-1.5 rounded-full text-xs font-mono mb-3 text-ink">
          <Sparkles size={14} />
          <span>Bespoke Atelier</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-ink tracking-tight mb-4">
          Custom Bouquet <span className="italic font-serif">Builder</span>
        </h1>
        <p className="text-muted text-sm sm:text-base max-w-xl mx-auto">
          Tailor every petal, color palette, and detail. Handcrafted with love by our artisans for your special moment.
        </p>
      </section>

      {/* Main Builder Area */}
      <div className="max-w-7xl mx-auto px-[5vw] py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Steps & Controls (Left 8 cols) */}
          <div className="lg:col-span-8 bg-paper border border-line rounded-2xl p-6 sm:p-8 shadow-sm">
            
            {/* Step Navigation Indicator */}
            <div className="flex items-center justify-between border-b border-line pb-6 mb-8 overflow-x-auto gap-2">
              {[
                { step: 1, label: "Occasion", icon: Calendar },
                { step: 2, label: "Size", icon: Flower2 },
                { step: 3, label: "Flowers", icon: Heart },
                { step: 4, label: "Palette", icon: Palette },
                { step: 5, label: "Add-ons & Note", icon: Gift },
              ].map(({ step, label, icon: Icon }) => (
                <button
                  key={step}
                  onClick={() => setCurrentStep(step)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono whitespace-nowrap transition-colors ${
                    currentStep === step
                      ? "bg-ink text-cream font-medium"
                      : currentStep > step
                      ? "bg-sage/40 text-ink"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] border border-current">
                    {currentStep > step ? "✓" : step}
                  </span>
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-display font-medium text-ink">What is the occasion?</h2>
                    <p className="text-xs text-muted mt-1">This helps our florists tailor the mood, ribbon choice, and presentation.</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {occasions.map((occ) => {
                      const isSelected = occasion === occ.id;
                      return (
                        <button
                          key={occ.id}
                          onClick={() => setOccasion(occ.id)}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            isSelected
                              ? "border-ink bg-cream shadow-sm ring-1 ring-ink"
                              : "border-line bg-cream/40 hover:border-ink/30"
                          }`}
                        >
                          <span className="text-2xl block mb-2">{occ.emoji}</span>
                          <span className="block font-medium text-xs sm:text-sm text-ink">{occ.label}</span>
                          <span className="block text-[10px] text-muted mt-1 leading-tight">{occ.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-display font-medium text-ink">Choose Bouquet Size</h2>
                    <p className="text-xs text-muted mt-1">Select the volume and stem count for your arrangement.</p>
                  </div>

                  <div className="space-y-3">
                    {sizes.map((s) => {
                      const isSelected = size === s.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() => setSize(s.id)}
                          className={`w-full p-4 rounded-xl border flex items-center justify-between text-left transition-all ${
                            isSelected
                              ? "border-ink bg-cream shadow-sm ring-1 ring-ink"
                              : "border-line bg-cream/40 hover:border-ink/30"
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm text-ink">{s.name}</span>
                              <span className="text-[11px] font-mono text-muted bg-paper px-2 py-0.5 rounded border border-line">
                                {s.stems}
                              </span>
                            </div>
                            <p className="text-xs text-muted mt-1">{s.desc}</p>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-sm text-ink">{formatPrice(s.price)}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-display font-medium text-ink">Select Flower Varieties</h2>
                    <p className="text-xs text-muted mt-1">Pick 1 to 4 flower types you would like featured in your bouquet.</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {flowerTypes.map((flower) => {
                      const isSelected = selectedFlowers.includes(flower.id);
                      return (
                        <button
                          key={flower.id}
                          onClick={() => toggleFlower(flower.id)}
                          className={`p-4 rounded-xl border text-left relative transition-all ${
                            isSelected
                              ? "border-ink bg-cream shadow-sm ring-1 ring-ink"
                              : "border-line bg-cream/40 hover:border-ink/30"
                          }`}
                        >
                          {isSelected && (
                            <span className="absolute top-3 right-3 w-5 h-5 bg-ink text-cream rounded-full flex items-center justify-center text-[10px]">
                              ✓
                            </span>
                          )}
                          <span className="text-3xl block mb-2">{flower.emoji}</span>
                          <span className="block font-medium text-sm text-ink">{flower.name}</span>
                          <span className="block text-[11px] text-muted mt-1">{flower.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-display font-medium text-ink">Choose Color Palette</h2>
                    <p className="text-xs text-muted mt-1">Our artisans will craft the flowers using complementary pipe cleaner shades.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {palettes.map((pal) => {
                      const isSelected = palette === pal.id;
                      return (
                        <button
                          key={pal.id}
                          onClick={() => setPalette(pal.id)}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            isSelected
                              ? "border-ink bg-cream shadow-sm ring-1 ring-ink"
                              : "border-line bg-cream/40 hover:border-ink/30"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-3">
                            {pal.colors.map((c, i) => (
                              <span
                                key={i}
                                className="w-5 h-5 rounded-full border border-black/10 shadow-xs"
                                style={{ backgroundColor: c }}
                              />
                            ))}
                          </div>
                          <span className="block font-medium text-sm text-ink">{pal.name}</span>
                          <span className="block text-xs text-muted mt-0.5">{pal.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-display font-medium text-ink">Add-ons & Personal Note</h2>
                    <p className="text-xs text-muted mt-1">Make your bouquet truly memorable with handcrafted extras.</p>
                  </div>

                  <div className="space-y-3">
                    {addOns.map((add) => {
                      const isSelected = selectedAddOns.includes(add.id);
                      return (
                        <button
                          key={add.id}
                          onClick={() => toggleAddOn(add.id)}
                          className={`w-full p-3.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                            isSelected
                              ? "border-ink bg-cream shadow-sm ring-1 ring-ink"
                              : "border-line bg-cream/40 hover:border-ink/30"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs border ${isSelected ? "bg-ink text-cream border-ink" : "border-line bg-paper"}`}>
                              {isSelected ? "✓" : ""}
                            </span>
                            <div>
                              <span className="font-medium text-xs sm:text-sm text-ink">{add.name}</span>
                              <p className="text-[11px] text-muted">{add.desc}</p>
                            </div>
                          </div>
                          <span className="font-semibold text-xs sm:text-sm text-ink">+{formatPrice(add.price)}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Personal Note Fields */}
                  <div className="pt-4 border-t border-line space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
                        Recipient Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ananya, Mom, Bestie"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        className="w-full bg-cream border border-line rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
                        Handwritten Note Message
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Write your heartfelt note here... (Max 250 characters)"
                        maxLength={250}
                        value={personalMessage}
                        onChange={(e) => setPersonalMessage(e.target.value)}
                        className="w-full bg-cream border border-line rounded-xl p-4 text-sm focus:outline-none focus:border-ink resize-none"
                      />
                      <span className="text-[10px] font-mono text-muted text-right block mt-1">
                        {personalMessage.length}/250
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step Navigation Buttons */}
            <div className="flex items-center justify-between border-t border-line pt-6 mt-8">
              {currentStep > 1 ? (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted hover:text-ink px-4 py-2 rounded-lg border border-line"
                >
                  <ArrowLeft size={14} />
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < 5 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider bg-ink text-cream px-6 py-2.5 rounded-lg hover:bg-ink/90 transition-colors"
                >
                  Next Step
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider bg-ink text-cream px-6 py-2.5 rounded-lg hover:bg-ink/90 transition-colors"
                >
                  Review & Add to Bag
                  <ShoppingBag size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Live Order Summary (Right 4 cols) */}
          <div className="lg:col-span-4 bg-paper border border-line rounded-2xl p-6 sm:p-8 sticky top-28 shadow-sm">
            <h3 className="font-display text-lg font-medium text-ink pb-4 border-b border-line">
              Custom Creation Summary
            </h3>

            <div className="py-4 space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-muted">Occasion</span>
                <span className="font-medium capitalize">{occasions.find((o) => o.id === occasion)?.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Bouquet Size</span>
                <span className="font-medium">{selectedSizeObj.name} ({selectedSizeObj.stems})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Flowers</span>
                <span className="font-medium text-right max-w-[180px] truncate">
                  {selectedFlowers.map((f) => flowerTypes.find((t) => t.id === f)?.name).join(", ")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Palette</span>
                <span className="font-medium">{palettes.find((p) => p.id === palette)?.name}</span>
              </div>
              {selectedAddOns.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted">Add-ons ({selectedAddOns.length})</span>
                  <span className="font-medium">+{formatPrice(addOnsTotal)}</span>
                </div>
              )}
              {recipientName && (
                <div className="flex justify-between">
                  <span className="text-muted">To</span>
                  <span className="font-medium italic">{recipientName}</span>
                </div>
              )}
            </div>

            <div className="border-t border-line pt-4 my-2">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-sm font-medium">Estimated Total</span>
                <span className="text-xl font-bold font-sans">{formatPrice(totalPrice)}</span>
              </div>

              {isOrdered ? (
                <div className="bg-sage/30 border border-sage/50 text-ink p-4 rounded-xl text-center space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                    <CheckCircle2 size={16} />
                    Added to Bag!
                  </div>
                  <p className="text-[11px] text-muted">
                    Your bespoke bouquet configuration has been saved.
                  </p>
                  <Link
                    href="/cart"
                    className="block w-full bg-ink text-cream text-xs py-2.5 rounded-lg hover:bg-ink/90 font-mono uppercase tracking-wider mt-2"
                  >
                    View Bag & Checkout
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-ink text-cream py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-ink/90 transition-colors shadow-sm"
                >
                  <ShoppingBag size={15} />
                  Add Custom Gift to Bag
                </button>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-line space-y-2 text-[11px] text-muted">
              <p className="flex items-center gap-2">
                <span>⏱️</span>
                <span>Crafting time: 3-5 business days</span>
              </p>
              <p className="flex items-center gap-2">
                <span>📦</span>
                <span>Includes bubble & fragile protective packaging</span>
              </p>
              <p className="flex items-center gap-2">
                <span>✨</span>
                <span>100% Everlasting — Never wilts</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
