"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  Monitor, Smartphone, Settings, Check, ChevronLeft, Filter, Star, Layout, Plus, Trash2, Edit2, GripVertical, Type, X, Image as ImageIcon, ChevronRight, Layers, Palette, Columns
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { FullSitePreview, PreviewConfig } from "./PreviewModal";
import { TEMPLATES, Template } from "@/data/templates";
import { CustomPage, CustomSection, CustomSectionType } from "@/types/builder";

// ─── Constants & Types ───────────────────────────────────────────────────────

type ColorTheme = { id: string; name: string; primary: string; secondary: string; bg: string; text: string; };
type FontStyle = { id: string; name: string; fontFamily: string; };

const COLOR_THEMES: ColorTheme[] = [
  { id: "clay", name: "Sunset Clay", primary: "#E85D3B", secondary: "#D94F2E", bg: "#FDF0E6", text: "#3F2E2A" },
  { id: "graphite", name: "Graphite Ivory", primary: "#2F3437", secondary: "#8C6A55", bg: "#F7F3EC", text: "#30251F" },
  { id: "emerald", name: "Emerald Mint", primary: "#0F9F6E", secondary: "#0B6B52", bg: "#F0F8F2", text: "#123D31" },
  { id: "navy", name: "Navy Steel", primary: "#315C7C", secondary: "#7096A5", bg: "#F3F7F8", text: "#23333F" },
  { id: "dark", name: "Midnight Dark", primary: "#4F46E5", secondary: "#4338CA", bg: "#0F172A", text: "#F8FAFC" },
];

const FONT_STYLES: FontStyle[] = [
  { id: "inter", name: "Inter (Apple Style)", fontFamily: "var(--font-sans)" },
  { id: "georgia", name: "Classic Serif", fontFamily: "Georgia, serif" },
  { id: "mono", name: "Developer Mono", fontFamily: "var(--font-mono)" },
  { id: "system", name: "System UI", fontFamily: "system-ui, -apple-system, sans-serif" }
];

const ALL_FEATURES = [
  { id: "webgl", name: "WebGL Engine", price: 40 },
  { id: "framer", name: "Framer Motion", price: 25 },
  { id: "analytics", name: "Analytics", price: 15 },
  { id: "newsletter", name: "Newsletter Integration", price: 20 },
];

