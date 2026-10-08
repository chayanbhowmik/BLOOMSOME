import type { Product, Category, Collection, FAQ, Review, OrderStatus } from "./types";

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: "super_admin" | "manager" | "artisan";
  lastLogin?: string;
};

export type AdminOrder = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  state: string;
  pincode: string;
  status: OrderStatus;
  paymentMethod: "UPI" | "Credit Card" | "Debit Card" | "NetBanking" | "COD";
  paymentStatus: "Paid" | "Pending" | "Refunded" | "Partially Refunded";
  trackingNumber?: string;
  carrier?: string;
  customNotes?: string;
  customizationDetails?: {
    occasion?: string;
    size?: string;
    flowers?: string[];
    palette?: string;
    addOns?: string[];
    giftNote?: string;
    recipientName?: string;
  };
  items: {
    productId: string;
    productName: string;
    variantName?: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  subtotal: number;
  discount: number;
  shipping: number;
  giftWrap: number;
  total: number;
  createdAt: string;
  estimatedDelivery?: string;
  refundReason?: string;
  refundAmount?: number;
};

export type AdminCustomer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: "active" | "vip" | "dormant";
  notes?: string;
};

export type AdminCoupon = {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minSpend: number;
  maxDiscount?: number;
  usageLimit: number;
  usageCount: number;
  expiryDate: string;
  isActive: boolean;
  createdAt: string;
};

export type AdminReview = Review & {
  status: "approved" | "pending" | "rejected";
  adminNotes?: string;
};

export type AdminHomepageBanner = {
  id: string;
  announcementText: string;
  announcementLink: string;
  isActive: boolean;
};

export type AdminHomepageConfig = {
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  heroButtonText: string;
  heroButtonLink: string;
  heroSecondaryButtonText: string;
  heroSecondaryButtonLink: string;
  heroImages: string[];
  marqueeItems: string[];
  announcements: AdminHomepageBanner[];
  instagramImages: { id: string; src: string; alt: string; url: string }[];
};

export type AdminCMS = {
  aboutStoryTitle: string;
  aboutStoryText: string;
  aboutMission: string;
  artisanPillars: { title: string; desc: string }[];
  faqs: FAQ[];
  shippingPolicy: string;
  returnPolicy: string;
  privacyPolicy: string;
  terms: string;
};
