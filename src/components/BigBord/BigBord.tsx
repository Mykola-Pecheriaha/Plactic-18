"use client"

import type React from "react"
import Image from "next/image"
import styles from "./BigBord.module.css"

interface BigBordProps {
  onConsultationClick: () => void;
}

const BigBord: React.FC<BigBordProps> = ({ onConsultationClick }) => {
  return (
    <section className={styles.wrapper}>
      {/* <div className={styles.bigBord}> */}
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.textContent}>
              <div className={styles.textWrapper}>
                <h1 className={styles.doctorName}>Печеряга Микола Миколайович</h1>
                <h2 className={styles.doctorTitle}>Лікар пластичної, естетичної та загальної хірургії</h2>

                <div className={styles.aboutSection}>
                  <h3 className={styles.sectionTitle}>Про лікаря</h3>
                  <p className={styles.description}>
                    Печеряга Микола Миколайович — висококваліфікований лікар із багаторічним досвідом у сфері
                    пластичної, естетичної та загальної хірургії. Його підхід до кожного пацієнта базується на турботі,
                    точності та використанні найсучасніших методик.
                  </p>
                </div>

                <div className={styles.advantagesSection}>
                  <h3 className={styles.sectionTitle}>Переваги</h3>
                  <div className={styles.advantagesList}>
                    <div className={styles.advantage}>
                      <span className={styles.advantageIcon}>🔹</span>
                      <h4 className={styles.advantageTitle}>Професійність</h4>
                    </div>

                    <div className={styles.advantage}>
                      <span className={styles.advantageIcon}>🔹</span>
                      <h4 className={styles.advantageTitle}>Турбота про пацієнта</h4>
                    </div>

                    <div className={styles.advantage}>
                      <span className={styles.advantageIcon}>🔹</span>
                      <h4 className={styles.advantageTitle}>Багаторічний досвід</h4>
                    </div>

                    <div className={styles.advantage}>
                      <span className={styles.advantageIcon}>🔹</span>
                      <h4 className={styles.advantageTitle}>Сучасні методики</h4>
                    </div>

                    <div className={styles.advantage}>
                      <span className={styles.advantageIcon}>🔹</span>
                      <h4 className={styles.advantageTitle}>Безпечне знеболення</h4>
                    </div>

                    <div className={styles.advantage}>
                      <span className={styles.advantageIcon}>🔹</span>
                      <h4 className={styles.advantageTitle}>Комфортні умови</h4>
                    </div>
                  </div>
                </div>

                <button className={styles.consultationButton} onClick={onConsultationClick}>
                  Записатися на консультацію
                </button>
              </div>
            </div>

            <div className={styles.imageContent}>
              <div className={styles.imageWrapper}>
                <Image
                  src="/images/bigbort/bigbort-removebg-preview.png"
                  alt="Печеряга Микола Миколайович - пластичний хірург"
                  width={500}
                  height={600}
                  className={styles.doctorImage}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    
  )
}

export default BigBord 