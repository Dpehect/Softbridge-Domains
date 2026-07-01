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
    location: "cedardesk.app",
    description:
      "Buy Price: $2,400 | MRR: $120/mo | Traffic: 2,400 PV/mo. Scheduling and job tracking name for a small service shop.",
    title: "Cedar Desk",
  },
  {
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80",
    title: "Oakridge Diner",
    description:
      "Buy Price: $2,250 | MRR: $95/mo | Traffic: 2,600 PV/mo. Classic diner domain with a warm local business fit.",
    location: "oakridgediner.com",
  },
  {
    img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1920&q=80",
    title: "Elm Street Studio",
    description:
      "Buy Price: $1,700 | MRR: $60/mo | Traffic: 1,500 PV/mo. Portfolio identity for a local designer, maker, or print studio.",
    location: "elmstreetstudio.com",
  },
  {
    img: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80",
    title: "Stonebridge Print Co.",
    description:
      "Buy Price: $1,850 | MRR: $65/mo | Traffic: 1,400 PV/mo. Print shop and local studio domain with clear service intent.",
    location: "stonebridgeprintco.com",
  },
  {
    img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1920&q=80",
    title: "Cedar Hollow Cafe",
    description:
      "Buy Price: $2,100 | MRR: $80/mo | Traffic: 2,200 PV/mo. Cafe and bakery name that feels established but approachable.",
    location: "cedarhollowcafe.com",
  },
  {
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1920&q=80",
    title: "Riverbend Reports",
    description:
      "Buy Price: $2,600 | MRR: $135/mo | Traffic: 3,100 PV/mo. Reporting dashboard brand for regional operations.",
    location: "riverbendreports.com",
  },
  {
    img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1920&q=80",
    title: "Willow Creek Market",
    description:
      "Buy Price: $3,200 | MRR: $160/mo | Traffic: 5,100 PV/mo. General store brand for groceries, gifts, and local goods.",
    location: "willowcreekmarket.com",
  },
  {
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    title: "Porchlight Journal",
    description:
      "Buy Price: $1,200 | MRR: $45/mo | Traffic: 1,800 PV/mo. Local essay and community writing brand with newsletter potential.",
    location: "porchlightjournal.com",
  },
  {
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    title: "Barnlight Labs",
    description:
      "Buy Price: $2,400 | MRR: $120/mo | Traffic: 2,600 PV/mo. Small product team name with a quiet workshop feel.",
    location: "barnlightlabs.com",
  },
  {
    img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1920&q=80",
    title: "Maple Grove Bakery",
    description:
      "Buy Price: $2,800 | MRR: $145/mo | Traffic: 4,200 PV/mo. Local bakery storefront with catalog and pickup potential.",
    location: "maplegrovebakery.com",
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
        <div key="slider-content" className="absolute inset-0 z-20 flex flex-col justify-end pb-8 pt-24 px-4 md:px-10">
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-end h-full">
            
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
