import { Box, Button, TextField } from '@mui/material'
import { UserLayout } from '../components/layouts'

export default function Recovery() {
  const handleSubmit = () => {}

  return (
    <>
      <UserLayout
        title={'Recuperar contraseña | Petsibilities'}
        pageDescription={'Recupera tu contraseña de Petsibilities'}
      >
        <Box
          sx={{
            margin: 'auto',
            marginTop: '100px',
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            height: '80vh',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          <TextField></TextField>
          <Button onClick={handleSubmit}>Enviar</Button>
        </Box>
      </UserLayout>
    </>
  )
}
