import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  PetsOutlined,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  LoginOutlined,
  VpnKeyOutlined,
} from '@mui/icons-material'

import { useContext } from 'react'
import { UiContext } from '../../context'
import { useRouter } from 'next/router'

export const SideMenu = () => {
  const router = useRouter()
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext)
  const navigateTo = (url) => {
    toggleSideMenu()
    router.push(url)
  }
  const logout = () => {
    router.push('')
  }

  return (
    <Drawer
      open={isMenuOpen}
      onClose={toggleSideMenu}
      anchor="right"
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          {/*
          <ListItem>
            <Input
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility">
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>
*/}
          <ListItem button onClick={() => navigateTo('/profile/1')}>
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>
            <ListItemText primary={'Perfil'} />
          </ListItem>

          <ListItem button onClick={() => navigateTo('/pets')}>
            <ListItemIcon>
              <PetsOutlined />
            </ListItemIcon>
            <ListItemText primary={'Mascotas'} />
          </ListItem>

          <ListItem button onClick={() => navigateTo('/auth/login')}>
            <ListItemIcon>
              <VpnKeyOutlined />
            </ListItemIcon>
            <ListItemText primary={'Ingresar'} />
          </ListItem>

          {/*Logeado*/}
          <ListItem button onClick={() => navigateTo('/')}>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={'Mis solicitudes'} />
          </ListItem>

          <ListItem button onClick={() => logout()}>
            <ListItemIcon>
              <LoginOutlined />
            </ListItemIcon>
            <ListItemText primary={'Salir'} />
          </ListItem>

          {/* Admin */}
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>

          <ListItem button onClick={() => navigateTo('/')}>
            <ListItemIcon>
              <CategoryOutlined />
            </ListItemIcon>
            <ListItemText primary={'Adopciones'} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={'Solicitudes para ser adoptante'} />
          </ListItem>

          <ListItem button onClick={() => navigateTo('/')}>
            <ListItemIcon>
              <AdminPanelSettings />
            </ListItemIcon>
            <ListItemText primary={'Usuarios'} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}
