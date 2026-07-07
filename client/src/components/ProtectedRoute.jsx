import React from 'react'
import { AppContent } from '../context/AuthContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {isLoggedin} = useContext(AppContent)

    if(isLoggedin === false){
        return <Navigate replace to='/login'/>}
          return children;
    

    

    }


export default ProtectedRoute
