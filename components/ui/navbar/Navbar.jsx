import NextLink from 'next/link'
import { useContext } from 'react'
import { UiContext } from '../../../context'
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from '@mui/material'
import { SearchOutlined } from '@mui/icons-material'
export function Navbar() {
  const { toggleSideMenu } = useContext(UiContext)

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography variant="h5">Petsibilities</Typography>
          </Link>
        </NextLink>

        <Box flex={1}></Box>

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <NextLink href="/" passHref>
            <Link>
              <Button>Inicio</Button>
            </Link>
          </NextLink>
          <NextLink href="/pets" passHref>
            <Link>
              <Button>Ver animales</Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1}></Box>

        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <NextLink href="/pets" passHref>
            <a>
              <IconButton name="Buscar">
                <SearchOutlined />
              </IconButton>
            </a>
          </NextLink>
        </Box>

        <Box>
          <Button onClick={toggleSideMenu}>Menú</Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

/*

          <li className={styles.option}>
            <Link href="/profile">
              <a className={styles.option_a}>
                <img className={styles.imageOption} src={profile.src} />

              </a>
            </Link>
          </li>
          <li className={styles.option}>
            <Link href="/">
              <a className={styles.option_a}>
                <img className={styles.imageOption} src={home.src} />
              </a>
            </Link>
          </li>
          <li className={styles.option}>
            <Link href="/pets">
              <a className={styles.option_a}>
                <img className={styles.imageOption} src={search.src} />
              </a>
            </Link>
          </li>
*/
