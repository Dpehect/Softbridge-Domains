"use client";

import React from "react";
import { cn } from "@/utils/cn";

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: React.ReactNode;
}

export const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, error, icon, ...props }, ref) => {
    return (
      <div className="w-full relative">
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-4 text-nebula-slate pointer-events-none z-10">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full bg-glassy-night text-star-white placeholder:text-nebula-slate/60 text-sm md:text-base px-5 py-3.5 rounded-xl border border-white/5 focus:border-electric-cyan/40 focus:ring-1 focus:ring-electric-cyan/30 focus:shadow-[0_0_15px_rgba(0,242,254,0.15)] outline-none transition-all duration-300 backdrop-blur-md",
              icon && "pl-12",
              error && "border-solar-pink/50 focus:border-solar-pink/60 focus:ring-solar-pink/30 focus:shadow-[0_0_15px_rgba(255,0,127,0.15)]",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <span className="text-xs text-solar-pink mt-1.5 block font-medium animate-pulse">
            {error}
          </span>
        )}
      </div>
    );
  }
);

GlassInput.displayName = "GlassInput";
