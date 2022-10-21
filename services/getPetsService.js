const ENDPOINT = '/api/pets'

export function getPetsService() {
  return fetch(`${ENDPOINT}/getpets`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
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
