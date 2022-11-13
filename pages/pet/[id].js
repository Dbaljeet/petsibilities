import { UserLayout } from '../../components/layouts'
import { getPetById, postPetitionService } from '../../services'
import { Box, Button, Grid, Typography } from '@mui/material'
import { StarList } from '../../components/ui'
import { PetSlideShow } from '../../components/pets/PetSlideShow'

export default function Pet({ response }) {
  console.log(response)
  const { pet, owner, score } = response
  const handleClick = async () => {
    try {
      const res = await postPetitionService({
        comment: 'Buenas tardes, quiero adoptar a .. me parece blablabla',
        userPetId: pet.id,
      })
    } catch {}
  }

  return (
    <>
      <UserLayout title={`${pet.name} | Petsibilities`}>
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
              sx={{ padding: '0 50px' }}
            >
              {pet.description}
            </Typography>
            <Typography variant="h3">{`Edad: ${pet.age} año(s)`}</Typography>
            <Typography variant="h3">{`Sexo: ${pet.gender.name}`}</Typography>
            <Typography variant="h3">{`Desparasitado: ${
              pet.wormed ? 'Sí' : 'No'
            }`}</Typography>
            <Typography variant="h3">{`Esterilizado: ${
              pet.sterilized ? 'Sí' : 'No'
            }`}</Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              minWidth: '320px',
            }}
          >
            <Box
              sx={{
                maxWidth: '450px',
                margin: 'auto',
              }}
            >
              <PetSlideShow images={pet.images} />
              <Box>
                <Typography variant="h2" textAlign="center">
                  {owner.name}
                </Typography>
                <Typography
                  sx={{ textAlign: 'center' }}
                >{`valoración dueño(a) ${score}`}</Typography>
                <StarList cant={3} />
                <Button
                  onClick={handleClick}
                  sx={{
                    margin: '20px 0',
                    width: '100%',
                    border: '2px solid #0005',
                  }}
                >
                  Adoptar
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </UserLayout>
    </>
  )
}

export async function getStaticPaths() {
  //fetch all pets---/82 v
  const res = await fetch('http://localhost:3000/api/v1/pets/filter', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const pets = await res.json()
  if (!pets) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  // Get the paths we want to pre-render based on posts
  return {
    paths: pets.map((pet) => ({
      params: { id: `${pet.id}` },
    })),

    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const { id = '' } = params
  const { message } = await getPetById({ id })
  if (!message) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      response: message,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every x seconds
    revalidate: 60 * 60 * 18, // In seconds
  }
}
