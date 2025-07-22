'use client';

import type React from "react";
import { useState } from "react";
import styles from "./ConsultationCTA.module.css";
import ContactForm from "../ContactForm/ContactForm";
import { Phone, Calendar, Clock, CheckCircle } from "lucide-react";

interface ConsultationCTAProps {
  backgroundColor?: string;
}

const ConsultationCTA: React.FC<ConsultationCTAProps> = ({ backgroundColor }) => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const openContactForm = () => setIsContactFormOpen(true);
  const closeContactForm = () => setIsContactFormOpen(false);

  const sectionStyle: React.CSSProperties = backgroundColor ? { backgroundColor } : {};

  return (
    <>
      <section className={styles.consultationCTA} style={sectionStyle}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.mainContent}>
              <div className={styles.textSection}>
                <h2 className={styles.title}>Готові до змін?</h2>
                <p className={styles.subtitle}>
                  Запишіться на безкоштовну консультацію та дізнайтеся, як ми можемо допомогти вам досягти бажаного
                  результату
                </p>

                <div className={styles.features}>
                  <div className={styles.feature}>
                    <CheckCircle className={styles.featureIcon} size={20} />
                    <span className={styles.featureText}>Безкоштовна консультація</span>
                  </div>
                  <div className={styles.feature}>
                    <CheckCircle className={styles.featureIcon} size={20} />
                    <span className={styles.featureText}>Індивідуальний план лікування</span>
                  </div>
                  <div className={styles.feature}>
                    <CheckCircle className={styles.featureIcon} size={20} />
                    <span className={styles.featureText}>Професійна консультація</span>
                  </div>
                </div>
              </div>

              <div className={styles.actionSection}>
                <button className={styles.ctaButton} onClick={openContactForm}>
                  <Calendar className={styles.buttonIcon} size={20} />
                  Записатися на консультацію
                </button>

                <div className={styles.contactInfo}>
                  <div className={styles.contactItem}>
                    <Phone className={styles.contactIcon} size={16} />
                    <span className={styles.contactText}>+380 (50) 757-54-11</span>
                  </div>
                  <div className={styles.contactItem}>
                    <Clock className={styles.contactIcon} size={16} />
                    <span className={styles.contactText}>Пн-Пт: 9:00-16:00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.decorativeElements}>
              <div className={styles.circle1}></div>
              <div className={styles.circle2}></div>
              <div className={styles.circle3}></div>
            </div>
          </div>
        </div>
      </section>

      <ContactForm isOpen={isContactFormOpen} onClose={closeContactForm} />
    </>
  );
};

export default ConsultationCTA; 