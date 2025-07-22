'use client';

import styles from './ClinicMap.module.css';

export function ClinicMap() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Як нас знайти</h2>
      <div className={styles.mapWrapper}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2654.4770006494584!2d25.93819731562676!3d48.29177007923771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4734087fe2f6cd03%3A0xd54b56c1f5969b48!2z0LLRg9C70LjRhtGPINCT0LXRgNC-0ZfQsiDQnNCw0LnQtNCw0L3RgywgMjI2LCDQp9C10YDQvdGW0LLRhtGWLCDQp9C10YDQvdGW0LLQtdGG0YzQutCwINC-0LHQu9Cw0YHRgtGMLCA1ODAwMA!5e0!3m2!1suk!2sua!4v1647887817555!5m2!1suk!2sua"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default ClinicMap; 