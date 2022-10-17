import {
  Box,
  Grid,
  Typography,
  CardMedia,
  Card,
  CardContent,
} from '@mui/material'
import { UserLayout } from '../components/layouts'

export default function About() {
  return (
    <>
      <UserLayout
        title="Sobre nosotros | Petsibilities"
        pageDescription="Descubre sobre qué es Petsibilities y cómo te ayudamos"
      >
        xd
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ marginTop: '60px' }}
        >
          <Typography variant="h1" component="h1">
            Sobre Petsiblities
          </Typography>
        </Box>
        {/*_________________ */}
        <Card
          sx={{
            display: 'flex',
            width: '100%',
            marginTop: '10px',
            justifyContent: 'center',
            padding: '40px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Box
            sx={{ display: 'flex', flexDirection: 'column', width: '330px' }}
          >
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography
                component="h3"
                variant="subtitle1"
                color="text.secondary"
              >
                Petsibilities es una plataforma de adopción de mascotas, donde
                otorgamos un espacio seguro y gratuito para todos
              </Typography>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ minWidth: '300px', maxWidth: '500px' }}
            image="https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Live from space album cover"
          />
        </Card>
        {/*_________________ */}
        <Card
          sx={{
            display: 'flex',
            width: '100%',
            marginTop: '10px',
            justifyContent: 'center',
            padding: '40px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Box
            sx={{ display: 'flex', flexDirection: 'column', width: '330px' }}
          >
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography
                component="h3"
                variant="subtitle1"
                color="text.secondary"
              ></Typography>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 300 }}
            image="https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Live from space album cover"
          />
        </Card>
      </UserLayout>
    </>
  )
}
