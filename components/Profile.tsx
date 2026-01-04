
import React, { useRef } from 'react';
import { User, Item, ItemMode } from '../types';
import { DUMMY_ITEMS } from '../constants';
import { translations, Language } from '../translations';

interface ProfileProps {
  user: User;
  language: Language;
  onNavigateSettings: (title: string) => void;
  onLogout: () => void;
  onViewItem: (item: Item) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, language, onNavigateSettings, onLogout, onViewItem }) => {
  const t = translations[language];
  const listingsRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { label: t.editProfile, icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg> },
    { label: t.myPosts, icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg> },
    { label: t.language, icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 8 6 6 6-6"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
    { label: t.paymentMethods, icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg> },
    { label: t.safetyCenter, icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
    { label: t.logout, icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg> }
  ];

  const myItems = DUMMY_ITEMS.filter(item => item.owner.id === user.id);

  const handleMenuClick = (label: string) => {
    if (label === t.logout) {
      onLogout();
    } else if (label === t.myPosts) {
      listingsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (label === t.language) {
      onNavigateSettings('Language');
    } else {
      // Find original EN label for internal logic if needed, or just pass title
      onNavigateSettings(label);
    }
  };

  return (
    <div className="p-4 animate-in fade-in slide-in-from-bottom-4">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-8 pt-4">
        <div className="relative mb-4 group">
          <img src={user.avatar} className="w-32 h-32 rounded-[40px] shadow-2xl border-4 border-white object-cover transition-transform group-hover:scale-105" />
          <button 
            onClick={() => onNavigateSettings('Edit Profile')}
            className={`absolute -bottom-2 bg-emerald-500 text-white p-2.5 rounded-2xl border-4 border-stone-50 shadow-lg active:scale-90 transition-all ${language === 'ur' ? '-left-2' : '-right-2'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
          </button>
        </div>
        <h2 className="text-3xl font-black text-stone-800">{user.name}</h2>
        <p className="text-stone-400 font-medium mb-4">{user.area}, Lahore</p>
        
        <div className="flex gap-4">
          <div className="bg-white px-6 py-3 rounded-3xl shadow-sm border border-stone-100 text-center">
            <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest mb-1">Since</p>
            <p className="text-stone-800 font-bold">{user.accountAge}</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-3xl shadow-sm border border-stone-100 text-center">
            <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest mb-1">Swaps</p>
            <p className="text-stone-800 font-bold">{user.successfulExchanges}</p>
          </div>
        </div>
      </div>

      {/* Reputation Panel */}
      <div className="bg-white rounded-[40px] p-8 shadow-sm border border-stone-100 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-stone-800">Reputation</h3>
          <div className="flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-2xl">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-emerald-500" stroke="currentColor" strokeWidth="2.5"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78c0 4.22 3 12.22 6 12.22 1.25 0 2.5-1.06 4-1.06Z" /></svg>
            <span className="text-sm font-black text-emerald-600">{user.kindnessScore}%</span>
          </div>
        </div>

        <div className="h-2.5 bg-stone-100 rounded-full overflow-hidden mb-6">
          <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${user.kindnessScore}%` }} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 text-start">
            <p className="text-[10px] text-stone-400 font-bold uppercase mb-1">On-Time Rate</p>
            <p className="text-base font-bold text-stone-800">100%</p>
          </div>
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 text-start">
            <p className="text-[10px] text-stone-400 font-bold uppercase mb-1">Cancellations</p>
            <p className="text-base font-bold text-stone-800">0</p>
          </div>
        </div>
      </div>

      {/* Profile Menu */}
      <div className="space-y-3 mb-10">
        <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4 mx-2 text-start">Quick Actions</h3>
        {menuItems.map((item) => (
          <button 
            key={item.label} 
            onClick={() => handleMenuClick(item.label)}
            className={`w-full flex items-center justify-between p-5 bg-white rounded-3xl border border-stone-100 hover:bg-stone-50 transition-all active:scale-[0.98] ${
              item.label === t.logout ? 'hover:border-rose-100 group' : 'hover:border-emerald-100'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-xl ${
                item.label === t.logout ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-600'
              }`}>
                {item.icon}
              </div>
              <span className={`font-bold text-sm ${item.label === t.logout ? 'text-rose-500' : 'text-stone-700'}`}>
                {item.label}
              </span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" className={`text-stone-300 group-hover:text-rose-300 transition-colors ${language === 'ur' ? 'rotate-180' : ''}`}><path d="m9 18 6-6-6-6"/></svg>
          </button>
        ))}
      </div>

      {/* My Listings Section */}
      <div ref={listingsRef} className="pt-4 scroll-mt-20">
        <div className="flex justify-between items-center mb-6 px-2">
          <h3 className="text-xl font-black text-stone-800">{t.myPosts}</h3>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">
            {myItems.length} Items
          </span>
        </div>
        
        {myItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-5">
            {myItems.map(item => (
              <div 
                key={item.id} 
                onClick={() => onViewItem(item)}
                className="group bg-white rounded-[32px] overflow-hidden shadow-sm border border-stone-100 active:scale-95 transition-all hover:shadow-xl"
              >
                <div className="relative aspect-square">
                  <img src={item.images[0]} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/5" />
                  <div className={`absolute top-2 ${language === 'ur' ? 'right-2' : 'left-2'}`}>
                    <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-lg shadow-sm ${
                      item.mode === ItemMode.FREE ? 'bg-emerald-500 text-white' :
                      item.mode === ItemMode.BARTER ? 'bg-amber-500 text-white' : 'bg-sky-500 text-white'
                    }`}>
                      {item.mode}
                    </span>
                  </div>
                </div>
                <div className="p-4 text-start">
                   <h4 className="text-xs font-bold text-stone-800 truncate mb-1">{item.title}</h4>
                   <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-[40px] border-2 border-dashed border-stone-100">
            <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
            </div>
            <p className="text-sm font-bold text-stone-400">You haven't posted any items yet.</p>
            <p className="text-[10px] text-stone-300 mt-2 uppercase tracking-widest">Start your kindness journey</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
