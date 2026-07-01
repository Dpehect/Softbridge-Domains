"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  Monitor, Palette, Settings, Check, ArrowRight, ChevronLeft, Filter, Star, Layout, Plus, Trash2, Edit2, GripVertical, Type, Box, Image as ImageIcon, ChevronRight, X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import PreviewModal, { PreviewConfig, FullSitePreview } from "./PreviewModal";
import { TEMPLATES, Template } from "@/data/templates";
import { CustomPage, CustomSection, CustomSectionType } from "@/types/builder";

// ─── Constants & Types ───────────────────────────────────────────────────────

type ColorTheme = { id: string; name: string; primary: string; secondary: string; bg: string; text: string; accent: string; };
type FontStyle = { id: string; name: string; fontFamily: string; description: string; };

const COLOR_THEMES: ColorTheme[] = [
  { id: "clay", name: "Sunset Clay", primary: "#E85D3B", secondary: "#D94F2E", bg: "#FDF0E6", text: "#3F2E2A", accent: "#F4A26190" },
  { id: "graphite", name: "Graphite Ivory", primary: "#2F3437", secondary: "#8C6A55", bg: "#F7F3EC", text: "#30251F", accent: "#2F343716" },
  { id: "emerald", name: "Emerald Mint", primary: "#0F9F6E", secondary: "#0B6B52", bg: "#F0F8F2", text: "#123D31", accent: "#0F9F6E1D" },
  { id: "navy", name: "Navy Steel", primary: "#315C7C", secondary: "#7096A5", bg: "#F3F7F8", text: "#23333F", accent: "#315C7C1C" },
  { id: "rose", name: "Rose Sand", primary: "#B84D57", secondary: "#D28A6D", bg: "#FFF1EC", text: "#4B2D2A", accent: "#B84D571C" },
  { id: "olive", name: "Olive Studio", primary: "#687A3F", secondary: "#A58A55", bg: "#F7F5EA", text: "#3F3A28", accent: "#687A3F1F" },
  { id: "lavender", name: "Lavender Mute", primary: "#7C689C", secondary: "#5D4978", bg: "#F4F0F9", text: "#312842", accent: "#7C689C1F" },
  { id: "amber", name: "Amber Glow", primary: "#D97706", secondary: "#B45309", bg: "#FFFBEB", text: "#452403", accent: "#D977061F" },
];

const FONT_STYLES: FontStyle[] = [
  { id: "inter", name: "Inter (Apple Style)", fontFamily: "var(--font-sans)", description: "Clean, geometric sans-serif for modern interfaces." },
  { id: "georgia", name: "Classic Serif", fontFamily: "Georgia, serif", description: "Elegant reading experience with high legibility." },
  { id: "mono", name: "Developer Mono", fontFamily: "var(--font-mono)", description: "Technical and structured monospace aesthetic." },
  { id: "system", name: "System UI", fontFamily: "system-ui, -apple-system, sans-serif", description: "Native feel matching the user's OS." }
];

const ALL_FEATURES = [
  { id: "webgl", name: "WebGL", price: 40 },
  { id: "framer", name: "Framer Motion", price: 25 },
  { id: "darkmode", name: "Dark Mode", price: 20 },
  { id: "analytics", name: "Analytics", price: 15 },
  { id: "contact", name: "Contact Form", price: 25 },
  { id: "blog", name: "Blog Section", price: 45 },
  { id: "pricing", name: "Pricing Table", price: 30 },
  { id: "3d", name: "3D Elements", price: 35 },
  { id: "newsletter", name: "Newsletter", price: 20 },
  { id: "testimonial", name: "Testimonial Section", price: 25 },
];

