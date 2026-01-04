
import React from 'react';
import { translations, Language } from '../translations';

interface NavProps {
  activeTab: string;
  language: Language;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavProps> = ({ activeTab, language, onTabChange }) => {
  const t = translations[language];

  const tabs = [
    { id: 'home', label: t.home, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
    { id: 'impact', label: t.impact, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> },
    { id: 'post', label: t.post, icon: <div className="bg-emerald-500 text-white p-2 rounded-full shadow-lg transform -translate-y-2 border-4 border-stone-50"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div> },
    { id: 'chat', label: t.messages, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
    { id: 'profile', label: t.profile, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-stone-50/90 backdrop-blur-xl border-t border-stone-200 px-6 pt-3 pb-8 z-40">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === tab.id ? 'text-emerald-600 scale-110' : 'text-stone-400 hover:text-stone-600'}`}
          >
            {tab.icon}
            {tab.id !== 'post' && <span className="text-[10px] font-medium uppercase tracking-widest">{tab.label}</span>}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
