import { initialData } from '../../database/pets'
import { Box, Button, Grid, Typography } from '@mui/material'
import { UserLayout } from '../../components/layouts'
import { StarList } from '../../components/ui'
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
          spacing={8}
          sx={{ marginTop: '70px' }}
          justifyContent="center"
        >
          <Grid
            item
            xs={12}
            sm={8}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{
              gap: '30px',
              padding: '10px',
            }}
          >
            <Typography variant="h2" fontWeight={500} textAlign="center">
              {pet.name}
            </Typography>
            <Typography
              component="h3"
              variant="subtitle1"
              color="text.secondary"
              sx={{ textAlign: 'center', padding: '0 50px' }}
            >
              {pet.about}
            </Typography>

            <Typography variant="h3">{`Edad: ${pet.age} años`}</Typography>
            <Typography variant="h3">{`Sexo: ${pet.gender}`}</Typography>
            <Typography variant="h3">{`Desparasitada: ${'Sí'}`}</Typography>
            <Typography variant="h3">{`Esterilizada: ${'Sí'}`}</Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              minWidth: '320px',
            }}
          >
            <Box sx={{ maxWidth: '450px', margin: 'auto' }}>
              <PetSlideShow images={pet.pictures} />
              <Typography
                sx={{ textAlign: 'center' }}
              >{`valoración dueño(a) ${3}`}</Typography>
              <StarList cant={3} />
              <Button
                sx={{
                  margin: '20px 0',
                  width: '100%',
                  border: '2px solid #0005',
                }}
              >
                Adoptar
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* */}
      </UserLayout>
    </>
  )
}
