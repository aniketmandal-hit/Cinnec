import React, { useContext, useEffect, useState } from 'react';
import { AppContent } from '../context/AuthContext.jsx';
import { data, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../utils/Api.jsx';
import { toast } from 'react-toastify';
import SearchProfile from '../components/SearchProfile.jsx';

const Profile = (mediaId, mediaTitle, mediaName, mediaType, {userData= null, readOnly= false ,onBack}) => {
  const { isDarkMode,setisDarkMode, user, setuser, isloggedin, setisLoggedin} = useContext(AppContent);
  axios.defaults.withCredentials = true
  
 const profileToDisplay = userData || user

  const navigate = useNavigate()
  // Interactive UI States
  const [isFollowing, setIsFollowing] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false); 
  const [activeTab, setActiveTab] = useState('all'); 
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false); 
  const [profileButton, setprofileButton] = useState(false)
  const [loading, setLoading] = useState(true)

  // Editable Profile Form States
  const [profileName, setProfileName] = useState(profileToDisplay?.name|| '');
  const [profileBio, setProfileBio] = useState(profileToDisplay?.bio || 'Please enter your bio here');

  // Mock array strictly following the fields dictated by your Mongoose WatchlistSchema
  const [watchlistData, setWatchlistData] = useState(profileToDisplay?.watchlistData || []);

  useEffect(()=>{
    if(profileToDisplay){
      setProfileName(profileToDisplay.name)
      setProfileBio(profileToDisplay.bio)
      setWatchlistData(profileToDisplay.watchlistData)
    }
  }, [userData, user])


  useEffect(()=>{
    if(user?.name){
      setProfileName(user.name)
    }
    if(user?.bio){
      setProfileBio(user.bio)
    }
  }, [user])
  //Loading screen for refresh
  useEffect(()=>{
    const fetchProfileContent = async () => {
      
        setLoading(true);
        
        if (isloggedin === false) {
          navigate('/')
        } else{
          
    try {
        const {data} = await api.get('/api/watchlist/get')
        if(data.success){
          setWatchlistData(data.userWatchlist)
        }

      } catch (error) {
        console.log(error.message)
      } 
    
    finally{
      setLoading(false)
    }
        }
  }
    fetchProfileContent()
  }, [navigate])


    if (loading) {
    return (
      <div className={`w-full min-h-screen flex flex-col items-center justify-center font-bold
        ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-slate-50 text-zinc-900'}`}>
        <span className="text-red-600 text-2xl font-black tracking-widest animate-pulse">CINNECT</span>
        <p className="text-xs opacity-50 mt-1">Streaming watchlists...</p>
      </div>
    );
  }
   
  const statusOptions = ['Plan to Watch', 'Watching', 'Completed', 'Dropped', 'On Hold'];

  const updateItemStatus = async(mediaId, newStatus) => {
    try {
      const {data} = await api.put('/api/watchlist/update-status', {
        mediaId,
        status: newStatus
      })
      if (data.success) {
        toast.success(data.success)
        const updateStatus = filteredItems.map(watchItem => 
      watchItem.mediaId == mediaId ? { ...watchItem, status: newStatus } : watchItem
    )
       
   setWatchlistData(updateStatus)
    setProfileDropdownOpen(null); 
      }else{
        toast.error(data.error)
      }
    } catch (error) {
      toast.error(error.message)
    }
    
  };

   const handleLogout = async() => {
    try {
        const {data} = await api.post('/api/auth/logout')
  if(data.success){
    toast.success(data.message) 
    setisLoggedin(false);
    navigate('/');
  } else { toast.error(data.message)
        }
    } catch (error) {
      toast.error(error.message)
    }
  };

  const updateDetails = async()=>{
    try {
      const {data} = await api.post('/api/user/update-details',{newName: profileName, newBio: profileBio})
    if(data.success){
      toast.success(data.message)
     
      {setIsEditingProfile(!isEditingProfile)}
    } else{toast.error(data.message)}
    } catch (error) {
      toast.error(error.message)
    }
  }

  const filteredItems = activeTab === 'all' 
    ? watchlistData 
    : watchlistData.filter(item => item.status.toLowerCase() === activeTab.toLowerCase());

  const getStatusColor = (status) => {
    switch(status) {
      case 'Watching': return 'bg-blue-600/10 text-blue-400 border-blue-500/20';
      case 'Completed': return 'bg-emerald-600/10 text-emerald-400 border-emerald-500/20';
      case 'On Hold': return 'bg-amber-600/10 text-amber-400 border-amber-500/20';
      case 'Dropped': return 'bg-rose-600/10 text-rose-400 border-rose-500/20';
      default: return 'bg-zinc-600/10 text-zinc-400 border-zinc-500/20';
    }
  };


  return (
    
    <div className={`w-full min-h-screen pb-24 flex flex-col m-0 p-0 relative overflow-x-hidden transition-colors duration-300
      ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-slate-150 text-zinc-900'}`}
    >
      
      {/* 🕸️ THE SPIDERWEB / TECH-GRID BACKGROUND EFFECTS LAYERS */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Neon Cyber Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-red-600/10 dark:bg-red-950/20 blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-red-600/5 dark:bg-red-900/10 blur-[100px]" />
        
        {/* Geometric Web Line Matrix (Concentric Polygonal Grid Rings) */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-300 h-300 opacity-15 dark:opacity-30 
          bg-[radial-gradient(circle,transparent_20%,var(--tw-gradient-stops))] 
          ${isDarkMode ? 'from-zinc-900 via-transparent to-transparent' : 'from-slate-300 via-transparent to-transparent'}`} 
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 15%, transparent 40px, currentColor 41px, transparent 43px),
              radial-gradient(circle at 50% 15%, transparent 90px, currentColor 91px, transparent 93px),
              radial-gradient(circle at 50% 15%, transparent 160px, currentColor 161px, transparent 164px),
              radial-gradient(circle at 50% 15%, transparent 260px, currentColor 262px, transparent 266px),
              radial-gradient(circle at 50% 15%, transparent 400px, currentColor 403px, transparent 408px)
            `,
            color: isDarkMode ? '#dc2626' : '#ef4444'
          }}
        />


        {/* Linear Web Strands radiating outward from the header center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-150 opacity-10 dark:opacity-20 flex justify-center">
          <div className="absolute w-0.5 h-150 bg-linear-to-b from-red-600 to-transparent rotate-45deg origin-top" />
          <div className="absolute w-0.5 h-150 bg-linear-to-b from-red-600 to-transparent -rotate-45deg origin-top" />
          <div className="absolute w-0.5 h-150 bg-linear-to-b from-red-600 to-transparent rotate-75deg origin-top" />
          <div className="absolute w-0.5 h-150 bg-linear-to-b from-red-600 to-transparent -rotate-75deg origin-top" />
          <div className="absolute w-0.5 h-150 bg-linear-to-b from-red-600 to-transparent rotate-15deg origin-top" />
          <div className="absolute w-0.5 h-150 bg-linear-to-b from-red-600 to-transparent -rotate-15deg origin-top" />
        </div>
      </div>


          <div className="p-6">
      {/* 5. Add a back button at the top if it's read-only so you can return to the search list */}
      {readOnly && (
        <button onClick={onBack} className="mb-4 text-xs text-red-500 hover:underline">
          &larr; Back to Search
        </button>
      )}

      {/* Render your profile layout below using your state values */}
      <h1 className="text-xl font-bold">{username}'s Profile</h1>
      
      {/* ... rest of your profile UI template layout ... */}
    </div>


          <div className="absolute top-6 right-12 z-50 flex items-center gap-4">
        <div className="relative">
          <button 
            onClick={() => setprofileButton(!profileButton)}
            className="w-10 h-10 rounded-full bg-red-600 text-white font-black flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform"
          >
            {user?.name && user.name.charAt(0).toUpperCase()}
          </button>

          {/* 👤 DROPDOWN MENU */}
          {profileButton && (
            <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-2xl border p-1 animate-fadeIn flex flex-col gap-1 backdrop-blur-md
              ${isDarkMode ? 'bg-zinc-900/95 border-zinc-850' : 'bg-white/95 border-slate-200'}`}
            >
              <button 
                onClick={() => { navigate('/dashboard'); setprofileButton(false); }}
                className={`w-full text-left px-4 py-2.5 text-xs font-bold rounded-lg transition-colors cursor-pointer
                  ${isDarkMode ? 'hover:bg-zinc-800 text-zinc-200' : 'hover:bg-slate-100 text-zinc-700'}`}
              >
                {`<- Dashboard`}
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

      {/* BACKGROUND HEADER HERO BANNER */}
      <div className="relative w-full h-[18vh] bg-linear-to-r from-red-950 via-zinc-900 to-red-900 border-b dark:border-red-950/30 overflow-hidden z-10">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-position-[14px_24px]" />
        <div className={`absolute bottom-0 left-0 w-full h-12 bg-linear-to-t ${isDarkMode ? 'from-zinc-950' : 'from-slate-200'}`} />
      </div>

      {/* MAIN CONTAINER WORKSPACE */}
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 -mt-10 relative z-10 flex flex-col gap-6">
        
        {/* PROFILE HEADER CARD */}
        <div className={`w-full rounded-2xl p-6 border shadow-2xl backdrop-blur-md transition-all
          ${isDarkMode ? 'bg-zinc-900/70 border-zinc-800/80 shadow-black/50' : 'bg-white/80 border-slate-200 shadow-slate-300'}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="w-14 h-14 rounded-xl bg-red-600 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-red-600/20 select-none shrink-0 animate-pulse">
                {profileName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                {isEditingProfile ? (
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className={`text-base font-black px-2 py-0.5 rounded-lg border outline-none w-full max-w-60 focus:border-red-500 transition-colors
                      ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-100 border-slate-300 text-zinc-900'}`}
                  />
                ) : (
                  <h1 className="text-xl font-black tracking-tight">{profileName}</h1>
                )}
                <p className="text-[9px] font-black text-red-500 tracking-wider uppercase mt-0.5">@{user.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() =>{isEditingProfile ? updateDetails() : setIsEditingProfile(!isEditingProfile)}}
                className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer active:scale-95 shadow-md border
                  ${isEditingProfile 
                    ? 'bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-700' 
                    : isDarkMode ? 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-300' : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-zinc-700'}`}
              >
                {isEditingProfile ? '💾 Save Profile' : '✍️ Edit Profile'}
              </button>

              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer active:scale-95 shadow-md
                  ${isFollowing 
                    ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700' 
                    : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/10'}`}
              >
                {isFollowing ? '✓ Following' : '➕ Follow'}
              </button>
            </div>
          </div>

          <div className="border-t border-dashed dark:border-zinc-800 pt-3 mt-3">
            {isEditingProfile ? (
              <textarea
                value={profileBio}
                onChange={(e) => setProfileBio(e.target.value)}
                rows="3"
                className={`w-full text-xs font-medium leading-relaxed p-2.5 rounded-xl border outline-none resize-none focus:border-red-500 transition-colors
                  ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-100 border-slate-300 text-zinc-900'}`}
              />
            ) : (
              <p className="text-xs font-medium leading-relaxed opacity-75 max-w-2xl">
                {profileBio}
              </p>
            )}
          </div>

          <div className="flex gap-6 text-center border-t border-dashed dark:border-zinc-800 pt-3 mt-3 justify-around sm:justify-start sm:gap-12">
            <div>
              <p className="font-black text-base text-red-500 dark:text-red-400">{watchlistData.length}</p>
              <p className="text-[9px] font-bold uppercase opacity-50 tracking-wider">Watchlist</p>
            </div>
            <div>
              <p className="font-black text-base">{isFollowing ? 1 : 0}</p>
              <p className="text-[9px] font-bold uppercase opacity-50 tracking-wider">Followers</p>
            </div>
            <div>
              <p className="font-black text-base">69</p>
              <p className="text-[9px] font-bold uppercase opacity-50 tracking-wider">Following</p>
            </div>
          </div>
          
        </div>
            
              <SearchProfile/>
            
           
        {/* TAB FILTERS */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-zinc-800/10 dark:border-zinc-800/60 pb-2 mt-4">
          {['all', 'Plan to Watch', 'Watching', 'Completed', 'Dropped'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer
                ${activeTab === tab 
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/10' 
                  : isDarkMode ? 'text-zinc-400 hover:bg-zinc-900/50 hover:text-white' : 'text-slate-600 hover:bg-slate-200 hover:text-zinc-800'}`}
            >
              {tab === 'all' ? '📁 All Items' : tab}
            </button>
          ))}
        </div>

        {/* WATCHLIST SMALL GRID DECK */}
        
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {filteredItems.map((item) => (
              <div 
                key={item._id}
                className={`group rounded-xl overflow-hidden border flex flex-col relative shadow-md transition-all duration-300 hover:-translate-y-1
                  ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800/60 hover:border-red-500/30' : 'bg-white border-slate-200 hover:border-red-500/20'}`}
              >
                <div className="relative aspect-2/3 w-full overflow-hidden bg-zinc-800">
                  <img src={`https://image.tmdb.org/t/p/w500${item.posterPath}`} alt={item.mediaTitle} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  

                  <button 
              onClick={async() => {
                try {
                   const {data} = await api.post('/api/watchlist/delete', {mediaId: item.mediaId})
                if(data.success){
                  console.log(data.message)
                  toast.success(data.message)
                  const updateData = watchlistData.filter(watchItem => {
           return watchItem.mediaId != item.mediaId;
        });
                  setWatchlistData([...updateData])
                }else{ toast.error(data.message)}
                } catch (error) {
                  toast.error(error.message)
                }
               
              } }
              className="absolute top-1 right-1 w-4 h-4 rounded-full hover:text-red-700 flex items-center justify-center text-[10px] font-bold z-20 cursor-pointer bg-zinc-800 text-zinc-400"
            >
              ✕
            </button>
                </div>

                

                <div className="p-2 flex-1 flex flex-col justify-between gap-1.5 relative z-10">
                  <h3 className="font-bold text-[11px] truncate tracking-tight">{item.mediaTitle || item.mediaName}</h3>
                  
                  <div className="relative">
                    <button 
                      onClick={() => setProfileDropdownOpen(profileDropdownOpen === item._id ? null : item._id)}
                      className={`w-full py-1 text-[8px] font-black uppercase border rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1
                        ${getStatusColor(item.status)}`}
                    >
                      <span>{item.status}</span>
                      <span className="text-[6px] opacity-60">▼</span>
                    </button>

                    {profileDropdownOpen === item._id && (
                      <div className={`absolute left-0 bottom-full mb-1 w-full rounded-lg border p-1 shadow-2xl z-50 backdrop-blur-md flex flex-col gap-0.5
                        ${isDarkMode ? 'bg-zinc-950/95 border-zinc-800' : 'bg-white/95 border-slate-200'}`}
                      >
                        {statusOptions.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => updateItemStatus(item.mediaId, opt)}
                            className={`w-full text-center py-1 text-[8px] font-extrabold rounded transition-colors cursor-pointer
                              ${item.status === opt 
                                ? 'bg-red-600 text-white' 
                                : isDarkMode ? 'text-zinc-400 hover:bg-zinc-800 hover:text-white' : 'text-zinc-600 hover:bg-slate-100'}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="w-full py-16 text-center border border-dashed rounded-xl dark:border-zinc-800 opacity-40 text-[11px] font-bold">
            No stashed media matching category filter.
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;