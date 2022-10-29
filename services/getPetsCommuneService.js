const ENDPOINT = '/api/pets'

export function getPetsCommuneService({ commune }) {
  return fetch(`${ENDPOINT}/getPetsByCommune`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ commune }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error, pets f')
      }
      return res.json()
    })
    .then((res) => {
      return res
    })
}
