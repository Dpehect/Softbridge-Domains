import React from "react";
import { motion } from "framer-motion";

type Props = {
  data: any;
};
const item = {
  hidden: {
    y: "100%",
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
  },
  visible: {
    y: 0,
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
  },
} as const;

function OtherInfo({ data }: Props) {
  return (
    <motion.div initial="hidden" animate={"visible"} className="flex flex-col">
      <AnimatedText
        className="spacing overflow-hidden text-muted-steel font-mono tracking-widest uppercase text-[10px] md:text-xs"
        data={data?.location}
      />
      <AnimatedText
        className="my-2 text-4xl sm:text-6xl md:text-7.5xl font-extrabold tracking-tighter leading-none text-star-white font-display uppercase"
        data={data?.title}
      />
      <AnimatedText
        className="text-xs sm:text-sm text-star-white/70 max-w-md font-light leading-relaxed"
        data={data?.description}
      />
    </motion.div>
  );
}

export default OtherInfo;

const AnimatedText = ({
  data,
  className,
}: {
  data?: string;
  className?: string;
}) => {
  return (
    <span
      style={{
        overflow: "hidden",
        display: "inline-block",
      }}
    >
      <motion.p className={` ${className}`} variants={item} key={data}>
        {data}
      </motion.p>
    </span>
  );
};
