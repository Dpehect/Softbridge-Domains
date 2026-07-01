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
    <div className="flex flex-col justify-center bg-abyss-panel/90 backdrop-blur-md border border-black/5 rounded-2xl p-5 sm:p-6 md:p-7 shadow-xl space-y-3">
      <motion.span layout className="mb-1 h-1 w-8 rounded-full bg-cosmic-teal" />
      <OtherInfo
        data={transitionData ? transitionData : currentSlideData.data}
      />
      <motion.div layout className="mt-3 flex items-center gap-3">
        <button
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-cosmic-teal text-white transition duration-300 ease-in-out hover:opacity-85 cursor-pointer shadow-sm shadow-cosmic-teal/10"
        >
          <Bookmark className="w-4 h-4 text-white" />
        </button>
        <button
          onClick={onAcquireClick}
          className="w-fit rounded-xl border border-black/10 px-5 py-2 text-[9px] font-mono font-bold uppercase transition duration-300 ease-in-out hover:bg-star-white hover:text-midnight-void cursor-pointer text-star-white"
        >
          View Details
        </button>
      </motion.div>
    </div>
  );
}

export default SlideInfo;
