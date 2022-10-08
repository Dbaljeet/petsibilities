import '../styles/globals.css'
import { ThemeProvider } from '@mui/material'
import { lightTheme } from '../themes'
import { UiProvider, AuthProvider } from '../context'
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UiProvider>
        <ThemeProvider theme={lightTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </UiProvider>
    </AuthProvider>
  )
}

export default MyApp
