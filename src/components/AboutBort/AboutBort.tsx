'use client';

import Image from "next/image";
import styles from "./AboutBort.module.css";

interface AboutBortProps {
  backgroundColor?: string;
  className?: string;
}

export function AboutBort({ backgroundColor = "#e8f5e8", className }: AboutBortProps) {
  return (
    <section className={`${styles.aboutSection} ${className || ""}`} style={{ backgroundColor }}>
      <div className={styles.container}>
        {/* Верхній сектор */}
        <div className={styles.upperSection}>
          <div className={styles.textColumn}>
            <h1 className={styles.mainTitle}>Про лікаря</h1>
            <div className={styles.textContent}>
              <p className={styles.paragraph}>
                Микола Печеряга &mdash; пластичний хірург, який спеціалізується на естетичній та реконструктивній хірургії. Він здобув свою освіту в одному з найпрестижніших медичних університетів України та постійно вдосконалює свої навички, відвідуючи міжнародні конференції та майстер-класи.
              </p>
              <p className={styles.paragraph}>
                З&apos;єднуючи медичну точність із художнім баченням, доктор Печеряга допомагає своїм пацієнтам досягти бажаних результатів, зберігаючи при цьому природність і гармонію рис.
              </p>
              <p className={styles.paragraph}>
                Моїм головним принципом є безпека пацієнтів та мінімальні ризики при максимальному естетичному
                результаті. Сьогодні я з гордістю можу сказати, що мої пацієнти отримують не тільки результат, що
                відповідає їхнім очікуванням, але й високий рівень догляду на кожному етапі лікування.
              </p>
            </div>
          </div>
          <div className={styles.imageColumn}>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/bigbort/about-bord1-removebg-preview.png"
                alt="Пластичний хірург"
                width={400}
                height={500}
                className={styles.doctorImage}
                priority
              />
            </div>
          </div>
        </div>

        {/* Нижній сектор */}
        <div className={styles.lowerSection}>
          <div className={styles.doctorInfo}>
            <div className={styles.doctorName}>
              <h2 className={styles.brandName}>PlastikP</h2>
              <h3 className={styles.firstName}>Mykola</h3>
              <h3 className={styles.lastName}>Pecheriaha</h3>
            </div>
          </div>
          <div className={styles.philosophyText}>
            <p className={styles.philosophyParagraph}>
              Щастя бути красивим – те, що може дозволити собі кожна людина. Моя робота — це не лише про техніку
              виконання операцій, але й про розуміння емоційних та психологічних аспектів, які супроводжують кожну
              трансформацію. Адже для мене пластична хірургія — це не просто зміна зовнішності, а допомога в досягненні
              внутрішнього балансу, підвищення впевненості та самопочуття.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutBort; 