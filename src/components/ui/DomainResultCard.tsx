"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Globe, ShoppingCart, Sparkles } from "lucide-react";
import { DomainInfo } from "@/data/mockDomains";
import { NeonBadge } from "./NeonBadge";
import { CyberButton } from "./CyberButton";
import { useCartStore } from "@/store/useCartStore";

interface DomainResultCardProps {
  domain: DomainInfo;
  idx?: number;
}

export function DomainResultCard({ domain, idx = 0 }: DomainResultCardProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const handleBuyDomainOnly = () => {
    if (!domain.available) return;
    addItem({
      domainName: domain.name,
      domainTld: domain.tld,
      domainPrice: domain.price,
    });
    router.push("/cart");
  };

  const handleBuyBundle = () => {
    if (!domain.available) return;
    // Redirect to templates gallery with domain info in query params
    router.push(`/templates?domain=${domain.name}${domain.tld}&price=${domain.price}`);
  };

  const fullName = `${domain.name}${domain.tld}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: idx * 0.05 }}
      className={`glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all duration-300 ${
        domain.available ? "hover:border-electric-cyan/30 hover:shadow-[0_0_25px_rgba(0,242,254,0.05)]" : "opacity-60"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${domain.available ? "bg-electric-cyan/10 text-electric-cyan" : "bg-white/5 text-nebula-slate"}`}>
          <Globe className="w-6 h-6" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xl md:text-2xl font-bold font-display tracking-tight text-star-white">
              {domain.name}
              <span className="text-electric-cyan">{domain.tld}</span>
            </span>
            {domain.premium && (
              <NeonBadge variant="premium">Premium</NeonBadge>
            )}
            {domain.available ? (
              <NeonBadge variant="success">Available</NeonBadge>
            ) : (
              <NeonBadge variant="error">Taken</NeonBadge>
            )}
          </div>
          {domain.available && domain.recommendedTemplateId && (
            <p className="text-xs text-sky-blue mt-1.5 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              SaaS templates highly recommended for this extension
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
        {domain.available ? (
          <div className="text-left md:text-right shrink-0">
            <div className="text-2xl font-bold text-star-white font-heading">
              ${domain.price}
              <span className="text-xs text-nebula-slate/60 font-normal"> / year</span>
            </div>
            <span className="text-xs text-emerald-400 font-medium">Instant Activation</span>
          </div>
        ) : (
          <div className="text-nebula-slate text-sm font-medium">Broker Service Available</div>
        )}

        <div className="flex items-center gap-2 shrink-0">
          {domain.available ? (
            <>
              <button
                onClick={handleBuyDomainOnly}
                className="p-3 bg-white/5 hover:bg-white/15 text-star-white hover:text-electric-cyan border border-white/5 rounded-xl transition-all hover:scale-105 cursor-pointer"
                title="Buy Domain Only"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
              <CyberButton
                onClick={handleBuyBundle}
                variant="purple"
                size="sm"
                className="gap-2"
              >
                Domain + Web Setup
              </CyberButton>
            </>
          ) : (
            <CyberButton variant="glass" size="sm" disabled>
              Acquire Orbit
            </CyberButton>
          )}
        </div>
      </div>
    </motion.div>
  );
}
