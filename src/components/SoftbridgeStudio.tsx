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
  Briefcase,
  LayoutDashboard,
  Mail,
  Table2,
  Type,
  Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import type { ConfiguredPage, PageSection } from "@/store/useConfiguratorStore";
import { CyberButton } from "./ui/CyberButton";
import PreviewModal, { PreviewConfig, PreviewPage } from "./PreviewModal";

type SiteType = {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: LucideIcon;
  hero: string;
  sections: string[];
};

type ColorTheme = {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  bg: string;
  text: string;
  accent: string;
};

type FontStyle = {
  id: string;
  name: string;
  fontFamily: string;
  description: string;
};

type LayoutStyle = {
  id: string;
  name: string;
  description: string;
};

type PagePack = {
  id: string;
  name: string;
  price: number;
  description: string;
  pages: string[];
};

type ExtraFeature = {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: LucideIcon;
};

const SITE_TYPES: SiteType[] = [
  {
    id: "saas",
    name: "SaaS Website",
    price: 199,
    icon: Cpu,
    description: "Conversion-focused product site with feature, pricing, and trust modules.",
    hero: "Launch a SaaS experience that feels ready for scale",
    sections: ["Features", "Integrations", "Pricing", "Customer Stories"],
  },
  {
    id: "portfolio",
    name: "Portfolio",
    price: 99,
    icon: Monitor,
    description: "Premium personal showcase with case studies, services, and contact flow.",
    hero: "Show your work with a calm, premium portfolio",
    sections: ["Selected Work", "Case Studies", "Services", "Contact"],
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    price: 279,
    icon: ShoppingBag,
    description: "Catalog, product highlights, reviews, and checkout-ready structure.",
    hero: "Build a store that makes products easy to trust",
    sections: ["Collections", "Best Sellers", "Reviews", "Checkout"],
  },
  {
    id: "blog",
    name: "Blog",
    price: 89,
    icon: Bookmark,
    description: "Editorial layout with featured posts, categories, and newsletter capture.",
    hero: "Publish sharp ideas inside a refined reading system",
    sections: ["Featured Articles", "Categories", "Author Notes", "Newsletter"],
  },
  {
    id: "agency",
    name: "Agency",
    price: 149,
    icon: Briefcase,
    description: "Service-led agency site with proof, process, and lead generation.",
    hero: "Turn your agency offer into a polished sales system",
    sections: ["Services", "Process", "Results", "Book a Call"],
  },
  {
    id: "landing",
    name: "Landing Page",
    price: 69,
    icon: Layout,
    description: "Lean campaign page for launches, waitlists, and product validation.",
    hero: "Validate the offer with a focused landing page",
    sections: ["Benefits", "Social Proof", "FAQ", "Signup"],
  },
  {
    id: "dashboard",
    name: "Dashboard",
    price: 249,
    icon: LayoutDashboard,
    description: "Operational UI with metrics, tables, activity, and admin surfaces.",
    hero: "A clear command center for daily operations",
    sections: ["Metrics", "Reports", "Activity", "Team Access"],
  },
];

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

const LAYOUT_STYLES: LayoutStyle[] = [
  { id: "modern", name: "Modern Grid", description: "Compact cards, clear hierarchy, and balanced landing sections." },
  { id: "minimal", name: "Minimal Premium", description: "Thin borders, quiet typography, and restrained section rhythm." },
  { id: "bold", name: "Bold Editorial", description: "Strong headings, narrative blocks, and content-first layouts." },
  { id: "clean", name: "Clean & Soft", description: "Soft radii, minimal lines, and airy padding for a friendly feel." },
];

const PAGE_PACKS: PagePack[] = [
  { id: "one", name: "1 Page", price: 0, description: "Home page only for campaigns and quick launches.", pages: ["Home"] },
  { id: "three", name: "3 Pages", price: 80, description: "Home, About, and Contact for a lean business site.", pages: ["Home", "About", "Contact"] },
  { id: "five", name: "5 Pages", price: 150, description: "Core marketing sitemap with features and pricing.", pages: ["Home", "About", "Features", "Pricing", "Contact"] },
  { id: "full", name: "Full Site", price: 220, description: "Complete multi-page build with content, proof, and support pages.", pages: ["Home", "About", "Features", "Pricing", "Blog", "Dashboard", "Contact"] },
];

