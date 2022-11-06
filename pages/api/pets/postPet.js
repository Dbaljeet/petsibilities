export default async function postpets(req, res) {
  const {
    name,
    description,
    age,
    size,
    wormed,
    sterilized,
    genderId,
    breedId,
  } = req.body
  return fetch(`${process.env.ENDPOINT}/pets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
      age,
      size,
      wormed,
      sterilized,
      genderId,
      breedId,
    }),
  })
    .then((res) => {
      return res.json()
    })
    .then((resp) => {
      return res.status(200).json({ message: resp })
    })
}
