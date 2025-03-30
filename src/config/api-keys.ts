export const API_KEYS = {
  // For AI chat functionality
  GOOGLE_AI_KEY: process.env.NEXT_PUBLIC_GOOGLE_AI_KEY || '',
  
  // For file storage
  FIREBASE_CONFIG: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  },

  // For OCR functionality
  GOOGLE_CLOUD_VISION_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_CLOUD_VISION_API_KEY || '',
  
  // For file conversion
  CLOUDCONVERT_API_KEY: process.env.NEXT_PUBLIC_CLOUDCONVERT_API_KEY || '',
} 