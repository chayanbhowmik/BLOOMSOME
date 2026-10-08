import type { Product, Category, Collection, Review, FAQ } from "./types";

// ── Products ───────────────────────────────────────────────────────────────────

export const products: Product[] = [
  {
    id: "sunflower-bouquet",
    slug: "sunflower-bouquet",
    name: "Sunshine, Wrapped",
    category: "Bouquets",
    price: 899,
    oldPrice: 1099,
    rating: 4.9,
    reviews: 42,
    images: [
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=900&q=85",
    ],
    alt: "A warm yellow sunflower bouquet wrapped in craft paper",
    tag: "Bestseller",
    tone: "yellow",
    description:
      "Bring sunshine into any room with this handcrafted sunflower bouquet. Each petal is carefully shaped from pipe cleaners to capture the warmth and joy of real sunflowers — but these ones last forever. Wrapped in natural kraft paper with a satin ribbon, it's the perfect gift for someone who lights up your life.",
    shortDescription: "Everlasting handmade sunflower bouquet",
    materials: ["Pipe cleaners", "Floral wire", "Kraft paper", "Satin ribbon"],
    dimensions: "25cm × 15cm (approximately)",
    careInstructions: [
      "Keep away from direct sunlight to preserve color",
      "Gently dust with a soft brush",
      "Do not wash or submerge in water",
      "Store in a cool, dry place",
    ],
    estimatedDelivery: "5-7 business days",
    inStock: true,
    stockQuantity: 15,
    sku: "BLOOM-SUN-BQT-001",
    isCustomizable: true,
    isBestSeller: true,
    isFeatured: true,
    isNew: false,
    colors: ["Yellow", "Green"],
    occasions: ["Birthday", "Anniversary", "Just Because", "Friendship"],
    flowerTypes: ["Sunflower"],
    tags: ["sunflower", "bouquet", "bestseller", "yellow", "cheerful", "handmade"],
    collection: "forever-flowers",
  },
  {
    id: "daisy-bouquet",
    slug: "daisy-bouquet",
    name: "Little Daisy Daydream",
    category: "Bouquets",
    price: 499,
    rating: 4.8,
    reviews: 28,
    images: [
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?auto=format&fit=crop&w=900&q=85",
    ],
    alt: "A mini daisy bouquet in soft pastel tones",
    tag: "New in",
    tone: "pink",
    description:
      "A dreamy little bouquet of handcrafted daisies, perfect for brightening someone's desk or bedside table. Each flower is made with love using premium pipe cleaners, creating a miniature garden that never wilts. Wrapped in soft tissue with a handwritten tag.",
    shortDescription: "Mini handmade daisy bouquet",
    materials: ["Pipe cleaners", "Floral wire", "Tissue paper", "Handwritten tag"],
    dimensions: "18cm × 12cm (approximately)",
    careInstructions: [
      "Keep away from direct sunlight",
      "Gently dust with a soft brush",
      "Do not wash or submerge in water",
    ],
    estimatedDelivery: "5-7 business days",
    inStock: true,
    stockQuantity: 22,
    sku: "BLOOM-DAI-BQT-001",
    isCustomizable: true,
    isBestSeller: false,
    isFeatured: true,
    isNew: true,
    colors: ["White", "Yellow", "Pink"],
    occasions: ["Birthday", "Friendship", "Just Because", "Mother's Day"],
    flowerTypes: ["Daisy"],
    tags: ["daisy", "bouquet", "mini", "pastel", "new", "handmade"],
    collection: "bouquets",
  },
  {
    id: "forever-rose",
    slug: "forever-rose",
    name: "The Forever Rose",
    category: "Flowers",
    price: 299,
    rating: 5.0,
    reviews: 17,
    images: [
      "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1455659817273-f96807779a8a?auto=format&fit=crop&w=900&q=85",
    ],
    alt: "A single handcrafted pink rose",
    tone: "coral",
    description:
      "One perfect rose that never fades. Handcrafted petal by petal from premium pipe cleaners, this single stem rose comes in a slim kraft box — making it the most thoughtful little gesture for someone special.",
    shortDescription: "Single everlasting handmade rose",
    materials: ["Pipe cleaners", "Floral wire", "Kraft box"],
    dimensions: "28cm stem length",
    careInstructions: [
      "Keep away from direct sunlight",
      "Handle gently to maintain petal shape",
      "Dust with a soft brush",
    ],
    estimatedDelivery: "3-5 business days",
    inStock: true,
    stockQuantity: 45,
    sku: "BLOOM-ROS-SGL-001",
    isCustomizable: false,
    isBestSeller: false,
    isFeatured: true,
    isNew: false,
    colors: ["Pink", "Red", "White", "Yellow"],
    occasions: ["Anniversary", "Valentine's Day", "Proposal", "Just Because"],
    flowerTypes: ["Rose"],
    tags: ["rose", "single", "romantic", "forever", "handmade", "gift"],
    collection: "forever-flowers",
  },
  {
    id: "lavender-bunch",
    slug: "lavender-bunch",
    name: "Lavender Hush",
    category: "Flowers",
    price: 599,
    rating: 4.9,
    reviews: 31,
    images: [
      "https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=900&q=85",
    ],
    alt: "A bunch of handcrafted lavender flowers",
    tone: "lavender",
    description:
      "A calming bunch of handmade lavender stems, perfect for adding a touch of serenity to any space. Each stem is carefully crafted with delicate purple pipe cleaners, tied together with a linen ribbon. Place them in a vase or display them as they are.",
    shortDescription: "Handmade lavender bunch with linen ribbon",
    materials: ["Pipe cleaners", "Floral wire", "Linen ribbon"],
    dimensions: "30cm × 10cm (approximately)",
    careInstructions: [
      "Keep away from direct sunlight",
      "Gently dust with a soft brush",
      "Do not wash",
    ],
    estimatedDelivery: "5-7 business days",
    inStock: true,
    stockQuantity: 18,
    sku: "BLOOM-LAV-BNC-001",
    isCustomizable: false,
    isBestSeller: true,
    isFeatured: false,
    isNew: false,
    colors: ["Purple", "Green"],
    occasions: ["Birthday", "Mother's Day", "Just Because", "Graduation"],
    flowerTypes: ["Lavender"],
    tags: ["lavender", "bunch", "purple", "calming", "handmade"],
    collection: "forever-flowers",
  },
  {
    id: "sunflower-keychain",
    slug: "sunflower-keychain",
    name: "Pocket Sunshine",
    category: "Keychains",
    price: 199,
    rating: 4.7,
    reviews: 56,
    images: [
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=85",
    ],
    alt: "A miniature sunflower keychain",
    tag: "Popular",
    tone: "yellow",
    description:
      "Carry a little sunshine wherever you go. This handcrafted sunflower keychain is made with mini pipe cleaners and attached to a gold-tone keyring. The perfect tiny gift that fits in your pocket but fills the heart.",
    shortDescription: "Handmade mini sunflower keychain",
    materials: ["Mini pipe cleaners", "Gold-tone keyring", "Jump ring"],
    dimensions: "4cm flower diameter",
    careInstructions: [
      "Handle with care",
      "Keep away from water",
      "Avoid excessive pulling",
    ],
    estimatedDelivery: "3-5 business days",
    inStock: true,
    stockQuantity: 60,
    sku: "BLOOM-SUN-KEY-001",
    isCustomizable: false,
    isBestSeller: true,
    isFeatured: true,
    isNew: false,
    colors: ["Yellow"],
    occasions: ["Birthday", "Friendship", "Just Because"],
    flowerTypes: ["Sunflower"],
    tags: ["keychain", "sunflower", "mini", "accessory", "gift"],
    collection: "little-gifts",
  },
  {
    id: "daisy-keychain",
    slug: "daisy-keychain",
    name: "Tiny Daisy Joy",
    category: "Keychains",
    price: 199,
    rating: 4.8,
    reviews: 34,
    images: [
      "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=900&q=85",
    ],
    alt: "A miniature daisy keychain in white and yellow",
    tone: "pink",
    description:
      "A dainty daisy that clips onto your keys, bag, or anywhere you want a little bloom. Handcrafted from pipe cleaners with a white-and-yellow color palette. Comes individually wrapped in a mini BLOOMSOME pouch.",
    shortDescription: "Handmade mini daisy keychain",
    materials: ["Mini pipe cleaners", "Silver-tone keyring", "Cotton pouch"],
    dimensions: "3.5cm flower diameter",
    careInstructions: [
      "Handle with care",
      "Keep away from water",
      "Avoid excessive pulling",
    ],
    estimatedDelivery: "3-5 business days",
    inStock: true,
    stockQuantity: 48,
    sku: "BLOOM-DAI-KEY-001",
    isCustomizable: false,
    isBestSeller: false,
    isFeatured: false,
    isNew: false,
    colors: ["White", "Yellow"],
    occasions: ["Birthday", "Friendship", "Just Because"],
    flowerTypes: ["Daisy"],
    tags: ["keychain", "daisy", "mini", "accessory", "cute"],
    collection: "little-gifts",
  },
  {
    id: "mini-flower-gift-box",
    slug: "mini-flower-gift-box",
    name: "The Little Joy Box",
    category: "Gift Boxes",
    price: 799,
    oldPrice: 999,
    rating: 4.9,
    reviews: 19,
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=900&q=85",
    ],
    alt: "A beautifully packaged gift box with mini flowers",
    tag: "Gift Ready",
    tone: "peach",
    description:
      "Everything lovely in one box. This curated gift set includes a mini handmade bouquet, a flower keychain, and a handwritten note card — all nestled in a kraft gift box with tissue paper and dried petals. Ready to gift, ready to love.",
    shortDescription: "Curated gift box with mini bouquet & keychain",
    materials: [
      "Pipe cleaners",
      "Kraft gift box",
      "Tissue paper",
      "Dried petals",
      "Note card",
    ],
    dimensions: "20cm × 15cm × 8cm box",
    careInstructions: [
      "Store in original box when not displaying",
      "Keep away from direct sunlight",
      "Handle individual items gently",
    ],
    estimatedDelivery: "5-7 business days",
    inStock: true,
    stockQuantity: 10,
    sku: "BLOOM-GFT-BOX-001",
    isCustomizable: true,
    isBestSeller: false,
    isFeatured: true,
    isNew: false,
    colors: ["Mixed"],
    occasions: ["Birthday", "Anniversary", "Mother's Day", "Graduation"],
    flowerTypes: ["Daisy", "Sunflower"],
    tags: ["gift box", "curated", "gift set", "premium", "ready to gift"],
    collection: "gift-boxes",
  },
  {
    id: "custom-love-bouquet",
    slug: "custom-love-bouquet",
    name: "Made With Love Bouquet",
    category: "Custom",
    price: 1299,
    rating: 5.0,
    reviews: 12,
    images: [
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=900&q=85",
    ],
    alt: "A custom handmade bouquet in soft pastel colors",
    tag: "Custom",
    tone: "coral",
    description:
      "Your story, their smile. This fully customizable bouquet lets you choose the flowers, colors, size, and personal message. Our makers craft each bouquet by hand, making every piece one of a kind. Perfect for proposals, anniversaries, or when you want to say something only flowers can.",
    shortDescription: "Fully customizable handmade bouquet",
    materials: ["Premium pipe cleaners", "Floral wire", "Custom wrapping", "Ribbon"],
    dimensions: "Varies by size selection",
    careInstructions: [
      "Keep away from direct sunlight",
      "Gently dust with a soft brush",
      "Do not wash or submerge in water",
      "Display in a cool, dry area",
    ],
    estimatedDelivery: "7-10 business days (made to order)",
    inStock: true,
    sku: "BLOOM-CST-BQT-001",
    isCustomizable: true,
    isBestSeller: false,
    isFeatured: true,
    isNew: false,
    colors: ["Custom"],
    occasions: ["Anniversary", "Valentine's Day", "Proposal", "Birthday"],
    flowerTypes: ["Rose", "Sunflower", "Tulip", "Daisy", "Lavender", "Lily"],
    tags: ["custom", "bouquet", "personalized", "made to order", "premium"],
    collection: "personalized",
  },
  {
    id: "tulip-trio",
    slug: "tulip-trio",
    name: "Tulip Trio",
    category: "Flowers",
    price: 449,
    rating: 4.8,
    reviews: 23,
    images: [
      "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1518701005037-d53b1670eea8?auto=format&fit=crop&w=900&q=85",
    ],
    alt: "Three handcrafted tulips in pink, white, and yellow",
    tone: "pink",
    description:
      "Three is the magic number. This set of three handcrafted tulips comes in a palette of your choosing — each stem carefully shaped to capture the elegant curve of a real tulip. Tied with a simple cotton string and delivered in a slim kraft sleeve.",
    shortDescription: "Set of three handmade tulip stems",
    materials: ["Pipe cleaners", "Floral wire", "Cotton string", "Kraft sleeve"],
    dimensions: "25cm stem length",
    careInstructions: [
      "Keep away from direct sunlight",
      "Handle stems gently",
      "Dust with a soft brush",
    ],
    estimatedDelivery: "5-7 business days",
    inStock: true,
    stockQuantity: 20,
    sku: "BLOOM-TLP-TRI-001",
    isCustomizable: false,
    isBestSeller: false,
    isFeatured: false,
    isNew: true,
    colors: ["Pink", "White", "Yellow", "Red"],
    occasions: ["Birthday", "Just Because", "Mother's Day"],
    flowerTypes: ["Tulip"],
    tags: ["tulip", "trio", "elegant", "stems", "handmade"],
    collection: "forever-flowers",
  },
  {
    id: "rose-charm",
    slug: "rose-charm",
    name: "Rose Petal Charm",
    category: "Charms",
    price: 149,
    rating: 4.6,
    reviews: 41,
    images: [
      "https://images.unsplash.com/photo-1455659817273-f96807779a8a?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=900&q=85",
    ],
    alt: "A tiny rose charm on a gold chain",
    tone: "coral",
    description:
      "A tiny rose that says everything. This delicate charm is handmade from miniature pipe cleaners and attached to a gold-tone lobster clasp. Clip it to your bag, keys, phone case, or journal for a daily reminder that someone cares.",
    shortDescription: "Miniature handmade rose charm",
    materials: ["Mini pipe cleaners", "Gold-tone lobster clasp", "Jump ring"],
    dimensions: "2.5cm charm size",
    careInstructions: [
      "Handle with care",
      "Keep away from water",
      "Store in pouch when not in use",
    ],
    estimatedDelivery: "3-5 business days",
    inStock: true,
    stockQuantity: 75,
    sku: "BLOOM-ROS-CHR-001",
    isCustomizable: false,
    isBestSeller: false,
    isFeatured: false,
    isNew: false,
    colors: ["Red", "Pink"],
    occasions: ["Birthday", "Friendship", "Just Because", "Valentine's Day"],
    flowerTypes: ["Rose"],
    tags: ["charm", "rose", "mini", "accessory", "dainty"],
    collection: "little-gifts",
  },
];

