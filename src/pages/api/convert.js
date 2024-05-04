const speech = require("@google-cloud/speech");

export default async function convert(req, res) {	
	const client = new speech.SpeechClient();

	const config = {
	  encoding: "mp3",
	  sampleRateHertz: 16000,
	  languageCode: 'en-US',
	};

	const audio = {
	  content: req.body.toString('base64'),
	};

	const request = {
	  config: config,
	  audio: audio,
	};

	// Detects speech in the audio file
	const [response] = await client.recognize(request);
	
	const transcription = response.results
  .map(result => result.alternatives[0].transcript)
  .join('\n');

	res.status(200).json({ message: "success", transcription })
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb' // Set desired value here
        }
    }
}
