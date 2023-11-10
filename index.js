import OpenAI from "openai";

const openai = new OpenAI({ apiKey: `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` });

async function default_calling() {

  const messages = [
    { role: "user", content: "You are a helpful assistant." },
    { role: "system", content: "How may I assist you today?" },
    { role: "user", content: "Give me an array of 3 random numbers, please." },
  ]

  const completion = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

async function function_calling() {
  const messages = [{"role": "user", "content": "What's the weather like in Boston today?"}];
  const functions = [
    {
      "name": "get_current_weather",
      "description": "Get the current weather in a given location",
      "parameters": {
        "type": "object",
        "properties": {
          "location": {
            "type": "string",
            "description": "The city and state, e.g. San Francisco, CA",
          },
          "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
        },
        "required": ["location"],
      },
    }
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
    functions: functions,
    function_call: "auto",  // auto is default, but we'll be explicit
  });

  console.log("Response: ", response);
  console.log("R1: ", response.choices, response.choices[0].message.function_call);
}

default_calling();
// function_calling();