"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse Coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for high-end watchmaker delay feel
  const springConfig = { stiffness: 450, damping: 28 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".interactive")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Add active cursor class to body to hide default pointer
    document.body.classList.add("custom-cursor-active");

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Ring Cursor */}
      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
        }}
        animate={{
          width: isHovered ? 48 : 28,
          height: isHovered ? 48 : 28,
          borderColor: isHovered ? "var(--color-cosmic-teal)" : "rgba(255, 255, 255, 0.2)",
          backgroundColor: isHovered ? "rgba(0, 245, 230, 0.03)" : "rgba(255, 255, 255, 0)",
        }}
        transition={{ type: "spring", stiffness: 450, damping: 28 }}
        className="fixed pointer-events-none rounded-full border z-[99999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      {/* Inner Dot Cursor */}
      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? "var(--color-sunset-coral)" : "var(--color-cosmic-teal)",
        }}
        className="fixed w-1.5 h-1.5 rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
    </>
  );
}
