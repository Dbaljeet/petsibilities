import { useState, useContext } from 'react'
import styles from '../../styles/Login.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { GeneralLayout } from '../../components/layouts'
import { ButtonSubmit, Switch } from '../../components/ui'
import { AuthContext } from '../../context'
export default function login() {
  const [error, setError] = useState(false)
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
    //Login(loginForm)
  }
  const showPassword = () => {
    setIsVisiblePassword(!isVisiblePassword)
  }
  return (
    <>
      <GeneralLayout title={'Iniciar sesión-Petsibilities'}>
        <h2 className={styles.title}>Iniciar sesión</h2>
        <main className={styles.main}>
          <section className={styles.section1}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                className={styles.input}
                onChange={handleChange}
                placeholder="correo"
                name="email"
                type="email"
              />
              <input
                className={styles.input}
                type={`${isVisiblePassword ? 'text' : 'password'}`}
                onChange={handleChange}
                placeholder="contraseña"
                name="password"
              />
              {error && <span className={styles.spann}>{infoResponse}</span>}
              <Switch text={'Ver contraseña'} showPassword={showPassword} />
              <ButtonSubmit />
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
              <Link href="/auth/register">
                <a className={styles.goRegister}>Regístrate</a>
              </Link>
              <Link href="/">
                <a className={styles.goHome}>Ir a la página principal</a>
              </Link>
            </div>
          </section>
        </main>
      </GeneralLayout>
    </>
  )
}
