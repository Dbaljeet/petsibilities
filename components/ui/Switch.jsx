import styles from './Switch.module.css'
export default function Switch({ text, showPassword }) {
  return (
    <div className={styles.space}>
      <p className={styles.space_p}>{text}</p>
      <div className={styles.wrap}>
        <input
          onClick={showPassword}
          className={styles.inputBox}
          type="checkbox"
          id="s2"
        />
        <label className={styles.slider} htmlFor="s2"></label>
      </div>
    </div>
  )
}
