import { initialData } from '../../database/pets'
import {
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material'
import { UserLayout } from '../../components/layouts'
import { Starf } from '../../components/ui'
const pet = initialData.pets[0]
export default function Pet() {
  return (
    <>
      <UserLayout
        title={`${pet.name} | Petsibilities`}
        pageDescription={`Adopta a ${pet.name}`}
      >
        <Grid container spacing={4} sx={{ marginTop: '70px', padding: '10px' }}>
          <Grid
            item
            xs={7}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ gap: '30px' }}
          >
            <Typography variant="h2" fontWeight={500}>
              {pet.name}
            </Typography>
            <Typography variant="h3">{`Edad: ${pet.age} años`}</Typography>
            <Typography variant="h4">{`Sexo: ${pet.gender}`}</Typography>
          </Grid>

          <Grid
            item
            xs={5}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gap={3}
            alignItems="center"
          >
            <CardActionArea sx={{ borderRadius: '10px', maxWidth: '400px' }}>
              <CardMedia
                sx={{
                  borderRadius: '10px',
                  maxWidth: '400px',
                  minWidth: '250px',
                }}
                height="440"
                className="fadeIn"
                component="img"
                image={pet.picture}
                alt={pet.name}
              />
            </CardActionArea>
            <Button variant="outlined" color="info">
              Adoptar
            </Button>
          </Grid>
        </Grid>
        <Starf />
      </UserLayout>
    </>
  )
}
