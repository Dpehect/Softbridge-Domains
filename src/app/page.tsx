"use client";

import React from "react";
import AnimatedSlider from "@/components/AnimatedSlider";
import ProductSection from "@/components/ProductSection";
import { CustomCursor } from "@/components/ui/CustomCursor";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-midnight-void">
      {/* Custom Awwwards Cursor */}
      <CustomCursor />

      {/* Animated Slider Hero Section at the very top */}
      <AnimatedSlider />

      {/* Product Section Category Grid directly underneath */}
      <div className="pt-24 pb-32 px-6 md:px-12 flex flex-col w-full relative z-10 max-w-6xl mx-auto">
        <ProductSection />
      </div>
    </main>
  );
}
