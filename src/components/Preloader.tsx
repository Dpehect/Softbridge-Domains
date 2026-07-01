"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import siteData from "@/data/siteData.json";
import { Layers } from "lucide-react";

export function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the preloader after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
        >
          {/* Background grid lines for a 'Coordinates' feel */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(#E85D3B 1px, transparent 1px), linear-gradient(90deg, #E85D3B 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center justify-center"
          >
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="w-16 h-16 rounded-2xl border border-[#E85D3B]/40 flex items-center justify-center mb-6 bg-black/50 shadow-[0_0_30px_rgba(232,93,59,0.2)]"
            >
              <Layers className="w-8 h-8 text-[#E85D3B]" />
            </motion.div>

            <motion.h1 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-display text-2xl md:text-4xl font-bold tracking-widest uppercase text-white mb-2"
            >
              {siteData.settings.preloadTheme}
            </motion.h1>

            <motion.p 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="font-mono text-xs md:text-sm text-[#E85D3B]/80 uppercase tracking-[0.3em]"
            >
              {siteData.settings.preloadText}...
            </motion.p>
            
            {/* Loading Bar */}
            <div className="mt-8 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: "0%" }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 2, ease: "easeInOut" }}
                 className="h-full bg-[#E85D3B] rounded-full"
               />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
