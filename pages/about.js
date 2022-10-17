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
          sx={{ margin: '60px' }}
        >
          <Typography variant="h1" component="h1">
            Sobre Petsiblities
          </Typography>
        </Box>
        {/*_________________ */}
        <Typography variant="h2" component="h2" sx={{ textAlign: 'center' }}>
          ¿Qué es Petsibilities?
        </Typography>
        <Box
          sx={{
            display: 'flex',
            padding: '60px',
            margin: 'auto',
            flexDirection: 'column',
            marginTop: '10px',
            maxWidth: '600px',
          }}
        >
          <Typography
            component="h3"
            variant="subtitle1"
            color="text.secondary"
            sx={{ fontSize: '1.5rem', textAlign: 'center' }}
          >
            Petsibilities es una plataforma de adopción de mascotas, donde
            otorgamos un espacio seguro y gratuito para todos.
          </Typography>
        </Box>
        {/*_________________ */}
        <Typography
          variant="h2"
          component="h2"
          sx={{ textAlign: 'center', marginTop: '40px' }}
        >
          ¿Cómo adoptar?
        </Typography>
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
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '600px',
            }}
          >
            <CardContent sx={{ flex: '1 0 auto', padding: '20px' }}>
              <Typography
                component="h3"
                variant="subtitle1"
                color="text.secondary"
                sx={{ fontSize: '1.5rem', textAlign: 'center' }}
              >
                Primero debe registrarse e iniciar sesión, al encontrar la
                mascota deseada ver condiciones y dar click en adoptar, el dueño
                de la mascota tiene que ver si acepta o rechaza su petición,
                posiblemente se ponga en contacto con usted con la información
                que nos entregó. Será notificado en la misma web en su historial
                de adopciones
              </Typography>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ minWidth: '300px', maxWidth: '500px' }}
            image="https://images.pexels.com/photos/33152/european-rabbits-bunnies-grass-wildlife.jpg?auto=compress&cs=tinysrgb&w=1600"
            alt="Live from space album cover"
          />
        </Card>
        <Typography
          variant="h2"
          component="h2"
          sx={{ textAlign: 'center', marginTop: '40px' }}
        >
          ¿Cómo puedo poner en adopción?
        </Typography>
        <Box
          sx={{
            display: 'flex',
            padding: '60px',
            margin: 'auto',
            flexDirection: 'column',
            marginTop: '10px',
            maxWidth: '600px',
          }}
        >
          <Typography
            component="h3"
            variant="subtitle1"
            color="text.secondary"
            sx={{ fontSize: '1.5rem', textAlign: 'center' }}
          >
            Solo pueden poner en adopción las entidades aprobadas por nosotros,
            puedes realizar la solicitud iniciando sesión. Por varios motivos
            solo consideramos quienes harán uso correcto de la web.
          </Typography>
        </Box>
      </UserLayout>
    </>
  )
}
