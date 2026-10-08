"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Save, Plus, Trash2, Sparkles, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";

export default function AdminHomepage() {
  const { homepage, updateHomepage } = useAdminStore();
  const [formData, setFormData] = useState(homepage);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // New banner state
  const [newBannerText, setNewBannerText] = useState("");
  const [newMarqueeText, setNewMarqueeText] = useState("");
  const [newIgUrl, setNewIgUrl] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomepage(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleAddBanner = () => {
    if (!newBannerText.trim()) return;
    const newBanner = {
      id: `ann-${Date.now()}`,
      announcementText: newBannerText.trim(),
      announcementLink: "/shop",
      isActive: true,
    };
    const updated = {
      ...formData,
      announcements: [...formData.announcements, newBanner],
    };
    setFormData(updated);
    updateHomepage(updated);
    setNewBannerText("");
  };

  const handleToggleBanner = (id: string) => {
    const updated = {
      ...formData,
      announcements: formData.announcements.map((a) =>
        a.id === id ? { ...a, isActive: !a.isActive } : a
      ),
    };
    setFormData(updated);
    updateHomepage(updated);
  };

  const handleDeleteBanner = (id: string) => {
    const updated = {
      ...formData,
      announcements: formData.announcements.filter((a) => a.id !== id),
    };
    setFormData(updated);
    updateHomepage(updated);
  };

  const handleAddMarquee = () => {
    if (!newMarqueeText.trim()) return;
    const updated = {
      ...formData,
      marqueeItems: [...formData.marqueeItems, newMarqueeText.trim()],
    };
    setFormData(updated);
    updateHomepage(updated);
    setNewMarqueeText("");
  };

  const handleDeleteMarquee = (index: number) => {
    const updated = {
      ...formData,
      marqueeItems: formData.marqueeItems.filter((_, i) => i !== index),
    };
    setFormData(updated);
    updateHomepage(updated);
  };

  const handleAddIgImage = () => {
    if (!newIgUrl.trim()) return;
    const updated = {
      ...formData,
      instagramImages: [
        ...formData.instagramImages,
        {
          id: `ig-${Date.now()}`,
          src: newIgUrl.trim(),
          alt: "BLOOMSOME Instagram Bloom",
          url: "https://instagram.com/bloomsome.store",
        },
      ],
    };
    setFormData(updated);
    updateHomepage(updated);
    setNewIgUrl("");
  };

  const handleDeleteIgImage = (id: string) => {
    const updated = {
      ...formData,
      instagramImages: formData.instagramImages.filter((ig) => ig.id !== id),
    };
    setFormData(updated);
    updateHomepage(updated);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-light text-ink tracking-tight">
            Homepage & Showcase Studio
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Customize hero branding, top announcement ribbons, scrolling ticker phrases, and Instagram gallery visuals.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-300 text-emerald-800 px-4 py-2 rounded-xl text-xs font-mono font-medium">
            <CheckCircle2 size={15} />
            <span>Changes Published Live!</span>
          </div>
        )}
      </div>

      {/* Main Hero Form */}
      <form onSubmit={handleSave} className="bg-paper border border-line rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2 border-b border-line pb-4">
          <Sparkles size={18} className="text-ink" />
          <h2 className="font-display text-xl font-medium text-ink">Hero Section Configuration</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
              Hero Main Headline
            </label>
            <input
              type="text"
              value={formData.heroTitle}
              onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
              className="w-full bg-cream border border-line rounded-xl px-4 py-3 text-sm text-ink focus:outline-none focus:border-ink font-display"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
              Hero Top Badge
            </label>
            <input
              type="text"
              value={formData.heroBadge}
              onChange={(e) => setFormData({ ...formData, heroBadge: e.target.value })}
              className="w-full bg-cream border border-line rounded-xl px-4 py-3 text-sm text-ink focus:outline-none focus:border-ink"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
            Hero Subtitle / Description
          </label>
          <textarea
            rows={2}
            value={formData.heroSubtitle}
            onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
            className="w-full bg-cream border border-line rounded-xl p-4 text-sm text-ink focus:outline-none focus:border-ink resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-xs font-mono uppercase tracking-wider text-muted">
              Primary Button
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Button Label"
                value={formData.heroButtonText}
                onChange={(e) => setFormData({ ...formData, heroButtonText: e.target.value })}
                className="bg-cream border border-line rounded-xl px-3 py-2 text-xs focus:outline-none"
              />
              <input
                type="text"
                placeholder="Link (/shop)"
                value={formData.heroButtonLink}
                onChange={(e) => setFormData({ ...formData, heroButtonLink: e.target.value })}
                className="bg-cream border border-line rounded-xl px-3 py-2 text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-mono uppercase tracking-wider text-muted">
              Secondary Button
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Button Label"
                value={formData.heroSecondaryButtonText}
                onChange={(e) => setFormData({ ...formData, heroSecondaryButtonText: e.target.value })}
                className="bg-cream border border-line rounded-xl px-3 py-2 text-xs focus:outline-none"
              />
              <input
                type="text"
                placeholder="Link (/custom)"
                value={formData.heroSecondaryButtonLink}
                onChange={(e) => setFormData({ ...formData, heroSecondaryButtonLink: e.target.value })}
                className="bg-cream border border-line rounded-xl px-3 py-2 text-xs focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-ink text-cream px-8 py-3 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-ink/90 transition-colors shadow-sm"
          >
            <Save size={14} />
            Save Hero Settings
          </button>
        </div>
      </form>

      {/* Announcement Bar Manager */}
      <div className="bg-paper border border-line rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <h3 className="font-display text-lg font-medium text-ink">
          Top Announcement Bar Messages
        </h3>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add new announcement alert message..."
            value={newBannerText}
            onChange={(e) => setNewBannerText(e.target.value)}
            className="flex-1 bg-cream border border-line rounded-xl px-4 py-2.5 text-xs text-ink focus:outline-none"
          />
          <button
            onClick={handleAddBanner}
            className="bg-ink text-cream px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-ink/90 shrink-0"
          >
            + Add Message
          </button>
        </div>

        <div className="space-y-3">
          {formData.announcements.map((ann) => (
            <div key={ann.id} className="p-4 rounded-xl border border-line bg-cream flex items-center justify-between gap-4">
              <span className="text-xs text-ink font-medium">{ann.announcementText}</span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleToggleBanner(ann.id)}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase font-bold border transition-colors ${
                    ann.isActive
                      ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                      : "bg-neutral-100 text-neutral-600 border-neutral-300"
                  }`}
                >
                  {ann.isActive ? "Active" : "Disabled"}
                </button>
                <button
                  onClick={() => handleDeleteBanner(ann.id)}
                  className="p-1 text-muted hover:text-red-600"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Ticker Manager */}
      <div className="bg-paper border border-line rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <h3 className="font-display text-lg font-medium text-ink">
          Infinite Ribbon Marquee Phrases
        </h3>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. 100% Everlasting • Handcrafted Petals"
            value={newMarqueeText}
            onChange={(e) => setNewMarqueeText(e.target.value)}
            className="flex-1 bg-cream border border-line rounded-xl px-4 py-2.5 text-xs text-ink focus:outline-none"
          />
          <button
            onClick={handleAddMarquee}
            className="bg-ink text-cream px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-ink/90 shrink-0"
          >
            + Add Phrase
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {formData.marqueeItems.map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-2 bg-cream border border-line px-3 py-1.5 rounded-full text-xs text-ink"
            >
              <span>{item}</span>
              <button
                onClick={() => handleDeleteMarquee(idx)}
                className="text-muted hover:text-red-600"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Instagram Gallery Manager */}
      <div className="bg-paper border border-line rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <h3 className="font-display text-lg font-medium text-ink">
          Instagram Community Wall ({formData.instagramImages.length} photos)
        </h3>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add image URL (https://images.unsplash.com/...)"
            value={newIgUrl}
            onChange={(e) => setNewIgUrl(e.target.value)}
            className="flex-1 bg-cream border border-line rounded-xl px-4 py-2.5 text-xs text-ink focus:outline-none"
          />
          <button
            onClick={handleAddIgImage}
            className="bg-ink text-cream px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-ink/90 shrink-0"
          >
            + Add Photo
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {formData.instagramImages.map((ig) => (
            <div key={ig.id} className="relative aspect-square rounded-xl overflow-hidden border border-line group">
              <Image src={ig.src} alt={ig.alt} fill className="object-cover" />
              <button
                onClick={() => handleDeleteIgImage(ig.id)}
                className="absolute top-2 right-2 p-1.5 bg-ink/80 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
