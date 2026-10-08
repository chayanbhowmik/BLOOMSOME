"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  Gift,
  CheckCircle2,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

// Initial sample cart items
const initialItems = [
  {
    id: "cart-1",
    productId: "sunflower-bouquet",
    name: "Everlasting Sunflower Bouquet",
    variant: "Lush Medium (9 stems) / Sunshine Yellow",
    price: 1299,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=400&q=85",
  },
  {
    id: "cart-2",
    productId: "sunflower-keychain",
    name: "Sunflower Bag Charm & Keychain",
    variant: "Mini / Golden Hook",
    price: 349,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=400&q=85",
  },
];

export default function CartPage() {
  const [items, setItems] = useState(initialItems);
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [addGiftWrap, setAddGiftWrap] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as typeof initialItems
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === "BLOOM10" || clean === "FIRSTLOVE") {
      setAppliedDiscount({ code: clean, percent: 10 });
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code. Try BLOOM10");
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const giftWrapTotal = addGiftWrap && items.length > 0 ? 99 : 0;
  const discountAmount = appliedDiscount ? Math.round((subtotal * appliedDiscount.percent) / 100) : 0;
  const freeShippingThreshold = 1499;
  const shipping = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : 99;
  const finalTotal = subtotal - discountAmount + giftWrapTotal + shipping;
  const remainingForFreeShip = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <section className="border-b border-line px-[5vw] py-12 lg:py-16 text-center max-w-4xl mx-auto">
        <span className="inline-block text-[11px] font-mono tracking-[0.25em] text-muted uppercase mb-3">
          Your Bag
        </span>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-ink tracking-tight">
          Shopping <span className="italic font-serif">Bag</span> ({items.reduce((s, i) => s + i.quantity, 0)})
        </h1>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-[5vw] py-12">
        {orderComplete ? (
          <div className="bg-paper border border-line rounded-2xl p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 bg-sage/30 border border-sage/60 rounded-full flex items-center justify-center mx-auto text-emerald-800">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="font-display text-3xl text-ink font-light">
              Order Placed with Love!
            </h2>
            <p className="text-sm text-muted">
              Your order <strong className="text-ink font-mono">BLM-{Math.floor(10000 + Math.random() * 90000)}</strong> is confirmed. Our artisan will start handcrafting your everlasting blooms right away.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/track-order"
                className="w-full sm:w-auto bg-ink text-cream text-xs font-mono uppercase px-6 py-3 rounded-full hover:bg-ink/90"
              >
                Track Your Order
              </Link>
              <Link
                href="/shop"
                className="w-full sm:w-auto bg-paper border border-line text-ink text-xs font-mono uppercase px-6 py-3 rounded-full hover:border-ink"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Items List (Left 8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Free shipping banner */}
              <div className="bg-paper border border-line rounded-xl p-4">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-muted flex items-center gap-1.5">
                    <Truck size={14} className="text-ink" />
                    {remainingForFreeShip === 0 ? (
                      <strong className="text-emerald-800">You unlocked FREE Standard Shipping! 🎉</strong>
                    ) : (
                      <span>Add <strong>{formatPrice(remainingForFreeShip)}</strong> more for FREE Shipping</span>
                    )}
                  </span>
                  <span className="font-mono text-[11px] text-muted">
                    {Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))}%
                  </span>
                </div>
                <div className="h-1.5 bg-line rounded-full overflow-hidden">
                  <div
                    className="h-full bg-ink transition-all duration-500"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Items Table */}
              <div className="bg-paper border border-line rounded-2xl divide-y divide-line overflow-hidden shadow-sm">
                {items.map((item) => (
                  <div key={item.id} className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex gap-4 items-center">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-line bg-mist shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <Link href={`/product/${item.productId}`} className="hover:underline">
                          <h3 className="font-display text-base sm:text-lg font-medium text-ink truncate">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-muted mt-0.5">{item.variant}</p>
                        <span className="text-sm font-semibold text-ink mt-2 block sm:hidden">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-line">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-line rounded-lg bg-cream">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 text-muted hover:text-ink"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-8 text-center text-xs font-mono font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 text-muted hover:text-ink"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Line Price */}
                      <span className="font-bold text-sm text-ink hidden sm:block min-w-[70px] text-right">
                        {formatPrice(item.price * item.quantity)}
                      </span>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted hover:text-red-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gift Options */}
              <div className="bg-paper border border-line rounded-2xl p-6 sm:p-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-yellow/30 border border-yellow/50 flex items-center justify-center text-ink shrink-0">
                    <Gift size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-ink">Boutique Gift Wrapping & Wax-Sealed Note</h4>
                    <p className="text-xs text-muted">Includes kraft box, tissue paper, dried petal confetti, and calligraphy card</p>
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={addGiftWrap}
                    onChange={(e) => setAddGiftWrap(e.target.checked)}
                    className="w-4 h-4 rounded border-line text-ink accent-ink"
                  />
                  <span className="text-xs font-semibold font-mono">+₹99</span>
                </label>
              </div>
            </div>

            {/* Order Summary (Right 4 cols) */}
            <div className="lg:col-span-4 bg-paper border border-line rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm sticky top-28">
              <h3 className="font-display text-xl text-ink font-normal pb-4 border-b border-line">
                Order Summary
              </h3>

              {/* Coupon Form */}
              <form onSubmit={applyCoupon} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. BLOOM10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-cream border border-line rounded-xl px-3 py-2 text-xs uppercase focus:outline-none focus:border-ink"
                  />
                  <button
                    type="submit"
                    className="bg-ink text-cream px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-ink/90"
                  >
                    Apply
                  </button>
                </div>
                {appliedDiscount && (
                  <p className="text-[11px] text-emerald-800 font-mono">
                    ✓ Code &ldquo;{appliedDiscount.code}&rdquo; applied (-{appliedDiscount.percent}%)
                  </p>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600 font-mono">{couponError}</p>
                )}
              </form>

              {/* Cost Lines */}
              <div className="space-y-3 text-xs border-t border-line pt-4">
                <div className="flex justify-between text-muted">
                  <span>Subtotal</span>
                  <span className="font-medium text-ink">{formatPrice(subtotal)}</span>
                </div>
                {appliedDiscount && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Discount ({appliedDiscount.percent}%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                {addGiftWrap && (
                  <div className="flex justify-between text-muted">
                    <span>Gift Packaging</span>
                    <span className="font-medium text-ink">+{formatPrice(giftWrapTotal)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted">
                  <span>Shipping</span>
                  <span className="font-medium text-ink">
                    {shipping === 0 ? <strong className="text-emerald-800">FREE</strong> : formatPrice(shipping)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-line pt-4 flex items-baseline justify-between">
                <span className="text-base font-semibold text-ink">Grand Total</span>
                <span className="text-2xl font-bold font-sans text-ink">{formatPrice(finalTotal)}</span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => setOrderComplete(true)}
                className="w-full bg-ink text-cream py-4 rounded-xl text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-ink/90 transition-colors shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={14} />
              </button>

              <div className="space-y-2 pt-4 border-t border-line text-[11px] text-muted">
                <p className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-ink" />
                  <span>Secure 256-Bit SSL Encrypted Checkout</span>
                </p>
                <p className="flex items-center gap-2">
                  <Sparkles size={14} className="text-ink" />
                  <span>UPI, Cards, NetBanking, and COD Supported</span>
                </p>
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-paper border border-line rounded-2xl p-16 text-center max-w-md mx-auto space-y-4">
            <ShoppingBag size={40} className="mx-auto text-muted" />
            <h2 className="font-display text-2xl text-ink font-light">Your Bag is Empty</h2>
            <p className="text-xs text-muted">
              Looks like you haven&apos;t added any everlasting flowers to your bag yet.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-ink text-cream text-xs font-mono uppercase px-6 py-3 rounded-full hover:bg-ink/90 mt-2"
            >
              Explore Best Sellers
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
