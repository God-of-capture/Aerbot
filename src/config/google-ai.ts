import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.NEXT_PUBLIC_GOOGLE_AI_KEY) {
  throw new Error('NEXT_PUBLIC_GOOGLE_AI_KEY is not defined');
}

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_AI_KEY);

export const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const startChat = async () => {
  try {
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{text: "You are an AI assistant specialized in helping users with document editing, conversion, and analysis. You can help with PPTs, CVs, Resumes, and other document types."}],
        },
        {
          role: "model",
          parts: [{text: "I understand that I am an AI assistant specialized in document editing, conversion, and analysis. I can help users with various document types including PowerPoint presentations, CVs, resumes, and other formats. I'll provide guidance on editing, formatting, and optimizing these documents while maintaining a professional and helpful approach."}],
        },
      ],
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });
    
    return chat;
  } catch (error) {
    console.error('Error starting chat:', error);
    throw new Error('Failed to initialize chat. Please check your API key and try again.');
  }
}; 