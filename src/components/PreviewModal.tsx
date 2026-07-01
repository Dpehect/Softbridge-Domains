"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Monitor, Smartphone, Tablet } from "lucide-react";
import { CustomPage, CustomSection } from "../types/builder";

export interface PreviewConfig {
  typeId: string;
  typeName: string;
  brandName?: string;
  identitySlogan?: string;
  identityLogo?: string;
  themePrimary: string;
  themeSecondary: string;
  themeBg: string;
  themeText: string;
  themeFont: string;
  themeHeadingFont?: string;
  themeBorderRadius?: string;
  navType?: string;
  heroStyle?: string;
  extras: string[];
  customPages: CustomPage[];
  
  // Legacy Fallbacks for ProductSection.tsx
  heroText?: string;
  sections?: string[];
  pageCountLabel?: string;
  layout?: string;
  image?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  config: PreviewConfig;
}

type ViewMode = "desktop" | "tablet" | "mobile";

// ─── Dynamic Section Renderer ──────────────────────────────────────
function DynamicSection({ section, theme, isFirst }: { section: CustomSection, theme: any, isFirst: boolean }) {
  const { type, content, styles } = section;
  const { primary, bg, text, radius } = theme;
  
  const bgStyle = styles.backgroundColor || (isFirst ? `linear-gradient(160deg, ${primary}16 0%, ${bg} 66%)` : "transparent");
  const textColor = styles.textColor || text;
  const py = styles.padding || "py-16 md:py-24";
  const align = styles.alignment === "center" ? "text-center items-center" : styles.alignment === "right" ? "text-right items-end" : "text-left items-start";
  const alignSelf = styles.alignment === "center" ? "mx-auto" : styles.alignment === "right" ? "ml-auto" : "mr-auto";
  const justify = styles.alignment === "center" ? "justify-center" : styles.alignment === "right" ? "justify-end" : "justify-start";

  // Parse layout
  let gridCols = "grid-cols-1 md:grid-cols-3"; // default
  if (styles.layout === "1-col") gridCols = "grid-cols-1";
  else if (styles.layout === "2-col") gridCols = "grid-cols-1 md:grid-cols-2";
  else if (styles.layout === "3-col") gridCols = "grid-cols-1 md:grid-cols-3";
  else if (styles.layout === "4-col") gridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  if (type === "Hero") {
    return (
      <section className={`relative flex flex-col ${align} px-5 md:px-8 ${py} overflow-hidden`} style={{ background: bgStyle }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 max-w-4xl">
          {content.subheading && (
            <div className={`inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-xl mb-4 ${alignSelf}`} style={{ backgroundColor: `${primary}15`, color: primary, border: `1px solid ${primary}30` }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primary }} />
              {content.subheading}
            </div>
          )}
          <h1 className="text-4xl md:text-6xl mb-4 leading-tight font-bold" style={{ color: textColor }}>
            {content.heading || "Hero Heading"}
          </h1>
          <p className="text-base leading-relaxed mb-8 max-w-2xl" style={{ color: textColor, opacity: 0.7 }}>
            {content.description || "Hero description text."}
          </p>
          {(content.buttonText || content.buttonLink) && (
            <div className={`flex items-center ${justify} gap-3 flex-wrap`}>
              <div className="px-6 py-3 text-sm font-semibold text-white shadow-md cursor-pointer" style={{ backgroundColor: primary, borderRadius: radius }}>
                {content.buttonText || "Get Started"}
              </div>
            </div>
          )}
        </motion.div>
      </section>
    );
  }

  if (type === "Slider") {
    const items = content.sliderItems && content.sliderItems.length > 0 ? content.sliderItems : [
      { image: "", title: "Slide 1", subtitle: "A beautiful placeholder slide." },
      { image: "", title: "Slide 2", subtitle: "Another great slide." }
    ];
    return (
      <section className={`relative px-5 md:px-8 ${py} overflow-hidden`} style={{ background: bgStyle }}>
         <div className={`max-w-5xl mx-auto flex flex-col ${align} mb-8`}>
            {content.heading && <h2 className="text-3xl font-bold mb-4" style={{ color: textColor }}>{content.heading}</h2>}
            {content.description && <p className="text-sm max-w-xl" style={{ color: textColor, opacity: 0.7 }}>{content.description}</p>}
         </div>
         <div className="w-full flex gap-4 overflow-x-auto pb-4 snap-x custom-scrollbar">
            {items.map((slide, i) => (
              <div key={i} className="min-w-[280px] md:min-w-[400px] aspect-[4/3] bg-black/5 flex flex-col justify-end p-6 relative overflow-hidden shrink-0 snap-center group" style={{ borderRadius: radius }}>
                {slide.image ? (
                   <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                   <div className="absolute inset-0 bg-gradient-to-br from-[#000000] to-[#333333] opacity-10"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="relative z-10 text-white text-left">
                  <h3 className="text-xl font-bold mb-1">{slide.title || `Slide ${i+1}`}</h3>
                  {slide.subtitle && <p className="text-xs opacity-80">{slide.subtitle}</p>}
                </div>
              </div>
            ))}
         </div>
      </section>
    );
  }

  if (type === "Features") {
    return (
      <section className={`relative px-5 md:px-8 ${py}`} style={{ background: bgStyle }}>
         <div className={`max-w-5xl mx-auto flex flex-col ${align}`}>
            {content.heading && <h2 className="text-3xl font-bold mb-4" style={{ color: textColor }}>{content.heading}</h2>}
            {content.description && <p className="text-sm mb-12 max-w-xl" style={{ color: textColor, opacity: 0.7 }}>{content.description}</p>}
            
            <div className={`grid ${gridCols} gap-6 w-full`}>
              {(content.items && content.items.length > 0 ? content.items : ["Feature 1", "Feature 2", "Feature 3"]).map((item, i) => (
                <div key={i} className="p-6 bg-black/5 border border-black/5 shadow-sm text-left" style={{ borderRadius: radius }}>
                  <div className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center" style={{ backgroundColor: `${primary}15` }}>
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: primary }}></span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: textColor }}>{item}</h3>
                  <p className="text-xs" style={{ color: textColor, opacity: 0.6 }}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>
                </div>
              ))}
            </div>
         </div>
      </section>
    );
  }

  if (type === "Pricing") {
    return (
      <section className={`relative px-5 md:px-8 ${py}`} style={{ background: bgStyle }}>
         <div className={`max-w-5xl mx-auto flex flex-col ${align}`}>
            {content.heading && <h2 className="text-3xl font-bold mb-4" style={{ color: textColor }}>{content.heading}</h2>}
            {content.description && <p className="text-sm mb-12 max-w-xl" style={{ color: textColor, opacity: 0.7 }}>{content.description}</p>}
            
            <div className={`grid ${gridCols} gap-6 w-full`}>
              {["Starter", "Pro", "Enterprise"].slice(0, styles.layout === "1-col" ? 1 : styles.layout === "2-col" ? 2 : 3).map((plan, i) => (
                <div key={i} className={`p-8 border ${i === 1 ? 'shadow-xl' : 'shadow-sm'} bg-white text-left flex flex-col`} style={{ borderRadius: radius, borderColor: i === 1 ? primary : 'rgba(0,0,0,0.1)' }}>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan}</h3>
                  <div className="text-3xl font-bold text-gray-900 mb-6">{i === 0 ? "$0" : i === 1 ? "$49" : "$199"}<span className="text-sm font-normal text-gray-500">/mo</span></div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {[1, 2, 3].map(j => <li key={j} className="text-sm text-gray-600 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primary }}></span> Feature {j}</li>)}
                  </ul>
                  <div className="w-full text-center py-2 text-sm font-bold cursor-pointer transition-colors" style={{ backgroundColor: i === 1 ? primary : '#f3f4f6', color: i === 1 ? '#fff' : '#111827', borderRadius: radius }}>
                    {content.buttonText || "Choose Plan"}
                  </div>
                </div>
              ))}
            </div>
         </div>
      </section>
    );
  }

  if (type === "Testimonials") {
    return (
      <section className={`relative px-5 md:px-8 ${py}`} style={{ background: bgStyle }}>
         <div className={`max-w-5xl mx-auto flex flex-col ${align}`}>
            {content.heading && <h2 className="text-3xl font-bold mb-8" style={{ color: textColor }}>{content.heading}</h2>}
            <div className={`grid ${gridCols} gap-6 w-full text-left`}>
              {(content.items && content.items.length > 0 ? content.items : ["Amazing experience!"]).map((item, i) => (
                <div key={i} className="p-6 bg-white/50 border border-black/5 shadow-sm" style={{ borderRadius: radius }}>
                  <p className="italic text-sm mb-4" style={{ color: textColor, opacity: 0.8 }}>"{item}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-black/10"></div>
                    <div>
                      <div className="text-sm font-bold" style={{ color: textColor }}>User Name</div>
                      <div className="text-xs" style={{ color: textColor, opacity: 0.6 }}>Customer</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
         </div>
      </section>
    );
  }

  // Fallback for other sections (FAQ, Contact, Gallery, Blog)
  return (
    <section className={`relative px-5 md:px-8 ${py} flex flex-col ${align}`} style={{ background: bgStyle }}>
       <div className={`max-w-4xl mx-auto flex flex-col ${align}`}>
          <div className="inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-wider mb-2 rounded" style={{ backgroundColor: `${primary}20`, color: primary }}>{type} Section</div>
          <h2 className="text-3xl font-bold mb-4" style={{ color: textColor }}>{content.heading || `${type} Heading`}</h2>
          <p className="text-sm mb-6" style={{ color: textColor, opacity: 0.7 }}>{content.description || `Content for ${type} section goes here.`}</p>
          {(content.buttonText) && (
            <div className="px-6 py-2.5 text-sm font-semibold text-white shadow-sm cursor-pointer" style={{ backgroundColor: primary, borderRadius: radius }}>
              {content.buttonText}
            </div>
          )}
       </div>
    </section>
  );
}

// ─── Full Site Preview Renderer ───────────────────────────────────
export function FullSitePreview({ config, viewMode }: { config: PreviewConfig; viewMode: ViewMode }) {
  const { brandName, identityLogo, themePrimary: primary, themeSecondary: secondary, themeBg: bg, themeText: text, themeFont: font, themeHeadingFont, navType = "topbar", customPages, extras } = config;
  const [activePageId, setActivePageId] = React.useState(customPages?.[0]?.id || "home");
  
  // Safe fallback if customPages is empty
  const activePage = customPages?.find((p) => p.id === activePageId) || customPages?.[0];
  
  const hasDark = extras.includes("darkmode");
  const hasAnalytics = extras.includes("analytics");
  const displayName = brandName || "Softbridge";

  const resolvedBg = hasDark && bg !== "#070B14" ? "#0F0F0F" : bg;
  const resolvedText = hasDark && bg !== "#070B14" ? "#F5F5F5" : text;
  const border = `${primary}20`;
  const radius = config.themeBorderRadius || "12px";

  const headingStyle: React.CSSProperties = {
    fontFamily: themeHeadingFont || font || "var(--font-sans)",
  };

  if (!activePage) {
    return <div className="w-full h-full flex items-center justify-center">No pages defined.</div>;
  }

  return (
    <div className={`w-full h-full flex ${navType === "sidebar" ? "flex-row" : "flex-col"} overflow-hidden text-sm`} style={{ backgroundColor: resolvedBg, color: resolvedText, fontFamily: font || "var(--font-sans)" }}>
      {/* Nav */}
      <nav className={navType === "sidebar" ? "hidden md:flex w-48 shrink-0 h-full border-r flex-col items-start px-5 py-6" : "sticky top-0 z-20 flex items-center justify-between px-5 md:px-7 py-3 border-b"} style={{ borderColor: border, backgroundColor: `${resolvedBg}F0`, backdropFilter: "blur(12px)" }}>
        <div className={`flex items-center gap-2 ${navType === "sidebar" ? "mb-8 w-full" : ""}`}>
          {identityLogo ? (
            <img src={identityLogo} alt="Logo" className="h-6 w-auto object-contain" />
          ) : (
            <><div className="w-5 h-5 rounded-lg shrink-0" style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }} /><span className="font-semibold text-sm truncate max-w-[180px]" style={{ color: resolvedText }}>{displayName}</span></>
          )}
        </div>
        <div className={`flex ${navType === "sidebar" ? "flex-col w-full gap-1.5" : "hidden md:flex items-center gap-2"} text-xs`} style={{ color: resolvedText }}>
          {customPages.map((page) => (
            <button key={page.id} onClick={() => setActivePageId(page.id)} className={`rounded-lg transition-all text-left ${navType === "sidebar" ? "px-3 py-2 w-full" : "px-2.5 py-1"}`} style={{ color: activePage?.id === page.id ? primary : resolvedText, backgroundColor: activePage?.id === page.id ? `${primary}14` : "transparent", opacity: activePage?.id === page.id ? 1 : 0.62 }}>
              {page.title}
            </button>
          ))}
        </div>
        <div className={`px-4 py-1.5 text-xs font-semibold text-white cursor-pointer ${navType === "sidebar" ? "mt-auto w-full text-center" : ""}`} style={{ backgroundColor: primary, borderRadius: radius }}>
          Get Started
        </div>
      </nav>

      {navType === "sidebar" && (
        <div className="flex md:hidden gap-1.5 overflow-x-auto border-b px-3 py-2" style={{ borderColor: border, backgroundColor: `${resolvedBg}F0` }}>
          {customPages.map((page) => (
            <button key={page.id} onClick={() => setActivePageId(page.id)} className="shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-semibold" style={{ color: activePage?.id === page.id ? primary : resolvedText, backgroundColor: activePage?.id === page.id ? `${primary}14` : "transparent", opacity: activePage?.id === page.id ? 1 : 0.62 }}>
              {page.title}
            </button>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 h-full overflow-y-auto" style={headingStyle}>
        {activePage?.sections.map((section, idx) => (
          <DynamicSection 
            key={section.id} 
            section={section} 
            theme={{ primary, bg: resolvedBg, text: resolvedText, radius }} 
            isFirst={idx === 0} 
          />
        ))}

        {/* Footer */}
        <footer className="px-6 md:px-8 py-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 mt-auto" style={{ borderColor: border, background: `${resolvedBg}FA` }}>
          <div className="flex flex-col md:flex-row items-center gap-4 text-xs" style={{ color: resolvedText, opacity: 0.6 }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            {hasAnalytics && <span style={{ color: primary, opacity: 1, fontWeight: 'bold' }}>Analytics Active</span>}
          </div>
          <span className="text-xs" style={{ color: resolvedText, opacity: 0.4 }}>
            {new Date().getFullYear()} {displayName}. Built with Softbridge Studio.
          </span>
        </footer>
      </div>
    </div>
  );
}

export default function PreviewModal({ isOpen, onClose, config }: Props) {
  const [viewMode, setViewMode] = React.useState<ViewMode>("desktop");

  const viewWidths: Record<ViewMode, string> = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.94, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 12 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="relative w-full max-w-6xl h-[90vh] bg-[#FDF0E6] rounded-2xl md:rounded-[32px] overflow-hidden flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 md:px-6 py-4 bg-white/40 border-b border-black/5 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <button onClick={() => setViewMode("desktop")} className={`p-1.5 rounded-md transition-colors ${viewMode === "desktop" ? "bg-black/10 text-black" : "text-black/40 hover:text-black/60"}`}><Monitor className="w-4 h-4" /></button>
                <button onClick={() => setViewMode("tablet")} className={`p-1.5 rounded-md transition-colors ${viewMode === "tablet" ? "bg-black/10 text-black" : "text-black/40 hover:text-black/60"}`}><Tablet className="w-4 h-4" /></button>
                <button onClick={() => setViewMode("mobile")} className={`p-1.5 rounded-md transition-colors ${viewMode === "mobile" ? "bg-black/10 text-black" : "text-black/40 hover:text-black/60"}`}><Smartphone className="w-4 h-4" /></button>
              </div>
              <div className="text-xs font-semibold text-black/40 font-mono hidden md:block">Preview Mode</div>
              <button onClick={onClose} className="p-1.5 rounded-full hover:bg-black/5 transition-colors"><X className="w-5 h-5 text-black/60" /></button>
            </div>
            <div className="flex-1 bg-black/5 flex items-center justify-center p-2 md:p-6 overflow-hidden">
              <motion.div layout transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="h-full bg-white rounded-xl md:rounded-2xl shadow-xl overflow-hidden" style={{ width: viewWidths[viewMode] }}>
                <FullSitePreview config={config} viewMode={viewMode} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
