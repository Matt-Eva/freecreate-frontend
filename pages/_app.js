import '../styles/globals.css'
import UserContextProvider from '../context/user_context'
import {useEffect} from 'react'

export default function App({ Component, pageProps }) {

  useEffect(() =>{
    console.log('running')
    async function getMe(){
      try {
        const res = await fetch('http://localhost:4000/me', {credentials: 'include'})
        const data = await res.json()
        console.log(data)
      } catch (error){
        console.log(error)
      }
    }
    getMe()
  }, [])

  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  )
}
