export function RecoveryPasswordService({ email }) {
  return fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/auth/recovery-password`, {
    method: 'POST',
    headers: {
      api: process.env.NEXT_PUBLIC_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  }).then((res) => {
    if (!res.ok) throw new Error('error response to recovery password')
    return res.json()
  })
}
