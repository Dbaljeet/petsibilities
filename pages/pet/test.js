import { initialData } from '../../database/pets'
import { Box, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'
import NextLink from 'next/link'
const pet = initialData.pets[0]
export default function Test() {
  console.log(pet)

  return (
    <>
      <Grid container>
        <Grid item>
          <h1>{pet.name}</h1>

          <NextLink href="/pet/test" passHref prefetch={false}>
            <CardActionArea>
              <CardMedia
                height="440"
                className="fadeIn"
                component="img"
                image={pet.picture}
                alt={pet.name}
              />
            </CardActionArea>
          </NextLink>
        </Grid>
        <Box sx={{ mt: 1 }} className="fadeIn">
          <Typography fontWeight={700}>{pet.name}</Typography>
        </Box>
      </Grid>
    </>
  )
}
