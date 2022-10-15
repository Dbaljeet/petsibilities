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
  HomeOutlined,
  AppRegistrationOutlined,
} from '@mui/icons-material'

import { useContext } from 'react'
import { UiContext, AuthContext } from '../../context'
import { useRouter } from 'next/router'

export const SideMenu = () => {
  const router = useRouter()
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext)
  const { isLoggedIn, logout, user } = useContext(AuthContext)
  const navigateTo = (url) => {
    toggleSideMenu()
    router.push(url)
  }
  const Logout = () => {
    logout()
    //router.reload()
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

          <ListItem button onClick={() => navigateTo('/')}>
            <ListItemIcon>
              <HomeOutlined />
            </ListItemIcon>
            <ListItemText primary={'Inicio'} />
          </ListItem>

          <ListItem button onClick={() => navigateTo('/pets')}>
            <ListItemIcon>
              <PetsOutlined />
            </ListItemIcon>
            <ListItemText primary={'Mascotas'} />
          </ListItem>

          {/*Logeado*/}
          {isLoggedIn ? (
            <>
              <ListItem button onClick={() => navigateTo('/profile/1')}>
                <ListItemIcon>
                  <AccountCircleOutlined />
                </ListItemIcon>
                <ListItemText primary={'Perfil'} />
              </ListItem>

              <ListItem button onClick={() => navigateTo('/')}>
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText primary={'Mis solicitudes'} />
              </ListItem>

              <ListItem button onClick={() => Logout()}>
                <ListItemIcon>
                  <LoginOutlined />
                </ListItemIcon>
                <ListItemText primary={'Salir'} />
              </ListItem>
              <Divider />
              {/* Admin user.role==='admin'*/}
              {user.roleId == 1 ? (
                <>
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
                </>
              ) : (
                <></>
              )}

              {/* fin  Admin user.role==='admin'*/}
            </>
          ) : (
            <>
              <ListItem
                button
                onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
              >
                <ListItemIcon>
                  <VpnKeyOutlined />
                </ListItemIcon>
                <ListItemText primary={'Ingresar'} />
              </ListItem>
              <ListItem
                button
                onClick={() => navigateTo(`/auth/register?p=${router.asPath}`)}
              >
                <ListItemIcon>
                  <AppRegistrationOutlined />
                </ListItemIcon>
                <ListItemText primary={'Crear cuenta'} />
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  )
}
