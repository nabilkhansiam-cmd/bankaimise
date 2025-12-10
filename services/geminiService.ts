import { GoogleGenerativeAI } from "@google/generative-ai";



const apiKey = import.meta.env.VITE_API_KEY as string;

const genAI = new GoogleGenerativeAI("AIzaSyDLliUiBbZdjOOK0dyJ8R0XW1-lH_SbgP0");



export const model = genAI.getGenerativeModel({ model: "gemini-pro" });