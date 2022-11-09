const ENDPOINT = '/api/user'

export function getRequestService() {
  return fetch(`${ENDPOINT}/getRequest`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error, get pets request')
      }
      return res.json()
    })
    .then((res) => {
      return res
    })
}
