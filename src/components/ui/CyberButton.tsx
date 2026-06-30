"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils/cn";

interface CyberButtonProps extends HTMLMotionProps<"button"> {
  variant?: "teal" | "magenta" | "orange" | "slate" | "glass";
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
  const baseStyles = "relative inline-flex items-center justify-center font-heading font-extrabold tracking-wider transition-all duration-300 active:scale-95 cursor-pointer select-none rounded-full shadow-sm hover:shadow-md";

  const sizeStyles = {
    sm: "px-4.5 py-2 text-xs",
    md: "px-6 py-3 text-xs md:text-sm",
    lg: "px-8 py-4 text-sm md:text-base",
  };

  const variantStyles = {
    teal: "bg-creative-teal text-playful-dark hover:bg-white hover:text-creative-teal border border-creative-teal/20",
    magenta: "bg-creative-magenta text-white hover:bg-white hover:text-creative-magenta border border-creative-magenta/20",
    orange: "bg-creative-orange text-white hover:bg-white hover:text-creative-orange border border-creative-orange/20",
    slate: "bg-playful-dark text-white hover:bg-white hover:text-playful-dark border border-playful-dark/20",
    glass: "bg-white/40 backdrop-blur-md text-playful-dark border border-white/60 hover:bg-white/60",
  };

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ y: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 450, damping: 18 }} // Playful spring
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
