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
            alt="Pestisibilities logo"
            className={styles.image}
            src="/Logo.png"
            width={200}
            height={100}
            layout="fixed"
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
          <h2>Disponible en todo Chile</h2>
          <h2>Proponemos grandes soluciones</h2>
          <p className={styles.p}>
            Tanto para los que adoptan como para quienes ponen en adopción
            otorgamos y disponemos de :
          </p>
          <div className={styles.section2_ul}>
            <li className={styles.section2_ul_li}>
              <Image
                alt="punto 1, visibilidad para cada mascota"
                className={styles.li_image}
                src="/pexels-alex-andrews1.jpg"
                width={4700}
                height={7042}
                layout="intrinsic"
              />
              <label className={styles.li_label}>
                <p className={styles.li_label1}>1</p>
                <p className={styles.li_label2}>
                  Visibilidad para cada mascota
                </p>
              </label>
            </li>
            <li className={styles.section2_ul_li}>
              <Image
                alt="punto 2, Valoración entre perfiles"
                className={styles.li_image}
                src="/pexels-dominika-roseclay.jpg"
                width={4700}
                height={7042}
                layout="intrinsic"
              />
              <label className={styles.li_label}>
                <p className={styles.li_label1}>2</p>
                <p className={styles.li_label2}>Valoración entre perfiles</p>
              </label>
            </li>
            <li className={styles.section2_ul_li}>
              <Image
                alt="punto 3, Condiciones de adopción"
                className={styles.li_image}
                src="/pexels-nataliya-vaitkevich.jpg"
                width={4700}
                height={7042}
                layout="intrinsic"
              />
              <label className={styles.li_label}>
                <p className={styles.li_label1}>3</p>
                <p className={styles.li_label2}>Condiciones de adopción</p>
              </label>
            </li>
            <div>entre otras</div>
          </div>

          <p className={styles.p}>Entregamos un espacio seguro para todos</p>
          <Link href="">Más información sobre cómo funciona Petsibilities</Link>
        </section>
      </main>
    </div>
  )
}
