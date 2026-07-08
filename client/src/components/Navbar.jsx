import React, { useContext } from 'react'
import { AppContent } from '../context/AuthContext.jsx'

const Navbar = () => {
  const { isDarkMode, setisDarkMode, setloginPopUp } = useContext(AppContent)

  return (
    /* We changed the background to 'bg-transparent' so your header's gradient shows through completely */
    <div className={`flex w-full justify-between items-center p-6 px-8 md:px-12 select-none absolute top-0 left-0 z-40 transition-colors duration-300
      ${isDarkMode ? 'text-slate-50' : 'text-neutral-900'}`}
    >
      {/* BRAND LOGO */}
      <h1 className='text-3xl font-extrabold tracking-tight text-red-600 drop-shadow-[0_1.5px_1.5px_rgba(239,68,68,0.3)] cursor-pointer'>
        CIN
        <span className={`transition-colors duration-300 ${isDarkMode ? 'text-slate-50' : 'text-neutral-900'}`}>
          NECT
        </span>
      </h1>

      {/* PERSONALIZED WELCOME */}
      <h1 className='hidden sm:block text-xl font-bold tracking-tight text-red-600 drop-shadow-[0_1px_1px_rgba(239,68,68,0.2)]'>
        Welcome,{' '}
        <span className={`transition-colors duration-300 ${isDarkMode ? 'text-slate-50' : 'text-neutral-900'}`}>
          Aniket!
        </span>
      </h1>

      {/* ACTION BUTTONS */}
      <div className='flex items-center gap-4'> 
        
        {/* LOGIN BUTTON */}
        <button 
          onClick={() => setloginPopUp(true)}
          className={`text-sm font-bold text-slate-50 rounded-full py-2 px-6 shadow-md cursor-pointer 
            transform transition-all duration-300 ease-out 
            hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(239,64,64,0.5)] 
            active:scale-95 active:translate-y-0 focus:outline-none
            ${isDarkMode ? 'bg-linear-to-r from-red-600 to-red-700' : 'bg-linear-to-r from-red-500 to-red-600'}`}
        >
          Login
        </button>

        {/* THEME TOGGLE BUTTON */}
        <button 
          onClick={() => setisDarkMode(!isDarkMode)}
          className={`text-sm font-bold rounded-full py-2 px-4 cursor-pointer 
            transform transition-all duration-300 ease-out 
            hover:scale-105 hover:-translate-y-0.5 
            active:scale-95 active:translate-y-0 focus:outline-none shadow-sm
            ${isDarkMode 
              ? 'bg-zinc-900/60 text-amber-400 border border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-800' 
              : 'bg-white/60 text-zinc-700 border border-slate-200/50 backdrop-blur-sm hover:bg-slate-100'}`}
        >
          {isDarkMode ? '🌙 Dark' : '☀️ Light'}
        </button>

      </div>
    </div>
  )
}

export default Navbar