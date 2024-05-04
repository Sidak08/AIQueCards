import Navbar from "@/components/common/Navbar";
import { useState } from "react";


export default function TestSendFile() {	

	const [file, setFile] = useState(null);

	function gettingCardsFromMp3File(e){
		e.preventDefault();
		console.log("getting cards :"); 
		
		// TODO:  store to localstorage
	}

	return (
		<div>

			<Navbar />

			<p className="text-4xl pt-20 text-white font-bold text-center mb-8">Upload mp3 </p>

			<form className="pt-20 flex items-center justify-center flex-col gap-y-4 " method="post" encType="multipart/form-data">
				<input className="mx-auto pl-[12rem] " name="lecture" accept=".mp3" type="file"></input>
				<button onClick={(e)=>{gettingCardsFromMp3File(e)}} className="bg-white rounded-md p-2" type="submit">Submit</button>
			</form>	
		</div>
	)	
}
