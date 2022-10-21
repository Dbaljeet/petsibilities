export function getPetService({ id }) {
  return fetch(`http://localhost:3000/api/v1/pets/1`, {
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
