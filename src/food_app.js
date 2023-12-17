// import OpenAI from "openai";
import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { API_KEY } from "../env_variables.js";
import { formatWeekPlanTemplate, testTemplate } from "./templates.js";
import { HumanMessage } from "langchain/schema";

// const openai = new OpenAI({ apiKey: API_KEY });
const llm = new OpenAI({
  openAIApiKey: API_KEY,
  temperature: 0.9,
  modelName: "gpt-3.5-turbo-instruct",
  maxTokens: -1,
  maxRetries: 10,
  maxConcurrency: 5,
  // verbose: true
});
const chatModel = new ChatOpenAI({
  openAIApiKey: API_KEY,
  temperature: 0.9,
  modelName: "gpt-3.5-turbo-instruct",
  maxTokens: -1,
  maxRetries: 10,
  maxConcurrency: 5,
});

// This will eventually be metadata (need to make sure about the typing later TypeScript might be a better fit)
const user = {
  clientName: 'Tau',
  age: 30,
  sex: 'female',
  country: 'Portugal',
  heightCm: 164,
  weightKg: 90,
  allergies: ['tomato', 'almond', 'chocolate'],
  prohibitedFood: ['red fish', 'cod', 'milk'],
  caloriesPlan: 1800,
  healthIssues: ['chron disease', 'lactose intolerance']
}

// retrieves information about a weekly meal plan for a user
async function weeklyMeals(user) {
  const {clientName, age, sex, country, heightCm, weightKg, allergies, prohibitedFood, caloriesPlan, healthIssues} = user;

  const messages = [
    {
      role: "user",
      content: `My name is ${clientName}, I am ${age} years old.
       Give me a weekly meal plan for ${caloriesPlan} calories that takes into consideration that,
       I'm ${sex}, I'm from ${country}, ${heightCm}cm tall, I weight ${weightKg}kg and I have ${healthIssues}. I also am allergic to ${allergies} and I don't like ${prohibitedFood}.`
    },
  ]

  // currently taking too long to obtain a response using gpt-3.5-turbo (1min?)
  const completion = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-3.5-turbo",
  });

  const content = completion.choices[0].message.content;
  console.log(content);
}

// retrieves information about a weekly meal plan for a user
async function useTemplate(user) {
  // const payload = await formatWeekPlanTemplate(user);
  const payload = await testTemplate(user);

  const messages = [new HumanMessage({ content: payload })];

  // const text = "What is your maximum output length? When I ask for a complex question you seem to stop the answer mid way.";
  // const llmResult = await llm.predict(text);
  // console.log(llmResult);

  const response = await llm.predictMessages(messages);
  console.log(response.content);
}

// await weeklyMeals(user);
await useTemplate(user);

// TODO: criar função de teste à informação dada pela DB da singlestore