// ── Categories ─────────────────────────────────────────────────────────────────

export const categories: Category[] = [
  {
    name: "Flowers",
    slug: "flowers",
    count: "12 little wonders",
    description: "Individual stems and small bunches, crafted to last forever.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=85",
    accent: "sage",
  },
  {
    name: "Bouquets",
    slug: "bouquets",
    count: "Made for moments",
    description: "From mini to premium, every bouquet tells a story.",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=85",
    accent: "yellow",
  },
  {
    name: "Keychains",
    slug: "keychains",
    count: "Tiny happy things",
    description: "Miniature flowers you can carry everywhere.",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=85",
    accent: "peach",
  },
  {
    name: "Charms",
    slug: "charms",
    count: "Little treasures",
    description: "Dainty flower charms for bags, keys, and more.",
    image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?auto=format&fit=crop&w=800&q=85",
    accent: "pink",
  },
  {
    name: "Gift Boxes",
    slug: "gift-boxes",
    count: "Thoughtfully paired",
    description: "Curated gift sets ready to make someone's day.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=85",
    accent: "sage",
  },
  {
    name: "Custom",
    slug: "custom",
    count: "Made for you",
    description: "Design your own bouquet or gift, exactly the way you want.",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=85",
    accent: "yellow",
  },
];

// ── Collections ────────────────────────────────────────────────────────────────

