import { useState } from 'react'

import { RecoveryPasswordService } from '../services'

import { Box, Button, TextField } from '@mui/material'
import { BasicModal } from './ui'

export default function RecoveryPassword({ openRecovery, setOpenRecovery }) {
  const [email, setEmail] = useState('')

  const [openErrorRecovery, setOpenErrorRecovery] = useState(false)
  const [openSucessfulRecovery, setOpenSuccessfulRecovery] = useState(false)

  const handleChange = (ev) => {
    setEmail(ev.target.value)
  }

  const handleRecoveryPassword = async () => {
    try {
      const { message } = await RecoveryPasswordService({
        email,
      })
      if (message === 'mail sent') {
        setOpenSuccessfulRecovery(true)
      } else {
        setOpenErrorRecovery(true)
      }
    } catch {
      setOpenErrorRecovery(true)
    }
  }
  return (
    <>
      <BasicModal
        title={'¿Olvidaste tu contraseña?'}
        msg="Cambia tu contraseña indicando tu correo"
        open={openRecovery}
        setOpen={setOpenRecovery}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 3,
            gap: 3,
          }}
        >
          <TextField
            name="recoveryEmail"
            onChange={handleChange}
            label="correo electrónico"
          />
          <Button onClick={handleRecoveryPassword}>Enviar</Button>
        </Box>

        {openErrorRecovery ? (
          <BasicModal
            open={openErrorRecovery}
            setOpen={setOpenErrorRecovery}
            title={'Error'}
            msg={
              'Revise si su correo ha sido registrado en la web, puede ver su buzón'
            }
          />
        ) : (
          ''
        )}
      </BasicModal>
      {openSucessfulRecovery && (
        <BasicModal
          title={'Enviado correctamente'}
          msg={'Le ha sido enviado un correo con los pasos de recuperación'}
          open={openSucessfulRecovery}
          setOpen={setOpenSuccessfulRecovery}
        />
      )}
    </>
  )
}
