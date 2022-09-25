import Head from 'next/head'
import styles from '../styles/Register.module.css'
import { useState } from 'react'
import useUser from '../hooks/useUser'
export default function register() {
  const { Register } = useUser()
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    city: '',
    region: '',
    password: '',
    confirmPassword: '',
  })
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)
  const handleSubmit = (ev) => {
    ev.preventDefault()
    Register(registerForm)
  }
  const handleChange = (ev) => {
    setRegisterForm({ ...registerForm, [ev.target.name]: ev.target.value })
  }
  const showPassword = () => {
    setIsVisiblePassword(!isVisiblePassword)
  }

  return (
    <>
      <Head>
        <title>Petsibilities - Registrarse</title>
      </Head>
      <img
        className={styles.img}
        alt="Imagen de fondo decorativa"
        src="/wave.svg"
      />
      <h2 className={styles.title}>Registro</h2>
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
            placeholder="ciudad*"
            name="city"
          />
          <input
            className={styles.input}
            onChange={handleChange}
            placeholder="región*"
            name="region"
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
        </div>
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

        <input className={styles.submit} type="submit" value="Enviar" />
      </form>
    </>
  )
}