export const collections: Collection[] = [
  {
    name: "Forever Flowers",
    slug: "forever-flowers",
    description: "Everlasting handmade flowers that never wilt.",
    longDescription:
      "Our signature collection of individually handcrafted flowers. Each stem is made with premium pipe cleaners and floral wire, shaped petal by petal to capture the beauty of real flowers — but designed to last a lifetime. No water needed, no wilting, just everlasting beauty.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=85",
    productIds: ["sunflower-bouquet", "forever-rose", "lavender-bunch", "tulip-trio"],
  },
  {
    name: "Bouquets",
    slug: "bouquets",
    description: "Small to premium bouquets for every occasion.",
    longDescription:
      "From a tiny desk bouquet to a grand gesture, our handmade bouquets are crafted for the moments that matter. Each one is wrapped with care and delivered in gift-ready packaging. Choose from our curated designs or build your own.",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=1200&q=85",
    productIds: ["sunflower-bouquet", "daisy-bouquet", "custom-love-bouquet"],
  },
  {
    name: "Little Gifts",
    slug: "little-gifts",
    description: "Keychains, charms, and mini gifts that bring joy.",
    longDescription:
      "Sometimes the smallest things carry the biggest feelings. Our little gifts collection is perfect for everyday gifting — no special occasion needed. From flower keychains to tiny charms, each piece is handmade and comes in its own little pouch.",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=85",
    productIds: ["sunflower-keychain", "daisy-keychain", "rose-charm"],
  },
  {
    name: "Gift Boxes",
    slug: "gift-boxes",
    description: "Curated combinations, ready to gift.",
    longDescription:
      "For when you want to give more than just a single flower. Our gift boxes combine the best of BLOOMSOME — mini bouquets, keychains, charms, and handwritten notes — all beautifully packaged in a kraft box with tissue paper and dried petals.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85",
    productIds: ["mini-flower-gift-box"],
  },
  {
    name: "Personalized",
    slug: "personalized",
    description: "Custom-made products, crafted just for you.",
    longDescription:
      "Make it personal. Choose your flowers, colors, size, and add a heartfelt message. Our makers will bring your vision to life, one petal at a time. Every personalized piece is truly one of a kind.",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=85",
    productIds: ["custom-love-bouquet"],
  },
];

