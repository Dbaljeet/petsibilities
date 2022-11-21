import {
  Grid,
  Box,
  Button,
  Petition,
  Typography,
  CardMedia,
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { UserLayout } from '../components/layouts'
import MyPetition from '../components/MyPetition'
import { BasicModal } from '../components/ui'
import { AuthContext } from '../context'
import { getMyRequestService } from '../services'

const OFFSET = 5

export default function MyRequest() {
  const { user } = useContext(AuthContext)
  console.log(user, 'user')
  const [request, setRequest] = useState([])
  const [firstSearch, setFirstSearch] = useState(false)
  const [page, setPage] = useState(0)

  const [enableMoreData, setEnableMoreData] = useState(true)

  const [error, setError] = useState(false)
  const [Unauthorized, setUnauthorized] = useState(false)

  console.log(request)

  const getRequest = async () => {
    try {
      const res = await getMyRequestService({ page })
      if (res === undefined) {
        setError(true)
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
      setError(true)
    }
  }

  const getFirstRequest = async () => {
    try {
      if (user === undefined) {
        setUnauthorized(true)
      } else {
        setEnableMoreData(true)
        const res = await getMyRequestService({ page: 0 })
        if (res === undefined) {
          setError(true)
        } else {
          setFirstSearch(true)
          if (res.resp.petitionsPets.length === 0) {
            setEnableMoreData(false)
          }
          setRequest(res.resp.petitionsPets)

          setPage(OFFSET)
        }
      }
    } catch {
      setError(true)
    }
  }

  return (
    <>
      <BasicModal
        open={Unauthorized}
        setOpen={setUnauthorized}
        title={'No autorizado'}
        msg={'Por favor inicia sesión para ver tus peticiones'}
      >
        <Box sx={{ marginTop: '12px' }}>
          <CardMedia component="img" image={'https://http.cat/401'} />
        </Box>
      </BasicModal>

      <BasicModal
        title={'Error'}
        msg={'Necesita volver a recargar la página'}
        open={error}
        setOpen={setError}
      ></BasicModal>
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
