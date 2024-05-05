import Navbar from "@/components/common/Navbar";
import Introduction from "@/components/homepage/Introduction";
import BackgroundBeams from "@/components/ui/background-beams";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Inter } from "next/font/google";
import Image from "next/image";
import city from "../assets/alys-chen-20200929-1-3.jpg";
import { Sparkels } from "@/components/homepage/Sparkels";
import Spotlight from "@/components/ui/spotlight";
import Card from "@/components/common/Card.js";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <div>
        <Navbar />
        <Introduction />
        <div className="flex absolute mx-auto ml-[150px] top-[300px] flex-col overflow-hidden">
          <ContainerScroll>
            <Image
              src={city}
              alt="hero"
              height={400}
              width={1400}
              className="mx-auto rounded-2xl object-cover h-full object-left-top"
              draggable={false}
            />
          </ContainerScroll>
        </div>
        <Spotlight
          className="absolute z-[100] -top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <Sparkels />
      </div>
      {/* three cards  */}
      <div className="top-[700px] w-full inter pb-8 relative text-white">
        <p className="text-5xl text-center mb-3">How It Works ?</p>
        <p className="text-[#bec2c4] opacity-80 lexend text-center mb-8">
          Discover Your Perfect cards in 3 Simple Steps :{" "}
        </p>
        <Card className={"w-[100vw] "} />
      </div>
    </main>
  );
}
