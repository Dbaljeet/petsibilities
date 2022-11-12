const ENDPOINT = '/api/user'

export function editPersonalInformation({
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
}) {
  return fetch(`${ENDPOINT}/updatePersonalInformation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
      if (!res.ok) {
        throw new Error('error, patch info')
      }
      return res.json()
    })
    .then((res) => {
      return res
    })
}
