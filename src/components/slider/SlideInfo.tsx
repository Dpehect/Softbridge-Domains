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
    <div className="flex flex-col justify-center h-full space-y-4">
      <motion.span layout className="mb-2 h-1 w-8 rounded-full bg-cosmic-teal" />
      <OtherInfo
        data={transitionData ? transitionData : currentSlideData.data}
      />
      <motion.div layout className="mt-5 flex items-center gap-3">
        <button
          className="flex h-11 w-11 items-center justify-center rounded-full bg-cosmic-teal text-black transition duration-300 ease-in-out hover:opacity-80 cursor-pointer"
        >
          <Bookmark className="w-5 h-5 text-black" />
        </button>
        <button
          onClick={onAcquireClick}
          className="w-fit rounded-full border border-white/30 px-7 py-3 text-[10px] font-mono tracking-widest font-bold uppercase transition duration-300 ease-in-out hover:bg-white hover:text-black hover:border-white cursor-pointer"
        >
          View Details
        </button>
      </motion.div>
    </div>
  );
}

export default SlideInfo;
