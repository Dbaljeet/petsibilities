export default async function getRequest(req, res) {
  const {
    name,
    email,
    password,
    bankAccountNumber,
    bankAccountType,
    bankName,
    houseSize,
    description,
    urlImage,
    phoneNumber,
  } = req.body
  return fetch(`${process.env.ENDPOINT}/profile/personal-information`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + req.cookies.access,
    },
    body: JSON.stringify({
      name,
      email,
      password,
      bankAccountNumber,
      bankAccountType,
      bankName,
      houseSize,
      description,
      urlImage,
      phoneNumber,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error('error response to patch info')
      return res.json()
    })
    .then((resp) => {
      return res.status(200).json({ resp })
    })
}
