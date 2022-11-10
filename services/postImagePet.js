export function postImagePet({ image }) {
  console.log(image)

  return fetch(`https://api.cloudinary.com/v1_1/dj4ce5tcg/image/upload`, {
    method: 'POST',
    body: image,
  }).then((res) => {
    return res.json()
  })
}
