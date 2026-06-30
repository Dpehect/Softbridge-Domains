"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils/cn";

interface CyberButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "text" | "glass" | "teal" | "magenta" | "orange" | "slate"; // Maintain backwards-compatibility
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
  const baseStyles = "relative inline-flex items-center justify-center font-sans font-normal tracking-tight transition-colors duration-200 cursor-pointer select-none rounded-full";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs",
    md: "px-4.5 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variantStyles = {
    primary: "bg-apple-blue text-white hover:bg-[#0077ED] shadow-sm",
    secondary: "bg-transparent text-apple-text border border-apple-gray hover:bg-white/5",
    text: "bg-transparent text-apple-blue hover:underline px-0 py-0 rounded-none shadow-none hover:shadow-none font-normal",
    glass: "bg-white/8 border border-white/5 text-apple-text hover:bg-white/12",
    
    // Fallbacks
    teal: "bg-apple-blue text-white hover:bg-[#0077ED]",
    magenta: "bg-apple-blue text-white hover:bg-[#0077ED]",
    orange: "bg-apple-blue text-white hover:bg-[#0077ED]",
    slate: "bg-transparent text-apple-text border border-apple-gray hover:bg-white/5",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-1">{children}</span>
    </motion.button>
  );
}
