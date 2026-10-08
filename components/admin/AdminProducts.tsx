"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Star,
  Sparkles,
  Tag,
  AlertTriangle,
  X,
  Upload,
  Check,
} from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

const categories = ["All", "Flowers", "Bouquets", "Keychains", "Charms", "Gift Boxes", "Custom"];
const toneList = ["yellow", "pink", "coral", "lavender", "peach", "sage"];

const initialFormState: Partial<Product> = {
  name: "",
  slug: "",
  category: "Flowers",
  price: 799,
  oldPrice: 999,
  stockQuantity: 20,
  inStock: true,
  rating: 5.0,
  reviews: 1,
  images: ["https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=85"],
  alt: "Handmade pipe cleaner flower",
  tone: "yellow",
  description: "Handcrafted with premium pipe cleaners and floral wire to capture everlasting floral beauty.",
  shortDescription: "Handcrafted everlasting flowers that never wilt.",
  materials: ["Velvet Chenille Stems", "Floral Wire Core", "Satin Ribbon"],
  tags: ["handmade", "flower", "gift"],
  isBestSeller: false,
  isFeatured: true,
  isNew: true,
  isCustomizable: false,
  estimatedDelivery: "3-5 business days",
  sku: `BLM-PRD-${Math.floor(1000 + Math.random() * 9000)}`,
};

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>(initialFormState);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === "All" || p.category.toLowerCase() === selectedCategory.toLowerCase();
      const q = searchQuery.toLowerCase();
      const matchSearch =
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        (p.sku && p.sku.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const handleOpenAdd = () => {
    setEditingProductId(null);
    setFormData({
      ...initialFormState,
      id: `prod-${Date.now()}`,
      sku: `BLM-PRD-${Math.floor(1000 + Math.random() * 9000)}`,
    });
    setImageUrlInput("");
    setTagInput("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProductId(product.id);
    setFormData({ ...product });
    setImageUrlInput(product.images.join(", "));
    setTagInput(product.tags.join(", "));
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      deleteProduct(id);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    // Generate slug from name if empty
    const slug =
      formData.slug?.trim() ||
      formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    // Process images
    const images = imageUrlInput.trim()
      ? imageUrlInput.split(",").map((s) => s.trim()).filter(Boolean)
      : formData.images && formData.images.length > 0
      ? formData.images
      : ["https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=85"];

    // Process tags
    const tags = tagInput.trim()
      ? tagInput.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean)
      : formData.tags || ["handmade", "everlasting"];

    const completeProduct: Product = {
      id: formData.id || `prod-${Date.now()}`,
      name: formData.name || "Handcrafted Bloom",
      slug,
      category: formData.category || "Flowers",
      price: Number(formData.price) || 499,
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : undefined,
      stockQuantity: Number(formData.stockQuantity) || 10,
      inStock: (formData.stockQuantity ?? 10) > 0,
      rating: formData.rating || 5.0,
      reviews: formData.reviews || 0,
      images,
      alt: formData.alt || formData.name || "BLOOMSOME Handmade flower",
      tone: formData.tone || "yellow",
      description: formData.description || "Handcrafted flower piece.",
      shortDescription: formData.shortDescription || "Handmade with love.",
      materials: formData.materials || ["Velvet Chenille Stems", "Floral Wire"],
      tags,
      isBestSeller: !!formData.isBestSeller,
      isFeatured: !!formData.isFeatured,
      isNew: !!formData.isNew,
      isCustomizable: !!formData.isCustomizable,
      estimatedDelivery: formData.estimatedDelivery || "3-5 business days",
      sku: formData.sku || `BLM-${Date.now()}`,
    };

    if (editingProductId) {
      updateProduct(editingProductId, completeProduct);
    } else {
      addProduct(completeProduct);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-light text-ink tracking-tight">
            Product Catalog & Inventory ({products.length})
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Add handmade stem designs, manage stock levels, set sale discounts, and adjust tags.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 bg-ink text-cream px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-ink/90 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus size={15} />
          Add New Product
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-paper border border-line rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input
              type="text"
              placeholder="Search products by title, category, tag, or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-cream border border-line rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-ink focus:outline-none focus:border-ink"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs font-mono uppercase text-muted hover:text-ink shrink-0"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-ink text-cream font-medium"
                    : "bg-cream border border-line text-muted hover:text-ink hover:border-ink/40"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-paper border border-line rounded-2xl shadow-xs overflow-hidden">
        {filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-cream/60 border-b border-line font-mono text-muted uppercase">
                  <th className="py-3.5 px-6">Product</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Stock Level</th>
                  <th className="py-3.5 px-4">Badges</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filteredProducts.map((p) => {
                  const stock = p.stockQuantity ?? 10;
                  const isLowStock = stock <= 5;

                  return (
                    <tr key={p.id} className="hover:bg-cream/40 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-line bg-mist shrink-0">
                            <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                          </div>
                          <div>
                            <strong className="block font-medium text-ink text-sm truncate max-w-[200px] sm:max-w-xs">
                              {p.name}
                            </strong>
                            <span className="text-[11px] font-mono text-muted">SKU: {p.sku || p.id}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-muted">
                        <span className="bg-cream px-2.5 py-1 rounded-lg border border-line font-mono text-[11px]">
                          {p.category}
                        </span>
                      </td>

                      <td className="py-4 px-4 font-sans whitespace-nowrap">
                        <strong className="text-ink font-bold text-sm">{formatPrice(p.price)}</strong>
                        {p.oldPrice && (
                          <del className="text-muted text-[11px] block">{formatPrice(p.oldPrice)}</del>
                        )}
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1 font-mono font-bold text-xs ${
                              isLowStock ? "text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md" : "text-emerald-800"
                            }`}
                          >
                            {isLowStock && <AlertTriangle size={12} />}
                            {stock} units
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {p.isBestSeller && (
                            <span className="bg-yellow/40 border border-yellow/60 text-ink text-[10px] font-mono px-2 py-0.5 rounded">
                              Best Seller
                            </span>
                          )}
                          {p.isFeatured && (
                            <span className="bg-purple-100 border border-purple-200 text-purple-800 text-[10px] font-mono px-2 py-0.5 rounded">
                              Featured
                            </span>
                          )}
                          {p.isNew && (
                            <span className="bg-blue-100 border border-blue-200 text-blue-800 text-[10px] font-mono px-2 py-0.5 rounded">
                              New
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 text-muted hover:text-ink hover:bg-cream rounded-lg transition-colors"
                            title="Edit product"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id, p.name)}
                            className="p-1.5 text-muted hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete product"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 px-4">
            <p className="font-display text-lg text-ink mb-1">No products found</p>
            <p className="text-xs text-muted mb-4">
              Try a different keyword or create a new product stem.
            </p>
            <button
              onClick={handleOpenAdd}
              className="bg-ink text-cream text-xs font-mono uppercase px-5 py-2.5 rounded-full hover:bg-ink/90"
            >
              + Create Product
            </button>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-paper border border-line text-ink w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-cream px-6 sm:px-8 py-5 border-b border-line flex items-center justify-between shrink-0">
              <h3 className="font-display text-xl font-medium text-ink">
                {editingProductId ? "Edit Product Details" : "Add New Handcrafted Product"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-muted hover:text-ink rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveProduct} className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Everlasting Sunflower Bouquet"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-cream border border-line rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-ink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
                    Category *
                  </label>
                  <select
                    value={formData.category || "Flowers"}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-cream border border-line rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-ink"
                  >
                    {categories.filter((c) => c !== "All").map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.price || 0}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-cream border border-line rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-ink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
                    MRP / Old Price (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    placeholder="e.g. 1499"
                    value={formData.oldPrice || ""}
                    onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full bg-cream border border-line rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-ink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.stockQuantity ?? 10}
                    onChange={(e) => setFormData({ ...formData, stockQuantity: Number(e.target.value) })}
                    className="w-full bg-cream border border-line rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-ink"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
                  Image URLs (comma-separated Unsplash or hosted URLs)
                </label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  className="w-full bg-cream border border-line rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-ink"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
                  Short Description
                </label>
                <input
                  type="text"
                  placeholder="Catchy 1-sentence product summary"
                  value={formData.shortDescription || ""}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full bg-cream border border-line rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-ink"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
                  Full Story & Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Detailed description of craftsmanship and design..."
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-cream border border-line rounded-xl p-4 text-sm text-ink focus:outline-none focus:border-ink resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
                    Tone Color Accent
                  </label>
                  <select
                    value={formData.tone || "yellow"}
                    onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                    className="w-full bg-cream border border-line rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none capitalize"
                  >
                    {toneList.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="sunflower, birthday, yellow, everlasting"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="w-full bg-cream border border-line rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-ink"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-4 border-t border-line grid grid-cols-2 sm:grid-cols-4 gap-4">
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!formData.isBestSeller}
                    onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    className="accent-ink w-4 h-4 rounded"
                  />
                  <span>Best Seller</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="accent-ink w-4 h-4 rounded"
                  />
                  <span>Featured Product</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!formData.isNew}
                    onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                    className="accent-ink w-4 h-4 rounded"
                  />
                  <span>New Drop</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!formData.isCustomizable}
                    onChange={(e) => setFormData({ ...formData, isCustomizable: e.target.checked })}
                    className="accent-ink w-4 h-4 rounded"
                  />
                  <span>Customizable</span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-line">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-muted hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-ink text-cream px-7 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-ink/90 transition-colors shadow-sm"
                >
                  {editingProductId ? "Save Changes" : "Create Product"}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
