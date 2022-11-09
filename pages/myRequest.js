import { Grid, Box, Button, Petition, Typography } from '@mui/material'
import { useState } from 'react'
import { UserLayout } from '../components/layouts'
import MyPetition from '../components/MyPetition'
import { getMyRequestService } from '../services'

export default function MyRequest() {
  const [request, setRequest] = useState([])
  const [firstSearch, setFirstSearch] = useState(false)
  console.log(request)
  const getRequest = async () => {
    try {
      const res = await getMyRequestService()
      if (res === undefined) {
        alert('Necesita recargar la página o volver a iniciar sesión')
      } else {
        setFirstSearch(true)
        setRequest(res.resp.petitionsPets)
      }
    } catch {
      alert('Necesita recargar la página o volver a iniciar sesión')
    }
  }
  return (
    <>
      <UserLayout title="Mis solicitudes | Petsibilities">
        <Box sx={{ mt: 10, mx: 2, display: 'flex', flexDirection: 'column' }}>
          <Button onClick={getRequest}>Ver solicitudes</Button>
          <Grid container>
            <Grid item flex sx={{ margin: 'auto' }}>
              {request.length !== 0 ? (
                request.map((requestU) => (
                  <MyPetition key={requestU.petition.id} request={requestU} />
                ))
              ) : firstSearch ? (
                <Typography variant="h2">No hay resultados</Typography>
              ) : (
                'Por favor presione en Ver solicitudes'
              )}
            </Grid>
          </Grid>
        </Box>
      </UserLayout>
    </>
  )
}
