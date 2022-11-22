import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

import { AuthContext } from '../../context'

import { getUserProfile } from '../../services'

import {
  Box,
  Grid,
  Avatar,
  Typography,
  CardMedia,
  Button,
  Badge,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import { UserLayout } from '../../components/layouts'
import { BasicModal, StarList } from '../../components/ui'
import { AdminPanelSettings, Person, Verified } from '@mui/icons-material'

const TypographyStyle = {
  border: '2px solid #0004',
  borderRadius: '40px',
  padding: '15px 30px',
  maxWidth: '450px',
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}))

const defaultImage =
  'https://res.cloudinary.com/dj4ce5tcg/image/upload/v1668916085/Petsibilities/yzcqlcdpglj4wrlvdkgj.png'

export default function Profile() {
  const { user } = useContext(AuthContext)

  const router = useRouter()
  const { id } = router.query

  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    houseSize: '',
    description: '',
    urlImage: defaultImage,
    phoneNumber: '',
    city: '',
    id: '',
    score: '',
    role: '',
  })

  const [modalLogin, setModalLogin] = useState(false)

  useEffect(() => {
    if (!router.isReady) return
    const getInfo = async () => {
      try {
        const { resp } = await getUserProfile({ id })
        console.log(resp)
        setUserForm({
          name: resp.name,
          email: resp.email,
          houseSize: resp.houseSize || 'Sin especificar',
          description: resp.description || 'Sin descripción',
          urlImage: resp.urlImage || defaultImage,
          phoneNumber: resp.phoneNumber,
          city: resp.city.name,
          score: resp.score,
          role: resp.role.id,
        })
      } catch {
        setModalLogin(true)
      }
    }
    getInfo()
  }, [id, router.isReady, user])

  return (
    <>
      <UserLayout
        title={`Profile User | Petsibilities`}
        pageDescription={`Perfil de usuario`}
      >
        <BasicModal
          title={'Inicia Sesión'}
          msg="Para ver el perfil antes necesitas iniciar sesión"
          open={modalLogin}
          setOpen={setModalLogin}
        >
          <NextLink href={`/auth/login?p=/profile/${id}`} passHref>
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
                      alt="Remy Sharp"
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
                      alt="Remy Sharp"
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
                      alt="Remy Sharp"
                    >
                      {<Verified></Verified>}
                    </Avatar>
                  ) : (
                    ''
                  )
                }
              >
                <Avatar
                  sx={{ width: 300, height: 300, border: '1px solid #0003' }}
                  alt="Travis Howard"
                  src={userForm.urlImage}
                />
              </Badge>
              <Typography variant="h1">{` ${userForm.name}`}</Typography>

              <Typography variant="h3" sx={{ textAlign: 'center' }}>
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
