import { Box, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'
import NextLink from 'next/link'

export const PetCard = ({ pet }) => {
  return (
    <>
      <Grid item minWidth={310} xs={6} sm={1}>
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
        <Box sx={{ mt: 1 }} className="fadeIn">
          <Typography fontWeight={700}>{pet.name}</Typography>
        </Box>
      </Grid>
    </>
  )
}
