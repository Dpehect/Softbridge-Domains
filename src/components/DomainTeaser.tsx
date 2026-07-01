"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight, Globe, Zap, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { domainCatalog } from "@/data/mockDomains";

// ─── Featured spotlight domains ──────────────────────────────────
const spotlightDomains = domainCatalog.filter((d) => d.available).slice(0, 6);

export default function DomainTeaser() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  };

  return (
    <section className="w-full mb-12 relative overflow-hidden">
      {/* Soft ambient glow */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-cosmic-teal/5 blur-3xl pointer-events-none" />

      {/* ── Section header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-3 border-b border-black/5 pb-4">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-cosmic-teal font-semibold block mb-1">
            DOMAIN REGISTRY
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-star-white">
            Available Domains
          </h2>
          <p className="text-xs text-muted-steel mt-1.5 max-w-md leading-relaxed font-normal">
            Discover premium brand names, short tech domains, and brandable assets available for instant acquisition.
          </p>
        </div>

        <motion.a
          href="/search"
          whileHover={{ y: -1.5, scale: 1.015 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className="flex items-center gap-2 px-5 py-2.5 bg-cosmic-teal text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider shadow-sm hover:bg-[#D94F2E] transition-colors duration-350 cursor-pointer shrink-0"
        >
          Browse All Domains
          <ArrowRight className="w-4 h-4" />
        </motion.a>
      </div>

      {/* ── Inline search bar ── */}
      <form onSubmit={handleSearch} className="mb-5">
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-steel/60 pointer-events-none" />
          <input
            type="text"
            placeholder="Search domain names — e.g. flux, nova, orbit..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-abyss-panel/60 border border-black/8 text-star-white placeholder:text-muted-steel/50 text-sm font-sans py-3 pl-10 pr-32 rounded-xl focus:outline-none focus:border-cosmic-teal/40 transition-all duration-350"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-cosmic-teal text-white rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-colors duration-350 hover:bg-[#D94F2E] cursor-pointer"
          >
            Search
          </button>
        </div>
      </form>

      {/* ── Spotlight domain grid ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
      >
        {spotlightDomains.map((domain) => (
          <motion.a
            key={domain.id}
            href="/search"
            variants={{
              hidden:   { opacity: 0, y: 20 },
              visible:  { opacity: 1, y: 0, transition: { type: "spring", stiffness: 180, damping: 22 } },
            }}
            whileHover={{ y: -2, transition: { type: "spring", stiffness: 320, damping: 22 } }}
            className="group flex items-center justify-between bg-abyss-panel/50 border border-black/6 rounded-2xl px-4 py-3.5 hover:border-[#E85D3B]/20 hover:shadow-md hover:shadow-[#E85D3B]/5 transition-all duration-400 cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-cosmic-teal/10 border border-cosmic-teal/15 flex items-center justify-center shrink-0">
                <Globe className="w-4 h-4 text-cosmic-teal" />
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-0.5">
                  <span className="font-display font-bold text-base text-star-white group-hover:text-cosmic-teal transition-colors duration-400 truncate">
                    {domain.name}
                  </span>
                  <span className="font-mono text-xs text-cosmic-teal/80 shrink-0">{domain.tld}</span>
                </div>
                <span className="text-[9px] font-mono text-muted-steel/70 uppercase tracking-wider">{domain.category}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 ml-3">
              <span className="font-mono font-black text-sm text-[#E85D3B]">
                {domain.price >= 1000
                  ? `$${(domain.price / 1000).toFixed(domain.price % 1000 === 0 ? 0 : 1)}k`
                  : `$${domain.price}`}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-steel/40 group-hover:text-cosmic-teal group-hover:translate-x-0.5 transition-all duration-350" />
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* ── Stats strip ── */}
      <div className="mt-5 flex flex-wrap gap-4 justify-center md:justify-start">
        {[
          { icon: Globe, label: `${domainCatalog.filter((d) => d.available).length} Available`, color: "text-emerald-500" },
          { icon: Star,  label: `${domainCatalog.filter((d) => d.category === "Premium").length} Premium Names`, color: "text-[#E85D3B]" },
          { icon: Zap,   label: "Instant Transfer", color: "text-cosmic-teal" },
        ].map(({ icon: Icon, label, color }) => (
          <div key={label} className={`flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider ${color}`}>
            <Icon className="w-3.5 h-3.5" />
            {label}
          </div>
        ))}
      </div>
    </section>
  );
}
