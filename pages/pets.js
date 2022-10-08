import data from '../public/data.json'
import Pet from '../components/Pet'
import styled from '../styles/Pets.module.css'
import { useState } from 'react'
import { UserLayout } from '../components/layouts'
export default function pet() {
  const pets = data.pets
  const categories = ['edad', 'genero']
  const [selectedCatergories, setSelectedCategories] = useState(categories[0])
  const handleChange = (ev) => {
    setSelectedCategories(ev.target.value)
  }
  return (
    <>
      <UserLayout title={'Mascotas disponibles-Petsibilities'}>
        {selectedCatergories}

        <select onChange={handleChange} name="categoria">
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
        <div className={styled.div}>
          {pets.map((pet) => (
            <Pet key={pet._id} props={pet} />
          ))}
        </div>
      </UserLayout>
    </>
  )
}
