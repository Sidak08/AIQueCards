import Navbar from "@/components/common/Navbar.js";
import { useState } from "react";

export default function TestSendFile() {  

    const [file, setFile] = useState(null);

    function handleFileChange(e) {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }

    function gettingCardsFromMp3File(e){
        e.preventDefault();
        console.log("Getting cards from MP3 file:", file);
        
        // Perform further processing with the selected file
    }

    return (
        <div>
            <Navbar />

            <p className="text-4xl pt-20 text-white font-bold text-center mb-8">Upload mp3 </p>

			<p className="text-4xl pt-20 text-white font-bold text-center mb-8">Upload mp3 </p>

			<form className="pt-20 flex items-center justify-center flex-col gap-y-4 " method="post" action="/api/convert" encType="multipart/form-data">
				<input className="mx-auto pl-[12rem] " name="lecture" accept=".mp3" type="file"></input>
				<button className="bg-white rounded-md p-2" type="submit">Submit</button>
			</form>	
		</div>
	); 
}
