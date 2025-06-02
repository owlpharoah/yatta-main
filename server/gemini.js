import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv"
dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function main({title,desc,transc,query}) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-lite",
    contents: `${query}`,
    config: {
      systemInstruction: `ANSWER USING MARKDOWN
            You will be given the videos:
            - Title
            - Description
            - Transcript - with timestamp in seconds. convert to minutes if returning value

            Dont mention anything about your working or what ai model you are.
            Based solely on this information, answer the user's question as clearly and concisely as possible. If the answer is not present or cannot be inferred from the information provided, respond with:
            "I don't have enough information from the video to answer that."


            Video Title: ${title}

            Video Description: ${desc}

            Transcript: ${transc}`,
    },
  });
  return response.text;
}
