import {
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material'
import { UserLayout } from '../../components/layouts'
import { Starf } from '../../components/ui'

export default function Pet({ pet }) {
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

export async function getStaticPaths() {
  //fetch all pets---/82 v
  const res = await fetch('https://.../posts')
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
  const paths = pets.map((pet) => ({
    params: { _id: pet._id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const { _id = '' } = params
  const pet = await fetch(`https://.../pet/${_id}`)

  if (!pet) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      pet,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every x seconds
    revalidate: 60 * 60 * 18, // In seconds
  }
}
