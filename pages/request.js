import { Box, Button, Grid, MenuItem, TextField } from '@mui/material'
import { useState } from 'react'
import { UserLayout } from '../components/layouts'
import Petition from '../components/Petition'
import { getRequestService } from '../services'

export default function Request() {
  const [request, setRequest] = useState([])
  const [filter, setFilter] = useState('Ver todas')
  const getRequest = async () => {
    try {
      const res = await getRequestService()
      if (res === undefined) {
        alert('Necesita recargar la página o volver a iniciar sesión')
      } else {
        setRequest(res.resp.petitionsDetails)
      }
    } catch {
      alert('Necesita recargar la página o volver a iniciar sesión')
    }
  }
  console.log(request)
  return (
    <>
      <UserLayout
        title="Solicitudes recibidas"
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
            <Grid item flex sx={{ margin: 'auto' }}>
              {request.map((requestU) =>
                filter === 'Ver todas' ? (
                  <Petition key={requestU.petition.id} request={requestU} />
                ) : filter === requestU.petition.acepted ? (
                  <Petition key={requestU.petition.id} request={requestU} />
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
