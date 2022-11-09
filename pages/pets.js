import React, { useState, useEffect } from 'react'
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Button,
  TextField,
} from '@mui/material'

import styles from '../styles/Pets.module.css'

import { UserLayout } from '../components/layouts'
import { PetCard, PetList } from '../components/pets'
import { initialData } from '../database/pets'
import { data } from '../database/cities'

import { getPetsFilterService } from '../services'
import ValueCity from '../components/ValueCity'

export default function Pets() {
  const SPECIES = ['Perro', 'Gato']

  const [petForm, setPetForm] = useState({
    valueRegion: '',
    valueCity: '',
    valueSpecie: '',
  })
  const [PETS, setPETS] = useState([])

  const getPets = async () => {
    try {
      const { message } = await getPetsFilterService({
        commune: '',
        species: '',
      })
      setPETS(message)
    } catch {
      console.log('error get pets')
    }
  }

  const getPetsByFilter = async () => {
    try {
      const { message } = await getPetsFilterService({
        commune: petForm.valueCity,
        species: petForm.valueSpecie,
      })
      console.log(message)
      setPETS(message)
    } catch {
      setPETS([])
    }
  }

  const handleChange = (ev) => {
    setPetForm({ ...petForm, [ev.target.name]: ev.target.value })
  }

  const handleSubmit = () => {
    console.log(petForm.valueCity, petForm.valueRegion)
    getPetsByFilter()
  }

  useEffect(() => {
    getPets()
  }, [])
  console.log(PETS)
  return (
    <>
      <UserLayout title={'Mascotas disponibles-Petsibilities'}>
        <Grid
          container
          display="flex"
          flexDirection="column"
          justifyContent="center"
          spacing={4}
          alignItems="center"
        >
          <Grid
            item
            display="flex"
            flexDirection="row"
            justifyContent="center"
            flexWrap="wrap"
            sx={{ gap: '30px', marginTop: '70px', width: '100%' }}
          >
            <FormControl
              size="small"
              sx={{
                width: '100%',
                gap: '30px',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <TextField
                sx={{
                  width: '300px',
                  fontSize: '1.5rem',
                  color: 'rgba(0, 0, 0, 0.6)',
                }}
                id="outlined-select-currency"
                select
                label="Región"
                variant="filled"
                value={petForm.valueRegion}
                onChange={handleChange}
                name="valueRegion"
              >
                <MenuItem key="key" value="">
                  Región
                </MenuItem>
                {data.map((info) => {
                  return (
                    <MenuItem key={info.region} value={info.region}>
                      {info.region}
                    </MenuItem>
                  )
                })}
              </TextField>
              <select
                className={styles.select}
                name="valueCity"
                defaultValue={''}
                id="labelCity-select"
                onChange={handleChange}
              >
                <option value="">Comuna</option>
                {petForm.valueRegion
                  ? data.map((info) => {
                      if (petForm.valueRegion === info.region) {
                        return <ValueCity key={info.region} info={info} />
                      }
                    })
                  : data.map((info) => {
                      return <ValueCity key={info.region} info={info} />
                    })}
              </select>

              <TextField
                sx={{
                  width: '300px',
                  fontSize: '1.5rem',
                  color: 'rgba(0, 0, 0, 0.6)',
                }}
                id="outlined-select-currency"
                select
                label="Especie"
                variant="filled"
                value={petForm.valueSpecie}
                onChange={handleChange}
                name="valueSpecie"
              >
                <MenuItem key="key" value="">
                  Especie
                </MenuItem>
                {SPECIES.map((specie) => {
                  return (
                    <MenuItem key={specie} value={specie}>
                      {specie}
                    </MenuItem>
                  )
                })}
              </TextField>

              <Button
                disabled={
                  petForm.valueCity === '' && petForm.valueSpecie === ''
                    ? true
                    : false
                }
                sx={{ width: '300px' }}
                onClick={handleSubmit}
              >
                Buscar
              </Button>
            </FormControl>
          </Grid>

          <Grid item>
            <PetList pets={initialData.pets} />
          </Grid>
          {<PetList pets={PETS} />}

          {/*PETS.map((pet) => (
            <p key={pet.id}>{pet.name}</p>
          ))*/}
        </Grid>
      </UserLayout>
    </>
  )
}
