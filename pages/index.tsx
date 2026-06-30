import { Righteous } from "next/font/google";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Header from "@/components/Header";
import BackgroundImage from "@/components/BackgroundImage";
import Slides from "@/components/Slides";
import SlideInfo from "@/components/SlideInfo";
import Controls from "@/components/Controls";

const inter = Righteous({
  subsets: ["latin"],
  weight: ["400"],
});
export type Data = {
  img: string;
  title: string;
  description: string;
  location: string;
};

export type CurrentSlideData = {
  data: Data;
  index: number;
};

export default function Home() {
  const [data, setData] = React.useState<Data[]>(sliderData.slice(1));
  const [transitionData, setTransitionData] = React.useState<Data>(
    sliderData[0]
  );
  const [currentSlideData, setCurrentSlideData] =
    React.useState<CurrentSlideData>({
      data: initData,
      index: 0,
    });

  return (
    <main
      className={`
       ${inter.className}
        relative min-h-screen select-none overflow-hidden text-white antialiased`}
    >
      <AnimatePresence>
        <BackgroundImage
          transitionData={transitionData}
          currentSlideData={currentSlideData}
        />
        <div className="  absolute z-20  h-full w-full">
          <Header />
          <div className=" flex h-full w-full grid-cols-10 flex-col md:grid">
            <div className=" col-span-4 mb-3 flex h-full flex-1 flex-col justify-end px-5 md:mb-0 md:justify-center md:px-10">
              <SlideInfo
                transitionData={transitionData}
                currentSlideData={currentSlideData}
              />
            </div>
            <div className=" col-span-6 flex h-full flex-1 flex-col justify-start p-4 md:justify-center md:p-10">
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
    </main>
  );
}

const sliderData = [
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
    img: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=1920&q=80",
    title: "AETHER.DESIGN",
    description:
      "Buy Price: $14,000 | MRR: $590/mo | Traffic: 22,000 PV/mo. Custom theme assembler offering vector sitemap export structures.",
    location: "Interactive Canvas Builder",
  },
  {
    img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1920&q=80",
    title: "ESCROWSPACE.NET",
    description:
      "Buy Price: $9,500 | MRR: $380/mo | Traffic: 9,000 PV/mo. Secure transactional escrow broker resolving names automatically.",
    location: "Automated DNS Transaction Route",
  },
];

const initData = sliderData[0];
