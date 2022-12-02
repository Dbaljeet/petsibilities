export function getPetService({ id }) {
  return fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/pets/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error, correo o contraseña incorrectas')
      }
      return res.json()
    })
    .then((res) => {
      return { pet: res }
    })
}
