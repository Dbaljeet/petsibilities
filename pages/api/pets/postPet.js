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
    images,
  } = req.body

  return fetch(`${process.env.ENDPOINT}/profile/my-pet`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + req.cookies.access,
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
      images,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error('error response to post')
      return res.json()
    })
    .then((resp) => {
      return res.status(200).json({ message: resp })
    })
}
