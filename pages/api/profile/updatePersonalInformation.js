export default async function getRequest(req, res) {
  const {
    name,
    email,
    password,
    houseSize,
    description,
    urlImage,
    phoneNumber,
  } = req.body

  const PARAMS = [
    name,
    email,
    password,
    houseSize,
    description,
    urlImage,
    phoneNumber,
  ]

  const NAMES = [
    'name',
    'email',
    'password',
    'houseSize',
    'description',
    'urlImage',
    'phoneNumber',
  ]

  let obj = {}
  const Defobj = () => {
    for (let i = 0; i < NAMES.length; i++) {
      if (PARAMS[i] !== '') {
        obj[NAMES[i]] = PARAMS[i]
      }
    }
  }

  Defobj()
  const request = JSON.stringify(obj)

  return fetch(`${process.env.ENDPOINT}/profile/personal-information`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + req.cookies.access,
    },
    body: request,
  })
    .then((res) => {
      if (!res.ok) throw new Error('error response to patch info')
      return res.json()
    })
    .then((resp) => {
      return res.status(200).json({ resp })
    })
}
