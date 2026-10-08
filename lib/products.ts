import type { Category, Collection, FAQ, Product, Review } from "./types";

export const defaultProducts: Product[] = [
  {
    id: "prod-1",
    slug: "white-orchid-classic-bloom",
    name: "White Orchid Classic Bloom",
    category: "Flowers",
    price: 599,
    oldPrice: 799,
    rating: 4.8,
    reviews: 142,
    images: [
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=85"
    ],
    alt: "White Orchid Classic Bloom Bouquet",
    tag: "Bestseller",
    tone: "sage",
    description: "An elegant, everlasting bouquet of handcrafted white orchids tied with a baby blue satin bow.",
    shortDescription: "Handcrafted everlasting white orchids with satin ribbon.",
    materials: ["Cotton Yarn", "Eco Felt", "Satin Ribbon"],
    estimatedDelivery: "2 - 3 Days",
    inStock: true,
    sku: "FLW-WHT-001",
    isCustomizable: true,
    isBestSeller: true,
    isFeatured: true,
    isNew: false,
    occasions: ["Birthday", "Anniversary", "Just Because"],
    tags: ["orchid", "white", "elegant", "bouquet", "fresh"]
  },
  {
    id: "prod-2",
    slug: "enchanted-red-rose-glow",
    name: "Enchanted Red Rose Glow Dome",
    category: "Flowers",
    price: 1099,
    oldPrice: 1249,
    rating: 4.9,
    reviews: 218,
    images: [
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=85"
    ],
    alt: "Enchanted Red Rose Glow in glass jar with fairy lights",
    tag: "12% OFF",
    tone: "coral",
    description: "Deep scarlet handmade roses encased with warm fairy lights and rustic jute bow wrap.",
    shortDescription: "Handmade roses with warm LED fairy lights in glass vessel.",
    materials: ["Velvet Yarn", "Glass Vessel", "Warm Micro-LEDs"],
    estimatedDelivery: "Next Day Available",
    inStock: true,
    sku: "FLW-RED-002",
    isCustomizable: true,
    isBestSeller: true,
    isFeatured: true,
    isNew: true,
    occasions: ["Valentine's Day", "Anniversary", "Birthday"],
    tags: ["rose", "lights", "romantic", "red", "glass"]
  },
  {
    id: "prod-3",
    slug: "pastel-poise-luxe-arrangement",
    name: "Pastel Poise LUXE Arrangement",
    category: "Flowers",
    price: 3999,
    oldPrice: 4599,
    rating: 5.0,
    reviews: 86,
    images: [
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=85"
    ],
    alt: "Pastel Poise LUXE Arrangement in Gold Vase",
    tag: "LUXE",
    tone: "pink",
    description: "A lavish botanical masterpiece featuring soft blush roses, lavender hydrangeas, and peonies in a brass metallic pedestal.",
    shortDescription: "Grand luxury botanical centerpiece in brass vase.",
    materials: ["Premium Mulberry Silk", "Brass Pedestal", "Satin Ribbons"],
    estimatedDelivery: "2 - 4 Days",
    inStock: true,
    sku: "LUX-PST-003",
    isCustomizable: false,
    isBestSeller: true,
    isFeatured: true,
    isNew: false,
    occasions: ["Anniversary", "Wedding", "Celebrations"],
    tags: ["luxe", "pastel", "centerpiece", "peonies", "roses"]
  },
  {
    id: "prod-4",
    slug: "sunlit-charm-sunflower-daisy",
    name: "Sunlit Charm Sunflower & Daisy Bunch",
    category: "Bouquets",
    price: 2399,
    oldPrice: 2799,
    rating: 4.8,
    reviews: 164,
    images: [
      "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=85"
    ],
    alt: "Sunlit Charm Sunflower & Daisy Bunch",
    tag: "Bestseller",
    tone: "yellow",
    description: "Bright yellow handmade sunflowers paired with cheerful daisies and lush greenery wrapped in kraft paper.",
    shortDescription: "Cheerful sunflowers & daisies in hand-tied bouquet.",
    materials: ["Soft Cotton Yarn", "Floral Wire", "Eco Kraft Paper"],
    estimatedDelivery: "Same Day in Select Cities",
    inStock: true,
    sku: "BOU-SUN-004",
    isCustomizable: true,
    isBestSeller: true,
    isFeatured: true,
    isNew: false,
    occasions: ["Birthday", "Get Well Soon", "Congratulations"],
    tags: ["sunflower", "daisy", "yellow", "joyful", "bouquet"]
  },
  {
    id: "prod-5",
    slug: "exotic-blue-orchid-splendor",
    name: "Exotic Blue Orchid Splendor",
    category: "Flowers",
    price: 699,
    oldPrice: 849,
    rating: 4.7,
    reviews: 93,
    images: [
      "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=85"
    ],
    alt: "Exotic Blue Orchid Splendor Bouquet",
    tag: "18% OFF",
    tone: "lavender",
    description: "Captivating azure and royal blue crochet orchids nestled in premium Korean tissue wrap.",
    shortDescription: "Royal blue handcrafted orchid bundle.",
    materials: ["Artisan Yarn", "Korean Matte Wrapping"],
    estimatedDelivery: "2 - 3 Days",
    inStock: true,
    sku: "FLW-BLU-005",
    isCustomizable: true,
    isBestSeller: false,
    isFeatured: true,
    isNew: true,
    occasions: ["Birthday", "Graduation"],
    tags: ["blue", "orchid", "unique", "exotic"]
  },
  {
    id: "prod-6",
    slug: "deluxe-artisan-gourmet-hamper",
    name: "Deluxe Artisan Bloom & Treats Hamper",
    category: "Gift Boxes",
    price: 2899,
    oldPrice: 3499,
    rating: 4.9,
    reviews: 112,
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=85"
    ],
    alt: "Deluxe Artisan Bloom & Treats Hamper Box",
    tag: "Trending",
    tone: "peach",
    description: "A luxury keepsake box packed with handcrafted mini flowers, artisanal chocolates, scented soy candle, and a handwritten card.",
    shortDescription: "Keepsake gift hamper with flowers, candle, and treats.",
    materials: ["Pine Wood Box", "Organic Soy Candle", "Handmade Flowers"],
    estimatedDelivery: "2 - 3 Days",
    inStock: true,
    sku: "HMP-DLX-006",
    isCustomizable: true,
    isBestSeller: true,
    isFeatured: true,
    isNew: false,
    occasions: ["Anniversary", "Festive", "Diwali", "Birthday"],
    tags: ["hamper", "luxury", "chocolates", "candle", "gift-box"]
  },
  {
    id: "prod-7",
    slug: "personalized-bloomsome-keepsake-frame",
    name: "Customised Botanical Memory Frame",
    category: "Personalised",
    price: 1499,
    oldPrice: 1799,
    rating: 4.9,
    reviews: 74,
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=85"
    ],
    alt: "Customised Botanical Memory Frame",
    tag: "Personalised",
    tone: "cream",
    description: "Solid oak glass frame with your chosen photo surrounded by real dried everlasting pressed florals and custom engraved message.",
    shortDescription: "Photo frame with real dried flowers & engraved text.",
    materials: ["Solid Oak", "Tempered Glass", "Dried Wildflowers"],
    estimatedDelivery: "3 - 5 Days",
    inStock: true,
    sku: "PER-FRM-007",
    isCustomizable: true,
    isBestSeller: true,
    isFeatured: true,
    isNew: true,
    occasions: ["Anniversary", "Birthday", "Mother's Day"],
    tags: ["personalised", "photo-frame", "pressed-flowers", "custom"]
  },
  {
    id: "prod-8",
    slug: "everlasting-mini-tulip-pot",
    name: "Everlasting Potted Tulip Charm",
    category: "Plants",
    price: 499,
    oldPrice: 599,
    rating: 4.8,
    reviews: 230,
    images: [
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=85"
    ],
    alt: "Everlasting Potted Tulip Charm in Ceramic Planter",
    tag: "Bestseller",
    tone: "peach",
    description: "Adorably miniature hand-crocheted tulip in a cute ceramic pot with faux moss bedding. Zero watering needed!",
    shortDescription: "Potted crochet tulip in ceramic planter.",
    materials: ["Cotton Yarn", "Ceramic Pot", "Preserved Moss"],
    estimatedDelivery: "2 - 3 Days",
    inStock: true,
    sku: "PLN-TLP-008",
    isCustomizable: true,
    isBestSeller: true,
    isFeatured: true,
    isNew: false,
    occasions: ["Just Because", "Desk Decor", "Birthday"],
    tags: ["tulip", "pot", "crochet", "desk-decor", "plant"]
  }
];

