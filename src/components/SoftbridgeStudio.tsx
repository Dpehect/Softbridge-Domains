"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Monitor, 
  Layers, 
  Palette, 
  Settings, 
  Eye, 
  Check, 
  Plus, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Cpu,
  Bookmark
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { CyberButton } from "./ui/CyberButton";

// Config Options Types
type SiteType = {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: any;
};

type ColorTheme = {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  bg: string;
  text: string;
};

type LayoutStyle = {
  id: string;
  name: string;
  description: string;
};

type ExtraFeature = {
  id: string;
  name: string;
  price: number;
  description: string;
};

const SITE_TYPES: SiteType[] = [
  { id: "saas", name: "SaaS Website", price: 149, description: "Highly interactive tech SaaS presentation with analytics layout modules.", icon: Cpu },
  { id: "portfolio", name: "Developer Portfolio", price: 99, description: "Minimalist layout optimized for developers to display interactive web cases.", icon: Monitor },
  { id: "ecommerce", name: "E-Commerce Platform", price: 199, description: "Clean store setup showcasing grid collections and payment flow cards.", icon: Layers },
  { id: "blog", name: "Minimalist Blog", price: 79, description: "Focuses on bold typography layouts and reading content grids.", icon: Bookmark },
];

const COLOR_THEMES: ColorTheme[] = [
  { id: "orange", name: "Sunset Orange", primary: "#FF7A3D", secondary: "#E76F51", bg: "#FFF5EB", text: "#2E2F38" },
  { id: "cyan", name: "Electric Cyan", primary: "#00F2FE", secondary: "#7F00FF", bg: "#0B0C16", text: "#FFFFFF" },
  { id: "emerald", name: "Emerald Forest", primary: "#10B981", secondary: "#047857", bg: "#F0FDF4", text: "#065F46" },
  { id: "lavender", name: "Royal Lavender", primary: "#8B5CF6", secondary: "#6D28D9", bg: "#F5F3FF", text: "#1E1B4B" },
];

const LAYOUT_STYLES: LayoutStyle[] = [
  { id: "modern", name: "Modern Grid", description: "Bento-style layouts, asymmetrical cards, and micro-grid patterns." },
  { id: "minimal", name: "Minimalist Clean", description: "Vast white space, thin boundaries, and sleek classic alignments." },
  { id: "bold", name: "Bold Editorial", description: "Large font sizes, heavy black boxes, and solid border outlines." },
];

const EXTRA_FEATURES: ExtraFeature[] = [
  { id: "analytics", name: "Google Analytics Integration", price: 15, description: "Pre-configured tracking scripts and dynamic dashboards." },
  { id: "3d", name: "Interactive 3D Elements", price: 35, description: "Dynamic rotating orb components and cursor-following canvas scenes." },
  { id: "darkmode", name: "Full Dark Mode Support", price: 20, description: "Seamless dark theme variables switching options." },
];

