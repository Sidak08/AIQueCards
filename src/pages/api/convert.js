const speech = require("@google-cloud/speech");
const fs = require('fs')

export default async function convert(req, res) {
	try {	
		fs.writeFileSync("../../../audio/lecture.wav", req.body)
	} catch (err) {
		console.error(err)
		return res.status(500).json({ message: "internal server error" })
	}	


	//  const gcsUri = "";
//
//  const audio = {
//    uri: gcsUri,
//  };
//  const config = {
//    encoding: "LINEAR16",
//    sampleRateHertz: 16000,
//    languageCode: "en-US",
//  };
//  const request = {
//    audio: audio,
//    config: config,
//  };
//
//  const [response] = await client.recognize(request);
//  const transcription = response.results
//    .map((result) => result.alternatives[0].transcript)
//    .join("\n");
//  console.log(`Transcription: ${transcription}`);

	res.status(200).json({ message: "success" })
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb' // Set desired value here
        }
    }
}