// ── Reviews ────────────────────────────────────────────────────────────────────

export const reviews: Review[] = [
  {
    id: "rev-1",
    productId: "sunflower-bouquet",
    userName: "Priya S.",
    rating: 5,
    text: "Absolutely gorgeous! The sunflowers look so real. My mom loved it for her birthday. The packaging was beautiful too.",
    isVerified: true,
    createdAt: "2026-09-15",
  },
  {
    id: "rev-2",
    productId: "forever-rose",
    userName: "Arjun M.",
    rating: 5,
    text: "Perfect anniversary gift. My wife was so surprised that it was handmade. It sits on her desk now and she smiles every time she sees it.",
    isVerified: true,
    createdAt: "2026-09-20",
  },
  {
    id: "rev-3",
    productId: "sunflower-keychain",
    userName: "Meera K.",
    rating: 5,
    text: "Such a cute little thing! I bought 5 as friendship day gifts and everyone loved them. Great quality for the price.",
    isVerified: true,
    createdAt: "2026-08-10",
  },
  {
    id: "rev-4",
    productId: "custom-love-bouquet",
    userName: "Rashi T.",
    rating: 5,
    text: "I customized a bouquet for my proposal and it was PERFECT. The team was so helpful and the final product exceeded my expectations.",
    isVerified: true,
    createdAt: "2026-09-28",
  },
  {
    id: "rev-5",
    productId: "daisy-bouquet",
    userName: "Sneha R.",
    rating: 4,
    text: "Really pretty and delicate. Looks lovely on my study desk. Wish there were more color options but overall very happy!",
    isVerified: true,
    createdAt: "2026-10-01",
  },
  {
    id: "rev-6",
    productId: "mini-flower-gift-box",
    userName: "Kavya D.",
    rating: 5,
    text: "The gift box is so thoughtfully put together. The dried petals, the handwritten note, the mini bouquet — everything was perfect. Best gift I've ever given.",
    isVerified: true,
    createdAt: "2026-09-05",
  },
];