const EXTRA_FEATURES: ExtraFeature[] = [
  { id: "webgl", name: "WebGL", price: 40, icon: Monitor, description: "Advanced WebGL shaders and canvas rendering." },
  { id: "framer", name: "Framer Motion Animations", price: 25, icon: Video, description: "Smooth spring-based page transitions and micro-interactions." },
  { id: "darkmode", name: "Dark Mode", price: 20, icon: Moon, description: "Theme variables and polished dark surfaces." },
  { id: "analytics", name: "Analytics", price: 15, icon: BarChart2, description: "Tracking events, conversion goals, and reporting hooks." },
  { id: "contact", name: "Contact Form", price: 25, icon: Mail, description: "Validated lead form with success and error states." },
  { id: "blog", name: "Blog Section", price: 45, icon: Bookmark, description: "Post listing, article detail, and newsletter capture." },
  { id: "pricing", name: "Pricing Table", price: 30, icon: Table2, description: "Plan cards, comparison rows, and FAQ area." },
  { id: "3d", name: "3D Elements", price: 35, icon: Box, description: "Interactive 3D hero or product detail scene." },
];

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function buildPageSections(pageTitle: string, typeObj: SiteType, extras: string[]) {
  const baseSections: Record<string, string[]> = {
    Home: ["Hero", ...typeObj.sections.slice(0, 3)],
    About: ["Brand Story", "Values", "Team"],
    Features: typeObj.sections.slice(0, 4),
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

function buildPreviewPages(typeObj: SiteType, pagePack: PagePack, extras: string[]): PreviewPage[] {
  return pagePack.pages.map((pageTitle) => ({
    id: slugify(pageTitle),
    title: pageTitle,
    description:
      pageTitle === "Home"
        ? typeObj.hero
        : `${pageTitle} page tailored for the ${typeObj.name.toLowerCase()} build.`,
    sections: buildPageSections(pageTitle, typeObj, extras),
  }));
}

function sectionFor(pageSlug: string, sectionName: string, typeObj: SiteType): PageSection {
  const sectionId = `${pageSlug}-${slugify(sectionName)}`;
  const lower = sectionName.toLowerCase();

  if (lower.includes("hero")) {
    return {
      id: sectionId,
      type: "hero",
      title: sectionName,
      content: {
        heading: typeObj.hero,
        subheading: `A polished ${typeObj.name.toLowerCase()} experience generated by Softbridge Studio.`,
        buttonText: "Start Project",
      },
    };
  }

  if (lower.includes("contact") || lower.includes("support")) {
    return {
      id: sectionId,
      type: "contact",
      title: sectionName,
      content: {
        heading: "Start the conversation",
        description: "Capture qualified leads with a clean, responsive contact flow.",
        buttonText: "Send Request",
      },
    };
  }

  if (lower.includes("article") || lower.includes("blog") || lower.includes("post") || lower.includes("work") || lower.includes("collection")) {
    return {
      id: sectionId,
      type: "gallery",
      title: sectionName,
      content: {
        heading: sectionName,
        items: ["Launch Story", "Customer Proof", "Product Deep Dive"],
      },
    };
  }

  return {
    id: sectionId,
    type: "features",
    title: sectionName,
    content: {
      heading: sectionName,
      subheading: "A compact, production-ready section generated from your configuration.",
      items: ["Fast setup", "Responsive blocks", "Premium UI polish"],
    },
  };
}

function buildConfiguredPages(typeObj: SiteType, pagePack: PagePack, extras: string[]): ConfiguredPage[] {
  return buildPreviewPages(typeObj, pagePack, extras).map((page, index) => ({
    id: page.id,
    title: page.title,
    path: index === 0 ? "/" : `/${page.id}`,
    sections: page.sections.slice(0, 4).map((sectionName) => sectionFor(page.id, sectionName, typeObj)),
  }));
}

function LivePreview({
  typeObj,
  themeObj,
  layout,
  extras,
  pages,
}: {
  typeObj: SiteType;
  themeObj: ColorTheme;
  layout: string;
  extras: string[];
  pages: PreviewPage[];
}) {
  const [activePageId, setActivePageId] = useState(pages[0]?.id || "home");
  const activePage = pages.find((page) => page.id === activePageId) || pages[0];
  const hasDark = extras.includes("darkmode");
  const hasAnalytics = extras.includes("analytics");
  const has3D = extras.includes("3d");

  const bg = hasDark ? "#12100F" : themeObj.bg;
  const text = hasDark ? "#F8EFE7" : themeObj.text;
  const primary = themeObj.primary;
  const border = `${primary}22`;
  const visibleSections = activePage?.sections || typeObj.sections;

  const headingClass =
    layout === "editorial"
      ? "font-black text-lg uppercase"
      : layout === "minimal"
        ? "font-medium text-sm uppercase"
        : layout === "dashboard"
          ? "font-bold text-sm"
          : "font-bold text-base";
  const cardRadius = layout === "minimal" ? "6px" : layout === "editorial" ? "4px" : "10px";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${typeObj.id}-${themeObj.id}-${layout}-${extras.join("-")}-${activePage?.id}`}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex h-full w-full flex-col"
        style={{ backgroundColor: bg, color: text, fontFamily: "var(--font-sans)" }}
      >
        <div
          className="flex items-center justify-between gap-3 border-b px-3 py-2"
          style={{ borderColor: border, backgroundColor: `${bg}EE` }}
        >
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: primary }} />
            <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: text }}>
              Softbridge
            </span>
          </div>
          <div className="hidden min-w-0 flex-1 items-center justify-center gap-1.5 sm:flex">
            {pages.slice(0, 5).map((page) => (
              <button
                key={page.id}
                onClick={() => setActivePageId(page.id)}
                className="rounded px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider transition-opacity"
                style={{
                  color: activePage?.id === page.id ? primary : text,
                  backgroundColor: activePage?.id === page.id ? `${primary}14` : "transparent",
                  opacity: activePage?.id === page.id ? 1 : 0.6,
                }}
              >
                {page.title}
              </button>
            ))}
          </div>
          <div
            className="rounded px-2 py-0.5 text-[7px] font-black uppercase tracking-wider text-white"
            style={{ backgroundColor: primary, borderRadius: cardRadius }}
          >
            Start
          </div>
        </div>

        <div
          className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-5 py-4 text-center"
          style={{ background: `linear-gradient(160deg, ${primary}12 0%, ${bg} 62%)` }}
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.03 }}
          >
            <div
              className="mb-2 inline-block rounded-full px-2 py-0.5 text-[7px] font-mono uppercase tracking-widest"
              style={{ color: primary, backgroundColor: `${primary}15`, border: `1px solid ${primary}30` }}
            >
              {activePage?.title || "Home"} / {typeObj.name}
            </div>
            <div className={`my-1 leading-tight ${headingClass}`} style={{ color: text }}>
              {activePage?.title === "Home" ? typeObj.hero : `${activePage?.title} built for ${typeObj.name}`}
            </div>
            <p className="mx-auto mt-1 max-w-[190px] text-[7px] leading-relaxed opacity-65" style={{ color: text }}>
              Realistic multi-page structure with navigation, sections, and selected Studio features.
            </p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <div
                className="px-3 py-1 text-[7px] font-black uppercase tracking-wider text-white"
                style={{ backgroundColor: primary, borderRadius: cardRadius }}
              >
                Primary CTA
              </div>
              <div
                className="px-3 py-1 text-[7px] font-bold uppercase tracking-wider"
                style={{ color: primary, border: `1px solid ${primary}40`, borderRadius: cardRadius }}
              >
                Explore
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t px-3 py-2.5" style={{ borderColor: border, backgroundColor: `${primary}06` }}>
          <div
            className="grid gap-1.5"
            style={{ gridTemplateColumns: `repeat(${Math.min(visibleSections.length, layout === "minimal" ? 2 : 3)}, 1fr)` }}
          >
            {visibleSections.slice(0, layout === "minimal" ? 2 : 3).map((section) => (
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

          {extras.length > 0 && (
            <div className="mt-2 flex flex-wrap justify-center gap-1">
              {[
                hasAnalytics && "Analytics",
                has3D && "3D",
                hasDark && "Dark Mode",
                extras.includes("contact") && "Contact",
                extras.includes("pricing") && "Pricing",
              ]
                .filter(Boolean)
                .map((label) => (
                  <span
                    key={label as string}
                    className="rounded px-1.5 py-0.5 text-[5px] font-mono uppercase"
                    style={{ color: primary, backgroundColor: `${primary}15`, border: `1px solid ${primary}25` }}
                  >
                    {label}
                  </span>
                ))}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function SoftbridgeStudio() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedType, setSelectedType] = useState("saas");
  const [selectedTheme, setSelectedTheme] = useState("clay");
  const [selectedFont, setSelectedFont] = useState("inter");
  const [selectedLayout, setSelectedLayout] = useState("modern");
  const [selectedPagePack, setSelectedPagePack] = useState("five");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [showFullPreview, setShowFullPreview] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const currentThemeObj = COLOR_THEMES.find((theme) => theme.id === selectedTheme) || COLOR_THEMES[0];
  const currentFontObj = FONT_STYLES.find((font) => font.id === selectedFont) || FONT_STYLES[0];
  const currentTypeObj = SITE_TYPES.find((type) => type.id === selectedType) || SITE_TYPES[0];
  const currentPagePack = PAGE_PACKS.find((pack) => pack.id === selectedPagePack) || PAGE_PACKS[0];
  const currentLayoutObj = LAYOUT_STYLES.find((style) => style.id === selectedLayout) || LAYOUT_STYLES[0];
  const previewPages = buildPreviewPages(currentTypeObj, currentPagePack, selectedExtras);

  const basePrice = currentTypeObj.price + currentPagePack.price;
  const extrasPrice = selectedExtras.reduce(
    (sum, id) => sum + (EXTRA_FEATURES.find((feature) => feature.id === id)?.price || 0),
    0
  );
  const totalPrice = basePrice + extrasPrice;

  const previewConfig: PreviewConfig = {
    typeId: currentTypeObj.id,
    typeName: currentTypeObj.name,
    brandName: "Softbridge Custom Web",
    heroText: currentTypeObj.hero,
    sections: currentTypeObj.sections,
    pages: previewPages,
    pageCountLabel: currentPagePack.name,
    themePrimary: currentThemeObj.primary,
    themeSecondary: currentThemeObj.secondary,
    themeBg: currentThemeObj.bg,
    themeText: currentThemeObj.text,
    themeFont: currentFontObj.fontFamily,
    layout: selectedLayout,
    extras: selectedExtras,
  };

  const handleToggleExtra = (extraId: string) =>
    setSelectedExtras((prev) => (prev.includes(extraId) ? prev.filter((id) => id !== extraId) : [...prev, extraId]));

  const handleAddToCart = () => {
    addItem({
      domainName: `custom-${selectedType}-template`,
      domainTld: ".studio",
      domainPrice: 0,
      websitePackage: {
        templateId: `studio-custom-${Date.now()}`,
        templateName: `Studio Custom: ${currentTypeObj.name} (${currentPagePack.name})`,
        setupPrice: totalPrice,
        config: {
          templateId: selectedType,
          templateName: currentTypeObj.name,
          brandName: "Softbridge Custom Web",
          slogan: `${currentPagePack.name} ${currentTypeObj.name.toLowerCase()} assembled in Softbridge Studio`,
          logo: "",
          theme: { primary: currentThemeObj.primary, secondary: currentThemeObj.secondary, bg: currentThemeObj.bg },
          typography: { headings: currentFontObj.name, body: currentFontObj.name },
          pages: buildConfiguredPages(currentTypeObj, currentPagePack, selectedExtras),
          animationProfile: "smooth",
        },
      },
    });
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const stepTitles = [
    { name: "Site Type", desc: "Choose the project category and base structure", icon: Layout },
    { name: "Theme", desc: "Pick a refined color system", icon: Palette },
    { name: "Typography", desc: "Select a core font family", icon: Type },
    { name: "Layout", desc: "Set spacing, rhythm, and presentation style", icon: Layers },
    { name: "Pages", desc: "Generate a one-page or full multi-page site", icon: Monitor },
    { name: "Features", desc: "Add production-ready modules", icon: Settings },
  ];

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, stepTitles.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <section className="relative mb-10 w-full overflow-hidden rounded-2xl border border-black/5 bg-abyss-panel/30 p-3 shadow-sm md:p-5">
      <div className="mb-4 border-b border-black/5 pb-3">
        <span className="mb-1.5 block font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-cosmic-teal">
          SOFTBRIDGE // ENGINE STUDIO
        </span>
        <h2 className="font-display text-2xl font-semibold text-star-white md:text-3xl">
          SOFTBRIDGE STUDIO
        </h2>
        <p className="mt-1.5 max-w-xl text-xs font-normal leading-relaxed text-muted-steel">
          Configure a compact, premium site system with live multi-page preview and production-ready options.
        </p>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12">
        <div className="flex min-h-[430px] flex-col justify-between lg:col-span-6">
          <div className="mb-3 flex items-center justify-between gap-1 overflow-x-auto font-mono text-[9px] uppercase tracking-wider text-muted-steel">
            {stepTitles.map((step, idx) => {
              const Icon = step.icon;
              return (
                <button
                  key={step.name}
                  onClick={() => setCurrentStep(idx)}
                  className={`flex cursor-pointer items-center gap-1.5 whitespace-nowrap border-b-2 px-1 pb-2 transition-all duration-300 ${
                    currentStep === idx
                      ? "border-cosmic-teal text-cosmic-teal"
                      : "border-transparent text-muted-steel hover:text-star-white"
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  <span className="opacity-70">0{idx + 1}</span>
                  <span className="hidden sm:inline">{step.name}</span>
                </button>
              );
            })}
          </div>

          <div className="mb-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-steel">
              Step 0{currentStep + 1} / {stepTitles[currentStep].name}
            </span>
            <p className="mt-0.5 text-sm font-semibold text-star-white">{stepTitles[currentStep].desc}</p>
          </div>

          <div className="mb-3 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                {currentStep === 0 && (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {SITE_TYPES.map((type) => {
                      const Icon = type.icon;
                      const isSelected = selectedType === type.id;
                      return (
                        <button
                          key={type.id}
                          onClick={() => setSelectedType(type.id)}
                          className={`flex h-[118px] cursor-pointer flex-col justify-between rounded-xl border p-3 text-left transition-all duration-300 ${
                            isSelected
                              ? "border-cosmic-teal/45 bg-cosmic-teal/10"
                              : "border-black/5 bg-abyss-panel/50 hover:border-black/15"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className={`rounded-lg p-2 ${isSelected ? "bg-cosmic-teal text-white" : "bg-black/5 text-muted-steel"}`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <span className="font-mono text-xs font-black text-sunset-coral">${type.price}</span>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-star-white">{type.name}</h4>
                            <p className="mt-0.5 text-[10px] font-normal leading-snug text-muted-steel">{type.description}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {COLOR_THEMES.map((theme) => {
                      const isSelected = selectedTheme === theme.id;
                      return (
                        <button
                          key={theme.id}
                          onClick={() => setSelectedTheme(theme.id)}
                          className={`cursor-pointer rounded-xl border p-3 text-left transition-all duration-300 ${
                            isSelected
                              ? "border-cosmic-teal/45 bg-cosmic-teal/10"
                              : "border-black/5 bg-abyss-panel/50 hover:border-black/15"
                          }`}
                        >
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <span className="text-xs font-semibold text-star-white">{theme.name}</span>
                            <div className="flex gap-1.5">
                              {[theme.primary, theme.secondary, theme.bg].map((color) => (
                                <span key={color} className="h-4 w-4 rounded-full border border-black/10 shadow-sm" style={{ backgroundColor: color }} />
                              ))}
                            </div>
                          </div>
                          <div
                            className="rounded-lg border p-2 text-center font-mono text-[8px] font-bold uppercase tracking-widest"
                            style={{ backgroundColor: theme.bg, color: theme.text, borderColor: `${theme.primary}28` }}
                          >
                            {theme.name} preview
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {FONT_STYLES.map((font) => {
                      const isSelected = selectedFont === font.id;
                      return (
                        <button
                          key={font.id}
                          onClick={() => setSelectedFont(font.id)}
                          className={`flex min-h-[94px] cursor-pointer flex-col justify-between rounded-xl border p-3 text-left transition-all duration-300 ${
                            isSelected
                              ? "border-cosmic-teal/45 bg-cosmic-teal/10"
                              : "border-black/5 bg-abyss-panel/50 hover:border-black/15"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="text-sm font-semibold text-star-white" style={{ fontFamily: font.fontFamily }}>{font.name}</h4>
                            {isSelected && (
                              <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-cosmic-teal text-white">
                                <Check className="h-3 w-3" />
                              </div>
                            )}
                          </div>
                          <p className="mt-1.5 text-[10px] font-normal leading-relaxed text-muted-steel">{font.description}</p>
                        </button>
                      );
                    })}
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-2">
                    {LAYOUT_STYLES.map((style) => {
                      const isSelected = selectedLayout === style.id;
                      return (
                        <button
                          key={style.id}
                          onClick={() => setSelectedLayout(style.id)}
                          className={`flex w-full cursor-pointer items-center justify-between rounded-xl border p-3 text-left transition-all duration-300 ${
                            isSelected
                              ? "border-cosmic-teal/45 bg-cosmic-teal/10"
                              : "border-black/5 bg-abyss-panel/50 hover:border-black/15"
                          }`}
                        >
                          <div>
                            <h4 className="text-xs font-semibold text-star-white">{style.name}</h4>
                            <p className="mt-0.5 text-[10px] font-normal leading-relaxed text-muted-steel">{style.description}</p>
                          </div>
                          {isSelected && (
                            <div className="ml-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-cosmic-teal text-white">
                              <Check className="h-3.5 w-3.5" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {PAGE_PACKS.map((pack) => {
                      const isSelected = selectedPagePack === pack.id;
                      return (
                        <button
                          key={pack.id}
                          onClick={() => setSelectedPagePack(pack.id)}
                          className={`flex min-h-[116px] cursor-pointer flex-col justify-between rounded-xl border p-3 text-left transition-all duration-300 ${
                            isSelected
                              ? "border-cosmic-teal/45 bg-cosmic-teal/10"
                              : "border-black/5 bg-abyss-panel/50 hover:border-black/15"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h4 className="text-xs font-semibold text-star-white">{pack.name}</h4>
                              <p className="mt-0.5 text-[10px] font-normal leading-snug text-muted-steel">{pack.description}</p>
                            </div>
                            <span className="font-mono text-xs font-black text-sunset-coral">+${pack.price}</span>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {pack.pages.slice(0, 5).map((page) => (
                              <span key={page} className="rounded-md bg-black/[0.04] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-muted-steel">
                                {page}
                              </span>
                            ))}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {EXTRA_FEATURES.map((extra) => {
                      const isSelected = selectedExtras.includes(extra.id);
                      const Icon = extra.icon;
                      return (
                        <button
                          key={extra.id}
                          onClick={() => handleToggleExtra(extra.id)}
                          className={`flex min-h-[94px] cursor-pointer items-start justify-between gap-3 rounded-xl border p-3 text-left transition-all duration-300 ${
                            isSelected
                              ? "border-cosmic-teal/45 bg-cosmic-teal/10"
                              : "border-black/5 bg-abyss-panel/50 hover:border-black/15"
                          }`}
                        >
                          <div className="flex gap-2.5">
                            <div className={`rounded-lg p-2 ${isSelected ? "bg-cosmic-teal text-white" : "bg-black/5 text-muted-steel"}`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-semibold text-star-white">{extra.name}</h4>
                              <p className="mt-0.5 text-[10px] font-normal leading-snug text-muted-steel">{extra.description}</p>
                            </div>
                          </div>
                          <div className="shrink-0 text-right">
                            <span className="block font-mono text-xs font-black text-sunset-coral">+${extra.price}</span>
                            <div className={`ml-auto mt-2 flex h-5 w-5 items-center justify-center rounded-md border transition-all duration-300 ${
                              isSelected ? "border-cosmic-teal bg-cosmic-teal text-white" : "border-black/20"
                            }`}>
                              {isSelected && <Check className="h-3.5 w-3.5" />}
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

          <div className="flex shrink-0 items-center justify-between gap-3 border-t border-black/5 pt-3">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex cursor-pointer items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-muted-steel transition-colors duration-300 hover:text-cosmic-teal disabled:pointer-events-none disabled:opacity-30"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            {currentStep < stepTitles.length - 1 ? (
              <button
                onClick={nextStep}
                className="flex cursor-pointer items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-star-white transition-colors duration-300 hover:text-cosmic-teal"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <span className="font-mono text-[9px] text-muted-steel">Configuration complete</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:col-span-6">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-muted-steel">
              Live Preview
            </span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-wider text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Auto-updating
              </div>
              <button
                onClick={() => setShowFullPreview(true)}
                className="flex cursor-pointer items-center gap-1 rounded-lg border border-cosmic-teal/25 bg-cosmic-teal/10 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-cosmic-teal transition-colors duration-300 hover:bg-cosmic-teal/20"
              >
                Live Preview
              </button>
            </div>
          </div>

          <div className="flex min-h-[340px] flex-1 flex-col overflow-hidden rounded-xl border border-black/8 bg-midnight-void shadow-inner">
            <div className="flex shrink-0 items-center justify-between border-b border-black/8 px-3 py-2">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              </div>
              <div
                className="mx-3 flex-1 rounded bg-black/8 px-3 py-0.5 text-center font-mono text-[8px] tracking-wider"
                style={{ color: currentThemeObj.primary }}
              >
                softbridge.studio/{currentTypeObj.id}/{currentPagePack.id}
              </div>
              <div className="h-3 w-3 rounded-full border border-black/15" style={{ backgroundColor: `${currentThemeObj.primary}40` }} />
            </div>

            <div className="flex-1 overflow-hidden">
              <LivePreview
                typeObj={currentTypeObj}
                themeObj={currentThemeObj}
                layout={selectedLayout}
                extras={selectedExtras}
                pages={previewPages}
              />
            </div>
          </div>

          <div className="space-y-3 rounded-xl border border-black/5 bg-abyss-panel/40 p-3">
            <div className="grid grid-cols-2 gap-2 font-mono text-[9px] md:grid-cols-3">
              {[
                { label: "Type", value: currentTypeObj.name },
                { label: "Theme", value: currentThemeObj.name },
                { label: "Layout", value: currentLayoutObj.name },
                { label: "Pages", value: `${currentPagePack.name} (${currentPagePack.pages.length})` },
                { label: "Extras", value: selectedExtras.length ? `${selectedExtras.length} added` : "None" },
                { label: "Build", value: currentPagePack.id === "full" ? "Complete site" : "Focused site" },
              ].map(({ label, value }) => (
                <div key={label} className="flex min-w-0 flex-col">
                  <span className="uppercase tracking-wider text-muted-steel">{label}</span>
                  <span className="mt-0.5 truncate font-bold text-star-white">{value}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-black/5 pt-3">
              <div className="font-mono">
                <span className="block text-[8px] uppercase text-muted-steel">Setup Price</span>
                <span className="text-xl font-black text-sunset-coral">${totalPrice}</span>
              </div>
              <CyberButton
                variant="teal"
                size="sm"
                onClick={handleAddToCart}
                className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider"
              >
                {isAddedToCart ? (
                  <>
                    <Check className="h-3.5 w-3.5" /> Added to Cart
                  </>
                ) : (
                  <>
                    <Plus className="h-3.5 w-3.5" /> Add to Cart
                  </>
                )}
              </CyberButton>
            </div>
          </div>
        </div>
      </div>

      <PreviewModal
        isOpen={showFullPreview}
        onClose={() => setShowFullPreview(false)}
        config={previewConfig}
      />
    </section>
  );
}
