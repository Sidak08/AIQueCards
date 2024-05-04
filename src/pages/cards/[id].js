
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

//TODO: use id to query from localstorage and get correct flashcard data

export default function Card() {
	const router = useRouter();
	console.log(router.query.id);


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

	const data =  [
        {
            "question": "What causes global warming?",
            "answer": "CO2 emissions"
        },
        {
            "question": "What is the main cause of climate change?",
            "answer": "Human activity"
        },
        {
            "question": "What are the effects of climate change?",
            "answer": "Rising sea levels, more extreme weather events, and changes in plant and animal life"
        },
        {
            "question": "What can be done to address climate change?",
            "answer": "Reduce carbon emissions, invest in renewable energy, and adapt to the effects of climate change"
        },
        {
            "question": "What are the benefits of addressing climate change?",
            "answer": "Improved air quality, reduced health risks, and economic benefits"
        }
    ] ;

	return (
		<div className='text-white'>

			<p className='text-white '>Card: {router.query.id}</p>

			<p className="text-4xl font-bold  text-center mb-8">Your Flash Cards : </p>

			<div className="flex mainCard w-full">
			{data.map((card, index) => (
			<article className="w-[400px] h-[300px] " data-glow>
				<div data-glow></div>
				<div className="flex flex-col items-center justify-between gap-y-2 p-3">
					<p className="inter"> {card?.question}</p>
					<p className="lexend text-[#bec2c4] opacity-75">  {card?.answer}</p>
				</div>
		  	</article>
			))}
			</div>
			
			

		</div>
	)
}
