import { Grid } from '@mui/material'
import { PetCard } from './PetCard'
import styles from './PetList.module.css'

export const PetList = ({ pets }) => {
  return (
    <Grid className={styles.xd} container spacing={4} justifyContent="center">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </Grid>
  )
}
