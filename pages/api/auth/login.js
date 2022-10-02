const ENDPOINT = 'http://localhost:3000/api/v1'

export default async function (req, res) {
  const { email, password } = req.body
  return fetch(`${ENDPOINT}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (!res.ok) throw new Error('error response')
      return res.json()
    })
    .then((res) => {
      const { token } = res
      return token
    })
}
