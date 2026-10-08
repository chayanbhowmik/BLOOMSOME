"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  Star,
  Minus,
  Plus,
  ShoppingBag,
  Zap,
  Truck,
  Shield,
  ChevronRight,
  ChevronLeft,
  Share2,
  Check,
} from "lucide-react";
import { useCommerce, useStorefrontProducts } from "@/lib/storefrontStore";
import { usePublicReviews } from "@/lib/publicContent";
import { formatPrice, formatDiscount } from "@/lib/utils";
import ProductCard from "@/components/product/ProductCard";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const products = useStorefrontProducts();
  const product = products.find((item) => item.slug === slug);
  const { addToCart, toggleWishlist, isWishlisted } = useCommerce();
  const reviews = usePublicReviews();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "details" | "reviews">("description");

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-[5vw]">
        <h1 className="text-2xl font-medium mb-3">Product not found</h1>
        <p className="text-muted mb-6">The bloom you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/shop" className="bg-ink text-ivory px-5 py-3 text-[12px] tracking-wide">
          Back to shop
        </Link>
      </div>
    );
  }

  const discount = product.oldPrice ? formatDiscount(product.price, product.oldPrice) : null;
  const productReviews = reviews.filter((r) => r.productId === product.id);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const nextImage = () => setSelectedImage((prev) => (prev + 1) % product.images.length);
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="px-[5vw] py-4 text-[11px] text-muted flex items-center gap-2">
        <Link href="/" className="hover:text-ink transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link href="/shop" className="hover:text-ink transition-colors">Shop</Link>
        <ChevronRight size={12} />
        <Link href={`/shop?category=${product.category}`} className="hover:text-ink transition-colors">{product.category}</Link>
        <ChevronRight size={12} />
        <span className="text-ink">{product.name}</span>
      </nav>

      {/* Product */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 px-[5vw] pb-16 lg:pb-24">
        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main Image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark mb-3">
            <img
              src={product.images[selectedImage]}
              alt={product.alt}
              className="w-full h-full object-cover"
            />

            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-ivory/90 flex items-center justify-center hover:bg-ivory transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-ivory/90 flex items-center justify-center hover:bg-ivory transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            {product.tag && (
              <span className="absolute top-4 left-4 bg-ivory text-[10px] px-3 py-2 font-medium tracking-wide">
                {product.tag}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? "border-ink" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Info */}
        <motion.div
          className="lg:py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <p className="text-muted text-[11px] uppercase tracking-[0.1em] mb-2">{product.category}</p>
          <h1 className="text-[clamp(28px,3.5vw,42px)] font-medium leading-tight tracking-[-0.02em] mb-3">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < Math.floor(product.rating) ? "#c9b82e" : "none"}
                  stroke={i < Math.floor(product.rating) ? "#c9b82e" : "#ccc"}
                  strokeWidth={1.5}
                />
              ))}
            </div>
            <span className="text-[12px] text-muted">{product.rating} ({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-2xl font-semibold">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <>
                <del className="text-muted text-base">{formatPrice(product.oldPrice)}</del>
                <span className="bg-yellow text-[11px] px-2 py-0.5 font-semibold">-{discount}%</span>
              </>
            )}
          </div>

          {/* Short description */}
          <p className="text-muted text-[14px] leading-relaxed mb-6 max-w-[450px]">
            {product.shortDescription}
          </p>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-6 text-[12px]">
            {product.inStock ? (
              <>
                <Check size={14} className="text-sage-deep" />
                <span className="text-sage-deep font-medium">
                  {product.stockQuantity && product.stockQuantity <= 5
                    ? `Only ${product.stockQuantity} left`
                    : "In stock"}
                </span>
              </>
            ) : (
              <span className="text-muted">Sold out</span>
            )}
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 1 && (
            <div className="mb-6">
              <p className="text-[11px] uppercase tracking-[0.1em] text-muted mb-3 font-medium">Color</p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className="px-3 py-1.5 border border-line text-[12px] hover:border-ink transition-colors"
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <p className="text-[11px] uppercase tracking-[0.1em] text-muted mb-3 font-medium">Quantity</p>
            <div className="flex items-center border border-line w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-3 hover:bg-cream-dark transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="px-5 py-3 text-[14px] font-medium border-x border-line min-w-[50px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-3 hover:bg-cream-dark transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-6">
            <button onClick={() => addToCart(product.id, quantity)} className="flex-1 flex items-center justify-center gap-3 bg-ink text-ivory py-4 text-[12px] tracking-wide hover:bg-ink/90 transition-colors">
              <ShoppingBag size={16} />
              Add to bag
            </button>
            <button onClick={() => { addToCart(product.id, quantity); window.location.href = "/cart"; }} className="flex items-center justify-center gap-3 border border-ink py-4 px-5 text-[12px] tracking-wide hover:bg-ink hover:text-ivory transition-colors">
              <Zap size={16} />
              Buy now
            </button>
            <button
              className="w-12 border border-line flex items-center justify-center hover:border-ink transition-colors"
              aria-label="Add to wishlist"
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart size={18} strokeWidth={1.5} fill={isWishlisted(product.id) ? "currentColor" : "none"} />
            </button>
            <button
              className="w-12 border border-line flex items-center justify-center hover:border-ink transition-colors"
              aria-label="Share"
            >
              <Share2 size={16} strokeWidth={1.5} />
            </button>
          </div>

          {/* Delivery info */}
          <div className="space-y-3 border-t border-line pt-6 mb-6">
            <div className="flex items-center gap-3 text-[12px]">
              <Truck size={16} className="text-muted" />
              <span>Estimated delivery: {product.estimatedDelivery}</span>
            </div>
            <div className="flex items-center gap-3 text-[12px]">
              <Shield size={16} className="text-muted" />
              <span>Free shipping on orders above ₹999</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-line">
            <div className="flex gap-6 border-b border-line">
              {(["description", "details", "reviews"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 text-[12px] uppercase tracking-wide border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-ink font-medium"
                      : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  {tab === "reviews" ? `Reviews (${productReviews.length})` : tab}
                </button>
              ))}
            </div>

            <div className="py-6">
              {activeTab === "description" && (
                <p className="text-muted text-[14px] leading-[1.8] max-w-[500px]">
                  {product.description}
                </p>
              )}

              {activeTab === "details" && (
                <div className="space-y-4 text-[14px]">
                  <div>
                    <h4 className="font-medium mb-1">Materials</h4>
                    <ul className="text-muted space-y-1">
                      {product.materials.map((m) => (
                        <li key={m}>• {m}</li>
                      ))}
                    </ul>
                  </div>
                  {product.dimensions && (
                    <div>
                      <h4 className="font-medium mb-1">Dimensions</h4>
                      <p className="text-muted">{product.dimensions}</p>
                    </div>
                  )}
                  {product.careInstructions && (
                    <div>
                      <h4 className="font-medium mb-1">Care Instructions</h4>
                      <ul className="text-muted space-y-1">
                        {product.careInstructions.map((c) => (
                          <li key={c}>• {c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium mb-1">SKU</h4>
                    <p className="text-muted">{product.sku}</p>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  {productReviews.length > 0 ? (
                    <div className="space-y-6">
                      {productReviews.map((review) => (
                        <div key={review.id} className="border-b border-line pb-6 last:border-0">
                          <div className="flex items-center gap-1 mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                fill={i < review.rating ? "#c9b82e" : "none"}
                                stroke={i < review.rating ? "#c9b82e" : "#ccc"}
                                strokeWidth={1.5}
                              />
                            ))}
                          </div>
                          <p className="text-[14px] leading-relaxed text-muted mb-3">
                            &ldquo;{review.text}&rdquo;
                          </p>
                          <div className="flex items-center gap-2 text-[12px]">
                            <span className="font-medium">{review.userName}</span>
                            {review.isVerified && (
                              <span className="text-sage-deep text-[10px] uppercase tracking-wide flex items-center gap-1">
                                <Check size={10} /> Verified
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted text-[14px]">No reviews yet. Be the first to review this product!</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-cream-dark px-[5vw] py-16 lg:py-20">
          <h2 className="text-[clamp(24px,3vw,36px)] font-medium leading-tight tracking-[-0.02em] mb-10">
            You may also <em className="font-display font-medium">like.</em>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {relatedProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
