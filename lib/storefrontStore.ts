"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import type { Product } from "./types";

export type CartLine = {
  productId: string;
  quantity: number;
  customization?: string;
};

const PRODUCTS_KEY = "bloomsome_admin_products";
const CART_KEY = "bloomsome_cart";
const WISHLIST_KEY = "bloomsome_wishlist";
const STORE_EVENT = "bloomsome_store_updated";

function readStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) as T : fallback;
  } catch {
    return fallback;
  }
}

function writeStored<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(STORE_EVENT));
}

import { defaultProducts } from "./products";

export function useStorefrontProducts() {
  const [products, setProducts] = useState<Product[]>(defaultProducts);

  useEffect(() => {
    if (!db) return;
    return onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const live = snapshot.docs.map((item: any) => ({ id: item.id, ...item.data() } as Product));
        setProducts(live.length > 0 ? live : defaultProducts);
      },
      () => setProducts(defaultProducts)
    );
  }, []);

  return products;
}

export function useCommerce() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => {
      setCart(readStored(CART_KEY, []));
      setWishlist(readStored(WISHLIST_KEY, []));
    };
    sync();
    window.addEventListener(STORE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(STORE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const addToCart = (productId: string, quantity = 1, customization?: string) => {
    const current = readStored<CartLine[]>(CART_KEY, []);
    const existing = current.find((line) => line.productId === productId && line.customization === customization);
    const updated = existing
      ? current.map((line) => line === existing ? { ...line, quantity: line.quantity + quantity } : line)
      : [...current, { productId, quantity, customization }];
    setCart(updated);
    writeStored(CART_KEY, updated);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    const updated = readStored<CartLine[]>(CART_KEY, [])
      .map((line) => line.productId === productId ? { ...line, quantity } : line)
      .filter((line) => line.quantity > 0);
    setCart(updated);
    writeStored(CART_KEY, updated);
  };

  const removeFromCart = (productId: string) => updateCartQuantity(productId, 0);

  const clearCart = () => {
    setCart([]);
    writeStored(CART_KEY, []);
  };

  const toggleWishlist = (productId: string) => {
    const current = readStored<string[]>(WISHLIST_KEY, []);
    const updated = current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId];
    setWishlist(updated);
    writeStored(WISHLIST_KEY, updated);
  };

  return {
    cart,
    wishlist,
    cartCount: cart.reduce((total, line) => total + line.quantity, 0),
    isWishlisted: (productId: string) => wishlist.includes(productId),
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    toggleWishlist,
  };
}
