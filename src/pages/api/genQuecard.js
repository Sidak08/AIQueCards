// const apiKey = process.env.API_KEY
const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env.api;
const z = require("zod");

export default async function genQuecard(req, res) {
  console.log(req.body);

  let resdata = [];
  let attempts = 2;

  while (attempts > 0) {
    console.log("ran");

    const geminiResponse = sendReqestGemenai(req.body);

    try {
      resdata = z
        .object({
          question: z.string(),
          answer: z.string(),
        })
        .array()
        .parse(JSON.parse(await geminiResponse));

      break;
    } catch (err) {
      attempts--;
    }
  }

  if (resdata.length === 0) {
    return res
      .status(500)
      .json({ quecards: [], message: "internal server error" });
  }

  res.status(200).json({ quecards: resdata, message: "success" });
}

const sendReqestGemenai = async (info) => {
  console.log("sendingRq");
  const genAI = new GoogleGenerativeAI(apiKey);
  const prompt = `Give me a array of 5 quecards in key value pairs do not include markup [
	{
		"question": "question",
		"answer": "answer",
	}
	] for the following topic ${info.value}`;
  let text;
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  text = response.text();
  console.log("text-->", text);
  
  return text;
};
