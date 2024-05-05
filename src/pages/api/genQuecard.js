// const apiKey = process.env.API_KEY
const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env.api;
const z = require("zod")

export default async function genQuecard(req, res) {
	console.log(req.body)

	let resdata = []
	let attempts = 1

	while (attempts > 0) {
		console.log("ran")
		
		const geminiResponse = sendReqestGemenai(req.body);
		
		try {
			resdata = z.object({
				question: z.string(),
				answer: z.string(),
			}).array().parse(JSON.parse(await geminiResponse))
			
			break;
		} catch (err) {
			attempts--;	
		} 
	}

	if (resdata.length === 0) {
		return res.status(500).json({ quecards: [], message: "internal server error" })
	}

	res.status(200).json({ quecards: resdata, message: "success" });
}

const sendReqestGemenai = async (info) => {
	const genAI = new GoogleGenerativeAI(apiKey);
	const prompt = `Give me 5 quecards in a key value pair format [
	{
		"question": "question",
		"answer": "answer",
	}   
	] for the following topic ${info.value}`;

	let text

	try {
		const model = genAI.getGenerativeModel({ model: "gemini-pro" });
		const result = await model.generateContent(prompt);
		const response = await result.response;
		text = response.text();
	} catch (err) {
		console.log(err)
	}

	console.log("model", model)
	console.log("resp", response)
	console.log(text)
	return text
};
