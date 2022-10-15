import cookie from 'cookie'
const ENDPOINT = 'http://localhost:3000/api/v1'

export default async function logout(req, res) {
  /*
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('refresh', '', {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
      sameSite: 'strict',
      path: '/',
    })
  )
  return res.status(200).json({ message: 'ok' })
  */

  return fetch(`${ENDPOINT}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      token: req.cookies.refresh,
    },
  })
    .then((res) => {
      console.log('llega al backend | front', res)
      if (!res.ok) throw new Error('error response')
      return res.json()
    })
    .then((resp) => {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('refresh', '', {
          httpOnly: true,
          secure: true,
          expires: new Date(0),
          sameSite: 'strict',
          path: '/',
        })
      )
      console.log('ress', resp)
      return res.status(200).json({ message: resp })
    })
}
