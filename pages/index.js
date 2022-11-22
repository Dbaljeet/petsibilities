import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { GeneralLayout } from '../components/layouts'
export default function Home() {
  return (
    <div className={styles.container}>
      <GeneralLayout
        title={'Inicio | Petsibilities'}
        pageDescription={
          'Adopta máscotas en todo Chile a través de Petsibilities'
        }
      >
        <main className={styles.main}>
          <section className={styles.Content}>
            <div className={styles.GeneralContainer}>
              <h1 className={styles.Title}>Petsibilities</h1>
              <h2 className={styles.SubTitle}>Adopta una mascota</h2>
              <div className={styles.buttonContainer}>
                <Link href="/auth/login">
                  <a className={styles.linkA}>
                    <div className={styles.button1} data-testid="login">
                      Iniciar Sesión
                    </div>
                  </a>
                </Link>
                <Link href="/auth/register">
                  <a className={styles.linkA}>
                    <div className={styles.button2}>Registrarse</div>
                  </a>
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
            <section className={styles.section2}>
              <h2>Disponible en todo Chile</h2>
              <h2>Proponemos grandes soluciones</h2>
              <p className={styles.p}>
                Tanto para los que adoptan como para quienes ponen en adopción
                otorgamos y disponemos de :
              </p>
              <ul className={styles.section2_ul}>
                <li className={styles.section2_ul_li}>
                  <Image
                    alt="punto 1, visibilidad para cada mascota"
                    className={styles.li_image}
                    src="/pexels-alex-andrews1.jpg"
                    width={300}
                    height={450}
                    layout="fixed"
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
                    width={300}
                    height={450}
                    layout="fixed"
                  />
                  <label className={styles.li_label}>
                    <p className={styles.li_label1}>2</p>
                    <p className={styles.li_label2}>
                      Valoración entre perfiles
                    </p>
                  </label>
                </li>
                <li className={styles.section2_ul_li}>
                  <Image
                    alt="punto 3, Condiciones de adopción"
                    className={styles.li_image}
                    src="/pexels-nataliya-vaitkevich.jpg"
                    width={300}
                    height={450}
                    layout="fixed"
                  />
                  <label className={styles.li_label}>
                    <p className={styles.li_label1}>3</p>
                    <p className={styles.li_label2}>Condiciones de adopción</p>
                  </label>
                </li>
              </ul>
              <div>entre otras que puedes probar</div>
              <p className={styles.pp}>
                Entregamos un espacio seguro para todos
              </p>
              <Link href="/about">
                <a>Más información sobre cómo funciona Petsibilities</a>
              </Link>
            </section>
          </section>
        </main>
      </GeneralLayout>
    </div>
  )
}
