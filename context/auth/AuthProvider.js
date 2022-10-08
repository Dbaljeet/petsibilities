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
  }

  const loginUser = async ({email, password}) => {
    try {
      const { data } = await LoginService({ email, password })
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: '[Auth] - Login', payload: user })
      console.log('no error')

      return true
    } catch (error) {
      console.log('error')
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
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
