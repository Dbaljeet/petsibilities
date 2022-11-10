const ENDPOINT = 'http://localhost:3001/api/pets'

export function getPetById({ id }) {
  return fetch(`${ENDPOINT}/getPetbyId`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error, get pet by id')
      }
      return res.json()
    })
    .then((res) => {
      return res
    })
}
