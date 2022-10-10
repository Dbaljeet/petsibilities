const ENDPOINT = '/api/auth'

export default function login({ email, password }) {
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
      //
      console.log('2)de services (todo ok)', res)
      return res
    })
}
