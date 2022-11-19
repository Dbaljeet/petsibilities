const ENDPOINT = '/api/pets'

export function getPetsFilterService({ region, commune, species, offset }) {
  return fetch(`${ENDPOINT}/getPetsByFilter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ region, commune, species, offset }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error, pets cant get')
      }
      return res.json()
    })
    .then((res) => {
      return res
    })
}
