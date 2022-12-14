import { useState } from 'react'

import { Button, TextField } from '@mui/material'
import { useEffect } from 'react'
import { postPetitionService } from '../../../services'
import { BasicModal } from './BasicModal'
import { Spinner } from '../spinner'

export const ExtraInput = ({ userPetId }) => {
  const [value, setValue] = useState('')
  const [allowChange, setAllowChange] = useState(false)

  const [open2, setOpen2] = useState(false)
  const [title2, setTitle2] = useState('')
  const [msg2, setMsg2] = useState('')

  const [loading, setLoading] = useState(false)

  const handleChange = (ev) => {
    if (value.length < 250 || allowChange) {
      setValue(ev.target.value)
      setAllowChange(false)
    }
  }

  const handleClick = async () => {
    try {
      setLoading(true)
      const res = await postPetitionService({
        comment: value,
        userPetId: userPetId,
      })

      setLoading(false)
      setTitle2('Tu petición ha sido enviada')
      setMsg2('Gracias por enviar su petición')
      setOpen2(true)
    } catch {
      setLoading(false)
      setTitle2('Ha ocurrido un error')
      setMsg2('Prueba a reiniciar la página o volver a iniciar sesión')
      setOpen2(true)
    }
  }

  const handleKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault()
    }
    if (ev.keyCode === 8) {
      setAllowChange(true)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <BasicModal title={title2} msg={msg2} open={open2} setOpen={setOpen2} />
      <TextField
        required
        fullWidth
        multiline
        rows={4}
        onChange={handleChange}
        margin="normal"
        label="comentario - descripción"
        variant="outlined"
        name="description"
        value={value}
        type="description"
        error={value === '' ? true : false}
        helperText={
          value.length <= 10
            ? 'Debe rellenar el campo, mínimo 10 caracteres'
            : 'Debe rellenar el campo, máximo 250 caracteres'
        }
        InputProps={{
          style: {
            fontSize: '1.2rem',
          },
        }}
        InputLabelProps={{
          style: {
            fontSize: '1.2rem',
            color: '#000',
          },
        }}
      />

      <Button
        onClick={handleClick}
        disabled={value.length <= 10}
        sx={{ margin: 'auto', width: '100%' }}
      >
        Enviar
      </Button>
      {loading && <Spinner />}
    </>
  )
}
