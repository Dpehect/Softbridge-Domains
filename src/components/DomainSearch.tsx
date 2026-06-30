"use client";

import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Globe,
  ShoppingCart,
  Star,
  X,
  Check,
  TrendingUp,
  Zap,
  ChevronDown,
  ChevronUp,
  Lock,
} from "lucide-react";
import {
  domainCatalog,
  filterDomains,
  ALL_TLDS,
  ALL_CATEGORIES,
  DomainListing,
} from "@/data/mockDomains";
import { useCartStore } from "@/store/useCartStore";

// ─── Price formatter ─────────────────────────────────────────────
const fmt = (n: number) =>
  n >= 1000
    ? `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`
    : `$${n.toLocaleString()}`;

// ─── Category badge colors ────────────────────────────────────────
const categoryColor: Record<DomainListing["category"], string> = {
  Premium:   "bg-[#E85D3B]/12 text-[#E85D3B] border-[#E85D3B]/25",
  Short:     "bg-[#C4452A]/10 text-[#C4452A] border-[#C4452A]/20",
  Brandable: "bg-[#D94F2E]/10 text-[#D94F2E] border-[#D94F2E]/20",
  Tech:      "bg-[#7A4633]/10 text-[#7A4633] border-[#7A4633]/20",
  Commerce:  "bg-[#5C2E1F]/10 text-[#5C2E1F] border-[#5C2E1F]/20",
  Creative:  "bg-[#E85D3B]/8 text-[#D94F2E] border-[#D94F2E]/15",
};

// ─── Domain Card ─────────────────────────────────────────────────
const cardVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 180, damping: 22, mass: 0.8 } },
  exit:    { opacity: 0, y: -12, scale: 0.96, transition: { duration: 0.25 } },
};

function DomainCard({ domain, idx }: { domain: DomainListing; idx: number }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!domain.available) return;
    addItem({
      domainName: domain.name,
      domainTld: domain.tld,
      domainPrice: domain.price,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ delay: idx * 0.04 }}
      layout
      className={`group relative bg-abyss-panel/60 border rounded-3xl p-5 flex flex-col gap-4 transition-all duration-400 ${
        domain.available
          ? "border-black/6 hover:border-[#E85D3B]/20 hover:shadow-lg hover:shadow-[#E85D3B]/5 hover:-translate-y-0.5"
          : "border-black/4 opacity-70"
      }`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Category badge */}
            <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg border ${categoryColor[domain.category]}`}>
              {domain.category}
            </span>
            {/* Length badge */}
            <span className="text-[9px] font-mono text-muted-steel/70 uppercase tracking-wider">
              {domain.length}
            </span>
          </div>

          {/* Domain name */}
          <div className="mt-2 flex items-baseline gap-0.5">
            <span className="font-display font-black text-2xl text-star-white tracking-tight leading-none group-hover:text-cosmic-teal transition-colors duration-400">
              {domain.name}
            </span>
            <span className="font-mono font-bold text-sm text-cosmic-teal/80">
              {domain.tld}
            </span>
          </div>

          {/* Description */}
          <p className="mt-1.5 text-[11px] text-muted-steel leading-relaxed line-clamp-2 font-light">
            {domain.description}
          </p>
        </div>

        {/* Availability indicator */}
        <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${
          domain.available
            ? "bg-emerald-400/10 border border-emerald-400/20"
            : "bg-red-400/10 border border-red-400/20"
        }`}>
          {domain.available
            ? <Globe className="w-4 h-4 text-emerald-400" />
            : <Lock className="w-4 h-4 text-red-400" />
          }
        </div>
      </div>

      {/* Stats row (if available) */}
      {(domain.monthlyTraffic || domain.mrr) && (
        <div className="flex gap-3">
          {domain.monthlyTraffic && (
            <div className="flex items-center gap-1 text-[10px] font-mono text-muted-steel">
              <TrendingUp className="w-3 h-3 text-cosmic-teal" />
              {(domain.monthlyTraffic / 1000).toFixed(0)}k/mo traffic
            </div>
          )}
          {domain.mrr && (
            <div className="flex items-center gap-1 text-[10px] font-mono text-muted-steel">
              <Zap className="w-3 h-3 text-[#D94F2E]" />
              ${domain.mrr}/mo MRR
            </div>
          )}
        </div>
      )}

      {/* Footer: price + CTA */}
      <div className="flex items-center justify-between border-t border-black/5 pt-3 mt-auto">
        <div>
          {domain.available ? (
            <>
              <span className="text-[9px] text-muted-steel uppercase font-mono tracking-wider block">Asking Price</span>
              <span className="font-mono font-black text-lg text-[#E85D3B]">{fmt(domain.price)}</span>
            </>
          ) : (
            <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider">Registered</span>
          )}
        </div>

        {domain.available ? (
          <motion.button
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            onClick={handleAddToCart}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-350 cursor-pointer ${
              added
                ? "bg-emerald-400/15 text-emerald-500 border border-emerald-400/30"
                : "bg-cosmic-teal text-white hover:bg-[#D94F2E] border border-transparent shadow-sm"
            }`}
          >
            {added ? (
              <><Check className="w-3.5 h-3.5" /> Added</>
            ) : (
              <><ShoppingCart className="w-3.5 h-3.5" /> Add to Cart</>
            )}
          </motion.button>
        ) : (
          <span className="text-[10px] font-mono text-muted-steel/60 uppercase tracking-wider">Unavailable</span>
        )}
      </div>
    </motion.div>
  );
}

// ─── Filter Pill ─────────────────────────────────────────────────
function FilterPill({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider border transition-all duration-300 cursor-pointer ${
        active
          ? "bg-cosmic-teal text-white border-cosmic-teal shadow-sm"
          : "bg-transparent text-muted-steel border-black/8 hover:border-[#E85D3B]/30 hover:text-star-white"
      }`}
    >
      {label}
    </button>
  );
}

