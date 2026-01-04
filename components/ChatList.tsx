
import React from 'react';
import { DUMMY_ITEMS } from '../constants';
import { User } from '../types';

interface ChatListProps {
  onChatSelect: (user: User) => void;
}

const ChatList: React.FC<ChatListProps> = ({ onChatSelect }) => {
  return (
    <div className="p-4 animate-in fade-in slide-in-from-bottom-4">
      <h2 className="text-3xl font-black text-stone-800 mb-6">Messages</h2>
      
      <div className="space-y-4">
        {DUMMY_ITEMS.map((item, idx) => (
          <div 
            key={item.id} 
            onClick={() => onChatSelect(item.owner)}
            className="bg-white p-4 rounded-[32px] shadow-sm border border-stone-100 flex items-center gap-4 hover:bg-stone-50 transition-colors cursor-pointer active:scale-[0.98]"
          >
            <div className="relative">
              <img src={item.owner.avatar} className="w-16 h-16 rounded-2xl object-cover" />
              {idx === 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-stone-800 truncate">{item.owner.name}</h4>
                <span className="text-[10px] font-bold text-stone-300 uppercase">2:30 PM</span>
              </div>
              <p className="text-xs text-emerald-600 font-bold mb-1 truncate">Item: {item.title}</p>
              <p className="text-sm text-stone-400 truncate">
                {idx === 0 ? "Typing..." : "I can come pick it up tomorrow from Johar Town if that works for you?"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 border-2 border-dashed border-stone-200 rounded-[40px] text-center">
         <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-300">
           <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.8 8.38 8.38 0 0 1 3.8.9L21 3z"/></svg>
         </div>
         <h4 className="text-stone-400 font-bold">Community Chat</h4>
         <p className="text-stone-300 text-xs mt-1">Chat with trusted community members nearby</p>
         <button className="mt-4 px-6 py-2 bg-stone-100 text-stone-500 rounded-full text-xs font-bold hover:bg-stone-200 transition-colors">Coming Soon</button>
      </div>
    </div>
  );
};

export default ChatList;
