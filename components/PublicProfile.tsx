
import React from 'react';
import { User, Item, ItemMode } from '../types';
import { DUMMY_ITEMS } from '../constants';

interface PublicProfileProps {
  user: User;
  onBack: () => void;
  onViewItem: (item: Item) => void;
}

const PublicProfile: React.FC<PublicProfileProps> = ({ user, onBack, onViewItem }) => {
  const userItems = DUMMY_ITEMS.filter(item => item.owner.id === user.id);

  return (
    <div className="fixed inset-0 z-50 bg-[#fffaf5] flex flex-col animate-in slide-in-from-right duration-500 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center gap-2 border-b border-stone-100">
        <button 
          onClick={onBack} 
          className="flex items-center gap-1 p-2 text-stone-600 hover:bg-stone-100 rounded-full transition-colors active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
          <span className="text-sm font-bold">Back</span>
        </button>
        <div className="flex-1 text-right">
          <h3 className="font-black text-stone-800 text-lg">Member Profile</h3>
        </div>
      </div>

      <div className="p-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <img src={user.avatar} className="w-28 h-28 rounded-[36px] shadow-xl border-4 border-white object-cover" />
            {user.verified && (
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1.5 rounded-xl border-2 border-stone-50">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
            )}
          </div>
          <h2 className="text-2xl font-black text-stone-800">{user.name}</h2>
          <p className="text-stone-400 font-medium mb-4">{user.area}, Lahore</p>
          <p className="text-center text-sm text-stone-600 max-w-xs mb-6 italic">"{user.bio}"</p>
          
          <div className="flex gap-4 w-full max-w-sm">
            <div className="flex-1 bg-white p-3 rounded-2xl shadow-sm border border-stone-100 text-center">
              <p className="text-stone-400 text-[8px] font-bold uppercase tracking-widest mb-1">Kindness</p>
              <p className="text-emerald-600 font-black">{user.kindnessScore}%</p>
            </div>
            <div className="flex-1 bg-white p-3 rounded-2xl shadow-sm border border-stone-100 text-center">
              <p className="text-stone-400 text-[8px] font-bold uppercase tracking-widest mb-1">Exchanges</p>
              <p className="text-stone-800 font-black">{user.successfulExchanges}</p>
            </div>
            <div className="flex-1 bg-white p-3 rounded-2xl shadow-sm border border-stone-100 text-center">
              <p className="text-stone-400 text-[8px] font-bold uppercase tracking-widest mb-1">Joined</p>
              <p className="text-stone-800 font-black">{user.accountAge}</p>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="mb-8">
          <h3 className="text-lg font-black text-stone-800 mb-4">Sharing from {user.name}</h3>
          <div className="grid grid-cols-2 gap-4">
            {userItems.map(item => (
              <div 
                key={item.id} 
                onClick={() => onViewItem(item)}
                className="bg-white rounded-[28px] overflow-hidden shadow-sm border border-stone-100 active:scale-95 transition-transform"
              >
                <div className="aspect-square relative">
                  <img src={item.images[0]} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2">
                     <span className={`text-[7px] font-black uppercase px-2 py-1 rounded-lg text-white shadow-lg ${
                       item.mode === ItemMode.FREE ? 'bg-emerald-500' :
                       item.mode === ItemMode.BARTER ? 'bg-amber-500' : 'bg-sky-500'
                     }`}>
                       {item.mode}
                     </span>
                  </div>
                </div>
                <div className="p-3">
                   <h4 className="text-[11px] font-bold text-stone-800 truncate mb-1">{item.title}</h4>
                   <p className="text-[9px] text-stone-400 font-bold uppercase">{item.condition}</p>
                </div>
              </div>
            ))}
          </div>
          {userItems.length === 0 && (
            <div className="p-8 text-center bg-white rounded-[32px] border border-stone-100">
               <p className="text-stone-400 text-sm">No active listings currently.</p>
            </div>
          )}
        </div>

        <button className="w-full py-5 bg-stone-900 text-white font-bold rounded-[24px] shadow-xl active:scale-95 transition-all">
          Message {user.name.split(' ')[0]}
        </button>
      </div>
    </div>
  );
};

export default PublicProfile;
