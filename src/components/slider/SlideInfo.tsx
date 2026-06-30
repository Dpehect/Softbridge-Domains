import React from "react";
import { motion } from "framer-motion";
import OtherInfo from "./OtherInfo";
import { Bookmark } from "lucide-react";
import { SlideData, CurrentSlideData } from "./BackgroundImage";

type Props = {
  transitionData: SlideData;
  currentSlideData: CurrentSlideData;
  onAcquireClick?: () => void;
};

function SlideInfo({ transitionData, currentSlideData, onAcquireClick }: Props) {
  return (
    <div className="flex flex-col justify-center bg-abyss-panel/90 backdrop-blur-md border border-black/5 rounded-3xl p-6 sm:p-8 md:p-9 shadow-xl space-y-4">
      <motion.span layout className="mb-1 h-1 w-8 rounded-full bg-cosmic-teal" />
      <OtherInfo
        data={transitionData ? transitionData : currentSlideData.data}
      />
      <motion.div layout className="mt-4 flex items-center gap-3">
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-cosmic-teal text-white transition duration-300 ease-in-out hover:opacity-85 cursor-pointer shadow-sm shadow-cosmic-teal/10"
        >
          <Bookmark className="w-4.5 h-4.5 text-white" />
        </button>
        <button
          onClick={onAcquireClick}
          className="w-fit rounded-full border border-black/10 px-6 py-2.5 text-[9px] font-mono tracking-widest font-bold uppercase transition duration-300 ease-in-out hover:bg-star-white hover:text-midnight-void cursor-pointer text-star-white"
        >
          View Details
        </button>
      </motion.div>
    </div>
  );
}

export default SlideInfo;
