import React, { useContext } from 'react'
import { AppContent } from '../context/AuthContext.jsx'

const Header = () => {
        const {isDarkMode, setisDarkMode} = useContext(AppContent)
  return (
    <div className={`${isDarkMode ? 'bg-neutral-950' : 'bg-slate-50'}  w-full h-full p-7`}>
      
    </div>
  )
}

export default Header
