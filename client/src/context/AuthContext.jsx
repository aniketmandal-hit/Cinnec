import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'
  import { toast } from 'react-toastify';
  import api from '../utils/Api.jsx';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AppContent = createContext()
    axios.defaults.withCredentials = true

export const AppContext = (props) => {

    const [user, setuser] = useState('')
    const [isLoggedin, setisLoggedin] = useState(false)
    const [loginPopUp, setloginPopUp] = useState(false)
    const [isDarkMode, setisDarkMode] = useState(true)

    //registration user
    const registerUser = async (name, username, email, password) => {
        try {
          const {data} = await api.post('/api/auth/register',{name, username, email, password})
          if(data.success){
            toast.success(data.message)
            setisLoggedin(true)
            await getUserData();
            setloginPopUp(false);
          }
        } catch (error) {
            toast.error(error.message)
        }
    }
    //login user

     const loginUser = async (email, password) => {

        try {
 
          const {data} = await api.post('/api/auth/login',{email, password})

          if(data.success){
            toast.success(data.message)
            getUserData()
            setisLoggedin(true)
            setloginPopUp(false)
          }
        } catch (error) {
  
            toast.error(error.message)
        }
    }

    //get the user data (profile)
    const getUserData = async()=>{
        try {
            const {data} = await api.get('/api/user/')
            if(data.success){
                setuser(data.user)
                setisLoggedin(true)
            }
        } catch (error) {
            console.log('user error', error)
          }
        }
      

       const value = {
            isLoggedin, setisLoggedin,
            user, setuser,
            getUserData,
            loginPopUp, setloginPopUp,
            isDarkMode, setisDarkMode,
            registerUser, loginUser
        }
        
    useEffect(()=>{
      getUserData()  
    }, [])
    

  return (
   <AppContent.Provider value={value}>
    {props.children}
   </AppContent.Provider>
  )
}


