import type React from "react"
import Link from "next/link"
import styles from "./BigBordFace.module.css"
import BigBordFaceGallery from "./BigBordFaceGallery"

interface BigBordFaceProps {
  backgroundColor?: string
}

const BigBordFace: React.FC<BigBordFaceProps> = ({ backgroundColor }) => {
  // Створюємо стиль для секції
  const sectionStyle: React.CSSProperties = backgroundColor ? { backgroundColor } : {}

  return (
    <section className={styles.bigBordFace} style={sectionStyle}>
      <div className={styles.container}>
        {/* Заголовок */}
        <div className={styles.titleSection}>
          <h2 className={styles.mainTitle}>Відновлення молодості та пропорцій обличчя</h2>
        </div>

        {/* Основний контент */}
        <div className={styles.content}>
          {/* Ліва частина - галерея */}
          <div className={styles.gallerySection}>
            <BigBordFaceGallery />
          </div>

          {/* Права частина - текст */}
          <div className={styles.textSection}>
            <div className={styles.textContent}>
              <h3 className={styles.sectionTitle}>Омоложення обличчя та шиї</h3>

              <div className={styles.subtitle}>
                <span className={styles.sectionSymbol}></span>
                <span className={styles.sectionText}>Бажана краса та свіжість</span>
              </div>

              <ul className={styles.servicesList}>
                <li className={styles.serviceItem}>Корекція асиметрії</li>
                <li className={styles.serviceItem}>Формування чіткого контуру обличчя</li>
                <li className={styles.serviceItem}>Результат зберігається 10-15 років</li>
              </ul>

              <Link href="/services/face" className={styles.serviceButton}>
                Дізнатись більше про пластику обличчя
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BigBordFace
