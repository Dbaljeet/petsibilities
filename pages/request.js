import { useState } from 'react'

import {
  Box,
  Button,
  Grid,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from '@mui/material'

import { BasicModal } from '../components/ui'
import { UserLayout } from '../components/layouts'

import MyPetition from '../components/MyPetition'
import Petition from '../components/Petition'

import { getRequestService } from '../services'

export default function Request() {
  const [msg, setMsg] = useState('')
  const [title, setTitle] = useState('')

  const [open, setOpen] = useState(false)

  const [request, setRequest] = useState([])
  const [filter, setFilter] = useState('Ver todas')

  const [page, setPage] = useState(0)
  const [firstPage, setFirstPage] = useState(false)

  const getRequest = async () => {
    try {
      const res = await getRequestService({ page })
      if (res === undefined) {
        setOpen(true)
        setTitle('Necesita recargar la página o volver a iniciar sesión')
      } else {
        setRequest((prevPetitions) =>
          prevPetitions.concat(res.resp.petitionsDetails)
        )
        setPage(page + 5)
      }
    } catch {
      setOpen(true)
      setTitle('Necesita recargar la página o volver a iniciar sesión')
    }
  }

  return (
    <>
      <BasicModal title={title} msg={msg} open={open} setOpen={setOpen} />
      <UserLayout
        title="Solicitudes recibidas | Petsibilities"
        pageDescription="Revisa las solicitudes de adopción que has recibido"
      >
        <Box sx={{ mt: 10, mx: 2, display: 'flex', flexDirection: 'column' }}>
          <Button onClick={getRequest}>Ver solicitudes</Button>

          <TextField
            sx={{
              width: '300px',
              fontSize: '1.5rem',
              color: 'rgba(0, 0, 0, 0.6)',
              margin: 'auto',
            }}
            id="outlined-select-currency"
            select
            label="Filtrar por "
            variant="filled"
            value={filter}
            onChange={(ev) => {
              setFilter(ev.target.value)
            }}
            name="valueFilter"
          >
            <MenuItem key="key" value="Ver todas">
              Ver todas
            </MenuItem>

            <MenuItem key={'Pendientes'} value={false}>
              {'Pendientes'}
            </MenuItem>

            <MenuItem key={'Aceptadas'} value={true}>
              {'Aceptadas'}
            </MenuItem>
          </TextField>

          <Grid container>
            <Grid
              item
              sx={{
                paddingY: '40px',
                margin: 'auto',
                display: 'flex',
                gap: '20px',
                flexDirection: 'column',
              }}
            >
              {request.map((requestU) =>
                requestU.petition.acepted ? (
                  filter ? (
                    <MyPetition key={requestU.petition.id} request={requestU} />
                  ) : filter === 'Ver todas' ? (
                    <MyPetition key={requestU.petition.id} request={requestU} />
                  ) : (
                    ''
                  )
                ) : !filter ? (
                  <Petition
                    key={requestU.petition.id}
                    request={requestU}
                    setTitle={setTitle}
                    setMsg={setMsg}
                    setOpen={setOpen}
                  />
                ) : filter === 'Ver todas' ? (
                  <Petition
                    key={requestU.petition.id}
                    request={requestU}
                    setTitle={setTitle}
                    setMsg={setMsg}
                    setOpen={setOpen}
                  />
                ) : (
                  ''
                )
              )}
            </Grid>
          </Grid>
        </Box>
      </UserLayout>
    </>
  )
}
