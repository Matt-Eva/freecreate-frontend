import '../styles/globals.css'
import TestContextProvider from '../context/test_context'

export default function App({ Component, pageProps }) {
  return (
    <TestContextProvider>
      <Component {...pageProps} />
    </TestContextProvider>
  )
}
