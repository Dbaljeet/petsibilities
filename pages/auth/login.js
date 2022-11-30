import { useState, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import styles from '../../styles/Login.module.css'

import { GeneralLayout } from '../../components/layouts'
import { BasicModal, ButtonSubmit, Switch } from '../../components/ui'
import { AuthContext } from '../../context'
import { Spinner } from '../../components/ui'
import { Box, Button, TextField } from '@mui/material'
import RecoveryPassword from '../../components/RecoveryPassword'

export default function Login() {
  const router = useRouter()
  const { loginUser } = useContext(AuthContext)

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    recoveryEmail: '',
  })

  const [loading, setLoading] = useState(false)

  const [openError, setOpenError] = useState(false)
  const [openRecovery, setOpenRecovery] = useState(false)

  const [isVisiblePassword, setIsVisiblePassword] = useState(false)

  const handleChange = (ev) => {
    setLoginForm({ ...loginForm, [ev.target.name]: ev.target.value })
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setLoading(true)
    const res = await loginUser(loginForm)
    if (res) {
      setLoading(false)
      setOpenError(false)
      const destination = router.query.p?.toString() || '/pets'
      router.replace(destination)
      return
    }
    setOpenError(true)
    setLoading(false)
  }
  const showPassword = () => {
    setIsVisiblePassword(!isVisiblePassword)
  }

  return (
    <>
      <GeneralLayout title={'Iniciar sesión-Petsibilities'}>
        {loading && <Spinner />}
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

              {openError && (
                <BasicModal
                  open={openError}
                  setOpen={setOpenError}
                  title={'Error'}
                  msg={'Error correo o contraseña incorrectas'}
                />
              )}

              <Switch text={'Ver contraseña'} showPassword={showPassword} />
              <ButtonSubmit />
            </form>
          </section>
          <section className={styles.section2}>
            <Image
              className={styles.section2_img}
              src="/dogl.webp"
              width={1200}
              height={2100}
              alt="Regístrate o vuelve al inicio de sesión"
            />
            <div className={styles.section2_info}>
              ¿Aún no tienes una cuenta?
              <Link
                href={`/auth/register?=${router.query.p?.toString() || ''}`}
              >
                <a className={styles.goRegister}>Regístrate</a>
              </Link>
              <Link href="/">
                <a className={styles.goHome}>Ir a la página principal</a>
              </Link>
              <Button onClick={() => setOpenRecovery(true)} variant="outlined">
                ¿Olvidaste tu contraseña?
              </Button>
            </div>
            <RecoveryPassword
              setOpenRecovery={setOpenRecovery}
              openRecovery={openRecovery}
            />
          </section>
        </main>
      </GeneralLayout>
    </>
  )
}
