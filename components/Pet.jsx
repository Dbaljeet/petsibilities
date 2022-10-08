import styled from '../styles/Pets.module.css'
export default function Pet({ props }) {
  return (
    <>
      <picture className={styled.picture}>
        <div
          className={styled.infoPicture}
          style={{ backgroundImage: `url(${props.picture})` }}
        >
          <h2 className={styled.name}>{props.name}</h2>
          <button onClick={() => console.log('click')} className={styled.link}>
            Ver más
          </button>
          <div className={styled.shadow}></div>
        </div>
        <img className={styled.img} src={props.picture} />
      </picture>
    </>
  )
}
