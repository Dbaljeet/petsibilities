export function getPetById({ id }) {
  return fetch(`${process.env.NEXT_PUBLIC_NEXTBACKEND}/pets/getPetbyId`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error, get pet by id')
      }
      return res.json()
    })
    .then((res) => {
      return res
    })
}
