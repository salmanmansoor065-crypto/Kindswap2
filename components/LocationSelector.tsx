
import React, { useState, useMemo } from 'react';
import { translations, Language } from '../translations';
import { AREAS } from '../constants';

interface LocationSelectorProps {
  currentLocation: string;
  language: Language;
  onSelect: (location: string) => void;
  onClose: () => void;
}

const EXTENDED_AREAS = [
  ...AREAS,
  'Bahria Town',
  'Valencia',
  'Cavalry Ground',
  'Model Town',
  'Samanabad',
  'Garden Town',
  'Township',
  'Askari 11',
  'Askari 10',
  'Sabzazar',
  'Iqbal Town'
].sort();

const LocationSelector: React.FC<LocationSelectorProps> = ({ 
  currentLocation, 
  language, 
  onSelect, 
  onClose 
}) => {
  const t = translations[language];
  const [search, setSearch] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);

  const filteredAreas = useMemo(() => {
    return EXTENDED_AREAS.filter(area => 
      area.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleDetectLocation = () => {
    setIsDetecting(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, we'd reverse geocode here. 
          // For demo, we'll "detect" a nearby major area.
          setTimeout(() => {
            onSelect('DHA Phase 6');
            setIsDetecting(false);
          }, 1500);
        },
        (error) => {
          console.error("Error detecting location", error);
          setIsDetecting(false);
          alert("Could not detect location. Please select manually.");
        }
      );
    } else {
      setIsDetecting(false);
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:p-4 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white rounded-t-[40px] sm:rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-20 duration-500">
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <h3 className="text-xl font-black text-stone-800">{t.change} Location</h3>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Lahore, Pakistan</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-stone-50 text-stone-400 rounded-full flex items-center justify-center hover:bg-stone-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto scrollbar-hide">
          {/* Search */}
          <div className="relative group">
            <input 
              type="text" 
              placeholder={t.locationSearch}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full bg-stone-50 border-2 border-stone-100 rounded-2xl py-4 pr-4 text-sm font-bold text-stone-800 outline-none focus:border-emerald-500 focus:bg-white transition-all ${language === 'ur' ? 'pr-12' : 'pl-12'}`}
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`absolute top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-emerald-500 transition-colors ${language === 'ur' ? 'right-4' : 'left-4'}`} 
              width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"
            >
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
          </div>

          {/* Detect Button */}
          <button 
            onClick={handleDetectLocation}
            disabled={isDetecting}
            className="w-full flex items-center justify-center gap-3 py-4 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100 font-black text-sm hover:bg-emerald-100 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isDetecting ? (
              <div className="w-5 h-5 border-2 border-emerald-700/30 border-t-emerald-700 rounded-full animate-spin" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            )}
            {isDetecting ? t.detecting : t.detectLocation}
          </button>

          {/* List */}
          <div>
            <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-4 ml-2">{t.popularAreas}</h4>
            <div className="grid grid-cols-1 gap-2">
              {filteredAreas.map((area) => (
                <button
                  key={area}
                  onClick={() => onSelect(area)}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-start ${
                    currentLocation === area 
                    ? 'bg-stone-900 border-stone-900 text-white shadow-lg' 
                    : 'bg-white border-stone-100 text-stone-700 hover:border-emerald-200 hover:bg-emerald-50/30'
                  }`}
                >
                  <span className="font-bold text-sm">{area}</span>
                  {currentLocation === area && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17 4 12"/></svg>
                  )}
                </button>
              ))}
            </div>
            {filteredAreas.length === 0 && (
              <div className="py-12 text-center text-stone-400">
                <p className="text-sm font-bold">No areas found</p>
                <p className="text-[10px] uppercase tracking-widest mt-1">Try a different search</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 bg-stone-50 border-t border-stone-100">
          <p className="text-[10px] text-center text-stone-400 font-bold uppercase tracking-tighter">
            We only support Lahore at the moment. More cities coming soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;
