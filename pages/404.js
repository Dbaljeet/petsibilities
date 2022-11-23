import { Box, Button, CardMedia, Typography } from '@mui/material'
import Link from 'next/link'
import { UserLayout } from '../components/layouts'

export default function ErrorPage() {
  return (
    <>
      <UserLayout>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="calc(100vh - 200px)"
          sx={{
            wordBreak: 'break-word',
            gap: 10,
            padding: '70px 0',
            marginTop: '20px',
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap={'wrap'}
          >
            <Typography variant="h1" component="h2" fontSize={80}>
              Error 404|
            </Typography>
            <Typography variant="h1" component="h1" fontSize={70}>
              Petsibilities
            </Typography>
          </Box>
          <Box sx={{ marginTop: '40px' }}>
            <CardMedia component="img" image={'https://http.cat/404'} />
          </Box>
          <Link href={'/pets'} passHref>
            <Button>Ver mascotas</Button>
          </Link>
        </Box>
      </UserLayout>
    </>
  )
}
