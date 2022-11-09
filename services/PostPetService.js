const ENDPOINT = '/api/pets'

export function PostPetService({
  name,
  description,
  age,
  size,
  wormed,
  sterilized,
  genderId,
  breedId,
  dataImages,
}) {
  return fetch(`${ENDPOINT}/postPet`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
      age,
      size,
      wormed,
      sterilized,
      genderId,
      breedId,
      images: dataImages,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error, rellene los campos')
      }
      return res.json()
    })
    .then((res) => {
      return res
    })
}
