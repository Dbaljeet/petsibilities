export default async function getpets(req, res) {
  const { id } = req.body
  return fetch(`${process.env.ENDPOINT}/pets/${id}`, {
    method: 'GET',
    headers: {
      api: process.env.API_KEY,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return res.json()
    })
    .then((resp) => {
      return res.status(200).json({ message: resp })
    })
}
