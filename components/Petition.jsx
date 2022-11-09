import { ExpandMoreOutlined } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
  Link,
  Divider,
  Button,
} from '@mui/material'
import LinkNext from 'next/link'
const Petition = ({ request }) => {
  const handleAccept = () => {}
  return (
    <>
      <Accordion key={request.petition.id}>
        <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <LinkNext href={`profile/${request.petition.userId}`} passHref>
              <Link underline="hover">
                <Typography variant="h1">
                  {'Usuario: ' + request.adopter.name}
                </Typography>
              </Link>
            </LinkNext>
            <Typography variant="h2">{request.pet.name}</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h3">
            {'Comentario: ' + request.petition.comment}
          </Typography>
          <Typography variant="h3">
            {'Tamaño hogar: ' + request.adopter.houseSize + ' [mt^2]'}
          </Typography>
          <Typography variant="h3">
            {'Fecha: ' + request.petition.date}
          </Typography>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="h3">{request.adopter.email}</Typography>
          <Typography variant="h3">{request.adopter.phoneNumber}</Typography>
          <Button onClick={handleAccept} color="info">
            Aceptar
          </Button>
          <Button color="warning">Rechazar</Button>
        </AccordionDetails>
      </Accordion>
    </>
  )
}
export default Petition
