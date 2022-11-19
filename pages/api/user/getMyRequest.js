const LIMIT = 5
export default async function getRequest(req, res) {
  const { page } = req.body
  return fetch(
    `${process.env.ENDPOINT}/profile/petition/sent/?limit=${LIMIT}&offset=${page}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + req.cookies.access,
      },
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error('error response to get Request')
      return res.json()
    })
    .then((resp) => {
      return res.status(200).json({ resp })
    })
}
