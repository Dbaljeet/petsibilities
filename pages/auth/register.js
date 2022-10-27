import styles from '../../styles/Register.module.css'
import { useState, useContext } from 'react'
//import useUser from '../../hooks/useUser'
import { GeneralLayout } from '../../components/layouts'
import { ButtonSubmit, Switch } from '../../components/ui'
import Image from 'next/image'
import Link from 'next/link'
import { AuthContext } from '../../context'
import { useRouter } from 'next/router'
import { Spinner } from '../../components/ui'

export default function Register() {
  const router = useRouter()
  //const { Register, error, infoResponse } = useUser()
  const { registerUser } = useContext(AuthContext)

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    region: '',
    city: '',
    password: '',
    confirmPassword: '',
  })
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const res = await registerUser(registerForm)
    if (res) {
      setLoading(false)
      setError(false)
      router.replace('/auth/login')
      return
    }
    setError(true)
    setTimeout(() => setError(false), 4000)
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
        {loading && <Spinner />}
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
                type="phoneNumber"
                placeholder="Número celular*"
                name="phoneNumber"
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
              {error && (
                <span className={styles.spann}>
                  Error, rellene bien los campos
                </span>
              )}
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
                alt="Si ya tienes una cuenta inicia sesión, también puede volver al inicio de sesión para saber más de Petsibilities"
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
              <Link href={`/auth/login?p=${router.query.p?.toString() || ''}`}>
                <a className={styles.anav}>Iniciar sesión</a>
              </Link>
            </nav>
          </div>
        </section>
      </GeneralLayout>
    </>
  )
}
