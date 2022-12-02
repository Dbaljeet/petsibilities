export default async function register(req, res) {
  const { name, email, phoneNumber, city, password, confirmPassword } = req.body
  let realphoneNumber = '+56' + phoneNumber

  if (password != confirmPassword) {
    return res.status(401).json({ message: 'Las contraseñas no son iguales' })
  }

  if (realphoneNumber.length < 12) {
    return res.status(401).json({ message: 'El número debe ser de 9 dígitos' })
  }

  return fetch(`${process.env.ENDPOINT}/users`, {
    method: 'POST',
    headers: {
      api: process.env.API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      phoneNumber: realphoneNumber,
      password,
      houseSize: 10,
      roleId: 2,
      cityId: city,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error('error response')
      return res.json()
    })
    .then((resp) => {
      return res.status(200).json({ message: resp })
    })
}
