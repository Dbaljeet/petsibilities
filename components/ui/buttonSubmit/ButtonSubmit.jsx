import styles from './ButtonSubmit.module.css'
export function ButtonSubmit({ text = 'Enviar' }) {
  return <input className={styles.submit} type="submit" value={text} />
}
