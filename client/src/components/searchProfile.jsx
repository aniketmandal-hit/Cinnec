import React from 'react'

const UserSearch = () => {
  // 🎯 IMPORT YOUR THEME STATE HERE FROM YOUR APPCONTENT CONTEXT
const { isDark } = useContext(AppContext)
  const isDark = true 

  return (
    <div className={`w-full max-w-md mx-auto my-6 p-6 border rounded-xl shadow-2xl transition-colors duration-200 
      ${isDark ? 'bg-slate-950 border-red-900/40 shadow-red-950/20 text-white' : 'bg-white border-slate-200 shadow-slate-200/50 text-slate-900'}`}
    >
      
      {/* 1. Input Container */}
      <form className="flex items-center gap-3">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Search usernames..." 
            className={`w-full px-4 py-3 border rounded-lg outline-none transition-all text-sm font-medium focus:ring-1 
              ${isDark 
                ? 'bg-slate-900 border-slate-800 placeholder-slate-500 text-white focus:border-red-500 focus:ring-red-500' 
                : 'bg-slate-50 border-slate-300 placeholder-slate-400 text-slate-900 focus:border-sky-500 focus:ring-sky-500'}`}
          />
        </div>
        <button 
          type="submit" 
          className={`px-6 py-3 font-semibold rounded-lg text-sm text-white transition-all duration-200 active:scale-95 shadow-md 
            ${isDark ? 'bg-red-700 hover:bg-red-600 shadow-red-700/10' : 'bg-red-600 hover:bg-red-500 shadow-red-600/20'}`}
        >
          Search
        </button>
      </form>

      {/* 2. Results Container */}
      <div className={`mt-5 border-t pt-3 space-y-2 ${isDark ? 'border-slate-900' : 'border-slate-100'}`}>
        
        {/* Profile Card Template */}
        <div className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all duration-200 group 
          ${isDark 
            ? 'bg-slate-900/40 border-slate-900 hover:bg-slate-900 hover:border-red-600' 
            : 'bg-slate-50/50 border-slate-200/60 hover:bg-slate-50 hover:border-sky-400'}`}
        >
          <div className="flex items-center gap-3">
            {/* User Initial Circle */}
            <div className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs font-bold uppercase tracking-wider 
              ${isDark ? 'bg-slate-800 border-slate-700 text-red-500' : 'bg-white border-slate-300 text-red-600'}`}
            >
              U
            </div>
            <div>
              <p className={`text-sm font-bold transition-colors ${isDark ? 'group-hover:text-red-500' : 'group-hover:text-sky-500'}`}>
                Peter_Parker
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                View profile
              </p>
            </div>
          </div>
          <span className={`transition-all duration-200 text-sm group-hover:translate-x-1 ${isDark ? 'group-hover:text-red-500' : 'group-hover:text-sky-500'}`}>
            &rarr;
          </span>
        </div>

      </div>

    </div>
  )
}

export default UserSearch