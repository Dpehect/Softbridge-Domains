"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils/cn";

interface CyberButtonProps extends HTMLMotionProps<"button"> {
  variant?: "cyan" | "purple" | "pink" | "glass";
  glow?: boolean;
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
}

export function CyberButton({
  variant = "cyan",
  glow = true,
  size = "md",
  className,
  children,
  ...props
}: CyberButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-heading font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer cyber-clip";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantStyles = {
    cyan: "bg-electric-cyan text-deep-void hover:bg-star-white hover:shadow-[0_0_20px_rgba(0,242,254,0.6)]",
    purple: "bg-gradient-to-r from-cosmic-purple to-electric-cyan text-star-white hover:brightness-110 hover:shadow-[0_0_20px_rgba(127,0,255,0.6)]",
    pink: "bg-gradient-to-r from-solar-pink to-cosmic-purple text-star-white hover:brightness-110 hover:shadow-[0_0_20px_rgba(255,0,127,0.6)]",
    glass: "bg-white/5 border border-white/10 text-star-white hover:bg-white/10 hover:border-white/20",
  };

  const glowStyles = glow && variant !== "glass" ? (
    variant === "cyan" ? "cyber-glow-cyan" :
    variant === "purple" ? "cyber-glow-purple" : "cyber-glow-pink"
  ) : "";

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], glowStyles, className)}
      {...props}
    >
      {/* Laser Cut Borders for Siberpunk look */}
      <span className="absolute inset-0 border border-white/10 cyber-clip pointer-events-none" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
