const ENDPOINT = '/api/user'

export function LogoutService() {
  return fetch(`${ENDPOINT}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error, no se pudo cerrar sesión')
      }
      return res.json()
    })
    .then((res) => {
      return res
    })
}
