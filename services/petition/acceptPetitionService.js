const ENDPOINT = '/api/user'
export function acceptPetitionService({ accepted, idPetition }) {
  return fetch(`${ENDPOINT}/acceptPetition`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      acepted: accepted,
      idPetition,
    }),
  })
    .then((res) => {
      console.log(res, 'res de accept')
      if (!res.ok) {
        throw new Error('error, no se pudo aceptar o rechazar la petición')
      }
      return res.json()
    })
    .then((res) => {
      return { pet: res }
    })
}
