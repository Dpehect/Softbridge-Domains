import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SlideData } from "./BackgroundImage";

const MotionImage = motion.create(Image);

type Props = {
  data: SlideData;
};

function SliderCard({ data }: Props) {
  return (
    <motion.div
      className="relative h-40 min-w-[190px] rounded-2xl shadow-md border border-white/5 overflow-hidden group/card md:h-60 md:min-w-[176px] snap-center shrink-0"
      layout
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        },
      }}
      exit={{ scale: 0.85, opacity: 0, transition: { duration: 0.3 } }}
      transition={{
        type: "spring",
        damping: 24,
        stiffness: 160,
      }}
    >
      <MotionImage
        layoutId={data.img}
        alt="Transition Image"
        src={data.img}
        fill
        className="absolute h-full w-full object-cover brightness-[0.70] group-hover/card:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      
      <motion.div className="absolute z-10 flex h-full items-end p-3.5">
        <motion.div>
          <motion.div
            layout
            className="mb-1.5 h-[2px] w-4 rounded-full bg-cosmic-teal"
          ></motion.div>
          <motion.p layoutId={data.location} className="text-[9px] font-mono uppercase tracking-wider text-muted-steel">
            {data.location}
          </motion.p>
          <motion.h1
            layoutId={data.title}
            className="text-base font-bold text-white leading-tight mt-0.5"
          >
            {data.title}
          </motion.h1>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default SliderCard;
