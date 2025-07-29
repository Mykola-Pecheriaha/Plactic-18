import type React from "react"
import Link from "next/link"
import styles from "./SideBySideGallery.module.css"
import GalleryViewer from "./GalleryViewer"
import type { BeforeAfterImage } from "@/types/gallery"

interface SideBySideGalleryProps {
  backgroundColor?: string
  images?: BeforeAfterImage[]
}

// Тестові дані для галереї
const defaultImages: BeforeAfterImage[] = [
  {
    id: "1",
    before: {
      src: "/images/gallerybreast/implant20.jpg",
      alt: "До операції - пацієнт 1",
    },
    after: {
      src: "/images/gallerybreast/implant22.jpg",
      alt: "Після операції - пацієнт 1",
    },
  },
  {
    id: "2",
    before: {
      src: "/images/gallerybreast/implant14.jpg",
      alt: "До операції - пацієнт 2",
    },
    after: {
      src: "/images/gallerybreast/implant15.jpg",
      alt: "Після операції - пацієнт 2",
    },
  },
  {
    id: "3",
    before: {
      src: "/images/gallerybreast/implant26.jpg",
      alt: "До операції - пацієнт 3",
    },
    after: {
      src: "/images/gallerybreast/implant27.jpg",
      alt: "Після операції - пацієнт 3",
    },
  },
]

const SideBySideGallery: React.FC<SideBySideGalleryProps> = ({ backgroundColor, images = defaultImages }) => {
  // Створюємо стиль для секції
  const sectionStyle: React.CSSProperties = backgroundColor ? { backgroundColor } : {}

  return (
    <section className={styles.gallery} style={sectionStyle}>
      <div className={styles.container}>
        {/* Заголовок */}
        <div className={styles.titleSection}>
          <h2 className={styles.mainTitle}>Створюю красу з турботою про Вас</h2>
        </div>

        {/* Основний контент */}
        <div className={styles.content}>
          {/* Ліва частина - текст */}
          <div className={styles.textSection}>
            <div className={styles.textContent}>
              <h3 className={styles.sectionTitle}>Пластика грудей</h3>

              <ul className={styles.servicesList}>
                <li className={styles.serviceItem}>Різні методики по збільшуванні молочних залоз</li>
                <li className={styles.serviceItem}>Корекція асиметрії</li>
                <li className={styles.serviceItem}>Підтяжка грудей з імплантами або без них (тільки власні тканини)</li>
                <li className={styles.serviceItem}>Індивідуальний підбір імплантів для бажаного об`єму</li>
                <li className={styles.serviceItem}>
                  Сучасні імплантати від світових виробників, що не потребують заміни
                </li>
                <li className={styles.serviceItem}>Комплект білизни для реабілітації у подарунок</li>
              </ul>

              <Link href="/services/breast" className={styles.serviceButton}>
                Дізнатися більше про пластику грудей
              </Link>
            </div>
          </div>

          {/* Права частина - галерея */}
          <div className={styles.gallerySection}>
            <GalleryViewer images={images} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SideBySideGallery
