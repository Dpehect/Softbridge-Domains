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
            <div className="absolute left-4.5 text-apple-gray pointer-events-none z-10">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full bg-apple-card text-apple-text placeholder:text-apple-gray/50 text-sm px-5 py-3.5 rounded-lg border border-apple-border focus:border-apple-blue focus:ring-1 focus:ring-apple-blue outline-none transition-all duration-200",
              icon && "pl-11",
              error && "border-red-500/30 focus:border-red-500/50",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <span className="text-xs text-red-500 mt-2 block font-normal pl-6">
            {error}
          </span>
        )}
      </div>
    );
  }
);

GlassInput.displayName = "GlassInput";
