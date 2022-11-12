const ENDPOINT = 'http://localhost:3001/api/profile'

export function getPersonalInformation() {
  return fetch(`${ENDPOINT}/getMyProfile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error, get my personal information')
      }
      return res.json()
    })
    .then((res) => {
      return res
    })
}
