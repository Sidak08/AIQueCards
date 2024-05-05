const asmbly = require("assemblyai")
const formidable = require('formidable');

export default async function convert(req, res) {	
	if (!req.method === "POST") return res.status(400).json({message: "not post"})	

	const form = new formidable.IncomingForm()

	try {
		form.on("file", async (name, file) => {
			console.log(name)

			const client = new asmbly.AssemblyAI({
			  apiKey: process.env.STT_AI_API_KEY,
			});

			const transcript = await client.transcripts.transcribe({
				audio: file.filepath,
				speaker_labels: true,
			})

			res.status(200).json({ message: "success", text: transcript.text })	
		}).parse(req)
	} catch (err) {
		console.error(err)	
	}
}

export const config = {
    api: {
        bodyParser: false 
    }
}
