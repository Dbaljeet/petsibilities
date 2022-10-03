import styles from '../styles/Register.module.css'
import { useState } from 'react'
import useUser from '../hooks/useUser'
import Switch from '../components/ui/Switch'
import { PetLayout } from '../components/layouts'
import ButtonSubmit from '../components/ui/ButtonSubmit'
import Image from 'next/image'
import Link from 'next/link'
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
      <PetLayout title={'Petsibilities - Registrarse'}>
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
              <Link href="/login">
                <a className={styles.anav}>Iniciar sesión</a>
              </Link>
            </nav>
          </div>
        </section>
      </PetLayout>
    </>
  )
}
