import { useContext, useState } from 'react'

import { AuthContext } from '../context'

import { getRequestService } from '../services'

import {
  Box,
  Button,
  CardMedia,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material'

import { BasicModal } from '../components/ui'
import { UserLayout } from '../components/layouts'

import MyPetition from '../components/MyPetition'
import Petition from '../components/Petition'

const LIMIT = 5
const INITIAL_PAGE = 0

export default function Request() {
  const { user } = useContext(AuthContext)

  const [msg, setMsg] = useState('')
  const [title, setTitle] = useState('')

  const [open, setOpen] = useState(false)

  const [request, setRequest] = useState([])
  const [filter, setFilter] = useState('Ver todas')

  const [page, setPage] = useState(INITIAL_PAGE)

  const [enableMoreData, setEnableMoreData] = useState(false)
  const [Unauthorized, setUnauthorized] = useState(false)

  const getRequest = async () => {
    try {
      const res = await getRequestService({ page })
      if (res === undefined) {
        setOpen(true)
        setTitle('Necesita recargar la página o volver a iniciar sesión')
      } else {
        if (res.resp.petitionsDetails.length === 0) {
          setEnableMoreData(false)
        } else {
          setRequest((prevPetitions) =>
            prevPetitions.concat(res.resp.petitionsDetails)
          )
          setEnableMoreData(true)

          setPage(page + LIMIT)
        }
      }
    } catch {
      setOpen(true)
      setTitle('Necesita recargar la página o volver a iniciar sesión')
    }
  }

  const getFirstRequest = async () => {
    try {
      if (user === undefined) {
        setUnauthorized(true)
      } else {
        setEnableMoreData(false)
        const res = await getRequestService({ page: INITIAL_PAGE })
        if (res === undefined) {
          setOpen(true)
          setTitle('Necesita recargar la página o volver a iniciar sesión')
        } else {
          if (res.resp.petitionsDetails.length !== 0) {
            setRequest(res.resp.petitionsDetails)
            setEnableMoreData(true)
            setPage(LIMIT)
          }
        }
      }
    } catch {
      setOpen(true)
      setTitle('Necesita recargar la página o volver a iniciar sesión')
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

      <BasicModal title={title} msg={msg} open={open} setOpen={setOpen} />
      <UserLayout
        title="Solicitudes recibidas | Petsibilities"
        pageDescription="Revisa las solicitudes de adopción que has recibido"
      >
        <Box sx={{ mt: 10, mx: 2, display: 'flex', flexDirection: 'column' }}>
          <Button onClick={getFirstRequest}>Ver solicitudes</Button>

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

            <MenuItem key={'Pendientes'} value={'Pendientes'}>
              {'Pendientes'}
            </MenuItem>

            <MenuItem key={'Aceptadas'} value={true}>
              {'Aceptadas'}
            </MenuItem>

            <MenuItem key={'Rechazadas'} value={false}>
              {'Rechazadas'}
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
                /*aceptadas */
                requestU.petition.accepted === true ? (
                  filter === true ? (
                    <MyPetition key={requestU.petition.id} request={requestU} />
                  ) : filter === 'Ver todas' ? (
                    <MyPetition key={requestU.petition.id} request={requestU} />
                  ) : (
                    ''
                  )
                ) : /*rechazadas */
                requestU.petition.accepted === false ? (
                  !filter ? (
                    <MyPetition key={requestU.petition.id} request={requestU} />
                  ) : filter === 'Ver todas' ? (
                    <MyPetition key={requestU.petition.id} request={requestU} />
                  ) : (
                    ''
                  )
                ) : /*pendientes*/
                filter === 'Pendientes' ? (
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
            </Grid>
          </Grid>
        </Box>
      </UserLayout>
    </>
  )
}
