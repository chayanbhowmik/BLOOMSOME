"use client";

import { useState, useEffect } from "react";
import { products as initialProducts, faqs as initialFaqs, reviews as initialReviews, collections } from "./products";
import type { Product } from "./types";
import type {
  AdminOrder,
  AdminCustomer,
  AdminCoupon,
  AdminReview,
  AdminHomepageConfig,
  AdminCMS,
} from "./adminTypes";

// ── Default Mock Orders ────────────────────────────────────────────────────────
const initialOrders: AdminOrder[] = [
  {
    id: "ord-1",
    orderNumber: "BLM-84920",
    customerName: "Riya Sharma",
    customerEmail: "riya.sharma@example.com",
    customerPhone: "+91 98765 43210",
    shippingAddress: "Flat 402, Lotus Greens, 100ft Road, Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
    status: "processing",
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    trackingNumber: "BD938201948",
    carrier: "BlueDart Express",
    customNotes: "Please tie with an extra cream satin ribbon.",
    customizationDetails: {
      occasion: "Birthday",
      size: "Medium (9 stems)",
      flowers: ["Sunflower", "Field Daisies"],
      palette: "Golden Sunset",
      addOns: ["Calligraphy Card", "Mini Keychain"],
      giftNote: "Happy 24th Birthday Riya! You brighten up every single day.",
      recipientName: "Riya",
    },
    items: [
      {
        productId: "sunflower-bouquet",
        productName: "Everlasting Sunflower Bouquet",
        variantName: "Medium (9 stems) / Sunshine Yellow",
        price: 1299,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=400&q=85",
      },
      {
        productId: "sunflower-keychain",
        productName: "Sunflower Bag Charm & Keychain",
        variantName: "Mini Stem",
        price: 349,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=400&q=85",
      },
    ],
    subtotal: 1648,
    discount: 0,
    shipping: 0,
    giftWrap: 99,
    total: 1747,
    createdAt: "2026-10-06T14:32:00Z",
    estimatedDelivery: "2026-10-11",
  },
  {
    id: "ord-2",
    orderNumber: "BLM-10293",
    customerName: "Aditya Kapoor",
    customerEmail: "aditya.k@example.com",
    customerPhone: "+91 99887 76655",
    shippingAddress: "B-12 Hill Road, Near Mehboob Studio, Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
    status: "shipped",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    trackingNumber: "DLH7729104",
    carrier: "Delhivery Logistics",
    items: [
      {
        productId: "forever-rose",
        productName: "Forever Red Rose Posy",
        variantName: "Single Stem Gift Box",
        price: 799,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=400&q=85",
      },
    ],
    subtotal: 799,
    discount: 80,
    shipping: 99,
    giftWrap: 0,
    total: 818,
    createdAt: "2026-10-04T09:15:00Z",
    estimatedDelivery: "2026-10-08",
  },
  {
    id: "ord-3",
    orderNumber: "BLM-72319",
    customerName: "Ananya Mehta",
    customerEmail: "ananya.m@example.com",
    customerPhone: "+91 91234 56789",
    shippingAddress: "302 Silver Heights, Ellisbridge",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "380006",
    status: "delivered",
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    trackingNumber: "XPR5543109",
    carrier: "Xpressbees",
    items: [
      {
        productId: "daisy-bouquet",
        productName: "Pastel Spring Daisy Bunch",
        variantName: "Standard Bunch",
        price: 999,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=400&q=85",
      },
    ],
    subtotal: 1998,
    discount: 200,
    shipping: 0,
    giftWrap: 99,
    total: 1897,
    createdAt: "2026-10-01T11:20:00Z",
    estimatedDelivery: "2026-10-05",
  },
  {
    id: "ord-4",
    orderNumber: "BLM-99104",
    customerName: "Kabir Sengupta",
    customerEmail: "kabir.sen@example.com",
    customerPhone: "+91 98301 22334",
    shippingAddress: "7A Southern Avenue",
    city: "Kolkata",
    state: "West Bengal",
    pincode: "700029",
    status: "pending",
    paymentMethod: "COD",
    paymentStatus: "Pending",
    items: [
      {
        productId: "custom-love-bouquet",
        productName: "Custom Proposal Bouquet",
        variantName: "Masterpiece (24+ stems)",
        price: 3499,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=400&q=85",
      },
    ],
    subtotal: 3499,
    discount: 0,
    shipping: 0,
    giftWrap: 299,
    total: 3798,
    createdAt: "2026-10-07T18:45:00Z",
    estimatedDelivery: "2026-10-14",
  },
];

