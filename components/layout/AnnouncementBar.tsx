"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("announcement-dismissed");
    if (dismissed) setVisible(false);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem("announcement-dismissed", "true");
  };

  if (!visible) return null;

  return (
    <div className="relative flex items-center justify-center gap-3 sm:gap-5 bg-ink text-cream text-[10px] sm:text-[11px] uppercase tracking-[0.08em] py-2 px-10 min-h-[31px] z-50">
      <span>Complimentary delivery on orders above ₹999</span>
      <span className="text-yellow">•</span>
      <span className="hidden sm:inline">Made by hand, sent with heart</span>
      <button
        onClick={dismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Dismiss announcement"
      >
        <X size={12} />
      </button>
    </div>
  );
}
