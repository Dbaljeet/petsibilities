import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

import { BREEDS } from '../database/breeds'

import { PostPetService, postImagePet } from '../services'

import { ImageList } from '../components/ui/PreviewImages'

import { BasicModal, ButtonSubmit, Spinner } from '../components/ui'

import { UserLayout } from '../components/layouts'

import {
  TextField,
  Box,
  Typography,
  Autocomplete,
  Checkbox,
  FormControlLabel,
  CardMedia,
  Card,
  Button,
} from '@mui/material'

import ValueSpecie from '../components/valueSpecie'
import styles from '../styles/postPet.module.css'
import { AuthContext } from '../context'
import Link from 'next/link'

const GENDERS = ['Macho', 'Hembra']
const SPECIES = [
  'Perro',
  'Gato',
  'Roedor',
  'Ave',
  'Reptil',
  'Pez',
  'Aracnido',
  'Mustelido',
  'Conejo',
]

export default function PostPet() {
  const [petForm, setPetForm] = useState({
    name: '',
    description: '',
    age: '',
    size: '',
    wormed: false,
    sterilized: false,
    genderId: 1,
    breedId: 1,
    dataImages: [],
    speciesId: 1,
  })

  const { isLoggedIn } = useContext(AuthContext)

  const router = useRouter()

  const [inputValueSpecie, setInputValueSpecie] = useState('')

  const [valueBreed, setValueBreed] = useState('Labrador')
  const [valueSpecie, setValueSpecie] = useState('Perro')

  const [inputValueGender, setInputValueGender] = useState('')
  const [valueGender, setValueGender] = useState('Macho')

  const [images, setImages] = useState([])
  const [dataImages, setDataImages] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [open, setOpen] = useState(true)
  const [plsLogin, setPlsLogin] = useState(false)

  const [allowChangeDescription, setAllowChangeDescription] = useState(false)

  const urls = []

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    try {
      if (!isLoggedIn) {
        setPlsLogin(true)
        return
      }

      for (const image of dataImages) {
        setIsLoading(true)
        const res2 = await postImagePet({ image: image })

        if (res2.secure_url === undefined) {
          throw new Error('Error, post image')
        }
        urls.push(res2.secure_url)
        setIsLoading(false)
      }
      petForm.dataImages = urls
      const res = await PostPetService(petForm)
      if (res) {
        router.push('/pets')
      } else {
        throw new Error('Error, post pet service front')
      }
    } catch (res) {
      setIsLoading(false)
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }
  const handleChange = (ev) => {
    setPetForm({ ...petForm, [ev.target.name]: ev.target.value })
  }

  useEffect(() => {
    const handleKeyDown = (ev) => {
      if (ev.keyCode === 13) {
        ev.preventDefault()
      }
      if (ev.keyCode === 8 && petForm.description.length === 250) {
        setAllowChangeDescription(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [petForm.description.length])

  return (
    <>
      <UserLayout title={'Publicar mascota | Petsibilities'}>
        <Box
          sx={{
            my: 10,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h1">Pon en adopción</Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 5 }}
          >
            {/* */}

            <TextField
              required
              fullWidth
              margin="normal"
              label="Nombre mascota"
              variant="outlined"
              onChange={handleChange}
              name="name"
              error={petForm.name === '' || petForm.name.length > 15}
              helperText={
                petForm.name === ''
                  ? 'Debe rellenar el campo'
                  : 'Debe ser menor o igual a 15 caracteres'
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
              multiline
              rows={4}
              margin="normal"
              value={petForm.description}
              label="descripción mascota"
              variant="outlined"
              onChange={(ev) => {
                if (petForm.description.length < 250) {
                  handleChange(ev)
                }

                if (allowChangeDescription) {
                  handleChange(ev)
                  setAllowChangeDescription(false)
                }
              }}
              name="description"
              type="description"
              error={petForm.description.length < 10}
              helperText={
                petForm.description === ''
                  ? 'Debe rellenar el campo, mínimo 10 caracteres'
                  : 'mínimo 10 caracteres - máximo 250'
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

            <TextField
              required
              fullWidth
              margin="normal"
              label="Edad"
              variant="outlined"
              onChange={handleChange}
              name="age"
              error={petForm.age === ''}
              helperText={petForm.age === '' ? 'Debe rellenar el campo (meses)' : '(meses)'}
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
              label="Tamaño"
              variant="outlined"
              onChange={handleChange}
              name="size"
              error={petForm.size === ''}
              helperText={petForm.size === '' ? 'Debe rellenar el campo (largo en cms)' : '(largo en cms)'}
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

            {/* 3 */}
            <Autocomplete
              sx={{ marginTop: '10px' }}
              disablePortal
              name="genderId"
              value={valueGender}
              onChange={(ev, newValue) => {
                setValueGender(newValue)
              }}
              inputValue={inputValueGender}
              onInputChange={(ev, newInputValue) => {
                setPetForm({
                  ...petForm,
                  ['genderId']: GENDERS.indexOf(newInputValue) + 1,
                })
                setInputValueGender(newInputValue)
              }}
              options={GENDERS}
              renderInput={(params) => (
                <TextField {...params} label="Genero*" />
              )}
            />

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                minWidth: '300px',
                marginBottom: '20px',
                marginTop: '10px',
              }}
            >
              <Autocomplete
                sx={{ margin: '20px 0px', minWidth: '300px' }}
                disablePortal
                name="speciesId"
                value={valueSpecie}
                onChange={(ev, newValue) => {
                  setValueSpecie(newValue)
                }}
                inputValue={inputValueSpecie}
                onInputChange={(ev, newInputValue) => {
                  setInputValueSpecie(newInputValue)
                  setPetForm({
                    ...petForm,
                    ['speciesId']: SPECIES.indexOf(newInputValue) + 1,
                  })
                }}
                options={SPECIES}
                renderInput={(params) => (
                  <TextField {...params} label="Especie*" />
                )}
              />

              <select
                className={styles.selectPet}
                name="breedId"
                defaultValue={''}
                onChange={(ev) => {
                  setValueBreed(ev.target.value)
                  setPetForm({
                    ...petForm,
                    ['breedId']: ev.target.value,
                  })
                }}
              >
                <option value="">Raza</option>
                {petForm.speciesId !== ''
                  ? petForm.speciesId
                    ? BREEDS.map((info) => {
                        if (petForm.speciesId === info.speciesId) {
                          return <ValueSpecie key={info.name} info={info} />
                        }
                      })
                    : BREEDS.map((info) => {
                        return <ValueSpecie key={info.name} info={info} />
                      })
                  : ''}
              </select>
            </Box>

            <Box sx={{ marginBottom: '20px' }}>
              <FormControlLabel
                name="sterilized"
                onChange={() =>
                  setPetForm({
                    ...petForm,
                    ['sterilized']: !petForm.sterilized,
                  })
                }
                control={<Checkbox />}
                label="Esterilizado"
              />

              <FormControlLabel
                name="wormed"
                onChange={() =>
                  setPetForm({
                    ...petForm,
                    ['wormed']: !petForm.wormed,
                  })
                }
                control={<Checkbox />}
                label="Desparacitado"
              />
            </Box>

            <ImageList setImages={setImages} setDataImages={setDataImages} />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
                gap: '20px',
                flexWrap: 'wrap',
              }}
            >
              {images.map((image) => (
                <Card key={image} sx={{ width: 250 }}>
                  <CardMedia
                    key={image}
                    component="img"
                    alt="test"
                    image={image}
                    height="400"
                  />
                </Card>
              ))}
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                margin: '20px',
              }}
            >
              <ButtonSubmit onClick={() => handleSubmit} />
            </Box>
            {isLoading ? <Spinner /> : ''}
            {error ? (
              <BasicModal
                title={'Error'}
                msg={
                  'Rellene bien los campos y vea que cada imagen pesen menos de 10 MB'
                }
                open={open}
                setOpen={setOpen}
              />
            ) : (
              ''
            )}

            <BasicModal
              setOpen={setPlsLogin}
              open={plsLogin}
              title="Por favor inicia sesión"
              msg="Para publicar una mascota necesitas tener tu sesión activa"
            >
              <Link href="auth/login?p=/postPet">
                <Button sx={{ backgroundColor: '#c0c0c085' }}>Ir</Button>
              </Link>
            </BasicModal>
          </Box>
        </Box>
      </UserLayout>
    </>
  )
}
