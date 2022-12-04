export function postImagePet({ image }) {
  return fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY}`, {
    method: 'POST',
    body: image,
  }).then((res) => {
    return res.json()
  })
}
