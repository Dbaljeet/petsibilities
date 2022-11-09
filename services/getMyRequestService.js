const ENDPOINT = '/api/user'

export function getMyRequestService() {
  return fetch(`${ENDPOINT}/getMyRequest`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error, get my pets request')
      }
      return res.json()
    })
    .then((res) => {
      return res
    })
}
