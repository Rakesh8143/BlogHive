import React, { useEffect } from 'react'
import { useState } from 'react';
import { createContext } from 'react'

export const context=createContext(null);
const ContextProvider = ({children}) => {
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn,setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isMenuOpen, setMenuOpen]= useState(false);
  useEffect(()=>{
    const tokenVerification=async ()=>{
      const res=await fetch('http://localhost:3001/users/verify',{
        method :'GET',
        credentials : 'include'
      })
      const data=await res.json();
      if(res.ok)
      {
        setLoggedIn(true);
        setUserName(data.userName);
        console.log(`here : ${data.userName}`)
      }
      setLoading(false);
    }
    tokenVerification();
  })
  return (
    <context.Provider value={{isLoggedIn, setLoggedIn, userName, setUserName, isLoading, isMenuOpen, setMenuOpen}}>
        {children}
    </context.Provider>
  )
}

export default ContextProvider;
