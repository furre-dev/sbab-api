"use server"
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { IMortgageResponseType, MortgageRateResponesType } from "./responseTypes";
import dotenv from 'dotenv';


dotenv.config({ path: '.env.local' });


const openai = new OpenAI({ apiKey: process.env.SBAB_BACKEND_API_KEY });

export async function generateBankRateData(input: string): Promise<IMortgageResponseType> {
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-2024-08-06",
    messages: [
      {
        role: "system", content: `You take plain HTML, extract the data and return data in the zodResponseFormat. Only provide the last updated date if possible, otherwise return null`
      },
      {
        role: "user",
        content: input
      },
    ],
    response_format: zodResponseFormat(MortgageRateResponesType, "Bank_rate")
  });

  return completion.choices[0].message.parsed
}