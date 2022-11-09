export default async function getRequest(req, res) {
  const { idPetition, acepted } = req.body
  return fetch(`${process.env.ENDPOINT}/profile/petition/${idPetition}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + req.cookies.access,
    },
    body: JSON.stringify({ acepted }),
  })
    .then((res) => {
      if (!res.ok) throw new Error('error response to accept | cancel petition')
      return res.json()
    })
    .then((resp) => {
      return res.status(200).json({ resp })
    })
}
