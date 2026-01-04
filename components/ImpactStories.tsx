
import React, { useState } from 'react';
import { DUMMY_STORIES, DUMMY_USERS } from '../constants';
import { KindStory } from '../types';

const ImpactStories: React.FC = () => {
  const [stories, setStories] = useState<KindStory[]>(DUMMY_STORIES);
  const [isPosting, setIsPosting] = useState(false);
  const [newStoryContent, setNewStoryContent] = useState('');

  const handlePostStory = () => {
    if (!newStoryContent.trim()) return;

    const newStory: KindStory = {
      id: `s${Date.now()}`,
      userId: DUMMY_USERS[0].id,
      userName: DUMMY_USERS[0].name,
      userAvatar: DUMMY_USERS[0].avatar,
      content: newStoryContent,
      appreciations: 0,
      // Random placeholder image for the story to maintain the aesthetic
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=800'
    };

    setStories([newStory, ...stories]);
    setNewStoryContent('');
    setIsPosting(false);
  };

  return (
    <div className="p-4 animate-in fade-in slide-in-from-bottom-4 relative">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-stone-800 mb-2">Community Impact</h2>
        <p className="text-stone-500 text-sm font-medium">Kindness is contagious in Lahore. See how people are helping each other.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {stories.map((story) => (
          <div key={story.id} className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-stone-100 flex flex-col animate-in zoom-in-95 duration-500">
            {story.image && (
              <img src={story.image} className="w-full aspect-[16/10] object-cover" alt="Impact" />
            )}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <img src={story.userAvatar} className="w-10 h-10 rounded-full border-2 border-emerald-50" />
                <div>
                  <h4 className="font-bold text-stone-800 leading-none mb-1">{story.userName}</h4>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Verified Resident</p>
                </div>
              </div>
              <p className="text-stone-600 leading-relaxed italic">
                "{story.content}"
              </p>
              <div className="mt-6 pt-6 border-t border-stone-50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-emerald-500" stroke="currentColor" strokeWidth="3"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78c0 4.22 3 12.22 6 12.22 1.25 0 2.5-1.06 4-1.06Z" /></svg>
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{story.appreciations} Appreciations</span>
                </div>
                <button className="p-2 text-emerald-500 bg-emerald-50 rounded-full hover:bg-emerald-100 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2.5"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78c0 4.22 3 12.22 6 12.22 1.25 0 2.5-1.06 4-1.06Z" /></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 rounded-[40px] bg-emerald-500 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
        <h3 className="text-2xl font-black mb-2">Share your story</h3>
        <p className="text-emerald-50 text-sm mb-6">How did you help your neighbor today?</p>
        <button 
          onClick={() => setIsPosting(true)}
          className="w-full bg-white text-emerald-600 font-bold py-3 rounded-2xl hover:bg-emerald-50 transition-colors active:scale-95 shadow-lg shadow-black/10"
        >
          Post a Kind Story
        </button>
      </div>

      {/* Post Story Modal */}
      {isPosting && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-end justify-center p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-white rounded-[40px] p-8 shadow-2xl animate-in slide-in-from-bottom-20 duration-500">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black text-stone-800">New Story</h3>
              <button 
                onClick={() => setIsPosting(false)}
                className="p-2 bg-stone-100 rounded-full text-stone-400 hover:text-stone-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-100">
                <img src={DUMMY_USERS[0].avatar} className="w-10 h-10 rounded-full border-2 border-white" />
                <div>
                  <p className="text-sm font-bold text-stone-800">{DUMMY_USERS[0].name}</p>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Sharing kindly from DHA</p>
                </div>
              </div>

              <textarea 
                placeholder="What happened? (e.g., Today I helped a neighbor find their lost kitten...)"
                rows={5}
                value={newStoryContent}
                onChange={(e) => setNewStoryContent(e.target.value)}
                className="w-full bg-stone-50 border-stone-200 border-2 rounded-3xl p-5 text-sm text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-stone-300"
              />

              <div className="flex gap-4">
                <button 
                  onClick={() => setIsPosting(false)}
                  className="flex-1 py-4 text-sm font-bold text-stone-400 bg-stone-100 rounded-2xl hover:bg-stone-200 transition-colors"
                >
                  Discard
                </button>
                <button 
                  onClick={handlePostStory}
                  disabled={!newStoryContent.trim()}
                  className="flex-[2] py-4 bg-emerald-500 text-white text-sm font-bold rounded-2xl shadow-xl shadow-emerald-100 hover:bg-emerald-600 transition-all active:scale-95 disabled:opacity-50"
                >
                  Post to Community
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImpactStories;
