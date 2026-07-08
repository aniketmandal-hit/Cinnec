import React, { useContext } from 'react'
import Navbar from '../components/Navbar.jsx'
import Header from '../components/Header.jsx'
import { AppContent } from '../context/AuthContext.jsx'

const Home = () => {
      const {isDarkMode, setisDarkMode} = useContext(AppContent)
  return (
   <div className="w-full min-h-screen relative flex flex-col">
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <main className="flex-1 w-full">
        <Header />
      </main>

    </div>
  )
}

export default Home
