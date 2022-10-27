import { useState, useEffect } from 'react'
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Box,
} from '@mui/material'

import styles from '../styles/Pets.module.css'

import { UserLayout } from '../components/layouts'
import { PetList } from '../components/pets'
import { initialData } from '../database/pets'
import { data } from '../database/cities'

import { getPetsService } from '../services'
import ValueCity from '../components/ValueCity'

export default function Pet() {
  const [valueRegion, setValueRegion] = useState('')
  const [valueCity, setValueCity] = useState('')

  const getPets = async () => {
    //const PETS = await getPetsService()
  }

  useEffect(() => {
    //getPets()
  }, [])

  const handleChange = (ev) => {
    ev.target.name === 'InputRegion'
      ? setValueRegion(ev.target.value)
      : setValueCity(ev.target.value)
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
            justifyContent="center"
            flexWrap="wrap"
            sx={{ gap: '30px', marginTop: '70px', width: '100%' }}
          >
            <FormControl
              size="small"
              sx={{
                width: 300,
                gap: '10px',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <InputLabel
                sx={{ fontSize: '1.5rem' }}
                id="labelRegion-select_label"
              >
                Región
              </InputLabel>
              <Select
                sx={{ minWidth: '300px' }}
                labelId="labelRegion-select_label"
                id="labelRegion-select"
                variant="filled"
                label="Región"
                value={valueRegion}
                onChange={handleChange}
                name="InputRegion"
              >
                {data.map((info) => {
                  return (
                    <MenuItem key={info.region} value={info.region}>
                      {info.region}
                    </MenuItem>
                  )
                })}
              </Select>
              <select
                className={styles.select}
                name="citys"
                defaultValue={''}
                id="labelCity-select"
                onChange={handleChange}
              >
                <option value="" disabled selected>
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
              <Button>Buscar</Button>
            </FormControl>
          </Grid>

          <Grid item>
            <PetList pets={initialData.pets} />
          </Grid>
        </Grid>
      </UserLayout>
    </>
  )
}
