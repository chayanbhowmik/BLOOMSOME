"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import type { FAQ, Review } from "./types";

export function usePublicCollection<T extends { id: string }>(name: string) {
  const [items, setItems] = useState<T[]>([]);

  useEffect(() => {
    if (!db) return;
    return onSnapshot(collection(db, name), (snapshot) => {
      setItems(snapshot.docs.map((item: any) => ({ id: item.id, ...item.data() } as T)));
    }, () => setItems([]));
  }, [name]);

  return items;
}

export function usePublicReviews() {
  return usePublicCollection<Review>("reviews");
}

export function usePublicFaqs() {
  return usePublicCollection<FAQ>("faqs");
}
