import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { AppContent } from './context/AuthContext.jsx';
import Dashboard from './pages/Dashboard.jsx';

const App = () => {
  const { isLoggedin, isDarkMode } = useContext(AppContent)

  return (
    // 👑 THE VISUAL FIX: This wrapper forces the correct background to coat 100% of the screen seamlessly
    <div className={`w-full min-h-screen flex flex-col m-0 p-0 overflow-x-hidden transition-colors duration-300
      ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-slate-50 text-zinc-900'}`}
    >
      <ToastContainer />
      
      {/* Main content frame takes remaining space naturally */}
      <main className="w-full flex-1">
        <Routes>
          <Route path="/" element={!isLoggedin ? <Home /> : <Navigate to="/dashboard" />} />
          
          {/* 🎬 Protected Dashboard Route */}
          <Route path="/dashboard" element={isLoggedin ? <Dashboard /> : <Navigate to="/" />} />
      
          <Route path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App