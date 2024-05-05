import { GridBackgroundDemo } from "@/components/ui/GridBackgroundDemo";
import Spotlight from "@/components/ui/spotlight";
import { useRouter } from "next/router";
import { useRef, useEffect, useState } from "react";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import useGestures from "../hooks/gestures";
export default function Card() {
  const router = useRouter();

  const [data, setData] = useState([
    {
      question: "What causes global warming?",
      answer: "CO2 emissions",
    },
    {
      question: "What is the main cause of climate change?",
      answer: "Human activity",
    },
    {
      question: "What are the effects of climate change?",
      answer:
        "Rising sea levels, more extreme weather events, and changes in plant and animal life",
    },
    {
      question: "What can be done to address climate change?",
      answer:
        "Reduce carbon emissions, invest in renewable energy, and adapt to the effects of climate change",
    },
    {
      question: "What are the benefits of addressing climate change?",
      answer:
        "Improved air quality, reduced health risks, and economic benefits",
    },
  ]);

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("qcs")));
    console.log("data on card page ->", data);
  }, []);

  const [visibleAnswers, setVisibleAnswers] = useState(
    Array(data?.length).fill(false),
  );

  useEffect(() => {
    const syncPointer = (event) => {
      const { clientX, clientY } = event;
      document.documentElement.style.setProperty("--x", clientX.toFixed(2));
      document.documentElement.style.setProperty("--y", clientY.toFixed(2));
    };

    document.body.addEventListener("mousemove", syncPointer);

    return () => {
      document.body.removeEventListener("mousemove", syncPointer);
    };
  }, []);

  const toggleAnswerVisibility = (index) => {
    const newVisibleAnswers = [...visibleAnswers];
    newVisibleAnswers[index] = !newVisibleAnswers[index];
    setVisibleAnswers(newVisibleAnswers);
  };

  const gesture = useGestures();

  useEffect(() => {
    console.log(gesture);
  }, [gesture]);

  return (
    <div className="text-white relative">
      <GridBackgroundDemo />

      <Spotlight
        className="absolute z-[100] -top-40 left-0 md:left-1/2 transform -translate-x-1/2 md:-top-20"
        fill="white"
      />

      <p className="text-white ">Card: {router.query.id}</p>

      <p className="text-4xl font-bold text-center mb-8">Your Flash Cards:</p>

      <div className="flex w-[80%] h-[80vh] mx-auto p-5 mainCard ">
        <Swiper
          className={"flex item-center justify-center mySwiper"}
          navigation={true}
          modules={[Navigation]}
        >
          {data.map((card, index) => (
            <SwiperSlide key={card.question} className={`ml-${index * 4}`}>
              <article
                className={`w-[400px] h-[300px] mx-auto`}
                key={index}
                data-glow
              >
                <div data-glow></div>
                <div
                  onClick={() => toggleAnswerVisibility(index)}
                  className="flex flex-col items-center justify-between gap-y-2 p-3"
                >
                  <p className="inter text-2xl">{card?.question}</p>
                  {visibleAnswers[index] && (
                    <p className="lexend text-[#bec2c4] opacity-75">
                      {card?.answer}
                    </p>
                  )}
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <canvas
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: 640,
          height: 480,
        }}
      />
      <video id="videoElement" width="720" height="480" autoPlay></video>
    </div>
  );
}
