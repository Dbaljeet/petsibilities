import { ExpandMoreOutlined, PendingActions } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
  Link,
  Divider,
  Button,
  Modal,
  Rating,
  CardMedia,
} from '@mui/material'
import NextLink from 'next/link'
import { useState } from 'react'

import { acceptPetitionService, deletePetitionService } from '../services'
import { postScore } from '../services/score/postScore'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  minHeight: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const Petition = ({ request, setTitle, setMsg, setOpen }) => {
  const [openRating, setOpenRating] = useState(false)
  const [valueRating, setValueRating] = useState(1)
  const handleCloseRating = () => setOpenRating(false)

  const handleClickRating = async (ev) => {
    ev.preventDefault()
    try {
      const res = await postScore({
        score: valueRating,
        userId: request.petition.userId,
      })
      if (res === undefined) {
        setOpen(true)
        setTitle('Ha ocurrido un error al calificar')
        setMsg(`Intente volver a iniciar sesión o recargar la página`)
      } else {
        handleAccept()
      }
    } catch {
      setOpen(true)
      setTitle('Ha ocurrido un error al calificar')
      setMsg(`Intente volver a iniciar sesión o recargar la página`)
    }
  }

  const handleAccept = async () => {
    try {
      const res = await acceptPetitionService({
        accepted: true,
        idPetition: request.petition.id,
      })
      setOpenRating(false)
      setOpen(true)
      setTitle('Se ha aceptado correctamente')
      setMsg(`id de petición:  ${request.petition.id}`)
    } catch {
      setOpen(true)
      setTitle('Ha ocurrido un error')
      setMsg(`Intente volver a iniciar sesión o recargar la página`)
    }
  }

  const handleCancel = async () => {
    try {
      const res = await deletePetitionService({
        idPetition: request.petition.id,
      })
      setOpen(true)
      setTitle('Se ha cancelado correctamente')
      setMsg(`id petición:${request.petition.id}, procederá a eliminarse`)
    } catch {
      setOpen(true)
      setTitle('Ha ocurrido un error')
      setMsg(`Intente volver a iniciar sesión o recargar la página`)
    }
  }
  return (
    <>
      {/*rating */}

      <Modal
        open={openRating}
        onClose={handleCloseRating}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <Typography variant="h2">Califica al usuario antes</Typography>
            <Rating
              name="simple-controlled"
              value={valueRating}
              onChange={(event, newValue) => {
                setValueRating(newValue)
              }}
            />
            <Button onClick={handleClickRating}>Calificar</Button>
          </Box>
        </Box>
      </Modal>

      {/* */}

      <Accordion key={request.petition.id}>
        <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Typography variant="h1">
              {'Usuario: ' + request.adopter.name} <PendingActions />
            </Typography>
            <Typography variant="h2">{request.pet.name}</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ wordBreak: 'break-word' }}>
          <Typography variant="h3">
            {'Comentario: ' + request.petition.comment}
          </Typography>
          <Typography variant="h3">
            {'Tamaño hogar: ' + request.adopter.houseSize + ' [mt^2]'}
          </Typography>
          <Typography variant="h3">
            {'Fecha: ' + request.petition.date}
          </Typography>
          <NextLink href={`profile/${request.petition.userId}`} passHref>
            <Link underline="hover" target="_blank">
              Ver perfil del usuario
            </Link>
          </NextLink>
          <CardMedia
            component="img"
            height={300}
            sx={{ objectFit: 'contain' }}
            image={request.pet.images[0].url}
          />
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="h3">{request.adopter.email}</Typography>
          <Typography variant="h3">{request.adopter.phoneNumber}</Typography>
          <Button onClick={() => setOpenRating(true)} color="info">
            Aceptar
          </Button>
          <Button onClick={handleCancel} color="warning">
            Rechazar
          </Button>
        </AccordionDetails>
      </Accordion>
    </>
  )
}
export default Petition
