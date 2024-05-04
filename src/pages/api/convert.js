const speech = require("@google-cloud/speech");
// i am funny
export default async function convert(req, res) {
  const client = new speech.SpeechClient();
  const gcsUri = "";

  const audio = {
    uri: gcsUri,
  };
  const config = {
    encoding: "LINEAR16",
    sampleRateHertz: 16000,
    languageCode: "en-US",
  };
  const request = {
    audio: audio,
    config: config,
  };

  const [response] = await client.recognize(request);
  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join("\n");
  console.log(`Transcription: ${transcription}`);
}
