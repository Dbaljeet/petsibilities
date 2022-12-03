import { useState, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import styles from '../../styles/Login.module.css'

import { GeneralLayout, UserLayout } from '../../components/layouts'
import { BasicModal, ButtonSubmit, Switch } from '../../components/ui'
import { AuthContext } from '../../context'
import { Spinner } from '../../components/ui'
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material'
import RecoveryPassword from '../../components/RecoveryPassword'
import { LoginOutlined } from '@mui/icons-material'

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
      <UserLayout title={'Iniciar sesión-Petsibilities'}>
        {loading && <Spinner />}

        <Box
          className={styles.allContent}
          sx={{ display: 'flex', flexWrap: 'wrap', paddingTop: '70px' }}
        >
          <Box
            className={styles.ContainerForm}
            sx={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '40px',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LoginOutlined></LoginOutlined>
            </Avatar>
            <Typography component="h1" variant="h5">
              Inicia sesión en Petsibilities
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 5,
                marginTop: '50px',
              }}
            >
              <TextField
                required
                fullWidth
                margin="normal"
                onChange={handleChange}
                label="correo"
                name="email"
                type="email"
                InputProps={{
                  style: {
                    fontSize: '1.2rem',
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontSize: '1.2rem',
                    color: '#000',
                  },
                }}
              />

              <TextField
                required
                fullWidth
                margin="normal"
                type={`${isVisiblePassword ? 'text' : 'password'}`}
                onChange={handleChange}
                label="contraseña"
                name="password"
                InputProps={{
                  style: {
                    fontSize: '1.2rem',
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontSize: '1.2rem',
                    color: '#000',
                  },
                }}
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
            </Box>
          </Box>

          <Grid
            className={styles.ContainerImg}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              backgroundImage: 'url(/dogl.webp)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '90vh',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 2,
                backgroundColor: 'rgba(0,0,0,0.2)',
                padding: '20px',
                backdropFilter: 'blur(2px)',
                borderRadius: '10px',
                maxWidth: '300px',
                margin: 'auto',
                marginBottom: '30px',
              }}
            >
              <Link
                href={`/auth/register?=${router.query.p?.toString() || ''}`}
              >
                <Button
                  variant="text"
                  sx={{ border: 'none', backgroundColor: '#fff' }}
                >
                  Regístrate
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="text"
                  sx={{ border: 'none', backgroundColor: '#fff' }}
                >
                  Ir a la página principal
                </Button>
              </Link>
              <Button
                onClick={() => setOpenRecovery(true)}
                variant="outlined"
                sx={{ border: 'none', backgroundColor: '#fff' }}
              >
                ¿Olvidaste tu contraseña?
              </Button>
            </Box>
            <RecoveryPassword
              setOpenRecovery={setOpenRecovery}
              openRecovery={openRecovery}
            />
          </Grid>
        </Box>
      </UserLayout>
    </>
  )
}
