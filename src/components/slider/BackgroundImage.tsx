import React from "react";
import { motion } from "framer-motion";

export type SlideData = {
  img: string;
  title: string;
  description: string;
  location: string;
};

export type CurrentSlideData = {
  data: SlideData;
  index: number;
};

type Props = {
  transitionData: SlideData;
  currentSlideData: CurrentSlideData;
};

function BackgroundImage({ transitionData, currentSlideData }: Props) {
  return (
    <>
      {transitionData && (
        <motion.img
          key={transitionData.img}
          layoutId={transitionData.img}
          alt="Transition Image"
          transition={{
            opacity: { ease: "linear" },
            layout: { duration: 0.6 },
          }}
          className="absolute left-0 top-0 z-10 h-full w-full object-cover brightness-[0.40]"
          src={transitionData.img}
        />
      )}
      <motion.img
        alt="Current Image"
        key={currentSlideData.data.img + "transition"}
        src={currentSlideData.data.img}
        className="absolute left-0 top-0 h-full w-full object-cover brightness-[0.40]"
      />
    </>
  );
}

export default BackgroundImage;
