"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Layers,
  Palette,
  Settings,
  Check,
  ArrowRight,
  ArrowLeft,
  Cpu,
  Bookmark,
  BarChart2,
  Box,
  Moon,
  ShoppingBag,
  Layout,
  Briefcase,
  LayoutDashboard,
  Mail,
  Table2,
  Type,
  Video,
  Search,
  Filter,
  Star,
  ChevronLeft
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import type { ConfiguredPage, PageSection } from "@/store/useConfiguratorStore";
import PreviewModal, { PreviewConfig, PreviewPage, FullSitePreview } from "./PreviewModal";
import { TEMPLATES, Template } from "@/data/templates";

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
  "SaaS": ["Features", "Integrations", "Pricing", "Customer Stories"],
  "Portfolio": ["Selected Work", "Case Studies", "Services", "Contact"],
  "E-Commerce": ["Collections", "Best Sellers", "Reviews", "Checkout"],
  "Blog": ["Featured Articles", "Categories", "Author Notes", "Newsletter"],
  "Agency": ["Services", "Process", "Results", "Book a Call"],
  "Landing Page": ["Benefits", "Social Proof", "FAQ", "Signup"],
  "Dashboard": ["Metrics", "Reports", "Activity", "Team Access"],
  "Corporate": ["About Us", "Services", "Leadership", "Contact"],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function buildPageSections(pageTitle: string, template: Template, extras: string[]) {
  const tSections = categorySections[template.category] || ["Features", "Details"];
  const baseSections: Record<string, string[]> = {
    Home: ["Hero", ...tSections.slice(0, 3)],
    About: ["Brand Story", "Values", "Team"],
    Features: tSections.slice(0, 4),
    Pricing: ["Plans", "Comparison", "FAQ"],
    Blog: ["Featured Articles", "Latest Posts", "Newsletter"],
    Dashboard: ["Metrics", "Reports", "Activity"],
    Contact: ["Contact Form", "Support", "Location"],
  };

  const sections = baseSections[pageTitle] || [pageTitle, "Details", "CTA"];
  const withExtras = [...sections];

  if (pageTitle === "Home" && extras.includes("analytics")) withExtras.push("Live Metrics");
  if (pageTitle === "Home" && extras.includes("3d")) withExtras.push("3D Showcase");
  if (pageTitle !== "Blog" && extras.includes("blog")) withExtras.push("Insights");
  if (pageTitle !== "Pricing" && extras.includes("pricing")) withExtras.push("Pricing Snapshot");

  return Array.from(new Set(withExtras));
}

function buildPreviewPages(template: Template, pagesCount: number, extras: string[]): PreviewPage[] {
  const pageTitles = ["Home"];
  if (pagesCount >= 3) pageTitles.push("About", "Contact");
  if (pagesCount >= 5) pageTitles.push("Features", "Pricing");
  if (pagesCount > 5) pageTitles.push("Blog", "Dashboard");

  return pageTitles.map((pageTitle) => ({
    id: slugify(pageTitle),
    title: pageTitle,
    description: pageTitle === "Home" ? `Premium ${template.category} experience.` : `${pageTitle} page for ${template.name}.`,
    sections: buildPageSections(pageTitle, template, extras),
  }));
}

function sectionFor(pageSlug: string, sectionName: string, template: Template): PageSection {
  const sectionId = `${pageSlug}-${slugify(sectionName)}`;
  const lower = sectionName.toLowerCase();
  if (lower.includes("hero")) return { id: sectionId, type: "hero", title: sectionName, content: { heading: template.name, subheading: template.description, buttonText: "Start Project" } };
  if (lower.includes("contact") || lower.includes("support")) return { id: sectionId, type: "contact", title: sectionName, content: { heading: "Start the conversation", description: "Capture leads.", buttonText: "Send Request" } };
  if (lower.includes("article") || lower.includes("blog") || lower.includes("work")) return { id: sectionId, type: "gallery", title: sectionName, content: { heading: sectionName, items: ["Story", "Proof", "Deep Dive"] } };
  return { id: sectionId, type: "features", title: sectionName, content: { heading: sectionName, subheading: "Generated section.", items: ["Setup", "Responsive", "UI polish"] } };
}

