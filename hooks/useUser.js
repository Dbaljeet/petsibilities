import Router from 'next/router'
import { useState } from 'react'
import { useUserContext } from '../Context/UserContext'
import LoginService from '../services/LoginService'
import RegisterService from '../services/RegisterService'
import Cookies from 'js-cookie'
function useUser() {
  const { jwt, setJwt } = useUserContext()
  const [error, setError] = useState(false)
  const [infoResponse, setInfoResponse] = useState('')
  const Register = ({
    name,
    email,
    region,
    city,
    password,
    confirmPassword,
  }) => {
    RegisterService({
      name,
      email,
      region,
      city,
      password,
      confirmPassword,
    })
      .then((res) => {
        console.log(res)
        setInfoResponse(res)
      })
      .catch((err) => {
        console.log(err)
        setError(true)
        setInfoResponse(err.message)
        setTimeout(() => setError(false), 4000)
      })
  }

  const Login = ({ email, password }) => {
    LoginService({ email, password })
      .then((res) => {
        Router.replace('/')
      })
      .catch((err) => {
        setError(true)
        setInfoResponse(err.message)
        setTimeout(() => setError(false), 4000)
      })

    /*
    const refreshToken = 'test'
    Router.replace('/')
    Cookies.set('token', refreshToken, { expires: 365 })
    //Cookies.set('authtoken', accesToken)
    */
  }
  return { jwt, setJwt, Register, Login, error, infoResponse }
}
export default useUser
