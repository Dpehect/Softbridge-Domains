"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils/cn";

interface CyberButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "text" | "glass" | "teal" | "magenta" | "orange" | "slate"; // Maintain other string keys for backwards-compatibility on other pages
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
}

export function CyberButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CyberButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-heading font-medium tracking-wide transition-all duration-350 active:scale-98 cursor-pointer select-none rounded-full";

  const sizeStyles = {
    sm: "px-4.5 py-1.5 text-xs",
    md: "px-5.5 py-2.5 text-xs md:text-sm",
    lg: "px-7 py-3.5 text-sm md:text-base",
  };

  const variantStyles = {
    primary: "bg-star-white text-apple-black hover:bg-[#E8E8ED] shadow-sm",
    secondary: "bg-transparent text-star-white border border-white/20 hover:border-white/40 hover:bg-white/[0.02]",
    text: "bg-transparent text-apple-teal hover:underline px-0 py-0 rounded-none shadow-none hover:shadow-none",
    glass: "bg-white/[0.04] border border-white/5 text-star-white hover:bg-white/[0.08] hover:border-white/10",
    
    // Backwards-compatibility mappings to prevent TS compile breaks on other routes
    teal: "bg-star-white text-apple-black hover:bg-[#E8E8ED]",
    magenta: "bg-star-white text-apple-black hover:bg-[#E8E8ED]",
    orange: "bg-star-white text-apple-black hover:bg-[#E8E8ED]",
    slate: "bg-transparent text-star-white border border-white/20 hover:border-white/40",
  };

  return (
    <motion.button
      whileHover={{ scale: variant === "text" ? 1 : 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-1.5">{children}</span>
    </motion.button>
  );
}
