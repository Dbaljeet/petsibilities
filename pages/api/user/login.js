import cookie from 'cookie'

const ENDPOINT = 'http://localhost:3000/api/v1'

export default async function login(req, res) {
  console.log('______________________________')
  console.log(req.cookies.refresh, 'cookie refresh login debería ser vacío')
  console.log('______________________________')
  const { email, password } = req.body
  return fetch(`${ENDPOINT}/auth/login`, {
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
      console.log('response login "backend" resfresh:', resp)
      res.setHeader('Set-Cookie', [
        cookie.serialize('refresh', resp.refreshToken, {
          httpOnly: true,
          maxAge: 60 * 90,
          sameSite: 'strict',
          path: '/',
          secure: true,
        }),
        cookie.serialize('access', resp.accessToken, {
          httpOnly: true,
          maxAge: 20,
          sameSite: 'strict',
          path: '/',
          secure: true,
        }),
      ])

      return res.status(200).json({ user: resp.user })
    })
}
