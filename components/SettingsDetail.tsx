
import React, { useState } from 'react';
import { AREAS } from '../constants';
import { translations, Language } from '../translations';

interface SettingsDetailProps {
  title: string;
  language: Language;
  onLanguageChange?: (lang: Language) => void;
  onBack: () => void;
}

type PaymentMethod = 'EasyPaisa' | 'JazzCash' | 'Card' | null;

const SettingsDetail: React.FC<SettingsDetailProps> = ({ title, language, onLanguageChange, onBack }) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const t = translations[language];

  const renderLanguageSelection = () => (
    <div className="space-y-4 animate-in fade-in duration-500">
      <p className="text-stone-400 text-sm font-medium mb-6 px-2">{t.selectLanguage}</p>
      
      <button 
        onClick={() => onLanguageChange?.('en')}
        className={`w-full group bg-white rounded-[32px] p-6 border shadow-sm flex items-center justify-between transition-all active:scale-[0.98] ${
          language === 'en' ? 'border-emerald-500 bg-emerald-50/30' : 'border-stone-100 hover:border-emerald-200'
        }`}
      >
        <div className="flex items-center gap-5">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg shadow-lg ${
            language === 'en' ? 'bg-emerald-500 text-white' : 'bg-stone-100 text-stone-400'
          }`}>EN</div>
          <div className="text-start">
            <h4 className="font-extrabold text-stone-800">{t.english}</h4>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Primary Language</p>
          </div>
        </div>
        {language === 'en' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" className="text-emerald-500"><path d="M20 6 9 17 4 12"/></svg>}
      </button>

      <button 
        onClick={() => onLanguageChange?.('ur')}
        className={`w-full group bg-white rounded-[32px] p-6 border shadow-sm flex items-center justify-between transition-all active:scale-[0.98] ${
          language === 'ur' ? 'border-emerald-500 bg-emerald-50/30' : 'border-stone-100 hover:border-emerald-200'
        }`}
      >
        <div className="flex items-center gap-5">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg shadow-lg font-urdu ${
            language === 'ur' ? 'bg-emerald-500 text-white' : 'bg-stone-100 text-stone-400'
          }`}>اردو</div>
          <div className="text-start">
            <h4 className="font-extrabold text-stone-800 font-urdu">{t.urdu}</h4>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">مقامی زبان</p>
          </div>
        </div>
        {language === 'ur' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" className="text-emerald-500"><path d="M20 6 9 17 4 12"/></svg>}
      </button>
    </div>
  );

  const renderPaymentMethods = () => {
    if (selectedMethod) {
      return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
          <button 
            onClick={() => setSelectedMethod(null)}
            className="flex items-center gap-2 text-[#065f46] font-bold text-sm mb-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" className={language === 'ur' ? 'rotate-180' : ''}><path d="m10 13-5-5 5-5"/></svg>
            Back to Methods
          </button>

          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-stone-100">
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xs ${
                selectedMethod === 'EasyPaisa' ? 'bg-emerald-500' : 
                selectedMethod === 'JazzCash' ? 'bg-red-600' : 'bg-stone-900'
              }`}>
                {selectedMethod === 'EasyPaisa' ? 'EP' : selectedMethod === 'JazzCash' ? 'JC' : 'VISA'}
              </div>
              <div className="text-start">
                <h4 className="text-xl font-black text-stone-800">{selectedMethod}</h4>
                <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">Secure Connection</p>
              </div>
            </div>

            {selectedMethod === 'Card' ? (
              <div className="space-y-5 text-start">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase ml-2">Cardholder Name</label>
                  <input type="text" placeholder="Khalid Karim" className="w-full bg-stone-50 border-stone-100 border-2 rounded-2xl p-4 text-sm outline-none focus:border-[#065f46] transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase ml-2">Card Number</label>
                  <input type="text" placeholder="xxxx xxxx xxxx xxxx" className="w-full bg-stone-50 border-stone-100 border-2 rounded-2xl p-4 text-sm outline-none focus:border-[#065f46] transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-stone-400 uppercase ml-2">Expiry</label>
                    <input type="text" placeholder="MM/YY" className="w-full bg-stone-50 border-stone-100 border-2 rounded-2xl p-4 text-sm outline-none focus:border-[#065f46] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-stone-400 uppercase ml-2">CVV</label>
                    <input type="password" placeholder="***" className="w-full bg-stone-50 border-stone-100 border-2 rounded-2xl p-4 text-sm outline-none focus:border-[#065f46] transition-all" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-5 text-start">
                <p className="text-sm text-stone-500 leading-relaxed mb-4">
                  Connect your {selectedMethod} account for instant escrow payments and faster swaps in Lahore.
                </p>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase ml-2">Mobile Number</label>
                  <div className="relative">
                    <span className={`absolute top-1/2 -translate-y-1/2 text-sm font-bold text-stone-400 ${language === 'ur' ? 'right-4' : 'left-4'}`}>+92</span>
                    <input type="tel" placeholder="300 1234567" className={`w-full bg-stone-50 border-stone-100 border-2 rounded-2xl p-4 text-sm outline-none focus:border-[#065f46] transition-all ${language === 'ur' ? 'pr-14' : 'pl-14'}`} />
                  </div>
                </div>
              </div>
            )}

            <button className="w-full mt-8 bg-stone-900 text-white font-bold py-5 rounded-3xl shadow-xl active:scale-95 transition-all">
              Save Method
            </button>
          </div>
          
          <div className="p-6 bg-emerald-50 rounded-[32px] border border-emerald-100 flex gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-600 shrink-0"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <p className="text-xs text-emerald-800 leading-relaxed text-start">
              Your payment details are encrypted and never shared with the neighbor. Funds are only released when both parties confirm the swap.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4 animate-in fade-in duration-500">
        <p className="text-stone-400 text-sm font-medium mb-6 px-2 text-start">Select a primary method for escrow payments and barter adjustments.</p>
        
        <button 
          onClick={() => setSelectedMethod('EasyPaisa')}
          className="w-full group bg-white rounded-[32px] p-6 border border-stone-100 shadow-sm flex items-center justify-between hover:border-emerald-200 transition-all active:scale-[0.98]"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-black text-xs shadow-lg shadow-emerald-500/20">EP</div>
            <div className="text-left">
              <h4 className="font-extrabold text-stone-800">EasyPaisa</h4>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Instant Mobile Wallet</p>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" className={`text-stone-200 group-hover:text-emerald-500 transition-colors ${language === 'ur' ? 'rotate-180' : ''}`}><path d="m9 18 6-6-6-6"/></svg>
        </button>

        <button 
          onClick={() => setSelectedMethod('JazzCash')}
          className="w-full group bg-white rounded-[32px] p-6 border border-stone-100 shadow-sm flex items-center justify-between hover:border-red-200 transition-all active:scale-[0.98]"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white font-black text-xs shadow-lg shadow-red-600/20">JC</div>
            <div className="text-left">
              <h4 className="font-extrabold text-stone-800">JazzCash</h4>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Telco Wallet</p>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" className={`text-stone-200 group-hover:text-red-500 transition-colors ${language === 'ur' ? 'rotate-180' : ''}`}><path d="m9 18 6-6-6-6"/></svg>
        </button>

        <button 
          onClick={() => setSelectedMethod('Card')}
          className="w-full group bg-white rounded-[32px] p-6 border border-stone-100 shadow-sm flex items-center justify-between hover:border-sky-200 transition-all active:scale-[0.98]"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-stone-900 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-stone-900/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
            </div>
            <div className="text-left">
              <h4 className="font-extrabold text-stone-800">Debit/Credit Card</h4>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Visa, Mastercard, PayPak</p>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" className={`text-stone-200 group-hover:text-sky-500 transition-colors ${language === 'ur' ? 'rotate-180' : ''}`}><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    );
  };

  const renderContent = () => {
    switch(title) {
      case 'Language':
        return renderLanguageSelection();
      case t.editProfile:
      case 'Edit Profile':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-start">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" className="w-32 h-32 rounded-[40px] border-4 border-white shadow-xl object-cover" />
                <button className="absolute inset-0 bg-black/40 rounded-[40px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="white" strokeWidth="2.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                </button>
              </div>
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mt-4">Change Photo</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-stone-400 uppercase ml-2">Full Name</label>
                <input type="text" defaultValue="Khalid Karim" className="w-full bg-white border-2 border-stone-100 rounded-[24px] p-5 text-sm font-bold text-stone-800 outline-none focus:border-emerald-500 transition-all" />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-stone-400 uppercase ml-2">Bio</label>
                <textarea 
                  rows={4} 
                  defaultValue="Proud resident of Lahore. I believe in circular economy and helping neighbors." 
                  className="w-full bg-white border-2 border-stone-100 rounded-[24px] p-5 text-sm font-medium text-stone-700 outline-none focus:border-emerald-500 transition-all resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-stone-400 uppercase ml-2">Area (Lahore)</label>
                <select className="w-full bg-white border-2 border-stone-100 rounded-[24px] p-5 text-sm font-bold text-stone-800 outline-none focus:border-emerald-500 transition-all appearance-none">
                  {AREAS.map(area => <option key={area} selected={area === 'DHA'}>{area}</option>)}
                </select>
              </div>
            </div>

            <button onClick={onBack} className="w-full bg-stone-900 text-white font-bold py-5 rounded-[28px] shadow-xl active:scale-95 transition-all">
              {t.saveChanges}
            </button>
          </div>
        );
      case t.paymentMethods:
      case 'Payment Methods':
        return renderPaymentMethods();
      case 'Settings':
        return (
          <div className="space-y-6 text-start">
            <section className="bg-white rounded-[32px] p-6 shadow-sm border border-stone-100">
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">Account Information</h4>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-stone-50">
                  <span className="text-sm text-stone-600">Username</span>
                  <span className="text-sm font-bold text-stone-800">KhalidKarim_92</span>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-50">
                  <span className="text-sm text-stone-600">Email</span>
                  <span className="text-sm font-bold text-stone-800">khalid@gmail.com</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-stone-600">Phone</span>
                  <span className="text-sm font-bold text-stone-800">+92 300 1234567</span>
                </div>
              </div>
            </section>
          </div>
        );
      case t.safetyCenter:
      case 'Safety Center':
        return (
          <div className="space-y-4 text-start">
            <div className="bg-emerald-50 p-6 rounded-[32px] border border-emerald-100">
              <h4 className="font-bold text-emerald-900 mb-2">Our Community Pledge</h4>
              <p className="text-sm text-emerald-700 leading-relaxed italic">"In Lahore, we treat neighbors as family. Safety is our shared responsibility."</p>
            </div>
            {[
              { t: 'Meet in Public Places', d: 'Always choose well-lit areas like Gulberg Main Blvd or DHA H-Block markets.' },
              { t: 'Bring a Friend', d: 'Its always safer to have someone with you during a swap.' },
              { t: 'Trust the Score', d: 'Only trade with members who have high kindness scores.' }
            ].map(tip => (
              <div key={tip.t} className="bg-white p-6 rounded-[32px] border border-stone-100 shadow-sm">
                <h5 className="font-bold text-stone-800 mb-1">{tip.t}</h5>
                <p className="text-sm text-stone-500 leading-relaxed">{tip.d}</p>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
            <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <p className="font-bold text-stone-800">{title} Details</p>
            <p className="text-xs text-stone-500">Feature coming soon in the next update.</p>
          </div>
        );
    }
  };

  const headerTitle = title === 'Language' ? t.language : title;

  return (
    <div className="fixed inset-0 z-50 bg-[#fffaf5] flex flex-col animate-in slide-in-from-right duration-300 overflow-y-auto">
      <div className="bg-white px-4 py-4 flex items-center gap-4 border-b border-stone-100 sticky top-0 z-10">
        <button 
          onClick={() => selectedMethod ? setSelectedMethod(null) : onBack()} 
          className="p-2 text-stone-600 hover:bg-stone-100 rounded-full transition-colors active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" className={language === 'ur' ? 'rotate-180' : ''}><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h3 className="font-black text-stone-800 text-xl">{selectedMethod ? `Edit ${selectedMethod}` : headerTitle}</h3>
      </div>
      
      <div className="p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default SettingsDetail;
