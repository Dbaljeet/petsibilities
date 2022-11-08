import {
  Box,
  Divider,
  Drawer,
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
  PostAddOutlined,
} from '@mui/icons-material'

import { useContext, useEffect, useState } from 'react'
import { UiContext, AuthContext } from '../../context'
import { useRouter } from 'next/router'

export const SideMenu = () => {
  const router = useRouter()
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext)
  const { isLoggedIn, logout, user = '' } = useContext(AuthContext)
  const [roleId, setRoleId] = useState('')

  useEffect(() => {
    try {
      setRoleId(user.role.id)
    } catch {
      setRoleId('')
    }
  }, [user])

  const navigateTo = (url) => {
    toggleSideMenu()
    router.push(url)
  }
  const Logout = async () => {
    const res = await logout()
    if (res) {
      router.reload()
    }
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
              {roleId === 1 ? (
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
              ) : roleId === 3 ? (
                <>
                  <ListItem button onClick={() => navigateTo('/')}>
                    <ListItemIcon>
                      <ConfirmationNumberOutlined />
                    </ListItemIcon>
                    <ListItemText primary={'Solicitudes recibidas'} />
                  </ListItem>

                  <ListItem button onClick={() => navigateTo('/postPet')}>
                    <ListItemIcon>
                      <PostAddOutlined />
                    </ListItemIcon>
                    <ListItemText primary={'Publicar mascota'} />
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
