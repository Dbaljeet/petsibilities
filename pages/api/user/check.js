import cookie from 'cookie'

export default async function check(req, res) {
  return fetch(`${process.env.ENDPOINT}/auth/refresh-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      refresh: req.cookies.refresh,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error('error response')
      return res.json()
    })
    .then((resp) => {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('access', resp.accessToken, {
          httpOnly: true,
          maxAge: 20,
          sameSite: 'strict',
          path: '/',
          secure: true,
        })
      )
      return res.status(200).json({ message: resp })
    })
}