export const defaultCategories: Category[] = [
  {
    name: "Centerpiece Flower",
    slug: "centerpiece-flower",
    count: "18 Designs",
    description: "Opulent focal arrangements for dining tables & special celebrations",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=85",
    accent: "bg-[#ecf0e8]"
  },
  {
    name: "Orchid Flower",
    slug: "orchid-flower",
    count: "24 Designs",
    description: "Graceful handcrafted orchids with royal colors and silk bows",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=85",
    accent: "bg-[#f5ece5]"
  },
  {
    name: "Dried Flower",
    slug: "dried-flower",
    count: "16 Designs",
    description: "Preserved natural botanicals & rustic dried wildflower bunches",
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=600&q=85",
    accent: "bg-[#f5f0dc]"
  },
  {
    name: "Crochet Flower",
    slug: "crochet-flower",
    count: "32 Designs",
    description: "Everlasting knitted & yarn florals that stay vibrant forever",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=85",
    accent: "bg-[#f5efe8]"
  },
  {
    name: "Gift Hampers",
    slug: "gift-hampers",
    count: "15 Curations",
    description: "Luxury gift boxes pairing flowers with artisanal chocolates & candles",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=85",
    accent: "bg-[#eeebf0]"
  },
  {
    name: "Everlasting Plants",
    slug: "plants",
    count: "12 Designs",
    description: "Low-maintenance potted charms and succulent arrangements",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=85",
    accent: "bg-[#ecf0e8]"
  }
];

