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
          <p className="inter">Do You Have a Bad Memory? 🧠</p>
          <p className="lexend text-[#bec2c4] opacity-75">
          Struggling to keep up with all that lecture audio? 🎧 Our flashcard app 📝 can help! Upload your audio files and our app will automatically generate flashcards with key points. No more scrambling to take notes while you listen. 📚






          </p>
        </div>
      </article>
      <article className="w-[400px] h-[300px] " data-glow>
        <div data-glow></div>
        <div className="flex flex-col gap-y-2 p-3">
          <p className="inter">Have Exams Coming Up With No Plan 🚀</p>
          <p className="lexend text-[#bec2c4] opacity-75">
          Reviewing for a big exam? 📝 Flashcards are a well-known study method for a reason. They help you test yourself and solidify information in your memory. 🧠 Our app makes creating flashcards from audio a breeze, so you can spend less time prepping and more time focusing on the material. 🕒






          </p>
        </div>
      </article>
      <article className="w-[400px] h-[300px] " data-glow>
        <div data-glow></div>
        <div className="flex flex-col gap-y-2 p-3">
          <p className="inter">A New Better Way To Learn ✨ </p>
          <p className="lexend text-[#bec2c4] opacity-75">
          Plus, our app lets you include audio clips 🎵 right on your flashcards. Hearing the information again can jog your memory 🧠 and reinforce your learning, especially for complex topics or new languages. 🌐






          </p>
        </div>
      </article>
    </div>
  );
};

export default Card;
