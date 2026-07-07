import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import { ToastContainer} from 'react-toastify';
import ProtectedRoute from './components/ProtectedRoute.jsx'

const App = () => {
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      
            <Route path='/profile'
              element={<ProtectedRoute>
              <Profile/>
              </ProtectedRoute>}/>
      
    </Routes>
    </>
  )
}

export default App