// ── Default Customers ─────────────────────────────────────────────────────────
const initialCustomers: AdminCustomer[] = [
  {
    id: "cust-1",
    name: "Riya Sharma",
    email: "riya.sharma@example.com",
    phone: "+91 98765 43210",
    city: "Bengaluru",
    totalOrders: 3,
    totalSpent: 4850,
    lastOrderDate: "2026-10-06",
    status: "vip",
    notes: "Loves sunflower items and customized gift wraps.",
  },
  {
    id: "cust-2",
    name: "Aditya Kapoor",
    email: "aditya.k@example.com",
    phone: "+91 99887 76655",
    city: "Mumbai",
    totalOrders: 1,
    totalSpent: 818,
    lastOrderDate: "2026-10-04",
    status: "active",
  },
  {
    id: "cust-3",
    name: "Ananya Mehta",
    email: "ananya.m@example.com",
    phone: "+91 91234 56789",
    city: "Ahmedabad",
    totalOrders: 2,
    totalSpent: 3490,
    lastOrderDate: "2026-10-01",
    status: "active",
  },
  {
    id: "cust-4",
    name: "Kabir Sengupta",
    email: "kabir.sen@example.com",
    phone: "+91 98301 22334",
    city: "Kolkata",
    totalOrders: 1,
    totalSpent: 3798,
    lastOrderDate: "2026-10-07",
    status: "active",
    notes: "Custom proposal order with calligraphy card.",
  },
];

// ── Default Coupons ───────────────────────────────────────────────────────────
const initialCoupons: AdminCoupon[] = [
  {
    id: "coup-1",
    code: "BLOOM10",
    discountType: "percentage",
    discountValue: 10,
    minSpend: 499,
    usageLimit: 500,
    usageCount: 142,
    expiryDate: "2026-12-31",
    isActive: true,
    createdAt: "2026-08-01",
  },
  {
    id: "coup-2",
    code: "FIRSTLOVE",
    discountType: "percentage",
    discountValue: 15,
    minSpend: 899,
    maxDiscount: 300,
    usageLimit: 200,
    usageCount: 89,
    expiryDate: "2026-11-30",
    isActive: true,
    createdAt: "2026-09-01",
  },
  {
    id: "coup-3",
    code: "FESTIVE250",
    discountType: "fixed",
    discountValue: 250,
    minSpend: 1999,
    usageLimit: 100,
    usageCount: 12,
    expiryDate: "2026-10-31",
    isActive: true,
    createdAt: "2026-10-01",
  },
];

// ── Default Reviews ───────────────────────────────────────────────────────────
const initialAdminReviews: AdminReview[] = initialReviews.map((r) => ({
  ...r,
  status: "approved",
}));

