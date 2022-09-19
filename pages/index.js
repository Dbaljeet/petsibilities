import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio</title>
        <meta name="description" content="Adopta máscotas en todo Chile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.HomeBar}>
          <Image
            className={styles.image}
            src="/Logo.png"
            width={200}
            height={100}
          />
        </div>
        <section className={styles.Content}>
          <div className={styles.GeneralContainer}>
            <h1 className={styles.Title}>Petsibilities Adopta una mascota</h1>
            <div className={styles.buttonContainer}>
              <Link href="/">
                <div className={styles.button1}>Iniciar Sesión</div>
              </Link>

              <Link href="/">
                <div className={styles.button2}>Registrarse</div>
              </Link>
            </div>
          </div>
          <Link href="/pets">
            <div className={styles.ExploreCont}>
              Busca tu próxima mascota
              <div className={styles.Explore}>Ver mascotas en adopción</div>
            </div>
          </Link>
          <div className={styles.ContainerImageDog}></div>
        </section>
        <section className={styles.section2}>
          <h3>Proponemos grandes soluciones</h3>
        </section>
      </main>
    </div>
  )
}
