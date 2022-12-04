export default async function postScore(req, res) {
  const { score, userId } = req.body

  return fetch(`${process.env.ENDPOINT}/profile/score`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + req.cookies.access,
    },
    body: JSON.stringify({
      score,
      userId,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error('error response to post rating - score')
      return res.json()
    })
    .then((resp) => {
      return res.status(200).json({ message: resp })
    })
}
