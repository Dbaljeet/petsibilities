const ENDPOINT = '/api/user'

export function getRequestService({ page }) {
  return fetch(`${ENDPOINT}/getRequest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ page }),
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
