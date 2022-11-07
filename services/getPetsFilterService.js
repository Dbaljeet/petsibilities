const ENDPOINT = '/api/pets'

export function getPetsFilterService({ commune, species }) {
  return fetch(`${ENDPOINT}/getPetsByFilter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ commune, species }),
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
