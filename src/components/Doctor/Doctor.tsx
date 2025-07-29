import type React from "react"
import styles from "./Doctor.module.css"
import Link from "next/link"

interface DoctorProps {
  backgroundColor?: string
}

const Doctor: React.FC<DoctorProps> = ({ backgroundColor }) => {
  // Створюємо стиль для секції
  const sectionStyle: React.CSSProperties = backgroundColor ? { backgroundColor } : {}

  return (
    <section className={styles.doctor} style={sectionStyle}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Ліва частина - 1/3 */}
          <div className={styles.nameSection}>
            <h1 className={styles.doctorName}>
              Mykola
              <br />
              Pecheriaha
            </h1>
            <Link href="/about" className={styles.doctorButton}>
              Дізнатись більше
            </Link>
          </div>

          {/* Права частина - 2/3 */}
          <div className={styles.textSection}>
            <div className={styles.textContent}>
              <p className={styles.introText}>
                Я пластичний хірург з досвідом 25 років є{" "}
                <strong className={styles.highlight}>Членом Європейської асоціації пластичних хірургів</strong> Навчався
                у найкращих пластичних хірургів світу та виконую всі види пластичних операцій. Уже більше ніж 2600
                пацієнтів з різних країн довірили мені свою красу.
              </p>

              <p className={styles.description}>
                Ми різні, а значить хтось бажає зменшити об`єми, а хтось навпаки збільшити їх — кожна жінка мріє про
                самобутню красу. Прямий маленький носик, гладенька підтягнута шкіра, привабливі пружні дівочі груди,
                струнка талія, відкритий погляд, маленька мочка вуха. Кожний чоловік мріє про мужні риси обличчя та
                підтягнуту статуру.
              </p>

              <p className={styles.description}>
                Від цих деталей залежить самопочуття, гарний настрій, а іноді й щаслива доля! Чоловіки також звертаються
                до нас, хоча потреби в них наших корекцій дещо другі, але досить часто і схожі. Ми з командою втілюємо
                їх бажання та створюємо досконалу красу, зберігаючи індивідуальність.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Doctor
