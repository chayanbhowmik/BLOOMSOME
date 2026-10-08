"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  ShoppingBag,
  Flower2,
  Users,
  Star,
  Tag,
  Home,
  FileText,
  Lock,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { useAdminAuth } from "@/lib/adminAuth";
import { useAdminStore } from "@/lib/adminStore";
import AdminOverview from "./AdminOverview";
import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";
import AdminCustomers from "./AdminCustomers";
import AdminReviews from "./AdminReviews";
import AdminCoupons from "./AdminCoupons";
import AdminHomepage from "./AdminHomepage";
import AdminCMS from "./AdminCMS";

export default function AdminDashboard() {
  const { user, logout, changePassword, login, isAuthenticated, isLoading, authError } = useAdminAuth();
  const { stats, reviews, resetToDefaults } = useAdminStore();
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Security / password change state
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [passMessage, setPassMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const pendingReviewsCount = reviews.filter((r) => r.status === "pending").length;

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await changePassword(currentPass, newPass);
    if (result.success) {
      setPassMessage({ type: "success", text: "Admin password updated successfully!" });
      setCurrentPass("");
      setNewPass("");
    } else {
      setPassMessage({ type: "error", text: result.error || "Failed to update password." });
    }
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "orders", label: "Orders", icon: ShoppingBag, badge: stats.pendingOrdersCount > 0 ? `${stats.pendingOrdersCount}` : undefined },
    { id: "products", label: "Products", icon: Flower2, badge: stats.lowStockCount > 0 ? `Alert ${stats.lowStockCount}` : undefined },
    { id: "customers", label: "Customers", icon: Users },
    { id: "reviews", label: "Reviews", icon: Star, badge: pendingReviewsCount > 0 ? `${pendingReviewsCount}` : undefined },
    { id: "coupons", label: "Coupons", icon: Tag },
    { id: "homepage", label: "Homepage & Banners", icon: Home },
    { id: "cms", label: "CMS & FAQs", icon: FileText },
    { id: "settings", label: "Security & Settings", icon: Lock },
  ];

  if (isLoading) {
    return <div className="min-h-screen bg-cream flex items-center justify-center text-xs font-mono uppercase tracking-widest text-muted">Verifying admin access...</div>;
  }

  if (!isAuthenticated || !user) return <AdminLogin onLogin={login} authError={authError} />;

  return (
    <div className="min-h-screen bg-cream text-ink flex flex-col lg:flex-row">
      
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-64 xl:w-72 bg-ink text-cream p-6 flex-col justify-between shrink-0 min-h-screen sticky top-0 border-r border-white/10">
        <div>
          {/* Brand Logo */}
          <div className="pb-6 border-b border-white/10">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="BLOOMSOME"
                width={150}
                height={45}
                className="h-9 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <div className="flex items-center gap-1.5 mt-2 text-[10px] font-mono text-cream/70 uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Admin Atelier</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-colors ${
                    isActive
                      ? "bg-cream text-ink font-bold shadow-xs"
                      : "text-cream/80 hover:bg-white/10 hover:text-cream"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? "bg-ink text-cream"
                          : "bg-amber-400 text-ink"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Info & Store Quicklink */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono bg-white/5 hover:bg-white/10 text-cream/80 hover:text-cream transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={13} /> View Live Store
            </span>
            <span>↗</span>
          </Link>

          <div className="flex items-center justify-between px-1">
            <div className="min-w-0">
              <p className="text-xs font-medium text-cream truncate">{user?.name || "Admin"}</p>
              <p className="text-[10px] text-cream/60 font-mono truncate">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="p-2 text-cream/70 hover:text-rose-400 hover:bg-white/10 rounded-lg transition-colors"
              title="Log out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="lg:hidden bg-ink text-cream px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="BLOOMSOME"
            width={130}
            height={38}
            className="h-8 w-auto object-contain brightness-0 invert"
          />
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 text-cream hover:bg-white/10 rounded-lg"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-ink text-cream px-6 py-6 border-b border-white/10 space-y-2 z-40">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-mono ${
                  isActive ? "bg-cream text-ink font-bold" : "text-cream/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-amber-400 text-ink text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <Link href="/" target="_blank" className="text-xs text-cream/80 underline font-mono">
              View Live Store ↗
            </Link>
            <button
              onClick={logout}
              className="text-xs font-mono text-rose-400 flex items-center gap-1.5"
            >
              <LogOut size={14} /> Log out
            </button>
          </div>
        </div>
      )}

      {/* Main Admin View Content */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto w-full">
        {activeTab === "overview" && <AdminOverview onNavigateTab={(tab) => setActiveTab(tab)} />}
        {activeTab === "orders" && <AdminOrders />}
        {activeTab === "products" && <AdminProducts />}
        {activeTab === "customers" && <AdminCustomers />}
        {activeTab === "reviews" && <AdminReviews />}
        {activeTab === "coupons" && <AdminCoupons />}
        {activeTab === "homepage" && <AdminHomepage />}
        {activeTab === "cms" && <AdminCMS />}

        {/* Security & Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-light text-ink tracking-tight">
                Security & Platform Settings
              </h1>
              <p className="text-xs sm:text-sm text-muted">
                Manage master administrator credentials, session configurations, and local database cache.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Password Change Box */}
              <div className="bg-paper border border-line rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-center gap-2 border-b border-line pb-4">
                  <ShieldCheck size={18} className="text-ink" />
                  <h2 className="font-display text-xl font-medium text-ink">Change Admin Password</h2>
                </div>

                {passMessage && (
                  <div
                    className={`p-3.5 rounded-xl text-xs font-mono ${
                      passMessage.type === "success"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-rose-100 text-rose-800 border border-rose-300"
                    }`}
                  >
                    {passMessage.text}
                  </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                      className="w-full bg-cream border border-line rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-ink"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1">
                      New Password (Min 8 characters)
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      className="w-full bg-cream border border-line rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-ink"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-ink text-cream py-3 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-ink/90 transition-colors shadow-sm"
                  >
                    Update Password
                  </button>
                </form>
              </div>

              {/* Data Reset & Session Info */}
              <div className="space-y-6">
                <div className="bg-paper border border-line rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
                  <h3 className="font-display text-lg font-medium text-ink">Session Information</h3>
                  <div className="text-xs space-y-2 text-muted">
                    <p className="flex justify-between">
                      <span>Authenticated Admin:</span>
                      <strong className="text-ink">{user?.name}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span>Email:</span>
                      <strong className="text-ink font-mono">{user?.email}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span>Role:</span>
                      <strong className="text-ink uppercase font-mono">{user?.role}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span>Session Expiry:</span>
                      <strong className="text-ink">24 Hours (Rolling)</strong>
                    </p>
                  </div>
                </div>

                <div className="bg-paper border border-line rounded-2xl p-6 sm:p-8 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-amber-800">
                    <RotateCcw size={16} />
                    <h3 className="font-display text-lg font-medium text-ink">Reset Demo Store Data</h3>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    Reset all products, orders, customers, reviews, and CMS texts back to the original studio initial state.
                  </p>
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to reset all data to default mock values?")) {
                        resetToDefaults();
                        alert("Database cache reset to initial studio values!");
                      }
                    }}
                    className="inline-flex items-center gap-2 bg-cream border border-line text-xs font-mono uppercase px-4 py-2.5 rounded-xl hover:border-ink transition-colors"
                  >
                    <RotateCcw size={13} />
                    Reset Data to Studio Defaults
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>

    </div>
  );
}

