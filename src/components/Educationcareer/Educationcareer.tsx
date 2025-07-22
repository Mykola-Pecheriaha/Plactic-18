'use client';

import { useState } from "react";
import styles from "./Educationcareer.module.css";
import { EducationcareerGallery } from "./EducationcareerGallery";

interface EducationcareerProps {
  backgroundImage?: string;
}

export function Educationcareer({ backgroundImage }: EducationcareerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const sectionStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
      }
    : {};

  const galleryImages = [
    {
      src: "/images/sertificats/Diplom.jpg",
      alt: "Освіта лікаря",
      width: 800,
      height: 600,
      title: "Диплом з відзнакою",
    },
    {
      src: "/images/sertificats/Sertificat13.jpg",
      alt: "Кар'єра лікаря",
      width: 800,
      height: 600,
      title: "Професійна діяльність",
    },
    {
      src: "/images/sertificats/Sertificat14.jpg",
      alt: "Медичні курси",
      width: 800,
      height: 600,
      title: "Підвищення кваліфікації",
    },
    {
      src: "/images/sertificats/SertifPlastici.jpg",
      alt: "Хірургічна практика",
      width: 800,
      height: 600,
      title: "Хірургічна практика",
    },
    {
      src: "/images/sertificats/Oncologiya.jpg",
      alt: "Хірургічна практика",
      width: 800,
      height: 600,
      title: "Хірургічна практика",
    },
    {
      src: "/images/sertificats/Categori.jpg",
      alt: "Хірургічна практика",
      width: 800,
      height: 600,
      title: "Хірургічна практика",
    },
  ];

  return (
    <section className={styles.educationcareer} style={sectionStyle}>
      <div className={styles.container}>
        <h1 className={styles.mainTitle}>Освіта та кар`єра</h1>

        <div className={styles.contentWrapper}>
          <div className={styles.textColumn}>
            <h2 className={styles.doctorName}>Печеряга Микола Миколайович</h2>

            <p className={styles.doctorTitle}>
              Пластичний хірург Вищої кваліфікаційної категорії, міжнародний член American Society of Plastic Surgeons,
              міжнародний член International Society of Aesthetic Plastic Surgery, член Всеукраїнської асоціації
              пластичних, реконструктивних та естетичних хірургів.
            </p>

            <div className={styles.textContent}>
              {isExpanded ? (
                <>
                  <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Моя сім`я</h3>
                    <p className={styles.paragraph}>
                      18 лютого 1968 року. Батько двох дітей. Стакрший син - хірург, молодший вчиться в ліцеї.
                    </p>
                  </div>

                  <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Вища освіта</h3>
                    <p className={styles.paragraph}>
                      1989-1995 рр. – Одеський державний медичний університет, спеціальність «Лікувальна справа».
                      Закінчив з відзнакою.
                    </p>
                    <p className={styles.paragraph}>
                      1995-1997 рр. - первинна спеціалізація по хірургії, Буковинська державна медична академія.
                    </p>
                    <p className={styles.paragraph}>
                      1997-1999р. – Клінічна ординатура по хірургії, Буковинська державна медична академія.
                    </p>
                  </div>

                  <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Кар`єра та практика</h3>
                    <ul className={styles.careerList}>
                      <li>Лікар - хірург Торакального відділення ОКЛ</li>
                      <li>Лікар-хірург хірургічного відділення. Чернівецький військовий Базовий госпіталь</li>
                      <li>
                        Лікар хірург хірургічного відділення. Лікар Онколог. Вузлової клінічної лікарні ст.Чернівці
                      </li>
                      <li>Завідувач відділенням хірургії. Районний хірург. Снятинська ЦРЛ Івано-Франківська обл.</li>
                      <li>Завідувач міським центром хірургії. Міська лікарня №1 м.Чернівці</li>
                      <li>Завідувач відділенням хірургії. ЦМКЛ м. Чернівці</li>
                    </ul>
                  </div>

                  <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Професійні курси та майстер-класи</h3>
                    <ul className={styles.coursesList}>
                      <li>
                        1995р.-1997р. – первинна спеціалізація по хірургії, Буковинська державна медична академія.
                      </li>
                      <li>1997-1999р. – Клінічна ординатура по хірургії, Буковинська державна медична академія.</li>
                      <li>2001р – інтенсивний курс по пластичні і реконструктивні хірургії. Росія. Ярославль</li>
                      <li>
                        2001р. - Інтенсивний курс по пластичні, естетичні та реконструктивні хірургії. Росія. Москва.
                      </li>
                      <li>2001р. - тематичний курс удосконалення по ендоскопічні хірургії</li>
                      <li>
                        2002р. – тематичне удосконалення по пластичні, естетичні, та реконструктивні хірургії, Росія
                        Ярославль.
                      </li>
                      <li>2003р. - Лапараскопічна хірургія. Тематичне удосконалення. Одеса</li>
                      <li>2004р. - Тематичне удосконалення по пластичні хірургії Росія, Іваново</li>
                      <li>
                        2004р. - Міжнародний інтенсивний курс по пластичні і реконструктивні хірургії. Росія
                        Єкатеринбург
                      </li>
                      <li>
                        2006р. - Міжнародний дев`ятий інтенсивний курс по пластичній та реконструктивній хірургії. Росія
                        Москва.
                      </li>
                      <li>
                        2008р. - спеціалізації по онкології при Національній медичні академії після діпломної освіти ім.
                        П.Л. Шупика. (Київ)
                      </li>
                      <li>
                        2008р. - Передатестаційний цикл за фахом «Хірургія» при Буковинському державному медичному
                        університеті м.Чернівці.
                      </li>
                      <li>
                        2010р. - Цикл тематичного удосконалення «Актуальні питання малоінвазивної хірургії». Чернівці
                      </li>
                      <li>2011р. - Цикл тематичного удосконалення « Пластична та реконструктивна хірургія». Київ.</li>
                      <li>2013р. - Цикл тематичного удосконалення « Непухлинні захворювання прямої кишки» Чернівці.</li>
                      <li>
                        2017р. - Навчання на циклі тематичного удосконалення «Актуальні питання гемотрансфузійної
                        терапії в практиці хірурга» - – ВДНЗУ БДМУ
                      </li>
                      <li>
                        2017р. - Навчання на циклі тематичного удосконалення «Актуальні питання опікової та холодової
                        травми » – ВДНЗУ БДМУ, 2017р.
                      </li>
                      <li>
                        2018р. - Навчання на циклі тематичного удосконалення «Невідкладна та малоінвазивна проктологія»
                        - 2 тижні – ВДНЗУ БДМУ, 2018р.
                      </li>
                      <li>2019р. - Передатестаційний цикл за фахом «Хірургія», ВДНЗУ БДМУ, 2019р</li>
                      <li>
                        2020р. - Навчання на циклі тематичного удосконалення «Нове в методиці лікування септичних
                        станів» - 2 тижні – ВДНЗУ БДМУ, 2020
                      </li>
                      <li>2024р. - спеціалізації по Гінекології при ВДНЗУ БДМУ, 2024р</li>
                      <li>
                        2024р. - науково практична конференція Актуальні питання ендокринології та ендокринної хірургії.
                        УНПЦЕХ м.Київ.
                      </li>
                    </ul>
                  </div>

                  <button className={styles.toggleButton} onClick={toggleExpand}>
                    Показати менше
                  </button>
                </>
              ) : (
                <>
                  <p className={styles.truncatedText}>
                    Пластичний хірург Вищої кваліфікаційної категорії, міжнародний член American Society of Plastic
                    Surgeons, міжнародний член International Society of Aesthetic Plastic Surgery, член Всеукраїнської
                    асоціації пластичних, реконструктивних та естетичних хірургів. 18 лютого 1968 року. Батько двох
                    дітей...
                  </p>
                  <button className={styles.toggleButton} onClick={toggleExpand}>
                    Показати все
                  </button>
                </>
              )}
            </div>
          </div>

          <div className={styles.galleryColumn}>
            <EducationcareerGallery images={galleryImages} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Educationcareer; 