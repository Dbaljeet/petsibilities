import { useRouter } from 'next/router'
import { useState } from 'react'

import { editPersonalInformation, postImagePet } from '../../../services'

import { PhotoCamera } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material'
import { Spinner } from '../spinner'

export const ChangePersonalInfoModal = ({ open, setOpen }) => {
  const router = useRouter()
  const title = 'Cambia tu información personal'

  const [image, setImage] = useState('')
  const [imageShow, setImagesShow] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleClose = () => setOpen(false)

  const [editInfo, setEditInfo] = useState({
    name: '',
    email: '',
    password: '',
    bankAccountNumber: '',
    bankAccountType: '',
    bankName: '',
    houseSize: '',
    description: '',
    urlImage: '',
    phoneNumber: '',
  })

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    try {
      setIsLoading(true)
      const res2 = await postImagePet({ image })
      console.log(res2, 'res2')

      if (res2.secure_url === undefined) {
        throw new Error('Error, post image')
      }

      setIsLoading(false)

      editInfo.urlImage = res2.secure_url

      const res = await editPersonalInformation(editInfo)
      if (res) {
        router.reload()
      } else {
        throw new Error('Error, post pet service front')
      }
    } catch (res) {
      setIsLoading(false)
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  const handleInputPhoto = async (ev) => {
    const file = ev.target.files[0]
    console.log(file)
    if (file && file.type.substring(0, 5) === 'image') {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'Petsibilities')
      //setLoading

      setImage(formData)

      const reader = new FileReader()
      reader.onloadend = () => {
        const res = reader.result
        setImagesShow(res)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '5px',
                gap: 1,
              }}
            >
              <Typography>Solo completa lo que quieras cambiar</Typography>
              <TextField label="Nombre" />
              <TextField label="Correo" />
              <TextField label="Contraseña" />
              <TextField label="Ciudad" />
              <TextField label="Número celular" />
              <TextField label="Sobre mí" />
              <TextField label="Tamaño hogar mascota" />
              <Button
                sx={{ border: '2px solid #0004' }}
                variant="outlined"
                endIcon={<PhotoCamera />}
                component="label"
              >
                Agregar foto de perfil
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(ev) => handleInputPhoto(ev)}
                />
              </Button>
              <DialogActions>
                <Button onClick={(ev) => handleSubmit(ev)}>
                  Actualizar datos
                </Button>
              </DialogActions>
            </Box>
            {imageShow !== '' ? (
              <Card key={image} sx={{ width: 250 }}>
                <CardMedia
                  key={imageShow}
                  component="img"
                  alt="test"
                  image={imageShow}
                  height="400"
                />
              </Card>
            ) : (
              ''
            )}

            {isLoading && <Spinner />}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}
