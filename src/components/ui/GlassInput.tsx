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
            <div className="absolute left-4 text-muted-text pointer-events-none z-10">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full bg-abyss-black/45 text-star-white placeholder:text-muted-text/50 text-xs md:text-sm px-4 py-3.5 rounded border border-white/5 focus:border-electric-teal/30 focus:ring-0 outline-none transition-all duration-500",
              icon && "pl-11",
              error && "border-red-500/30 focus:border-red-500/50",
              className
            )}
            {...props}
          />
          {/* Subtle bottom line transition indicator on focus */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-electric-teal scale-x-0 origin-left transition-transform duration-500 group-focus-within:scale-x-100" />
        </div>
        {error && (
          <span className="text-[10px] text-red-400 mt-1.5 block font-mono uppercase tracking-wider">
            {error}
          </span>
        )}
      </div>
    );
  }
);

GlassInput.displayName = "GlassInput";
