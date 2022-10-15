const ENDPOINT = 'http://localhost:3000/api/v1'

export default async function register(req, res) {
  const { name, email, region, city, password, repeatPassword } = req.body
  return fetch(`${ENDPOINT}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      region,
      city,
      password,
      repeatPassword,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error('error response')
      return res.json()
    })
    .then((resp) => {
      console.log(resp)
      return res.status(200).json({ message: resp })
    })
}
