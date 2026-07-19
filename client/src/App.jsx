import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard.jsx'
import { ToastContainer } from 'react-toastify'

import { AppContent } from './context/AuthContext.jsx'
import { WebScrollIndicator } from './components/WebScrollIndicator.jsx' // 🕷️ Import the custom spiderweb scroll indicator
import { WebCursor } from './components/webCursor.jsx'

const App = () => {
  const { isLoggedin, isDarkMode } = useContext(AppContent)

  return (
    /* 👑 Updated from bg-zinc-950 to true pitch bg-black for flawless dark mode integration */
    <div className={`w-full min-h-screen flex flex-col m-0 p-0 overflow-x-hidden transition-colors duration-300 relative
      ${isDarkMode ? 'bg-black text-white' : 'bg-slate-50 text-zinc-900'}`}
    >
      <ToastContainer />
      
      {/* 🕸️ The Out-Of-This-World Custom Theme Web Scroll Indicator */}
      <WebScrollIndicator isDarkMode={isDarkMode} />
      <WebCursor isDarkMode={isDarkMode} />
      
      {/* Main content frame takes remaining space naturally */}
      <main className="w-full flex-1 relative z-10">
        <Routes>
          <Route path="/" element={!isLoggedin ? <Home /> : <Navigate to="/dashboard" />} />
          
          {/* 🎬 Protected Dashboard Route */}
          <Route path="/dashboard" element={isLoggedin ? <Dashboard /> : <Navigate to="/" />} />
      
          <Route path="/profile" element={!localStorage.token ? <Profile /> : <Navigate to="/" replace/>} />
        </Routes>
      </main>
    </div>
  )
}

export default App