import { useState } from 'react'
import useUser from '../hooks/useUser'
import styles from '../styles/Login.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { PetLayout } from '../components/layouts'
import Switch from '../components/ui/Switch'
export default function login() {
  const { Login } = useUser()

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  })
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)
  const handleChange = (ev) => {
    setLoginForm({ ...loginForm, [ev.target.name]: ev.target.value })
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    Login(loginForm)
  }
  const showPassword = () => {
    setIsVisiblePassword(!isVisiblePassword)
  }

  return (
    <>
      <PetLayout title={'Petsibilities - Iniciar sesión'}>
        <div className={styles.container}>
          <main className={styles.main}>
            <section className={styles.section1}>
              <header className={styles.section1_header}>
                <h2 className={styles.title}>Iniciar sesión</h2>
              </header>
              <form className={styles.form} onSubmit={handleSubmit}>
                <input
                  className={styles.input}
                  onChange={handleChange}
                  placeholder="correo"
                  name="email"
                />
                <input
                  className={styles.input}
                  type={`${isVisiblePassword ? 'text' : 'password'}`}
                  onChange={handleChange}
                  placeholder="contraseña"
                  name="password"
                />
                <Switch text={'Ver contraseña'} showPassword={showPassword} />
                <input className={styles.submit} type="submit" />
              </form>
            </section>
            <section className={styles.section2}>
              <Image
                className={styles.section2_img}
                src="/dogl.jpg"
                width={1200}
                height={2100}
              />
              <div className={styles.section2_info}>
                ¿Aún no tienes una cuenta?
                <Link href="/register">
                  <a className={styles.goRegister}>Regístrate</a>
                </Link>
                <Link href="/">
                  <a className={styles.goHome}>Ir a la página principal</a>
                </Link>
              </div>
            </section>
          </main>
        </div>
      </PetLayout>
    </>
  )
}