// ── Default Homepage Config ───────────────────────────────────────────────────
const initialHomepageConfig: AdminHomepageConfig = {
  heroTitle: "Little blooms, big feelings.",
  heroSubtitle:
    "Handmade pipe-cleaner flowers, everlasting bouquets, and thoughtful keepsakes that never wilt.",
  heroBadge: "100% Handcrafted • Everlasting Flowers",
  heroButtonText: "Explore Collection",
  heroButtonLink: "/shop",
  heroSecondaryButtonText: "Custom Bouquet",
  heroSecondaryButtonLink: "/custom",
  heroImages: [
    "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=90",
  ],
  marqueeItems: [
    "Handmade with Love",
    "Flowers That Last Forever",
    "No Water Needed",
    "Bespoke Color Palettes",
    "Free Shipping on Orders > ₹1499",
    "Artisan Crafted Petals",
  ],
  announcements: [
    {
      id: "ann-1",
      announcementText: "✨ Handcrafted with love • Free standard delivery on orders above ₹1,499",
      announcementLink: "/shop",
      isActive: true,
    },
    {
      id: "ann-2",
      announcementText: "🌸 Use code BLOOM10 for 10% off your first handcrafted keepsake",
      announcementLink: "/shop",
      isActive: true,
    },
  ],
  instagramImages: [
    { id: "ig-1", src: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=85", alt: "Sunflower bouquet", url: "https://instagram.com/bloomsome.store" },
    { id: "ig-2", src: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=85", alt: "Daisy flowers", url: "https://instagram.com/bloomsome.store" },
    { id: "ig-3", src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=85", alt: "Gift wrapping", url: "https://instagram.com/bloomsome.store" },
    { id: "ig-4", src: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=85", alt: "Gift box", url: "https://instagram.com/bloomsome.store" },
    { id: "ig-5", src: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=600&q=85", alt: "Pink rose", url: "https://instagram.com/bloomsome.store" },
    { id: "ig-6", src: "https://images.unsplash.com/photo-1455582916367-25f75bfc6710?auto=format&fit=crop&w=600&q=85", alt: "Bouquet arrangement", url: "https://instagram.com/bloomsome.store" },
  ],
};

// ── Default CMS Content ───────────────────────────────────────────────────────
const initialCMS: AdminCMS = {
  aboutStoryTitle: "Little blooms, big feelings.",
  aboutStoryText:
    "BLOOMSOME was born from a simple observation: real flowers are breathtaking, but their beauty is painfully brief. We wanted to create blooms that hold your memories and feelings forever without fading away.",
  aboutMission:
    "To make everyday gifting emotional, aesthetic, thoughtful, and enduring — one handcrafted petal at a time.",
  artisanPillars: [
    { title: "Emotions over Objects", desc: "Every flower conveys deep affection and joy." },
    { title: "Everlasting Craft", desc: "Flowers that never wilt or need water." },
    { title: "Meticulous Attention", desc: "Hours of skilled human handcrafting per bouquet." },
    { title: "Thoughtful Gifting", desc: "Wax-sealed notes and bespoke gift packaging." },
  ],
  faqs: initialFaqs,
  shippingPolicy: "Ready-to-ship items dispatch in 1–2 days. Custom orders take 3–5 days to hand-craft.",
  returnPolicy: "7-day return window on non-custom items. Damaged items replaced free within 48h.",
  privacyPolicy: "256-bit encrypted data. We never sell personal information.",
  terms: "Handcrafted variations are natural hallmarks of artisan work.",
};

// ── Storage Keys ──────────────────────────────────────────────────────────────
const KEYS = {
  PRODUCTS: "bloomsome_admin_products",
  ORDERS: "bloomsome_admin_orders",
  CUSTOMERS: "bloomsome_admin_customers",
  COUPONS: "bloomsome_admin_coupons",
  REVIEWS: "bloomsome_admin_reviews",
  HOMEPAGE: "bloomsome_admin_homepage",
  CMS: "bloomsome_admin_cms",
};

// Safe helper to read from LocalStorage
function getStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

// Safe helper to write to LocalStorage
function setStored<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("bloomsome_store_updated"));
  } catch (err) {
    console.error("Storage error:", err);
  }
}

// ── Custom React Hook for Admin Store ──────────────────────────────────────────
export function useAdminStore() {
  const [products, setProductsState] = useState<Product[]>(() =>
    getStored(KEYS.PRODUCTS, initialProducts)
  );
  const [orders, setOrdersState] = useState<AdminOrder[]>(() =>
    getStored(KEYS.ORDERS, initialOrders)
  );
  const [customers, setCustomersState] = useState<AdminCustomer[]>(() =>
    getStored(KEYS.CUSTOMERS, initialCustomers)
  );
  const [coupons, setCouponsState] = useState<AdminCoupon[]>(() =>
    getStored(KEYS.COUPONS, initialCoupons)
  );
  const [reviews, setReviewsState] = useState<AdminReview[]>(() =>
    getStored(KEYS.REVIEWS, initialAdminReviews)
  );
  const [homepage, setHomepageState] = useState<AdminHomepageConfig>(() =>
    getStored(KEYS.HOMEPAGE, initialHomepageConfig)
  );
  const [cms, setCmsState] = useState<AdminCMS>(() =>
    getStored(KEYS.CMS, initialCMS)
  );

  useEffect(() => {
    const handleUpdate = () => {
      setProductsState(getStored(KEYS.PRODUCTS, initialProducts));
      setOrdersState(getStored(KEYS.ORDERS, initialOrders));
      setCustomersState(getStored(KEYS.CUSTOMERS, initialCustomers));
      setCouponsState(getStored(KEYS.COUPONS, initialCoupons));
      setReviewsState(getStored(KEYS.REVIEWS, initialAdminReviews));
      setHomepageState(getStored(KEYS.HOMEPAGE, initialHomepageConfig));
      setCmsState(getStored(KEYS.CMS, initialCMS));
    };

    window.addEventListener("bloomsome_store_updated", handleUpdate);
    return () => window.removeEventListener("bloomsome_store_updated", handleUpdate);
  }, []);

  // ── Product Actions ──────────────────────────────────────────────────────────
  const addProduct = (product: Product) => {
    const updated = [product, ...products];
    setProductsState(updated);
    setStored(KEYS.PRODUCTS, updated);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...updates } : p));
    setProductsState(updated);
    setStored(KEYS.PRODUCTS, updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProductsState(updated);
    setStored(KEYS.PRODUCTS, updated);
  };

  // ── Order Actions ────────────────────────────────────────────────────────────
  const updateOrderStatus = (orderId: string, status: AdminOrder["status"]) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    setOrdersState(updated);
    setStored(KEYS.ORDERS, updated);
  };

  const updateOrderTracking = (
    orderId: string,
    trackingNumber: string,
    carrier: string
  ) => {
    const updated = orders.map((o) =>
      o.id === orderId ? { ...o, trackingNumber, carrier } : o
    );
    setOrdersState(updated);
    setStored(KEYS.ORDERS, updated);
  };

  const issueRefund = (orderId: string, refundAmount: number, refundReason: string) => {
    const updated = orders.map((o) =>
      o.id === orderId
        ? {
            ...o,
            paymentStatus: "Refunded" as const,
            status: "refunded" as const,
            refundAmount,
            refundReason,
          }
        : o
    );
    setOrdersState(updated);
    setStored(KEYS.ORDERS, updated);
  };

  // ── Customer Actions ─────────────────────────────────────────────────────────
  const updateCustomer = (id: string, updates: Partial<AdminCustomer>) => {
    const updated = customers.map((c) => (c.id === id ? { ...c, ...updates } : c));
    setCustomersState(updated);
    setStored(KEYS.CUSTOMERS, updated);
  };

  // ── Review Actions ───────────────────────────────────────────────────────────
  const updateReviewStatus = (id: string, status: AdminReview["status"]) => {
    const updated = reviews.map((r) => (r.id === id ? { ...r, status } : r));
    setReviewsState(updated);
    setStored(KEYS.REVIEWS, updated);
  };

  const deleteReview = (id: string) => {
    const updated = reviews.filter((r) => r.id !== id);
    setReviewsState(updated);
    setStored(KEYS.REVIEWS, updated);
  };

  // ── Coupon Actions ───────────────────────────────────────────────────────────
  const addCoupon = (coupon: AdminCoupon) => {
    const updated = [coupon, ...coupons];
    setCouponsState(updated);
    setStored(KEYS.COUPONS, updated);
  };

  const updateCoupon = (id: string, updates: Partial<AdminCoupon>) => {
    const updated = coupons.map((c) => (c.id === id ? { ...c, ...updates } : c));
    setCouponsState(updated);
    setStored(KEYS.COUPONS, updated);
  };

  const deleteCoupon = (id: string) => {
    const updated = coupons.filter((c) => c.id !== id);
    setCouponsState(updated);
    setStored(KEYS.COUPONS, updated);
  };

  // ── Homepage & CMS Actions ───────────────────────────────────────────────────
  const updateHomepage = (updates: Partial<AdminHomepageConfig>) => {
    const updated = { ...homepage, ...updates };
    setHomepageState(updated);
    setStored(KEYS.HOMEPAGE, updated);
  };

  const updateCMS = (updates: Partial<AdminCMS>) => {
    const updated = { ...cms, ...updates };
    setCmsState(updated);
    setStored(KEYS.CMS, updated);
  };

  // ── Reset to Defaults ────────────────────────────────────────────────────────
  const resetToDefaults = () => {
    setProductsState(initialProducts);
    setOrdersState(initialOrders);
    setCustomersState(initialCustomers);
    setCouponsState(initialCoupons);
    setReviewsState(initialAdminReviews);
    setHomepageState(initialHomepageConfig);
    setCmsState(initialCMS);

    localStorage.removeItem(KEYS.PRODUCTS);
    localStorage.removeItem(KEYS.ORDERS);
    localStorage.removeItem(KEYS.CUSTOMERS);
    localStorage.removeItem(KEYS.COUPONS);
    localStorage.removeItem(KEYS.REVIEWS);
    localStorage.removeItem(KEYS.HOMEPAGE);
    localStorage.removeItem(KEYS.CMS);
  };

  // ── Computed Statistics ──────────────────────────────────────────────────────
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter(
    (o) => o.status === "pending" || o.status === "processing" || o.status === "confirmed"
  ).length;
  const lowStockProducts = products.filter((p) => (p.stockQuantity ?? 10) <= 5);
  const averageOrderValue = totalOrdersCount > 0 ? Math.round(totalSales / totalOrdersCount) : 0;
  const totalCustomersCount = customers.length;

  return {
    products,
    orders,
    customers,
    coupons,
    reviews,
    homepage,
    cms,
    stats: {
      totalSales,
      totalOrdersCount,
      pendingOrdersCount,
      averageOrderValue,
      totalCustomersCount,
      lowStockCount: lowStockProducts.length,
      lowStockProducts,
    },
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    updateOrderTracking,
    issueRefund,
    updateCustomer,
    updateReviewStatus,
    deleteReview,
    addCoupon,
    updateCoupon,
    deleteCoupon,
    updateHomepage,
    updateCMS,
    resetToDefaults,
  };
}
