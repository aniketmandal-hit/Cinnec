import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // For routing to profile
import { AppContent } from '../context/AuthContext.jsx';
import tmdb, { tmdbEndpoints } from '../utils/Tmdb.jsx';

const Dashboard = () => {
  const { isDarkMode, setisDarkMode, user, setisLoggedin } = useContext(AppContent);
  const navigate = useNavigate();

  // Core Data States
  const [combinedMedia, setCombinedMedia] = useState([]); // 🧠 Mixed movies & anime together
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // Search Input States
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // 🛠️ NEW UI INTERACTION STATES
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null); // Triggers Detail Modal
  const [modalLoading, setModalLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null); // Holds runtime, genres, etc.

  // Fetch initial trending content
  useEffect(() => {
    const fetchDashboardContent = async () => {
      try {
        setLoading(true);
        setApiError(null);
        
        // 🚀 Fetch both at the same time
        const [movieRes, animeRes] = await Promise.all([
          tmdb.get(tmdbEndpoints.trendingMovies),
          tmdb.get(tmdbEndpoints.animeSeries)
        ]);
        
        const movieResults = movieRes.data.results || [];
        const animeResults = animeRes.data.results || [];

        // 🧠 MIX THEM HERE: Combine both arrays into one master list
        const blended = [...movieResults, ...animeResults];
        
        // Optional: Shuffle them so movies and anime are completely randomized together
        const shuffled = blended.sort(() => 0.5 - Math.random());
        
        setCombinedMedia(shuffled);
        
        // Set your featured banner background from the first movie with an image
        if (movieResults.length > 0) {
          const validHero = movieResults[0];
          setFeaturedMovie(validHero);
        }
      } catch (error) {
        console.error("TMDB Multi-Stream connection failed:", error);
        setApiError(error.response?.data?.status_message || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardContent();
  }, []);

  // Live Search Effect (Debounced)
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        try {
          // Multi-search automatically queries movies, TV shows, and anime mixed together
          const { data } = await tmdb.get('/search/multi', {
            params: { query: searchQuery }
          });
          setSearchResults(data.results);
        } catch (error) {
          console.error("Search failure:", error.message);
        }
      } else {
        setIsSearching(false);
        setSearchResults([]);
      }
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // 🛠️ LOGIC HANDLER: Click Card to open detail modal
  const handleCardClick = async (item) => {
    setSelectedMovie(item);
    setModalLoading(true);
    try {
      // Dynamic fallback check: Movies use .title, Anime/TV use .name
      const isMovie = item.title !== undefined;
      const endpointPath = isMovie ? `/movie/${item.id}` : `/tv/${item.id}`;
      
      const { data } = await tmdb.get(endpointPath);
      setMovieDetails(data);
    } catch (err) {
      console.error("Failed to fetch extended specs:", err);
    } finally {
      setModalLoading(false);
    }
  };

  const handleLogout = () => {
    setisLoggedin(false);
    navigate('/');
  };

  if (loading) {
    return (
      <div className={`w-full min-h-screen flex flex-col items-center justify-center font-bold
        ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-slate-50 text-zinc-900'}`}>
        <span className="text-red-600 text-2xl font-black tracking-widest animate-pulse">CINNECT</span>
        <p className="text-xs opacity-50 mt-1">Streaming watchlists...</p>
      </div>
    );
  }

  // Use search array or your blended master list array
  const displayedItems = isSearching ? searchResults : combinedMedia;

  return (
    <div className={`w-full min-h-screen pb-24 flex flex-col m-0 p-0 relative transition-colors duration-300
      ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-slate-50 text-zinc-900'}`}
    >
      
      {/* 👑 PROFILE HEADER ANCHOR (Top Right Controls) */}
      <div className="absolute top-6 right-12 z-50 flex items-center gap-4">
        <div className="relative">
          <button 
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="w-10 h-10 rounded-full bg-red-600 text-white font-black flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform"
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : 'E'}
          </button>

          {/* 👤 DROPDOWN MENU */}
          {profileDropdownOpen && (
            <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-2xl border p-1 animate-fadeIn flex flex-col gap-1 backdrop-blur-md
              ${isDarkMode ? 'bg-zinc-900/95 border-zinc-850' : 'bg-white/95 border-slate-200'}`}
            >
              <button 
                onClick={() => { navigate('/profile'); setProfileDropdownOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-xs font-bold rounded-lg transition-colors cursor-pointer
                  ${isDarkMode ? 'hover:bg-zinc-800 text-zinc-200' : 'hover:bg-slate-100 text-zinc-700'}`}
              >
                👤 View Profile
              </button>
              <button 
                onClick={()=>{setisDarkMode(!isDarkMode)}}
                className={`w-full text-left px-4 py-2.5 text-xs font-bold rounded-lg transition-colors cursor-pointer
                  ${isDarkMode ? 'hover:bg-zinc-800 text-zinc-200' : 'hover:bg-slate-100 text-zinc-700'}`}
              >
                {isDarkMode ? '🌙 Dark' : '☀️ Light'}
              </button>
              <hr className={isDarkMode ? 'border-zinc-800' : 'border-slate-100'} />
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
              >
                🚪 Log Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* HERO BANNER */}
      {!isSearching && featuredMovie && (
        <div className="relative w-full h-[45vh] flex items-end overflow-hidden mb-6">
          <div className="absolute inset-0">
            <img 
              src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`} 
              alt={featuredMovie.title}
              className="w-full h-full object-cover filter brightness-50"
            />
            <div className={`absolute inset-0 bg-linear-to-t ${isDarkMode ? 'from-zinc-950' : 'from-slate-50'}`} />
          </div>
          <div className="relative z-10 px-12 pb-6">
            <h1 className="text-4xl font-black drop-shadow cursor-pointer hover:text-red-500 transition-colors" onClick={() => handleCardClick(featuredMovie)}>
              {featuredMovie.title}
            </h1>
          </div>
        </div>
      )}

      <div className="w-full max-w-7xl mx-auto px-12 flex-1 mt-6">
        {/* HEADER & SEARCH BAR */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black">
              Welcome back, <span className="text-red-600">{user?.name }</span> 👋
            </h2>
            <p className="text-xs opacity-60 font-medium">Explore trending films or search inside your watch circle.</p>
          </div>

          {/* 🔍 THE OPERATIONAL SEARCH INPUT */}
          <div className="w-full md:w-80 relative right-15">
            <span className="absolute left-3.5 top-2.5 text-xs opacity-40">🔍</span>
            <input 
              type="text"
              placeholder="Search movies or anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full px-4 py-2 pl-9 rounded-xl text-xs outline-none border transition-all
                ${isDarkMode 
                  ? 'bg-zinc-900/80 border-zinc-800 focus:border-red-600 text-white placeholder-zinc-500' 
                  : 'bg-white border-slate-200 focus:border-red-500 text-zinc-900 placeholder-slate-400'}`}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2 text-xs opacity-50 hover:text-red-500 cursor-pointer">✕</button>
            )}
          </div>
        </header>

        {/* API ERROR COMPONENT VIEW */}
        {apiError ? (
          <div className="w-full p-6 my-4 border border-dashed border-red-500/30 bg-red-500/5 rounded-xl text-center">
            <p className="text-red-500 text-sm font-bold">⚠️ TMDB Stream Blocked</p>
            <p className="text-xs opacity-70 mt-1 font-mono">Reason: {apiError}</p>
          </div>
        ) : (
          <>
            <h3 className="text-xs font-black tracking-wider text-red-600 uppercase mb-4">
              {isSearching ? `Search Results for: "${searchQuery}"` : "Weekly Watchlist"}
            </h3>

            {/* 🍿 SINGLE MIXED GRID ROW */}
            {displayedItems.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {displayedItems.map((item) => {
                  if (!item.poster_path) return null;
                  return (
                    <div 
                      key={item.id} 
                      onClick={() => handleCardClick(item)}
                      className={`rounded-xl overflow-hidden aspect-2/3 relative group cursor-pointer border transform transition-all duration-500 hover:scale-102 hover:-translate-y-1
                        ${isDarkMode ? 'bg-zinc-900/40 border-zinc-800/60 hover:border-zinc-700' : 'bg-white border-slate-200 hover:border-slate-300'}`}
                    >
                      <img 
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                        alt={item.title || item.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:brightness-90 transition-all"
                      />
                      <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-black text-amber-400">
                        ★ {item.vote_average ? item.vote_average.toFixed(1) : '0.0'}
                      </div>
                      <div className="absolute bottom-0 left-0 w-full p-2 bg-linear-to-t from-black via-black/80 to-transparent text-white text-[11px] truncate font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.title || item.name} {/* 🧠 Handles both title and name parameters */}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-xs opacity-40 font-bold">No items loaded matching query.</div>
            )}
          </>
        )}
      </div>

      {/* 🪟 IMMERSIVE MOVIE DETAIL MODAL */}
      {selectedMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => { setSelectedMovie(null); setMovieDetails(null); }} />

          <div className={`relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border flex flex-col md:flex-row max-h-[85vh] md:max-h-none overflow-y-auto md:overflow-visible
            ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-slate-200 text-zinc-900'}`}
          >
            <button 
              onClick={() => { setSelectedMovie(null); setMovieDetails(null); }}
              className="absolute top-4 right-4 w-7 h-7 rounded-full hover:text-red-700 flex items-center justify-center text-xs font-bold z-20 cursor-pointer bg-zinc-800 text-zinc-400"
            >
              ✕
            </button>

            <div className="w-full md:w-2/5 aspect-2/3 md:aspect-auto md:h-125">
              <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={selectedMovie.title || selectedMovie.name} className="w-full h-full object-cover" />
            </div>

            <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-between h-auto md:h-125 overflow-y-auto">
              <div>
                <header className="mb-4">
                  <h2 className="text-xl md:text-2xl font-black tracking-tight leading-tight mb-1">
                    {selectedMovie.title || selectedMovie.name}
                  </h2>
                  <div className="flex items-center gap-3 text-[11px] font-bold opacity-60">
                    <span>{selectedMovie.release_date?.split('-')[0] || selectedMovie.first_air_date?.split('-')[0] || 'N/A'}</span>
                    <span>•</span>
                    <span className="text-amber-500 font-black">★ {selectedMovie.vote_average?.toFixed(1)}</span>
                    {movieDetails && (
                      <>
                        <span>•</span>
                        <span>⏱️ {movieDetails.runtime ? `${movieDetails.runtime} mins` : `${movieDetails.number_of_seasons} Seasons`}</span>
                      </>
                    )}
                  </div>
                </header>

                {movieDetails?.genres && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {movieDetails.genres.map(g => (
                      <span key={g.id} className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-slate-100 text-slate-600'}`}>{g.name}</span>
                    ))}
                  </div>
                )}

                <p className="text-xs md:text-sm font-medium leading-relaxed opacity-80 mb-6">{selectedMovie.overview}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-dashed border-zinc-800/10 dark:border-zinc-700/30">
                <button onClick={() => console.log("Watchlist modification logic triggered for ID:", selectedMovie.id)} className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-lg active:scale-95 cursor-pointer text-center">➕ Add to Watchlist</button>
                <button onClick={() => console.log("Review popup launcher initiated")} className={`flex-1 py-2.5 border text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer text-center ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800 text-white' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-zinc-800'}`}>✍️ Write Review</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;