import '../styles/globals.css'
import TestContextProvider from '../context/test_context'
import {useEffect} from 'react'

export default function App({ Component, pageProps }) {

  // useEffect(() =>{
  //   console.log('running')
  //   async function getMe(){
  //     try {
  //       const res = await fetch('http://localhost:4000/me', {withCredentials: true})
  //       console.log(res)
  //     } catch (error){
  //       console.log(error)
  //     }
  //   }
  //   getMe()
  // }, [])

  return (
    <TestContextProvider>
      <Component {...pageProps} />
    </TestContextProvider>
  )
}
