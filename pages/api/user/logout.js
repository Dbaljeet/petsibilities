import cookie from 'cookie'
const ENDPOINT = 'http://localhost:3000/api/v1'

export default async function logout(req, res) {
  console.log('______________________________')
  console.log(req.cookies.refresh, 'refresh desde logout')
  console.log('______________________________')

  return fetch(`${ENDPOINT}/auth/logout`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      refresh: req.cookies.refresh,
    },
  })
    .then((res) => {
      console.log('llega al backend | front', res)
      if (!res.ok) throw new Error('error response')
      return res.json()
    })
    .then((resp) => {
      res.setHeader('Set-Cookie', [
        cookie.serialize('refresh', '', {
          httpOnly: true,
          secure: true,
          expires: new Date(0),
          sameSite: 'strict',
          path: '/',
        }),
        cookie.serialize('access', '', {
          httpOnly: true,
          secure: true,
          expires: new Date(0),
          sameSite: 'strict',
          path: '/',
        }),
      ])
      console.log('ress', resp)
      return res.status(200).json({ message: resp })
    })
}