function AdminLogin({
  onLogin,
  authError,
}: {
  onLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  authError: string | null;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(authError);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const result = await onLogin(email, password);
    if (!result.success) setError(result.error || "Sign-in failed.");
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-paper border border-line rounded-3xl p-8 sm:p-10 shadow-xl">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-3">BLOOMSOME / PRIVATE</p>
            <h1 className="font-display text-3xl text-ink font-light">Admin Atelier</h1>
          </div>
          <ShieldCheck className="text-ink" size={28} strokeWidth={1.5} />
        </div>
        <p className="text-sm text-muted leading-relaxed mb-8">Sign in with an authorized Firebase administrator account to manage the store.</p>
        {(error || authError) && <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-xl px-4 py-3 text-xs mb-5">{error || authError}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block text-xs font-mono uppercase tracking-wider text-muted">Admin email<input type="email" required autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full bg-cream border border-line rounded-xl px-4 py-3 text-sm text-ink focus:outline-none focus:border-ink" /></label>
          <label className="block text-xs font-mono uppercase tracking-wider text-muted">Password<input type="password" required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full bg-cream border border-line rounded-xl px-4 py-3 text-sm text-ink focus:outline-none focus:border-ink" /></label>
          <button type="submit" disabled={isSubmitting} className="w-full bg-ink text-cream py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-ink/90 disabled:opacity-60">{isSubmitting ? "Authenticating..." : "Enter dashboard"}</button>
        </form>
        <p className="text-[11px] text-muted mt-7 text-center">Access is controlled by Firebase Authentication and the admins collection.</p>
      </div>
    </main>
  );
}
