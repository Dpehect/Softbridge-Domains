"use client";

import React from "react";
import { cn } from "@/utils/cn";

interface NeonBadgeProps {
  variant?: "success" | "warning" | "error" | "info" | "premium";
  children: React.ReactNode;
  className?: string;
}

export function NeonBadge({ variant = "info", children, className }: NeonBadgeProps) {
  const baseStyles = "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border backdrop-blur-md";

  const variants = {
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.1)]",
    error: "bg-solar-pink/10 text-solar-pink border-solar-pink/30 shadow-[0_0_10px_rgba(255,0,127,0.1)]",
    info: "bg-electric-cyan/10 text-electric-cyan border-electric-cyan/30 shadow-[0_0_10px_rgba(0,242,254,0.1)]",
    premium: "bg-gradient-to-r from-solar-pink/20 to-cosmic-purple/20 text-star-white border-cosmic-purple/40 shadow-[0_0_12px_rgba(127,0,255,0.2)] animate-pulse",
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)}>
      <span className={cn(
        "w-1.5 h-1.5 rounded-full mr-2",
        variant === "success" && "bg-emerald-400",
        variant === "warning" && "bg-amber-400",
        variant === "error" && "bg-solar-pink",
        variant === "info" && "bg-electric-cyan",
        variant === "premium" && "bg-cosmic-purple animate-ping"
      )} />
      {children}
    </span>
  );
}
