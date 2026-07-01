"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useConfiguratorStore } from "@/store/useConfiguratorStore";
import { LivePreviewViewport } from "./LivePreviewViewport";

type StudioLivePreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function StudioLivePreviewModal({ isOpen, onClose }: StudioLivePreviewModalProps) {
  const { config } = useConfiguratorStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-[90vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-black/8 bg-[#FDF0E6] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-black/8 bg-[#F8E4D3]/85 px-4 py-3 backdrop-blur-md">
              <div className="min-w-0">
                <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-cosmic-teal">
                  Studio Live Preview
                </span>
                <h2 className="truncate text-sm font-bold text-star-white">
                  {config.brandName || config.templateName || "Untitled Studio Build"}
                </h2>
              </div>

              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-black/8 bg-black/[0.04] text-star-white/70 transition-colors hover:bg-black/[0.08] hover:text-star-white"
                title="Close preview"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="min-h-0 flex-1 bg-black/[0.04] p-3 md:p-4">
              <LivePreviewViewport />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
