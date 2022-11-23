export function postImagePet({ image }) {
  console.log(image)

  return fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY}`, {
    method: 'POST',
    body: image,
  }).then((res) => {
    return res.json()
  })
}
