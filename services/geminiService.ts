import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_API_KEY || ""; 
const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// এই সেই মিসিং ফাংশন যা AIChat.tsx খুঁজছে
export const generateProfessorResponse = async (prompt: string) => {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating response:", error);
    return "দুঃখিত, আমি এখন উত্তর দিতে পারছি না। দয়া করে পরে আবার চেষ্টা করুন।";
  }
};