// ─── Main DomainSearch Component ─────────────────────────────────
export default function DomainSearch() {
  const [query, setQuery]               = useState("");
  const [selectedTlds, setSelectedTlds] = useState<string[]>([]);
  const [selectedCats, setSelectedCats] = useState<DomainListing["category"][]>([]);
  const [selectedLengths, setSelectedLengths] = useState<DomainListing["length"][]>([]);
  const [maxPrice, setMaxPrice]         = useState(50000);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [showFilters, setShowFilters]   = useState(false);
  const [sortBy, setSortBy]             = useState<"price-asc" | "price-desc" | "name">("price-asc");

  // Toggle helpers
  const toggleTld    = useCallback((t: string) => setSelectedTlds((p) => p.includes(t) ? p.filter((x) => x !== t) : [...p, t]), []);
  const toggleCat    = useCallback((c: DomainListing["category"]) => setSelectedCats((p) => p.includes(c) ? p.filter((x) => x !== c) : [...p, c]), []);
  const toggleLength = useCallback((l: DomainListing["length"]) => setSelectedLengths((p) => p.includes(l) ? p.filter((x) => x !== l) : [...p, l]), []);

  const resetFilters = () => {
    setSelectedTlds([]);
    setSelectedCats([]);
    setSelectedLengths([]);
    setMaxPrice(50000);
    setAvailableOnly(false);
  };

  const activeFilterCount = selectedTlds.length + selectedCats.length + selectedLengths.length + (availableOnly ? 1 : 0) + (maxPrice < 50000 ? 1 : 0);

  // Compute filtered + sorted results
  const results = useMemo(() => {
    const filtered = filterDomains({
      query,
      tlds: selectedTlds,
      categories: selectedCats,
      lengths: selectedLengths,
      maxPrice,
      availableOnly,
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "price-asc")  return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return a.name.localeCompare(b.name);
    });
  }, [query, selectedTlds, selectedCats, selectedLengths, maxPrice, availableOnly, sortBy]);

  return (
    <div className="w-full">

      {/* ── Page Header ── */}
      <div className="mb-10">
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-cosmic-teal font-bold block mb-2">
          DOMAIN REGISTRY
        </span>
        <h1 className="text-4xl md:text-6xl font-display font-black text-star-white tracking-tight mb-3">
          BROWSE DOMAINS
        </h1>
        <p className="text-sm text-muted-steel font-light max-w-2xl leading-relaxed">
          Explore {domainCatalog.length} premium domain names across all major extensions. Filter by category, price, and availability to find your perfect brand.
        </p>
      </div>

      {/* ── Search + Sort bar ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-steel/60 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, category, or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-abyss-panel/60 border border-black/8 text-star-white placeholder:text-muted-steel/50 text-sm font-sans py-3.5 pl-11 pr-10 rounded-2xl focus:outline-none focus:border-cosmic-teal/40 transition-all duration-350"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-lg bg-black/8 text-muted-steel hover:text-star-white transition-colors cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Sort dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="bg-abyss-panel/60 border border-black/8 text-star-white text-xs font-mono py-3.5 px-4 rounded-2xl focus:outline-none focus:border-cosmic-teal/40 transition-colors duration-350 cursor-pointer appearance-none min-w-[160px]"
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name: A → Z</option>
        </select>

        {/* Filter toggle */}
        <button
          onClick={() => setShowFilters((p) => !p)}
          className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl border text-xs font-mono font-bold uppercase tracking-wider transition-all duration-350 cursor-pointer ${
            showFilters || activeFilterCount > 0
              ? "bg-cosmic-teal text-white border-cosmic-teal shadow-sm"
              : "bg-abyss-panel/60 text-muted-steel border-black/8 hover:border-[#E85D3B]/30 hover:text-star-white"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="w-4 h-4 bg-white/25 rounded-md text-[9px] flex items-center justify-center font-black">
              {activeFilterCount}
            </span>
          )}
          {showFilters ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* ── Collapsible Filter Panel ── */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="bg-abyss-panel/40 border border-black/6 rounded-3xl p-6 mb-6 space-y-5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-muted-steel uppercase tracking-wider font-bold">Active Filters</span>
                {activeFilterCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-[10px] font-mono text-cosmic-teal uppercase tracking-wider font-bold hover:text-[#D94F2E] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <X className="w-3 h-3" /> Reset All
                  </button>
                )}
              </div>

              {/* Grid of filter groups */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* TLD filter */}
                <div className="space-y-2">
                  <span className="text-[9px] font-mono text-muted-steel uppercase tracking-widest">Extension</span>
                  <div className="flex flex-wrap gap-1.5">
                    {ALL_TLDS.map((tld) => (
                      <FilterPill key={tld} label={tld} active={selectedTlds.includes(tld)} onClick={() => toggleTld(tld)} />
                    ))}
                  </div>
                </div>

                {/* Category filter */}
                <div className="space-y-2">
                  <span className="text-[9px] font-mono text-muted-steel uppercase tracking-widest">Category</span>
                  <div className="flex flex-wrap gap-1.5">
                    {ALL_CATEGORIES.map((cat) => (
                      <FilterPill key={cat} label={cat} active={selectedCats.includes(cat)} onClick={() => toggleCat(cat)} />
                    ))}
                  </div>
                </div>

                {/* Length filter */}
                <div className="space-y-2">
                  <span className="text-[9px] font-mono text-muted-steel uppercase tracking-widest">Length</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(["Short", "Medium", "Long"] as DomainListing["length"][]).map((l) => (
                      <FilterPill key={l} label={l} active={selectedLengths.includes(l)} onClick={() => toggleLength(l)} />
                    ))}
                  </div>
                </div>

                {/* Price + availability */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[9px] font-mono text-muted-steel uppercase tracking-widest">Max Price</span>
                      <span className="text-[10px] font-mono text-cosmic-teal font-bold">{fmt(maxPrice)}</span>
                    </div>
                    <input
                      type="range"
                      min={500}
                      max={50000}
                      step={500}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full h-1 rounded-full appearance-none cursor-pointer accent-[#E85D3B] bg-black/10"
                    />
                    <div className="flex justify-between text-[8px] font-mono text-muted-steel/60">
                      <span>$500</span>
                      <span>$50k+</span>
                    </div>
                  </div>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <div
                      onClick={() => setAvailableOnly((p) => !p)}
                      className={`w-9 h-5 rounded-full border transition-all duration-350 flex items-center px-0.5 ${
                        availableOnly ? "bg-cosmic-teal border-cosmic-teal" : "bg-black/8 border-black/15"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-350 ${availableOnly ? "translate-x-4" : "translate-x-0"}`} />
                    </div>
                    <span className="text-[10px] font-mono text-muted-steel uppercase tracking-wider">Available Only</span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Results summary ── */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-steel font-mono">
            <span className="text-star-white font-bold">{results.length}</span> domains found
          </span>
          {activeFilterCount > 0 && (
            <span className="text-[9px] font-mono text-cosmic-teal uppercase tracking-wider bg-cosmic-teal/10 px-2.5 py-1 rounded-lg border border-cosmic-teal/20">
              {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""} active
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-500">
          <Star className="w-3 h-3 fill-emerald-500" />
          {results.filter((d) => d.available).length} available
        </div>
      </div>

      {/* ── Domain Grid ── */}
      <AnimatePresence mode="popLayout">
        {results.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
          >
            {results.map((domain, idx) => (
              <DomainCard key={domain.id} domain={domain} idx={idx} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center py-24 border border-dashed border-black/8 rounded-3xl"
          >
            <Globe className="w-10 h-10 text-muted-steel/40 mx-auto mb-4" />
            <p className="text-sm text-star-white font-bold uppercase tracking-wider">No domains found</p>
            <p className="text-xs text-muted-steel mt-2">Try adjusting your filters or search term.</p>
            <button
              onClick={resetFilters}
              className="mt-6 px-6 py-2.5 rounded-xl bg-cosmic-teal text-white text-xs font-mono font-bold uppercase tracking-wider cursor-pointer hover:bg-[#D94F2E] transition-colors duration-350"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
