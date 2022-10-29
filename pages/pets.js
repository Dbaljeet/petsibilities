import React, { useState, useEffect } from 'react'
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Box,
  TextField,
} from '@mui/material'

import styles from '../styles/Pets.module.css'

import { UserLayout } from '../components/layouts'
import { PetList } from '../components/pets'
import { initialData } from '../database/pets'
import { data } from '../database/cities'

import { getPetsService, getPetsCommuneService } from '../services'
import ValueCity from '../components/ValueCity'

export default function Pets() {
  const [valueRegion, setValueRegion] = useState('')
  const [valueCity, setValueCity] = useState('')
  const [PETS, setPETS] = useState([])
  const getPets = async () => {
    try {
      const { message } = await getPetsService()
      setPETS(message)
    } catch {
      console.log('error get pets')
    }
  }

  const getPetsByCommune = async () => {
    const { message } = await getPetsCommuneService({ commune: valueCity })
    setPETS(message)
  }

  useEffect(() => {
    getPets()
  }, [])

  const handleChange = (ev) => {
    ev.target.name === 'InputRegion'
      ? setValueRegion(ev.target.value)
      : setValueCity(ev.target.value)
  }

  const handleSubmit = () => {
    console.log(valueCity, valueRegion)
    getPetsByCommune()
  }
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
                  minWidth: '300px',
                  fontSize: '1.5rem',
                  color: 'rgba(0, 0, 0, 0.6)',
                }}
                id="outlined-select-currency"
                select
                label="Región"
                variant="filled"
                value={valueRegion}
                onChange={handleChange}
                name="InputRegion"
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
                name="citys"
                defaultValue={''}
                id="labelCity-select"
                onChange={handleChange}
              >
                <option value="" disabled>
                  Comuna
                </option>
                {valueRegion
                  ? data.map((info) => {
                      if (valueRegion === info.region) {
                        return <ValueCity key={info.region} info={info} />
                      }
                    })
                  : data.map((info) => {
                      return <ValueCity key={info.region} info={info} />
                    })}
              </select>
              <Button
                disabled={valueCity == ''}
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
          {PETS.map((pet) => {
            return (
              <p key={pet.id}>
                {pet.id}, {pet.name}, {pet.description}
              </p>
            )
          })}
        </Grid>
      </UserLayout>
    </>
  )
}
