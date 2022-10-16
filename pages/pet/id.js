import { initialData } from '../../database/pets'
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material'
import { UserLayout } from '../../components/layouts'
import { Starf } from '../../components/ui'
import { PetSlideShow } from '../../components/pets/PetSlideShow'
const pet = initialData.pets[0]

export default function Pet() {
  return (
    <>
      <UserLayout
        title={`${pet.name} | Petsibilities`}
        pageDescription={`Adopta a ${pet.name}`}
      >
        <Grid
          container
          spacing={4}
          sx={{ marginTop: '70px', padding: '40px' }}
          justifyContent="center"
        >
          <Grid
            item
            xs={12}
            sm={9}
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
            <Button variant="outlined" color="info">
              Adoptar
            </Button>
          </Grid>

          <Grid item xs={12} sm={3} sx={{ minWidth: '320px' }}>
            <Box sx={{ maxWidth: '400px', margin: 'auto' }}>
              <PetSlideShow images={pet.pictures} />
            </Box>
          </Grid>
        </Grid>
        <Starf />
      </UserLayout>
    </>
  )
}
