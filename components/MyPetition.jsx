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
} from '@mui/material'
const MyPetition = ({ request }) => {
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
            {request.petition.acepted ? <Done /> : <ForwardToInbox />}
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h3">
            {'Comentario: ' + request.petition.comment}
          </Typography>
          <Typography variant="h3">
            {'Fecha: ' + request.petition.date}
          </Typography>
          <Divider sx={{ marginY: 2 }} />
        </AccordionDetails>
      </Accordion>
    </>
  )
}
export default MyPetition
