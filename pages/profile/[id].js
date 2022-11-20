import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { getUserProfile } from '../../services'

import { Box, Grid, Avatar, Typography } from '@mui/material'

import { UserLayout } from '../../components/layouts'

const TypographyStyle = {
  border: '2px solid #0004',
  borderRadius: '40px',
  padding: 2,
  maxWidth: '450px',
}

export default function Profile() {
  const router = useRouter()
  const { id } = router.query
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    houseSize: '',
    description: '',
    urlImage: '',
    phoneNumber: '',
    city: '',
  })
  const [isEdit, setEdit] = useState(false)

  const editInfo = () => {
    setEdit(!isEdit)
  }

  useEffect(() => {
    const getInfo = async () => {
      try {
        const { resp } = await getUserProfile({ id })
        console.log(resp, 'respons frontend use')
        setUserForm({
          name: resp.name,
          email: resp.email,
          houseSize: resp.houseSize || 'Sin especificar',
          description: resp.description || 'Sin descripción',
          urlImage: resp.urlImage,
          phoneNumber: resp.phoneNumber,
          city: resp.city.name,
        })
      } catch {
        console.log('No se pudo obtener perfil')
      }
    }
    getInfo()
  }, [])

  return (
    <>
      <UserLayout
        title={`Profile User | Petsibilities`}
        pageDescription={`Perfil de usuario`}
      >
        <Grid
          container
          my={2}
          spacing={2}
          sx={{ marginTop: '70px', padding: '0 40px' }}
          justifyContent="center"
          direction="row"
          alignItems="Center"
        >
          <Grid item xs={12} sm={7} alignItems="center">
            <Box display="flex" alignItems="center" justifyContent="center">
              <Avatar
                sx={{ height: '300px', width: '300px' }}
                style={{ justifyContent: 'center', display: 'flex' }}
              >
                AM
              </Avatar>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={5}
            sx={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
              minWidth: '300px',
              wordBreak: 'break-word',
              marginTop: '70px',
            }}
          >
            <Typography
              variant="h1"
              sx={TypographyStyle}
            >{`Nombre: ${userForm.name}`}</Typography>

            <Typography
              variant="h2"
              sx={TypographyStyle}
            >{`Ciudad: ${userForm.city}`}</Typography>

            <Typography
              variant="h2"
              sx={TypographyStyle}
            >{`Contacto: ${userForm.phoneNumber}`}</Typography>

            <Typography
              variant="h2"
              sx={TypographyStyle}
            >{`Correo: ${userForm.email}`}</Typography>

            <Typography
              variant="h2"
              sx={TypographyStyle}
            >{`Descripcion: ${userForm.description}`}</Typography>

            <Typography
              variant="h2"
              sx={TypographyStyle}
            >{`Hogar: ${userForm.houseSize}`}</Typography>
          </Grid>
        </Grid>
      </UserLayout>
    </>
  )
}

export async function getServerSideProps() {
  return { props: {} }
  //const response = getPersonalInformation()
}
