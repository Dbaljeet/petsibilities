import { UserLayout } from '../../components/layouts'
import { getPetById, postPetitionService } from '../../services'
import {
  Box,
  Button,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material'
import { BasicModal, StarList } from '../../components/ui'
import { PetSlideShow } from '../../components/pets/PetSlideShow'
import { useState } from 'react'

export default function Pet({ response }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [msg, setMsg] = useState('')

  const { pet, owner, score } = response

  const handleClick = async () => {
    try {
      setTitle('Rellena el formulario')
      setMsg('Ingresa un comentario que verá el dueño de la mascota')
      setOpen(true)
    } catch {}
  }

  return (
    <>
      <BasicModal
        title={title}
        msg={msg}
        open={open}
        setOpen={setOpen}
        extra={true}
        userPetId={14}
      />

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
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '30px',
                width: '70%',
                wordWrap: 'break-word',
              }}
            >
              <Typography variant="h2" fontWeight={500} textAlign="center">
                {pet.name}
              </Typography>

              <Typography
                wrap
                sx={{
                  textAlign: 'center',
                }}
              >
                {pet.description}
              </Typography>
            </Box>

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

              <Box sx={{ wordWrap: 'break-word' }}>
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
