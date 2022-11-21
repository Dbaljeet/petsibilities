import { useState } from 'react'

import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { changePassword } from '../services'

import {
  Box,
  Button,
  CardMedia,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import { UserLayout } from '../components/layouts'
import { BasicModal, Spinner } from '../components/ui'

export default function Recovery() {
  const router = useRouter()
  const { token } = router.query

  const [password, setPassword] = useState('')

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sucessful, setSucessful] = useState(false)

  const handleChange = (ev) => {
    setPassword(ev.target.value)
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const { message } = await changePassword({ newPassword: password, token })
      if (message === 'Password changed') {
        setSucessful(true)
      } else {
        setError(true)
      }
      setLoading(false)
    } catch {
      setLoading(false)
      setError(true)
    }
  }

  return (
    <>
      <UserLayout
        title={'Recuperar cuenta | Petsibilities'}
        pageDescription={
          'Recupera tu cuenta, cambia tu contraseña de Petsibilities'
        }
      >
        <Grid
          container
          component="main"
          sx={{
            height: '100vh',
            textAlign: 'center',
          }}
        >
          <Grid
            item
            xs={false}
            sm={false}
            md={5}
            sx={{
              backgroundImage: 'url(/pexels-karolina-grabowska.jpg)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></Grid>

          <Grid item xs={12} sm={12} md={7} sx={{ margin: 'auto' }}>
            <Box
              sx={{
                margin: 'auto',
                marginTop: '100px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Typography variant="h1">
                Recupera tu cuenta de Petsibilities
              </Typography>
              <Typography variant="h2">Cambia tu contraseña</Typography>
              <Box
                sx={{
                  margin: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '300px',
                  justifyContent: 'center',
                  gap: 10,
                }}
              >
                <TextField
                  onChange={handleChange}
                  type={'password'}
                  label="nueva contraseña"
                  helperText={`Entre 8-12 caracteres, actual ${password.length}`}
                  error={password.length < 8 || password.length > 12}
                ></TextField>
                <Button onClick={handleSubmit} disabled={!router.isReady}>
                  Enviar
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {loading && <Spinner />}
        <BasicModal
          open={error}
          setOpen={setError}
          title="Error"
          msg="Su nueva contraseña solo puede contener números y letras."
        >
          <Typography sx={{ marginTop: '5px' }}>
            Recuerda que solo tienes 15 minutos para cambiar tu contraseña desde
            la hora en que fue enviado el correo.
          </Typography>
        </BasicModal>

        <BasicModal
          open={sucessful}
          setOpen={setSucessful}
          title="Contraseña cambiada correctamente"
          msg="Gracias por utilizar nuestra plataforma ❤️ 🐶"
        >
          <NextLink href="/auth/login" passHref>
            <Link variant="button">Iniciar sesión</Link>
          </NextLink>
        </BasicModal>
      </UserLayout>
    </>
  )
}
