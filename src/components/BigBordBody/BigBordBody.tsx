import type React from "react"
import Link from "next/link"
import styles from "./BigBordBody.module.css"
import BigBordBodyGallery from "./BigBordBodyGallery"

interface BigBordBodyProps {
  backgroundColor?: string
}

const BigBordBody: React.FC<BigBordBodyProps> = ({ backgroundColor }) => {
  // Створюємо стиль для секції
  const sectionStyle: React.CSSProperties = backgroundColor ? { backgroundColor } : {}

  return (
    <section className={styles.bigBordBody} style={sectionStyle}>
      <div className={styles.container}>
        {/* Заголовок */}
        <div className={styles.titleSection}>
          <h2 className={styles.mainTitle}>Гарне тіло - позитив щоденного настрою</h2>
        </div>

        {/* Основний контент */}
        <div className={styles.content}>
          {/* Ліва частина - текст */}
          <div className={styles.textSection}>
            <div className={styles.textContent}>
              <h3 className={styles.sectionTitle}>Абдомінопластика (пластика живота)</h3>

              <ul className={styles.servicesList}>
                <li className={styles.serviceItem}>Повернення животу плоскої форми</li>
                <li className={styles.serviceItem}>Усунення розтяжок</li>
                <li className={styles.serviceItem}>Надання привабливості формі тіла</li>
                <li className={styles.serviceItem}>Усунення гриж живота</li>
                <li className={styles.serviceItem}>Корекція рубцевих змін тулуба</li>
                <li className={styles.serviceItem}>Видалення різних доброякісних пухлин</li>
              </ul>

              <Link href="/services/body" className={styles.serviceButton}>
                Дізнатись більше про пластику тіла
              </Link>
            </div>
          </div>

          {/* Права частина - галерея */}
          <div className={styles.gallerySection}>
            <BigBordBodyGallery />
          </div>
        </div>
      </div>
    </section>
  )
}

export default BigBordBody
