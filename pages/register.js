import Head from 'next/head'
import styles from '../styles/Register.module.css'
import { useState } from 'react'
import useUser from '../hooks/useUser'
import Switch from '../components/ui/Switch'
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

        <Switch text={'Ver contraseña'} showPassword={showPassword} />

        <input className={styles.submit} type="submit" value="Enviar" />
      </form>
    </>
  )
}
