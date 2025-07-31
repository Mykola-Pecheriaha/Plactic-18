import type React from "react"
import Link from "next/link"
import styles from "./BigClinic.module.css"
import BigClinicGallery from "./BigClinicGallery"

interface BigClinicProps {
  backgroundColor?: string
}

const BigClinic: React.FC<BigClinicProps> = ({ backgroundColor }) => {
  // Створюємо стиль для секції
  const sectionStyle: React.CSSProperties = backgroundColor ? { backgroundColor } : {}

  return (
    <section className={styles.bigClinic} style={sectionStyle}>
      <div className={styles.container}>
        {/* Заголовок */}
        <div className={styles.titleSection}>
          <h2 className={styles.mainTitle}>Клініка в якій ми оперуємо</h2>
        </div>

        {/* Основний контент */}
        <div className={styles.content}>
          {/* Ліва частина - галерея */}
          <div className={styles.gallerySection}>
            <BigClinicGallery />
          </div>

          {/* Права частина - текст */}
          <div className={styles.textSection}>
            <div className={styles.textContent}>
              <h3 className={styles.sectionTitle}>Обирайте нас - тому що ...</h3>

              <ul className={styles.servicesList}>
                <li className={styles.serviceItem}>ми професійні</li>
                <li className={styles.serviceItem}>ми турботливі</li>
                <li className={styles.serviceItem}>у нас сучасне обладнання</li>
                <li className={styles.serviceItem}>у нас комфортні палати</li>
                <li className={styles.serviceItem}>у нас сучасне і лагідне наркозне забезпечення</li>
              </ul>

              <Link href="/about" className={styles.serviceButton}>
                Дізнатись більше про клініку
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BigClinic
