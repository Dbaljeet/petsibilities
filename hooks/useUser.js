import { useUserContext } from '../Context/UserContext'
import LoginService from '../services/LoginService'

function useUser() {
  const { jwt, setJwt } = useUserContext()
  const Register = ({ name, lastname, email, password, confirmPassword }) => {
    console.log(name, lastname, email)
    //service - fetch
  }
  const Login = ({ email, password }) => {
    LoginService({ email, password })
      .then((res) => {
        console.log('funciona')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
  return { jwt, setJwt, Register, Login }
}
export default useUser
