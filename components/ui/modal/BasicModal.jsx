import { useState } from 'react'
import NextLink from 'next/link'

import { Box, Button, Link, Modal, TextField, Typography } from '@mui/material'

import { ExtraInput } from './ExtraInput'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export const BasicModal = ({
  title,
  msg,
  open,
  setOpen,
  extra,
  userPetId,
  link,
}) => {
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {msg}
          </Typography>

          {link ? (
            <NextLink href={link}>
              <Link
                sx={{
                  backgroundColor: '#d0f5fc',
                  padding: '20px 40px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                }}
              >
                Ir
              </Link>
            </NextLink>
          ) : (
            ''
          )}

          {extra ? (
            <ExtraInput userPetId={userPetId} handleClose={handleClose} />
          ) : (
            ''
          )}
        </Box>
      </Modal>
    </>
  )
}
