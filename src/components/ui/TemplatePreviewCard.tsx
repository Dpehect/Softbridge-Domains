"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Eye, Sliders } from "lucide-react";
import { TemplateInfo } from "@/data/templatesData";
import { CyberButton } from "./CyberButton";

interface TemplatePreviewCardProps {
  template: TemplateInfo;
  onPreview: (template: TemplateInfo) => void;
  onConfigure: (template: TemplateInfo) => void;
}

export function TemplatePreviewCard({
  template,
  onPreview,
  onConfigure,
}: TemplatePreviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="glass-panel rounded-2xl overflow-hidden flex flex-col group relative border-white/5 hover:border-white/10 transition-all duration-300"
    >
      {/* Background ambient glow matching template theme */}
      <div
        className="absolute -top-20 -right-20 w-44 h-44 rounded-full blur-3xl opacity-10 pointer-events-none transition-all duration-500 group-hover:scale-125"
        style={{
          background: `radial-gradient(circle, ${template.theme.primary} 0%, transparent 70%)`,
        }}
      />

      {/* Auto-scroll Image Container */}
      <div className="h-44 relative overflow-hidden bg-abyss-black border-b border-white/5">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-abyss-black via-transparent to-transparent pointer-events-none" />
        
        {/* Scrolling image mockup */}
        <div className="w-full h-full overflow-hidden relative">
          <img
            src={template.image}
            alt={template.name}
            className="w-full object-cover origin-top absolute top-0 transition-transform duration-[4000ms] ease-in-out group-hover:translate-y-[-30%]"
            style={{ minHeight: "135%" }}
          />
        </div>

        {/* Floating Category Badge */}
        <div className="absolute top-3 left-3 z-20 bg-abyss-black/75 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-heading font-semibold border border-white/10 tracking-wide text-star-white">
          {template.category}
        </div>

        {/* Quick actions overlay */}
        <div className="absolute inset-0 bg-deep-void/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center gap-3">
          <button
            onClick={() => onPreview(template)}
            className="p-3.5 bg-star-white text-deep-void rounded-full hover:scale-115 transition-all cursor-pointer shadow-lg"
            title="Inspect Quick View"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Body Info */}
      <div className="p-4 flex flex-col flex-1 relative z-10 bg-abyss-black/30">
        <div className="flex items-start justify-between mb-2.5">
          <h3 className="text-lg font-heading font-bold text-star-white">
            {template.name}
          </h3>
          <div className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full border border-white/10"
              style={{ backgroundColor: template.theme.primary }}
              title="Primary Accent"
            />
            <span
              className="w-3 h-3 rounded-full border border-white/10"
              style={{ backgroundColor: template.theme.secondary }}
              title="Secondary Accent"
            />
          </div>
        </div>

        <p className="text-xs text-nebula-slate/80 line-clamp-2 mb-3 leading-relaxed">
          {template.description}
        </p>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4 flex-1 items-start">
          {template.features.slice(0, 3).map((f) => (
            <span
              key={f}
              className="text-[10px] bg-white/5 border border-white/5 px-2.5 py-1 rounded-full text-nebula-slate/90 flex items-center gap-1 font-medium"
            >
              <Zap className="w-2.5 h-2.5 text-electric-cyan shrink-0" />
              {f}
            </span>
          ))}
        </div>

        {/* Bottom Panel */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
          <div>
            <div className="text-xl font-bold font-heading text-star-white">
              ${template.price}
            </div>
            <span className="text-[10px] text-nebula-slate/50 block font-semibold tracking-wide">
              SETUP FEE
            </span>
          </div>

          <CyberButton
            onClick={() => onConfigure(template)}
            variant="teal"
            size="sm"
            className="gap-2"
          >
            <Sliders className="w-3.5 h-3.5" />
            Customize
          </CyberButton>
        </div>
      </div>
    </motion.div>
  );
}
