import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import ModeEditIcon from '@mui/icons-material/ModeEdit'
import {
  Box,
  Grid,
  Avatar,
  TextField,
  Button,
  Typography,
  CardMedia,
} from '@mui/material'

import { UserLayout } from '../../components/layouts'
import { getPersonalInformation } from '../../services'
import { ChangePersonalInfoModal } from '../../components/ui'
import { AuthContext } from '../../context'

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
  })

  const [openModal, setOpenModal] = useState(false)

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
        })
      })
      .catch((err) => console.log(err, 'error'))
  }, [user])

  return (
    <>
      <UserLayout
        title={`Profile User ~ Petsibilities`}
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
                <CardMedia
                  component="img"
                  height={300}
                  image={userForm.urlImage}
                />
              </Avatar>
            </Box>
          </Grid>

          <Grid item xs={12} sm={5}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={4}
            >
              <Grid item>
                <Button onClick={editInfo}>
                  <ModeEditIcon />
                </Button>
              </Grid>

              <Grid
                item
                sx={{
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 5,
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    border: '2px solid #0004',
                    borderRadius: '40px',
                    padding: 2,
                  }}
                >{`Nombre: ${userForm.name}`}</Typography>

                <Typography
                  variant="h2"
                  sx={{
                    border: '2px solid #0004',
                    borderRadius: '40px',
                    padding: 2,
                  }}
                >{`Ciudad: ${userForm.city}`}</Typography>

                <Typography
                  variant="h2"
                  sx={{
                    border: '2px solid #0004',
                    borderRadius: '40px',
                    padding: 2,
                  }}
                >{`Contacto: ${userForm.phoneNumber}`}</Typography>

                <Typography
                  variant="h2"
                  sx={{
                    border: '2px solid #0004',
                    borderRadius: '40px',
                    padding: 2,
                  }}
                >{`Descripcion: ${userForm.description}`}</Typography>

                <Typography
                  variant="h2"
                  sx={{
                    border: '2px solid #0004',
                    borderRadius: '40px',
                    padding: 2,
                  }}
                >{`Hogar: ${userForm.houseSize}`}</Typography>
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
            </Grid>
          </Grid>
        </Grid>
      </UserLayout>
    </>
  )
}
