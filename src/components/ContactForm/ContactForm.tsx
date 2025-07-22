'use client';

import type React from "react";
import { useState } from "react";
import styles from "./ContactForm.module.css";
import { X, Check } from "lucide-react";
import { consultationManager } from "@/lib/client/consultationManager";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Додаємо консультацію напряму через менеджер
      const consultation = consultationManager.addConsultation({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        message: `Послуга: ${formData.service}\n\nПовідомлення: ${formData.message || "Не вказано"}`,
      });

      if (consultation) {
        setIsSubmitted(true);
        console.log("✅ Консультацію успішно додано:", consultation);
      } else {
        throw new Error("Не вдалося створити консультацію");
      }
    } catch (error) {
      console.error("❌ Помилка при відправці:", error);
      alert("Виникла помилка при відправці. Спробуйте ще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      phone: "",
      email: "",
      service: "",
      message: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  if (isSubmitted) {
    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={handleClose}>
            <X size={24} />
          </button>
          <div className={styles.success}>
            <div className={styles.successIcon}>
              <Check size={48} />
            </div>
            <h3 className={styles.successTitle}>Дякуємо за заявку!</h3>
            <p className={styles.successText}>Ми зв`яжемося з вами найближчим часом для підтвердження консультації.</p>
            <button className={styles.successButton} onClick={handleClose}>
              Закрити
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={handleClose}>
          <X size={24} />
        </button>
        <h2 className={styles.title}>Записатися на консультацію</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Ім`я
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              placeholder="Введіть ваше ім'я"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              Телефон
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.input}
              placeholder="+380 XX XXX XX XX"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="your@email.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="service" className={styles.label}>
              Послуга
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="" disabled>
                Оберіть послугу
              </option>
              <option value="consultation">Консультація</option>
              <option value="rhinoplasty">Ринопластика</option>
              <option value="blepharoplasty">Блефаропластика</option>
              <option value="liposuction">Ліпосакція</option>
              <option value="breast">Збільшення грудей</option>
              <option value="facelift">Підтяжка обличчя</option>
              <option value="abdominoplasty">Абдомінопластика</option>
              <option value="other">Інше</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>
              Повідомлення
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="Додаткова інформація або запитання"
              rows={4}
            />
          </div>

          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? "Відправка..." : "Записатися на консультацію"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm; 