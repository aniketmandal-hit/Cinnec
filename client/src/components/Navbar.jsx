import React, { useContext } from 'react'
import { AppContent } from '../context/AuthContext.jsx'

const Navbar = () => {
    const {isDarkMode, setisDarkMode} = useContext(AppContent)
  return (
    <div className= {`flex  w-full justify-between items-center p-5 pl-8 pr-8 ${isDarkMode ? 'bg-zinc-950' : 'bg-slate-50'}`}>
      <h1 className='text-3xl font-extrabold text-red-600 drop-shadow-[0_1.5px_1.5px_rgba(239,68,68,1)]'>
        CIN
        <span className={`text-3xl font-extrabold ${isDarkMode ? 'text-slate-50' : 'text-neutral-900'}`}>
        NECT
        </span>
        </h1>
      <h1 className=' text-3xl font-extrabold text-red-600 drop-shadow-[0_1.5px_1.5px_rgba(239,68,68,1)]'>
        Welcome <span></span>
        <span className={`text-3xl font-extrabold ${isDarkMode ? 'text-slate-50' : 'text-neutral-900'}`}>
        Aniket!
        </span>
        </h1>
        <div className='flex gap-6'> 
            <button className={`bg-linear-to-r from-red-500 to-red-700 drop-shadow-[0_1.2px_1.2px_rgba(239,68,68,1)] text-sm font-bold ${isDarkMode ? 'text-slate-50' : 'bg-neutral-900'} rounded-full p-2 w-20 h-auto cursor-pointer hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(239,64,64,0.4)] active:scale-95 active:translate-y-0 transform transition-all duration-300 ease-out focus:outline-none `}>Login</button>
            <button onClick={
               ()=>{
                setisDarkMode(!isDarkMode)
               }
                
            }
                
            className={`bg-red-600 drop-shadow-[0_1.2px_1.2px_rgba(239,68,68,1)] text-sm font-bold text-slate-50 rounded-full p-2 w-auto h-auto cursor-pointer hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(239,64,64,0.4)] active:scale-95 active:translate-y-0 transform transition-all duration-300 ease-out focus:outline-none`}>{isDarkMode ? 'Dark' : 'Light'}</button>
        </div>
        
    </div>
  )
}

export default Navbar
