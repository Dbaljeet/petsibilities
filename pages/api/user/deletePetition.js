export default async function deletePetition(req, res) {
  const { idPetition } = req.body
  return fetch(`${process.env.ENDPOINT}/profile/petition/${idPetition}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + req.cookies.access,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error('error response to cancel petition')
      return res.json()
    })
    .then((resp) => {
      return res.status(200).json({ resp })
    })
}
