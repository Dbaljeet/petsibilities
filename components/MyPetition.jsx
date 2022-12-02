import NextLink from 'next/link'

import {
  Clear,
  Done,
  ExpandMoreOutlined,
  ForwardToInbox,
} from '@mui/icons-material'

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
  Divider,
  CardMedia,
  Link,
  Button,
} from '@mui/material'
const MyPetition = ({ request, adopter = false }) => {
  console.log(request, 'requesf:c')
  return (
    <>
      <Accordion key={request.petition.id}>
        <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
            }}
          >
            <Typography variant="h2">{request.pet.name}</Typography>
            {request.petition.accepted ? (
              <>
                <Done /> <Typography variant="h3">(Aceptada)</Typography>
              </>
            ) : request.petition.accepted === false ? (
              <>
                <Clear />
                <Typography variant="h3">(Rechazada)</Typography>
              </>
            ) : (
              <>
                <ForwardToInbox />
                <Typography variant="h3">(Pendiente)</Typography>
              </>
            )}
          </Box>
        </AccordionSummary>

        <AccordionDetails>
          {adopter ? (
            <NextLink href={`profile/${request.petition.userId}`} passHref>
              <Button
                sx={{ backgroundColor: '#c0c0c085', marginBottom: '10px' }}
              >
                <Typography variant="h3">
                  {'Usuario: ' + request.adopter.name}
                </Typography>
              </Button>
            </NextLink>
          ) : (
            ''
          )}

          <Typography variant="h3">
            {'Comentario: ' + request.petition.comment}
          </Typography>
          <Typography variant="h3">
            {'Fecha: ' + request.petition.date}
          </Typography>
          <Divider sx={{ marginY: 2 }} />
          {
            <CardMedia
              component="img"
              height="300"
              sx={{ objectFit: 'contain' }}
              image={request.pet.images[0].url}
              alt={'Petición adopción a ' + request.pet.name}
            />
          }
        </AccordionDetails>
      </Accordion>
    </>
  )
}
export default MyPetition
