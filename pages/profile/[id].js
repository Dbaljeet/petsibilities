import { Box, Grid, Avatar, TextField, Button } from '@mui/material'
import { UserLayout } from '../../components/layouts'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { useEffect, useState } from 'react'
import { editPersonalInformation, getPersonalInformation } from '../../services'
import { useRouter } from 'next/router'
export default function Profile() {
  const router = useRouter()
  const { id } = router.query
  console.log(id)
  const [userForm, setUserForm] = useState({
    name: 'Alberto',
    email: '',
    password: '',
    bankAccountNumber: '',
    bankAccountType: '',
    bankName: '',
    houseSize: '',
    description: '',
    urlImage: '',
    phoneNumber: '',
  })
  const [isEdit, setEdit] = useState(false)

  const editInfo = () => {
    setEdit(!isEdit)
  }

  useEffect(() => {
    console.log(id, 'id del useEffect')
    getPersonalInformation(id)
  }, [])

  const patchProfileInfo = async (ev) => {
    ev.preventDefault()
    try {
      const res = await editPersonalInformation(userForm)
      console.log('resedit', res)
    } catch {}
  }

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
                AM
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

              <Grid item>
                <TextField
                  label={`Nombre :${'Alberto Milla'}`}
                  disabled={!isEdit}
                  variant="outlined"
                />
              </Grid>

              <Grid item>
                <TextField
                  label={`Ciudad :${`Calama`}`}
                  disabled={true}
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  label={`Contacto :${`+569 12345678`}`}
                  disabled={true}
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  label={`Descripcion :${`Hola`}`}
                  disabled={true}
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  label={`Hogar :${`35 mts`}`}
                  disabled={true}
                  variant="outlined"
                />
              </Grid>
              {isEdit ? (
                <Button onClick={patchProfileInfo}>Guardar</Button>
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

export async function getServerSideProps() {
  return { props: {} }
  //const response = getPersonalInformation()
}
