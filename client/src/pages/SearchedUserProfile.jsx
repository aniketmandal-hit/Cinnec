import React, { useState, useEffect, useContext } from 'react'
import api from '../utils/Api.jsx' // Make sure this path matches your API utility
import { toast } from 'react-toastify'
import { AppContent } from '../context/AuthContext'

const SearchedProfile = ({ user, onBack }) => {
    const {isDarkMode} = useContext(AppContent)

  const [watchlist, setWatchlist] = useState([])
  const [loading, setLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false);

  // 🎯 Fetch the watchlist items from the backend using the user's ID
  useEffect(() => {
    const fetchUserWatchlist = async () => {
      try {
        setLoading(true)
        // Adjust this endpoint URL to match your backend routing (e.g., passing ID via query or params)
          const {data} = await api.get(`/api/watchlist/searched-watchlist?userId=${user._id}`) 
        if (data.success) {
          setWatchlist(data.watchlist)
        } else {
          toast.error(data.message || "Failed to load watchlist.")
        }
      } catch (error) {
        console.error("Error fetching searched user's watchlist:", error)
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (user?._id) {
      fetchUserWatchlist()
    }
  }, [user])

  if (!user) return null;

 

 return (
    <div className={`fixed inset-0 w-full h-full z-50 p-4 sm:p-6 overflow-y-auto animate-fadeIn transition-colors duration-200 
      ${isDarkMode ? 'bg-black text-slate-100' : 'bg-slate-50 text-slate-900'}`}
    >
      
      {/* 1. Header Control Bar */}
      <div className={`flex items-center justify-between mb-6 border-b pb-3 
        ${isDarkMode ? 'border-red-950/60' : 'border-slate-200'}`}
      >
        
        <button 
          onClick={onBack}
          className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 active:scale-95 
            ${isDarkMode 
              ? 'bg-red-950/40 text-red-400 border border-red-800/30 hover:bg-red-700 hover:text-white shadow-md shadow-red-950/50' 
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300 hover:text-slate-900'}`}
        >
          ✕ Close Profile
        </button>
      </div>

      {/* 2. Profile Details Grid */}
      <div className="max-w-6xl mx-auto space-y-6 mt-6">
        
        {/* Profile Card Header */}
        <div className="flex items-center gap-4 p-4 rounded-xl">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black uppercase shrink-0 
            ${isDarkMode 
              ? 'border-2 border-red-500 bg-red-950/30 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
              : 'border-2 border-red-600 bg-red-50 text-red-600 shadow-md'}`}
          >
            {user.username?.charAt(0) || 'U'}
          </div>
          <div>
            <h1 className={`text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {user.name}
              </h1>
            <p className={`text-xs uppercase tracking-widest font-bold ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
              @{user.username}
            </p>
          </div>
          <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-4 absolute right-15 sm:absolute top-40 lg:top-36 lg:right-35 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer active:scale-95 shadow-md
                  ${isFollowing 
                    ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700' 
                    : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/10'}`}
              >
                {isFollowing ? '✓ Following' : '➕ Follow'}
            </button>
        </div>

        {/* Watchlist Section */}
        <div className={`rounded-2xl p-4 sm:p-6 transition-all duration-200 
          ${isDarkMode 
            ? 'border border-red-950/20 bg-zinc-950/40 backdrop-blur-md shadow-lg shadow-black/40' 
            : 'border border-slate-200 bg-white shadow-md shadow-slate-200/50'}`}
        >
          <h3 className={`text-xs mb-6 uppercase tracking-widest font-black 
            ${isDarkMode ? 'text-red-400' : 'text-slate-500'}`}
          >
            Media Watchlist
          </h3>
          
          {loading ? (
            <p className={`text-xs text-center py-8 font-medium ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
              Loading application data...
            </p>
          ) : Array.isArray(watchlist) && watchlist.length > 0 ? (
            /* 🎯 Layout fix: Changed from vertical column grid to responsive wrapping flex row */
            <div className="flex flex-wrap gap-4 justify-start">
              {watchlist.map((item) => {
              

                return (
                  <div 
                    key={item._id} 
                    className={`p-3 rounded-xl flex gap-4 items-center w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] shrink-0 transition-all duration-300 
                      ${isDarkMode 
                        ? 'bg-zinc-950 border border-red-950/60 hover:border-red-600/40 shadow-sm shadow-black' 
                        : 'bg-slate-50 border border-slate-200 hover:border-slate-300 shadow-sm'}`}
                  >
                    {/* Poster Thumbnail Image */}
                    <div className={`w-14 h-20 rounded-lg overflow-hidden shrink-0 border flex items-center justify-center 
                      ${isDarkMode ? 'border-zinc-800 bg-zinc-900' : 'border-slate-200 bg-slate-200'}`}
                    >
                      {item.posterPath ? (
                        <img 
                          src={`https://image.tmdb.org/t/p/w500${item.posterPath}`} 
                          alt={item.title || item.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/150x220?text=No+Image'; }}
                        />
                      ) : (
                        <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-zinc-700' : 'text-slate-400'}`}>
                          No Image
                        </span>
                      )}
                    </div>
                       
                    {/* Media Metadata */}
                    <div className="flex-1 min-w-0 space-y-2">
                      {/* Media Name/Title */}
                      <h4 className={`text-sm font-bold truncate pr-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                        {item.mediaTitle || item.mediaName}
                      </h4>

                      {/* Info Row (Type and User Set Status) */}
                      <div className="flex flex-wrap items-center gap-2 text-[10px] font-black tracking-wider uppercase">
                        {/* Type Badge */}
                        {item.mediaType ?(<span className={`px-2 py-0.5 rounded-md border 
                          ${isDarkMode 
                            ? 'bg-red-950/40 text-red-400 border border-red-900/20' 
                            : 'bg-red-50 text-red-600 border border-red-200'}`}
                        >
                          {item.mediaType}
                        </span>) : (
                          <h1>m</h1>
                        )}
                        
                        
                        {/* Watch Status Badge */}
                        <span className={`px-2 py-0.5 rounded-md border 
                          ${isDarkMode 
                            ? 'bg-zinc-900 text-cyan-400 border border-cyan-950/60' 
                            : 'bg-sky-50 text-sky-700 border border-sky-200'}`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className={`text-xs text-center py-8 font-medium ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>
              This watchlist is currently empty.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchedProfile;