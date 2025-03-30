import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiSend, FiUpload } from 'react-icons/fi';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    try {
      setIsLoading(true);
      // Add your chat submission logic here
      setMessages([...messages, { role: 'user', content: input, id: Date.now() }]);
      setInput('');
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Add your file handling logic here
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-[#0d1117] rounded-xl shadow-2xl border border-[#30363d]">
      <div className="p-4 border-b border-[#30363d] bg-[#161b22]">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-[#238636]" />
          <div className="w-2 h-2 rounded-full bg-[#f0883e]" />
          <div className="w-2 h-2 rounded-full bg-[#58a6ff]" />
          <h2 className="ml-4 text-lg font-medium text-[#c9d1d9]">Chat Assistant</h2>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#f85149] bg-opacity-10 border border-[#f85149] border-opacity-20 text-[#f85149] px-4 py-2 m-4 rounded-lg"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#30363d] scrollbar-track-[#21262d]">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-xl px-6 py-3 ${
                  message.role === 'user'
                    ? 'bg-[#238636] text-[#c9d1d9]'
                    : 'bg-[#21262d] text-[#c9d1d9]'
                } border border-[#30363d]`}
              >
                <pre className="whitespace-pre-wrap font-sans">{message.content}</pre>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-center space-x-2 bg-[#21262d] text-[#c9d1d9] rounded-full px-4 py-2 border border-[#30363d]">
              <div className="flex space-x-1">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.1 }}
                  className="w-2 h-2 bg-[#238636] rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.2 }}
                  className="w-2 h-2 bg-[#238636] rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.3 }}
                  className="w-2 h-2 bg-[#238636] rounded-full"
                />
              </div>
              <span>Processing</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-[#161b22] border-t border-[#30363d]">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".txt,.doc,.docx,.pdf,.ppt,.pptx"
          />
          <motion.button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex-none rounded-lg bg-[#21262d] px-4 py-2.5 text-[#c9d1d9] border border-[#30363d] hover:bg-[#30363d]"
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiUpload className="w-5 h-5" />
          </motion.button>
          <div className="relative flex-1">
            <FiMessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8b949e] w-5 h-5" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full rounded-lg border-0 py-2.5 pl-10 pr-4 text-[#c9d1d9] bg-[#21262d] placeholder:text-[#8b949e] focus:ring-2 focus:ring-[#238636] border border-[#30363d]"
              disabled={isLoading}
            />
          </div>
          <motion.button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex-none rounded-lg bg-[#238636] px-4 py-2.5 text-[#c9d1d9] hover:bg-[#2ea043] disabled:opacity-50 disabled:cursor-not-allowed border border-[#238636]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiSend className="w-5 h-5" />
          </motion.button>
        </form>
      </div>
    </div>
  );
} 