import { useContext, useState } from 'react'

import { useRouter } from 'next/router'
import NextLink from 'next/link'

import { AuthContext } from '../../context'

import { getPetById } from '../../services'

import { PetSlideShow } from '../../components/pets/PetSlideShow'
import { UserLayout } from '../../components/layouts'

import {
  Box,
  Button,
  Grid,
  Typography,
} from '@mui/material'
import { BasicModal, StarList } from '../../components/ui'

export default function Pet({ response }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [msg, setMsg] = useState('')

  const {isFallback} = useRouter()

  

  const { user } = useContext(AuthContext)

  const { pet, owner, score, userPetId } = response

  const [isNotLogin, setIsNotLogin] = useState(false)

  const handleClick = async () => {
    try {
      if (!user) {
        setIsNotLogin(true)
      } else {
        setTitle('Rellena el formulario')
        setMsg('Ingresa un comentario que verá el dueño de la mascota')
        setOpen(true)
      }
    } catch {}
  }

  if(isFallback){
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <BasicModal
        open={isNotLogin}
        setOpen={setIsNotLogin}
        title="Inicia sesión"
        msg="Antes de adoptar debes iniciar sesión"
      >
        <Box sx={{ p: '20px 0' }}>
          <NextLink href={`/auth/login?p=/pet/${pet.id}`} passHref>
            <Button sx={{ backgroundColor: 'rgba(0,0,0,0.04)' }}>
              Iniciar sesión
            </Button>
          </NextLink>
        </Box>
      </BasicModal>

      <BasicModal
        title={title}
        msg={msg}
        open={open}
        setOpen={setOpen}
        extra={true}
        userPetId={userPetId}
      />

      <UserLayout title={`${pet.name} | Petsibilities`}>
        <Grid
          container
          sx={{ marginTop: '70px', p: 2 }}
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
                sx={{
                  textAlign: 'center',
                }}
              >
                {pet.description}
              </Typography>
            </Box>

            <Typography variant="h3">{`Edad: ${pet.age} Mes(s)`}</Typography>
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

              <Box
                sx={{
                  wordWrap: 'break-word',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                <Typography variant="h2" textAlign="center">
                  {'Dueño(a): '}
                  <NextLink href={`/profile/${owner.id}`} passHref>
                    <Button variant="outlined">
                      <Typography variant="h2">{owner.name}</Typography>
                    </Button>
                  </NextLink>
                </Typography>
                <Typography sx={{ textAlign: 'center' }}>
                  valoración:
                  {score ? <StarList cant={score} /> : ' Sin valoraciones'}
                </Typography>

                <Button
                  onClick={handleClick}
                  sx={{
                    margin: '20px auto',
                    width: '90%',
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/pets/filter`, {
    method: 'GET',
    headers: {
      api: process.env.NEXT_PUBLIC_API_KEY,
      'Content-Type': 'application/json',
    },
  })

  const pets = await res.json()

  // Get the paths we want to pre-render based on posts
  return {
    paths: pets?.map((pet) => ({
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
  const error = message.error
  if (error) {
    return {
      redirect: {
        destination: '/404',
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
