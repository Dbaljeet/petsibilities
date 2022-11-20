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

import styles from './changePersonalInfoModal.module.css'

export const ChangePersonalInfoModal = ({ open, setOpen, nameOrig }) => {
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
    houseSize: '',
    description: '',
    urlImage: '',
    phoneNumber: '',
  })

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    try {
      setIsLoading(true)
      if (image !== '') {
        const res2 = await postImagePet({ image })
        console.log(res2, 'res2')

        if (res2.secure_url === undefined) {
          throw new Error('Error, post image')
        }
        editInfo.urlImage = res2.secure_url
      }

      const res = await editPersonalInformation(editInfo)
      setIsLoading(false)
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

  const handleChange = (ev) => {
    setEditInfo({ ...editInfo, [ev.target.name]: ev.target.value })
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
        <DialogContent className={styles.test}>
          <Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '5px',
                gap: 2,
              }}
            >
              {/*

               '',*/}
              <Typography>Solo completa lo que quieras cambiar</Typography>
              <TextField onChange={handleChange} label="Nombre" name="name" />

              <TextField
                helperText={'extensiones válidas .com .net y .cl'}
                onChange={handleChange}
                label="Correo"
                name="email"
              />
              <TextField
                helperText={`Entre 9 y 12 dígitos - actual ${editInfo.password.length}`}
                onChange={handleChange}
                label="Contraseña"
                name="password"
              />
              {/*<TextField label="Ciudad" name='city'/>*/}
              <TextField
                helperText={`Solo 9 números - actual ${editInfo.phoneNumber.length}`}
                onChange={handleChange}
                label="Número celular"
                name="phoneNumber"
              />
              <TextField
                helperText={`Entre 5 a 250 caracteres actual ${editInfo.description.length}`}
                onChange={handleChange}
                label="Sobre mí"
                name="description"
              />
              <TextField
                helperText="Solo números, expresado en [m]"
                onChange={handleChange}
                label="Tamaño hogar mascota"
                name="houseSize"
              />
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
                <Button sx={{ padding: 4 }} onClick={(ev) => handleSubmit(ev)}>
                  Actualizar datos
                </Button>
              </DialogActions>
            </Box>
            {imageShow !== '' ? (
              <Card key={imageShow} sx={{ width: 250, margin: 'auto' }}>
                <CardMedia
                  key={imageShow}
                  component="img"
                  alt={`Foto de perfil de ${nameOrig}`}
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
