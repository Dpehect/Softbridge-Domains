import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Progress from "./Progress";
import { SlideData, CurrentSlideData } from "./BackgroundImage";

type Props = {
  currentSlideData: CurrentSlideData;
  sliderData: SlideData[];
  data: SlideData[];
  transitionData: SlideData;
  handleData: React.Dispatch<React.SetStateAction<SlideData[]>>;
  handleTransitionData: React.Dispatch<React.SetStateAction<SlideData>>;
  handleCurrentSlideData: React.Dispatch<
    React.SetStateAction<CurrentSlideData>
  >;
  initData: SlideData;
};

function Controls({
  sliderData,
  data,
  transitionData,
  currentSlideData,
  handleData,
  handleTransitionData,
  handleCurrentSlideData,
  initData,
}: Props) {
  const handlePrev = () => {
    handleData((prevData) => [
      transitionData ? transitionData : initData,
      ...prevData.slice(0, prevData.length - 1),
    ]);
    handleCurrentSlideData({
      data: transitionData ? transitionData : sliderData[0],
      index: sliderData.findIndex(
        (ele) => ele.img === data[data.length - 1].img
      ),
    });
    handleTransitionData(data[data.length - 1]);
  };

  const handleNext = () => {
    handleData((prev) => prev.slice(1));
    handleCurrentSlideData({
      data: transitionData ? transitionData : initData,
      index: sliderData.findIndex((ele) => ele.img === data[0].img),
    });
    handleTransitionData(data[0]);
    setTimeout(() => {
      handleData((newData) => [
        ...newData,
        transitionData ? transitionData : initData,
      ]);
    }, 500);
  };

  return (
    <div className="flex items-center gap-4 px-0 py-3 md:px-1 md:py-5 w-full">
      <SliderButton handleClick={handlePrev}>
        <ArrowLeft className="text-lg w-5 h-5" />
      </SliderButton>
      <SliderButton handleClick={handleNext}>
        <ArrowRight className="text-lg w-5 h-5" />
      </SliderButton>
      <Progress curIndex={currentSlideData.index} length={sliderData.length} />
    </div>
  );
}

export default Controls;

const SliderButton = ({
  children,
  handleClick,
}: {
  children: React.ReactNode;
  handleClick: () => void;
}) => {
  return (
    <button
      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:border-white cursor-pointer"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
