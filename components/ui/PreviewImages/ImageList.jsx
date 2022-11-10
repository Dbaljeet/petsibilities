import { PhotoCamera } from '@mui/icons-material'

import { Button } from '@mui/material'
export const ImageList = ({ setImages, setDataImages }) => {
  const handleInput = async (ev) => {
    if (ev.target.files.length > 0) {
      for (let i = 0; i < ev.target.files.length; i++) {
        const file = ev.target.files[i]
        if (file && file.type.substring(0, 5) === 'image') {
          const formData = new FormData()
          formData.append('file', file)
          formData.append('upload_preset', 'Petsibilities')
          //setLoading

          setDataImages((prev) => prev.concat([formData]))

          const reader = new FileReader()
          reader.onloadend = () => {
            const res = reader.result
            setImages((prev) => prev.concat([res]))
          }
          reader.readAsDataURL(file)
        }
      }
    }
  }

  return (
    <>
      <Button
        sx={{ border: '2px solid #000' }}
        variant="outlined"
        endIcon={<PhotoCamera />}
        component="label"
      >
        Agregar fotos
        <input
          hidden
          multiple
          type="file"
          accept="image/*"
          onChange={(ev) => handleInput(ev)}
        />
      </Button>
    </>
  )
}
