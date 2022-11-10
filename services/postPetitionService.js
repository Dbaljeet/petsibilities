const ENDPOINT = '/api/user'

export function postPetitionService({ comment, userPetId }) {
  return fetch(`${ENDPOINT}/petition`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ comment, userPetId }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error, no se pudo mandar solicitud adopción')
      }
      return res.json()
    })
    .then((res) => {
      return res
    })
}
