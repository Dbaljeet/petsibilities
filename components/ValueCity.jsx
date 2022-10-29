import { memo } from 'react'
import styles from './ValueCity.module.css'
function Citys(props) {
  const { info } = props
  const array = info.cities
  return (
    <>
      {array.map((city) => {
        return (
          <option className={styles.option} key={city.city} value={city.city}>
            {city.city}
          </option>
        )
      })}
    </>
  )
}
const ValueCity = memo(Citys)
export default ValueCity
