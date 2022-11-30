import { useContext, useEffect, useState } from 'react'
import NextLink from 'next/link'

import { useRouter } from 'next/router'
import { AuthContext } from '../../context'

import { Box, Button, Grid, Link, Rating, Typography } from '@mui/material'

import { UserLayout } from '../../components/layouts'
import { BasicModal } from '../../components/ui'

import { postScore } from '../../services/score/postScore'

const PostScore = () => {
  const { user } = useContext(AuthContext)

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [value, setValue] = useState(1)

  const [openModal, setOpenModal] = useState(false)
  const [error, setError] = useState(false)
  const [successful, setSuccessful] = useState(false)

  const router = useRouter()
  useEffect(() => {
    if (!router.isReady) return
    const { id, name = '' } = router.query
    setId(id)
    setName(name)
  }, [router.isReady])

  const handleSubmit = async () => {
    try {
      if (user) {
        const { message } = await postScore({ score: value, userId: id })
        if (message) {
          setSuccessful(true)
          setTimeout(() => {
            router.replace('/pets')
          }, 4000)
        } else {
          setError(true)
        }
      } else {
        setOpenModal(true)
      }
    } catch {
      setError(true)
    }
  }

  return (
    <>
      <BasicModal
        title="Por favor iniciar sesión antes de continuar"
        open={openModal}
        setOpen={setOpenModal}
      >
        <NextLink href={`/auth/login?p=${router.asPath}`} passHref>
          <Link
            sx={{
              backgroundColor: '#fde7d0',
              padding: '20px 40px',
              borderRadius: '10px',
              cursor: 'pointer',
            }}
          >
            Ir
          </Link>
        </NextLink>
      </BasicModal>
      <BasicModal
        open={successful}
        setOpen={setSuccessful}
        title={'Se ha guardado su puntuación'}
        msg={'Gracias por darse el tiempo de asignar una puntuación.'}
      >
        <Typography>
          Se redireccionará a la página principal en 4 segundos
        </Typography>
      </BasicModal>
      <BasicModal
        open={error}
        setOpen={setError}
        title={'Error'}
        msg={'Prueba a recargar la página o volver a iniciar sesión'}
      />
      <UserLayout title="Puntuar | Petsibilities">
        <Grid
          container
          component="main"
          sx={{
            height: '100vh',
            textAlign: 'center',
          }}
        >
          <Grid
            item
            xs={false}
            sm={false}
            md={5}
            sx={{
              backgroundImage: 'url(/pexels-karolina-grabowska.webp)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></Grid>

          <Grid item xs={12} sm={12} md={7} sx={{ margin: 'auto' }}>
            <Box
              sx={{
                textAlign: 'center',
                marginTop: '70px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <Typography variant="h1">Puntuar a {name}</Typography>
              <Rating
                defaultValue={1}
                size="large"
                onChange={(ev, newValue) => setValue(newValue)}
              />
            </Box>
            <Button
              sx={{ marginTop: '20px' }}
              onClick={handleSubmit}
              disabled={name === '' || id === ''}
            >
              Calificar usuario
            </Button>
          </Grid>
        </Grid>
      </UserLayout>
    </>
  )
}
export default PostScore
