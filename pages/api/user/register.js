export default async function register(req, res) {
  const { name, email, phoneNumber, city, password, confirmPassword } = req.body

  if (password != confirmPassword) {
    return res.status(401).json({ message: 'Las contraseñas no son iguales' })
  }

  return fetch(`${process.env.ENDPOINT}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      phoneNumber,
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
