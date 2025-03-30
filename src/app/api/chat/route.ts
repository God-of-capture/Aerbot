import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { API_KEYS } from '@/config/api-keys';

const genAI = new GoogleGenerativeAI(API_KEYS.GOOGLE_AI_KEY);

export async function POST(request: Request) {
  try {
    const { message, attachments } = await request.json();

    // Prepare the conversation context
    let context = message;
    if (attachments?.length > 0) {
      context += "\nAttached files:\n" + 
        attachments.map((a: any) => `- ${a.name} (${a.type})`).join('\n');
    }

    // Get response from Google AI
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

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
    });

    const result = await chat.sendMessage([{text: context}]);
    const response = await result.response;

    return NextResponse.json({
      response: response.text(),
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Error processing your request' },
      { status: 500 }
    );
  }
} 