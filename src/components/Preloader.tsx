"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import siteData from "@/data/siteData.json";

export function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the preloader after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const floors = Array.from({ length: 6 });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-midnight-void overflow-hidden"
        >
          {/* Subtle background grid */}
          <div 
            className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
            style={{ 
              backgroundImage: "linear-gradient(#E85D3B 1px, transparent 1px), linear-gradient(90deg, #E85D3B 1px, transparent 1px)", 
              backgroundSize: "60px 60px",
              backgroundPosition: "center"
            }} 
          />
          
          <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
            
            {/* The Building Animation */}
            <div className="relative flex flex-col-reverse items-center justify-start h-[240px] mb-8">
              {floors.map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0, opacity: 0, y: 20 }}
                  animate={{ height: 32, opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: i * 0.25, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="w-24 border-2 border-cosmic-teal bg-cosmic-teal/10 shadow-[0_0_15px_rgba(232,93,59,0.3)] mb-1 relative overflow-hidden"
                >
                  {/* Glass reflection effect inside floors */}
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{ duration: 1.5, delay: i * 0.25 + 0.3, ease: "linear" }}
                    className="absolute inset-0 w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                  />
                </motion.div>
              ))}
              
              {/* Ground line */}
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 200, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-1 bg-star-white w-[200px] rounded-full absolute -bottom-2"
              />
            </div>

            {/* Title Text */}
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-3xl md:text-5xl font-bold tracking-widest uppercase text-star-white mb-2 text-center"
              >
                {siteData.settings.companyName}
              </motion.h1>
            </div>

            {/* Subtitle / Progress */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="flex items-center gap-3 mt-4"
            >
              <div className="w-2 h-2 rounded-full bg-cosmic-teal animate-pulse" />
              <span className="font-mono text-xs md:text-sm text-muted-steel uppercase tracking-[0.3em]">
                {siteData.settings.preloadText}...
              </span>
            </motion.div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
