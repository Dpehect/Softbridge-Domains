"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Layers,
  Palette,
  Settings,
  Check,
  Plus,
  ArrowRight,
  ArrowLeft,
  Cpu,
  Bookmark,
  BarChart2,
  Box,
  Moon,
  ShoppingBag,
  Layout,
  FileText,
  Zap,
  Globe,
  Shield,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { CyberButton } from "./ui/CyberButton";

// ─── Types ────────────────────────────────────────────────────────
type SiteType   = { id: string; name: string; price: number; description: string; icon: any; hero: string; sections: string[] };
type ColorTheme = { id: string; name: string; primary: string; secondary: string; bg: string; text: string; accent: string };
type LayoutStyle = { id: string; name: string; description: string };
type ExtraFeature = { id: string; name: string; price: number; description: string; icon: any };

// ─── Data ─────────────────────────────────────────────────────────
const SITE_TYPES: SiteType[] = [
  {
    id: "saas", name: "SaaS Website", price: 149, icon: Cpu,
    description: "Interactive tech SaaS presentation with analytics layout modules.",
    hero: "The smarter way to ship software",
    sections: ["Features", "Pricing", "Testimonials", "CTA"],
  },
  {
    id: "portfolio", name: "Developer Portfolio", price: 99, icon: Monitor,
    description: "Minimalist layout for developers to display interactive web cases.",
    hero: "Hi, I build things for the web",
    sections: ["Projects", "Skills", "About", "Contact"],
  },
  {
    id: "ecommerce", name: "E-Commerce Platform", price: 199, icon: ShoppingBag,
    description: "Clean store with grid collections and seamless payment flow.",
    hero: "Discover our latest collection",
    sections: ["Products", "Categories", "Offers", "Reviews"],
  },
  {
    id: "blog", name: "Minimalist Blog", price: 79, icon: Bookmark,
    description: "Bold typography layouts focused on reading experience.",
    hero: "Thoughts, ideas, and stories",
    sections: ["Latest Posts", "Categories", "Featured", "Newsletter"],
  },
];

const COLOR_THEMES: ColorTheme[] = [
  { id: "orange",   name: "Sunset Orange",   primary: "#E85D3B", secondary: "#D94F2E", bg: "#FDF0E6", text: "#5C2E1F", accent: "#F4A26190" },
  { id: "cyan",     name: "Electric Cyan",   primary: "#00D2FE", secondary: "#7F00FF", bg: "#070B14", text: "#E8F4FC", accent: "#00D2FE20" },
  { id: "emerald",  name: "Emerald Forest",  primary: "#10B981", secondary: "#047857", bg: "#F0FDF4", text: "#064E3B", accent: "#10B98120" },
  { id: "lavender", name: "Royal Lavender",  primary: "#8B5CF6", secondary: "#6D28D9", bg: "#F5F3FF", text: "#1E1B4B", accent: "#8B5CF620" },
];

const LAYOUT_STYLES: LayoutStyle[] = [
  { id: "modern",  name: "Modern Grid",       description: "Bento-style layouts, asymmetrical cards, and micro-grid patterns." },
  { id: "minimal", name: "Minimalist Clean",  description: "Vast white space, thin boundaries, and sleek classic alignments." },
  { id: "bold",    name: "Bold Editorial",    description: "Large font sizes, heavy boxes, and strong border outlines." },
];

const EXTRA_FEATURES: ExtraFeature[] = [
  { id: "analytics", name: "Google Analytics",      price: 15, icon: BarChart2, description: "Pre-configured tracking scripts and dynamic dashboards." },
  { id: "3d",        name: "Interactive 3D Elements", price: 35, icon: Box,      description: "Dynamic rotating orb components and canvas scenes." },
  { id: "darkmode",  name: "Full Dark Mode Support", price: 20, icon: Moon,     description: "Seamless dark theme variable switching." },
];

