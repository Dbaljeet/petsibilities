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
    .then((response) => {
      return res.status(200).json({ message: 'respuesta ok' })
    })
    .catch((err) => {
      return res.status(400).json({ message: 'malxd' })
    })
}
