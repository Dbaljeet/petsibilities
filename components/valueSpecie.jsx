import { memo } from 'react'
import styles from './ValueSpecie.module.css'
function Species(props) {
  const { info } = props
  return (
    <>
      <option className={styles.option} key={info.name} value={info.id}>
        {info.name}
      </option>
    </>
  )
}
const ValueSpecie = memo(Species)
export default ValueSpecie
