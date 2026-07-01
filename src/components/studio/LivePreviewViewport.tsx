"use client";

import React from "react";
import { Laptop, Tablet, Smartphone, Sparkles, Send } from "lucide-react";
import { useConfiguratorStore, WebTemplateConfig, PageSection } from "@/store/useConfiguratorStore";
import { motion } from "framer-motion";

function getReadableText(bg: string) {
  const raw = bg.replace("#", "");
  const hex = raw.length === 3 ? raw.split("").map((char) => char + char).join("") : raw;
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  if ([r, g, b].some(Number.isNaN)) return "#5C2E1F";

  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance < 0.42 ? "#F8EFE7" : "#5C2E1F";
}

function getMutedText(text: string) {
  return text === "#F8EFE7" ? "rgba(248, 239, 231, 0.66)" : "rgba(92, 46, 31, 0.66)";
}

export function LivePreviewViewport() {
  const { config, previewDevice, setPreviewDevice } = useConfiguratorStore();
  const [activePageId, setActivePageId] = React.useState(config.pages[0]?.id || "");
  const activePage = config.pages.find((page) => page.id === activePageId) || config.pages[0];
  const previewText = getReadableText(config.theme.bg);

  const widthClasses = {
    desktop: "w-full max-w-5xl h-[560px]",
    tablet: "w-[768px] h-[650px]",
    mobile: "w-[375px] h-[560px]",
  };

  // Helper to wrap styles
  const themeStyles = {
    "--theme-primary": config.theme.primary,
    "--theme-secondary": config.theme.secondary,
    "--theme-bg": config.theme.bg,
    "--preview-text": previewText,
    "--preview-muted": getMutedText(previewText),
    fontFamily: "var(--font-sans)",
  } as React.CSSProperties;

  return (
    <div className="flex flex-col items-center gap-2.5 w-full h-full">
      {/* Top Device Toggles Bar */}
      <div className="flex items-center gap-2 bg-abyss-panel/70 border border-black/5 px-3 py-1.5 rounded-xl backdrop-blur-md">
        <button
          onClick={() => setPreviewDevice("desktop")}
          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
            previewDevice === "desktop" ? "bg-electric-cyan text-white" : "text-nebula-slate hover:text-star-white"
          }`}
          title="Desktop Mode"
        >
          <Laptop className="w-4 h-4" />
        </button>
        <button
          onClick={() => setPreviewDevice("tablet")}
          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
            previewDevice === "tablet" ? "bg-electric-cyan text-white" : "text-nebula-slate hover:text-star-white"
          }`}
          title="Tablet Mode"
        >
          <Tablet className="w-4 h-4" />
        </button>
        <button
          onClick={() => setPreviewDevice("mobile")}
          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
            previewDevice === "mobile" ? "bg-electric-cyan text-white" : "text-nebula-slate hover:text-star-white"
          }`}
          title="Mobile Mode"
        >
          <Smartphone className="w-4 h-4" />
        </button>
        <div className="h-4 w-[1px] bg-black/10 mx-2" />
        <span className="text-[10px] font-heading font-bold text-nebula-slate uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-electric-cyan animate-pulse" />
          Live Preview
        </span>
      </div>

      {/* Frame Container */}
      <div className="w-full flex-1 flex items-center justify-center p-2.5 bg-abyss-panel/45 rounded-2xl border border-black/5 overflow-hidden relative">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

        {/* Viewport Frame */}
        <motion.div
          layout
          className={`glass-panel rounded-xl overflow-y-auto overflow-x-hidden shadow-[0_20px_50px_rgba(92,46,31,0.14)] border border-black/10 transition-all duration-300 custom-theme-preview flex flex-col relative ${widthClasses[previewDevice]}`}
          style={themeStyles}
        >
          {/* Mock Browser Header */}
          <div className="bg-black/[0.06] px-3 py-1.5 border-b border-black/5 flex items-center gap-2 sticky top-0 z-30 backdrop-blur-md">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            <div className="flex-1 max-w-sm mx-auto bg-black/[0.04] border border-black/5 rounded-md px-3 py-1 text-[10px] text-center text-nebula-slate/85 truncate font-mono">
              https://{config.brandName.toLowerCase().replace(/[^a-z0-9]/g, "") || "preview"}.softbridgedomain.space
            </div>
          </div>

          {/* Dynamic App Mockup */}
          {config.templateId ? (
            <div className="flex-1 flex flex-col">
              {/* Preview Navigation */}
              <nav className="px-5 py-2.5 flex items-center justify-between gap-3 border-b border-white/5 bg-black/10 backdrop-blur-sm">
                <div className="flex items-center gap-2 font-heading font-black text-sm" style={{ color: "var(--preview-text)" }}>
                  {config.logo ? (
                    <img src={config.logo} alt="Logo" className="w-5 h-5 object-contain rounded" />
                  ) : (
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${config.theme.primary}, ${config.theme.secondary})`,
                      }}
                    />
                  )}
                  {config.brandName}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-nebula-slate overflow-x-auto">
                  {config.pages.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setActivePageId(p.id)}
                      className="px-2 py-1 rounded-md cursor-pointer transition-colors whitespace-nowrap"
                      style={{
                        color: activePage?.id === p.id ? "var(--preview-text)" : "var(--preview-muted)",
                        backgroundColor: activePage?.id === p.id ? "rgba(255,255,255,0.1)" : "transparent",
                      }}
                    >
                      {p.title}
                    </button>
                  ))}
                </div>
              </nav>

              {/* Render Sections for the selected page */}
              <div className="flex-1 flex flex-col">
                {activePage?.sections.map((section) => (
                  <PreviewSection key={section.id} section={section} config={config} />
                ))}
              </div>

              {/* Preview Footer */}
              <footer className="px-5 py-4 border-t border-white/5 text-center text-[9px] text-nebula-slate/60 bg-black/20">
                © 2026 {config.brandName}. Designed & Powered via Softbridge Studio.
              </footer>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <p className="text-sm text-nebula-slate">Choose a template in the editor to start customizing your orbit.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// Section Rendering Component
