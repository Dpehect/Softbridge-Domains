"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore, CartItem } from "@/store/useCartStore";
import { CyberButton } from "@/components/ui/CyberButton";
import { GlassInput } from "@/components/ui/GlassInput";
import { DynamicCounter } from "@/components/ui/DynamicCounter";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { Trash2, CreditCard, Shield, Rocket, CheckCircle, RefreshCw, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    hostingSelected,
    maintenanceSelected,
    seoSelected,
    removeItem,
    toggleHosting,
    toggleMaintenance,
    toggleSeo,
    getCartTotal,
    clearCart,
  } = useCartStore();

  const { oneTimeTotal, monthlyTotal } = getCartTotal();

  // Payment Form States
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Card Flip Focus state
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setCheckoutLoading(true);
    // Simulate transaction security authorization
    setTimeout(() => {
      setCheckoutLoading(false);
      setSuccess(true);
      setTimeout(() => {
        // Clear cart and send to dashboard
        clearCart();
        router.push("/dashboard?ordered=true");
      }, 2500);
    }, 3000);
  };

  const handleRemove = (id: string) => {
    removeItem(id);
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-4 md:px-8 relative overflow-hidden mesh-bg flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto z-10">
        <AnimatePresence mode="wait">
          {success ? (
            /* Holographic Success screen */
            <motion.div
              key="success-screen"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-panel p-16 rounded-[40px] text-center max-w-xl mx-auto space-y-6 border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.2)] bg-emerald-500/5"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle className="w-10 h-10 animate-bounce" />
              </div>
              <div>
                <span className="text-[10px] text-emerald-400 font-heading font-extrabold uppercase tracking-widest block mb-2">
                  TRANSACTION VERIFIED
                </span>
                <h1 className="text-3xl font-heading font-black text-white">
                  ORBIT DEPLOYED
                </h1>
                <p className="text-sm text-nebula-slate mt-2 leading-relaxed">
                  Your domain registration and customized visual setups are locked in. Initializing pipeline routing to your dashboard...
                </p>
              </div>
              <div className="flex justify-center">
                <RefreshCw className="w-6 h-6 text-emerald-400 animate-spin" />
              </div>
            </motion.div>
          ) : (
            /* Cart & Checkout split */
            <motion.div
              key="checkout-split"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col lg:flex-row gap-8 items-stretch"
            >
              {/* Left Side Cart list & Upgrades */}
              <div className="flex-1 space-y-6">
                <div className="glass-panel p-6 md:p-8 rounded-3xl space-y-6">
                  <h2 className="text-2xl font-heading font-black text-star-white uppercase tracking-wider border-b border-white/5 pb-4 flex items-center gap-2">
                    <Layers className="w-6 h-6 text-electric-cyan" /> Secure Cargo Manifest
                  </h2>

                  {items.length > 0 ? (
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
                        >
                          <div>
                            <div className="flex items-center gap-2.5">
                              <span className="text-lg font-bold text-white font-display">
                                {item.domainName}
                                <span className="text-electric-cyan">{item.domainTld}</span>
                              </span>
                              {item.websitePackage && (
                                <NeonBadge variant="premium">Bundle Pack</NeonBadge>
                              )}
                            </div>
                            <span className="text-[10px] text-nebula-slate/60 block mt-1">
                              ANNUAL REGISTRY FEE: ${item.domainPrice}/yr
                            </span>
                            {item.websitePackage && (
                              <div className="mt-2.5 bg-black/35 px-3 py-2 rounded-lg border border-white/5 text-xs text-nebula-slate space-y-1">
                                <p className="font-bold text-star-white">
                                  Template: {item.websitePackage.templateName}
                                </p>
                                <p className="text-[10px]">
                                  Branding Name: "{item.websitePackage.config.brandName}"
                                </p>
                                <div className="flex items-center gap-2 text-[9px] mt-1 font-mono">
                                  <span>Theme:</span>
                                  <span
                                    className="w-2.5 h-2.5 rounded-full inline-block"
                                    style={{ backgroundColor: item.websitePackage.config.theme.primary }}
                                  />
                                  <span
                                    className="w-2.5 h-2.5 rounded-full inline-block"
                                    style={{ backgroundColor: item.websitePackage.config.theme.secondary }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between md:justify-end gap-6">
                            <div className="text-right">
                              <span className="text-xs text-nebula-slate/50 block font-semibold">
                                SUB-TOTAL
                              </span>
                              <span className="text-lg font-bold text-white font-heading">
                                ${item.domainPrice + (item.websitePackage?.setupPrice || 0)}
                              </span>
                            </div>
                            <button
                              onClick={() => handleRemove(item.id)}
                              className="p-3 bg-solar-pink/15 text-solar-pink hover:bg-solar-pink hover:text-white rounded-xl transition-all cursor-pointer"
                              title="Evict item"
                            >
                              <Trash2 className="w-4.5 h-4.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-nebula-slate text-sm">
                      Your manifest is currently empty. Explore premium domains and design configurations first.
                    </div>
                  )}
                </div>

                {/* Cyber Upgrades/Optional Add-ons */}
                <div className="glass-panel p-6 md:p-8 rounded-3xl space-y-6">
                  <h3 className="text-sm font-heading font-black text-star-white uppercase tracking-wider border-b border-white/5 pb-4">
                    Upgrade Modules
                  </h3>

                  <div className="space-y-4">
                    {[
                      {
                        title: "Quantum Cloud Hosting",
                        desc: "High-performance CDN caching, serverless cloud storage and SSL deployment. ($19/mo)",
                        checked: hostingSelected,
                        toggle: toggleHosting,
                      },
                      {
                        title: "Professional Support & SLA Maintenance",
                        desc: "Immediate emergency access, weekly backups, monthly content injections and fixes. ($29/mo)",
                        checked: maintenanceSelected,
                        toggle: toggleMaintenance,
                      },
                      {
                        title: "Advanced SEO & Meta Indexing Index",
                        desc: "Complete Google Sitemap routing, structured schema tags, and keyword placement. ($99 one-time)",
                        checked: seoSelected,
                        toggle: toggleSeo,
                      },
                    ].map((upgrade, idx) => (
                      <div
                        key={idx}
                        onClick={upgrade.toggle}
                        className={`flex gap-4 p-4 rounded-xl border transition-all cursor-pointer select-none ${
                          upgrade.checked
                            ? "bg-electric-cyan/5 border-electric-cyan/30"
                            : "bg-white/5 border-transparent hover:border-white/10"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={upgrade.checked}
                          onChange={() => {}} // Controlled via container click
                          className="mt-1 w-4.5 h-4.5 rounded bg-white/5 border border-white/10 text-electric-cyan shrink-0"
                        />
                        <div>
                          <h4 className="text-sm font-heading font-bold text-star-white uppercase tracking-wider">
                            {upgrade.title}
                          </h4>
                          <p className="text-xs text-nebula-slate mt-1 leading-relaxed">
                            {upgrade.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side Checkout Card Info */}
              <div className="w-full lg:w-96 shrink-0 flex flex-col justify-stretch">
                <div className="glass-panel p-6 md:p-8 rounded-3xl space-y-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-heading font-black text-star-white uppercase tracking-wider border-b border-white/5 pb-4">
                      Deploy Checkout
                    </h2>

                    {/* Credit Card CSS Visualizer */}
                    <div className="my-6 relative w-full h-44 cursor-pointer perspective-1000 group">
                      <motion.div
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full h-full relative preserve-3d shadow-xl rounded-xl"
                      >
                        {/* Front of Card */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple/95 via-purple-900/80 to-abyss-black border border-white/10 p-5 rounded-xl flex flex-col justify-between backface-hidden">
                          <div className="flex justify-between items-start">
                            <CreditCard className="w-9 h-9 text-electric-cyan" />
                            <span className="text-[8px] bg-white/15 border border-white/10 px-2 py-0.5 rounded font-mono font-bold tracking-widest text-white">
                              AETHER DECK
                            </span>
                          </div>
                          <div>
                            <span className="text-lg font-mono tracking-widest text-white block truncate">
                              {cardNumber || "•••• •••• •••• ••••"}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] font-mono">
                            <div>
                              <span className="text-[7px] text-nebula-slate/70 block">CARD HOLDER</span>
                              <span className="truncate uppercase text-white font-bold">{cardHolder || "GENERIC VISITOR"}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[7px] text-nebula-slate/70 block">EXPIRES</span>
                              <span className="text-white font-bold">{expiry || "MM/YY"}</span>
                            </div>
                          </div>
                        </div>

                        {/* Back of Card */}
                        <div
                          className="absolute inset-0 bg-gradient-to-br from-abyss-black via-purple-900/90 to-cosmic-purple border border-white/10 p-5 rounded-xl flex flex-col justify-between backface-hidden"
                          style={{ transform: "rotateY(180deg)" }}
                        >
                          <div className="h-6 w-full bg-black/80 -mx-5 mt-2" />
                          <div className="flex justify-end items-center gap-3">
                            <span className="text-[7px] text-nebula-slate font-mono">SECURE CVC</span>
                            <div className="bg-white text-black font-mono text-xs px-2.5 py-1 rounded tracking-widest font-bold">
                              {cvc || "•••"}
                            </div>
                          </div>
                          <p className="text-[7px] text-nebula-slate/50 font-mono text-center">
                            This card vector registers custom nodes directly to the decentralized registry platform.
                          </p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Inputs form */}
                    <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                      <GlassInput
                        placeholder="Card Number (16-digits)"
                        value={cardNumber}
                        onChange={(e) => {
                          const formatted = e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
                          setCardNumber(formatted);
                        }}
                        onFocus={() => setIsFlipped(false)}
                        required
                      />
                      <GlassInput
                        placeholder="Card Holder Name"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value.slice(0, 24))}
                        onFocus={() => setIsFlipped(false)}
                        required
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <GlassInput
                          placeholder="MM/YY"
                          value={expiry}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, "");
                            if (val.length > 2) val = `${val.slice(0, 2)}/${val.slice(2, 4)}`;
                            setExpiry(val);
                          }}
                          onFocus={() => setIsFlipped(false)}
                          required
                        />
                        <GlassInput
                          placeholder="CVC"
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))}
                          onFocus={() => setIsFlipped(true)}
                          onBlur={() => setIsFlipped(false)}
                          required
                        />
                      </div>
                    </form>
                  </div>

                  {/* Summary Pricing deck */}
                  <div className="border-t border-white/5 pt-6 mt-8 space-y-4">
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-nebula-slate">One-Time Setup Total:</span>
                        <span className="font-bold text-white font-mono">
                          <DynamicCounter value={oneTimeTotal} />
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-nebula-slate">Monthly Service Subscription:</span>
                        <span className="font-bold text-white font-mono">
                          <DynamicCounter value={monthlyTotal} />/mo
                        </span>
                      </div>
                    </div>

                    <div className="h-[1px] bg-white/5" />

                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-[9px] text-nebula-slate/60 block font-semibold uppercase tracking-wider">
                          DUE TODAY
                        </span>
                        <span className="text-3xl font-heading font-black text-star-white font-mono">
                          <DynamicCounter value={oneTimeTotal} />
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-bold uppercase">
                        <Shield className="w-3.5 h-3.5" /> SECURE BANKING
                      </div>
                    </div>

                    <CyberButton
                      disabled={checkoutLoading || items.length === 0}
                      onClick={handleCheckoutSubmit}
                      variant="cyan"
                      className="w-full gap-2 mt-4"
                    >
                      {checkoutLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          AUTHORIZING PROTOCOL...
                        </>
                      ) : (
                        <>
                          <Rocket className="w-4 h-4" />
                          AUTHORIZE & DEPLOY
                        </>
                      )}
                    </CyberButton>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
