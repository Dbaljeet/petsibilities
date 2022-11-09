import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

import { UserLayout } from '../components/layouts'
import {
  TextField,
  Box,
  Typography,
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Button,
  CardMedia,
  Card,
} from '@mui/material'
import { ButtonSubmit } from '../components/ui'
import { PostPetService } from '../services'
import { ImageList } from '../components/ui/PreviewImages'
import { PetSlideShow } from '../components/pets/PetSlideShow'

export default function PostPet() {
  const GENDERS = ['Masculino', 'Femenino']
  const BREEDS = ['Labrador']
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
  })
  const [inputValueBreed, setInputValueBreed] = useState('')
  const [valueBreed, setValueBreed] = useState('Labrador')

  const [inputValueGender, setInputValueGender] = useState('')
  const [valueGender, setValueGender] = useState('Masculino')

  const [images, setImages] = useState([])
  const [dataImages, setDataImages] = useState([])

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    try {
      petForm.dataImages = dataImages
      console.log(petForm)
      const res = await PostPetService(petForm)
      if (res) {
        router.push('/pets')
      } else {
        console.log('f rellenar bn')
      }
    } catch {}
  }
  const handleChange = (ev) => {
    setPetForm({ ...petForm, [ev.target.name]: ev.target.value })
  }

  const handleKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {}, [images])
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
              error={petForm.name === ''}
              helperText={petForm.name === '' ? 'Debe rellenar el campo' : ''}
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
              label="descripción mascota"
              variant="outlined"
              onChange={handleChange}
              name="description"
              type="description"
              error={petForm.description === ''}
              helperText={
                petForm.description === ''
                  ? 'Debe rellenar el campo, mínimo 10 caracteres'
                  : 'mínimo 10 caracteres'
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
              helperText={petForm.age === '' ? 'Debe rellenar el campo' : ''}
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
              helperText={petForm.size === '' ? 'Debe rellenar el campo' : ''}
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

            <Autocomplete
              sx={{ margin: '20px 0px' }}
              disablePortal
              name="breedId"
              value={valueBreed}
              onChange={(ev, newValue) => {
                setValueBreed(newValue)
              }}
              inputValue={inputValueBreed}
              onInputChange={(ev, newInputValue) => {
                setInputValueBreed(newInputValue)
                setPetForm({
                  ...petForm,
                  ['breedId']: BREEDS.indexOf(newInputValue) + 1,
                })
              }}
              options={BREEDS}
              renderInput={(params) => <TextField {...params} label="Raza*" />}
            />
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
                <Card key={image} sx={{ width: 250, height: 300 }}>
                  <CardMedia
                    key={image}
                    component="img"
                    alt="test"
                    image={image}
                    height="300"
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
          </Box>
        </Box>
      </UserLayout>
    </>
  )
}
