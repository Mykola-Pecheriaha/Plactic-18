'use client';

import styles from './ClinicInfo.module.css';

export function ClinicInfo() {
  return (
    <div className={styles.container}>
      <div className={styles.imageBackground}>
        <div className={styles.contentOverlay}>
          <h2 className={styles.title}>Наші контакти</h2>
          
          <div className={styles.addressBlock}>
            <h3>Адреса</h3>
            <p>Україна</p>
            <p>м.Чернівці</p>
            <p>вул.Героїв Майдану 226</p>
            <p className={styles.note}>(вхід зі сторони вул.Рівненська)</p>
          </div>

          <div className={styles.contactBlock}>
            <h3>Зв'язатися з нами</h3>
            <p>
              <span className={styles.strongText}>Email: </span>
              <a href="mailto:Pecheryag@gmail.com">Pecheryag@gmail.com</a>
            </p>
            <p>
              <span className={styles.strongText}>Телефони: </span>
            </p>
            <div className={styles.phones}>
              <a href="tel:+380507575411">+380507575411</a>
              <a href="tel:+380673287322">+380673287322</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClinicInfo; 