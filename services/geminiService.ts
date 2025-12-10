import { GoogleGenerativeAI } from "@google/generative-ai";

// VITE_API_KEY টি আমরা Vercel-এর সেটিংস থেকে নেব
const apiKey = import.meta.env.VITE_API_KEY || ""; 

// এখানে সরাসরি Key না বসিয়ে 'apiKey' ভেরিয়েবলটি ব্যবহার করুন
const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({ model: "gemini-pro" });