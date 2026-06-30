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
    teal: "bg-cosmic-teal text-white border border-cosmic-teal/20 hover:bg-transparent hover:text-cosmic-teal hover:border-cosmic-teal",
    magenta: "bg-sunset-coral text-white border border-sunset-coral/20 hover:bg-transparent hover:text-sunset-coral hover:border-sunset-coral",
    orange: "bg-sunset-coral text-white border border-sunset-coral/20 hover:bg-transparent hover:text-sunset-coral hover:border-sunset-coral",
    slate: "bg-star-white text-midnight-void border border-star-white/20 hover:bg-transparent hover:text-star-white hover:border-star-white",
    glass: "bg-black/5 backdrop-blur-md text-star-white border border-black/5 hover:bg-black/10",
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
