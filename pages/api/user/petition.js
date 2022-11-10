export default async function register(req, res) {
  const { comment, userPetId } = req.body
  console.log(req.cookies.access)
  return fetch(`${process.env.ENDPOINT}/profile/petition`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + req.cookies.access,
    },
    body: JSON.stringify({
      comment,
      userPetId,
    }),
  })
    .then((res) => {
      console.log(res, 'res de petition')
      if (!res.ok) throw new Error('error response')
      return res.json()
    })
    .then((resp) => {
      return res.status(200).json({ message: resp })
    })
}
