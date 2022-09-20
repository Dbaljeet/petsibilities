import { useUserContext } from '../Context/UserContext'
function useUser() {
  const { jwt, setJwt } = useUserContext()
  const Register = ({ name, lastname, email, password, confirmPassword }) => {
    console.log(name, lastname, email)
    //service - fetch
  }
  const Login = ({ email, password }) => {
    const mail = 'username'
    const passwordd = '123'
    if (email !== mail) {
      alert('f mail')
      return
    }
    if (password !== passwordd) {
      alert('f pass')
      return
    }
    alert('acceso correcto')
  }
  return { jwt, setJwt, Register, Login }
}
export default useUser
