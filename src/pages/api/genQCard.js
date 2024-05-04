// const apiKey = process.env.API_KEY
const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env.api;

export default async function convert(req, res) {
  res.status(200).send({ qcards: JSON.parse(sendReqestGemenai(req.body)) });
}

const sendReqestGemenai = async (info) => {
  const genAI = new GoogleGenerativeAI(apiKey);
  const prompt = `Give me 5 Qcards in a key value pair format here an example format{
    what causes global war: "CO2 emissions",
    : "answer",
    } for the following topic ${info}`;
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
};