// ── FAQs ───────────────────────────────────────────────────────────────────────

export const faqs: FAQ[] = [
  {
    id: "faq-1",
    question: "How long do the flowers last?",
    answer:
      "Our handmade flowers are designed to last forever! Unlike fresh flowers, pipe cleaner flowers don't wilt or need water. With proper care — keeping them away from direct sunlight and moisture — they'll maintain their beauty for years.",
    category: "Product",
  },
  {
    id: "faq-2",
    question: "How are the flowers made?",
    answer:
      "Each flower is handcrafted from premium pipe cleaners and floral wire. Our makers shape every petal, leaf, and stem by hand — no two pieces are exactly alike. This process takes time, which is why each piece carries a little extra love.",
    category: "Product",
  },
  {
    id: "faq-3",
    question: "Can I customize my bouquet?",
    answer:
      "Absolutely! Use our Custom Bouquet Builder to choose your occasion, bouquet size, flower types, color palette, add-ons, and even a personal message. We'll make it exactly the way you want.",
    category: "Customization",
  },
  {
    id: "faq-4",
    question: "How long does an order take?",
    answer:
      "Ready-to-ship items are dispatched within 1-2 business days. Custom and made-to-order items take 3-5 business days to craft before shipping. Delivery typically takes 3-7 business days depending on your location.",
    category: "Orders",
  },
  {
    id: "faq-5",
    question: "Do you offer Cash on Delivery (COD)?",
    answer:
      "Yes! We offer COD on select orders within India. COD availability depends on your pincode and order value. You can check COD availability at checkout.",
    category: "Payment",
  },
  {
    id: "faq-6",
    question: "Do you ship across India?",
    answer:
      "Yes, we ship to all major cities and most pin codes across India. We also offer free shipping on orders above ₹999. International shipping is currently unavailable but coming soon!",
    category: "Shipping",
  },
  {
    id: "faq-7",
    question: "Can I add a personal message?",
    answer:
      "Yes! You can add a handwritten message card to any order during checkout. For custom bouquets, you can include a longer personal message as part of the customization.",
    category: "Customization",
  },
  {
    id: "faq-8",
    question: "Can I cancel an order?",
    answer:
      "You can cancel an order before it enters the 'Being Handmade' stage. Once crafting begins, cancellations are not possible as each piece is made specifically for you. Please contact us as early as possible if you need to cancel.",
    category: "Orders",
  },
  {
    id: "faq-9",
    question: "What is your return policy?",
    answer:
      "We accept returns within 7 days of delivery for non-customized products that are in their original condition. Custom and personalized items cannot be returned unless there's a manufacturing defect. Please reach out to us with photos if you receive a damaged product.",
    category: "Returns",
  },
  {
    id: "faq-10",
    question: "How should I care for the flowers?",
    answer:
      "Keep your BLOOMSOME flowers away from direct sunlight, water, and humidity. Gently dust them with a soft brush every few weeks. Store unused pieces in their original packaging. With these simple steps, your flowers will stay beautiful for years.",
    category: "Product",
  },
];

// ── Helper Functions ───────────────────────────────────────────────────────────

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  const collection = collections.find((c) => c.slug === collectionSlug);
  if (!collection) return [];
  return products.filter((p) => collection.productIds.includes(p.id));
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.isBestSeller);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q)) ||
      p.flowerTypes?.some((f) => f.toLowerCase().includes(q)) ||
      p.occasions?.some((o) => o.toLowerCase().includes(q))
  );
}
