"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Filter, SlidersHorizontal, Globe, Sparkles, RefreshCw } from "lucide-react";
import { mockDomainsSearch, DomainInfo } from "@/data/mockDomains";
import { DomainResultCard } from "@/components/ui/DomainResultCard";
import { DomainSearchBar } from "@/components/ui/DomainSearchBar";
import { NeonBadge } from "@/components/ui/NeonBadge";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState<DomainInfo[]>([]);
  const [filteredResults, setFilteredResults] = useState<DomainInfo[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters State
  const [selectedTlds, setSelectedTlds] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(150);
  const [premiumOnly, setPremiumOnly] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      // Simulate network request for Awwwards fluid feel
      const timer = setTimeout(() => {
        const searchRes = mockDomainsSearch(query);
        setResults(searchRes);
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [query]);

  // Apply filters
  useEffect(() => {
    let temp = [...results];

    // Filter by TLD
    if (selectedTlds.length > 0) {
      temp = temp.filter((r) => selectedTlds.includes(r.tld));
    }

    // Filter by Max Price (only if available)
    temp = temp.filter((r) => !r.available || r.price <= maxPrice);

    // Filter by Premium
    if (premiumOnly) {
      temp = temp.filter((r) => r.premium);
    }

    // Filter by Available
    if (availableOnly) {
      temp = temp.filter((r) => r.available);
    }

    setFilteredResults(temp);
  }, [results, selectedTlds, maxPrice, premiumOnly, availableOnly]);

  const handleSearch = (newQuery: string) => {
    router.push(`/search?q=${encodeURIComponent(newQuery)}`);
  };

  const handleTldToggle = (tld: string) => {
    if (selectedTlds.includes(tld)) {
      setSelectedTlds(selectedTlds.filter((t) => t !== tld));
    } else {
      setSelectedTlds([...selectedTlds, tld]);
    }
  };

  const uniqueTlds = Array.from(new Set(results.map((r) => r.tld)));

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 relative z-10">
      {/* Search Header panel */}
      <div className="text-center space-y-4 mb-4">
        <span className="text-[10px] text-electric-cyan font-heading font-extrabold uppercase tracking-widest bg-electric-cyan/15 px-3.5 py-1 rounded-full border border-electric-cyan/25">
          Scan Results
        </span>
        <h1 className="text-3xl md:text-5xl font-heading font-black text-star-white">
          GRID SURVEY FOR: <span className="text-electric-cyan">"{query}"</span>
        </h1>
        <div className="mt-6">
          <DomainSearchBar onSearch={handleSearch} initialValue={query} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side Filters Bar */}
        <aside className="w-full lg:w-80 shrink-0">
          <div className="glass-panel p-6 rounded-2xl sticky top-24 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-sm font-heading font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Filter className="w-4 h-4 text-electric-cyan" /> Filters
              </span>
              <button
                onClick={() => {
                  setSelectedTlds([]);
                  setMaxPrice(150);
                  setPremiumOnly(false);
                  setAvailableOnly(false);
                }}
                className="text-[10px] font-heading font-bold uppercase tracking-wider text-nebula-slate hover:text-white cursor-pointer"
              >
                Reset
              </button>
            </div>

            {/* Availability Filter */}
            <div className="space-y-3">
              <span className="text-[10px] text-nebula-slate uppercase tracking-wider font-extrabold">Registry Status</span>
              <div className="flex items-center justify-between">
                <span className="text-xs text-star-white font-medium">Available Orbits Only</span>
                <input
                  type="checkbox"
                  checked={availableOnly}
                  onChange={() => setAvailableOnly(!availableOnly)}
                  className="w-4.5 h-4.5 rounded bg-white/5 border border-white/10 text-electric-cyan cursor-pointer"
                />
              </div>
            </div>

            <div className="h-[1px] bg-white/5" />

            {/* Price Filter */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] text-nebula-slate uppercase tracking-wider font-extrabold">
                <span>Max Setup Fee</span>
                <span className="text-electric-cyan font-mono text-xs">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="5"
                max="300"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-electric-cyan"
              />
            </div>

            <div className="h-[1px] bg-white/5" />

            {/* Extensions Filter */}
            {uniqueTlds.length > 0 && (
              <div className="space-y-3">
                <span className="text-[10px] text-nebula-slate uppercase tracking-wider font-extrabold">Extension Gates</span>
                <div className="flex flex-wrap gap-1.5">
                  {uniqueTlds.map((tld) => {
                    const isSelected = selectedTlds.includes(tld);
                    return (
                      <button
                        key={tld}
                        onClick={() => handleTldToggle(tld)}
                        className={`text-[10px] font-heading font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-electric-cyan text-deep-void border-electric-cyan"
                            : "bg-white/5 border-white/5 text-nebula-slate hover:text-white"
                        }`}
                      >
                        {tld}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="h-[1px] bg-white/5" />

            {/* Premium Toggles */}
            <div className="space-y-3">
              <span className="text-[10px] text-nebula-slate uppercase tracking-wider font-extrabold">Premium Tier</span>
              <div className="flex items-center justify-between">
                <span className="text-xs text-star-white font-medium">Premium Domains Only</span>
                <input
                  type="checkbox"
                  checked={premiumOnly}
                  onChange={() => setPremiumOnly(!premiumOnly)}
                  className="w-4.5 h-4.5 rounded bg-white/5 border border-white/10 text-electric-cyan cursor-pointer"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Right Side Result list */}
        <section className="flex-1 space-y-4 min-h-[400px]">
          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center gap-3">
              <RefreshCw className="w-8 h-8 text-electric-cyan animate-spin" />
              <p className="text-xs text-nebula-slate font-heading font-bold uppercase tracking-widest animate-pulse">
                Surveying the digital registers...
              </p>
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs text-nebula-slate mb-2">
                <span>Showing {filteredResults.length} domains</span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5" /> SECURED PROTOCOLS ACTIVE
                </span>
              </div>
              {filteredResults.map((domain, idx) => (
                <DomainResultCard key={domain.tld} domain={domain} idx={idx} />
              ))}
            </div>
          ) : (
            <div className="glass-panel p-12 rounded-2xl text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto text-nebula-slate">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-heading font-bold text-white uppercase tracking-wider">No Nodes Found</h3>
                <p className="text-xs text-nebula-slate mt-1 max-w-sm mx-auto leading-relaxed">
                  We surveyed the registers and couldn't match your filters. Try adjusting the max price or extension parameters.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 md:px-8 relative overflow-hidden mesh-bg">
      <Suspense
        fallback={
          <div className="h-64 flex flex-col items-center justify-center gap-3">
            <RefreshCw className="w-8 h-8 text-electric-cyan animate-spin" />
            <p className="text-xs text-nebula-slate font-heading font-bold uppercase tracking-widest animate-pulse">
              Initializing survey...
            </p>
          </div>
        }
      >
        <SearchResultsContent />
      </Suspense>
    </main>
  );
}
