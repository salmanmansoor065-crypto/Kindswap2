
import React, { useState } from 'react';
import { Item, ItemMode, User } from '../types';

interface DetailsProps {
  item: Item;
  onBack: () => void;
  onProfileSelect: (user: User) => void;
}

const ItemDetails: React.FC<DetailsProps> = ({ item, onBack, onProfileSelect }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [reason, setReason] = useState('');

  const handleSendRequest = () => {
    if (reason.trim()) {
      setRequestSent(true);
    }
  };

  return (
    <div className="relative animate-in slide-in-from-right-10 duration-500 pb-12">
      {/* Hero Image */}
      <div className="relative h-[400px]">
        <img src={item.images[0]} className="w-full h-full object-cover" />
        
        {/* Enhanced Back Button */}
        <button 
          onClick={onBack}
          className="absolute top-10 left-4 flex items-center gap-2 px-4 py-2.5 bg-white text-[#065f46] rounded-full shadow-2xl border border-stone-100 hover:bg-stone-50 transition-all active:scale-95 z-50 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:-translate-x-0.5 transition-transform"><path d="m13 16-4-4 4-4"/></svg>
          <span className="text-sm font-black uppercase tracking-tight">Back</span>
        </button>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-50 to-transparent" />
      </div>

      <div className="px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-[40px] p-8 shadow-xl border border-stone-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex gap-2 mb-2">
                <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full ${
                  item.mode === ItemMode.FREE ? 'bg-emerald-100 text-emerald-700' : 
                  item.mode === ItemMode.BARTER ? 'bg-amber-100 text-amber-700' : 'bg-sky-100 text-sky-700'
                }`}>
                  {item.mode}
                </span>
                <span className="px-3 py-1 bg-stone-100 text-stone-600 text-[10px] font-bold uppercase rounded-full">
                  {item.condition}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-stone-800 leading-tight mb-1">{item.title}</h1>
              <p className="text-stone-400 text-sm font-medium">{item.area}, Lahore</p>
            </div>
            {item.price && (
              <div className="text-right">
                <p className="text-2xl font-black text-stone-800">Rs. {item.price}</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 py-6 border-y border-stone-100 my-6">
            <img src={item.owner.avatar} className="w-12 h-12 rounded-2xl object-cover" />
            <div className="flex-1">
              <h4 className="font-bold text-stone-800">{item.owner.name}</h4>
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full">
                   <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-emerald-500" stroke="currentColor" strokeWidth="3"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78c0 4.22 3 12.22 6 12.22 1.25 0 2.5-1.06 4-1.06Z" /></svg>
                   <span className="text-[10px] font-bold text-emerald-600">{item.owner.kindnessScore}% Kindness</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => onProfileSelect(item.owner)}
              className="text-emerald-600 font-bold text-sm bg-emerald-50 px-4 py-2 rounded-xl active:scale-95 transition-all"
            >
              View Profile
            </button>
          </div>

          <div className="mb-8">
            <h5 className="font-bold text-stone-800 mb-2">Description</h5>
            <p className="text-stone-600 leading-relaxed text-sm">
              {item.description}
            </p>
            {item.mode === ItemMode.BARTER && (
              <div className="mt-4 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                 <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Owner is looking for:</p>
                 <p className="text-amber-900 font-medium">{item.barterFor}</p>
              </div>
            )}
          </div>

          {!requestSent ? (
            <div className="space-y-4">
              <div className="relative">
                <textarea 
                  placeholder="Why do you need this item? Share a kind reason..."
                  rows={4}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-stone-50 border-stone-200 border-2 rounded-2xl p-4 text-sm text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-stone-400"
                />
              </div>
              <button 
                onClick={handleSendRequest}
                disabled={!reason.trim()}
                className="w-full bg-emerald-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-200 hover:bg-emerald-600 transition-all disabled:opacity-50 active:scale-95"
              >
                Send Kind Request
              </button>
              <p className="text-[10px] text-center text-stone-400 font-medium uppercase tracking-widest">
                Owner will choose based on kindness, not speed.
              </p>
            </div>
          ) : (
            <div className="bg-emerald-500 text-white p-6 rounded-3xl text-center animate-in zoom-in-95">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              <h4 className="text-xl font-bold mb-2">Request Sent!</h4>
              <p className="text-emerald-100 text-sm">Your kind request has been sent to {item.owner.name}. You'll be notified if they accept.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
