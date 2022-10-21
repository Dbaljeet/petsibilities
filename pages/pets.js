import { initialData } from '../database/pets'
import { PetList } from '../components/pets'
import { UserLayout } from '../components/layouts'
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { getPetsService } from '../services'
export default function Pet() {
  const [valueRegion, setValueRegion] = useState('')
  const [valueCity, setValueCity] = useState('')

  const getPets = async () => {
    const PETS = await getPetsService()
  }

  useEffect(() => {
    getPets()
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
                <InputLabel id="labelRegion-select_label">Región</InputLabel>
                <Select
                  labelId="labelRegion-select_label"
                  id="labelRegion-select"
                  variant="filled"
                  label="Región"
                  value={valueRegion}
                  onChange={handleChange}
                  name="InputRegion"
                >
                  <MenuItem value={1}>1 reg</MenuItem>
                  <MenuItem value={2}>2 reg</MenuItem>
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
                <InputLabel id="labelCity-select_label">Ciudad</InputLabel>
                <Select
                  labelId="labelCity-select_label"
                  id="labelCity-select"
                  variant="filled"
                  label="Ciudad"
                  value={valueCity}
                  onChange={handleChange}
                >
                  <MenuItem value={1}>1 ciudad</MenuItem>
                  <MenuItem value={2}>2 ciudad</MenuItem>
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