// ─── Live Preview Component ────────────────────────────────────────
function LivePreview({
  typeObj,
  themeObj,
  layout,
  extras,
}: {
  typeObj: SiteType;
  themeObj: ColorTheme;
  layout: string;
  extras: string[];
}) {
  const hasDark     = extras.includes("darkmode");
  const hasAnalytics = extras.includes("analytics");
  const has3D       = extras.includes("3d");

  const bg      = hasDark && themeObj.id !== "cyan" ? "#0F0F0F" : themeObj.bg;
  const text     = hasDark && themeObj.id !== "cyan" ? "#F5F5F5" : themeObj.text;
  const primary  = themeObj.primary;
  const border   = `${primary}20`;

  // Font weight / layout style modifiers
  const headingClass = layout === "bold" ? "font-black text-lg uppercase tracking-tighter" :
                       layout === "minimal" ? "font-light text-sm tracking-[0.18em] uppercase" :
                       "font-extrabold text-base tracking-tight";
  const cardRadius   = layout === "minimal" ? "4px" : layout === "bold" ? "2px" : "12px";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${typeObj.id}-${themeObj.id}-${layout}-${extras.join("")}`}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full flex flex-col"
        style={{ backgroundColor: bg, color: text, fontFamily: "Inter, sans-serif" }}
      >
        {/* Simulated Navbar */}
        <div
          className="flex items-center justify-between px-4 py-2.5 border-b"
          style={{ borderColor: border, backgroundColor: `${bg}EE` }}
        >
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: primary }} />
            <span className="font-black text-[9px] tracking-widest uppercase" style={{ color: text }}>
              SOFTBRIDGE
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[7px] font-mono opacity-70" style={{ color: text }}>
            {typeObj.sections.slice(0, 3).map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <div
            className="px-2 py-0.5 rounded text-[7px] font-black text-white uppercase tracking-wider"
            style={{ backgroundColor: primary, borderRadius: cardRadius }}
          >
            Get Started
          </div>
        </div>

        {/* Simulated Hero */}
        <div
          className="flex flex-col items-center justify-center px-6 py-5 text-center relative overflow-hidden flex-1"
          style={{ background: `linear-gradient(160deg, ${primary}10 0%, ${bg} 60%)` }}
        >
          {/* Ambient glow for 3D effect */}
          {has3D && (
            <div
              className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-30"
              style={{ backgroundColor: primary }}
            />
          )}

          <motion.div
            key={`hero-${layout}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <div
              className="text-[7px] font-mono uppercase tracking-widest mb-2 px-2 py-0.5 rounded-full inline-block"
              style={{ color: primary, backgroundColor: `${primary}15`, border: `1px solid ${primary}30` }}
            >
              {typeObj.name}
            </div>

            <div className={`my-1.5 leading-tight ${headingClass}`} style={{ color: text }}>
              {typeObj.hero}
            </div>

            <p className="text-[7px] max-w-[180px] mx-auto opacity-60 leading-relaxed mt-1" style={{ color: text }}>
              Built with Softbridge — modular, scalable, and fast.
            </p>

            <div className="flex items-center justify-center gap-2 mt-3">
              <div
                className="px-3 py-1 text-[7px] font-black text-white uppercase tracking-wider"
                style={{ backgroundColor: primary, borderRadius: cardRadius }}
              >
                Start Free
              </div>
              <div
                className="px-3 py-1 text-[7px] font-bold uppercase tracking-wider"
                style={{ color: primary, border: `1px solid ${primary}40`, borderRadius: cardRadius }}
              >
                Learn More
              </div>
            </div>
          </motion.div>
        </div>

        {/* Simulated Section Cards */}
        <div
          className="px-3 py-3 border-t"
          style={{ borderColor: border, backgroundColor: `${primary}06` }}
        >
          <div
            className="grid gap-1.5"
            style={{ gridTemplateColumns: `repeat(${Math.min(typeObj.sections.length, layout === "minimal" ? 2 : 3)}, 1fr)` }}
          >
            {typeObj.sections.slice(0, layout === "minimal" ? 2 : 3).map((section) => (
              <div
                key={section}
                className="p-2 text-center"
                style={{
                  backgroundColor: `${primary}08`,
                  border: `1px solid ${primary}15`,
                  borderRadius: cardRadius,
                }}
              >
                <div className="text-[6px] font-black uppercase tracking-wider" style={{ color: primary }}>
                  {section}
                </div>
              </div>
            ))}
          </div>

          {/* Extras badges */}
          {extras.length > 0 && (
            <div className="flex gap-1 mt-2 justify-center flex-wrap">
              {hasAnalytics && (
                <span className="text-[5px] font-mono uppercase px-1.5 py-0.5 rounded" style={{ color: primary, backgroundColor: `${primary}15`, border: `1px solid ${primary}25` }}>
                  Analytics
                </span>
              )}
              {has3D && (
                <span className="text-[5px] font-mono uppercase px-1.5 py-0.5 rounded" style={{ color: primary, backgroundColor: `${primary}15`, border: `1px solid ${primary}25` }}>
                  3D Elements
                </span>
              )}
              {hasDark && (
                <span className="text-[5px] font-mono uppercase px-1.5 py-0.5 rounded" style={{ color: primary, backgroundColor: `${primary}15`, border: `1px solid ${primary}25` }}>
                  Dark Mode
                </span>
              )}
            </div>
          )}
        </div>

        {/* Simulated Footer */}
        <div
          className="flex items-center justify-between px-4 py-2 border-t"
          style={{ borderColor: border }}
        >
          <span className="text-[6px] font-mono opacity-50" style={{ color: text }}>
            Powered by Softbridge
          </span>
          {hasAnalytics && (
            <div className="flex items-center gap-1 text-[6px] font-mono opacity-60" style={{ color: primary }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Tracking Active
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main Component ───────────────────────────────────────────────
export default function SoftbridgeStudio() {
  const [currentStep, setCurrentStep]     = useState<number>(0);
  const [selectedType, setSelectedType]   = useState<string>("saas");
  const [selectedTheme, setSelectedTheme] = useState<string>("orange");
  const [selectedLayout, setSelectedLayout] = useState<string>("modern");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

  const addItem = useCartStore((state) => state.addItem);

  const basePrice   = SITE_TYPES.find((t) => t.id === selectedType)?.price || 0;
  const extrasPrice = selectedExtras.reduce((sum, id) => sum + (EXTRA_FEATURES.find((f) => f.id === id)?.price || 0), 0);
  const totalPrice  = basePrice + extrasPrice;

  const currentThemeObj = COLOR_THEMES.find((t) => t.id === selectedTheme) || COLOR_THEMES[0];
  const currentTypeObj  = SITE_TYPES.find((t) => t.id === selectedType) || SITE_TYPES[0];

  const handleToggleExtra = (extraId: string) =>
    setSelectedExtras((prev) => prev.includes(extraId) ? prev.filter((id) => id !== extraId) : [...prev, extraId]);

  const handleAddToCart = () => {
    addItem({
      domainName: `custom-${selectedType}-template`,
      domainTld: ".studio",
      domainPrice: 0,
      websitePackage: {
        templateId: `studio-custom-${Date.now()}`,
        templateName: `Studio Custom: ${currentTypeObj.name}`,
        setupPrice: totalPrice,
        config: {
          templateId: selectedType,
          templateName: currentTypeObj.name,
          brandName: "Softbridge Custom Web",
          slogan: "Assembled dynamically inside Softbridge Studio",
          logo: "",
          theme: { primary: currentThemeObj.primary, secondary: currentThemeObj.secondary, bg: currentThemeObj.bg },
          typography: { headings: "Outfit", body: "Inter" },
          pages: [],
          animationProfile: "smooth",
        },
      },
    });
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, 3));
  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 0));

  const stepTitles = [
    { name: "Site Type",     desc: "Select the architectural layout purpose",    icon: Layout },
    { name: "Theme Palette", desc: "Choose color variables mapping",             icon: Palette },
    { name: "Layout Style",  desc: "Select visual spacing and grid details",     icon: Layers },
    { name: "Extra Features", desc: "Toggle pre-bundled plugins and scripts",    icon: Settings },
  ];

  return (
    <section className="w-full mb-32 bg-abyss-panel/30 border border-black/5 rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-sm">

      {/* Ambient glow */}
      <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-cosmic-teal/5 blur-3xl pointer-events-none" />

      {/* Section header */}
      <div className="mb-10 border-b border-black/5 pb-6">
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-cosmic-teal font-bold block mb-2">
          SOFTBRIDGE // ENGINE STUDIO
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-star-white tracking-tight">
          SOFTBRIDGE STUDIO
        </h2>
        <p className="text-xs text-muted-steel mt-2 font-light max-w-lg">
          Assemble your custom site architecture step-by-step. The preview updates live as you configure each option.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

        {/* ── Left: Step Configurations ── */}
        <div className="lg:col-span-6 flex flex-col justify-between min-h-[520px]">

          {/* Step progress tabs */}
          <div className="flex justify-between items-center mb-8 gap-1 font-mono text-[9px] uppercase tracking-wider text-muted-steel overflow-x-auto">
            {stepTitles.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`flex items-center gap-1.5 cursor-pointer pb-2 border-b-2 transition-all duration-350 whitespace-nowrap px-1 ${
                  currentStep === idx
                    ? "border-cosmic-teal text-cosmic-teal font-bold"
                    : "border-transparent text-muted-steel hover:text-star-white"
                }`}
              >
                <span className="opacity-60">0{idx + 1}</span>
                <span className="hidden sm:inline">{step.name}</span>
              </button>
            ))}
          </div>

          {/* Step banner */}
          <div className="mb-5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-muted-steel">
              Step 0{currentStep + 1} / {stepTitles[currentStep].name}
            </span>
            <p className="text-sm text-star-white mt-0.5 font-bold">{stepTitles[currentStep].desc}</p>
          </div>

          {/* Configuration area */}
          <div className="flex-1 mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                {/* Step 1: Site Type */}
                {currentStep === 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SITE_TYPES.map((type) => {
                      const Icon = type.icon;
                      const isSelected = selectedType === type.id;
                      return (
                        <button
                          key={type.id}
                          onClick={() => setSelectedType(type.id)}
                          className={`p-4 rounded-2xl border text-left transition-all duration-350 cursor-pointer flex flex-col justify-between h-36 ${
                            isSelected
                              ? "bg-cosmic-teal/10 border-cosmic-teal/40"
                              : "bg-abyss-panel/50 border-black/5 hover:border-black/15"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className={`p-2 rounded-xl ${isSelected ? "bg-cosmic-teal text-white" : "bg-black/5 text-muted-steel"}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="font-mono text-xs font-black text-sunset-coral">${type.price}</span>
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-star-white">{type.name}</h4>
                            <p className="text-[10px] text-muted-steel mt-0.5 leading-relaxed font-light">{type.description}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Step 2: Theme */}
                {currentStep === 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {COLOR_THEMES.map((theme) => {
                      const isSelected = selectedTheme === theme.id;
                      return (
                        <button
                          key={theme.id}
                          onClick={() => setSelectedTheme(theme.id)}
                          className={`p-4 rounded-2xl border text-left transition-all duration-350 cursor-pointer ${
                            isSelected
                              ? "bg-cosmic-teal/10 border-cosmic-teal/40"
                              : "bg-abyss-panel/50 border-black/5 hover:border-black/15"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-3.5">
                            <span className="text-xs font-bold text-star-white">{theme.name}</span>
                            <div className="flex gap-1.5">
                              {[theme.primary, theme.secondary, theme.bg].map((c) => (
                                <div key={c} className="w-4 h-4 rounded-full border border-black/10 shadow-sm" style={{ backgroundColor: c }} />
                              ))}
                            </div>
                          </div>
                          <div
                            className="p-3 rounded-xl border text-center font-mono text-[8px] font-bold uppercase tracking-widest"
                            style={{ backgroundColor: theme.bg, color: theme.text, borderColor: `${theme.primary}25` }}
                          >
                            {theme.name} preview
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Step 3: Layout */}
                {currentStep === 2 && (
                  <div className="space-y-3">
                    {LAYOUT_STYLES.map((style) => {
                      const isSelected = selectedLayout === style.id;
                      return (
                        <button
                          key={style.id}
                          onClick={() => setSelectedLayout(style.id)}
                          className={`w-full p-4 rounded-2xl border text-left transition-all duration-350 cursor-pointer flex justify-between items-center ${
                            isSelected
                              ? "bg-cosmic-teal/10 border-cosmic-teal/40"
                              : "bg-abyss-panel/50 border-black/5 hover:border-black/15"
                          }`}
                        >
                          <div>
                            <h4 className="text-xs font-bold text-star-white">{style.name}</h4>
                            <p className="text-[10px] text-muted-steel mt-0.5 font-light leading-relaxed">{style.description}</p>
                          </div>
                          {isSelected && (
                            <div className="w-6 h-6 rounded-full bg-cosmic-teal flex items-center justify-center text-white shrink-0 ml-3">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Step 4: Extra Features */}
                {currentStep === 3 && (
                  <div className="space-y-3">
                    {EXTRA_FEATURES.map((extra) => {
                      const isSelected = selectedExtras.includes(extra.id);
                      const Icon = extra.icon;
                      return (
                        <button
                          key={extra.id}
                          onClick={() => handleToggleExtra(extra.id)}
                          className={`w-full p-4 rounded-2xl border text-left transition-all duration-350 cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? "bg-cosmic-teal/10 border-cosmic-teal/40"
                              : "bg-abyss-panel/50 border-black/5 hover:border-black/15"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-xl ${isSelected ? "bg-cosmic-teal text-white" : "bg-black/5 text-muted-steel"}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-star-white">{extra.name}</h4>
                              <p className="text-[10px] text-muted-steel mt-0.5 font-light">{extra.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 ml-3 shrink-0">
                            <span className="font-mono text-xs font-black text-sunset-coral">+${extra.price}</span>
                            <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all duration-350 ${
                              isSelected ? "bg-cosmic-teal border-cosmic-teal text-white" : "border-black/20"
                            }`}>
                              {isSelected && <Check className="w-3.5 h-3.5" />}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center border-t border-black/5 pt-5 shrink-0 gap-3">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-muted-steel disabled:opacity-30 disabled:pointer-events-none hover:text-cosmic-teal transition-colors duration-350 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            {currentStep < 3 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-star-white hover:text-cosmic-teal transition-colors duration-350 cursor-pointer"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <span className="text-[9px] font-mono text-muted-steel">Configuration complete</span>
            )}
          </div>
        </div>

        {/* ── Right: Live Preview ── */}
        <div className="lg:col-span-6 flex flex-col gap-4">

          {/* Preview label */}
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono text-muted-steel uppercase tracking-widest font-bold">
              Live Preview
            </span>
            <div className="flex items-center gap-1.5 text-[8px] font-mono text-emerald-500 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Auto-updating
            </div>
          </div>

          {/* Browser frame */}
          <div className="flex-1 bg-midnight-void border border-black/8 rounded-2xl overflow-hidden shadow-inner flex flex-col min-h-[420px]">
            {/* Browser chrome */}
            <div className="flex items-center justify-between border-b border-black/8 px-4 py-2.5 shrink-0">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
              </div>
              <div
                className="flex-1 mx-4 text-[8px] font-mono tracking-wider text-center px-3 py-0.5 rounded bg-black/8"
                style={{ color: currentThemeObj.primary }}
              >
                softbridge.studio/{currentTypeObj.id}
              </div>
              <div className="w-3 h-3 rounded-full border border-black/15" style={{ backgroundColor: currentThemeObj.primary + "40" }} />
            </div>

            {/* Live preview render */}
            <div className="flex-1 overflow-hidden">
              <LivePreview
                typeObj={currentTypeObj}
                themeObj={currentThemeObj}
                layout={selectedLayout}
                extras={selectedExtras}
              />
            </div>
          </div>

          {/* Config summary + cart CTA */}
          <div className="bg-abyss-panel/40 border border-black/5 rounded-2xl p-4 space-y-4">
            {/* Selected options summary */}
            <div className="grid grid-cols-2 gap-2 text-[9px] font-mono">
              {[
                { label: "Type",   value: currentTypeObj.name },
                { label: "Theme",  value: currentThemeObj.name },
                { label: "Layout", value: LAYOUT_STYLES.find((l) => l.id === selectedLayout)?.name || "" },
                { label: "Extras", value: selectedExtras.length ? `${selectedExtras.length} added` : "None" },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col">
                  <span className="text-muted-steel uppercase tracking-wider">{label}</span>
                  <span className="text-star-white font-bold mt-0.5 truncate">{value}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-black/5 pt-3">
              <div className="font-mono">
                <span className="text-[8px] text-muted-steel block uppercase">Setup Price</span>
                <span className="text-xl font-black text-sunset-coral">${totalPrice}</span>
              </div>
              <CyberButton
                variant="teal"
                size="sm"
                onClick={handleAddToCart}
                className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]"
              >
                {isAddedToCart ? (
                  <><Check className="w-3.5 h-3.5" /> Added to Cart</>
                ) : (
                  <><Plus className="w-3.5 h-3.5" /> Add to Cart</>
                )}
              </CyberButton>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
