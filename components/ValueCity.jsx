import styles from './ValueCity.module.css'
export default function ValueCity(props) {
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