const categorySections: Record<string, string[]> = {
  "SaaS": ["Features", "Pricing", "Testimonials"],
  "Portfolio": ["Gallery", "Features", "Contact"],
  "E-Commerce": ["Slider", "Gallery", "Pricing"],
  "Blog": ["Blog", "Newsletter", "Contact"],
  "Landing Page": ["Hero", "Features", "FAQ"],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function createEmptySection(type: CustomSectionType): CustomSection {
  return {
    id: `sec-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    type,
    content: { 
      heading: `New ${type}`, 
      description: `Describe your ${type.toLowerCase()} here.`,
      sliderItems: type === "Slider" ? [
        { image: "", title: "Slide 1", subtitle: "Subtitle 1" },
        { image: "", title: "Slide 2", subtitle: "Subtitle 2" }
      ] : undefined
    },
    styles: { alignment: "center", padding: "py-16", layout: "1-col" }
  };
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function SoftbridgeStudio() {
  // Phase State
  const [phase, setPhase] = useState<"marketplace" | "configurator">("marketplace");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  // Marketplace Filters
  const [filterCategory, setFilterCategory] = useState<string[]>([]);

  // Configurator State - Core
  const [customPages, setCustomPages] = useState<CustomPage[]>([]);
  const [activePageId, setActivePageId] = useState<string>("");
  const [activeInspector, setActiveInspector] = useState<"theme" | "section" | "features">("theme");
  const [editingSection, setEditingSection] = useState<CustomSection | null>(null);
  
  // Viewport State
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  // Global Theme Settings
  const [siteName, setSiteName] = useState("");
  const [selectedThemeId, setSelectedThemeId] = useState("clay");
  const [headingFont, setHeadingFont] = useState("inter");
  const [bodyFont, setBodyFont] = useState("inter");
  const [borderRadius, setBorderRadius] = useState("12px");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  // Marketplace Logic
  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter((t) => {
      if (filterCategory.length > 0 && !filterCategory.includes(t.category)) return false;
      return true;
    }).sort((a, b) => (a.isPopular === b.isPopular ? 0 : a.isPopular ? -1 : 1));
  }, [filterCategory]);

  const handleSelectTemplate = (t: Template) => {
    setSelectedTemplate(t);
    setSiteName(t.name);
    setSelectedExtras(t.features.map(f => ALL_FEATURES.find(af => af.name === f)?.id).filter(Boolean) as string[]);
    
    // Use predefined pages from the template data, or fallback to an empty Home page
    const pages = t.defaultPages && t.defaultPages.length > 0 
      ? t.defaultPages 
      : [{ id: "home", title: "Home", sections: [] }];
      
    setCustomPages(pages);
    setActivePageId(pages[0].id);

    setPhase("configurator");
    setActiveInspector("theme");
    setEditingSection(null);
  };

  // Builder Handlers
  const handleAddPage = () => {
    const title = prompt("Enter page name (e.g. Services):");
    if (!title) return;
    const newPage: CustomPage = { id: slugify(title), title, sections: [] };
    setCustomPages([...customPages, newPage]);
    setActivePageId(newPage.id);
  };

  const handleAddSection = (type: CustomSectionType) => {
    const newSec = createEmptySection(type);
    setCustomPages(customPages.map(p => p.id === activePageId ? { ...p, sections: [...p.sections, newSec] } : p));
    setEditingSection(newSec);
    setActiveInspector("section");
  };

  const handleDeleteSection = (secId: string) => {
    setCustomPages(customPages.map(p => p.id === activePageId ? { ...p, sections: p.sections.filter(s => s.id !== secId) } : p));
    if (editingSection?.id === secId) {
      setEditingSection(null);
      setActiveInspector("theme");
    }
  };

  const handleReorderSections = (newSections: CustomSection[]) => {
    setCustomPages(customPages.map(p => p.id === activePageId ? { ...p, sections: newSections } : p));
  };

  const updateEditingSection = (changes: any) => {
    if (!editingSection) return;
    const updated = { ...editingSection, ...changes };
    setEditingSection(updated);
    setCustomPages(customPages.map(p => p.id === activePageId ? { ...p, sections: p.sections.map(s => s.id === updated.id ? updated : s) } : p));
  };

  const toggleExtra = (id: string) => {
    setSelectedExtras(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  // Derived Values
  const activeTheme = COLOR_THEMES.find(t => t.id === selectedThemeId) || COLOR_THEMES[0];
  const activeHeadingFont = FONT_STYLES.find(f => f.id === headingFont)?.fontFamily || "var(--font-sans)";
  const activeBodyFont = FONT_STYLES.find(f => f.id === bodyFont)?.fontFamily || "var(--font-sans)";

  const extrasPrice = selectedExtras.reduce((sum, id) => sum + (ALL_FEATURES.find(af => af.id === id)?.price || 0), 0);
  const templatePrice = selectedTemplate?.price || 0;
  const totalPrice = templatePrice + extrasPrice;

  const activePageObj = customPages.find(p => p.id === activePageId);

  const previewConfig: PreviewConfig | null = selectedTemplate ? {
    typeId: selectedTemplate.id,
    typeName: selectedTemplate.category,
    brandName: siteName || selectedTemplate.name,
    themePrimary: activeTheme.primary,
    themeSecondary: activeTheme.secondary,
    themeBg: activeTheme.bg,
    themeText: activeTheme.text,
    themeFont: activeBodyFont,
    themeHeadingFont: activeHeadingFont,
    themeBorderRadius: borderRadius,
    extras: selectedExtras,
    customPages: [activePageObj || customPages[0]], // Render only active page in canvas
  } : null;

  const handleAddToCart = () => {
    if (!selectedTemplate) return;
    addItem({
      domainName: `studio-${slugify(siteName || selectedTemplate.name)}`,
      domainTld: ".studio",
      domainPrice: 0,
      websitePackage: {
        templateId: selectedTemplate.id,
        templateName: siteName || selectedTemplate.name,
        setupPrice: totalPrice,
        config: {
          templateId: selectedTemplate.id,
          templateName: selectedTemplate.name,
          brandName: siteName || selectedTemplate.name,
          slogan: "",
          logo: "",
          theme: { primary: activeTheme.primary, secondary: activeTheme.secondary, bg: activeTheme.bg },
          typography: { headings: activeHeadingFont, body: activeBodyFont },
          pages: customPages.map(p => ({ id: p.id, title: p.title, path: `/${p.id}`, sections: p.sections.map(s => ({ id: s.id, type: s.type, title: s.content.heading || s.type, content: s.content, styles: s.styles })) })),
          animationProfile: "smooth",
        },
      },
    });
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  // ─── RENDER ────────────────────────────────────────────────────────────────
  
  if (phase === "marketplace") {
    return (
      <section className="relative mb-10 w-full overflow-hidden rounded-2xl border border-black/5 bg-[#FDF0E6] p-4 shadow-sm md:p-6 font-sans">
        <div className="mb-6 flex items-center justify-between border-b border-black/5 pb-4">
          <div>
            <span className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#E85D3B]">Softbridge Studio</span>
            <h2 className="text-2xl font-semibold text-[#5C2E1F] md:text-3xl tracking-tight">Select a Base Template</h2>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-56 shrink-0 flex flex-col gap-5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5C2E1F] mb-3 flex items-center gap-1.5"><Filter className="w-3.5 h-3.5"/> Categories</h3>
              <div className="flex flex-col gap-1.5">
                {Object.keys(categorySections).map(cat => (
                  <label key={cat} className="flex items-center gap-2 text-sm text-[#5C2E1F]/80 cursor-pointer hover:text-[#5C2E1F]">
                    <input type="checkbox" checked={filterCategory.includes(cat)} onChange={() => setFilterCategory(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])} className="rounded border-black/20 text-[#E85D3B] focus:ring-[#E85D3B]" />
                    {cat}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map(t => (
              <div key={t.id} className="group relative flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer" onClick={() => handleSelectTemplate(t)}>
                <div className="aspect-[4/3] bg-black/5 flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-[#E85D3B]/5 to-[#5C2E1F]/5" />
                   {t.isPopular && <span className="absolute top-2 right-2 bg-[#E85D3B] text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-full z-10">Popular</span>}
                   <Layout className="w-8 h-8 text-[#5C2E1F]/20 group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-[#5C2E1F]">{t.name}</h4>
                    <span className="font-mono text-sm font-bold text-[#E85D3B]">${t.price}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#5C2E1F]/50 mb-2">{t.category}</span>
                  <p className="text-xs text-[#5C2E1F]/70 line-clamp-2">{t.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ─── SHOPIFY-STYLE BUILDER ─────────────────────────────────────────────────
  return (
    <div className="flex h-[85vh] min-h-[600px] w-full bg-[#f4f4f4] rounded-2xl border border-black/10 overflow-hidden font-sans shadow-lg mb-10">
      
      {/* ─── LEFT PANEL: NAVIGATION & STRUCTURE ─── */}
      <div className="w-[280px] shrink-0 border-r border-black/10 bg-white flex flex-col shadow-sm z-20">
        
        {/* Top Header */}
        <div className="h-14 px-4 border-b border-black/10 flex items-center justify-between bg-white shrink-0">
           <div className="flex items-center gap-2 text-sm font-semibold text-[#5C2E1F] cursor-pointer" onClick={() => setPhase("marketplace")}>
             <ChevronLeft className="w-4 h-4 text-[#5C2E1F]/50" />
             Studio Builder
           </div>
        </div>

        {/* Global Nav Settings */}
        <div className="p-3 border-b border-black/10 flex gap-2 shrink-0">
           <button onClick={() => {setActiveInspector("theme"); setEditingSection(null);}} className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${activeInspector === "theme" ? "bg-[#FDF0E6] text-[#E85D3B]" : "bg-black/5 text-[#5C2E1F]/70 hover:bg-black/10"}`}>
             <Palette className="w-3.5 h-3.5" /> Theme
           </button>
           <button onClick={() => {setActiveInspector("features"); setEditingSection(null);}} className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${activeInspector === "features" ? "bg-[#FDF0E6] text-[#E85D3B]" : "bg-black/5 text-[#5C2E1F]/70 hover:bg-black/10"}`}>
             <Star className="w-3.5 h-3.5" /> Features
           </button>
        </div>

        {/* Pages Dropdown/List */}
        <div className="p-3 border-b border-black/10 shrink-0">
           <div className="flex items-center justify-between mb-2">
             <span className="text-[10px] uppercase font-bold tracking-wider text-[#5C2E1F]/50">Pages</span>
             <button onClick={handleAddPage} className="p-1 rounded text-[#5C2E1F]/50 hover:bg-black/5 hover:text-[#5C2E1F]"><Plus className="w-3.5 h-3.5" /></button>
           </div>
           <select 
             value={activePageId} 
             onChange={e => {setActivePageId(e.target.value); setEditingSection(null); setActiveInspector("section");}} 
             className="w-full text-xs font-semibold bg-black/5 border-none rounded-lg px-2 py-2 text-[#5C2E1F] focus:ring-1 focus:ring-[#E85D3B] outline-none"
           >
             {customPages.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
           </select>
        </div>

        {/* Sections List for Active Page */}
        <div className="flex-1 overflow-y-auto bg-black/[0.02] p-3 flex flex-col relative">
           <span className="text-[10px] uppercase font-bold tracking-wider text-[#5C2E1F]/50 mb-2">{activePageObj?.title} Sections</span>
           <Reorder.Group axis="y" values={activePageObj?.sections || []} onReorder={handleReorderSections} className="flex flex-col gap-1.5">
             {activePageObj?.sections.map(sec => {
               const isSelected = editingSection?.id === sec.id;
               return (
                 <Reorder.Item key={sec.id} value={sec} className={`group bg-white p-2.5 rounded-lg border shadow-sm flex items-center gap-2.5 cursor-grab active:cursor-grabbing transition-colors ${isSelected ? "border-[#E85D3B] ring-1 ring-[#E85D3B]/20" : "border-black/5 hover:border-black/15"}`}>
                    <GripVertical className="w-4 h-4 text-black/20 shrink-0" />
                    <div className="flex-1 min-w-0" onClick={() => {setEditingSection(sec); setActiveInspector("section");}}>
                      <div className="text-xs font-bold text-[#5C2E1F] truncate">{sec.type}</div>
                      <div className="text-[10px] text-[#5C2E1F]/50 truncate">{sec.content.heading || "No heading"}</div>
                    </div>
                    <button onClick={() => handleDeleteSection(sec.id)} className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 rounded text-red-500 transition-opacity"><Trash2 className="w-3.5 h-3.5" /></button>
                 </Reorder.Item>
               )
             })}
           </Reorder.Group>
           
           <div className="mt-4 pt-4 border-t border-black/5 grid grid-cols-2 gap-1.5">
             {(["Hero", "Features", "Pricing", "Testimonials", "FAQ", "Contact", "Gallery", "Blog", "Slider", "Custom"] as CustomSectionType[]).map(type => (
               <button key={type} onClick={() => handleAddSection(type)} className="flex items-center gap-1.5 p-1.5 rounded-md border border-dashed border-black/15 text-[10px] font-bold text-[#5C2E1F]/60 hover:text-[#E85D3B] hover:border-[#E85D3B] hover:bg-[#E85D3B]/5 transition-colors">
                 <Plus className="w-3 h-3" /> {type}
               </button>
             ))}
           </div>
        </div>

      </div>

      {/* ─── CENTER PANEL: LIVE PREVIEW CANVAS ─── */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-[#e9e9e9]">
        {/* Canvas Toolbar */}
        <div className="h-14 px-4 flex items-center justify-center gap-2 shrink-0 z-10">
           <div className="bg-white rounded-full px-2 py-1 flex gap-1 shadow-sm border border-black/5">
             <button onClick={() => setViewMode("desktop")} className={`p-1.5 rounded-full transition-colors ${viewMode === "desktop" ? "bg-black/10 text-black" : "text-black/40 hover:text-black"}`}><Monitor className="w-4 h-4" /></button>
             <button onClick={() => setViewMode("mobile")} className={`p-1.5 rounded-full transition-colors ${viewMode === "mobile" ? "bg-black/10 text-black" : "text-black/40 hover:text-black"}`}><Smartphone className="w-4 h-4" /></button>
           </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto custom-scrollbar p-4 md:p-8 flex items-start justify-center">
           {previewConfig && (
             <motion.div 
                layout 
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col ring-1 ring-black/5" 
                style={{ 
                  width: viewMode === "desktop" ? "100%" : "375px",
                  height: "100%",
                  minHeight: "600px",
                  maxWidth: "1200px"
                }}
             >
                <FullSitePreview config={previewConfig} viewMode={viewMode} />
             </motion.div>
           )}
        </div>
      </div>

      {/* ─── RIGHT PANEL: INSPECTOR & SETTINGS ─── */}
      <div className="w-[320px] shrink-0 border-l border-black/10 bg-white flex flex-col shadow-sm z-20">
        
        <div className="h-14 px-4 border-b border-black/10 flex items-center justify-between bg-white shrink-0">
           <span className="text-sm font-bold text-[#5C2E1F] capitalize">
             {activeInspector === "theme" ? "Global Settings" : activeInspector === "features" ? "Site Features" : editingSection ? `Edit ${editingSection.type}` : "Inspector"}
           </span>
           {editingSection && (
             <button onClick={() => {setEditingSection(null); setActiveInspector("theme");}} className="p-1 rounded hover:bg-black/5 text-[#5C2E1F]/50 hover:text-[#5C2E1F]"><X className="w-4 h-4" /></button>
           )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-[#fafafa]">
           
           {/* Inspector: THEME */}
           {activeInspector === "theme" && (
             <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#5C2E1F]/50 mb-3">Site Details</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-[#5C2E1F] block mb-1">Site Name</label>
                      <input type="text" value={siteName} onChange={e => setSiteName(e.target.value)} className="w-full text-xs bg-white border border-black/10 rounded-md px-2 py-1.5 focus:ring-1 focus:ring-[#E85D3B]" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#5C2E1F]/50 mb-3">Colors</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {COLOR_THEMES.map(theme => (
                      <button key={theme.id} onClick={() => setSelectedThemeId(theme.id)} className={`flex items-center justify-between p-2 rounded-lg border transition-all bg-white ${selectedThemeId === theme.id ? "border-[#E85D3B] ring-1 ring-[#E85D3B]/20" : "border-black/10 hover:border-black/20"}`}>
                        <span className="text-[10px] font-semibold text-[#5C2E1F]">{theme.name}</span>
                        <div className="flex gap-1">
                          <span className="w-2.5 h-2.5 rounded-full" style={{background: theme.primary}}/>
                          <span className="w-2.5 h-2.5 rounded-full" style={{background: theme.bg}}/>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#5C2E1F]/50 mb-3">Typography</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-semibold text-[#5C2E1F] block mb-1">Headings</label>
                      <select value={headingFont} onChange={e => setHeadingFont(e.target.value)} className="w-full text-xs bg-white border border-black/10 rounded-md px-2 py-1.5 text-[#5C2E1F]">
                        {FONT_STYLES.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-[#5C2E1F] block mb-1">Body Text</label>
                      <select value={bodyFont} onChange={e => setBodyFont(e.target.value)} className="w-full text-xs bg-white border border-black/10 rounded-md px-2 py-1.5 text-[#5C2E1F]">
                        {FONT_STYLES.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#5C2E1F]/50 mb-3">Shape</h4>
                  <div>
                    <label className="flex justify-between text-[10px] font-semibold text-[#5C2E1F] mb-1.5">
                      <span>Border Radius</span>
                      <span className="text-[#E85D3B]">{borderRadius}</span>
                    </label>
                    <input type="range" min="0" max="32" step="4" value={parseInt(borderRadius)} onChange={e => setBorderRadius(`${e.target.value}px`)} className="w-full accent-[#E85D3B]" />
                  </div>
                </div>
             </div>
           )}

           {/* Inspector: FEATURES */}
           {activeInspector === "features" && (
             <div className="space-y-3">
               <p className="text-xs text-[#5C2E1F]/60 mb-4">Toggle advanced functionality and tech stacks for your site.</p>
               {ALL_FEATURES.map(f => {
                  const isSelected = selectedExtras.includes(f.id);
                  return (
                    <label key={f.id} className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-colors bg-white ${isSelected ? "border-[#E85D3B] ring-1 ring-[#E85D3B]/10" : "border-black/10 hover:border-black/20"}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-[#5C2E1F]">{f.name}</span>
                        <input type="checkbox" checked={isSelected} onChange={() => toggleExtra(f.id)} className="rounded text-[#E85D3B] focus:ring-[#E85D3B] w-4 h-4" />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#E85D3B]">
                        +${f.price}
                      </span>
                    </label>
                  );
                })}
             </div>
           )}

           {/* Inspector: SECTION */}
           {activeInspector === "section" && editingSection && (
             <div className="space-y-6">
                
                {/* Content Settings */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#5C2E1F]/50 mb-3 flex items-center gap-1"><Type className="w-3 h-3"/> Content</h4>
                  <div className="space-y-3 p-3 bg-white border border-black/5 rounded-xl shadow-sm">
                    <div>
                      <label className="text-[10px] font-semibold text-[#5C2E1F] block mb-1">Heading</label>
                      <input type="text" value={editingSection.content.heading || ""} onChange={e => updateEditingSection({ content: { ...editingSection.content, heading: e.target.value } })} className="w-full text-xs bg-black/5 border-none rounded-md px-2 py-1.5 focus:ring-1 focus:ring-[#E85D3B]" />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-[#5C2E1F] block mb-1">Subheading</label>
                      <input type="text" value={editingSection.content.subheading || ""} onChange={e => updateEditingSection({ content: { ...editingSection.content, subheading: e.target.value } })} className="w-full text-xs bg-black/5 border-none rounded-md px-2 py-1.5 focus:ring-1 focus:ring-[#E85D3B]" />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-[#5C2E1F] block mb-1">Description</label>
                      <textarea value={editingSection.content.description || ""} onChange={e => updateEditingSection({ content: { ...editingSection.content, description: e.target.value } })} rows={3} className="w-full text-xs bg-black/5 border-none rounded-md px-2 py-1.5 focus:ring-1 focus:ring-[#E85D3B]" />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-[#5C2E1F] block mb-1">Button Text</label>
                      <input type="text" value={editingSection.content.buttonText || ""} onChange={e => updateEditingSection({ content: { ...editingSection.content, buttonText: e.target.value } })} className="w-full text-xs bg-black/5 border-none rounded-md px-2 py-1.5 focus:ring-1 focus:ring-[#E85D3B]" />
                    </div>
                  </div>
                </div>

                {/* Slider Specific Settings */}
                {editingSection.type === "Slider" && (
                   <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#5C2E1F]/50 mb-3 flex items-center gap-1"><Layers className="w-3 h-3"/> Slider Items</h4>
                      <div className="space-y-2 p-3 bg-white border border-black/5 rounded-xl shadow-sm">
                         {editingSection.content.sliderItems?.map((slide, i) => (
                           <div key={i} className="p-2 bg-black/5 rounded-md border border-black/5 space-y-2">
                              <span className="text-[10px] font-bold text-[#5C2E1F]/60">Slide {i + 1}</span>
                              <input type="text" placeholder="Image URL" value={slide.image} onChange={e => {
                                const newItems = [...(editingSection.content.sliderItems || [])];
                                newItems[i].image = e.target.value;
                                updateEditingSection({ content: { ...editingSection.content, sliderItems: newItems } });
                              }} className="w-full text-xs bg-white border-none rounded px-2 py-1" />
                              <input type="text" placeholder="Title" value={slide.title} onChange={e => {
                                const newItems = [...(editingSection.content.sliderItems || [])];
                                newItems[i].title = e.target.value;
                                updateEditingSection({ content: { ...editingSection.content, sliderItems: newItems } });
                              }} className="w-full text-xs bg-white border-none rounded px-2 py-1" />
                           </div>
                         ))}
                         <button onClick={() => {
                            const newItems = [...(editingSection.content.sliderItems || []), { image: "", title: "New Slide" }];
                            updateEditingSection({ content: { ...editingSection.content, sliderItems: newItems } });
                         }} className="w-full py-1 text-[10px] font-bold text-[#E85D3B] bg-[#E85D3B]/10 rounded hover:bg-[#E85D3B]/20">
                           + Add Slide
                         </button>
                      </div>
                   </div>
                )}

                {/* Styling Settings */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#5C2E1F]/50 mb-3 flex items-center gap-1"><Palette className="w-3 h-3"/> Design</h4>
                  <div className="space-y-4 p-3 bg-white border border-black/5 rounded-xl shadow-sm">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-semibold text-[#5C2E1F] block mb-1">Background Color</label>
                        <input type="color" value={editingSection.styles.backgroundColor || "#ffffff"} onChange={e => updateEditingSection({ styles: { ...editingSection.styles, backgroundColor: e.target.value } })} className="w-full h-8 rounded cursor-pointer border-none p-0 bg-transparent" />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-[#5C2E1F] block mb-1">Text Color</label>
                        <input type="color" value={editingSection.styles.textColor || "#000000"} onChange={e => updateEditingSection({ styles: { ...editingSection.styles, textColor: e.target.value } })} className="w-full h-8 rounded cursor-pointer border-none p-0 bg-transparent" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-[10px] font-semibold text-[#5C2E1F] block mb-1">Layout Strategy</label>
                      <div className="flex gap-1 p-1 bg-black/5 rounded-md">
                         {(["1-col", "2-col", "3-col", "4-col"] as const).map(l => (
                           <button key={l} onClick={() => updateEditingSection({ styles: { ...editingSection.styles, layout: l } })} className={`flex-1 py-1 text-[10px] font-bold rounded ${editingSection.styles.layout === l ? "bg-white shadow text-[#E85D3B]" : "text-[#5C2E1F]/50 hover:text-[#5C2E1F]"}`}>
                             {l.split("-")[0]}
                           </button>
                         ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold text-[#5C2E1F] block mb-1">Alignment</label>
                      <div className="flex gap-1 p-1 bg-black/5 rounded-md">
                        {(["left", "center", "right"] as const).map(a => (
                          <button key={a} onClick={() => updateEditingSection({ styles: { ...editingSection.styles, alignment: a } })} className={`flex-1 py-1 text-[10px] font-bold rounded capitalize ${editingSection.styles.alignment === a ? "bg-white shadow text-[#E85D3B]" : "text-[#5C2E1F]/50 hover:text-[#5C2E1F]"}`}>
                            {a}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold text-[#5C2E1F] block mb-1">Spacing (Padding)</label>
                      <select value={editingSection.styles.padding || "py-16"} onChange={e => updateEditingSection({ styles: { ...editingSection.styles, padding: e.target.value } })} className="w-full text-xs bg-black/5 border-none rounded-md px-2 py-2 text-[#5C2E1F] focus:ring-1 focus:ring-[#E85D3B]">
                        <option value="py-8">Small (py-8)</option>
                        <option value="py-16">Medium (py-16)</option>
                        <option value="py-24">Large (py-24)</option>
                        <option value="py-32">Huge (py-32)</option>
                      </select>
                    </div>
                  </div>
                </div>

             </div>
           )}
        </div>

        {/* Footer: Cart actions */}
        <div className="p-4 border-t border-black/10 bg-white shrink-0 shadow-[0_-4px_12px_rgba(0,0,0,0.02)] z-30">
           <div className="flex justify-between items-center mb-3">
             <span className="text-sm font-semibold text-[#5C2E1F]">Total</span>
             <span className="text-xl font-bold font-mono text-[#E85D3B]">${totalPrice}</span>
           </div>
           <button onClick={handleAddToCart} className="w-full relative py-2.5 bg-[#E85D3B] hover:bg-[#D94F2E] text-white rounded-lg font-bold text-sm shadow-md transition-all overflow-hidden flex justify-center items-center gap-2">
              {isAddedToCart ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
                  <Check className="w-4 h-4" /> Added to Cart
                </motion.div>
              ) : (
                <>Add to Cart</>
              )}
           </button>
        </div>

      </div>

    </div>
  );
}
