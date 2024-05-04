import React from "react";
import SparklesCore from "../ui/sparkles";

export const Sparkels = () => {
  return (
    <div className="h-[40rem] top-[550px] opacity-50 z-[-10] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
    </div>
  );
};
