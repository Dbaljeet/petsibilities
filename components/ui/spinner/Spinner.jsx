import styles from './Spinner.module.css'
export const Spinner = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.catMask}>
        <div className={styles.cat}>
          <div className={styles.bodyUp}></div>
          <div className={styles.bodyDown}></div>
          <div className={styles.bodyInside}></div>
          <div className={styles.bodyMask}></div>
          <div className={styles.bodyInsideWrapper}>
            <div className={styles.bodyInsideFix}></div>
          </div>
          <div className={styles.bodyInsideWrapperEnd}>
            <div className={styles.bodyInsideFixEnd}></div>
          </div>
          <div className={styles.innerMask}></div>
          <div className={styles.shapeMask}></div>
          <div className={styles.shapeMaskSecond}></div>
          <div className={styles.catAssWrapper}>
            <div className={styles.catTail}></div>
            <div className={styles.catAss}></div>
            <div className={styles.catLeg}></div>
            <div className={styles.catLegRight}></div>
          </div>
          <div className={styles.catHeadWrapper}>
            <div className={styles.catHead}>
              <div className={styles.catEye}></div>
              <div className={styles.catEyeRight}></div>
              <div className={styles.catMouthWrapper}>
                <div className={styles.catMouth}></div>
                <div className={styles.catMouthUp}></div>
                <div className={styles.catMouthUpRight}></div>
                <div className={styles.catBeardUp}></div>
                <div className={styles.catBeard}></div>
                <div className={styles.catBeardDown}></div>
                <div className={styles.catBeardRightUp}></div>
                <div className={styles.catBeardRight}></div>
                <div className={styles.catBeardRightDown}></div>
              </div>
            </div>
            <div className={styles.catEar}></div>
            <div className={styles.catEarRight}></div>
            <div className={styles.catHand}></div>
            <div className={styles.catHandRight}></div>
          </div>
        </div>
      </div>
      {/* Created by "http://blog.frost.tw" Aotokitsuruya @ Web Developer & Game Developer 
        Original design{' @ Dribbble '} https://dribbble.com/shots/3197970-Loading-cat
    */}
    </div>
  )
}
