import { Box, Button, Grid } from '@mui/material'
import { useState } from 'react'
import { UserLayout } from '../components/layouts'
import Petition from '../components/Petition'
import { getRequestService } from '../services'

export default function Request() {
  const [request, setRequest] = useState([])
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
  const columns = [
    { field: 'name_pet', headerName: 'Mascota', width: 90 },
    {
      field: 'adopter',
      headerName: 'Nombre',
      width: 150,
    },
  ]
  return (
    <>
      <UserLayout
        title="Solicitudes recibidas"
        pageDescription="Revisa las solicitudes de adopción que has recibido"
      >
        <Box sx={{ mt: 10, mx: 2, display: 'flex', flexDirection: 'column' }}>
          <Button onClick={getRequest}>Ver solicitudes</Button>
          <Grid container>
            <Grid item flex sx={{ margin: 'auto' }}>
              {request.map((requestU) => (
                <Petition key={requestU.petition.id} request={requestU} />
              ))}
            </Grid>
          </Grid>
        </Box>
      </UserLayout>
    </>
  )
}
