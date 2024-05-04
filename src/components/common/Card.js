import React, { useEffect, useState } from "react";


const Card = () => {
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const syncPointer = (event) => {
      const { clientX, clientY } = event;
      setPointerPosition({ x: clientX, y: clientY });
      document.documentElement.style.setProperty("--x", clientX.toFixed(2));
      document.documentElement.style.setProperty("--y", clientY.toFixed(2));
    };

    document.body.addEventListener("mousemove", syncPointer);

    return () => {
      document.body.removeEventListener("mousemove", syncPointer);
    };
  }, []);
  

  return (
    <div className="flex mainCard w-full">
      <article className="w-[400px] h-[300px] " data-glow>
        <div data-glow></div>
        <div className="flex flex-col gap-y-2 p-3">
            <p className="inter">1. Enter Your lec :</p>
            <p className="lexend text-[#bec2c4] opacity-75">xxxxxxxx 💚</p>
        </div>
      </article>
      <article className="w-[400px] h-[300px] " data-glow>
        <div data-glow></div>
        <div className="flex flex-col gap-y-2 p-3">
            <p className="inter">2. AI Analysis :</p>
            <p className="lexend text-[#bec2c4] opacity-75">yyyyyyyy🤖</p>
        </div>
      </article>
      <article className="w-[400px] h-[300px] " data-glow>
        <div data-glow></div>
        <div className="flex flex-col gap-y-2 p-3">
            <p className="inter">3. Personalized Recommendations :</p>
            <p className="lexend text-[#bec2c4] opacity-75">yyyyyyyyyyyyy 📢</p>
        </div>
      </article>
      
    </div>
  );
};

export default Card;
