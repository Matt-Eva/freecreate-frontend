import '../styles/globals.css'
import UserContextProvider from '../context/user_context'
import {useEffect, useState} from 'react'
import { UserContext } from '../context/user_context'

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  console.log(user)
  useEffect(() =>{
    console.log('running')
    async function getMe(){
      try {
        const res = await fetch('http://localhost:4000/me', {credentials: 'include'})
        if (res.ok){
          const data = await res.json()
          setUser(data)
        }else{
          const error = await res.json()
          console.log(error)
        }

      } catch (error){
        console.log(error)
      }
    }
    getMe()
  }, [])

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}
