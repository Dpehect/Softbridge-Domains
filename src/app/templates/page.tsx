"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { templatesData, templateCategories, TemplateInfo } from "@/data/templatesData";
import { TemplatePreviewCard } from "@/components/ui/TemplatePreviewCard";
import { CyberButton } from "@/components/ui/CyberButton";
import { X, Sparkles, AlertCircle, Sliders } from "lucide-react";

function TemplatesGalleryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Selected domain state if bundle flow is active
  const domainName = searchParams.get("domain") || "";
  const domainPrice = Number(searchParams.get("price") || "0");

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeStyle, setActiveStyle] = useState<string>("All");
  const [selectedPreviewTemplate, setSelectedPreviewTemplate] = useState<TemplateInfo | null>(null);

  const categories = ["All", ...templateCategories];
  const styles = ["All", "Minimalist", "Bold", "Luxury", "Tech"];

  const handleConfigure = (template: TemplateInfo) => {
    // Navigate to studio passing template & domain query params
    const query = new URLSearchParams();
    query.set("template", template.id);
    if (domainName) {
      query.set("domain", domainName);
      query.set("price", domainPrice.toString());
    }
    router.push(`/studio?${query.toString()}`);
  };

  const filteredTemplates = templatesData.filter((tpl) => {
    const matchCategory = activeCategory === "All" || tpl.category === activeCategory;
    
    // Simulating custom styles filters mapping templates descriptions
    let matchStyle = true;
    if (activeStyle !== "All") {
      const descLower = tpl.description.toLowerCase();
      matchStyle = descLower.includes(activeStyle.toLowerCase()) || 
                   tpl.features.some(f => f.toLowerCase().includes(activeStyle.toLowerCase()));
    }

    return matchCategory && matchStyle;
  });

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-5 relative z-10">
      {/* Banner / Info if Bundle flow is active */}
      {domainName && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-4 rounded-2xl border-electric-cyan/30 bg-electric-cyan/5 flex flex-col md:flex-row items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-electric-cyan/15 flex items-center justify-center text-electric-cyan">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-bold text-star-white font-heading">
                ACTIVE BUNDLE PROTOCOL FOR: <span className="text-electric-cyan font-mono">{domainName}</span>
              </p>
              <p className="text-xs text-nebula-slate/85">
                Select a visual design format below to configure your custom web environment.
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push("/templates")}
            className="text-xs text-solar-pink hover:underline uppercase font-black tracking-wider cursor-pointer"
          >
            Cancel Bundle
          </button>
        </motion.div>
      )}

      {/* Main Header */}
      <div className="text-center space-y-3 mb-2">
        <span className="text-[10px] text-cosmic-purple font-heading font-extrabold uppercase tracking-widest bg-cosmic-purple/15 px-3.5 py-1 rounded-full border border-cosmic-purple/25">
          Local Business Collection
        </span>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-star-white">
          THE TEMPLATE <span className="text-neon-gradient">UNIVERSE</span>
        </h1>
        <p className="text-sm text-nebula-slate max-w-xl mx-auto leading-relaxed">
          Unlock high-fidelity interfaces engineered with advanced scroll kinetics, glassmorphic layout decks, and full responsive coverage.
        </p>
      </div>

      {/* Tabs / Filters Bar */}
      <div className="flex flex-col gap-3 border-b border-white/5 pb-5 mb-2">
        {/* Categories */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-nebula-slate uppercase tracking-wider font-extrabold shrink-0 w-24">
            Category:
          </span>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] font-heading font-bold uppercase tracking-wider px-4 py-2 rounded-full border transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-electric-cyan text-deep-void border-electric-cyan shadow-sm"
                    : "bg-white/5 border-white/5 text-nebula-slate hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Styles */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-nebula-slate uppercase tracking-wider font-extrabold shrink-0 w-24">
            Aesthetic:
          </span>
          <div className="flex flex-wrap gap-2">
            {styles.map((style) => (
              <button
                key={style}
                onClick={() => setActiveStyle(style)}
                className={`text-[10px] font-heading font-bold uppercase tracking-wider px-4 py-2 rounded-full border transition-all cursor-pointer ${
                  activeStyle === style
                    ? "bg-cosmic-purple text-star-white border-cosmic-purple shadow-sm"
                    : "bg-white/5 border-white/5 text-nebula-slate hover:text-white"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Grid list */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredTemplates.map((tpl) => (
            <TemplatePreviewCard
              key={tpl.id}
              template={tpl}
              onPreview={(t) => setSelectedPreviewTemplate(t)}
              onConfigure={handleConfigure}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-10 rounded-2xl text-center max-w-md mx-auto space-y-3">
          <AlertCircle className="w-12 h-12 text-solar-pink mx-auto" />
          <h3 className="text-base font-heading font-bold text-white uppercase tracking-wider">No matches found</h3>
          <p className="text-xs text-nebula-slate">
            We could not locate configurations mapping your specific aesthetic filter. Try selecting different options.
          </p>
        </div>
      )}

      {/* Quick View Modal Dialog */}
      <AnimatePresence>
        {selectedPreviewTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="glass-panel rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border-white/10 shadow-2xl relative flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPreviewTemplate(null)}
                className="absolute top-4 right-4 z-30 p-2.5 bg-black/50 hover:bg-black text-white hover:text-solar-pink rounded-full border border-white/10 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Mockup View */}
              <div className="w-full md:w-1/2 h-72 md:h-auto min-h-[300px] relative overflow-hidden bg-abyss-black border-r border-white/5">
                <img
                  src={selectedPreviewTemplate.image}
                  alt={selectedPreviewTemplate.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-void via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 z-20">
                  <span className="text-[9px] bg-electric-cyan/20 text-electric-cyan border border-electric-cyan/30 px-3 py-1 rounded-full uppercase font-black tracking-widest font-mono">
                    {selectedPreviewTemplate.category}
                  </span>
                </div>
              </div>

              {/* Right Specs View */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-5">
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-star-white">
                      {selectedPreviewTemplate.name}
                    </h2>
                    <p className="text-xs text-nebula-slate/85 mt-2 leading-relaxed">
                      {selectedPreviewTemplate.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[10px] text-nebula-slate uppercase tracking-wider font-extrabold mb-3">
                      High-Fidelity Components Included:
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedPreviewTemplate.features.map((f, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs text-star-white font-medium"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-electric-cyan shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] text-nebula-slate uppercase tracking-wider font-extrabold mb-2.5">
                      Visual Palette Defaults:
                    </h4>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/10"
                          style={{ backgroundColor: selectedPreviewTemplate.theme.primary }}
                        />
                        <span className="text-[10px] text-nebula-slate/80 font-mono">Primary</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/10"
                          style={{ backgroundColor: selectedPreviewTemplate.theme.secondary }}
                        />
                        <span className="text-[10px] text-nebula-slate/80 font-mono">Secondary</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-5 mt-6">
                  <div>
                    <span className="text-[9px] text-nebula-slate/50 block font-semibold tracking-wider">
                      SETUP TARIFF
                    </span>
                    <span className="text-3xl font-heading font-black text-star-white">
                      ${selectedPreviewTemplate.price}
                    </span>
                  </div>

                  <CyberButton
                    onClick={() => {
                      handleConfigure(selectedPreviewTemplate);
                      setSelectedPreviewTemplate(null);
                    }}
                    variant="teal"
                    className="gap-2"
                  >
                    <Sliders className="w-4 h-4" />
                    Configure Orbit
                  </CyberButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 px-4 md:px-8 relative overflow-hidden mesh-bg">
      <Suspense
        fallback={
          <div className="h-64 flex flex-col items-center justify-center">
            <p className="text-xs text-nebula-slate font-heading font-bold uppercase tracking-widest animate-pulse">
              Surveying templates...
            </p>
          </div>
        }
      >
        <TemplatesGalleryContent />
      </Suspense>
    </main>
  );
}
