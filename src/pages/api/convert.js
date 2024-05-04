const speech = require("@google-cloud/speech");
const {Storage} = require('@google-cloud/storage');

export default async function convert(req, res) {
	const client = new speech.SpeechClient();
	
	const storage = new Storage({keyFilename: 'lecture.mp3'});
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
