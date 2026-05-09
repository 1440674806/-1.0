import { motion, AnimatePresence } from 'motion/react';
import { Mic, Square, Sparkles, Send } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../services/languageContext';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export default function VoiceInterface() {
  const { t, language } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // Initialize greeting on mount or language change if empty
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ 
        id: '1', 
        role: 'ai', 
        text: t.ai_greeting, 
        timestamp: new Date() 
      }]);
    }
  }, [t.ai_greeting, messages.length]);

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    // Real implementation would use Web Speech API here
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, newUserMsg]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'ai', 
        text: t.ai_followup, 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white/[0.01]">
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/20 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest text-white/60 font-mono">{t.channel_live}</span>
        </div>
        <Sparkles size={14} className="text-white/40" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth mask-fade-edges">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className={`max-w-[85%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-white/10 text-white border border-white/5' 
                  : 'text-white/80 font-light leading-relaxed'
              }`}>
                {msg.text}
              </div>
              <span className="text-[8px] mt-2 font-mono text-white/20 uppercase tracking-widest">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="p-6 pt-0">
        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.compose_placeholder}
            className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 pr-32 text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-white/20"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
             <button
              onClick={handleToggleRecording}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isRecording ? 'bg-red-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
              }`}
            >
              {isRecording ? <Square size={16} /> : <Mic size={16} />}
            </button>
            <button
              onClick={handleSend}
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