function buildConfiguredPages(template: Template, pagesCount: number, extras: string[]): ConfiguredPage[] {
  return buildPreviewPages(template, pagesCount, extras).map((page, index) => ({
    id: page.id,
    title: page.title,
    path: index === 0 ? "/" : `/${page.id}`,
    sections: page.sections.slice(0, 4).map((sectionName) => sectionFor(page.id, sectionName, template)),
  }));
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
  const [configTab, setConfigTab] = useState<"identity" | "aesthetics" | "layout" | "features">("identity");
  
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
  // -- Layout & Structure
  const [pagesCount, setPagesCount] = useState<number>(3);
  const [navType, setNavType] = useState<"topbar" | "sidebar" | "minimal">("topbar");
  const [heroStyle, setHeroStyle] = useState<"modern" | "centered" | "split">("modern");
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
    setPagesCount(t.pages);
    setPhase("configurator");
  };

  const toggleCategory = (cat: string) => {
    setFilterCategory(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const toggleExtra = (id: string) => {
    setSelectedExtras(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  // Derived
  const activeTheme = isCustomColor ? { ...COLOR_THEMES[0], ...customColors } : (COLOR_THEMES.find(t => t.id === selectedThemeId) || COLOR_THEMES[0]);
  const activeHeadingFont = FONT_STYLES.find(f => f.id === headingFont)?.fontFamily || "var(--font-sans)";
  const activeBodyFont = FONT_STYLES.find(f => f.id === bodyFont)?.fontFamily || "var(--font-sans)";

  const extrasPrice = selectedExtras.reduce((sum, id) => {
    const f = ALL_FEATURES.find(af => af.id === id);
    return sum + (f ? f.price : 0);
  }, 0);
  const pagesPrice = pagesCount > 3 ? (pagesCount - 3) * 30 : 0; // base 3 pages included, extra pages 30$ each
  const templatePrice = selectedTemplate?.price || 0;
  const totalPrice = templatePrice + extrasPrice + pagesPrice;

  const previewConfig: PreviewConfig | null = selectedTemplate ? {
    typeId: selectedTemplate.id,
    typeName: selectedTemplate.category,
    brandName: siteName || selectedTemplate.name,
    heroText: siteName || selectedTemplate.name,
    identitySlogan: siteSlogan || selectedTemplate.description,
    identityLogo: siteLogo,
    sections: categorySections[selectedTemplate.category] || ["Hero", "Features"],
    pages: buildPreviewPages(selectedTemplate, pagesCount, selectedExtras),
    pageCountLabel: `${pagesCount} Pages`,
    themePrimary: activeTheme.primary,
    themeSecondary: activeTheme.secondary,
    themeBg: activeTheme.bg,
    themeText: activeTheme.text,
    themeFont: activeBodyFont,
    themeHeadingFont: activeHeadingFont,
    themeBorderRadius: borderRadius,
    layout: heroStyle === "centered" ? "minimal" : "modern", // map to old layout system for safety
    navType,
    heroStyle,
    extras: selectedExtras,
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
          pages: buildConfiguredPages(selectedTemplate, pagesCount, selectedExtras),
          animationProfile: selectedExtras.includes("framer") ? "smooth" : "fluid",
        },
      },
    });
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  return (
    <section className="relative mb-10 w-full overflow-hidden rounded-2xl border border-black/5 bg-[#FDF0E6] p-4 shadow-sm md:p-6 font-sans">
      
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between border-b border-black/5 pb-4">
        <div>
          <span className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#E85D3B]">
            Softbridge Studio {phase === "configurator" ? "// Configurator" : "// Marketplace"}
          </span>
          <h2 className="text-2xl font-semibold text-[#5C2E1F] md:text-3xl tracking-tight">
            {phase === "configurator" ? siteName || "Configure Site" : "Pre-built Templates"}
          </h2>
        </div>
        {phase === "configurator" && (
          <button
            onClick={() => setPhase("marketplace")}
            className="flex items-center gap-1 text-xs font-semibold text-[#5C2E1F]/60 hover:text-[#5C2E1F] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Templates
          </button>
        )}
      </div>

      {/* PHASE 1: MARKETPLACE */}
      {phase === "marketplace" && (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
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
              <select 
                value={filterDifficulty} 
                onChange={e => setFilterDifficulty(e.target.value)}
                className="w-full text-sm bg-black/5 border border-black/10 rounded-lg px-2 py-1.5 text-[#5C2E1F] focus:outline-none focus:border-[#E85D3B]"
              >
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

          {/* Templates Grid */}
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
                  <button 
                    onClick={() => handleSelectTemplate(t)}
                    className="w-full bg-[#E85D3B]/10 hover:bg-[#E85D3B] text-[#E85D3B] hover:text-white transition-colors py-2 rounded-lg text-xs font-semibold"
                  >
                    Configure Template
                  </button>
                </div>
              </div>
            ))}
            {filteredTemplates.length === 0 && (
              <div className="col-span-full py-20 text-center text-[#5C2E1F]/50 text-sm">
                No templates found matching your filters.
              </div>
            )}
          </div>
        </div>
      )}

      {/* PHASE 2: CONFIGURATOR */}
      {phase === "configurator" && selectedTemplate && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Settings Panel */}
          <div className="lg:col-span-5 flex flex-col h-[600px] overflow-hidden rounded-xl border border-black/10 bg-white">
            <div className="flex overflow-x-auto border-b border-black/10 shrink-0">
              {([
                { id: "identity", label: "Identity" },
                { id: "aesthetics", label: "Aesthetics" },
                { id: "layout", label: "Structure" },
                { id: "features", label: "Features" }
              ] as const).map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setConfigTab(tab.id)}
                  className={`flex-1 px-4 py-3 text-xs font-semibold text-center whitespace-nowrap transition-colors ${configTab === tab.id ? "bg-[#FDF0E6] text-[#E85D3B] border-b-2 border-[#E85D3B]" : "text-[#5C2E1F]/60 hover:text-[#5C2E1F] hover:bg-black/5"}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
              {configTab === "identity" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5C2E1F] mb-1.5">Site Name</label>
                    <input type="text" value={siteName} onChange={e => setSiteName(e.target.value)} className="w-full text-sm bg-black/5 border border-black/10 rounded-lg px-3 py-2 text-[#5C2E1F] focus:outline-none focus:border-[#E85D3B]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5C2E1F] mb-1.5">Slogan / Hero Text</label>
                    <textarea value={siteSlogan} onChange={e => setSiteSlogan(e.target.value)} rows={3} className="w-full text-sm bg-black/5 border border-black/10 rounded-lg px-3 py-2 text-[#5C2E1F] focus:outline-none focus:border-[#E85D3B]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5C2E1F] mb-1.5">Logo URL (Optional)</label>
                    <input type="text" placeholder="https://..." value={siteLogo} onChange={e => setSiteLogo(e.target.value)} className="w-full text-sm bg-black/5 border border-black/10 rounded-lg px-3 py-2 text-[#5C2E1F] focus:outline-none focus:border-[#E85D3B]" />
                  </div>
                </div>
              )}

              {configTab === "aesthetics" && (
                <div className="space-y-6">
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
                </div>
              )}

              {configTab === "layout" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-semibold text-[#5C2E1F] mb-2">Pages Configuration</label>
                    <div className="flex bg-black/5 p-1 rounded-lg">
                      {[1, 3, 5, 8].map(num => (
                        <button key={num} onClick={() => setPagesCount(num)} className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${pagesCount === num ? "bg-white shadow-sm text-[#E85D3B]" : "text-[#5C2E1F]/60"}`}>
                          {num} {num === 1 ? "Page" : "Pages"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5C2E1F] mb-2">Navigation Style</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["topbar", "sidebar", "minimal"] as const).map(type => (
                        <button key={type} onClick={() => setNavType(type)} className={`py-2 text-xs font-semibold rounded-lg border capitalize transition-colors ${navType === type ? "border-[#E85D3B] bg-[#E85D3B]/5 text-[#E85D3B]" : "border-black/10 text-[#5C2E1F]/70"}`}>
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5C2E1F] mb-2">Hero Style</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["modern", "centered", "split"] as const).map(style => (
                        <button key={style} onClick={() => setHeroStyle(style)} className={`py-2 text-xs font-semibold rounded-lg border capitalize transition-colors ${heroStyle === style ? "border-[#E85D3B] bg-[#E85D3B]/5 text-[#E85D3B]" : "border-black/10 text-[#5C2E1F]/70"}`}>
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {configTab === "features" && (
                <div className="space-y-2">
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
            <div className="p-4 bg-[#F8E4D3] border-t border-black/10 shrink-0">
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
            <div className="flex items-center justify-between bg-white px-4 py-2 rounded-xl border border-black/10">
               <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5C2E1F]/70">Live Mini Preview</span>
               <button onClick={() => setShowFullPreview(true)} className="text-xs font-bold bg-[#E85D3B]/10 text-[#E85D3B] px-3 py-1.5 rounded-lg hover:bg-[#E85D3B]/20 transition-colors flex items-center gap-1.5">
                 <Monitor className="w-3.5 h-3.5" /> Open Full Preview
               </button>
            </div>
            <div className="flex-1 bg-black/5 rounded-xl border border-black/10 overflow-hidden relative shadow-inner p-2 md:p-4 min-h-[400px]">
               {previewConfig && (
                 <div className="w-[120%] h-[120%] -ml-[10%] -mt-[10%] rounded-lg overflow-hidden border border-black/10 pointer-events-none transform scale-[0.833] origin-center hover:scale-90 transition-all duration-500 bg-white">
                   <FullSitePreview config={previewConfig} viewMode="desktop" />
                 </div>
               )}
               {/* Note: The preview above is a scaled down static view. Full preview opens the modal */}
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
