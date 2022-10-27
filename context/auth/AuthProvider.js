import { useReducer, useEffect } from 'react'
import { authReducer, AuthContext } from './'
import Cookies from 'js-cookie'
import {
  LoginService,
  RegisterService,
  LogoutService,
  CheckTokenService,
} from '../../services'
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
      /*
      obtener nuevo accessToken
      const { data } = await CheckToken()
      const { token, user } = data
      Cookies.set('token', token)*/
      const res = await CheckTokenService()
      const user = res.message.user
      console.log(user)
      dispatch({ type: '[Auth] - Login', payload: user })
      return
    } catch (error) {
      return
      //Cookies.remove('token')
    }
  }

  const logout = async () => {
    try {
      const res = await LogoutService()
      const { message } = res.message
      if (message === 'Log out') {
        return true
      }
      return false
    } catch (err) {
      console.log('error')
      return false
    }
    //Cookies.remove('token')
  }

  const loginUser = async ({ email, password }) => {
    try {
      const res = await LoginService({ email, password })
      const { user } = res
      dispatch({ type: '[Auth] - Login', payload: user })
      return true
    } catch (error) {
      return false
    }
  }

  const registerUser = async ({
    name,
    email,
    phoneNumber,
    password,
    region,
    city,
    confirmPassword,
  }) => {
    try {
      const data = await RegisterService({
        name,
        region,
        phoneNumber,
        city,
        email,
        password,
        confirmPassword,
      })
      /*const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: '[Auth] - Login', payload: user })
      */
      if (data) {
        return true
      } else {
        return false
      }
    } catch (error) {
      return false

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
