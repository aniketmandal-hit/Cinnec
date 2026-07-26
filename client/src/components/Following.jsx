import React, { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { AppContent } from '../context/AuthContext.jsx';
import { Await, useNavigate } from 'react-router-dom';
import FollowersPage from './Followers.jsx';
import api from '../utils/Api.jsx';
import { toast } from 'react-toastify';

const FollowingPage = ({ userId }) => {
  const { isDarkMode } = useContext(AppContent);

  const [followingPage, setFollowingPage] = useState(false);

 

  const onclickHandler = async () => {
    setFollowingPage(true);

    try {
    
    {data.success ? toast.success(data.message) : toast.error(data.error)}
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div>
      {!followingPage ? (
        <div 
          onClick={onclickHandler}
          className="cursor-pointer inline-block select-none"
        >
          <p className="font-black text-base">42</p>
          <p className="text-[9px] font-bold uppercase opacity-50 tracking-wider">Following</p>
        </div>
      ) : (
        /* 🎯 createPortal teleports this view to document.body so it won't get trapped inside parent layouts */
        createPortal(
          <div className={`fixed inset-0 z-999 w-full h-screen overflow-y-auto p-4 sm:p-6 md:p-10 transition-colors duration-300 ${
            isDarkMode ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'
          }`}>
            <div className="max-w-4xl mx-auto space-y-6 relative">
              
              {/* ✕ Close Button */}
              <button
                onClick={() => setFollowingPage(false)}
                className={`absolute lg:-top-6 top-0 right-0 lg:-right-10 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold z-20 transition-transform active:scale-90 cursor-pointer ${
                  isDarkMode 
                    ? 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800' 
                    : 'bg-white text-slate-600 hover:text-slate-950 border border-slate-200 shadow-sm'
                }`}
              >
                ✕
              </button>

              {/* 🕷️ Header & Stats Section */}
              <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-dashed border-red-600/30 pr-12 sm:pr-0">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase flex items-center gap-2">
                    <span className="text-red-600">🕸️</span> Network
                  </h1>
                  <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                    Profiles you are currently tuned into
                  </p>
                </div>

                
              </header>

              {/* 🔍 Search Input Bar Shell */}
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search accounts you follow..."
                  className={`w-full px-4 py-3 pl-11 rounded-xl border text-sm font-medium outline-none transition-all focus:ring-2 ${
                    isDarkMode
                      ? 'bg-zinc-950 border-zinc-900 text-white placeholder-zinc-500 focus:border-red-600 focus:ring-red-600/30'
                      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-red-500 focus:ring-red-500/20'
                  }`}
                />
                <svg
                  className={`w-5 h-5 absolute left-3.5 top-3.5 stroke-current ${
                    isDarkMode ? 'text-zinc-500' : 'text-slate-400'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* 📋 Following User Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Card Template 1 */}
                <div className={`p-4 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                  isDarkMode 
                    ? 'bg-zinc-950/80 border-zinc-900 hover:border-red-900/50 hover:bg-zinc-900/50' 
                    : 'bg-white border-slate-200 hover:border-red-200 hover:shadow-md'
                }`}>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-11 h-11 rounded-full border-2 flex items-center justify-center text-sm font-black uppercase shrink-0 ${
                      isDarkMode ? 'bg-black border-red-700 text-red-500' : 'bg-red-50 border-red-500 text-red-600'
                    }`}>
                      G
                    </div>
                    <div className="min-w-0">
                      <h3 className={`text-sm font-bold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        Gwen Stacy
                      </h3>
                      <p className={`text-xs font-medium truncate ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                        @ghost_spider
                      </p>
                    </div>
                  </div>

                  <button className={`px-4 py-2 rounded-lg text-xs font-bold transition-all active:scale-95 shrink-0 ${
                    isDarkMode
                      ? 'bg-zinc-900 text-zinc-300 hover:bg-red-950/50 hover:text-red-400 border border-zinc-800'
                      : 'bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-600 border border-slate-200'
                  }`}>
                    Following
                  </button>
                </div>

                {/* Card Template 2 */}
                <div className={`p-4 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                  isDarkMode 
                    ? 'bg-zinc-950/80 border-zinc-900 hover:border-red-900/50 hover:bg-zinc-900/50' 
                    : 'bg-white border-slate-200 hover:border-red-200 hover:shadow-md'
                }`}>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-11 h-11 rounded-full border-2 flex items-center justify-center text-sm font-black uppercase shrink-0 ${
                      isDarkMode ? 'bg-black border-red-700 text-red-500' : 'bg-red-50 border-red-500 text-red-600'
                    }`}>
                      M
                    </div>
                    <div className="min-w-0">
                      <h3 className={`text-sm font-bold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        Miguel O'Hara
                      </h3>
                      <p className={`text-xs font-medium truncate ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                        @spidey_2099
                      </p>
                    </div>
                  </div>

                  <button className={`px-4 py-2 rounded-lg text-xs font-bold transition-all active:scale-95 shrink-0 ${
                    isDarkMode
                      ? 'bg-zinc-900 text-zinc-300 hover:bg-red-950/50 hover:text-red-400 border border-zinc-800'
                      : 'bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-600 border border-slate-200'
                  }`}>
                    Following
                  </button>
                </div>

              </div>

              {/* 🕸️ Empty State Shell */}
              <div className={`p-10 text-center rounded-2xl border border-dashed ${
                isDarkMode ? 'border-zinc-900 bg-zinc-950/40' : 'border-slate-200 bg-white'
              }`}>
                <div className="text-3xl mb-2">🕷️</div>
                <p className={`text-sm font-bold ${isDarkMode ? 'text-zinc-300' : 'text-slate-700'}`}>
                  You aren't following anyone yet
                </p>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                  Use search to find profiles and add them to your web!
                </p>
              </div>

            </div>
          </div>,
          document.body
        )
      )}
    </div>
  );
};

export default FollowingPage;