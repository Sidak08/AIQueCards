// const apiKey = process.env.API_KEY
const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env.api;

export default async function convert(req, res) {
  console.log("test")
  res.status(200).send({ qcards: await sendReqestGemenai(req.body) });
}

const sendReqestGemenai = async (info) => {
  const genAI = new GoogleGenerativeAI(apiKey);
  const prompt = `Give me 5 Qcards in a key value pair format here an example format [ {
    what causes global war: "CO2 emissions",
    : "answer",
    }, {} ] for the following topic ${info}
    
    make sure to give only json data not extra anything`;
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text();
  console.log(JSON.parse(text));
  text = JSON.parse(text) ;
  return text ;
};
