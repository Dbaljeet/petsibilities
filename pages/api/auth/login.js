const ENDPOINT = 'http://localhost:3000/api/v1'

export default async function (req, res) {
  console.log('______________________________')
  console.log(req.cookies)
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
    .then((resp) => {
      //console.log('ress', resp)
      return res.status(200).json({ message: resp })
    })
}