export const defaultReviews: Review[] = [
  {
    id: "rev-1",
    userName: "Ananya Sharma",
    rating: 5,
    text: "The handcrafted orchid bouquet looks even more beautiful in person! My mother was moved to tears on her birthday. Outstanding craftsmanship!",
    date: "2 days ago",
    isVerified: true
  },
  {
    id: "rev-2",
    userName: "Rohan Verma",
    rating: 5,
    text: "Ordered the customised photo memory frame for our anniversary. The dried flowers preserved inside the oak frame are breathtaking.",
    date: "1 week ago",
    isVerified: true
  },
  {
    id: "rev-3",
    userName: "Pooja Mehta",
    rating: 5,
    text: "Such quick delivery and the packaging was pure luxury! It really feels like receiving a warm hug in a box. Highly recommend BLOOMSOME!",
    date: "2 weeks ago",
    isVerified: true
  }
];

export const products: Product[] = defaultProducts;
export const categories: Category[] = defaultCategories;
export const collections: Collection[] = [];
export const reviews: Review[] = defaultReviews;
export const faqs: FAQ[] = [];

export function getProductBySlug(slug: string) {
  return defaultProducts.find((product) => product.slug === slug);
}

export function getProductsByCollection(slug: string) {
  return defaultProducts.filter((product) => product.collection === slug);
}

export function getFeaturedProducts() {
  return defaultProducts.filter((product) => product.isFeatured || product.isBestSeller);
}

export function searchProducts(query: string) {
  const normalized = query.trim().toLowerCase();
  return defaultProducts.filter((product) => `${product.name} ${product.category} ${product.tags.join(" ")}`.toLowerCase().includes(normalized));
}
