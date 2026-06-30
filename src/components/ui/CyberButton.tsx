"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils/cn";

interface CyberButtonProps extends HTMLMotionProps<"button"> {
  variant?: "teal" | "steel" | "dark" | "glass";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
}

export function CyberButton({
  variant = "teal",
  size = "md",
  className,
  children,
  ...props
}: CyberButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-heading font-bold uppercase tracking-widest transition-all duration-500 active:scale-98 cursor-pointer select-none rounded";

  const sizeStyles = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-5.5 py-3 text-xs",
    lg: "px-7 py-4 text-sm",
  };

  const variantStyles = {
    teal: "bg-electric-teal text-deep-void hover:bg-star-white hover:shadow-[0_0_20px_rgba(0,229,216,0.3)] transition-shadow duration-300",
    steel: "bg-transparent text-star-white border border-white/10 hover:border-electric-teal/40 hover:bg-white/[0.02]",
    dark: "bg-abyss-black text-star-white border border-white/5 hover:border-white/10 hover:bg-white/[0.01]",
    glass: "bg-white/[0.02] border border-white/5 text-star-white hover:bg-white/[0.04] hover:border-white/10",
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {/* Decorative architectural layout line inside the button */}
      <span className="absolute top-0 left-2 right-2 h-[1px] bg-white/[0.03]" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
