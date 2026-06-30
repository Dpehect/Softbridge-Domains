"use client";

import React, { use } from "react";
import { useRouter } from "next/navigation";
import { Globe, ArrowLeft, ShoppingCart, Sparkles, Shield, Award } from "lucide-react";
import { CyberButton } from "@/components/ui/CyberButton";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { useCartStore } from "@/store/useCartStore";
import { mockDomainsSearch } from "@/data/mockDomains";
import { templatesData } from "@/data/templatesData";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DomainDetailPage({ params }: { params: Promise<{ name: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const rawName = resolvedParams.name;

  const nameParts = rawName.split(".");
  const name = nameParts[0] || rawName;
  const tld = nameParts[1] ? `.${nameParts[1]}` : ".com";

  const addItem = useCartStore((state) => state.addItem);

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
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 relative overflow-hidden bg-apple-bg">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto space-y-12 relative z-10">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-apple-gray hover:text-apple-text transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to registers
          </Link>
        </div>

        {/* Split Details & Visual Core */}
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Side Visual representation */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center relative min-h-[300px]">
            <div className="relative w-72 h-72 rounded-full border border-white/5 flex items-center justify-center bg-apple-card/30">
              <Globe className="w-16 h-16 text-apple-teal opacity-70" />
              <div className="absolute inset-0 border border-dashed border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
            </div>
          </div>

          {/* Right Side Pricing & Actions */}
          <div className="flex-1 space-y-6">
            <div>
              <span className="text-[10px] text-apple-teal font-mono uppercase tracking-widest bg-white/5 px-3 py-1 rounded border border-white/5 mb-4 inline-block">
                Coordinate Details
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-apple-text tracking-tight leading-none">
                {domainDetail.name}
                <span className="text-apple-teal">{domainDetail.tld}</span>
              </h1>
              <div className="flex items-center gap-2 mt-4">
                {domainDetail.premium && (
                  <span className="text-[9px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-0.5 rounded text-apple-text">
                    Premium Class
                  </span>
                )}
                {domainDetail.available ? (
                  <span className="text-[9px] font-mono uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-emerald-400">
                    Available
                  </span>
                ) : (
                  <span className="text-[9px] font-mono uppercase tracking-wider bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded text-red-400">
                    Acquired
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm text-apple-gray leading-relaxed font-light">
              This coordinate name represents an active gateway point. Register now to gain control of name resolution channels and deploy clean storefronts.
            </p>

            {domainDetail.available ? (
              <div className="bg-apple-card border border-white/5 p-6 rounded-xl space-y-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-heading font-bold text-apple-text">
                    ${domainDetail.price}
                  </span>
                  <span className="text-xs text-apple-gray">/ year registration fee</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <CyberButton
                    onClick={handleBuyBundle}
                    variant="primary"
                    className="flex-1 gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Domain + Website Bundle
                  </CyberButton>
                  <CyberButton
                    onClick={handleBuyDomainOnly}
                    variant="secondary"
                    className="gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Buy Domain Only
                  </CyberButton>
                </div>
              </div>
            ) : (
              <div className="bg-apple-card border border-white/5 p-6 rounded-xl space-y-4">
                <p className="text-xs text-apple-blue font-bold flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> REGISTRY ACQUIRED BY OTHER PARTY
                </p>
                <p className="text-xs text-apple-gray">
                  This domain name is currently unavailable. Try looking at alternatives below or request broker assistance.
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 text-xs text-apple-gray pt-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-apple-teal shrink-0" />
                Complete DNSSEC security locks
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-apple-teal shrink-0" />
                WHOIS privacy masking
              </div>
            </div>
          </div>
        </div>

        <div className="h-[1px] bg-white/5" />

        {/* Alternatives & Recommended templates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Alternatives list */}
          <div className="space-y-4">
            <h3 className="text-sm font-sans font-bold text-apple-text uppercase tracking-wider">
              Alternative Coordinates
            </h3>
            <div className="space-y-3">
              {alternativeDomains.map((alt) => (
                <div
                  key={alt.tld}
                  onClick={() => router.push(`/domain/${alt.name}${alt.tld}`)}
                  className="bg-apple-card border border-white/5 px-5 py-3.5 rounded-xl flex items-center justify-between hover:border-white/10 hover:scale-[1.01] transition-all cursor-pointer"
                >
                  <span className="text-sm font-bold font-display text-apple-text">
                    {alt.name}
                    <span className="text-apple-teal">{alt.tld}</span>
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-apple-text font-bold font-mono">
                      ${alt.price}
                    </span>
                    <span className="text-[8px] font-mono uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-emerald-400">
                      Available
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested templates */}
          <div className="space-y-4">
            <h3 className="text-sm font-sans font-bold text-apple-text uppercase tracking-wider">
              Suggested Website Layouts
            </h3>
            <div className="space-y-3">
              {recommendedTemplates.map((tpl) => (
                <div
                  key={tpl.id}
                  onClick={() => router.push(`/studio?template=${tpl.id}&domain=${domainDetail.name}${domainDetail.tld}&price=${domainDetail.price}`)}
                  className="bg-apple-card border border-white/5 p-4 rounded-xl flex items-center justify-between hover:border-white/10 hover:scale-[1.01] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={tpl.image}
                      alt={tpl.name}
                      className="w-12 h-12 object-cover rounded-lg border border-white/10"
                    />
                    <div>
                      <span className="text-xs font-bold text-apple-text block">{tpl.name}</span>
                      <span className="text-[10px] text-apple-gray">{tpl.category}</span>
                    </div>
                  </div>
                  <CyberButton variant="primary" size="sm" className="text-[10px]">
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
