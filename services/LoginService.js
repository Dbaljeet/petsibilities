const ENDPOINT = '/api/user'

export function LoginService({ email, password }) {
  return fetch(`${ENDPOINT}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error, correo o contraseña incorrectas')
      }
      return res.json()
    })
    .then((res) => {
      return res
    })
}