function PreviewSection({ section, config }: { section: PageSection; config: WebTemplateConfig }) {
  const content = section.content;
  const previewText = getReadableText(config.theme.bg);
  const mutedText = getMutedText(previewText);

  const headingFont = {
    fontFamily: config.typography.headings === "Outfit" ? "var(--font-heading)" : "var(--font-display)",
    color: previewText,
  };

  switch (section.type) {
    case "hero":
      return (
        <section className="px-5 py-12 text-center border-b border-white/5 relative overflow-hidden flex flex-col items-center justify-center min-h-[250px]">
          {/* Tech decorative mesh grid */}
          <div className="absolute inset-0 opacity-10 pointer-events-none grid-bg" />
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={headingFont}
            className="text-3xl md:text-4xl font-bold mb-3"
          >
            {content.heading}
          </motion.h2>
          <p className="text-xs md:text-sm max-w-md mb-5 leading-relaxed" style={{ color: mutedText }}>
            {content.subheading}
          </p>
          <button
            style={{
              background: `linear-gradient(135deg, ${config.theme.primary}, ${config.theme.secondary})`,
              boxShadow: `0 0 15px ${config.theme.primary}50`,
            }}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white uppercase tracking-wider hover:scale-105 transition-all"
          >
            {content.buttonText || "Execute"}
          </button>
        </section>
      );

    case "features":
      return (
        <section className="px-5 py-9 border-b border-white/5">
          <div className="text-center mb-6">
            <h3 style={headingFont} className="text-xl md:text-2xl font-bold mb-2">
              {content.heading}
            </h3>
            <p className="text-[11px]" style={{ color: mutedText }}>{content.subheading}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {content.items?.map((item, idx) => (
              <div key={idx} className="bg-white/5 border border-white/5 p-3.5 rounded-xl text-center">
                <div
                  style={{ backgroundColor: `${config.theme.primary}15`, color: config.theme.primary }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-3 text-sm font-bold"
                >
                  0{idx + 1}
                </div>
                <p className="text-xs font-semibold" style={{ color: previewText }}>{item}</p>
              </div>
            ))}
          </div>
        </section>
      );

    case "gallery":
      return (
        <section className="px-5 py-9 border-b border-white/5">
          <div className="text-center mb-6">
            <h3 style={headingFont} className="text-xl md:text-2xl font-bold">
              {content.heading}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {content.items?.map((item, idx) => (
              <div
                key={idx}
                className="group/item relative h-32 rounded-xl overflow-hidden bg-white/5 border border-white/5 flex items-end p-3.5 hover:border-white/10 transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <p className="text-xs font-bold text-white relative z-20">{item}</p>
              </div>
            ))}
          </div>
        </section>
      );

    case "contact":
      return (
        <section className="px-5 py-9 border-b border-white/5 text-center">
          <h3 style={headingFont} className="text-xl md:text-2xl font-bold mb-2">
            {content.heading}
          </h3>
          <p className="text-xs mb-5" style={{ color: mutedText }}>{content.description}</p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter secure comms vector..."
              className="flex-1 bg-white/5 border border-white/5 rounded-lg px-4 py-2 text-xs placeholder:text-nebula-slate/40 focus:outline-none focus:border-white/20"
              style={{ color: previewText }}
            />
            <button
              style={{ backgroundColor: config.theme.primary }}
              className="p-2.5 rounded-lg text-black hover:scale-105 transition-all flex items-center justify-center shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      );

    default:
      return (
        <section className="px-5 py-9 border-b border-white/5">
          <h3 style={headingFont} className="text-xl font-bold mb-2">
            {section.title}
          </h3>
          <p className="text-xs" style={{ color: mutedText }}>{content.description}</p>
        </section>
      );
  }
}
