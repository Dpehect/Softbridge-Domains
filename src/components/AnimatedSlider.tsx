"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BackgroundImage, { SlideData, CurrentSlideData } from "./slider/BackgroundImage";
import SlideInfo from "./slider/SlideInfo";
import Slides from "./slider/Slides";
import Controls from "./slider/Controls";
import ProductDetailModal from "./ProductDetailModal";

const sliderData: SlideData[] = [
  {
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80",
    location: "AI Cognitive Compiler Node",
    description:
      "Buy Price: $12,500 | MRR: $480/mo | Traffic: 15,000 PV/mo. Fully automated visual assembler layout routing coordinates.",
    title: "QUANTUM.AI",
  },
  {
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80",
    title: "VORTEX.IO",
    description:
      "Buy Price: $8,900 | MRR: $310/mo | Traffic: 8,400 PV/mo. High-speed DNS routing pipeline resolving globally under 15 seconds.",
    location: "Decentralized Nameserver Route",
  },
  {
    img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1920&q=80",
    title: "MATRIX.SPACE",
    description:
      "Buy Price: $5,200 | MRR: $120/mo | Traffic: 4,100 PV/mo. Immersive three-dimensional gallery model linking custom registry maps.",
    location: "WebGL Node Showcase Gallery",
  },
  {
    img: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80",
    title: "FIGMA.COM",
    description:
      "Buy Price: $450,000 | MRR: $18,400/mo | Traffic: 250,000 PV/mo. Premier visual editor enabling layout mockups and developer transitions.",
    location: "Visual Design Collaboration Tool",
  },
  {
    img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1920&q=80",
    title: "ESCROWSPACE.NET",
    description:
      "Buy Price: $9,500 | MRR: $380/mo | Traffic: 9,000 PV/mo. Secure transactional escrow broker resolving names automatically.",
    location: "Automated DNS Transaction Route",
  },
  {
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1920&q=80",
    title: "VERCEL.COM",
    description:
      "Buy Price: $380,000 | MRR: $14,200/mo | Traffic: 180,000 PV/mo. Highly optimized hosting platform with serverless functions.",
    location: "Static App Deployments Platform",
  },
  {
    img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1920&q=80",
    title: "STRIPE.COM",
    description:
      "Buy Price: $520,000 | MRR: $24,100/mo | Traffic: 390,000 PV/mo. Universal API integrations managing credit payouts and secure escrows.",
    location: "Financial Payment Gateway API",
  },
  {
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    title: "DRIBBBLE.COM",
    description:
      "Buy Price: $85,000 | MRR: $3,400/mo | Traffic: 65,000 PV/mo. Designer showroom index listing layout presets and visual portfolios.",
    location: "Design Portfolio Registry Niche",
  },
  {
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    title: "GITHUB.COM",
    description:
      "Buy Price: $620,000 | MRR: $28,900/mo | Traffic: 410,000 PV/mo. Collaborative platform holding repositories, issues, and packaging gates.",
    location: "Code Version Registry Node",
  },
  {
    img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1920&q=80",
    title: "CANVA.COM",
    description:
      "Buy Price: $290,000 | MRR: $9,800/mo | Traffic: 140,000 PV/mo. Visual template builder offering drag-and-drop graphics rendering.",
    location: "Simplified Layout Assembler",
  },
];

const initData = sliderData[0];

export default function AnimatedSlider() {
  const [data, setData] = useState<SlideData[]>(sliderData.slice(1));
  const [transitionData, setTransitionData] = useState<SlideData>(sliderData[0]);
  const [currentSlideData, setCurrentSlideData] = useState<CurrentSlideData>({
    data: initData,
    index: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative h-[85vh] lg:h-screen w-full select-none overflow-hidden text-star-white antialiased border-b border-black/5">
      <AnimatePresence>
        
        {/* Background slide renderer */}
        <BackgroundImage
          transitionData={transitionData}
          currentSlideData={currentSlideData}
        />

        {/* Warm and dark overlay katmanı */}
        <div className="absolute inset-0 z-15 bg-[#2E1810]/65 pointer-events-none" />

        {/* Contents grid over background */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12 pt-28 px-6 md:px-12">
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end h-full">
            
            {/* Left Column: Active details label info */}
            <div className="lg:col-span-5 flex flex-col justify-end h-full pb-4">
              <SlideInfo
                transitionData={transitionData}
                currentSlideData={currentSlideData}
                onAcquireClick={() => setIsModalOpen(true)}
              />
            </div>

            {/* Right Column: Slide stack listing and controls */}
            <div className="lg:col-span-7 flex flex-col justify-end space-y-4">
              <Slides data={data} />
              <Controls
                currentSlideData={currentSlideData}
                data={data}
                transitionData={transitionData}
                initData={initData}
                handleData={setData}
                handleTransitionData={setTransitionData}
                handleCurrentSlideData={setCurrentSlideData}
                sliderData={sliderData}
              />
            </div>

          </div>
        </div>

      </AnimatePresence>

      {/* Overlay Slide Details Dialog Modal */}
      <ProductDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={currentSlideData.data}
      />

    </div>
  );
}
