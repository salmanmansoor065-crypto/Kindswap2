
import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';

interface ChatDetailProps {
  user: User;
  onBack: () => void;
}

const ChatDetail: React.FC<ChatDetailProps> = ({ user, onBack }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Assalam-o-Alaikum! Is the item still available?", sender: 'them', time: '2:30 PM' },
    { id: 2, text: "Walaikum Assalam! Yes, it is.", sender: 'me', time: '2:35 PM' },
    { id: 3, text: "Great! I can come pick it up tomorrow from Johar Town if that works for you?", sender: 'them', time: '2:36 PM' },
  ]);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-50 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-stone-100 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 text-stone-600 hover:bg-stone-100 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div className="relative">
           <img src={user.avatar} className="w-10 h-10 rounded-2xl object-cover" />
           <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-stone-800 leading-none mb-1">{user.name}</h3>
          <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Online</p>
        </div>
        <button className="p-2 text-stone-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-5 py-3 rounded-[24px] shadow-sm ${
              msg.sender === 'me' 
              ? 'bg-stone-900 text-white rounded-tr-none' 
              : 'bg-white text-stone-800 rounded-tl-none border border-stone-100'
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p className={`text-[9px] mt-1 font-bold uppercase tracking-wider ${msg.sender === 'me' ? 'text-stone-400 text-right' : 'text-stone-300'}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 pb-8 bg-white border-t border-stone-100">
        <div className="flex items-center gap-3 bg-stone-50 p-2 pl-4 rounded-[28px] border border-stone-200 focus-within:ring-2 focus-within:ring-emerald-500 transition-all">
          <input 
            type="text" 
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-transparent border-none outline-none py-2 text-sm text-stone-900 placeholder:text-stone-400"
          />
          <button 
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-100 active:scale-90 transition-all disabled:opacity-50 disabled:grayscale"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-0.5"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
