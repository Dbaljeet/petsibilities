import { Box, Button, Grid, Rating, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { UserLayout } from '../../components/layouts'

const PostScore = () => {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [value, setValue] = useState(1)
  const router = useRouter()
  useEffect(() => {
    if (router.isReady) {
      const { id, name = '' } = router.query
      setId(id)
      setName(name)
    }
  }, [router.isReady])

  const handleClick = () => {}

  return (
    <>
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
