import { useState, useEffect } from 'react'
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Typography,
} from '@mui/material'

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
            sx={{ gap: '30px', marginTop: '70px' }}
          >
            <Box display="flex">
              <FormControl
                size="small"
                sx={{
                  minWidth: 300,
                }}
              >
                <InputLabel
                  sx={{ fontSize: '1.5rem' }}
                  id="labelRegion-select_label"
                >
                  Región
                </InputLabel>
                <Select
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
              </FormControl>
            </Box>
            <Box>
              <FormControl
                size="small"
                sx={{
                  minWidth: 300,
                }}
              >
                <InputLabel
                  sx={{ fontSize: '1.5rem' }}
                  id="labelCity-select_label"
                >
                  {valueCity ? valueCity : 'Ciudad - Comuna'}
                </InputLabel>
                <Select
                  labelId="labelCity-select_label"
                  id="labelCity-select"
                  variant="filled"
                  label="Ciudad-comuna"
                  onChange={handleChange}
                  displayEmpty={false}
                >
                  {valueRegion
                    ? data.map((info) => {
                        if (valueRegion === info.region) {
                          return (
                            <ValueCity
                              key={info.region}
                              info={info}
                              setValueCity={setValueCity}
                            />
                          )
                        }
                      })
                    : data.map((info) => {
                        return (
                          <ValueCity
                            key={info.region}
                            info={info}
                            setValueCity={setValueCity}
                          />
                        )
                      })}
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid item>
            <PetList pets={initialData.pets} />
          </Grid>
        </Grid>
      </UserLayout>
    </>
  )
}
