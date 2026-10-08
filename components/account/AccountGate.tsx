"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart, LogOut, MapPin, Package, User } from "lucide-react";
import { useCustomerAuth } from "@/lib/customerAuth";

type AuthMode = "signin" | "signup" | "forgot";

export default function AccountGate() {
  const { user, isLoading, error: authError, signIn, signUp, resetPassword, logout } = useCustomerAuth();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setMessage(null);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    if (mode === "forgot") {
      const result = await resetPassword(email);
      setMessage(result.success ? { type: "success", text: "Check your inbox for a password reset link." } : { type: "error", text: result.error || "Unable to send the reset email." });
    } else if (mode === "signup") {
      const result = await signUp(name, email, password);
      if (!result.success) setMessage({ type: "error", text: result.error || "Unable to create your account." });
    } else {
      const result = await signIn(email, password);
      if (!result.success) setMessage({ type: "error", text: result.error || "Unable to sign in." });
    }

    setIsSubmitting(false);
  };

  if (isLoading) {
    return <div className="min-h-[60vh] flex items-center justify-center text-xs font-mono uppercase tracking-widest text-muted">Loading your account...</div>;
  }

  if (!user) {
    const isForgot = mode === "forgot";
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-[5vw] py-16">
        <div className="w-full max-w-md bg-paper border border-line rounded-3xl p-7 sm:p-10 shadow-sm">
          <div className="mb-8">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-3">BLOOMSOME / MEMBERS</p>
            <h1 className="font-display text-4xl font-light text-ink">{isForgot ? "Reset your password" : mode === "signup" ? "Create your account" : "Welcome back"}</h1>
            <p className="text-sm text-muted mt-3">{isForgot ? "We’ll send a secure reset link to your email." : "Keep your orders, wishlist and gifting details close."}</p>
          </div>

          {(message || authError) && <div className={`${message?.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-rose-50 border-rose-200 text-rose-800"} border rounded-xl px-4 py-3 text-xs mb-5`}>{message?.text || authError}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && <label className="block text-xs font-mono uppercase tracking-wider text-muted">Your name<input required value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" className="mt-2 w-full bg-cream border border-line rounded-xl px-4 py-3 text-sm text-ink focus:outline-none focus:border-ink" /></label>}
            <label className="block text-xs font-mono uppercase tracking-wider text-muted">Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" className="mt-2 w-full bg-cream border border-line rounded-xl px-4 py-3 text-sm text-ink focus:outline-none focus:border-ink" /></label>
            {!isForgot && <label className="block text-xs font-mono uppercase tracking-wider text-muted">Password<input required minLength={6} type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={mode === "signup" ? "new-password" : "current-password"} className="mt-2 w-full bg-cream border border-line rounded-xl px-4 py-3 text-sm text-ink focus:outline-none focus:border-ink" /></label>}
            <button disabled={isSubmitting} type="submit" className="w-full bg-ink text-cream py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-ink/90 disabled:opacity-60">{isSubmitting ? "Please wait..." : isForgot ? "Email reset link" : mode === "signup" ? "Create account" : "Sign in"}</button>
          </form>

          <div className="flex flex-col gap-3 mt-7 text-center text-xs">
            {mode === "signin" && <button type="button" onClick={() => selectMode("forgot")} className="text-muted hover:text-ink">Forgot your password?</button>}
            {isForgot ? <button type="button" onClick={() => selectMode("signin")} className="text-ink underline underline-offset-4">Back to sign in</button> : <button type="button" onClick={() => selectMode(mode === "signin" ? "signup" : "signin")} className="text-ink underline underline-offset-4">{mode === "signin" ? "New here? Create an account" : "Already have an account? Sign in"}</button>}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream">
      <section className="border-b border-line px-[5vw] py-12 lg:py-16 text-center max-w-4xl mx-auto">
        <span className="inline-block text-[11px] font-mono tracking-[0.25em] text-muted uppercase mb-3">Member Dashboard</span>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-ink tracking-tight mb-2">Welcome, <span className="italic font-serif">{user.name || "friend"}</span></h1>
        <p className="text-muted text-sm max-w-md mx-auto">Manage your floral orders, shipping details, and favorite handcrafted keepsakes.</p>
        <button onClick={logout} className="inline-flex items-center gap-2 mt-5 text-xs font-mono uppercase tracking-wider text-muted hover:text-ink"><LogOut size={14} /> Sign out</button>
      </section>
      <section className="px-[5vw] py-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AccountCard href="/track-order" icon={<Package size={22} />} title="Orders & Tracking" description="Track current handmade crafting progress and courier dispatches." action="View orders" />
          <AccountCard href="/wishlist" icon={<Heart size={22} />} title="Saved Wishlist" description="Flowers and gifts saved for upcoming birthdays and anniversaries." action="View wishlist" />
          <AccountCard href="/custom" icon={<User size={22} />} title="Bespoke Requests" description="Create custom bouquets, select color palettes, and add personal notes." action="Start builder" />
        </div>
      </section>
    </main>
  );
}

function AccountCard({ href, icon, title, description, action }: { href: string; icon: React.ReactNode; title: string; description: string; action: string }) {
  return <Link href={href} className="bg-paper border border-line p-8 rounded-2xl hover:border-ink/40 transition-colors group flex flex-col justify-between"><div><div className="w-12 h-12 rounded-xl bg-cream border border-line flex items-center justify-center text-ink mb-6">{icon}</div><h2 className="font-display text-xl text-ink font-medium mb-1">{title}</h2><p className="text-xs text-muted">{description}</p></div><span className="mt-8 inline-flex items-center gap-2 text-xs font-mono uppercase text-ink group-hover:translate-x-1 transition-transform">{action} <ArrowRight size={14} /></span></Link>;
}
