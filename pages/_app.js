import '../styles/globals.css'
import { UserProvider } from '../Context/UserContext'
function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
