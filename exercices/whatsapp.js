import OpenAI from "openai";
import Twilio from "twilio/lib/rest/Twilio.js";
import { API_KEY, twiloAccountSid, twiloAuthToken } from "../env_variables.js";

const client = new Twilio(twiloAccountSid, twiloAuthToken);

const openai = new OpenAI({ apiKey: API_KEY });
// const client = require('twilio')(twiloAccountSid, twiloAuthToken);

async function sendWhatsappMsg(msgBody) {
  client.messages
  .create({
      body: msgBody,
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+351919599051'
  })
  .then(message => console.log(message.sid));
}

async function default_calling() {

  const messages = [
    // { role: "user", content: "You are a helpful assistant." },
    // { role: "system", content: "How may I assist you today?" },
    { role: "user", content: "Who is the president of the US?" },
  ]

  const completion = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);

  await sendWhatsappMsg(completion.choices[0].message.content);
}

default_calling();