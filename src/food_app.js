import OpenAI from "openai";
import { API_KEY } from "../env_variables.js";

const openai = new OpenAI({ apiKey: API_KEY });

// This will eventually be metadata (need to make sure about the typing later TypeScript might be a better fit)
const user = {
  clientName: 'Tau',
  age: 30,
  sex: 'female',
  country: 'portugal',
  heightCm: 164,
  weightKg: 90,
  allergies: ['tomato', 'almond', 'chocolate'],
  prohibitedFood: ['red fish', 'cod', 'milk'],
  caloriesPlan: 1800,
  healthIssues: ['chron disease', 'lactose intolerance']
}

// retrieves information about a weekly meal plan for a user
async function weeklyMeals({clientName, age, sex, country, heightCm, weightKg, allergies, prohibitedFood, caloriesPlan, healthIssues}) {
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

weeklyMeals(user);