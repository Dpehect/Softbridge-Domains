import React from "react";
import SliderCard from "./SliderCard";
import { SlideData } from "./BackgroundImage";

type Props = {
  data: SlideData[];
};

function Slides({ data }: Props) {
  return (
    <div className="flex w-full gap-3 overflow-x-auto no-scrollbar py-1.5 pr-4 md:pr-8 lg:pr-12 snap-x snap-mandatory">
      {data.map((data) => {
        return <SliderCard key={data.img} data={data} />;
      })}
    </div>
  );
}

export default Slides;
