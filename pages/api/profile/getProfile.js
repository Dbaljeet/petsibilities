export default async function getProfile(req, res) {
  const { id } = req.body
  return fetch(`${process.env.ENDPOINT}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + req.cookies.access,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error('error response to get Request my info')
      return res.json()
    })
    .then((resp) => {
      return res.status(200).json({ resp })
    })
}
