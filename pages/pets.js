import data from '../public/data.json'
import Pet from '../components/Pet'
import styled from '../styles/Pets.module.css'
import Head from 'next/head'
import { useState } from 'react'
export default function pet() {
  const pets = data.pets
  const categories = ['edad', 'genero']
  const [selectedCatergories, setSelectedCategories] = useState(categories[0])
  const handleChange = (ev) => {
    setSelectedCategories(ev.target.value)
  }
  return (
    <>
      <Head>
        <title>Petsibilities - Mascotas disponibles</title>
      </Head>
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
    </>
  )
}
