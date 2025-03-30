'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Chatbot from '@/components/Chatbot';
import FileUpload from '@/components/FileUpload';
import PPTEditor from '@/components/PPTEditor';
import ResumeEditor from '@/components/ResumeEditor';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import Chat from '@/components/Chat';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeEditor, setActiveEditor] = useState<'ppt' | 'resume' | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(files);
    // Determine which editor to show based on file type
    const fileType = files[0]?.type;
    if (fileType?.includes('powerpoint') || fileType?.includes('presentation')) {
      setActiveEditor('ppt');
    } else if (fileType?.includes('document') || fileType?.includes('pdf')) {
      setActiveEditor('resume');
    }
  };

  const handlePPTSave = (slides: any[]) => {
    // Handle PPT save logic here
    console.log('Saving PPT:', slides);
  };

  const handleResumeSave = (sections: any[]) => {
    // Handle resume save logic here
    console.log('Saving resume:', sections);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#161b22] border-b border-[#30363d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#238636]" />
              <h1 className="text-2xl font-semibold bg-gradient-to-r from-[#238636] to-[#2ea043] bg-clip-text text-transparent">
                AERBOT
              </h1>
            </motion.div>
            <div className="flex items-center space-x-4">
              <motion.button
                className="p-2 rounded-lg bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? (
                  <SunIcon className="w-5 h-5 text-[#f0883e]" />
                ) : (
                  <MoonIcon className="w-5 h-5 text-[#c9d1d9]" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="bg-[#161b22] rounded-xl shadow-lg border border-[#30363d]">
              <div className="px-6 py-8">
                <motion.div 
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#238636] via-[#2ea043] to-[#3fb950] bg-clip-text text-transparent">
                    AI Document Assistant
                  </h2>
                  <p className="text-[#8b949e] text-lg">
                    Your AI-powered document editing companion
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-[#21262d] rounded-xl p-8 border border-[#30363d] shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="space-y-6">
                    <p className="text-lg text-[#c9d1d9] leading-relaxed">
                      Upload your documents and chat with our AI assistant for help with 
                      <span className="text-[#58a6ff] font-semibold"> editing</span>,
                      <span className="text-[#58a6ff] font-semibold"> conversion</span>, and
                      <span className="text-[#58a6ff] font-semibold"> analysis</span>. 
                    </p>
                    <p className="text-lg text-[#c9d1d9] leading-relaxed">
                      Supports various formats including 
                      <span className="text-[#58a6ff] font-semibold"> PPT</span>,
                      <span className="text-[#58a6ff] font-semibold"> CV</span>,
                      <span className="text-[#58a6ff] font-semibold"> Resume</span>, 
                      and more.
                    </p>
                  </div>
                </motion.div>

                <div className="mt-8">
                  <Chat />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 