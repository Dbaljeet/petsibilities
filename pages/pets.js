import React, { useState, useEffect, useCallback } from 'react'
import {
  FormControl,
  Grid,
  MenuItem,
  Button,
  TextField,
  Typography,
} from '@mui/material'

import styles from '../styles/Pets.module.css'

import { UserLayout } from '../components/layouts'
import { PetList } from '../components/pets'
import { data } from '../database/cities'

import { getPetsFilterService } from '../services'
import ValueCity from '../components/ValueCity'
import { Spinner } from '../components/ui'

export default function Pets() {
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

  const [petForm, setPetForm] = useState({
    valueRegion: '',
    valueCity: '',
    valueSpecie: '',
  })
  const [PETS, setPETS] = useState([])

  const [page, setPage] = useState(0)

  const [noMoreData, setNoMoreData] = useState(false)
  const [loading, setLoading] = useState(false)

  const getPetsByFilter = useCallback(async () => {
    try {
      const { message } = await getPetsFilterService({
        region: petForm.valueRegion,
        commune: petForm.valueCity,
        species: petForm.valueSpecie,
        offset: 0,
      })
      setPage(0)
      setNoMoreData(false)
      setPETS(message)
    } catch {
      setPETS([])
    }
  }, [petForm])

  const getMorePets = useCallback(async () => {
    try {
      setLoading(true)
      const { message } = await getPetsFilterService({
        region: petForm.valueRegion,
        commune: petForm.valueCity,
        species: petForm.valueSpecie,
        offset: page + 7,
      })
      if (message.length === 0) {
        setLoading(false)

        setNoMoreData(true)
      } else {
        setPage((prevPage) => prevPage + 7)
        setLoading(false)
        setPETS((prevPets) => prevPets.concat(message))
      }
    } catch {
      setNoMoreData(true)
      setLoading(false)
      setPETS([])
    }
  }, [page, petForm])

  const handleChange = (ev) => {
    setPetForm({ ...petForm, [ev.target.name]: ev.target.value })
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    getPetsByFilter()
  }

  useEffect(() => {
    const getPetsByFilter2 = async () => {
      try {
        const { message } = await getPetsFilterService({
          region: petForm.valueRegion,
          commune: petForm.valueCity,
          species: petForm.valueSpecie,
          offset: page,
        })
        setPETS(message)
      } catch {
        setPETS([])
      }
    }
    getPetsByFilter2()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
                label="Regi??n"
                variant="filled"
                value={petForm.valueRegion}
                onChange={handleChange}
                name="valueRegion"
              >
                <MenuItem key="key" value="">
                  Regi??n
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
                {petForm.valueRegion !== ''
                  ? petForm.valueRegion
                    ? data.map((info) => {
                        if (petForm.valueRegion === info.region) {
                          return <ValueCity key={info.region} info={info} />
                        }
                      })
                    : data.map((info) => {
                        return <ValueCity key={info.region} info={info} />
                      })
                  : ''}
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
                  petForm.valueSpecie === '' && petForm.valueRegion === ''
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
          {/*
          <Grid item>
            <PetList pets={initialData.pets} />
              </Grid>*/}
          <Grid item>{<PetList pets={PETS} />}</Grid>
          {/*PETS.map((pet) => (
            <p key={pet.id}>{pet.name}</p>
          ))*/}
          {loading && <Spinner />}

          <Grid
            item
            sx={{ margin: 'auto', marginY: 6, padding: 5, textAlign: 'center' }}
          >
            {noMoreData ? (
              <Typography variant="h3">No hay m??s resultados</Typography>
            ) : (
              <Button sx={{ padding: 4 }} onClick={getMorePets}>
                Ver m??s
              </Button>
            )}
          </Grid>
        </Grid>
      </UserLayout>
    </>
  )
}
