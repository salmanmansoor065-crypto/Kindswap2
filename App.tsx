
import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import Auth from './components/Auth';
import Navigation from './components/Navigation';
import Home from './components/Home';
import PostItem from './components/PostItem';
import ChatList from './components/ChatList';
import ChatDetail from './components/ChatDetail';
import Profile from './components/Profile';
import PublicProfile from './components/PublicProfile';
import SettingsDetail from './components/SettingsDetail';
import ImpactStories from './components/ImpactStories';
import ItemDetails from './components/ItemDetails';
import LocationSelector from './components/LocationSelector';
import Logo from './components/Logo';
import { Item, User, AppNotification } from './types';
import { DUMMY_USERS, DUMMY_ITEMS } from './constants';
import { translations, Language } from './translations';

type Screen = 'home' | 'post' | 'chat' | 'profile' | 'impact' | 'details' | 'chat-detail' | 'settings-detail' | 'user-profile';

const DUMMY_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    title: 'New Kind Request',
    message: 'Ali Raza sent a request for your Cotton Kurta. "I would love to wear this for my brother\'s Nikah."',
    time: '2m ago',
    isRead: false,
    type: 'request'
  },
  {
    id: 'n2',
    title: 'Kindness Boost!',
    message: 'MashAllah! Your kindness score has increased to 99%. You are a pillar of the community.',
    time: '1h ago',
    isRead: false,
    type: 'system'
  },
  {
    id: 'n3',
    title: 'Nearby Gem',
    message: 'Usman Malik just listed a "Vintage Film Camera" in Model Town. Check it out!',
    time: '3h ago',
    isRead: true,
    type: 'nearby'
  }
];