const categorySections: Record<string, string[]> = {
  "SaaS": ["Features", "Pricing", "Testimonials"],
  "Portfolio": ["Gallery", "Features", "Contact"],
  "E-Commerce": ["Gallery", "Features", "Pricing"],
  "Blog": ["Blog", "Newsletter", "Contact"],
  "Agency": ["Features", "Testimonials", "Contact"],
  "Landing Page": ["Features", "Testimonials", "FAQ"],
  "Dashboard": ["Features", "Pricing", "FAQ"],
  "Corporate": ["Features", "Testimonials", "Contact"],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function buildInitialCustomPages(template: Template): CustomPage[] {
  const pagesCount = template.pages;
  const pageTitles = ["Home"];
  if (pagesCount >= 3) pageTitles.push("About", "Contact");
  if (pagesCount >= 5) pageTitles.push("Services", "Pricing");
  if (pagesCount > 5) pageTitles.push("Blog", "FAQ");

  return pageTitles.map((title) => {
    const isHome = title === "Home";
    const sections: CustomSection[] = [];
    
    if (isHome) {
      sections.push({
        id: `sec-${Date.now()}-hero`,
        type: "Hero",
        content: { heading: template.name, description: template.description, buttonText: "Get Started" },
        styles: { alignment: "center", padding: "py-24" }
      });
      const tSections = categorySections[template.category] || ["Features", "FAQ"];
      tSections.forEach((s, i) => {
        sections.push({
          id: `sec-${Date.now()}-${i}`,
          type: s as CustomSectionType,
          content: { heading: s, description: "Detailed information goes here." },
          styles: { alignment: "center", padding: "py-16" }
        });
      });
    } else if (title === "Contact") {
      sections.push({
        id: `sec-${Date.now()}-contact`,
        type: "Contact",
        content: { heading: "Contact Us", description: "Reach out to our team." },
        styles: { alignment: "center", padding: "py-16" }
      });
    } else {
      sections.push({
        id: `sec-${Date.now()}-generic`,
        type: "Features",
        content: { heading: title, description: `Welcome to the ${title} page.` },
        styles: { alignment: "center", padding: "py-16" }
      });
    }

    return { id: slugify(title), title, sections };
  });
}

function createEmptySection(type: CustomSectionType): CustomSection {
  return {
    id: `sec-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    type,
    content: { heading: `New ${type}`, description: `Describe your ${type.toLowerCase()} here.` },
    styles: { alignment: "center", padding: "py-16" }
  };
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function SoftbridgeStudio() {
  // Phase State
  const [phase, setPhase] = useState<"marketplace" | "configurator">("marketplace");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  // Marketplace Filters
  const [filterCategory, setFilterCategory] = useState<string[]>([]);
  const [filterDifficulty, setFilterDifficulty] = useState<string>("");
  const [filterPopular, setFilterPopular] = useState<boolean>(false);

  // Configurator State
  const [configTab, setConfigTab] = useState<"identity" | "aesthetics" | "pages" | "features">("identity");
  
  // -- Identity
  const [siteName, setSiteName] = useState("");
  const [siteSlogan, setSiteSlogan] = useState("");
  const [siteLogo, setSiteLogo] = useState<string>("");
  
  // -- Aesthetics
  const [selectedThemeId, setSelectedThemeId] = useState("clay");
  const [customColors, setCustomColors] = useState<{primary: string, bg: string, text: string}>({ primary: "#E85D3B", bg: "#FDF0E6", text: "#5C2E1F" });
  const [isCustomColor, setIsCustomColor] = useState(false);
  const [headingFont, setHeadingFont] = useState("inter");
  const [bodyFont, setBodyFont] = useState("inter");
  const [borderRadius, setBorderRadius] = useState("12px");
  const [navType, setNavType] = useState<"topbar" | "sidebar" | "minimal">("topbar");
  
  // -- Builder (Pages & Sections)
  const [customPages, setCustomPages] = useState<CustomPage[]>([]);
  const [activePageId, setActivePageId] = useState<string>("");
  const [editingSection, setEditingSection] = useState<CustomSection | null>(null);

  // -- Features
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  // Modals & Cart
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  // Filter Logic
  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter((t) => {
      if (filterCategory.length > 0 && !filterCategory.includes(t.category)) return false;
      if (filterDifficulty && t.difficultyLevel !== filterDifficulty) return false;
      if (filterPopular && !t.isPopular) return false;
      return true;
    }).sort((a, b) => (a.isPopular === b.isPopular ? 0 : a.isPopular ? -1 : 1));
  }, [filterCategory, filterDifficulty, filterPopular]);

  // Handlers
  const handleSelectTemplate = (t: Template) => {
    setSelectedTemplate(t);
    setSiteName(t.name);
    setSiteSlogan(t.description);
    setSelectedExtras(t.features.map(f => ALL_FEATURES.find(af => af.name === f)?.id).filter(Boolean) as string[]);
    
    const pages = buildInitialCustomPages(t);
    setCustomPages(pages);
    setActivePageId(pages[0].id);

    setPhase("configurator");
    setConfigTab("identity");
    setEditingSection(null);
  };

  const toggleCategory = (cat: string) => {
    setFilterCategory(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const toggleExtra = (id: string) => {
    setSelectedExtras(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  // Builder Handlers
  const handleAddPage = () => {
    const title = prompt("Enter page name (e.g. Services):");
    if (!title) return;
    const newPage: CustomPage = { id: slugify(title), title, sections: [] };
    setCustomPages([...customPages, newPage]);
    setActivePageId(newPage.id);
  };

  const handleDeletePage = (id: string) => {
    if (customPages.length <= 1) return alert("You must have at least one page.");
    setCustomPages(customPages.filter(p => p.id !== id));
    if (activePageId === id) setActivePageId(customPages[0].id);
  };

  const handleAddSection = (type: CustomSectionType) => {
    const newSec = createEmptySection(type);
    setCustomPages(customPages.map(p => p.id === activePageId ? { ...p, sections: [...p.sections, newSec] } : p));
    setEditingSection(newSec);
  };

  const handleDeleteSection = (secId: string) => {
    setCustomPages(customPages.map(p => p.id === activePageId ? { ...p, sections: p.sections.filter(s => s.id !== secId) } : p));
    if (editingSection?.id === secId) setEditingSection(null);
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

  // Derived
  const activeTheme = isCustomColor ? { ...COLOR_THEMES[0], ...customColors } : (COLOR_THEMES.find(t => t.id === selectedThemeId) || COLOR_THEMES[0]);
  const activeHeadingFont = FONT_STYLES.find(f => f.id === headingFont)?.fontFamily || "var(--font-sans)";
  const activeBodyFont = FONT_STYLES.find(f => f.id === bodyFont)?.fontFamily || "var(--font-sans)";

  const extrasPrice = selectedExtras.reduce((sum, id) => sum + (ALL_FEATURES.find(af => af.id === id)?.price || 0), 0);
  const pagesPrice = customPages.length > 3 ? (customPages.length - 3) * 30 : 0;
  const templatePrice = selectedTemplate?.price || 0;
  const totalPrice = templatePrice + extrasPrice + pagesPrice;

  const previewConfig: PreviewConfig | null = selectedTemplate ? {
    typeId: selectedTemplate.id,
    typeName: selectedTemplate.category,
    brandName: siteName || selectedTemplate.name,
    identitySlogan: siteSlogan || selectedTemplate.description,
    identityLogo: siteLogo,
    themePrimary: activeTheme.primary,
    themeSecondary: activeTheme.secondary,
    themeBg: activeTheme.bg,
    themeText: activeTheme.text,
    themeFont: activeBodyFont,
    themeHeadingFont: activeHeadingFont,
    themeBorderRadius: borderRadius,
    navType,
    extras: selectedExtras,
    customPages: customPages, // Passes deeply customized pages directly to the preview
    // Fallbacks to avoid breaking PreviewModal types
    heroText: siteName || selectedTemplate.name,
    sections: [],
  } : null;

  const handleAddToCart = () => {
    if (!selectedTemplate) return;
    addItem({
      domainName: `studio-${slugify(siteName || selectedTemplate.name)}`,
      domainTld: ".studio",
      domainPrice: 0,
      websitePackage: {
        templateId: selectedTemplate.id,
        templateName: `Studio Custom: ${siteName || selectedTemplate.name}`,
        setupPrice: totalPrice,
        config: {
          templateId: selectedTemplate.id,
          templateName: selectedTemplate.name,
          brandName: siteName || selectedTemplate.name,
          slogan: siteSlogan || selectedTemplate.description,
          logo: siteLogo,
          theme: { primary: activeTheme.primary, secondary: activeTheme.secondary, bg: activeTheme.bg },
          typography: { headings: activeHeadingFont, body: activeBodyFont },
          pages: customPages.map(p => ({ id: p.id, title: p.title, path: `/${p.id}`, sections: p.sections.map(s => ({ id: s.id, type: s.type, title: s.content.heading || s.type, content: s.content, styles: s.styles })) })),
          animationProfile: selectedExtras.includes("framer") ? "smooth" : "fluid",
        },
      },
    });
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const activePageObj = customPages.find(p => p.id === activePageId);

  return (
    <section className="relative mb-10 w-full overflow-hidden rounded-2xl border border-black/5 bg-[#FDF0E6] p-4 shadow-sm md:p-6 font-sans">
      
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between border-b border-black/5 pb-4">
        <div>
          <span className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#E85D3B]">
            Softbridge Studio {phase === "configurator" ? "// Builder" : "// Marketplace"}
          </span>
          <h2 className="text-2xl font-semibold text-[#5C2E1F] md:text-3xl tracking-tight">
            {phase === "configurator" ? siteName || "Configure Site" : "Pre-built Templates"}
          </h2>
        </div>
        {phase === "configurator" && (
          <button onClick={() => setPhase("marketplace")} className="flex items-center gap-1 text-xs font-semibold text-[#5C2E1F]/60 hover:text-[#5C2E1F] transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Templates
          </button>
        )}
      </div>

      {/* PHASE 1: MARKETPLACE */}
      {phase === "marketplace" && (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-56 shrink-0 flex flex-col gap-5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5C2E1F] mb-3 flex items-center gap-1.5"><Filter className="w-3.5 h-3.5"/> Categories</h3>
              <div className="flex flex-col gap-1.5">
                {Object.keys(categorySections).map(cat => (
                  <label key={cat} className="flex items-center gap-2 text-sm text-[#5C2E1F]/80 cursor-pointer hover:text-[#5C2E1F]">
                    <input type="checkbox" checked={filterCategory.includes(cat)} onChange={() => toggleCategory(cat)} className="rounded border-black/20 text-[#E85D3B] focus:ring-[#E85D3B]" />
                    {cat}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5C2E1F] mb-3">Difficulty</h3>
              <select value={filterDifficulty} onChange={e => setFilterDifficulty(e.target.value)} className="w-full text-sm bg-black/5 border border-black/10 rounded-lg px-2 py-1.5 text-[#5C2E1F] focus:outline-none focus:border-[#E85D3B]">
                <option value="">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-[#5C2E1F] cursor-pointer">
                <input type="checkbox" checked={filterPopular} onChange={() => setFilterPopular(!filterPopular)} className="rounded border-black/20 text-[#E85D3B] focus:ring-[#E85D3B]" />
                <Star className="w-4 h-4 text-[#E85D3B]" /> Popular Only
              </label>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map(t => (
              <div key={t.id} className="group relative flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm hover:shadow-md transition-all">
                <div className="aspect-[4/3] bg-black/5 flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-[#E85D3B]/5 to-[#5C2E1F]/5" />
                   {t.isPopular && <span className="absolute top-2 right-2 bg-[#E85D3B] text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-full z-10 shadow-sm">Popular</span>}
                   <Layout className="w-8 h-8 text-[#5C2E1F]/20 group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-[#5C2E1F]">{t.name}</h4>
                    <span className="font-mono text-sm font-bold text-[#E85D3B]">${t.price}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#5C2E1F]/50 mb-2">{t.category} • {t.difficultyLevel}</span>
                  <p className="text-xs text-[#5C2E1F]/70 line-clamp-2 mb-4 flex-1">{t.description}</p>
                  <button onClick={() => handleSelectTemplate(t)} className="w-full bg-[#E85D3B]/10 hover:bg-[#E85D3B] text-[#E85D3B] hover:text-white transition-colors py-2 rounded-lg text-xs font-semibold">
                    Configure Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PHASE 2: BUILDER */}
      {phase === "configurator" && selectedTemplate && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Settings Panel */}
          <div className="lg:col-span-5 flex flex-col h-[650px] overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm relative">
            <div className="flex overflow-x-auto border-b border-black/10 shrink-0">
              {([
                { id: "identity", label: "Identity" },
                { id: "aesthetics", label: "Aesthetics" },
                { id: "pages", label: "Site Builder" },
                { id: "features", label: "Features" }
              ] as const).map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setConfigTab(tab.id)}
                  className={`flex-1 px-3 py-3 text-xs font-semibold text-center whitespace-nowrap transition-colors ${configTab === tab.id ? "bg-[#FDF0E6] text-[#E85D3B] border-b-2 border-[#E85D3B]" : "text-[#5C2E1F]/60 hover:text-[#5C2E1F] hover:bg-black/5"}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar relative">
              {configTab === "identity" && (
                <div className="p-5 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5C2E1F] mb-1.5">Site Name</label>
                    <input type="text" value={siteName} onChange={e => setSiteName(e.target.value)} className="w-full text-sm bg-black/5 border border-black/10 rounded-lg px-3 py-2 text-[#5C2E1F] focus:outline-none focus:border-[#E85D3B]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5C2E1F] mb-1.5">Slogan / Default Hero Text</label>
                    <textarea value={siteSlogan} onChange={e => setSiteSlogan(e.target.value)} rows={3} className="w-full text-sm bg-black/5 border border-black/10 rounded-lg px-3 py-2 text-[#5C2E1F] focus:outline-none focus:border-[#E85D3B]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5C2E1F] mb-1.5">Logo URL (Optional)</label>
                    <input type="text" placeholder="https://..." value={siteLogo} onChange={e => setSiteLogo(e.target.value)} className="w-full text-sm bg-black/5 border border-black/10 rounded-lg px-3 py-2 text-[#5C2E1F] focus:outline-none focus:border-[#E85D3B]" />
                  </div>
                </div>
              )}

              {configTab === "aesthetics" && (
                <div className="p-5 space-y-6">
                  <div>
                    <label className="flex items-center justify-between text-xs font-semibold text-[#5C2E1F] mb-2">
                      <span>Color Palette</span>
                      <label className="flex items-center gap-1.5 text-[10px] text-[#5C2E1F]/60 cursor-pointer">
                        <input type="checkbox" checked={isCustomColor} onChange={() => setIsCustomColor(!isCustomColor)} className="rounded" /> Custom
                      </label>
                    </label>
                    {isCustomColor ? (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] uppercase text-[#5C2E1F]/70">Primary</span>
                          <input type="color" value={customColors.primary} onChange={e => setCustomColors(p => ({...p, primary: e.target.value}))} className="w-full h-8 rounded cursor-pointer" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] uppercase text-[#5C2E1F]/70">Background</span>
                          <input type="color" value={customColors.bg} onChange={e => setCustomColors(p => ({...p, bg: e.target.value}))} className="w-full h-8 rounded cursor-pointer" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] uppercase text-[#5C2E1F]/70">Text</span>
                          <input type="color" value={customColors.text} onChange={e => setCustomColors(p => ({...p, text: e.target.value}))} className="w-full h-8 rounded cursor-pointer" />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {COLOR_THEMES.map(theme => (
                          <button key={theme.id} onClick={() => setSelectedThemeId(theme.id)} className={`flex items-center justify-between p-2 rounded-lg border transition-all ${selectedThemeId === theme.id ? "border-[#E85D3B] bg-[#E85D3B]/5" : "border-black/10 hover:border-black/20"}`}>
                            <span className="text-[10px] font-semibold text-[#5C2E1F]">{theme.name}</span>
                            <div className="flex gap-1"><span className="w-2.5 h-2.5 rounded-full" style={{background: theme.primary}}/><span className="w-2.5 h-2.5 rounded-full" style={{background: theme.bg}}/><span className="w-2.5 h-2.5 rounded-full" style={{background: theme.text}}/></div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#5C2E1F] mb-1.5">Heading Font</label>
                      <select value={headingFont} onChange={e => setHeadingFont(e.target.value)} className="w-full text-xs bg-black/5 border border-black/10 rounded-lg px-2 py-2 text-[#5C2E1F]">
                        {FONT_STYLES.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#5C2E1F] mb-1.5">Body Font</label>
                      <select value={bodyFont} onChange={e => setBodyFont(e.target.value)} className="w-full text-xs bg-black/5 border border-black/10 rounded-lg px-2 py-2 text-[#5C2E1F]">
                        {FONT_STYLES.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="flex justify-between text-xs font-semibold text-[#5C2E1F] mb-1.5">
                      <span>Border Radius</span>
                      <span className="text-[#E85D3B]">{borderRadius}</span>
                    </label>
                    <input type="range" min="0" max="32" step="4" value={parseInt(borderRadius)} onChange={e => setBorderRadius(`${e.target.value}px`)} className="w-full accent-[#E85D3B]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5C2E1F] mb-1.5">Navigation Style</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["topbar", "sidebar", "minimal"] as const).map(type => (
                        <button key={type} onClick={() => setNavType(type)} className={`py-2 text-xs font-semibold rounded-lg border capitalize transition-colors ${navType === type ? "border-[#E85D3B] bg-[#E85D3B]/5 text-[#E85D3B]" : "border-black/10 text-[#5C2E1F]/70"}`}>
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {configTab === "pages" && (
                <div className="flex h-full">
                  {/* Pages Sidebar */}
                  <div className="w-1/3 border-r border-black/10 bg-[#f9f9f9] flex flex-col">
                    <div className="p-3 border-b border-black/10 flex items-center justify-between bg-white">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#5C2E1F]">Pages ({customPages.length})</span>
                      <button onClick={handleAddPage} className="p-1 bg-black/5 hover:bg-black/10 rounded text-[#5C2E1F]"><Plus className="w-3.5 h-3.5" /></button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
                      {customPages.map(p => (
                        <div key={p.id} className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${activePageId === p.id ? "bg-white shadow-sm border border-black/10 text-[#E85D3B]" : "text-[#5C2E1F]/70 hover:bg-black/5"}`}>
                          <span onClick={() => {setActivePageId(p.id); setEditingSection(null);}} className="text-xs font-semibold flex-1 truncate">{p.title}</span>
                          <button onClick={() => handleDeletePage(p.id)} className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Sections List */}
                  <div className="flex-1 flex flex-col bg-white relative">
                    {!editingSection ? (
                      <>
                        <div className="p-3 border-b border-black/10 flex items-center justify-between bg-white z-10 shadow-sm">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#5C2E1F] truncate">{activePageObj?.title} Sections</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-3 bg-black/5">
                          <Reorder.Group axis="y" values={activePageObj?.sections || []} onReorder={handleReorderSections} className="flex flex-col gap-2">
                            {activePageObj?.sections.map(sec => (
                              <Reorder.Item key={sec.id} value={sec} className="bg-white p-3 rounded-xl border border-black/10 shadow-sm flex items-center gap-3 cursor-grab active:cursor-grabbing group">
                                <GripVertical className="w-4 h-4 text-black/20" />
                                <div className="flex-1 min-w-0" onClick={() => setEditingSection(sec)}>
                                  <div className="text-xs font-bold text-[#5C2E1F]">{sec.type}</div>
                                  <div className="text-[10px] text-[#5C2E1F]/60 truncate">{sec.content.heading || "No heading"}</div>
                                </div>
                                <div className="flex gap-1">
                                  <button onClick={() => setEditingSection(sec)} className="p-1.5 hover:bg-black/5 rounded text-blue-500"><Edit2 className="w-3.5 h-3.5" /></button>
                                  <button onClick={() => handleDeleteSection(sec.id)} className="p-1.5 hover:bg-black/5 rounded text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                                </div>
                              </Reorder.Item>
                            ))}
                          </Reorder.Group>
                          <div className="mt-4 grid grid-cols-2 gap-2">
                            {(["Hero", "Features", "Pricing", "Testimonials", "FAQ", "Contact", "Gallery", "Blog"] as CustomSectionType[]).map(type => (
                              <button key={type} onClick={() => handleAddSection(type)} className="flex items-center gap-2 p-2 rounded-lg border border-dashed border-black/20 text-[10px] font-bold text-[#5C2E1F]/60 hover:text-[#E85D3B] hover:border-[#E85D3B] hover:bg-[#E85D3B]/5 transition-colors">
                                <Plus className="w-3 h-3" /> {type}
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      // Editing Section Slide-over
                      <div className="absolute inset-0 bg-white flex flex-col z-20">
                         <div className="p-3 border-b border-black/10 flex items-center gap-2 bg-[#f9f9f9]">
                            <button onClick={() => setEditingSection(null)} className="p-1.5 hover:bg-black/10 rounded-md"><ChevronLeft className="w-4 h-4 text-[#5C2E1F]" /></button>
                            <span className="text-xs font-bold text-[#5C2E1F]">Edit {editingSection.type}</span>
                         </div>
                         <div className="flex-1 overflow-y-auto p-4 space-y-5">
                            {/* Content */}
                            <div>
                              <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#5C2E1F]/50 mb-3">Content</h4>
                              <div className="space-y-3">
                                <div>
                                  <label className="text-[10px] font-semibold text-[#5C2E1F] block mb-1">Heading</label>
                                  <input type="text" value={editingSection.content.heading || ""} onChange={e => updateEditingSection({ content: { ...editingSection.content, heading: e.target.value } })} className="w-full text-xs bg-black/5 border border-black/10 rounded-md px-2 py-1.5" />
                                </div>
                                <div>
                                  <label className="text-[10px] font-semibold text-[#5C2E1F] block mb-1">Subheading</label>
                                  <input type="text" value={editingSection.content.subheading || ""} onChange={e => updateEditingSection({ content: { ...editingSection.content, subheading: e.target.value } })} className="w-full text-xs bg-black/5 border border-black/10 rounded-md px-2 py-1.5" />
                                </div>
                                <div>
                                  <label className="text-[10px] font-semibold text-[#5C2E1F] block mb-1">Description</label>
                                  <textarea value={editingSection.content.description || ""} onChange={e => updateEditingSection({ content: { ...editingSection.content, description: e.target.value } })} rows={3} className="w-full text-xs bg-black/5 border border-black/10 rounded-md px-2 py-1.5" />
                                </div>
                                <div>
                                  <label className="text-[10px] font-semibold text-[#5C2E1F] block mb-1">Button Text</label>
                                  <input type="text" value={editingSection.content.buttonText || ""} onChange={e => updateEditingSection({ content: { ...editingSection.content, buttonText: e.target.value } })} className="w-full text-xs bg-black/5 border border-black/10 rounded-md px-2 py-1.5" />
                                </div>
                              </div>
                            </div>
                            {/* Styles */}
                            <div>
                              <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#5C2E1F]/50 mb-3">Styles</h4>
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <label className="text-[10px] font-semibold text-[#5C2E1F] block mb-1">Background (Hex)</label>
                                    <input type="text" placeholder="Default" value={editingSection.styles.backgroundColor || ""} onChange={e => updateEditingSection({ styles: { ...editingSection.styles, backgroundColor: e.target.value } })} className="w-full text-xs bg-black/5 border border-black/10 rounded-md px-2 py-1.5" />
                                  </div>
                                  <div>
                                    <label className="text-[10px] font-semibold text-[#5C2E1F] block mb-1">Text Color (Hex)</label>
                                    <input type="text" placeholder="Default" value={editingSection.styles.textColor || ""} onChange={e => updateEditingSection({ styles: { ...editingSection.styles, textColor: e.target.value } })} className="w-full text-xs bg-black/5 border border-black/10 rounded-md px-2 py-1.5" />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-[10px] font-semibold text-[#5C2E1F] block mb-1">Alignment</label>
                                  <div className="flex bg-black/5 p-1 rounded-md">
                                    {(["left", "center", "right"] as const).map(a => (
                                      <button key={a} onClick={() => updateEditingSection({ styles: { ...editingSection.styles, alignment: a } })} className={`flex-1 py-1 text-[10px] font-semibold rounded capitalize ${editingSection.styles.alignment === a ? "bg-white shadow text-[#E85D3B]" : "text-[#5C2E1F]/60"}`}>
                                        {a}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <label className="text-[10px] font-semibold text-[#5C2E1F] block mb-1">Padding</label>
                                  <select value={editingSection.styles.padding || "py-16"} onChange={e => updateEditingSection({ styles: { ...editingSection.styles, padding: e.target.value } })} className="w-full text-xs bg-black/5 border border-black/10 rounded-md px-2 py-1.5 text-[#5C2E1F]">
                                    <option value="py-8">Small (py-8)</option>
                                    <option value="py-16">Medium (py-16)</option>
                                    <option value="py-24">Large (py-24)</option>
                                    <option value="py-32">Huge (py-32)</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                         </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {configTab === "features" && (
                <div className="p-5 space-y-2">
                  <p className="text-[10px] text-[#5C2E1F]/60 mb-3">Add production-ready modules to your site.</p>
                  {ALL_FEATURES.map(f => {
                    const isSelected = selectedExtras.includes(f.id);
                    return (
                      <label key={f.id} className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${isSelected ? "border-[#E85D3B] bg-[#E85D3B]/5" : "border-black/10 hover:bg-black/5"}`}>
                        <div className="flex items-center gap-3">
                          <input type="checkbox" checked={isSelected} onChange={() => toggleExtra(f.id)} className="rounded text-[#E85D3B] focus:ring-[#E85D3B] w-4 h-4" />
                          <span className="text-sm font-semibold text-[#5C2E1F]">{f.name}</span>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#E85D3B]">
                          +${f.price}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Price & Cart Footer */}
            <div className="p-4 bg-[#F8E4D3] border-t border-black/10 shrink-0 z-30">
               <div className="flex justify-between items-center mb-3">
                 <span className="text-sm font-semibold text-[#5C2E1F]">Total Estimate</span>
                 <span className="text-xl font-bold font-mono text-[#E85D3B]">${totalPrice}</span>
               </div>
               <button onClick={handleAddToCart} className="w-full relative py-3 bg-[#E85D3B] hover:bg-[#D94F2E] text-white rounded-xl font-bold text-sm shadow-md transition-all overflow-hidden flex justify-center items-center gap-2">
                  {isAddedToCart ? (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
                      <Check className="w-4 h-4" /> Added to Setup
                    </motion.div>
                  ) : (
                    <>Add to Setup <ArrowRight className="w-4 h-4" /></>
                  )}
               </button>
            </div>
          </div>

          {/* Mini Preview Panel */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="flex items-center justify-between bg-white px-4 py-2 rounded-xl border border-black/10 shadow-sm">
               <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5C2E1F]/70">Live Preview: {activePageObj?.title}</span>
               <button onClick={() => setShowFullPreview(true)} className="text-xs font-bold bg-[#E85D3B]/10 text-[#E85D3B] px-3 py-1.5 rounded-lg hover:bg-[#E85D3B]/20 transition-colors flex items-center gap-1.5">
                 <Monitor className="w-3.5 h-3.5" /> Full Preview
               </button>
            </div>
            <div className="flex-1 bg-black/5 rounded-xl border border-black/10 overflow-hidden relative shadow-inner p-2 md:p-4 min-h-[500px]">
               {previewConfig && (
                 <div className="w-[120%] h-[120%] -ml-[10%] -mt-[10%] rounded-lg overflow-hidden border border-black/10 pointer-events-none transform scale-[0.833] origin-center bg-white shadow-xl">
                   <FullSitePreview config={{ ...previewConfig, customPages: [activePageObj || customPages[0]] }} viewMode="desktop" />
                 </div>
               )}
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Preview Modal */}
      {previewConfig && (
        <PreviewModal isOpen={showFullPreview} onClose={() => setShowFullPreview(false)} config={previewConfig} />
      )}
    </section>
  );
}
