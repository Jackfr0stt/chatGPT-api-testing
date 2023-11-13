import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { API_KEY } from "../env_variables.js";

const openai = new OpenAI({ apiKey: API_KEY });

const speechFile = path.resolve("./exercices/tts_files/speech.mp3");

async function main() {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1-hd",
    voice: "nova",
    input: "I know that Boneco is an idiot, but hey... Some people are just like that and there's nothing wrong with it.",
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
}
main();