export default function SoftbridgeStudio() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<string>("saas");
  const [selectedTheme, setSelectedTheme] = useState<string>("orange");
  const [selectedLayout, setSelectedLayout] = useState<string>("modern");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

  const addItem = useCartStore((state) => state.addItem);

  // Calculated totals
  const basePrice = SITE_TYPES.find((t) => t.id === selectedType)?.price || 0;
  const extrasPrice = selectedExtras.reduce((sum, extraId) => {
    const price = EXTRA_FEATURES.find((f) => f.id === extraId)?.price || 0;
    return sum + price;
  }, 0);
  const totalPrice = basePrice + extrasPrice;

  const currentThemeObj = COLOR_THEMES.find((t) => t.id === selectedTheme) || COLOR_THEMES[0];
  const currentTypeObj = SITE_TYPES.find((t) => t.id === selectedType) || SITE_TYPES[0];

  const handleToggleExtra = (extraId: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId) ? prev.filter((id) => id !== extraId) : [...prev, extraId]
    );
  };

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
          theme: {
            primary: currentThemeObj.primary,
            secondary: currentThemeObj.secondary,
            bg: currentThemeObj.bg,
          },
          typography: {
            headings: "Outfit",
            body: "Inter",
          },
          pages: [],
          animationProfile: "smooth",
        },
      },
    });

    setIsAddedToCart(true);
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000);
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  // Step Header Details
  const stepTitles = [
    { name: "Site Type", desc: "Select the architectural layout purpose", icon: Monitor },
    { name: "Theme Palette", desc: "Choose color variables mapping", icon: Palette },
    { name: "Layout Style", desc: "Select visual spacing details", icon: Layers },
    { name: "Extra Features", desc: "Toggle pre-bundled plugins & scripts", icon: Settings },
  ];

  return (
    <section className="w-full mb-32 bg-abyss-panel/30 border border-black/5 rounded-3xl p-6 md:p-12 relative overflow-hidden shadow-sm">
      
      {/* Background ambient light orange overlay */}
      <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-cosmic-teal/5 blur-3xl pointer-events-none" />
      
      {/* Component Title Header */}
      <div className="mb-12 border-b border-black/5 pb-6">
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-cosmic-teal font-bold block mb-2">
          SOFTBRIDGE // ENGINE STUDIO
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-star-white tracking-tight">
          SOFTBRIDGE STUDIO
        </h2>
        <p className="text-xs text-muted-steel mt-2 font-light max-w-lg">
          Assemble your custom site architecture from scratch step-by-step and preview your live wireframe modules instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left Side: Step Configurations */}
        <div className="lg:col-span-7 flex flex-col justify-between min-h-[460px]">
          
          {/* Step Progress Indicators */}
          <div className="flex justify-between items-center mb-8 gap-1.5 font-mono text-[9px] uppercase tracking-wider text-muted-steel">
            {stepTitles.map((step, idx) => (
              <div 
                key={idx} 
                onClick={() => setCurrentStep(idx)}
                className={`flex items-center gap-1.5 cursor-pointer pb-2 border-b-2 transition-all ${
                  currentStep === idx 
                    ? "border-cosmic-teal text-cosmic-teal font-bold" 
                    : "border-transparent text-muted-steel hover:text-star-white"
                }`}
              >
                <span>0{idx + 1}</span>
                <span className="hidden sm:inline">{step.name}</span>
              </div>
            ))}
          </div>

          {/* Active Step Details Banner */}
          <div className="mb-6">
            <span className="text-[10px] uppercase font-mono tracking-widest text-muted-steel">
              Step 0{currentStep + 1} // {stepTitles[currentStep].name}
            </span>
            <p className="text-sm text-star-white mt-1 font-bold">{stepTitles[currentStep].desc}</p>
          </div>

          {/* Configuration Selection Container */}
          <div className="flex-1 mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: -15, x: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                
                {/* Step 1: Site Type */}
                {currentStep === 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {SITE_TYPES.map((type) => {
                      const Icon = type.icon;
                      const isSelected = selectedType === type.id;
                      return (
                        <div
                          key={type.id}
                          onClick={() => setSelectedType(type.id)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between h-36 ${
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
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Step 2: Theme Selection */}
                {currentStep === 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {COLOR_THEMES.map((theme) => {
                      const isSelected = selectedTheme === theme.id;
                      return (
                        <div
                          key={theme.id}
                          onClick={() => setSelectedTheme(theme.id)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                            isSelected 
                              ? "bg-cosmic-teal/10 border-cosmic-teal/40" 
                              : "bg-abyss-panel/50 border-black/5 hover:border-black/15"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-bold text-star-white">{theme.name}</span>
                            <div className="flex gap-1">
                              <div className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: theme.primary }} />
                              <div className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: theme.secondary }} />
                              <div className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: theme.bg }} />
                            </div>
                          </div>
                          <div 
                            className="p-3.5 rounded-xl border border-black/5 text-center font-mono text-[9px]"
                            style={{ backgroundColor: theme.bg, color: theme.text }}
                          >
                            MAPPING PREVIEW TEXT
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Step 3: Layout Style */}
                {currentStep === 2 && (
                  <div className="space-y-3">
                    {LAYOUT_STYLES.map((style) => {
                      const isSelected = selectedLayout === style.id;
                      return (
                        <div
                          key={style.id}
                          onClick={() => setSelectedLayout(style.id)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${
                            isSelected 
                              ? "bg-cosmic-teal/10 border-cosmic-teal/40" 
                              : "bg-abyss-panel/50 border-black/5 hover:border-black/15"
                          }`}
                        >
                          <div>
                            <h4 className="text-xs font-bold text-star-white">{style.name}</h4>
                            <p className="text-[10px] text-muted-steel mt-0.5 font-light">{style.description}</p>
                          </div>
                          {isSelected && (
                            <div className="w-6 h-6 rounded-full bg-cosmic-teal flex items-center justify-center text-white">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Step 4: Extra Features */}
                {currentStep === 3 && (
                  <div className="space-y-3">
                    {EXTRA_FEATURES.map((extra) => {
                      const isSelected = selectedExtras.includes(extra.id);
                      return (
                        <div
                          key={extra.id}
                          onClick={() => handleToggleExtra(extra.id)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                            isSelected 
                              ? "bg-cosmic-teal/10 border-cosmic-teal/40" 
                              : "bg-abyss-panel/50 border-black/5 hover:border-black/15"
                          }`}
                        >
                          <div>
                            <h4 className="text-xs font-bold text-star-white">{extra.name}</h4>
                            <p className="text-[10px] text-muted-steel mt-0.5 font-light">{extra.description}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-black text-sunset-coral">+${extra.price}</span>
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                              isSelected ? "bg-cosmic-teal border-cosmic-teal text-white" : "border-black/20"
                            }`}>
                              {isSelected && <Check className="w-3.5 h-3.5" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation controls */}
          <div className="flex justify-between items-center border-t border-black/5 pt-6 shrink-0 gap-3">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-muted-steel disabled:opacity-30 disabled:pointer-events-none hover:text-cosmic-teal transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Prev Step
            </button>
            
            {currentStep < 3 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-star-white hover:text-cosmic-teal transition-colors cursor-pointer"
              >
                Next Step
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setShowPreview(true)}
                className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-cosmic-teal transition-colors cursor-pointer"
              >
                Generate Preview
                <Eye className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

        {/* Right Side: Visual Mockup Preview Frame */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-midnight-void border border-black/5 rounded-2xl p-5 shadow-inner">
          <div className="w-full">
            {/* Header browser-style bar */}
            <div className="flex items-center justify-between border-b border-black/5 pb-3 mb-4">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <span className="font-mono text-[8px] tracking-wider text-muted-steel uppercase">softbridge.studio//preview</span>
            </div>

            {/* Custom styled browser canvas */}
            <div 
              className="w-full h-64 rounded-xl border border-black/5 overflow-hidden p-5 flex flex-col justify-between transition-colors duration-500 relative"
              style={{ backgroundColor: currentThemeObj.bg, color: currentThemeObj.text }}
            >
              {/* simulated header */}
              <div className="flex justify-between items-center border-b border-black/5 pb-2.5">
                <span className="text-[9px] font-black tracking-widest font-display">SOFTBRIDGE//DEV</span>
                <div className="flex gap-2 text-[8px] font-mono opacity-80">
                  <span>Home</span>
                  <span>Assets</span>
                  <span>Contact</span>
                </div>
              </div>

              {/* simulated body wireframe based on Layout & Type choice */}
              <div className="flex-1 py-4 flex flex-col justify-center text-center space-y-2">
                
                {selectedLayout === "bold" ? (
                  <h3 className="text-xl font-black uppercase tracking-tighter leading-none" style={{ color: currentThemeObj.primary }}>
                    {currentTypeObj.name}
                  </h3>
                ) : selectedLayout === "minimal" ? (
                  <h3 className="text-sm uppercase tracking-[0.2em] font-light">
                    {currentTypeObj.name}
                  </h3>
                ) : (
                  <h3 className="text-base font-extrabold tracking-tight font-display">
                    {currentTypeObj.name}
                  </h3>
                )}

                <p className="text-[9px] max-w-[210px] mx-auto opacity-75 font-sans leading-relaxed">
                  Modular preset config assembled via {selectedLayout} layout engine structures.
                </p>

                {/* Extra features badges */}
                <div className="flex flex-wrap gap-1 justify-center pt-2">
                  {selectedExtras.map((exId) => (
                    <span 
                      key={exId} 
                      className="text-[6px] font-mono uppercase px-1.5 py-0.5 rounded border"
                      style={{ borderColor: currentThemeObj.primary + "30", backgroundColor: currentThemeObj.primary + "10", color: currentThemeObj.primary }}
                    >
                      {exId === "analytics" && "Analytics"}
                      {exId === "3d" && "3D elements"}
                      {exId === "darkmode" && "Darktheme"}
                    </span>
                  ))}
                </div>

              </div>

              {/* simulated footer action button */}
              <div className="flex justify-between items-center border-t border-black/5 pt-2.5">
                <span className="text-[8px] font-mono">Status: Ready</span>
                <button 
                  className="px-3 py-1 rounded text-[7px] font-mono font-bold uppercase transition-opacity"
                  style={{ backgroundColor: currentThemeObj.primary, color: selectedTheme === "cyan" ? "#fff" : "#fff" }}
                >
                  Deploy
                </button>
              </div>

            </div>
          </div>

          {/* Setup details and Action CTA */}
          <div className="border-t border-black/5 pt-5 mt-6 space-y-4">
            <div className="flex justify-between items-end font-mono">
              <div>
                <span className="text-[8px] text-muted-steel block uppercase">Setup Config Price</span>
                <span className="text-xl font-black text-sunset-coral">${totalPrice}</span>
              </div>
              <span className="text-[9px] text-muted-steel">01-Time Setup Charge</span>
            </div>

            <CyberButton
              variant="teal"
              size="sm"
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-1.5 font-bold uppercase tracking-wider text-xs"
            >
              {isAddedToCart ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Added Successfully!
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  Add Custom Template to Cart
                </>
              )}
            </CyberButton>
          </div>

        </div>

      </div>

    </section>
  );
}
