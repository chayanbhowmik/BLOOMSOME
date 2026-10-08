"use client";

import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import type { Product, OrderStatus } from "./types";
import type { AdminOrder, AdminCustomer, AdminCoupon, AdminReview, AdminHomepageConfig, AdminCMS } from "./adminTypes";

const emptyHomepage: AdminHomepageConfig = { heroTitle: "", heroSubtitle: "", heroBadge: "", heroButtonText: "", heroButtonLink: "", heroSecondaryButtonText: "", heroSecondaryButtonLink: "", heroImages: [], marqueeItems: [], announcements: [], instagramImages: [] };
const emptyCMS: AdminCMS = { aboutStoryTitle: "", aboutStoryText: "", aboutMission: "", artisanPillars: [], faqs: [], shippingPolicy: "", returnPolicy: "", privacyPolicy: "", terms: "" };

function useLiveCollection<T extends { id: string }>(name: string) {
  const [items, setItems] = useState<T[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!auth || !db) return;
    let unsubscribe: (() => void) | undefined;
    const waitForAuth = auth.onAuthStateChanged((user) => {
      unsubscribe?.();
      if (user) unsubscribe = onSnapshot(collection(db, name), (snapshot) => setItems(snapshot.docs.map((item: any) => ({ id: item.id, ...item.data() } as T))), () => setError(`Unable to load ${name}. Check Firestore rules and configuration.`));
      else setItems([]);
    });
    return () => { waitForAuth(); unsubscribe?.(); };
  }, [name]);
  return { items, error };
}

function useSingleton<T>(name: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!auth || !db) return;
    let unsubscribe: (() => void) | undefined;
    const waitForAuth = auth.onAuthStateChanged((user) => {
      unsubscribe?.();
      if (user) unsubscribe = onSnapshot(doc(db, name, "config"), (snapshot) => { if (snapshot.exists()) setValue(snapshot.data() as T); }, () => setError(`Unable to load ${name}. Check Firestore rules and configuration.`));
      else setValue(fallback);
    });
    return () => { waitForAuth(); unsubscribe?.(); };
  }, [name, fallback]);
  return { value, error };
}

async function writeDocument(collectionName: string, id: string, value: unknown) {
  if (!db) throw new Error("Firebase is not configured.");
  await setDoc(doc(db, collectionName, id), value, { merge: true });
}
async function removeDocument(collectionName: string, id: string) {
  if (!db) throw new Error("Firebase is not configured.");
  await deleteDoc(doc(db, collectionName, id));
}

export function useAdminStore() {
  const productState = useLiveCollection<Product>("products");
  const orderState = useLiveCollection<AdminOrder>("orders");
  const customerState = useLiveCollection<AdminCustomer>("users");
  const couponState = useLiveCollection<AdminCoupon>("coupons");
  const reviewState = useLiveCollection<AdminReview>("reviews");
  const homepageState = useSingleton("homepage", emptyHomepage);
  const cmsState = useSingleton("content", emptyCMS);
  const addProduct = (product: Product) => writeDocument("products", product.id, product);
  const updateProduct = (id: string, updates: Partial<Product>) => writeDocument("products", id, updates);
  const deleteProduct = (id: string) => removeDocument("products", id);
  const updateOrderStatus = (id: string, status: OrderStatus) => writeDocument("orders", id, { status });
  const updateOrderTracking = (id: string, trackingNumber: string, carrier: string) => writeDocument("orders", id, { trackingNumber, carrier });
  const issueRefund = (id: string, refundAmount: number, refundReason: string) => writeDocument("orders", id, { paymentStatus: "Refunded", status: "refunded", refundAmount, refundReason });
  const updateCustomer = (id: string, updates: Partial<AdminCustomer>) => writeDocument("users", id, updates);
  const updateReviewStatus = (id: string, status: AdminReview["status"]) => writeDocument("reviews", id, { status });
  const deleteReview = (id: string) => removeDocument("reviews", id);
  const addCoupon = (coupon: AdminCoupon) => writeDocument("coupons", coupon.id, coupon);
  const updateCoupon = (id: string, updates: Partial<AdminCoupon>) => writeDocument("coupons", id, updates);
  const deleteCoupon = (id: string) => removeDocument("coupons", id);
  const updateHomepage = (updates: Partial<AdminHomepageConfig>) => writeDocument("homepage", "config", { ...homepageState.value, ...updates });
  const updateCMS = (updates: Partial<AdminCMS>) => writeDocument("content", "config", { ...cmsState.value, ...updates });
  const totalSales = orderState.items.reduce((sum, order) => sum + (order.total || 0), 0);
  const lowStockProducts = productState.items.filter((product) => (product.stockQuantity ?? 0) <= 5);
  return {
    products: productState.items, orders: orderState.items, customers: customerState.items, coupons: couponState.items, reviews: reviewState.items, homepage: homepageState.value, cms: cmsState.value,
    error: [productState.error, orderState.error, customerState.error, couponState.error, reviewState.error, homepageState.error, cmsState.error].find(Boolean) || "",
    stats: { totalSales, totalOrdersCount: orderState.items.length, pendingOrdersCount: orderState.items.filter((order) => ["pending", "processing", "confirmed"].includes(order.status)).length, averageOrderValue: orderState.items.length ? Math.round(totalSales / orderState.items.length) : 0, totalCustomersCount: customerState.items.length, lowStockCount: lowStockProducts.length, lowStockProducts },
    addProduct, updateProduct, deleteProduct, updateOrderStatus, updateOrderTracking, issueRefund, updateCustomer, updateReviewStatus, deleteReview, addCoupon, updateCoupon, deleteCoupon, updateHomepage, updateCMS,
    resetToDefaults: () => undefined,
  };
}
