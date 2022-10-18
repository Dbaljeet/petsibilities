import cookie from 'cookie'

const ENDPOINT = 'http://localhost:3000/api/v1'

export default async function check(req, res) {
  console.log('_________CheckToken_________')
  console.log(req.cookies.refresh)
  console.log('_________CheckToken_________')
  return res.status(200).json({ message: 'ready' })
  /*
  return fetch(`${ENDPOINT}/auth/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (!res.ok) throw new Error('error response')
      return res.json()
    })
    .then((resp) => {
      console.log('response login "backend" resfresh:', resp.refreshToken)
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('refresh', resp.refreshToken, {
          httpOnly: true,
          maxAge: 60 * 60000,
          sameSite: 'strict',
          path: '/',
          secure: true,
        })
      )
      return res.status(200).json({ message: resp })
    })*/
}
