import { Grid } from '@mui/material'
import { PetCard } from './PetCard'

export const PetList = ({ pets }) => {
  return (
    <Grid container spacing={4} justifyContent="center">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </Grid>
  )
}
