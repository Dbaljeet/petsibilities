import { useState, useContext, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { allCities } from '../../database/onlyCities'

import { AuthContext } from '../../context'

//import useUser from '../../hooks/useUser'
import { GeneralLayout } from '../../components/layouts'
import { ButtonSubmit, Switch } from '../../components/ui'
import { useRouter } from 'next/router'
import { Spinner } from '../../components/ui'
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  FormControl,
  Grid,
  TextField,
  Typography,
} from '@mui/material'

export default function Register() {
  const router = useRouter()
  //const { Register, error, infoResponse } = useUser()
  const { registerUser } = useContext(AuthContext)

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    city: '',
    password: '',
    confirmPassword: '',
  })
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  let array = []
  useEffect(() => {
    allCities.map((city) => array.push(city.city))
  })

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
        <Box sx={{ display: 'flex', wrap: 'wrap' }}>
          <Grid
            alignContent="center"
            justifyItems="center"
            sx={{ minWidth: '300px' }}
          >
            <Typography
              variant="h1"
              align="center"
              sx={{ margin: '30px', color: '#962', fontSize: '2.5rem' }}
            >
              Registrate en Petsibilities
            </Typography>
            <FormControl
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                width: '70%',
                margin: 'auto',
                maxWidth: '600px',
                gap: '25px',
              }}
            >
              <TextField
                id="outlined-basic"
                label="Nombre*"
                variant="outlined"
                onChange={handleChange}
                name="name"
                error={registerForm.name === ''}
                helperText={
                  registerForm.name === '' ? 'Debe rellenar el campo' : ''
                }
                InputProps={{
                  style: {
                    fontSize: '1.5rem',
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontSize: '1.5rem',
                    color: '#000',
                  },
                }}
              />

              <TextField
                id="outlined-basic"
                label="correo*"
                variant="outlined"
                onChange={handleChange}
                name="email"
                type="email"
                error={registerForm.email === ''}
                helperText={
                  registerForm.email === '' ? 'Debe rellenar el campo' : ''
                }
                InputProps={{
                  style: {
                    fontSize: '1.5rem',
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontSize: '1.5rem',
                  },
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  width: '100%',
                }}
              >
                <Typography fontSize="1.5rem">+569</Typography>
                <TextField
                  sx={{ width: '100%' }}
                  id="outlined-basic"
                  label="Número celular*"
                  variant="outlined"
                  onChange={handleChange}
                  name="phoneNumber"
                  error={registerForm.phoneNumber === ''}
                  helperText={
                    registerForm.phoneNumber === ''
                      ? 'Debe rellenar el campo'
                      : ''
                  }
                  InputProps={{
                    style: {
                      fontSize: '1.5rem',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: '1.5rem',
                    },
                  }}
                />
              </Box>

              <TextField
                id="outlined-basic"
                label="contraseña*"
                variant="outlined"
                onChange={handleChange}
                name="password"
                type={`${isVisiblePassword ? 'text' : 'password'}`}
                error={registerForm.password === ''}
                helperText={
                  registerForm.password === '' ? 'Debe rellenar el campo' : ''
                }
                InputProps={{
                  style: {
                    fontSize: '1.5rem',
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontSize: '1.5rem',
                  },
                }}
              />

              <TextField
                id="outlined-basic"
                label="repetir contraseña**"
                variant="outlined"
                onChange={handleChange}
                name="confirmPassword"
                type={`${isVisiblePassword ? 'text' : 'password'}`}
                error={registerForm.confirmPassword === ''}
                helperText={
                  registerForm.confirmPassword === ''
                    ? 'Debe rellenar el campo'
                    : ''
                }
                InputProps={{
                  style: {
                    fontSize: '1.5rem',
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontSize: '1.5rem',
                  },
                }}
              />

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={array}
                name="city"
                onChange={handleChange}
                error={registerForm.city === ''}
                renderInput={(params) => (
                  <TextField {...params} label="Ciudad o comuna*" />
                )}
              />

              {error && (
                <span className={styles.spann}>
                  Error, rellene bien los campos
                </span>
              )}
            </FormControl>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <Switch text={'Ver contraseña'} showPassword={showPassword} />

              <ButtonSubmit />
            </Box>
          </Grid>

          <Card sx={{ width: 300, minWidth: '300px' }}>
            <CardHeader
              title="Sé parte de nuestra web,queremos que encuentres
                a tu próxima mascota"
            />
            <CardMedia
              component="img"
              src="/eri.jpg"
              height="400"
              alt="Si ya tienes una cuenta inicia sesión, también puede volver al inicio de sesión para saber más de Petsibilities"
            />

            <CardContent
              sx={{
                display: 'flex',
                gap: '50%',
              }}
            >
              <Link href="/">
                <a>Inicio</a>
              </Link>
              <Link href={`/auth/login?p=${router.query.p?.toString() || ''}`}>
                <a>Iniciar sesión</a>
              </Link>
            </CardContent>
          </Card>
        </Box>
      </GeneralLayout>
    </>
  )
}
