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
            <div className="absolute left-4.5 text-muted-slate/60 pointer-events-none z-10">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full bg-white/55 text-playful-dark placeholder:text-muted-slate/50 text-sm px-4 py-2.5 rounded-xl border border-playful-dark/8 focus:border-creative-teal/40 focus:bg-white focus:shadow-[0_8px_24px_rgba(232,93,59,0.07)] outline-none transition-all duration-300 backdrop-blur-md",
              icon && "pl-12",
              error && "border-creative-magenta/40 focus:border-creative-magenta/60 focus:shadow-[0_8px_30px_rgba(230,0,103,0.06)]",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <span className="text-xs text-creative-magenta mt-2 block font-medium pl-6 animate-pulse">
            {error}
          </span>
        )}
      </div>
    );
  }
);

GlassInput.displayName = "GlassInput";
