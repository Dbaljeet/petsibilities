import { Star, StarBorderOutlined, StarHalf } from '@mui/icons-material'
import { useState } from 'react'
const valor = 3
export const Starf = () => {
  const [hover, setHover] = useState(false)
  return (
    <>
      <span onMouseUp={() => setHover(!hover)}>
        {!hover && <StarBorderOutlined />}
        {hover && <Star />}
      </span>

      {/*<StarHalf />*/}
    </>
  )
}
