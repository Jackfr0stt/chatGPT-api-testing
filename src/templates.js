import { PromptTemplate } from "langchain/prompts";

const weekPlanTemplate = PromptTemplate.fromTemplate(
  `My name is {clientName}, I am {age} years old.
  Give me a weekly meal plan for {caloriesPlan} calories that takes into consideration that,
  I'm {sex}, I'm from {country}, {heightCm}cm tall, I weight {weightKg}kg and I have {healthIssues}.
  I also am allergic to {allergies} and I don't like {prohibitedFood}.`
);

export async function formatWeekPlanTemplate(user) {
  const {clientName, age, sex, country, heightCm, weightKg, allergies, prohibitedFood, caloriesPlan, healthIssues} = user;

  const weekPlan = await weekPlanTemplate.format({
    clientName: clientName,
    age: age,
    sex: sex,
    country: country,
    heightCm: heightCm,
    weightKg: weightKg,
    allergies: allergies,
    prohibitedFood: prohibitedFood,
    caloriesPlan: caloriesPlan,
    healthIssues: healthIssues
  });

  return weekPlan;
}

export async function testTemplate(user) {
  const {clientName, age, sex, country, heightCm, weightKg, allergies, prohibitedFood, caloriesPlan, healthIssues} = user;

  const template = PromptTemplate.fromTemplate(
    `Build me a 5 meals meal plan for today.
    Take into consideration the following parameters:
    clientName: {clientName}, age: {age}, sex: {sex}, country: {country},
    height (cm): {heightCm}, weight (kg): {weightKg}, caloriesToIngest: {caloriesPlan},
    healthIssues: {healthIssues}, prohibitedFood: {prohibitedFood}, allergies: {allergies}
    Give me the information in bullet points and give a nice name to the recipe and show the amount of calories for each meal. Indent the recipe for each meal if possible.
    Answer in my country language.`
  );

  const template_res = await template.format({
    clientName: clientName,
    age: age,
    sex: sex,
    country: country,
    heightCm: heightCm,
    weightKg: weightKg,
    allergies: allergies,
    prohibitedFood: prohibitedFood,
    caloriesPlan: caloriesPlan,
    healthIssues: healthIssues
  });

  return template_res;
}