// ── Product Types ──────────────────────────────────────────────────────────────

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  images: string[];
  alt: string;
  tag?: string;
  tone: string;
  description: string;
  shortDescription: string;
  materials: string[];
  dimensions?: string;
  careInstructions?: string[];
  estimatedDelivery: string;
  inStock: boolean;
  stockQuantity?: number;
  sku: string;
  isCustomizable: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  isNew: boolean;
  colors?: string[];
  occasions?: string[];
  flowerTypes?: string[];
  tags: string[];
  collection?: string;
};

export type Category = {
  name: string;
  slug: string;
  count: string;
  description: string;
  image: string;
  accent: string;
};

export type Collection = {
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  image: string;
  productIds: string[];
};

// ── Cart Types ─────────────────────────────────────────────────────────────────

export type CartItem = {
  productId: string;
  quantity: number;
  customization?: BouquetCustomization;
};

// ── Custom Bouquet Types ───────────────────────────────────────────────────────

export type Occasion =
  | "birthday"
  | "anniversary"
  | "valentines"
  | "proposal"
  | "friendship"
  | "mothers-day"
  | "graduation"
  | "just-because"
  | "other";

export type BouquetSize = "mini" | "small" | "medium" | "large" | "premium";

export type FlowerType =
  | "rose"
  | "sunflower"
  | "tulip"
  | "daisy"
  | "lavender"
  | "lily"
  | "custom";

export type ColorPalette =
  | "red"
  | "pink"
  | "yellow"
  | "white"
  | "purple"
  | "blue"
  | "mixed"
  | "custom";

export type AddOn =
  | "keychain"
  | "mini-flower"
  | "greeting-card"
  | "gift-wrapping"
  | "photo"
  | "chocolate"
  | "custom-charm";

export type BouquetCustomization = {
  occasion: Occasion;
  size: BouquetSize;
  flowers: FlowerType[];
  colorPalette: ColorPalette;
  addOns: AddOn[];
  personalMessage?: string;
  recipientName?: string;
};

// ── Order Types ────────────────────────────────────────────────────────────────

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "handmade"
  | "packed"
  | "shipped"
  | "out-for-delivery"
  | "delivered"
  | "cancelled"
  | "returned"
  | "refunded";

export type Order = {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  createdAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  courier?: string;
};

// ── Review Types ───────────────────────────────────────────────────────────────

export type Review = {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  text: string;
  images?: string[];
  isVerified: boolean;
  createdAt: string;
};

// ── FAQ Types ──────────────────────────────────────────────────────────────────

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

// ── Contact Types ──────────────────────────────────────────────────────────────

export type ContactMessage = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};
