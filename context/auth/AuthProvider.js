import { useReducer, useEffect } from 'react'
import { authReducer, AuthContext } from './'
import Cookies from 'js-cookie'
import LoginService from '../../services/LoginService'
import RegisterService from '../../services/RegisterService'
const AUTH_INITIAL_STATE = {
  isLoggedIn: false,
  user: undefined,
}
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)
  /*
  useEffect(() => {
    checkToken()
  }, [])

  const checkToken = async () => {
    try {
      const { data } = await CheckToken()
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: '[Auth] - Login', payload: user })
    } catch (error) {
      Cookies.remove('token')
    }
  }*/

  const logout = () => {
    Cookies.remove('token')
  }

  const loginUser = async ({ email, password }) => {
    try {
      const res = await LoginService({ email, password })
      console.log('no hubo error', res)
      const { message } = res
      const { refreshToken, user } = message
      Cookies.set('token', refreshToken)
      dispatch({ type: '[Auth] - Login', payload: user })
      return true
    } catch (error) {
      console.log('hubo un error:', error)
      return false
    }
  }

  const registerUser = async (
    name,
    email,
    password,
    region,
    city,
    confirmPassword
  ) => {
    try {
      const { data } = await RegisterService({
        name,
        region,
        city,
        email,
        password,
        confirmPassword,
      })
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: '[Auth] - Login', payload: user })
      return {
        hasError: false,
      }
    } catch (error) {
      //if (axios.isAxiosError(error)) {
      return {
        hasError: true,
        message: error.message,
      }
      //}
      /*
      return {
        hasError: true,
        message: 'No se pudo crear el usuario - intente de nuevo',
      }*/
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,

        // Methods
        loginUser,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
