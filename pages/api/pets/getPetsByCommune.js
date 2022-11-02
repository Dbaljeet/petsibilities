export default async function getpets(req, res) {
  const { commune } = req.body
  return fetch(`${process.env.ENDPOINT}/pets/filter/?city=${commune}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error('error response to get city')
      return res.json()
    })
    .then((resp) => {
      return res.status(200).json({ message: resp })
    })
}
