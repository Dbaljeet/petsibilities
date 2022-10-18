const ENDPOINT = '/api/user'

export default function RegisterService({
  name,
  region,
  city,
  email,
  password,
  confirmPassword,
}) {
  return fetch(`${ENDPOINT}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      region,
      city,
      email,
      password,
      confirmPassword,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error('error, rellene los campos correctamente')
      return res.json()
    })
    .then((res) => {
      console.log(res)
      return res
    })
}
