export function changePassword({ newPassword, token }) {
  return fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/auth/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newPassword, token }),
  }).then((res) => {
    if (!res.ok) throw new Error('error response to change password')
    return res.json()
  })
}
