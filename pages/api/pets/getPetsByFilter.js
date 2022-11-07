export default async function getpets(req, res) {
  const { commune, species } = req.body
  console.log('Búsqueda de: ', commune, species)

  const value =
    commune === ''
      ? `${process.env.ENDPOINT}/pets/filter/?species=${species}`
      : species === ''
      ? `${process.env.ENDPOINT}/pets/filter/?city=${commune}`
      : `${process.env.ENDPOINT}/pets/filter/?city=${commune}&species=${species}`

  return fetch(value, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok)
        throw new Error('error response to get pet by city || specie')
      return res.json()
    })
    .then((resp) => {
      console.log(resp, 'res api get pets by filter')

      return res.status(200).json({ message: resp })
    })
}
