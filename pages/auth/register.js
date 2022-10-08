import styles from '../../styles/Register.module.css'
import { useState, useContext } from 'react'
//import useUser from '../../hooks/useUser'
import { GeneralLayout } from '../../components/layouts'
import { ButtonSubmit, Switch } from '../../components/ui'
import Image from 'next/image'
import Link from 'next/link'
import { AuthContext } from '../../context'
import { useRouter } from 'next/router'
export default function register() {
  const router = useRouter()
  //const { Register, error, infoResponse } = useUser()
  const { registerUser } = useContext(AuthContext)
  const [error, setError] = useState(false)
  const [messageError, setMessageError] = useState('')
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    region: '',
    city: '',
    password: '',
    confirmPassword: '',
  })
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)
  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const { hasError, message } = await registerUser(registerForm)
    if (hasError) {
      setError(true)
      setMessageError(message)
      setTimeout(() => setError(false), 4000)
      return
    }
    setError(false)
    router.replace('/')
  }
  const handleChange = (ev) => {
    setRegisterForm({ ...registerForm, [ev.target.name]: ev.target.value })
  }
  const showPassword = () => {
    setIsVisiblePassword(!isVisiblePassword)
  }

  return (
    <>
      <GeneralLayout title={'Registrarse-Petsibilities'}>
        <h2 className={styles.title}>Registro</h2>
        <section className={styles.section}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.grid_form}>
              <input
                className={styles.input}
                onChange={handleChange}
                placeholder="nombre*"
                name="name"
              />

              <input
                className={styles.input}
                onChange={handleChange}
                type="email"
                placeholder="correo*"
                name="email"
              />
              <input
                className={styles.input}
                onChange={handleChange}
                placeholder="región*"
                name="region"
              />
              <input
                className={styles.input}
                onChange={handleChange}
                placeholder="ciudad*"
                name="city"
              />

              <input
                className={styles.input}
                type={`${isVisiblePassword ? 'text' : 'password'}`}
                onChange={handleChange}
                placeholder="contraseña*"
                name="password"
              />
              <input
                className={styles.input}
                type={`${isVisiblePassword ? 'text' : 'password'}`}
                onChange={handleChange}
                placeholder="repetir contraseña*"
                name="confirmPassword"
              />
              {error && <span className={styles.spann}>{messageError}</span>}
            </div>

            <Switch text={'Ver contraseña'} showPassword={showPassword} />

            <ButtonSubmit />
          </form>
          <div className={styles.containerImgText}>
            <div className={styles.containerImg}>
              <Image
                src="/eri.jpg"
                width={1200}
                height={1000}
                layout="responsive"
              />
            </div>
            <p className={styles.textimg}>
              Sé parte de nuestra web,<br></br>queremos que encuentres <br></br>
              a tu próxima mascota
            </p>
            <nav className={styles.nav}>
              <Link href="/">
                <a className={styles.anav}>Inicio</a>
              </Link>
              <Link href="/auth/login">
                <a className={styles.anav}>Iniciar sesión</a>
              </Link>
            </nav>
          </div>
        </section>
      </GeneralLayout>
    </>
  )
}
