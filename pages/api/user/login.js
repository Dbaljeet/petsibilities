import cookie from 'cookie'

export default async function login(req, res) {
  const { email, password } = req.body
  return fetch(`${process.env.ENDPOINT}/auth/login`, {
    method: 'POST',
    headers: {
      api: process.env.API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (!res.ok) throw new Error('error response to login')
      return res.json()
    })
    .then((resp) => {
      res.setHeader('Set-Cookie', [
        cookie.serialize('refresh', resp.refreshToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 2,
          sameSite: 'strict',
          path: '/',
          secure: true,
        }),
        cookie.serialize('access', resp.accessToken, {
          httpOnly: true,
          maxAge: 60 * 3,
          sameSite: 'strict',
          path: '/',
          secure: true,
        }),
      ])

      return res.status(200).json({ user: resp.user })
    })
}
