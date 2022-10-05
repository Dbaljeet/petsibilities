import { useUserContext } from '../Context/UserContext'
import LoginService from '../services/LoginService'

function useUser() {
  const { jwt, setJwt } = useUserContext()
  const Register = ({
    name,
    email,
    region,
    city,
    password,
    confirmPassword,
  }) => {
    console.log(name, email, region)
    //service - fetch
  }
  const Login = ({ email, password }) => {
    LoginService({ email, password })
      .then((res) => {
        console.log(res)
        console.log('funciona')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
  return { jwt, setJwt, Register, Login }
}
export default useUser
