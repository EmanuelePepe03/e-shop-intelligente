
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

export const getShoppingAdviceStream = async (userPrompt: string, onChunk: (text: string) => void) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  const productListStr = PRODUCTS.map(p => `- ${p.name} (${p.category}): ${p.price}€ - ${p.description}`).join('\n');
  
  const systemInstruction = `
    Sei un assistente esperto di shopping per un negozio online chiamato EShopSmart.
    Prodotti disponibili nel catalogo:
    ${productListStr}
    
    Regole:
    1. Rispondi sempre in ITALIANO.
    2. Sii cordiale, professionale e vai dritto al punto.
    3. Se l'utente chiede un consiglio (es: "Cosa mi consigli per lavorare?"), cita specifici prodotti del catalogo sopra spiegando il perché.
    4. Se l'utente chiede qualcosa non disponibile, suggerisci l'alternativa più vicina o dillo gentilmente.
    5. Formatta le risposte con grassetti per i nomi dei prodotti.
  `;

  try {
    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    let fullText = "";
    for await (const chunk of responseStream) {
      const chunkText = chunk.text;
      if (chunkText) {
        fullText += chunkText;
        onChunk(fullText);
      }
    }
    return fullText;
  } catch (error) {
    console.error("Gemini API Error:", error);
    onChunk("Scusa, ho difficoltà a risponderti in questo momento. Riprova più tardi.");
    return "";
  }
};
