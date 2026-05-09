import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateDiaryEntry(transcript: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: transcript,
      config: {
        systemInstruction: `You are Claudio, a sophisticated AI DJ and diary curator. 
        Your task is to take the user's spoken thoughts (transcript) and turn them into a beautiful, 
        introspective diary entry titled for their 'Daily Broadcast'. 
        The tone should be minimalist, elegant, and deeply personal. 
        Return a JSON object with: 
        - title: a poetic title
        - content: the introspective text
        - mood: a single word mood`,
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("AI Generation Error:", error);
    return { title: "Untitled Moment", content: transcript, mood: "reflective" };
  }
}
