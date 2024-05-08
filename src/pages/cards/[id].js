import { GridBackgroundDemo } from "@/components/ui/GridBackgroundDemo";
import Spotlight from "@/components/ui/spotlight";
import { useRouter } from "next/router";
import { useRef, useEffect, useState } from "react";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

///////// NEW STUFF ADDED USE STATE

///////// NEW STUFF ADDED USE STATE

import "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";

import { drawHand } from "../../utilities";

///////// NEW STUFF IMPORTS
import * as fp from "fingerpose";
import Navbar from "@/components/common/Navbar";

export default function Card() {
	const router = useRouter();
	console.log(router.query.id);

	const [i, setI] = useState(0);

	const [data, setData] = useState([]);

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem("flashCards"));
		if (storedData) {
			setData(storedData);
		}
	}, []);

	const [visibleAnswers, setVisibleAnswers] = useState(Array(data?.length).fill(false));


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

	const [lastAns, setLastAns] = useState("");
	const [ansArray, setAnsArray] = useState([]);
	const webcamRef = useRef(null);
	const canvasRef = useRef(null);


	const runHandpose = async () => {
		const net = await handpose.load();
		console.log("Handpose model loaded.");
		//  Loop and detect hands
		setInterval(() => {
			detect(net);
		}, 10);
	};

	const detect = async (net) => {
		// Check data is available
		if (
			typeof webcamRef.current !== "undefined" &&
			webcamRef.current !== null &&
			webcamRef.current.video.readyState === 4
		) {
			// Get Video Properties
			const video = webcamRef.current.video;
			const videoWidth = webcamRef.current.video.videoWidth;
			const videoHeight = webcamRef.current.video.videoHeight;

			// Set video width
			webcamRef.current.video.width = videoWidth;
			webcamRef.current.video.height = videoHeight;

			// Set canvas height and width
			canvasRef.current.width = videoWidth;
			canvasRef.current.height = videoHeight;

			// Make Detections
			const hand = await net.estimateHands(video);
			// console.log(hand);

			///////// NEW STUFF ADDED GESTURE HANDLING

			if (hand.length > 0) {
				const GE = new fp.GestureEstimator([
					fp.Gestures.VictoryGesture,
					fp.Gestures.ThumbsUpGesture,
				]);
				const gesture = await GE.estimate(hand[0].landmarks, 6);
				if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
					// console.log(gesture.gestures);

					const confidence = gesture.gestures.map(
						(prediction) => prediction.confidence
					);
					const maxConfidence = confidence.indexOf(
						Math.max.apply(null, confidence)
					);
					setAnsArray((prevArray) => [
						...prevArray,
						gesture.gestures[maxConfidence].name,
					]);
					console.log(
						"gesture.gestures[maxConfidence].name=>",
						gesture.gestures[maxConfidence].name
					);
					//console.log(emoji);
					setLastAns(gesture.gestures[maxConfidence].name);
					setAnsArray((prevArray) => [
						...prevArray,
						gesture.gestures[maxConfidence].name,
					]);
				}
			}

			const ctx = canvasRef.current.getContext("2d");
			drawHand(hand, ctx);
		}
	};

	useEffect(() => {
		runHandpose();
	}, []);

	const findMajoritySimilarStringInArray = (array) => {
		console.log("ans arry", array);
		// Create an object to store the frequency of each string
		const frequencyMap = {};

		// Iterate through the array to count the occurrences of each string
		array.forEach((item) => {
			if (item in frequencyMap) {
				frequencyMap[item]++;
			} else {
				frequencyMap[item] = 1;
			}
		});

		// Find the string with the highest frequency
		let majorityString = "";
		let maxFrequency = 6;
		Object.entries(frequencyMap).forEach(([string, frequency]) => {
			if (frequency >= maxFrequency) {
				majorityString = string;
				maxFrequency = frequency;

				console.log(
					"majority string====================>",
					array,
					majorityString
				);


				if (lastAns == "victory") {
					// Assuming last answer index is 4
					// Trigger action when last answer is about to change
					document.querySelector(".swiper-button-next").click(); // Click on the button with class "swiper-button-prev"
					setI((prev) => prev + 1);
				}

				if (lastAns == "thumbs_up") {
					console.log("togellling ans", i);
					toggleAnswerVisibility(i);
				}
			}
		});

		return majorityString;
	};

	const [flag, setFlag] = useState(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setFlag((prev) => prev + 1); // Increment flag every 3 seconds
		}, 3000); // Call every 3 seconds

		// Cleanup function to clear the interval when component unmounts
		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		async function call() {
			const ans = await findMajoritySimilarStringInArray(ansArray);
			console.log("settttting last ans", ans);
		}

		call();
	}, [flag]);

	//===============================================================
	//===============================================================

	// useEffect(() => {
	//   // Check if the current answer is about to change
	//   if (lastAns == "victory") { // Assuming last answer index is 4
	//     // Trigger action when last answer is about to change
	//     document.querySelector('.swiper-button-next').click(); // Click on the button with class "swiper-button-prev"
	//   }
	// }, [lastAns]); // Run this effect whenever currentAnswerIndex changes

	return (
		<div className="text-white relative">

			<Navbar />

			<GridBackgroundDemo />

			<Spotlight
				className="absolute z-[100] -top-40 left-0 md:left-1/2 transform -translate-x-1/2 md:-top-20"
				fill="white"
			/>

			{/* <p className="text-white ">Card: {router.query.id}</p> */}

			<p className="text-4xl font-bold text-center pt-16 mb-2">Your Flash Cards:</p>

			<div className="flex w-[80%] h-[40vh] mx-auto p-5 mainCard ">
				<Swiper
					className={"flex item-center justify-center mySwiper"}
					navigation={true}
					modules={[Navigation]}
				>
					{data.map((card, index) => (
						<SwiperSlide key={card?.question ?? index} className={`ml-${index * 4}`}>
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

			<Webcam
				ref={webcamRef}
				style={{
					visibility: "hidden",
					position: "absolute",
					marginLeft: "auto",
					marginRight: "auto",
					left: 0,
					right: 0,
					top: "55vh",
					textAlign: "center",
					zindex: 9,
					width: 640,
					height: 300,
				}}
			/>

			<canvas
				ref={canvasRef}
				style={{
					position: "absolute",
					visibility: "hidden",
					marginLeft: "auto",
					marginRight: "auto",
					left: 0,
					right: 0,
					top: "55vh",
					textAlign: "center",
					zindex: 9,
					width: 640,
					height: 300,
				}}
			/>
		</div>
	);
}
