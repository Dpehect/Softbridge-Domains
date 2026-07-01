"use client";

import React, { use } from "react";
import { useRouter } from "next/navigation";
import { Globe, ArrowLeft, ShoppingCart, Sparkles, Shield, Award } from "lucide-react";
import { CyberButton } from "@/components/ui/CyberButton";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { useCartStore } from "@/store/useCartStore";
import { mockDomainsSearch, DomainInfo } from "@/utils/domain";
import { templatesData } from "@/data/templatesData";
import Link from "next/link";
import { motion } from "framer-motion";
import { CustomCursor } from "@/components/ui/CustomCursor";

export default function DomainDetailPage({ params }: { params: Promise<{ name: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const rawName = resolvedParams.name;

  // Re-split name into name & extension (e.g. cyberorbit.io -> name: cyberorbit, tld: .io)
  const nameParts = rawName.split(".");
  const name = nameParts[0] || rawName;
  const tld = nameParts[1] ? `.${nameParts[1]}` : ".com";

  const addItem = useCartStore((state) => state.addItem);

  // Search details using our mock engine
  const matches = mockDomainsSearch(name);
  const domainDetail = matches.find((m) => m.tld === tld) || {
    name,
    tld,
    available: true,
    price: 14.99,
    premium: name.length <= 4,
  };

  const handleBuyDomainOnly = () => {
    if (!domainDetail.available) return;
    addItem({
      domainName: domainDetail.name,
      domainTld: domainDetail.tld,
      domainPrice: domainDetail.price,
    });
    router.push("/cart");
  };

  const handleBuyBundle = () => {
    if (!domainDetail.available) return;
    router.push(`/templates?domain=${domainDetail.name}${domainDetail.tld}&price=${domainDetail.price}`);
  };

  const alternativeDomains = matches.filter((m) => m.tld !== tld).slice(0, 3);
  const recommendedTemplates = templatesData.slice(0, 2);

  return (
    <main className="min-h-screen pt-24 pb-12 px-4 md:px-8 relative overflow-hidden thin-wireframe-grid">
      {/* Custom Awwwards Cursor */}
      <CustomCursor />

      <div className="w-full max-w-6xl mx-auto space-y-7 relative z-10">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-muted-steel hover:text-cosmic-teal transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to registers
          </Link>
        </div>

        {/* Split Details & Visual Core */}
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          {/* Left Side Holographic display */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center relative min-h-[240px]">
            <div className="relative w-64 h-64 rounded-full border border-black/5 flex items-center justify-center">
              {/* Pulsing glow ring */}
              <div className="absolute inset-0 border border-dashed border-cosmic-teal/15 rounded-full animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-8 border border-dashed border-sunset-coral/20 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="w-40 h-40 rounded-full border border-black/10 flex items-center justify-center bg-abyss-panel/70 shadow-sm relative"
              >
                <Globe className="w-16 h-16 text-cosmic-teal opacity-80" />
              </motion.div>
            </div>
          </div>

          {/* Right Side Pricing & Actions */}
          <div className="flex-1 space-y-4">
            <div>
              <span className="text-[10px] text-cosmic-teal font-heading font-extrabold uppercase tracking-widest bg-cosmic-teal/15 px-3.5 py-1 rounded-full border border-cosmic-teal/25 mb-4 inline-block">
                Registry Details
              </span>
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-star-white leading-none">
                {domainDetail.name}
                <span className="text-cosmic-gradient">{domainDetail.tld}</span>
              </h1>
              <div className="flex items-center gap-2 mt-3">
                {domainDetail.premium && (
                  <NeonBadge variant="premium">Premium Class</NeonBadge>
                )}
                {domainDetail.available ? (
                  <NeonBadge variant="success">Available</NeonBadge>
                ) : (
                  <NeonBadge variant="error">Acquired</NeonBadge>
                )}
              </div>
            </div>

            <p className="text-sm text-muted-steel leading-relaxed">
              This coordinate name represents an active gateway point. Register now to gain control of name resolution pipelines and deploy siber storefronts.
            </p>

            {domainDetail.available ? (
              <div className="glass-panel p-4 rounded-2xl border-white/5 space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-heading font-bold text-star-white">
                    ${domainDetail.price}
                  </span>
                  <span className="text-xs text-muted-steel/60">/ year registration fee</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <CyberButton
                    onClick={handleBuyBundle}
                    variant="teal"
                    className="flex-1 gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Domain + Website Bundle
                  </CyberButton>
                  <CyberButton
                    onClick={handleBuyDomainOnly}
                    variant="glass"
                    className="gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Buy Domain Only
                  </CyberButton>
                </div>
              </div>
            ) : (
              <div className="glass-panel p-4 rounded-2xl border-white/5 space-y-3">
                <p className="text-xs text-sunset-coral font-bold flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> REGISTRY ACQUIRED BY OTHER PARTY
                </p>
                <p className="text-xs text-muted-steel">
                  This domain name is currently unavailable. Try looking at alternatives below or request broker assistance.
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 text-xs text-muted-steel pt-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cosmic-teal shrink-0" />
                Complete DNSSEC security locks
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cosmic-teal shrink-0" />
                WHOIS privacy masking
              </div>
            </div>
          </div>
        </div>

        <div className="h-[1px] bg-white/5" />

        {/* Alternatives & Recommended templates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Alternatives list */}
          <div className="space-y-4">
            <h3 className="text-sm font-heading font-bold text-star-white uppercase tracking-wider">
              Alternative Orbits Suggested
            </h3>
            <div className="space-y-3">
              {alternativeDomains.map((alt) => (
                <div
                  key={alt.tld}
                  onClick={() => router.push(`/domain/${alt.name}${alt.tld}`)}
                  className="glass-panel px-4 py-2.5 rounded-xl flex items-center justify-between hover:border-white/10 hover:scale-[1.01] transition-all cursor-pointer border-white/5"
                >
                  <span className="text-sm font-bold font-display text-star-white">
                    {alt.name}
                    <span className="text-cosmic-teal">{alt.tld}</span>
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-star-white font-bold font-mono">
                      ${alt.price}
                    </span>
                    <NeonBadge variant="success" className="text-[9px] px-2.5 py-0.5">
                      Available
                    </NeonBadge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested templates */}
          <div className="space-y-4">
            <h3 className="text-sm font-heading font-bold text-star-white uppercase tracking-wider">
              Best Design Templates for this Domain
            </h3>
            <div className="space-y-3">
              {recommendedTemplates.map((tpl) => (
                <div
                  key={tpl.id}
                  onClick={() => router.push(`/studio?template=${tpl.id}&domain=${domainDetail.name}${domainDetail.tld}&price=${domainDetail.price}`)}
                  className="glass-panel p-3.5 rounded-xl flex items-center justify-between border-white/5 hover:border-white/10 hover:scale-[1.01] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={tpl.image}
                      alt={tpl.name}
                      className="w-12 h-12 object-cover rounded-lg border border-white/10"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">{tpl.name}</span>
                      <span className="text-[10px] text-muted-steel/60">{tpl.category}</span>
                    </div>
                  </div>
                  <CyberButton variant="teal" size="sm" className="text-[9px] px-3.5 py-1.5">
                    Match
                  </CyberButton>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
