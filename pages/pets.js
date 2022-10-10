import { initialData } from '../database/pets'
import { PetList } from '../components/pets'
import { UserLayout } from '../components/layouts'
export default function pet() {
  return (
    <>
      <UserLayout title={'Mascotas disponibles-Petsibilities'}>
        <PetList pets={initialData.pets} />
      </UserLayout>
    </>
  )
}
