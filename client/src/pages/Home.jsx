import React, { useContext } from 'react'
import Navbar from '../components/Navbar.jsx'
import Header from '../components/Header.jsx'
import { AppContent } from '../context/AuthContext.jsx'

const Home = () => {
      const {isDarkMode, setisDarkMode} = useContext(AppContent)
  return (
    <div className=''>
      <Navbar/>
      <Header/>
    </div>
  )
}

export default Home
