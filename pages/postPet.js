import { useState, useContext, useEffect } from 'react'

import { UserLayout } from '../components/layouts'
import { TextField, Box, Typography, Autocomplete } from '@mui/material'
import { ButtonSubmit } from '../components/ui'
export default function PostPet() {
  const [petForm, setPetForm] = useState({
    name: '',
    description: '',
    age: '',
    size: '',
    wormed: '',
    sterilized: '',
    genderId: '',
    breedId: '',
  })
  const [inputValueBreed, setInputValueBreed] = useState('')
  const [valueBreed, setValueBreed] = useState('Labrador')

  const [inputValueGender, setInputValueGender] = useState('')
  const [valueGender, setValueGender] = useState('Masculino')

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    console.log(petForm)
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

  console.log(petForm.description.length)

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
                petForm.description === '' ? 'Debe rellenar el campo' : ''
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
              name="breedId"
              value={valueGender}
              onChange={(ev, newValue) => {
                setValueGender(newValue)
              }}
              inputValue={inputValueGender}
              onInputChange={(ev, newInputValue) => {
                setInputValueGender(newInputValue)
              }}
              options={[]}
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
              }}
              options={[]}
              renderInput={(params) => <TextField {...params} label="Raza*" />}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <ButtonSubmit />
            </Box>
          </Box>
        </Box>
      </UserLayout>
    </>
  )
}
