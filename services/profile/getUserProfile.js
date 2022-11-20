const ENDPOINT = '/api/profile'
export function getUserProfile({ id }) {
  return fetch(`${ENDPOINT}/getProfile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error, no se pudo obtener el perfil')
      }
      return res.json()
    })
    .then((res) => {
      const resp = res.resp
      return { resp }
    })
}
