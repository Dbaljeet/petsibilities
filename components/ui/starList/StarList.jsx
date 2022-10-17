import { Star, StarBorderOutlined, StarHalf } from '@mui/icons-material'
import { useState } from 'react'
const stars = []
export const StarList = ({ cant }) => {
  const [hover, setHover] = useState(false)
  return (
    <>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1
        return (
          <label key={ratingValue}>
            {cant >= ratingValue ? (
              <Star />
            ) : cant <= ratingValue + 0.5 && cant >= ratingValue - 0.5 ? (
              <StarHalf />
            ) : (
              <StarBorderOutlined />
            )}
          </label>
        )
      })}
    </>
  )
}
