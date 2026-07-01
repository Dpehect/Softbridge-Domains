"use client";

import React, { useState } from "react";
import { useConfiguratorStore, ConfiguredPage, WebTemplateConfig } from "@/store/useConfiguratorStore";
import { Sliders, Type, Palette, FolderGit, Layout, Settings, Trash2, ArrowUp, ArrowDown, Plus, Sparkles } from "lucide-react";
import { GlassInput } from "../ui/GlassInput";
import { motion, AnimatePresence } from "framer-motion";

type ConfigTab = "brand" | "style" | "pages" | "content";
type ThemeColorKey = keyof WebTemplateConfig["theme"];

export function ConfigSidebar() {
  const { config, updateBrandInfo, updateThemeColors, updateTypography, setPages, updateSectionContent, setAnimationProfile } = useConfiguratorStore();
  const [activeTab, setActiveTab] = useState<ConfigTab>("brand");

  // Style Presets
  const presets = [
    { name: "Cedar Clay", primary: "#E85D3B", secondary: "#D94F2E", bg: "#FDF0E6" },
    { name: "Harbor Blue", primary: "#315C7C", secondary: "#7096A5", bg: "#F3F7F8" },
    { name: "Willow Green", primary: "#0F9F6E", secondary: "#0B6B52", bg: "#F0F8F2" },
    { name: "Main Street", primary: "#2F3437", secondary: "#8C6A55", bg: "#F7F3EC" },
  ];

  // Font choices
  const headingsFonts = ["Geist", "System", "Inter", "Outfit"];
  const bodyFonts = ["Geist", "System", "Inter"];

  // Page reordering helper
  const movePage = (index: number, direction: "up" | "down") => {
    const updated = [...config.pages];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= updated.length) return;

    // Swap
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    setPages(updated);
  };

  const deletePage = (id: string) => {
    if (config.pages.length <= 1) return; // Keep at least one page
    setPages(config.pages.filter((p) => p.id !== id));
  };

  const addNewPage = () => {
    const newId = `page-${Date.now()}`;
    const newPage: ConfiguredPage = {
      id: newId,
      title: "New Local Page",
      path: `/${newId}`,
      sections: [
        {
          id: `hero-${newId}`,
          type: "hero",
          title: "Hero Banner",
          content: {
            heading: "Local Destination",
            subheading: "Define your new page content here.",
            buttonText: "Continue",
          },
        },
      ],
    };
    setPages([...config.pages, newPage]);
  };

  // State to manage section content editing
  const [selectedPageId, setSelectedPageId] = useState(config.pages[0]?.id || "");
  const [selectedSectionId, setSelectedSectionId] = useState(config.pages[0]?.sections[0]?.id || "");

  const activePage = config.pages.find((p) => p.id === selectedPageId) || config.pages[0];
  const activeSection = activePage?.sections.find((s) => s.id === selectedSectionId) || activePage?.sections[0];
  const effectivePageId = activePage?.id || "";
  const effectiveSectionId = activeSection?.id || "";
  const colorControls: Array<{ label: string; key: ThemeColorKey }> = [
    { label: "Primary Accent", key: "primary" },
    { label: "Secondary Accent", key: "secondary" },
    { label: "Page Background", key: "bg" },
  ];
  const tabs: Array<{ id: ConfigTab; icon: React.ReactNode; label: string }> = [
    { id: "brand", icon: <Sliders className="w-4 h-4" />, label: "Identity" },
    { id: "style", icon: <Palette className="w-4 h-4" />, label: "Aesthetics" },
    { id: "pages", icon: <FolderGit className="w-4 h-4" />, label: "Sitemap" },
    { id: "content", icon: <Layout className="w-4 h-4" />, label: "Copydeck" },
  ];

  return (
    <div className="w-full h-full flex flex-col glass-panel rounded-2xl border-white/5 overflow-hidden">
      {/* Editor Tabs bar */}
      <div className="flex border-b border-white/5 bg-black/25">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 flex flex-col items-center gap-1 text-[10px] font-heading font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
              activeTab === tab.id
                ? "border-electric-cyan text-electric-cyan bg-white/5"
                : "border-transparent text-nebula-slate hover:text-star-white"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Accordion Panels container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence mode="wait">
          {activeTab === "brand" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <div>
                <h3 className="text-sm font-heading font-bold text-star-white mb-1 uppercase tracking-wider">Brand Name</h3>
                <p className="text-xs text-nebula-slate mb-2">Visible across navigation decks and copyrights.</p>
                <GlassInput
                  value={config.brandName}
                  onChange={(e) => updateBrandInfo(e.target.value, config.slogan, config.logo)}
                  placeholder="e.g. Oakridge Diner"
                />
              </div>

              <div>
                <h3 className="text-sm font-heading font-bold text-star-white mb-1 uppercase tracking-wider">Operational Slogan</h3>
                <p className="text-xs text-nebula-slate mb-2">Subheading placed on critical landing interfaces.</p>
                <GlassInput
                  value={config.slogan}
                  onChange={(e) => updateBrandInfo(config.brandName, e.target.value, config.logo)}
                  placeholder="e.g. Fresh pies and coffee on Main Street"
                />
              </div>

              <div>
                <h3 className="text-sm font-heading font-bold text-star-white mb-1 uppercase tracking-wider">Logo Vector</h3>
                <p className="text-xs text-nebula-slate mb-2">Custom image URL (e.g. PNG / SVG) for brand mark.</p>
                <GlassInput
                  value={config.logo}
                  onChange={(e) => updateBrandInfo(config.brandName, config.slogan, e.target.value)}
                  placeholder="https://domain.com/logo.svg"
                />
              </div>
            </motion.div>
          )}

          {activeTab === "style" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {/* Presets */}
              <div>
                <h3 className="text-sm font-heading font-bold text-star-white mb-2.5 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-electric-cyan animate-pulse" />
                  Siber Presets
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {presets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() =>
                        updateThemeColors({ primary: preset.primary, secondary: preset.secondary, bg: preset.bg })
                      }
                      className="glass-panel p-3 rounded-xl text-left hover:border-white/20 transition-all group flex flex-col gap-2 cursor-pointer"
                    >
                      <span className="text-xs font-bold text-star-white group-hover:text-electric-cyan transition-colors">
                        {preset.name}
                      </span>
                      <div className="flex gap-1">
                        <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: preset.primary }} />
                        <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: preset.secondary }} />
                        <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: preset.bg }} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-[1px] bg-white/5" />

              {/* Custom Colors */}
              <div>
                <h3 className="text-sm font-heading font-bold text-star-white mb-2.5 uppercase tracking-wider">Custom Spectrum</h3>
                <div className="space-y-2.5">
                  {colorControls.map((colorObj) => (
                    <div key={colorObj.key} className="flex items-center justify-between bg-white/5 px-3 py-2 rounded-xl border border-white/5">
                      <span className="text-xs text-nebula-slate font-medium">{colorObj.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-star-white">
                          {config.theme[colorObj.key]}
                        </span>
                        <input
                          type="color"
                          value={config.theme[colorObj.key]}
                          onChange={(e) =>
                            updateThemeColors({
                              ...config.theme,
                              [colorObj.key]: e.target.value,
                            })
                          }
                          className="w-7 h-7 bg-transparent border-none cursor-pointer outline-none rounded"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-[1px] bg-white/5" />

              {/* Typography */}
              <div>
                <h3 className="text-sm font-heading font-bold text-star-white mb-2.5 uppercase tracking-wider flex items-center gap-1">
                  <Type className="w-4 h-4 text-electric-cyan" /> Typography
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-nebula-slate block mb-1.5 font-medium">Heading Family</span>
                    <select
                      value={config.typography.headings}
                      onChange={(e) => updateTypography({ headings: e.target.value, body: config.typography.body })}
                      className="w-full bg-glassy-night border border-white/10 rounded-xl px-3 py-2.5 text-sm text-star-white outline-none focus:border-electric-cyan/50"
                    >
                      {headingsFonts.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <span className="text-xs text-nebula-slate block mb-1.5 font-medium">Body Font Family</span>
                    <select
                      value={config.typography.body}
                      onChange={(e) => updateTypography({ headings: config.typography.headings, body: e.target.value })}
                      className="w-full bg-glassy-night border border-white/10 rounded-xl px-3 py-2.5 text-sm text-star-white outline-none focus:border-electric-cyan/50"
                    >
                      {bodyFonts.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "pages" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-heading font-bold text-star-white uppercase tracking-wider">Site Mapping</h3>
                <button
                  onClick={addNewPage}
                  className="p-2 bg-electric-cyan/15 text-electric-cyan hover:bg-electric-cyan hover:text-deep-void rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add
                </button>
              </div>

              {/* Pages List */}
              <div className="space-y-3">
                {config.pages.map((page, idx) => (
                  <div
                    key={page.id}
                    className="glass-panel px-3 py-2.5 rounded-xl flex items-center justify-between border-white/5 hover:border-white/10 transition-all"
                  >
                    <div>
                      <span className="text-xs font-bold text-star-white block">{page.title}</span>
                      <span className="text-[10px] text-nebula-slate/60 font-mono">{page.path}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => movePage(idx, "up")}
                        disabled={idx === 0}
                        className="p-1.5 bg-white/5 text-nebula-slate hover:text-star-white disabled:opacity-30 rounded cursor-pointer"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => movePage(idx, "down")}
                        disabled={idx === config.pages.length - 1}
                        className="p-1.5 bg-white/5 text-nebula-slate hover:text-star-white disabled:opacity-30 rounded cursor-pointer"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deletePage(page.id)}
                        disabled={config.pages.length <= 1}
                        className="p-1.5 bg-solar-pink/15 text-solar-pink hover:bg-solar-pink hover:text-white disabled:opacity-30 rounded cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "content" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {/* Select Page and Section to edit */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-nebula-slate uppercase tracking-wider block mb-1 font-bold">Select Page</span>
                  <select
                    value={effectivePageId}
                    onChange={(e) => setSelectedPageId(e.target.value)}
                    className="w-full bg-glassy-night border border-white/5 rounded-lg p-2 text-xs text-star-white outline-none"
                  >
                    {config.pages.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <span className="text-[10px] text-nebula-slate uppercase tracking-wider block mb-1 font-bold">Select Section</span>
                  <select
                    value={effectiveSectionId}
                    onChange={(e) => setSelectedSectionId(e.target.value)}
                    className="w-full bg-glassy-night border border-white/5 rounded-lg p-2 text-xs text-star-white outline-none"
                  >
                    {activePage?.sections.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="h-[1px] bg-white/5" />

              {/* Editing Form fields */}
              {activeSection ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] bg-electric-cyan/20 text-electric-cyan px-2 py-0.5 rounded-full border border-electric-cyan/30 uppercase font-black tracking-wider font-mono">
                      Type: {activeSection.type}
                    </span>
                  </div>

                  {activeSection.content.heading !== undefined && (
                    <div>
                      <span className="text-xs text-nebula-slate block mb-1.5 font-bold uppercase tracking-wide">Heading Text</span>
                      <GlassInput
                        value={activeSection.content.heading}
                        onChange={(e) =>
                          updateSectionContent(effectivePageId, effectiveSectionId, { heading: e.target.value })
                        }
                      />
                    </div>
                  )}

                  {activeSection.content.subheading !== undefined && (
                    <div>
                      <span className="text-xs text-nebula-slate block mb-1.5 font-bold uppercase tracking-wide">Subheading text</span>
                      <textarea
                        value={activeSection.content.subheading}
                        onChange={(e) =>
                          updateSectionContent(effectivePageId, effectiveSectionId, { subheading: e.target.value })
                        }
                        rows={3}
                        className="w-full bg-glassy-night text-star-white text-sm px-3 py-2.5 rounded-xl border border-white/5 focus:border-electric-cyan/40 outline-none transition-all"
                      />
                    </div>
                  )}

                  {activeSection.content.description !== undefined && (
                    <div>
                      <span className="text-xs text-nebula-slate block mb-1.5 font-bold uppercase tracking-wide">Main Description</span>
                      <textarea
                        value={activeSection.content.description}
                        onChange={(e) =>
                          updateSectionContent(effectivePageId, effectiveSectionId, { description: e.target.value })
                        }
                        rows={4}
                        className="w-full bg-glassy-night text-star-white text-sm px-3 py-2.5 rounded-xl border border-white/5 focus:border-electric-cyan/40 outline-none transition-all"
                      />
                    </div>
                  )}

                  {activeSection.content.buttonText !== undefined && (
                    <div>
                      <span className="text-xs text-nebula-slate block mb-1.5 font-bold uppercase tracking-wide">Action Button Text</span>
                      <GlassInput
                        value={activeSection.content.buttonText}
                        onChange={(e) =>
                          updateSectionContent(effectivePageId, effectiveSectionId, { buttonText: e.target.value })
                        }
                      />
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xs text-nebula-slate text-center">Please select a valid section in sitemap deck to edit its contents.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Animation Profile setting */}
      <div className="p-4 border-t border-white/5 bg-black/25 flex items-center justify-between">
        <span className="text-[10px] text-nebula-slate uppercase tracking-wider font-bold flex items-center gap-1.5">
          <Settings className="w-3.5 h-3.5" /> Kinetic Speed
        </span>
        <div className="flex bg-white/5 p-0.5 rounded-lg border border-white/5">
          {(["smooth", "cyber", "fluid"] as const).map((profile) => (
            <button
              key={profile}
              onClick={() => setAnimationProfile(profile)}
              className={`px-3 py-1.5 rounded-md text-[10px] font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                config.animationProfile === profile ? "bg-electric-cyan text-white" : "text-nebula-slate hover:text-star-white"
              }`}
            >
              {profile}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
