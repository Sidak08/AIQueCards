import React from "react";
import BackgroundBeams from "../ui/background-beams";

const Introduction = () => {
  return (
    <div>
      <div className="flex flex-col pt-44 items-center justify-center w-full absolute z-[1000]">
        <div className="inter align-middle flex flex-col items-center text-center  justify-center  text-5xl font-black w-[850px] text-white">
          <p>Create New And Imporved Flashcards With Sound card AI </p>
        </div>

        <div className="text-[#bec2c4] opacity-80 lexend text-center align-middle mt-8 w-[650px]">
          Ever had those late night study sessions with those unorganized notes?
          📚 Well, we have just the thing for you! Introducing SoundCard AI 🤖.
          All you have to do is leave it on and forget about it. It will
          automatically summarize lectures and generate organized notes in the
          form of flashcards 🗂️, making it easier for you to review and learn in
          the classroom ✨.
        </div>

        <div className="text-white"></div>
      </div>
      <BackgroundBeams className="h-[60vh]" />
    </div>
  );
};

export default Introduction;
