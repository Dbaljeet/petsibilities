import { MenuItem } from '@mui/material'

export default function ValueCity(props) {
  const { info, setValueCity } = props
  const array = info.cities
  return (
    <>
      {array.map((city) => {
        return (
          <MenuItem
            onClick={() => setValueCity(city.city)}
            key={city.city}
            value={city.city}
          >
            {city.city}
          </MenuItem>
        )
      })}
    </>
  )
}
