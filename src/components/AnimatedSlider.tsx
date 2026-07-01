"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BackgroundImage, { SlideData, CurrentSlideData } from "./slider/BackgroundImage";
import SlideInfo from "./slider/SlideInfo";
import Slides from "./slider/Slides";
import Controls from "./slider/Controls";
import ProductDetailModal from "./ProductDetailModal";
import siteData from "@/data/siteData.json";

// Extract one domain per category to ensure a diverse set of images
const uniqueCategories = new Set<string>();
const sliderData: SlideData[] = [];

for (const domain of siteData.domains) {
  if (sliderData.length >= 7) break; // Limit to 7 slides for optimal UX
  if (!uniqueCategories.has(domain.category) && domain.image) {
    uniqueCategories.add(domain.category);
    sliderData.push({
      img: domain.image,
      location: domain.fullDomain,
      title: domain.name.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
      description: `Buy Price: $${domain.price} | MRR: $${domain.mrr || 0}/mo | Traffic: ${domain.monthlyTraffic || 0} PV/mo. ${domain.description}`,
    });
  }
}


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
    <div className="relative h-[76vh] min-h-[620px] lg:h-[88vh] w-full select-none overflow-hidden text-star-white antialiased border-b border-black/5">
      <AnimatePresence>
        
        {/* Background slide renderer */}
        <BackgroundImage
          key="background-images"
          transitionData={transitionData}
          currentSlideData={currentSlideData}
        />

        {/* Warm and dark overlay katmanı */}
        <div key="warm-overlay" className="absolute inset-0 z-15 bg-[#2E1810]/65 pointer-events-none" />

        {/* Contents grid over background */}
        <div key="slider-content" className="absolute inset-0 z-20 flex flex-col justify-end pb-8 pt-24 pl-4 pr-0 md:pl-[max(2.5rem,calc((100vw-72rem)/2))] md:pr-0">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-end h-full">
            
            {/* Left Column: Active details label info */}
            <div className="lg:col-span-5 flex flex-col justify-end h-full pb-2">
              <SlideInfo
                transitionData={transitionData}
                currentSlideData={currentSlideData}
                onAcquireClick={() => setIsModalOpen(true)}
              />
            </div>

            {/* Right Column: Slide stack listing and controls */}
            <div className="lg:col-span-7 flex flex-col justify-end space-y-3">
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
