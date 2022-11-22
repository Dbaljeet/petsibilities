import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

import { AuthContext } from '../../context'

import { getPersonalInformation } from '../../services'

import {
  BasicModal,
  ChangePersonalInfoModal,
  StarList,
} from '../../components/ui'

import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { Box, Grid, Avatar, Button, Typography, CardMedia } from '@mui/material'

import { UserLayout } from '../../components/layouts'

const TypographyStyle = {
  border: '2px solid #0004',
  borderRadius: '40px',
  padding: '15px 30px',
  maxWidth: '450px',
}

const defaultImage =
  'https://res.cloudinary.com/dj4ce5tcg/image/upload/v1668916085/Petsibilities/yzcqlcdpglj4wrlvdkgj.png'

export default function Profile() {
  const router = useRouter()
  const { user } = useContext(AuthContext)

  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    city: '',
    password: '',
    bankAccountNumber: '',
    bankAccountType: '',
    bankName: '',
    houseSize: '',
    description: '',
    urlImage: '',
    phoneNumber: '',
    score: '',
  })

  const [openModal, setOpenModal] = useState(false)

  const [modalLogin, setModalLogin] = useState(false)

  const editInfo = () => {
    setOpenModal(true)
  }

  useEffect(() => {
    getPersonalInformation()
      .then(({ resp }) => {
        console.log(resp)
        setUserForm({
          name: resp.name,
          email: resp.email,
          city: resp.city.name,
          password: '',
          bankAccountNumber: '',
          bankAccountType: '',
          bankName: '',
          houseSize: resp.houseSize || '',
          description: resp.description || 'sin descripción',
          urlImage: resp.urlImage || defaultImage,
          phoneNumber: resp.phoneNumber,
          score: resp.score,
        })
      })
      .catch(() => {
        setModalLogin(true)
      })
  }, [user])

  return (
    <>
      <UserLayout
        title={`Profile User ~ Petsibilities`}
        pageDescription={`Perfil de usuario`}
      >
        <BasicModal
          title={'Inicia Sesión'}
          msg="Para ver el perfil antes necesitas iniciar sesión"
          open={modalLogin}
          setOpen={setModalLogin}
        >
          <NextLink href={`/auth/login?p=/profile/my-profile`} passHref>
            <Button>{'Iniciar sesión'}</Button>
          </NextLink>
        </BasicModal>
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
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              gap={'60px'}
            >
              <Avatar sx={{ height: '300px', width: '300px' }}>
                <CardMedia component="img" image={userForm.urlImage} />
              </Avatar>

              <Typography variant="h1">{` ${userForm.name}`}</Typography>
              <Typography sx={{ textAlign: 'center' }}>
                {userForm.score ? (
                  <StarList cant={userForm.score} />
                ) : (
                  'Sin valoraciones'
                )}
              </Typography>
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
            <Button onClick={editInfo}>
              <ModeEditIcon />
            </Button>

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

        {openModal ? (
          <>
            <ChangePersonalInfoModal
              open={openModal}
              setOpen={setOpenModal}
              nameOrig={userForm.name}
            />
          </>
        ) : (
          ''
        )}
      </UserLayout>
    </>
  )
}
