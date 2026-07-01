"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Monitor, Smartphone, Tablet } from "lucide-react";

// ─── Types (mirrored from SoftbridgeStudio) ───────────────────────
export interface PreviewConfig {
  typeId: string;
  typeName: string;
  brandName?: string;
  heroText: string;
  sections: string[];
  themePrimary: string;
  themeSecondary: string;
  themeBg: string;
  themeText: string;
  layout: string;
  extras: string[];
  image?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  config: PreviewConfig;
}

type ViewMode = "desktop" | "tablet" | "mobile";

// ─── Full Site Preview Renderer ───────────────────────────────────
function FullSitePreview({ config, viewMode }: { config: PreviewConfig; viewMode: ViewMode }) {
  const {
    brandName,
    image,
    themePrimary: primary,
    themeSecondary: secondary,
    themeBg: bg,
    themeText: text,
    layout,
    extras,
    heroText,
    sections,
    typeName,
  } = config;
  const hasDark      = extras.includes("darkmode");
  const hasAnalytics = extras.includes("analytics");
  const has3D        = extras.includes("3d");
  const displayName  = brandName || "Softbridge";

  const resolvedBg   = hasDark && bg !== "#070B14" ? "#0F0F0F" : bg;
  const resolvedText = hasDark && bg !== "#070B14" ? "#F5F5F5" : text;
  const border       = `${primary}20`;

  const headingStyle: React.CSSProperties =
    layout === "bold"    ? { fontWeight: 850, textTransform: "uppercase" as const, letterSpacing: "0" } :
    layout === "minimal" ? { fontWeight: 420, letterSpacing: "0" } :
                           { fontWeight: 720, letterSpacing: "0" };

  const cardRadius = layout === "minimal" ? "8px" : layout === "bold" ? "4px" : "12px";
  const btnRadius  = layout === "minimal" ? "8px" : layout === "bold" ? "4px" : "12px";

  return (
    <div
      className="w-full h-full flex flex-col overflow-y-auto text-sm"
      style={{ backgroundColor: resolvedBg, color: resolvedText, fontFamily: "var(--font-sans)" }}
    >
      {/* ── Nav ── */}
      <nav
        className="sticky top-0 z-10 flex items-center justify-between px-5 md:px-7 py-3 border-b"
        style={{ borderColor: border, backgroundColor: `${resolvedBg}F0`, backdropFilter: "blur(12px)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-lg"
            style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}
          />
          <span className="font-semibold text-sm truncate max-w-[180px]" style={{ color: resolvedText }}>
            {displayName}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-5 text-xs" style={{ color: resolvedText, opacity: 0.65 }}>
          {sections.slice(0, 4).map((s) => (
            <span key={s} className="hover:opacity-100 cursor-pointer transition-opacity">{s}</span>
          ))}
        </div>
        <div
          className="px-4 py-1.5 text-xs font-semibold text-white"
          style={{ backgroundColor: primary, borderRadius: btnRadius }}
        >
          Get Started
        </div>
      </nav>

      {/* ── Hero ── */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-5 md:px-8 overflow-hidden"
        style={{
          minHeight: viewMode === "mobile" ? "280px" : "340px",
          background: `linear-gradient(160deg, ${primary}16 0%, ${resolvedBg} 66%)`,
        }}
      >
        {image && (
          <div className="absolute inset-0 opacity-[0.16] pointer-events-none">
            <img src={image} alt="" className="h-full w-full object-cover" />
          </div>
        )}
        {has3D && (
          <div
            className="absolute -top-16 left-1/2 -translate-x-1/2 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ width: "320px", height: "320px", backgroundColor: primary }}
          />
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-2xl"
        >
          <div
            className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-xl mb-4"
            style={{ backgroundColor: `${primary}15`, color: primary, border: `1px solid ${primary}30` }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primary }} />
            {typeName}
          </div>
          <h1
            className="text-3xl md:text-5xl mb-3 leading-tight"
            style={{ ...headingStyle, color: resolvedText }}
          >
            {heroText}
          </h1>
          <p className="text-sm leading-relaxed mb-6" style={{ color: resolvedText, opacity: 0.62 }}>
            Built with Softbridge — modular, scalable, and ready to ship in minutes. 
            {has3D ? " Enhanced with interactive 3D elements." : ""}
            {hasAnalytics ? " Analytics-ready from day one." : ""}
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div
              className="px-6 py-2.5 text-sm font-semibold text-white"
              style={{ backgroundColor: primary, borderRadius: btnRadius }}
            >
              Start Building
            </div>
            <div
              className="px-6 py-2.5 text-sm font-medium"
              style={{ color: primary, border: `1.5px solid ${primary}50`, borderRadius: btnRadius }}
            >
              View Demo
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Feature cards ── */}
      <section className="px-8 py-12">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold mb-2" style={{ ...headingStyle, color: resolvedText }}>
            {sections[0] || "Features"}
          </h2>
          <p className="text-xs" style={{ color: resolvedText, opacity: 0.5 }}>Everything you need to launch fast</p>
        </div>
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: viewMode === "mobile" ? "1fr" : "repeat(3, 1fr)" }}
        >
          {["Modular Components", "Clean Architecture", "Performance First"].map((feat, i) => (
            <div
              key={feat}
              className="p-4"
              style={{
                backgroundColor: `${primary}08`,
                border: `1px solid ${primary}18`,
                borderRadius: cardRadius,
              }}
            >
              <div
                className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center"
                style={{ backgroundColor: `${primary}20`, borderRadius: cardRadius }}
              >
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: primary }} />
              </div>
              <h3 className="text-sm font-semibold mb-1.5" style={{ color: resolvedText }}>{feat}</h3>
              <p className="text-xs leading-relaxed" style={{ color: resolvedText, opacity: 0.55 }}>
                {i === 0 ? "Reusable, composable UI blocks built for rapid iteration." :
                 i === 1 ? "Scalable file structure optimized for team collaboration." :
                           "Lighthouse-ready, sub-2s loads on every route."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Secondary section ── */}
      {sections.length > 1 && (
        <section
          className="px-8 py-10 border-t"
          style={{ borderColor: border, backgroundColor: `${primary}05` }}
        >
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-3" style={{ ...headingStyle, color: resolvedText }}>
                {sections[1] || "Why choose us"}
              </h2>
              <p className="text-xs leading-relaxed mb-6" style={{ color: resolvedText, opacity: 0.6 }}>
                Trusted by thousands of developers and designers. Ship faster, scale smarter, and maintain with confidence.
              </p>
              <div className="flex flex-col gap-2">
                {["Full design-to-code pipeline", "Instant deployment to any CDN", "99.99% uptime SLA guarantee"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs" style={{ color: resolvedText }}>
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${primary}20` }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primary }} />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div
              className="w-full md:w-64 h-36 flex items-center justify-center"
              style={{ backgroundColor: `${primary}10`, borderRadius: cardRadius, border: `1px solid ${primary}20` }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: primary }}>99.9%</div>
                <div className="text-xs mt-1" style={{ color: resolvedText, opacity: 0.5 }}>Uptime guaranteed</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA banner ── */}
      <section
        className="px-8 py-10 text-center"
        style={{ background: `linear-gradient(135deg, ${primary}18 0%, ${secondary}10 100%)` }}
      >
        <h2
          className="text-2xl font-bold mb-3"
          style={{ ...headingStyle, color: resolvedText }}
        >
          Ready to launch?
        </h2>
        <p className="text-xs mb-6" style={{ color: resolvedText, opacity: 0.6 }}>
          Join thousands of teams shipping with Softbridge.
        </p>
        <div
          className="inline-block px-8 py-3 text-sm font-semibold text-white"
          style={{ backgroundColor: primary, borderRadius: btnRadius }}
        >
          Get started free
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="px-6 md:px-8 py-5 border-t flex flex-col md:flex-row items-center justify-between gap-3"
        style={{ borderColor: border }}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-md" style={{ backgroundColor: primary }} />
          <span className="text-xs font-semibold" style={{ color: resolvedText }}>{displayName}</span>
        </div>
        <div className="flex gap-4 text-xs" style={{ color: resolvedText, opacity: 0.4 }}>
          <span>Privacy</span>
          <span>Terms</span>
          <span>Contact</span>
          {hasAnalytics && <span style={{ color: primary }}>Analytics Active</span>}
        </div>
        <span className="text-xs" style={{ color: resolvedText, opacity: 0.35 }}>
          {new Date().getFullYear()} {displayName}. All rights reserved.
        </span>
      </footer>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-6xl h-[88vh] flex flex-col bg-[#FDF0E6] border border-black/8 rounded-2xl overflow-hidden shadow-2xl z-10"
          >
            {/* Modal toolbar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-black/8 bg-[#F8E4D3]/85 backdrop-blur-md shrink-0 gap-3">
              <div className="flex items-center gap-3">
                {/* Browser dots */}
                <div className="flex gap-1.5">
                  <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                {/* URL bar */}
                <div className="hidden sm:flex items-center gap-2 bg-black/5 border border-black/8 rounded-lg px-3 py-1 min-w-[200px]">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: config.themePrimary }} />
                  <span className="text-[10px] font-mono text-[#5C2E1F]/60">
                    softbridge.studio/{config.typeId}
                  </span>
                </div>
                <span className="hidden lg:inline text-[10px] font-mono font-bold uppercase text-[#5C2E1F]/55">
                  Live Preview
                </span>
              </div>

              {/* View mode switcher */}
              <div className="flex items-center gap-1 bg-black/5 rounded-xl p-1">
                {([
                  { mode: "desktop" as ViewMode, Icon: Monitor },
                  { mode: "tablet"  as ViewMode, Icon: Tablet },
                  { mode: "mobile"  as ViewMode, Icon: Smartphone },
                ] as const).map(({ mode, Icon }) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    title={`${mode} preview`}
                    className={`p-1.5 rounded-lg transition-all duration-250 cursor-pointer ${
                      viewMode === mode
                        ? "bg-white shadow-sm text-[#E85D3B]"
                        : "text-[#7A4633]/50 hover:text-[#7A4633]"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>

              {/* Config summary pills */}
              <div className="hidden md:flex items-center gap-2">
                {[config.typeName, config.layout].map((label) => (
                  <span key={label} className="text-[9px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#E85D3B]/10 text-[#E85D3B] border border-[#E85D3B]/20">
                    {label}
                  </span>
                ))}
                <button
                  onClick={onClose}
                  className="ml-2 w-7 h-7 rounded-xl bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#5C2E1F]/60 hover:text-[#5C2E1F] transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={onClose}
                className="md:hidden w-7 h-7 rounded-xl bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#5C2E1F]/60 hover:text-[#5C2E1F] transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Preview canvas */}
            <div className="flex-1 overflow-hidden bg-black/5 flex items-start justify-center p-3 md:p-4">
              <motion.div
                key={viewMode}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="h-full overflow-hidden border border-black/8 rounded-xl shadow-lg"
                style={{
                  width: viewWidths[viewMode],
                  maxWidth: "100%",
                  maxHeight: "100%",
                  overflowY: "auto",
                }}
              >
                <FullSitePreview config={config} viewMode={viewMode} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
