import React, { useState } from 'react'
import { AppContent } from '../context/AuthContext.jsx'
import { useContext } from 'react'
import api from '../utils/Api.jsx'
import { toast } from 'react-toastify'
import SearchedUserProfile from '../pages/SearchedUserProfile.jsx'

const SearchProfile = () => {
  // 🎯 IMPORT YOUR THEME STATE HERE FROM YOUR APPCONTENT CONTEXT
const { isDarkMode } = useContext(AppContent)
const [selectSearch, setSelectSearch] = useState(false)
const [search, setSearch] = useState('')
const [userCard, setuserCard] = useState([])
const [selectedUsers, setSelectedUsers] = useState(null)


  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const {data} = await api.get(`/api/user/search?username=${search}`)
      {data.success ? toast.success(data.message) : toast.error(data.error)}
      setuserCard(data.users)
    } catch (error) {
      toast.error(error.message)
    }

  }



  return (
    <div>

    <button
      onClick={()=>{setSelectSearch(true)}}
      className={`w-full absolute right-12 sm:w-auto px-4 py-2 font-bold rounded-xl text-base tracking-wide uppercase transition-all duration-300 transform active:scale-[0.98] shadow-lg outline-none focus:ring-2 
        ${isDarkMode
          ? 'bg-red-700 hover:bg-red-600 text-white border border-red-600/30 shadow-red-950/40 hover:shadow-red-600/20 focus:ring-red-500' 
          : 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/30 hover:shadow-red-500/40 focus:ring-gray-500'}`}
    >
      <div className="flex items-center justify-center gap-2">
        {/* Search Icon SVG */}
        <svg 
          className="w-5 h-5 stroke-current" 
          fill="none" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2.5" 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span>Search Profiles</span>
      </div>
    </button>


    {selectSearch && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
          onClick={() => { setSelectSearch(false)}} />
    <div className={`w-full absolute max-w-md mx-auto z-50 my-6 p-6 border rounded-xl shadow-2xl transition-colors duration-200 
      ${isDarkMode ? 'bg-slate-950 border-red-900/40 shadow-red-950/20 text-white' : 'bg-white border-slate-200 shadow-slate-200/50 text-slate-900'}`}
    >
    
            <button 
              onClick={() => { setSelectSearch(false) }}
              className="absolute top-1 right-1 w-6 h-6 rounded-full hover:text-red-700 flex items-center justify-center text-xs font-bold z-20 cursor-pointer bg-zinc-800 text-zinc-400"
            >
              ✕
            </button>
      {/* 1. Input Container */}
      <form 
      onSubmit={(e)=>{onSubmitHandler(e)}}
      className="flex items-center gap-3">
        <div className="relative flex-1">
          <input 
          onChange={(e)=>{
            setSearch(e.target.value)
          }}
          value={search}
            type="text" 
            placeholder="Search usernames..." 
            className={`w-full px-4 py-3 border rounded-lg outline-none transition-all text-sm font-medium focus:ring-1 
              ${isDarkMode 
                ? 'bg-slate-900 border-slate-800 placeholder-slate-500 text-white focus:border-red-500 focus:ring-red-500' 
                : 'bg-slate-50 border-slate-300 placeholder-slate-400 text-slate-900 focus:border-sky-500 focus:ring-sky-500'}`}
          />
        </div>
        <button 
          type="submit" 
          className={`px-6 py-3 font-semibold rounded-lg text-sm text-white transition-all duration-200 active:scale-95 shadow-md 
            ${isDarkMode ? 'bg-red-700 hover:bg-red-600 shadow-red-700/10' : 'bg-red-600 hover:bg-red-500 shadow-red-600/20'}`}
        >
          Search
        </button>
      </form>

      {/* 2. Results Container */}
    
      <div className={`mt-5 border-t pt-3 space-y-2 ${isDarkMode ? 'border-slate-900' : 'border-slate-100'}`}>
        
        {/* Profile Card Template */}
            {!selectedUsers ? (
              <>
       {Array.isArray(userCard) && userCard.length > 0 ? (
    userCard.map((user) => ( 
      <div 
        key={user._id}
        onClick={()=>{setSelectedUsers(user)}}
        className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all duration-200 group 
        ${isDarkMode ? 'bg-slate-900/40 border-slate-900' : 'bg-slate-50/50 border-slate-200/60'}`}
      >
        <div  className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-red-500 bg-slate-800' : 'text-red-600 bg-white'}`}>
            {user.username?.charAt(0) || 'U'}
          </div>
          <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            {user.username}
          </p>
        </div>
      </div>
    ))
  ) : (
    /* 🔍 Dynamic Helper Text: Shows up only if the array is completely empty */
    <p className="text-xs text-center py-4 text-slate-500">
      No profiles found. Try a different username!
    </p>
  )} </>
 ) : (
   <div className="fixed inset-0 w-full h-full bg-slate-950 z-50 p-6 overflow-y-auto animate-fadeIn">
    <SearchedUserProfile 
      user={selectedUsers}
      onBack={() => setSelectedUsers(null)}
      
    />
  </div>
  )
  }

      </div>

    </div>
    </div> 
            )}
            </div>
  )
}

export default SearchProfile