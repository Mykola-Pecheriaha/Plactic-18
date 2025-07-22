'use client';

import { useState } from "react";
import styles from "./Clinic.module.css";
import { ClinicGallery } from "../ClinicGallery/ClinicGallery";

interface ClinicProps {
  className?: string;
}

export function Clinic({ className }: ClinicProps) {
  const [isTextExpanded, setIsTextExpanded] = useState(false);

  const toggleText = () => {
    setIsTextExpanded(!isTextExpanded);
  };

  const highlightDoctorName = (text: string) => {
    return text.replace(/Микола Печеряга/g, '<span class="' + styles.doctorName + '">Микола Печеряга</span>');
  };

  const galleryImages = [
    {
      src: "/images/surgical-department/surgdepartm26.jpg",
      alt: "Відділення хірургії",
      width: 800,
      height: 600,
      title: "Пост медсестри",
    },
    {
      src: "/images/surgical-department/surgdepartm2.jpg",
      alt: "Відділення хірургії",
      width: 800,
      height: 600,
      title: "Перев`язочний кабінет",
    },
    {
      src: "/images/surgical-department/surgdepartm25.jpg",
      alt: "Відділення хірургії",
      width: 800,
      height: 600,
      title: "Палати для пацієнтів",
    },
    {
      src: "/images/surgical-department/surgdepartm16.jpg",
      alt: "Відділення хірургії",
      width: 800,
      height: 600,
      title: "Післяопераційна палата",
    },
  ];

  const fullText = `Відділення, в якому оперує Микола Печеряга, є частиною Центральної міської клінічної лікарні міста Чернівці. Нещодавно тут було проведено капітальний ремонт, що дозволило створити сучасний простір із затишною атмосферою для комфортного відновлення пацієнтів у післяопераційний період. Сучасний дизайн, зручні палати та уважний персонал — усе для вашого спокою та безпеки.

Одним із пріоритетних напрямів нашої клініки є пластична та естетична хірургія. У відділенні працюють досвідчені фахівці з багаторічною практикою, які володіють найсучаснішими медичними технологіями та безпечними методиками оперативного втручання. Наші лікарі постійно вдосконалюють свої знання, беручи участь у міжнародних конференціях, майстер-класах і курсах підвищення кваліфікації у сфері естетичної медицини. Це дозволяє нам успішно виконувати навіть найскладніші операції, враховуючи індивідуальні потреби кожного пацієнта.

Злагоджена робота хірургів та анестезіологів у поєднанні з професійністю та чуйністю середнього медичного персоналу створює особливу атмосферу турботи. Кожен, хто звертається до нас, відчуває себе в безпеці та в руках надійної команди. Високий рівень сервісу, уважне ставлення та щире піклування роблять перебування в нашій клініці комфортним та спокійним.

Уже близько 20 років ми успішно проводимо пластичні та естетичні операції. За цей час було виконано понад півтори тисячі втручань різного рівня складності. Ми цінуємо традиції, проте не стоїмо на місці — постійно впроваджуємо новітні технології та вдосконалюємо свої навички, щоб забезпечити найвищий рівень допомоги.`;

  const displayText = isTextExpanded ? fullText : fullText.substring(0, 500) + "...";
  const highlightedText = highlightDoctorName(displayText);

  return (
    <section className={`${styles.clinicSection} ${className || ""}`}>
      <div className={styles.container}>
        <h1 className={styles.mainTitle}>Клініка де оперує хірург</h1>

        <div className={styles.contentWrapper}>
          <div className={styles.textColumn}>
            <h2 className={styles.departmentTitle}>Відділення хірургії ЦМКЛ м. Чернівці</h2>
            <p className={styles.subtitle}>Де досвід, турбота та сучасність поєднуються для вашого комфорту</p>

            <div className={styles.textContent}>
              <div className={styles.textBlock}>
                <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: highlightedText }} />

                <button className={styles.expandButton} onClick={toggleText}>
                  {isTextExpanded ? "Згорнути" : "Розгорнути"}
                </button>
              </div>

              <div className={styles.highlightBox}>
                <p className={styles.highlightText}>
                  Європейські стандарти лікування, тепла атмосфера і турбота про кожного пацієнта — це наші головні
                  принципи.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.galleryColumn}>
            <ClinicGallery images={galleryImages} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Clinic; 