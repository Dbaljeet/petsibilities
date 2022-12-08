import { useState, useContext, useEffect } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { AuthContext } from '../../context'
import { allCities } from '../../database/onlyCities'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import styles from '../../styles/Register.module.css'
import {
  FormControlLabel,
  Avatar,
  Autocomplete,
  TextField,
  CssBaseline,
  Typography,
  Grid,
  Box,
  Paper,
  Link,
  Checkbox,
  Button,
} from '@mui/material'

import { UserLayout } from '../../components/layouts'
import { ButtonSubmit, Spinner, Switch } from '../../components/ui'
import RecoveryPassword from '../../components/RecoveryPassword'

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/Dbaljeet/petsibilities">
        Petsibilities
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function Register() {
  const router = useRouter()
  //const { Register, error, infoResponse } = useUser()
  const { registerUser } = useContext(AuthContext)

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    city: 1,
    password: '',
    confirmPassword: '',
  })

  const [valueCity, setValueCity] = useState('Arica')
  const [inputValue, setInputValue] = useState('')

  const [isVisiblePassword, setIsVisiblePassword] = useState(false)

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const [openRecovery, setOpenRecovery] = useState(false)

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setLoading(true)
    const res = await registerUser(registerForm)
    if (res) {
      setLoading(false)
      setError(false)
      router.replace('/auth/login')
      return
    }
    setLoading(false)
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
    <UserLayout
      title={'Regístrate | Petsibilities'}
      pageDescription={
        'Regístrate en Petsibilities, adopta a tu proxima mascota'
      }
      imageFullUrl={''}
    >
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        {/*sm 4 */}
        <Grid
          item
          xs={false}
          sm={false}
          md={5}
          sx={{
            backgroundImage: 'url(/Eri.webp)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/*sm 8 */}
        <Grid
          item
          xs={12}
          sm={12}
          md={7}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Regístrate
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {/* */}

              <TextField
                required
                fullWidth
                margin="normal"
                label="Nombre"
                variant="outlined"
                onChange={handleChange}
                name="name"
                error={registerForm.name === ''}
                helperText={
                  registerForm.name === '' ? 'Debe rellenar el campo' : ''
                }
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
                label="correo"
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

              {/* */}

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  width: '100%',
                }}
              >
                <Typography fontSize="1.5rem">+56</Typography>
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Número celular"
                  variant="outlined"
                  onChange={handleChange}
                  name="phoneNumber"
                  error={registerForm.phoneNumber === ''}
                  helperText={
                    registerForm.phoneNumber === ''
                      ? 'Debe rellenar el campo'
                      : 'deben ser 9 números'
                  }
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
              </Box>

              {/* 3 */}
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                name="city"
                value={valueCity}
                onChange={(ev, newValue) => {
                  setValueCity(newValue)
                  setRegisterForm({
                    ...registerForm,
                    ['city']: allCities.indexOf(newValue) + 1,
                  })
                }}
                inputValue={inputValue}
                onInputChange={(ev, newInputValue) => {
                  setInputValue(newInputValue)
                }}
                options={allCities}
                renderInput={(params) => (
                  <TextField {...params} label="Ciudad o comuna*" />
                )}
              />
              <TextField
                required
                fullWidth
                margin="normal"
                label="contraseña"
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
                label="repetir contraseña"
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

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <Switch text={'Ver contraseña'} showPassword={showPassword} />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Recordar correo"
                />
                <ButtonSubmit />
                {error && (
                  <span className={styles.spann}>
                    Error, rellene bien los campos
                  </span>
                )}
              </Box>

              <Grid
                container
                sx={{
                  marginTop: '30px',
                }}
              >
                <Grid item xs>
                  <Button
                    onClick={() => setOpenRecovery(true)}
                    variant="text"
                    sx={{ color: 'rgba(0, 0, 0, 0.78)', padding: '5px' }}
                  >
                    ¿Olvidaste tu contraseña?
                  </Button>
                </Grid>
                <Grid item>
                  <NextLink href="/auth/login">
                    <Link href="#" variant="body1" sx={{ padding: '5px' }}>
                      {'Iniciar sesión'}
                    </Link>
                  </NextLink>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
              {loading && <Spinner />}
            </Box>
          </Box>
          {openRecovery && (
            <RecoveryPassword
              openRecovery={openRecovery}
              setOpenRecovery={setOpenRecovery}
            />
          )}
        </Grid>
      </Grid>
    </UserLayout>
  )
}
