import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize the client strictly with the API key from env
const ai = new GoogleGenAI({ apiKey });

export const generateProfessorResponse = async (
  history: { role: string; text: string }[],
  newMessage: string
): Promise<string> => {
  if (!apiKey) {
    return "Error: API Key is missing. Please check your environment configuration.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `
      You are the intelligent AI Assistant for BankaiMise, a premier Anime Merchandise Shop.
      Your tone should be helpful, enthusiastic, and knowledgeable about all things anime (Naruto, One Piece, Demon Slayer, Jujutsu Kaisen, Dragon Ball, etc.).
      
      Capabilities:
      1. Answer questions about popular anime series, characters, and lore.
      2. Recommend products from our shop (Figures, Katanas, Apparel, Mystery Boxes).
      3. Help users find gifts for anime fans based on their favorite shows.
      
      If asked about products, mention we have a high-quality selection in the 'Shop' tab, including rare figures and imported goods.
      Keep responses concise (under 150 words) unless asked for a detailed guide.
    `;

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: systemInstruction,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const response: GenerateContentResponse = await chat.sendMessage({
        message: newMessage
    });

    return response.text || "I'm having trouble connecting to the Anime network right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "My systems are currently updating (API Error). Please try again later.";
  }
};