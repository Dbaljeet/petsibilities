import { useState } from 'react'
import useUser from '../hooks/useUser'
import styles from '../styles/Login.module.css'
import Navbar from '../components/Navbar'
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
      <div className={styles.container}>
        <img
          className={styles.img}
          alt="Imagen de fondo decorativa"
          src="/wave.svg"
        />
        <section>
          <h2 className={styles.title}>Iniciar sesión</h2>
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
            <div className={styles.space}>
              <p className={styles.space_p}>Ver contraseña</p>
              <div className={styles.wrap}>
                <input
                  onClick={showPassword}
                  className={styles.inputBox}
                  type="checkbox"
                  id="s2"
                />
                <label className={styles.slider} htmlFor="s2"></label>
              </div>
            </div>
            <input className={styles.submit} type="submit" />
          </form>
        </section>
        <Navbar></Navbar>
      </div>
    </>
  )
}
