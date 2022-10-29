export default async function getpets(req, res) {
  const { commune } = req.body
  return fetch(`${process.env.ENDPOINT}/pets/filter/commune/${commune}`, {
    method: 'GET',
    headers: {
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
