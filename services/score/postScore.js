const ENDPOINT = '/api/score'

export function postScore({ score, userId }) {
  return fetch(`${ENDPOINT}/postScore`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ score, userId }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error, rating')
      }
      return res.json()
    })
    .then((res) => {
      return res
    })
}
