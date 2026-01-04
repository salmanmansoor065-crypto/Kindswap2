
import React, { useState } from 'react';
import { Item, ItemMode, User } from '../types';
import { DUMMY_ITEMS, DUMMY_STORIES } from '../constants';
import { translations, Language } from '../translations';

interface HomeProps {
  language: Language;
  userLocation: string;
  onLocationClick: () => void;
  onItemSelect: (item: Item) => void;
  onProfileSelect: (user: User) => void;
}

const Home: React.FC<HomeProps> = ({ 
  language, 
  userLocation, 
  onLocationClick, 
  onItemSelect, 
  onProfileSelect 
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [modeFilter, setModeFilter] = useState<string>('All');
  const t = translations[language];
  
  const categories = ['All', 'Books', 'Clothes', 'Electronics', 'Toys', 'Household'];
  const modes = ['All', 'Free', 'Barter', 'Sale'];

  const filteredItems = DUMMY_ITEMS.filter(item => {
    const catMatch = categoryFilter === 'All' || item.category === categoryFilter;
    const modeMatch = modeFilter === 'All' || 
      (modeFilter === 'Free' && item.mode === ItemMode.FREE) ||
      (modeFilter === 'Barter' && item.mode === ItemMode.BARTER) ||
      (modeFilter === 'Sale' && item.mode === ItemMode.LOW_PRICE);
    return catMatch && modeMatch;
  });

  return (
    <div className="pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Community Spotlight Banner */}
      <div className="px-6 pt-2 mb-8">
        <div className="relative h-48 rounded-[40px] overflow-hidden shadow-2xl group">
          <img 
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1200" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            alt="Community"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-start">
            <h2 className="text-white text-xl font-black mb-1">{t.welcome}, Khalid!</h2>
            <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest">3 neighbors shared today</p>
          </div>
        </div>
      </div>

      {/* Location & Search */}
      <div className="px-6">
        <div 
          onClick={onLocationClick}
          className="flex items-center gap-3 mb-6 bg-white/60 backdrop-blur-md p-4 rounded-3xl border border-stone-200/40 shadow-sm cursor-pointer hover:bg-white transition-colors active:scale-[0.98]"
        >
          <div className="w-10 h-10 bg-[#065f46] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#065f46]/20 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div className="flex-1 text-start">
            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.1em]">{t.sharingIn}</p>
            <p className="text-sm font-extrabold text-stone-900">{userLocation}</p>
          </div>
          <button className="text-[#065f46] text-xs font-extrabold bg-white px-3 py-1.5 rounded-xl border border-stone-100 shadow-sm">{t.change}</button>
        </div>

        <div className="relative mb-8 group">
          <input 
            type="text" 
            placeholder={t.searchPlaceholder} 
            className={`w-full bg-white border border-stone-100 shadow-xl shadow-stone-200/30 rounded-[28px] py-5 pr-4 text-stone-900 focus:ring-4 focus:ring-[#065f46]/5 focus:border-[#065f46] transition-all outline-none placeholder:text-stone-300 font-medium ${language === 'ur' ? 'pr-14' : 'pl-14'}`}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className={`absolute top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-[#065f46] transition-colors ${language === 'ur' ? 'right-5' : 'left-5'}`} width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
      </div>

      {/* Exchange Mode Filters (NEW) */}
      <div className="px-6 mb-6">
        <h3 className="text-xs font-black text-stone-400 uppercase tracking-widest mb-3 mx-2 text-start">{t.exchangeMode}</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {modes.map((m) => (
            <button
              key={m}
              onClick={() => setModeFilter(m)}
              className={`px-5 py-2.5 rounded-2xl whitespace-nowrap text-[11px] font-black uppercase tracking-wider transition-all duration-300 border ${
                modeFilter === m 
                ? 'bg-stone-900 text-white border-stone-900 shadow-lg' 
                : 'bg-white text-stone-400 border-stone-100'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-6 mb-10">
        <h3 className="text-xs font-black text-stone-400 uppercase tracking-widest mb-3 mx-2 text-start">{t.categories}</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-6 py-2.5 rounded-2xl whitespace-nowrap text-[11px] font-black uppercase tracking-wider transition-all duration-300 ${
                categoryFilter === cat 
                ? 'bg-[#065f46] text-white shadow-lg' 
                : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="px-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-xl font-black text-stone-800">{t.availableNear}</h3>
          <span className="text-[10px] font-bold text-stone-400">{filteredItems.length} {t.results}</span>
        </div>
        
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-5">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-stone-200/50 flex flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden" onClick={() => onItemSelect(item)}>
                  <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className={`absolute top-3 ${language === 'ur' ? 'right-3' : 'left-3'}`}>
                    <Badge mode={item.mode} />
                  </div>
                  {item.price && (
                    <div className={`absolute bottom-3 ${language === 'ur' ? 'left-3' : 'right-3'} bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg`}>
                      <p className="text-[10px] font-black text-stone-900">Rs. {item.price}</p>
                    </div>
                  )}
                </div>
                
                <div className="p-4 flex flex-col flex-1 text-start">
                  <h3 onClick={() => onItemSelect(item)} className="font-extrabold text-stone-900 text-sm leading-tight mb-2 line-clamp-2 hover:text-[#065f46] transition-colors">
                    {item.title}
                  </h3>
                  
                  {/* Barter Requirement Mention (NEW) */}
                  {item.mode === ItemMode.BARTER && item.barterFor && (
                    <div className="mb-3 px-2 py-1.5 bg-amber-50 rounded-xl border border-amber-100/50">
                      <p className="text-[9px] font-black text-amber-600 uppercase tracking-tighter leading-none mb-1">{t.tradingFor}</p>
                      <p className="text-[10px] font-bold text-amber-800 truncate">{item.barterFor}</p>
                    </div>
                  )}

                  <div className="mt-auto">
                    <div className="flex items-center gap-1.5 text-stone-400 text-[9px] font-bold uppercase tracking-wider mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                      {item.area}
                    </div>
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        onProfileSelect(item.owner);
                      }}
                      className="flex items-center gap-2 pt-3 border-t border-stone-50 hover:bg-stone-50 transition-colors p-1 rounded-xl"
                    >
                      <img src={item.owner.avatar} className="w-6 h-6 rounded-lg object-cover ring-2 ring-white shadow-sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] text-stone-600 font-extrabold truncate">{item.owner.name}</p>
                        <p className="text-[7px] text-emerald-500 font-black uppercase">{item.owner.kindnessScore}% {t.kind}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-[40px] border-2 border-dashed border-stone-100">
            <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <p className="text-sm font-bold text-stone-400">No items match your filters.</p>
            <p className="text-[10px] text-stone-300 mt-2 uppercase tracking-widest">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Badge: React.FC<{ mode: ItemMode }> = ({ mode }) => {
  switch (mode) {
    case ItemMode.FREE:
      return <span className="px-3 py-1.5 bg-[#065f46] text-white text-[10px] font-extrabold rounded-xl uppercase tracking-widest shadow-lg shadow-[#065f46]/20">Free</span>;
    case ItemMode.BARTER:
      return <span className="px-3 py-1.5 bg-[#f59e0b] text-white text-[10px] font-extrabold rounded-xl uppercase tracking-widest shadow-lg shadow-amber-500/20">Barter</span>;
    case ItemMode.LOW_PRICE:
      return <span className="px-3 py-1.5 bg-sky-500 text-white text-[10px] font-extrabold rounded-xl uppercase tracking-widest shadow-lg shadow-sky-500/20">Sale</span>;
    default:
      return null;
  }
};

export default Home;
