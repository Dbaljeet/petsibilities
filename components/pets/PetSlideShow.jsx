import { Slide } from 'react-slideshow-image'
import styles from './PetSlideShow.module.css'
import 'react-slideshow-image/dist/styles.css'
export const PetSlideShow = ({ images }) => {
  const buttonStyle = {
    width: '40px',
    padding: '5px',
    margin: '10px',
    background: 'none',
    borderRadius: '50%',
    borderColor: 'transparent',

    backgroundColor: '#ffffffb7',
  }

  const properties = {
    prevArrow: (
      <button style={{ ...buttonStyle }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#000"
        >
          <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
        </svg>
      </button>
    ),
    nextArrow: (
      <button style={{ ...buttonStyle }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#000"
        >
          <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
        </svg>
      </button>
    ),
  }

  return (
    <>
      <Slide {...properties} easing="ease" duration={7000} indicators>
        {images.map((image) => {
          //const url = `/pet/${image}`
          const url = image
          return (
            <div className={styles['each-slide-effect']} key={image}>
              <div
                style={{
                  backgroundImage: `url(${url})`,
                  backgroundSize: 'cover',
                }}
              ></div>
            </div>
          )
        })}
      </Slide>
    </>
  )
}
