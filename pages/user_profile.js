import { initialData } from '../database/pets'
import {Box,Grid,Typography,CardMedia,Card,CardContent,} from '@mui/material'
import { UserLayout } from '../components/layouts'

const pet = initialData.pets[0]

export default function user_profile(){
  return (
    <>
      <UserLayout
        title={`Profile User ~ Petsibilities`}
        pageDescription={`Tu perfil de usuario`}
      >
        <Grid container spacing = {8} sx={{ marginTop: '10px' }} justifyContent = "center">
          <Grid item xs={12} sm={8} display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{
              gap: '30px',
              padding: '10px',
            }}>
          <Typography variant = "h2" fontWeight={500} textAlign="center">
            {pet.name}
          </Typography>
          </Grid>
        </Grid>
      </UserLayout>
    </>
  )
}