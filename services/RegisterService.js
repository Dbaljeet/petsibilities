const ENDPOINT = '/api/user'
export function RegisterService({
  name,
  region,
  phoneNumber,
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
      phoneNumber,
      region,
      city,
      email,
      password,
      confirmPassword,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('las contraseñas no coinciden')
        }
        throw new Error('error, ingrese correctamente los campos')
      }
      return res.json()
    })
    .then((res) => {
      return res
    })
}
