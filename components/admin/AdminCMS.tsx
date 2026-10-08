"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit2, Save, HelpCircle, FileText, CheckCircle2 } from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";
import type { FAQ } from "@/lib/types";

const faqCategories = ["Product", "Customization", "Orders", "Shipping", "Payment", "Returns"];

export default function AdminCMS() {
  const { cms, updateCMS } = useAdminStore();
  const [formData, setFormData] = useState(cms);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // New FAQ Modal / State
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [newCategory, setNewCategory] = useState("Product");
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    updateCMS(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleOpenAddFaq = () => {
    setEditingFaqId(null);
    setNewQuestion("");
    setNewAnswer("");
    setNewCategory("Product");
    setIsFaqModalOpen(true);
  };

  const handleOpenEditFaq = (faq: FAQ) => {
    setEditingFaqId(faq.id);
    setNewQuestion(faq.question);
    setNewAnswer(faq.answer);
    setNewCategory(faq.category);
    setIsFaqModalOpen(true);
  };

  const handleDeleteFaq = (id: string) => {
    const updatedFaqs = formData.faqs.filter((f) => f.id !== id);
    const updated = { ...formData, faqs: updatedFaqs };
    setFormData(updated);
    updateCMS(updated);
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    let updatedFaqs: FAQ[];
    if (editingFaqId) {
      updatedFaqs = formData.faqs.map((f) =>
        f.id === editingFaqId
          ? { ...f, question: newQuestion, answer: newAnswer, category: newCategory }
          : f
      );
    } else {
      const newFaq: FAQ = {
        id: `faq-${Date.now()}`,
        question: newQuestion,
        answer: newAnswer,
        category: newCategory,
      };
      updatedFaqs = [newFaq, ...formData.faqs];
    }

    const updated = { ...formData, faqs: updatedFaqs };
    setFormData(updated);
    updateCMS(updated);
    setIsFaqModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-light text-ink tracking-tight">
            CMS & Content Manager
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Manage FAQs, brand origin story, artisan values, and legal store policies.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-300 text-emerald-800 px-4 py-2 rounded-xl text-xs font-mono font-medium">
            <CheckCircle2 size={15} />
            <span>Content Saved!</span>
          </div>
        )}
      </div>

      {/* FAQs Manager */}
      <div className="bg-paper border border-line rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-2">
            <HelpCircle size={18} className="text-ink" />
            <h2 className="font-display text-xl font-medium text-ink">
              Knowledge Base & FAQs ({formData.faqs.length})
            </h2>
          </div>
          <button
            onClick={handleOpenAddFaq}
            className="bg-ink text-cream px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-ink/90"
          >
            + Add New FAQ
          </button>
        </div>

        <div className="space-y-3">
          {formData.faqs.map((faq) => (
            <div
              key={faq.id}
              className="p-5 rounded-xl border border-line bg-cream flex flex-col sm:flex-row sm:items-start justify-between gap-4"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted bg-paper px-2 py-0.5 rounded border border-line">
                    {faq.category}
                  </span>
                </div>
                <h4 className="font-display font-medium text-sm text-ink">{faq.question}</h4>
                <p className="text-xs text-muted leading-relaxed">{faq.answer}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                <button
                  onClick={() => handleOpenEditFaq(faq)}
                  className="p-1.5 text-muted hover:text-ink rounded"
                  title="Edit FAQ"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleDeleteFaq(faq.id)}
                  className="p-1.5 text-muted hover:text-red-600 rounded"
                  title="Delete FAQ"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Story & Policies Form */}
      <form onSubmit={handleSaveAll} className="bg-paper border border-line rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2 border-b border-line pb-4">
          <FileText size={18} className="text-ink" />
          <h2 className="font-display text-xl font-medium text-ink">About Story & Policy Text</h2>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
            About Page Main Story
          </label>
          <textarea
            rows={4}
            value={formData.aboutStoryText}
            onChange={(e) => setFormData({ ...formData, aboutStoryText: e.target.value })}
            className="w-full bg-cream border border-line rounded-xl p-4 text-sm text-ink focus:outline-none focus:border-ink resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
            Brand Mission Statement
          </label>
          <input
            type="text"
            value={formData.aboutMission}
            onChange={(e) => setFormData({ ...formData, aboutMission: e.target.value })}
            className="w-full bg-cream border border-line rounded-xl px-4 py-3 text-sm text-ink focus:outline-none focus:border-ink"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
              Shipping Policy Highlight
            </label>
            <textarea
              rows={3}
              value={formData.shippingPolicy}
              onChange={(e) => setFormData({ ...formData, shippingPolicy: e.target.value })}
              className="w-full bg-cream border border-line rounded-xl p-3 text-xs text-ink focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
              Return Policy Highlight
            </label>
            <textarea
              rows={3}
              value={formData.returnPolicy}
              onChange={(e) => setFormData({ ...formData, returnPolicy: e.target.value })}
              className="w-full bg-cream border border-line rounded-xl p-3 text-xs text-ink focus:outline-none resize-none"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-ink text-cream px-8 py-3 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-ink/90 transition-colors shadow-sm"
          >
            <Save size={14} />
            Save All Content Updates
          </button>
        </div>
      </form>

      {/* Add / Edit FAQ Modal */}
      {isFaqModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="bg-paper border border-line text-ink w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-display text-xl font-medium text-ink mb-4 pb-3 border-b border-line">
              {editingFaqId ? "Edit FAQ Question" : "Create New FAQ"}
            </h3>

            <form onSubmit={handleSaveFaq} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-cream border border-line rounded-xl px-3 py-2 text-xs focus:outline-none"
                >
                  {faqCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1">
                  Question *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How long do pipe cleaner flowers last?"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="w-full bg-cream border border-line rounded-xl px-4 py-2.5 text-xs text-ink focus:outline-none focus:border-ink"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1">
                  Answer *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detailed answer for customers..."
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  className="w-full bg-cream border border-line rounded-xl p-4 text-xs text-ink focus:outline-none focus:border-ink resize-none"
                />
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t border-line">
                <button
                  type="button"
                  onClick={() => setIsFaqModalOpen(false)}
                  className="px-4 py-2 text-xs font-mono uppercase text-muted hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-ink text-cream px-6 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-ink/90"
                >
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
