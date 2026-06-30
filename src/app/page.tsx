"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Shield, Cpu, ArrowRight, CornerDownRight, Compass } from "lucide-react";
import { DomainSearchBar } from "@/components/ui/DomainSearchBar";
import { CyberButton } from "@/components/ui/CyberButton";
import { templatesData } from "@/data/templatesData";
import { TemplatePreviewCard } from "@/components/ui/TemplatePreviewCard";

export default function Home() {
  const router = useRouter();

  const handleSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const curatedExtensions = [
    { tld: ".ai", price: "$59.99/yr", class: "Cognitive Nodes", detail: "Active registry load: 12%" },
    { tld: ".io", price: "$39.99/yr", class: "System IO Gates", detail: "Nameservers propagation: 99.9%" },
    { tld: ".com", price: "$14.99/yr", class: "Universal Anchor", detail: "Global root replication: Active" },
    { tld: ".design", price: "$19.99/yr", class: "Aesthetic Hub", detail: "Creative domain weight: High" },
  ];

  return (
    <main className="min-h-screen flex flex-col pt-36 pb-32 px-6 md:px-12 relative overflow-hidden luxury-grid-bg">
      {/* Muted background twilight glows - very soft restraint purple */}
      <div className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-restraint-purple/20 blur-[130px] -z-20 pointer-events-none animate-subtle-pulse" />
      <div className="absolute bottom-[20%] left-[-5%] w-[500px] h-[500px] rounded-full bg-electric-teal/5 blur-[150px] -z-20 pointer-events-none" />

      {/* Hero Section - Asymmetric, Architectural Grid */}
      <section className="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 mb-36 mt-4">
        {/* Left Side: Editorial Typography & Search Bar */}
        <div className="lg:col-span-8 flex flex-col justify-center items-start text-left relative pl-6 md:pl-8 border-l border-white/5">
          {/* Subtle Grid Corner Indicator */}
          <div className="absolute top-0 left-0 w-2.5 h-[1px] bg-electric-teal" />
          <div className="absolute top-0 left-0 w-[1px] h-2.5 bg-electric-teal" />

          {/* Monospace Indicator */}
          <div className="flex items-center gap-2 mb-6 font-mono text-[9px] uppercase tracking-[0.25em] text-electric-teal">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-teal animate-pulse" />
            REGISTRY PIPELINE v1.2.9
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight leading-[0.95] text-star-white mb-8">
            ACQUIRE YOUR <br />
            DIGITAL LANDMARK
          </h1>

          <p className="text-sm md:text-base text-muted-text max-w-xl mb-12 leading-relaxed font-sans font-light">
            Secure premium domain coordinates, configure high-fidelity editorial layouts, and publish your identity directly to decentralized nodes. Zero setup overhead, absolute layout precision.
          </p>

          {/* Luxury Search Input */}
          <div className="w-full mb-14">
            <DomainSearchBar onSearch={handleSearch} />
          </div>

          {/* Micro details checklist */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[9px] uppercase tracking-wider text-muted-text/80">
            <span className="flex items-center gap-1.5">
              <CornerDownRight className="w-3.5 h-3.5 text-electric-teal" />
              Instant nameserver routing
            </span>
            <span className="flex items-center gap-1.5">
              <CornerDownRight className="w-3.5 h-3.5 text-electric-teal" />
              Complete WHOIS cloaking
            </span>
            <span className="flex items-center gap-1.5">
              <CornerDownRight className="w-3.5 h-3.5 text-electric-teal" />
              Architectural custom code exports
            </span>
          </div>
        </div>

        {/* Right Side: Curated Technical Readout & Context */}
        <div className="lg:col-span-4 flex flex-col justify-between p-6 bg-abyss-black/45 border border-white/5 rounded relative">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted-text">SYSTEM INDEX STATUS</span>
              <span className="text-[10px] font-heading font-extrabold text-emerald-400 flex items-center gap-1">
                ONLINE
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-muted-text">NAMESERVERS:</span>
                <span className="text-star-white font-bold">ns1.aetherdns.space</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-muted-text">PROPAGATION:</span>
                <span className="text-star-white font-bold">&lt; 15 seconds</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-muted-text">DEPLOYMENT ENGINES:</span>
                <span className="text-electric-teal font-bold">Zustand Config Sync</span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 mt-8 space-y-4 text-xs font-sans text-muted-text leading-relaxed font-light">
            <p>
              Aether Domains represents the intersection of luxury digital presence and absolute functional simplicity. For agencies and developers demanding high-contrast typographic grids.
            </p>
            <CyberButton
              onClick={() => router.push("/templates")}
              variant="dark"
              size="sm"
              className="w-full flex items-center justify-between group"
            >
              Browse Layout Engines
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </CyberButton>
          </div>
        </div>
      </section>

      {/* Spacing Divider line */}
      <div className="max-w-6xl mx-auto w-full h-[1px] bg-white/5 mb-32" />

      {/* Curated Suffix Registry grid */}
      <section className="max-w-6xl mx-auto w-full mb-36">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {curatedExtensions.map((item, idx) => (
            <div
              key={item.tld}
              onClick={() => handleSearch(`domain${item.tld}`)}
              className="group relative bg-[#05060A]/40 border border-white/5 p-5 rounded hover:border-white/15 transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[140px]"
            >
              {/* Corner Indicators */}
              <div className="absolute top-0 right-0 w-2 h-[1px] bg-white/10 group-hover:bg-electric-teal/40 transition-colors" />
              <div className="absolute top-0 right-0 w-[1px] h-2 bg-white/10 group-hover:bg-electric-teal/40 transition-colors" />

              <div>
                <span className="font-display text-3xl font-extrabold text-star-white group-hover:text-electric-teal transition-colors">
                  {item.tld}
                </span>
                <p className="font-mono text-[9px] uppercase tracking-wider text-muted-text mt-1">
                  {item.class}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-3.5 mt-4">
                <span className="font-mono text-[10px] text-star-white/90">{item.price}</span>
                <span className="font-mono text-[8px] text-muted-text/50">{item.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Integration Bundle Showcase Section */}
      <section className="max-w-6xl mx-auto w-full mb-36">
        <div className="bg-[#05060B]/60 border border-white/5 p-8 md:p-14 rounded-lg relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Subtle backing lines */}
          <div className="absolute inset-0 luxury-grid-bg opacity-10 pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-restraint-purple/5 blur-[80px] pointer-events-none" />

          <div className="max-w-xl relative z-10">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-electric-teal mb-4 block font-bold">
              PLATFORM SYNERGY
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-star-white tracking-tight leading-tight mb-6">
              THE DOMAIN + SITE <br />
              INTEGRATION PROTOCOL
            </h2>
            <p className="text-xs md:text-sm text-muted-text leading-relaxed font-light mb-8">
              Skip complex DNS routings, boilerplate setups, and standard layout delays. Customize high-fidelity layout parameters, export configuration keys, and register coordinates. We compile your aesthetic definitions directly to live assets.
            </p>
            <div className="flex flex-wrap gap-4">
              <CyberButton onClick={() => router.push("/templates")} variant="teal">
                Verify Templates
              </CyberButton>
              <CyberButton onClick={() => router.push("/studio")} variant="steel">
                Initialize Customizer
              </CyberButton>
            </div>
          </div>

          {/* Architectural structural lines graphic */}
          <div className="w-full lg:w-96 relative flex items-center justify-center min-h-[250px] border border-white/5 rounded p-6 bg-black/20">
            <div className="absolute inset-4 border border-dashed border-white/5" />
            <div className="w-full space-y-4 font-mono text-[9px] text-muted-text/80">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span>EXPORT_CONFIG.JSON</span>
                <span className="text-electric-teal">v1.0.0</span>
              </div>
              <div className="space-y-1 text-[8px]">
                <p className="text-white/60">"brandName": "Aether Inc"</p>
                <p className="text-white/60">"themeColors": &#123;</p>
                <p className="pl-4 text-electric-teal">"primary": "#00E5D8"</p>
                <p className="pl-4 text-white/60">"background": "#020205"</p>
                <p className="text-white/60">&#125;</p>
              </div>
              <div className="pt-2 flex justify-between items-center border-t border-white/5">
                <span className="flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5 text-electric-teal" /> BUILD_SUCCESS
                </span>
                <span className="text-star-white">216ms</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Collection Title & Grid */}
      <section className="max-w-6xl mx-auto w-full mb-36">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-white/5 pb-6">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-muted-text">LAYOUT DESIGNS</span>
            <h2 className="text-3xl font-display font-bold text-star-white tracking-tight mt-1">
              THE SHAPES OF DEPLOYMENT
            </h2>
          </div>
          <button
            onClick={() => router.push("/templates")}
            className="flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-electric-teal hover:text-white transition-colors cursor-pointer group"
          >
            Explore Options
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templatesData.slice(0, 3).map((tpl) => (
            <TemplatePreviewCard
              key={tpl.id}
              template={tpl}
              onPreview={(t) => router.push("/templates")}
              onConfigure={(t) => {
                router.push(`/studio?template=${t.id}`);
              }}
            />
          ))}
        </div>
      </section>

      {/* Trust & Verification Signals */}
      <section className="max-w-5xl mx-auto w-full border-t border-white/5 pt-16 text-center space-y-6">
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center mx-auto text-electric-teal">
          <Compass className="w-5 h-5 animate-spin [animation-duration:15s]" />
        </div>
        <p className="text-xs text-muted-text uppercase tracking-widest font-mono">
          Decentralized Namespace routing — Secured Registry Controls
        </p>
      </section>
    </main>
  );
}
