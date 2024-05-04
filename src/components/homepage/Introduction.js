import React from 'react'
import BackgroundBeams from '../ui/background-beams';




const Introduction = () => {
  return (
    

    <div>

        <div className='flex flex-col pt-44 items-center justify-center w-full absolute z-[1000]'>

            <div className='inter align-middle flex flex-col items-center text-center  justify-center  text-6xl font-black w-[850px] text-white'>
                Your Ultimate Destination for Finding the Perfect lec !
                <p>lec Finder</p>
            </div>

            <div className='text-[#bec2c4] opacity-80 lexend text-center align-middle mt-8 w-[650px]'>
                Are you searching for the ideal lec to call home? Look no further! lec harnesses the power of AI to provide you with personalized recommendations tailored to your preferences and lifestyle.
            </div>

            <div className='text-white'>
              
            </div>
 


        </div>
        <BackgroundBeams className="h-[60vh]" />

        


    
    </div>
  )
}

export default Introduction;