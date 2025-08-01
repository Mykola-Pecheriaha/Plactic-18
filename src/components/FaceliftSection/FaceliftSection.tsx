"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import styles from "./FaceliftSection.module.css"

interface FaceliftSectionProps {
  backgroundColor?: string
}

const FaceliftSection: React.FC<FaceliftSectionProps> = ({ backgroundColor = "#e8f5e8" }) => {
  const [imageSrc, setImageSrc] = useState("/images/faceliftSection/FaceliftSec1-removebg-preview.png")

  // Перевірка доступності зображення
  useEffect(() => {
    if (typeof window === "undefined") return

    const checkImageExists = async () => {
      try {
        const response = await fetch(imageSrc, { method: "HEAD" })
        if (!response.ok) {
          setImageSrc("/placeholder.svg?height=600&width=500")
        }
      } catch (error) {
        console.error("Помилка завантаження зображення:", error)
        setImageSrc("/placeholder.svg?height=600&width=500")
      }
    }

    checkImageExists()
  }, [imageSrc])

  return (
    <div className={styles.wrapper} style={{ backgroundColor }}>
      <div className={styles.container}>
        {/* Секція з заголовком зліва та фото справа */}
        <div className={styles.contentSection}>
          {/* Текстовий контент зліва з заголовком */}
          <div className={styles.textContent}>
            {/* Заголовок над текстом зліва */}
            <h1 className={styles.title}>
              Фейсліфтинг
              <br />
              <span className={styles.subtitle}>Підтяжка обличчя та шиї</span>
            </h1>

            {/* Список переваг */}
            <ul className={styles.benefitsList}>
              <li className={styles.benefitItem}>
                <span className={styles.emoji}>✨</span>
                Поверніть молодість всього за 1 місяць
              </li>
              <li className={styles.benefitItem}>
                <span className={styles.emoji}>✨</span>
                Чіткий та виразний контур обличчя
              </li>
              <li className={styles.benefitItem}>
                <span className={styles.emoji}>✨</span>
                Тривалий ефект — до 10–15 років
              </li>
            </ul>
          </div>

          {/* Фото справа */}
          <div className={styles.imageContainer}>
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt="Фейсліфтинг - підтяжка обличчя та шиї"
              width={500}
              height={600}
              className={styles.mainImage}
              priority
            />
          </div>
        </div>

        {/* Нижня секція з описом на всю ширину */}
        <div className={styles.bottomSection}>
          <p className={styles.description}>
            Фейсліфтинг (підтяжка обличчя та шиї) — це сучасна можливість позбутися вікових змін та повернути собі
            свіжий, молодий вигляд. Операція не лише омолоджує зовнішність, а й зберігає природність міміки та вашу
            індивідуальність.
          </p>

          <p className={styles.description}>
            Під час хірургічного втручання формується чіткий контур обличчя, шкіра стає пружнішою, зникають зморшки та
            заломи.
          </p>

          <p className={styles.description}>
            Сьогодні фейсліфтинг особливо популярний серед пацієнтів після 50 — завдяки малій травматичності та
            вражаючим результатам омолодження.
          </p>
        </div>
      </div>
    </div>
  )
}

export default FaceliftSection
