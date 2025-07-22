'use client';

import { FC, useState, useEffect } from 'react';
import styles from './ConsultationForm.module.css';
import { consultationManager } from '@/lib/consultations';
import { Consultation } from '@/lib/consultations';
import { hotkeyManager } from '@/lib/hotkeys';

interface ConsultationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConsultationForm: FC<ConsultationFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Реєструємо гарючу клавішу для Escape з середнім пріоритетом
    hotkeyManager.register({
      key: 'Escape',
      priority: 0, // Середній пріоритет для закриття форми
      callback: () => {
        if (isOpen) {
          onClose();
        }
      }
    });

    return () => {
      hotkeyManager.unregister('Escape');
    };
  }, [onClose, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      console.log('Відправляємо дані форми:', formData);
      
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Отримано відповідь від сервера:', response.status);
      const data = await response.json();
      console.log('Дані відповіді:', data);

      if (response.ok) {
        // Додаємо консультацію напряму через менеджер
        if (data.consultation) {
          console.log('Додаємо консультацію через менеджер:', data.consultation);
          const addedConsultation = consultationManager.addConsultation(data.consultation);
          console.log('Консультацію додано:', addedConsultation);
          
          // Перевіряємо, чи консультація збереглася
          const allConsultations = consultationManager.getConsultations();
          console.log('Всі консультації після додавання:', allConsultations.map((c: Consultation) => ({
            id: c.id,
            name: c.name,
            status: c.status
          })));
        }
        
        alert('Дякуємо! Ми зв&apos;яжемося з вами найближчим часом.');
        onClose();
      } else {
        throw new Error(data.error || 'Помилка при відправці форми');
      }
    } catch (error) {
      console.error('Помилка при відправці форми:', error);
      setError('Виникла помилка. Будь ласка, спробуйте пізніше.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className={styles.formOverlay} onClick={onClose}>
      <div className={styles.formContainer} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Закрити форму">
          ✕
        </button>
        <h2>Записатися на консультацію</h2>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Ім&apos;я *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Введіть ваше ім&apos;я"
              disabled={isSubmitting}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Телефон *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+380 XX XXX XX XX"
              disabled={isSubmitting}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              disabled={isSubmitting}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Повідомлення</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Опишіть ваше питання"
              rows={4}
              disabled={isSubmitting}
            />
          </div>
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Відправляємо...' : 'Відправити'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConsultationForm; 