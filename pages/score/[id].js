import { useContext, useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { AuthContext } from '../../context'

import { Box, Button, Grid, Rating, Typography } from '@mui/material'

import { UserLayout } from '../../components/layouts'
import { BasicModal } from '../../components/ui'
const PostScore = () => {
  const { user } = useContext(AuthContext)

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [value, setValue] = useState(1)

  const [openModal, setOpenModal] = useState(false)

  const router = useRouter()
  useEffect(() => {
    if (router.isReady) {
      const { id, name = '' } = router.query
      setId(id)
      setName(name)
    }
  }, [router.isReady])

  const handleClick = () => {
    if (user) {
      console.log(user)
    } else {
      setOpenModal(true)
    }
  }

  return (
    <>
      <BasicModal
        title="Por favor iniciar sesión antes de continuar"
        open={openModal}
        setOpen={setOpenModal}
        link={`/auth/login?p=${router.asPath}`}
      />
      <UserLayout title="Puntuar | Petsibilities">
        <Grid
          container
          sx={{
            margin: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
          }}
        >
          <Grid item xs={12} md={12} sm={12}>
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
          </Grid>
          <Grid item>
            <Button onClick={handleClick} disabled={name === '' ? true : false}>
              Calificar usuario
            </Button>
          </Grid>
        </Grid>
      </UserLayout>
    </>
  )
}
export default PostScore
