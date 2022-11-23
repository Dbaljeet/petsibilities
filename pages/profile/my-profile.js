import { useContext, useEffect, useState } from 'react'
import NextLink from 'next/link'

import { AuthContext } from '../../context'

import { getPersonalInformation } from '../../services'

import {
  BasicModal,
  ChangePersonalInfoModal,
  StarList,
} from '../../components/ui'

import ModeEditIcon from '@mui/icons-material/ModeEdit'
import {
  Box,
  Grid,
  Avatar,
  Button,
  Typography,
  Badge,
  Divider,
} from '@mui/material'

import { UserLayout } from '../../components/layouts'
import {
  AdminPanelSettings,
  Email,
  Person,
  Verified,
} from '@mui/icons-material'

const TypographyStyle = {
  border: '1px solid #0004',
  borderRadius: '40px',
  padding: '15px 30px',
  maxWidth: '450px',
  backgroundColor: '#fff9',
}

const defaultImage =
  'https://res.cloudinary.com/dj4ce5tcg/image/upload/v1668916085/Petsibilities/yzcqlcdpglj4wrlvdkgj.png'

export default function Profile() {
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
    role: '',
  })

  const [openModal, setOpenModal] = useState(false)

  const [modalLogin, setModalLogin] = useState(false)

  const [copy, setCopy] = useState(false)

  const editInfo = () => {
    setOpenModal(true)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(userForm.email).then(() => {
      setCopy(true)
      setTimeout(() => {
        setCopy(false)
      }, 1000)
    })
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
          houseSize: resp.houseSize || 'Sin especificar',
          description: resp.description || 'sin descripción',
          urlImage: resp.urlImage || defaultImage,
          phoneNumber: resp.phoneNumber,
          score: resp.score,
          role: resp.role.id,
        })
      })
      .catch(() => {
        setModalLogin(true)
      })
  }, [])

  return (
    <>
      <UserLayout
        title={`Profile User ~ Petsibilities`}
        pageDescription={`Perfil de usuario`}
      >
        <BasicModal
          open={copy}
          setOpen={setCopy}
          title={'Correo copiado en el portapapeles'}
        ></BasicModal>

        <BasicModal
          title={'Inicia Sesión o recargar la web'}
          msg="Para ver el perfil antes necesitas iniciar sesión o puede que necesites recargar la web"
          open={modalLogin}
          setOpen={setModalLogin}
        >
          <NextLink href={`/auth/login?p=/profile/my-profile`} passHref>
            <Button sx={{ marginTop: '5px' }}>{'Iniciar sesión'}</Button>
          </NextLink>
        </BasicModal>

        <Grid
          container
          my={2}
          sx={{
            margin: '120px auto',
            padding: '0 40px',
            maxWidth: '1200px',
          }}
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
              sx={{ margin: 'auto', width: '100%' }}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  userForm.role === 1 ? (
                    <Avatar
                      sx={{
                        width: 50,
                        height: 50,
                        backgroundColor: '#444040',
                      }}
                      alt="Admin insignia"
                      title="Administrador Petsibilities"
                    >
                      {<AdminPanelSettings></AdminPanelSettings>}
                    </Avatar>
                  ) : userForm.role === 2 ? (
                    <Avatar
                      sx={{
                        width: 50,
                        height: 50,
                        backgroundColor: '#444040',
                      }}
                      alt="User insignia"
                      title="Usuario Petsibilities"
                    >
                      {<Person></Person>}
                    </Avatar>
                  ) : userForm.role === 3 ? (
                    <Avatar
                      sx={{
                        width: 50,
                        height: 50,
                        backgroundColor: '#444040',
                      }}
                      alt="Organización insignia"
                      title="Organización Petsibilities"
                    >
                      {<Verified></Verified>}
                    </Avatar>
                  ) : (
                    ''
                  )
                }
              >
                <Avatar
                  sx={{
                    width: 300,
                    height: 300,
                    border: '1px solid #0003',
                    backgroundColor: '#fff9',
                  }}
                  alt="Imagen de perfil Petsibilities"
                  src={userForm.urlImage}
                />
              </Badge>
              <Typography variant="h1">{` ${userForm.name}`}</Typography>
              <Typography sx={{ textAlign: 'center' }}>
                {userForm.score ? (
                  <StarList cant={userForm.score} />
                ) : (
                  'Sin valoraciones'
                )}
              </Typography>

              <Button
                title="Copiar correo"
                onClick={handleCopy}
                startIcon={<Email fontSize="large" />}
              >
                Correo
              </Button>
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
            <Box sx={{ margin: 'auto' }}>
              <Button
                title="edita tu perfil"
                sx={{ marginLeft: '0' }}
                onClick={editInfo}
                startIcon={<ModeEditIcon />}
              >
                Edita tu perfil
              </Button>
            </Box>

            <Typography
              variant="h2"
              sx={TypographyStyle}
            >{`Ciudad: ${userForm.city}`}</Typography>

            <Typography
              variant="h2"
              sx={TypographyStyle}
            >{`Contacto: ${userForm.phoneNumber}`}</Typography>

            <Typography variant="h2" sx={TypographyStyle}>
              {`Tamaño hogar: ${userForm.houseSize}`}

              {userForm.houseSize !== 'Sin especificar' ? '[m]' : ''}
            </Typography>
            <Box sx={TypographyStyle}>
              <Typography variant="h2">Descripción:</Typography>
              <Typography>{userForm.description}</Typography>
            </Box>
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
