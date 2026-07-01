"use client";

import React from "react";
import AnimatedSlider from "@/components/AnimatedSlider";
import ProductSection from "@/components/ProductSection";
import DomainTeaser from "@/components/DomainTeaser";
import SoftbridgeStudio from "@/components/SoftbridgeStudio";
import { CustomCursor } from "@/components/ui/CustomCursor";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-midnight-void">
      {/* Custom Awwwards Cursor */}
      <CustomCursor />

      {/* Animated Slider Hero Section at the very top */}
      <AnimatedSlider />

      {/* Main content sections */}
      <div className="pt-10 pb-12 px-4 md:px-8 flex flex-col w-full relative z-10 max-w-6xl mx-auto space-y-10">

        {/* Featured product layouts grid */}
        <ProductSection />

        {/* Domain browser teaser with search + spotlight domains */}
        <DomainTeaser />

        {/* Softbridge Studio: Step-by-Step Custom Site Builder */}
        <SoftbridgeStudio />

      </div>
    </main>
  );
}
