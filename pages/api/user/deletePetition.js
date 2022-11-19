export default async function deletePetition(req, res) {
  const { idPetition } = req.body
  return fetch(
    `${process.env.ENDPOINT}/profile/petition/reject/${idPetition}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + req.cookies.access,
      },
      body: JSON.stringify({ accepted: false }),
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error('error response to cancel petition')
      return res.json()
    })
    .then((resp) => {
      return res.status(200).json({ resp })
    })
}