const App: React.FC = () => {
  const [phase, setPhase] = useState<'onboarding' | 'auth' | 'app'>('onboarding');
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [history, setHistory] = useState<Screen[]>(['home']);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedChatUser, setSelectedChatUser] = useState<User | null>(null);
  const [selectedUserProfile, setSelectedUserProfile] = useState<User | null>(null);
  const [settingsPageTitle, setSettingsPageTitle] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>(DUMMY_NOTIFICATIONS);
  const [currentUser] = useState<User>(DUMMY_USERS[0]);
  const [language, setLanguage] = useState<Language>('en');
  const [userLocation, setUserLocation] = useState('Gulberg, Lahore');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const t = translations[language];

  const navigateTo = (screen: Screen, data?: any) => {
    if (screen === 'details') setSelectedItem(data as Item);
    if (screen === 'chat-detail') setSelectedChatUser(data as User);
    if (screen === 'settings-detail') setSettingsPageTitle(data as string);
    if (screen === 'user-profile') setSelectedUserProfile(data as User);
    
    setHistory(prev => [...prev, screen]);
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // remove current
      const prevScreen = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('home');
      setHistory(['home']);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  if (phase === 'onboarding') return <Onboarding onComplete={() => setPhase('auth')} />;
  if (phase === 'auth') return <Auth onLogin={() => setPhase('app')} />;

  const isFullScreen = ['details', 'chat-detail', 'settings-detail', 'user-profile'].includes(currentScreen);

  return (
    <div 
      className={`min-h-screen pb-24 bg-[#fffaf5] text-stone-900 relative ${language === 'ur' ? 'font-urdu' : ''}`} 
      dir={language === 'ur' ? 'rtl' : 'ltr'}
    >
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-30 mix-blend-multiply transition-opacity duration-1000"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1542156822-6924d1a71aba?auto=format&fit=crop&q=80&w=2000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(100px) saturate(0.3)'
        }}
      />
      
      <div className="fixed top-[-10%] left-[-10%] w-[50%] aspect-square bg-[#065f46]/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] aspect-square bg-rose-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {!isFullScreen && (
        <header className="sticky top-0 z-30 bg-white/60 backdrop-blur-xl px-6 py-5 flex items-center justify-between border-b border-stone-200/20">
          <Logo size="sm" direction="row" />
          
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative w-11 h-11 flex items-center justify-center rounded-full transition-all active:scale-95 border shadow-sm ${
              showNotifications ? 'bg-[#065f46] text-white border-[#065f46]' : 'bg-white/80 text-stone-900 border-stone-100 hover:bg-stone-100/50 backdrop-blur'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            {unreadCount > 0 && (
              <span className={`absolute top-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse ${language === 'ur' ? 'left-2.5' : 'right-2.5'}`} />
            )}
          </button>
        </header>
      )}

      {showNotifications && !isFullScreen && (
        <div className="fixed inset-x-0 top-[76px] z-40 px-6 animate-in slide-in-from-top-4 duration-300">
          <div className="max-w-md mx-auto bg-white/95 backdrop-blur-2xl rounded-[32px] shadow-2xl border border-stone-100 overflow-hidden">
            <div className="p-5 border-b border-stone-50 flex justify-between items-center bg-stone-50/50">
              <h3 className="font-black text-stone-800 text-sm uppercase tracking-widest">Community Alerts</h3>
              <button 
                onClick={markAllAsRead}
                className="text-[10px] font-bold text-[#065f46] uppercase tracking-widest hover:opacity-70"
              >
                Mark all read
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              {notifications.map((n) => (
                <div 
                  key={n.id} 
                  className={`p-5 flex gap-4 border-b border-stone-50 transition-colors ${!n.isRead ? 'bg-[#065f46]/5' : 'bg-white'}`}
                >
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                    n.type === 'request' ? 'bg-amber-100 text-amber-600' :
                    n.type === 'system' ? 'bg-emerald-100 text-emerald-600' : 'bg-sky-100 text-sky-600'
                  }`}>
                    {n.type === 'request' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    ) : n.type === 'system' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78c0 4.22 3 12.22 6 12.22 1.25 0 2.5-1.06 4-1.06Z" /></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-start">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-stone-800 text-sm">{n.title}</h4>
                      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-tighter">{n.time}</span>
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">{n.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setShowNotifications(false)}
              className="w-full py-4 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] bg-stone-50 hover:bg-stone-100 transition-colors"
            >
              Close Panel
            </button>
          </div>
        </div>
      )}

      <main className="max-w-md mx-auto relative z-10" onClick={() => showNotifications && setShowNotifications(false)}>
        {currentScreen === 'home' && (
          <Home 
            language={language}
            userLocation={userLocation}
            onLocationClick={() => setIsLocationModalOpen(true)}
            onItemSelect={(item) => navigateTo('details', item)} 
            onProfileSelect={(user) => navigateTo('user-profile', user)}
          />
        )}
        {currentScreen === 'post' && <PostItem onComplete={() => setCurrentScreen('home')} />}
        {currentScreen === 'chat' && <ChatList onChatSelect={(user) => navigateTo('chat-detail', user)} />}
        {currentScreen === 'chat-detail' && selectedChatUser && (
          <ChatDetail user={selectedChatUser} onBack={goBack} />
        )}
        {currentScreen === 'profile' && (
          <Profile 
            user={currentUser} 
            language={language}
            onNavigateSettings={(title) => navigateTo('settings-detail', title)} 
            onLogout={() => setPhase('auth')} 
            onViewItem={(item) => navigateTo('details', item)}
          />
        )}
        {currentScreen === 'user-profile' && selectedUserProfile && (
          <PublicProfile 
            user={selectedUserProfile} 
            onBack={goBack}
            onViewItem={(item) => navigateTo('details', item)}
          />
        )}
        {currentScreen === 'settings-detail' && (
          <SettingsDetail 
            title={settingsPageTitle} 
            language={language} 
            onLanguageChange={setLanguage} 
            onBack={goBack} 
          />
        )}
        {currentScreen === 'impact' && <ImpactStories />}
        {currentScreen === 'details' && selectedItem && (
          <ItemDetails 
            item={selectedItem} 
            language={language}
            onBack={goBack} 
            onProfileSelect={(user) => navigateTo('user-profile', user)} 
          />
        )}
      </main>

      {!isFullScreen && (
        <Navigation 
          activeTab={currentScreen} 
          language={language}
          onTabChange={(tab) => {
            setCurrentScreen(tab as Screen);
            setHistory([tab as Screen]); // Reset history when using main nav
            setShowNotifications(false);
          }} 
        />
      )}

      {isLocationModalOpen && (
        <LocationSelector 
          language={language}
          currentLocation={userLocation}
          onSelect={(loc) => {
            setUserLocation(loc);
            setIsLocationModalOpen(false);
          }}
          onClose={() => setIsLocationModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
