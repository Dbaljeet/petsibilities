import { Grid, Box, Button, Petition, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { UserLayout } from '../components/layouts'
import MyPetition from '../components/MyPetition'
import { getMyRequestService } from '../services'

const OFFSET = 5

export default function MyRequest() {
  const [request, setRequest] = useState([])
  const [firstSearch, setFirstSearch] = useState(false)
  const [page, setPage] = useState(0)

  const [enableMoreData, setEnableMoreData] = useState(true)

  console.log(request)

  const getRequest = async () => {
    try {
      const res = await getMyRequestService({ page })
      if (res === undefined) {
        alert('Necesita recargar la página o volver a iniciar sesión')
      } else {
        setFirstSearch(true)
        if (res.resp.petitionsPets.length === 0) {
          setEnableMoreData(false)
        }
        setRequest((prevPetitions) =>
          prevPetitions.concat(res.resp.petitionsPets)
        )
        setPage(page + OFFSET)
      }
    } catch {
      alert('Necesita recargar la página o volver a iniciar sesión')
    }
  }

  const getFirstRequest = async () => {
    try {
      setEnableMoreData(true)
      const res = await getMyRequestService({ page: 0 })
      if (res === undefined) {
        alert('Necesita recargar la página o volver a iniciar sesión')
      } else {
        setFirstSearch(true)
        if (res.resp.petitionsPets.length === 0) {
          setEnableMoreData(false)
        }
        setRequest(res.resp.petitionsPets)

        setPage(OFFSET)
      }
    } catch {
      alert('Necesita recargar la página o volver a iniciar sesión')
    }
  }

  return (
    <>
      <UserLayout title="Mis solicitudes | Petsibilities">
        <Box
          sx={{
            mt: 10,
            mx: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Button onClick={getFirstRequest}>Ver solicitudes</Button>
          <Grid container>
            <Grid item flex sx={{ margin: 'auto' }}>
              {request.length !== 0 ? (
                <>
                  {request.map((requestU) => (
                    <MyPetition key={requestU.petition.id} request={requestU} />
                  ))}
                  {enableMoreData && (
                    <Box
                      sx={{
                        margin: '40px',
                        textAlign: 'center',
                      }}
                    >
                      <Button onClick={getRequest}>Ver más</Button>
                    </Box>
                  )}
                </>
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
