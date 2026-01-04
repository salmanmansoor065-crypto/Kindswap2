
import React, { useState } from 'react';
import { ItemMode, ItemStatus } from '../types';
import { AREAS } from '../constants';

const PostItem: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [mode, setMode] = useState<ItemMode>(ItemMode.FREE);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [area, setArea] = useState(AREAS[0]);

  return (
    <div className="p-6 animate-in slide-in-from-bottom-10 duration-500">
      <h2 className="text-3xl font-black text-stone-800 mb-6">List an Item</h2>
      
      <div className="space-y-8">
        {/* Images */}
        <div>
          <label className="text-sm font-bold text-stone-400 uppercase tracking-widest block mb-4">Photos (min 2)</label>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-stone-100 border-2 border-dashed border-stone-300 rounded-[32px] flex flex-col items-center justify-center text-stone-400 hover:bg-stone-200 transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
              <span className="text-[10px] font-bold uppercase">Take Photo</span>
            </div>
            <div className="aspect-square bg-stone-100 border-2 border-dashed border-stone-300 rounded-[32px] flex flex-col items-center justify-center text-stone-400 hover:bg-stone-200 transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
              <span className="text-[10px] font-bold uppercase">From Gallery</span>
            </div>
          </div>
        </div>

        {/* Mode Selection */}
        <div>
          <label className="text-sm font-bold text-stone-400 uppercase tracking-widest block mb-4">Exchange Mode</label>
          <div className="flex gap-3">
            {[ItemMode.FREE, ItemMode.BARTER, ItemMode.LOW_PRICE].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-wider transition-all border-2 ${
                  mode === m 
                  ? m === ItemMode.FREE ? 'bg-emerald-500 text-white border-emerald-500' :
                    m === ItemMode.BARTER ? 'bg-amber-500 text-white border-amber-500' : 'bg-sky-500 text-white border-sky-500'
                  : 'bg-white text-stone-400 border-stone-100 hover:border-stone-200'
                }`}
              >
                {m.replace('_', ' ')}
              </button>
            ))}
          </div>
          <div className="mt-4 p-4 bg-stone-50 rounded-2xl border border-stone-200">
            {mode === ItemMode.FREE && <p className="text-xs text-stone-500 font-medium">✨ Boosting your kindness score by giving freely!</p>}
            {mode === ItemMode.BARTER && <p className="text-xs text-stone-500 font-medium">🔄 Direct item-for-item trade. Negotiate fairly.</p>}
            {mode === ItemMode.LOW_PRICE && <p className="text-xs text-stone-500 font-medium">💳 Secure payment held in escrow until swap complete.</p>}
          </div>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <input 
            placeholder="Title (e.g., Organic Honey from Hunza)" 
            className="w-full bg-white border-none shadow-sm rounded-2xl p-4 outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-stone-900 placeholder:text-stone-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select 
            className="w-full bg-white border-none shadow-sm rounded-2xl p-4 outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-stone-900 appearance-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option>Books</option>
            <option>Electronics</option>
            <option>Clothes</option>
            <option>Home & Decor</option>
          </select>
          <select 
            className="w-full bg-white border-none shadow-sm rounded-2xl p-4 outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-stone-900 appearance-none"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          >
            {AREAS.map(a => <option key={a}>{a}</option>)}
          </select>
          <textarea 
            placeholder="Tell us the story of this item..." 
            rows={4}
            className="w-full bg-white border-none shadow-sm rounded-2xl p-4 outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-stone-900 placeholder:text-stone-300"
          />
        </div>

        <button 
          onClick={onComplete}
          className="w-full bg-stone-900 text-white font-bold py-5 rounded-3xl shadow-xl hover:bg-stone-800 transition-all active:scale-95"
        >
          Post Item
        </button>
      </div>
    </div>
  );
};

export default PostItem;
