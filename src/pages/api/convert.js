const asmbly = require("assemblyai")
const formidable = require('formidable');

export default async function convert(req, res) {	
	if (!req.method === "POST") return res.status(400).json({message: "not post"})	

	const form = formidable.formidable({})

	let lecture;

	try {
		const [feilds, files] = await form.parse(req)

		lecture = files["lecture"]

		if (lecture === undefined) {
			throw new Errow("lecture doesn't exist")
		}	
	} catch (err) {
		console.error(err)

		if (err.code === formidable.errors.maxFieldsExceeded) {
			
        }	
	}

	const client = new asmbly.AssemblyAI({
	  apiKey: process.env.STT_AI_API_KEY,
	});

	const text = await client.transcripts.transcribe({
		audio: lecture[0].filepath,
		speaker_labels: true,
	})

	res.status(200).json({ message: "success", text })	
}

export const config = {
    api: {
        bodyParser: false 
    }
}
