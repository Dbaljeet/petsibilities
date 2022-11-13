const ENDPOINT = '/api/user'
export function deletePetitionService({ idPetition }) {
  return fetch(`${ENDPOINT}/deletePetition`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idPetition,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error, no se pudo aceptar o rechazar la petición')
      }
      return res.json()
    })
    .then((res) => {
      return { pet: res }
    })
}
