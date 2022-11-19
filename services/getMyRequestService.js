const ENDPOINT = '/api/user'

export function getMyRequestService({ page }) {
  return fetch(`${ENDPOINT}/getMyRequest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ page }),
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
