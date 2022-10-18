const ENDPOINT = '/api/user'

export function CheckTokenService() {
  return fetch(`${ENDPOINT}/check`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error, inicie sesión')
      }
      return res.json()
    })
    .then((res) => {
      return res
    })
}
