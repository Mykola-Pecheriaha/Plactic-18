'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Consultation, consultationManager } from '@/lib/client/consultationManager';
import styles from './Admin.module.css';

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmationDialog({ isOpen, title, message, onConfirm, onCancel }: ConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.confirmationOverlay}>
      <div className={styles.confirmationDialog}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className={styles.confirmationButtons}>
          <button className={styles.cancelButton} onClick={onCancel}>
            Скасувати
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Видалити
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const lastScrollPosition = useRef(0);
  const consultationsRef = useRef<Consultation[]>([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // Функція для отримання консультацій
  const fetchConsultations = useCallback(async () => {
    try {
      setError('');
      
      // Спочатку отримуємо дані з API
      const apiResponse = await fetch('/api/admin/consultations');
      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        throw new Error(errorData.error || 'Помилка при завантаженні консультацій з сервера');
      }
      const apiData = await apiResponse.json();
      
      // Потім отримуємо дані з менеджера
      const localData = consultationManager.getConsultations();
      
      // Об'єднуємо дані, надаючи перевагу серверним даним
      const mergedData = [...localData];
      apiData.forEach((serverConsultation: Consultation) => {
        const index = mergedData.findIndex(c => c.id === serverConsultation.id);
        if (index !== -1) {
          mergedData[index] = serverConsultation;
        } else {
          mergedData.push(serverConsultation);
        }
      });

      // Перевіряємо, чи дані дійсно змінилися
      const hasChanges = JSON.stringify(mergedData) !== JSON.stringify(consultationsRef.current);
      
      if (hasChanges) {
        consultationsRef.current = mergedData;
        setConsultations(mergedData);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Помилка при отриманні консультацій:', err);
      setError(err instanceof Error ? err.message : 'Невідома помилка');
      setLoading(false);
    }
  }, []);

  // Зберігаємо позицію скролу перед оновленням
  const saveScrollPosition = useCallback(() => {
    const container = document.querySelector(`.${styles.consultationsList}`);
    if (container) {
      lastScrollPosition.current = container.scrollTop;
    }
  }, []);

  // Відновлюємо позицію скролу після оновлення
  const restoreScrollPosition = useCallback(() => {
    const container = document.querySelector(`.${styles.consultationsList}`);
    if (container) {
      container.scrollTop = lastScrollPosition.current;
    }
  }, []);

  // Підписка на зміни та синхронізація між вкладками
  useEffect(() => {
    let isSubscribed = true;
    
    const handleUpdate = () => {
      if (isSubscribed) {
        saveScrollPosition();
        fetchConsultations().then(() => {
          if (isSubscribed) {
            restoreScrollPosition();
          }
        });
      }
    };

    // Початкове завантаження
    handleUpdate();
    
    // Підписуємося на зміни в поточній вкладці
    const unsubscribe = consultationManager.subscribe(handleUpdate);
    
    // Підписуємося на зміни з інших вкладок
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'consultations') {
        handleUpdate();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Оновлюємо дані кожні 30 секунд для підстраховки
    const interval = setInterval(handleUpdate, 30000);
    
    return () => {
      isSubscribed = false;
      unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [fetchConsultations, saveScrollPosition, restoreScrollPosition]);

  const handleResponseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConsultation || !response.trim()) return;

    try {
      saveScrollPosition();
      
      const apiResponse = await fetch('/api/admin/respond', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          consultationId: selectedConsultation.id,
          response: response.trim()
        }),
      });

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        throw new Error(errorData.error || 'Помилка при відправці відповіді');
      }

      setResponse('');
      await fetchConsultations();
      restoreScrollPosition();
    } catch (err) {
      console.error('Помилка при відправці відповіді:', err);
      setError(err instanceof Error ? err.message : 'Невідома помилка');
    }
  };

  const handleStatusChange = useCallback(async (newStatus: 'inProgress' | 'completed') => {
    if (!selectedConsultation) return;

    try {
      saveScrollPosition();
      const updatedConsultation = {
        ...selectedConsultation,
        status: newStatus
      };
      
      const success = consultationManager.updateConsultation(updatedConsultation);
      if (success) {
        setSelectedConsultation(updatedConsultation);
        await fetchConsultations();
        restoreScrollPosition();
      } else {
        setError('Не вдалося оновити статус консультації');
      }
    } catch (err) {
      console.error('Помилка при зміні статусу:', err);
      setError(err instanceof Error ? err.message : 'Невідома помилка');
    }
  }, [selectedConsultation, fetchConsultations, saveScrollPosition, restoreScrollPosition]);

  const handleDelete = useCallback(async () => {
    if (!selectedConsultation) return;

    try {
      saveScrollPosition();
      const success = consultationManager.deleteConsultation(selectedConsultation.id);
      
      if (success) {
        setSelectedConsultation(null);
        await fetchConsultations();
        restoreScrollPosition();
      } else {
        setError('Не вдалося видалити консультацію');
      }
    } catch (err) {
      console.error('Помилка при видаленні консультації:', err);
      setError(err instanceof Error ? err.message : 'Невідома помилка');
    } finally {
      setShowDeleteConfirmation(false);
    }
  }, [selectedConsultation, fetchConsultations, saveScrollPosition, restoreScrollPosition]);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'Новий';
      case 'inProgress': return 'В обробці';
      case 'completed': return 'Завершено';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className={styles.adminContainer}>
        <div className={styles.loading}>Завантаження...</div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.header}>
        <h1>Панель адміністратора</h1>
        <button 
          onClick={() => router.push('/')}
          className={styles.exitButton}
          aria-label="Вийти з адмін-панелі"
        >
          Вийти
        </button>
      </div>
      
      {error && <div className={styles.error}>{error}</div>}
      
      <div className={styles.consultationsGrid}>
        <div className={styles.consultationsList}>
          <div className={styles.listHeader}>
            <h2>Запити на консультацію</h2>
            <button 
              onClick={() => {
                saveScrollPosition();
                fetchConsultations().then(restoreScrollPosition);
              }}
              className={styles.refreshButton}
              aria-label="Оновити список"
            >
              🔄
            </button>
          </div>
          
          {consultations.length === 0 ? (
            <div className={styles.noConsultations}>
              Немає запитів на консультацію
            </div>
          ) : (
            consultations.map((consultation: Consultation) => (
              <div
                key={consultation.id}
                className={`${styles.consultationCard} ${selectedConsultation?.id === consultation.id ? styles.selected : ''}`}
                onClick={() => setSelectedConsultation(consultation)}
              >
                <div className={styles.consultationHeader}>
                  <h3>{consultation.name}</h3>
                  <span className={`${styles.status} ${styles[consultation.status]}`}>
                    {getStatusLabel(consultation.status)}
                  </span>
                </div>
                <p className={styles.date}>
                  {new Date(consultation.createdAt).toLocaleString('uk-UA')}
                </p>
                <p className={styles.phone}>{consultation.phone}</p>
                {consultation.email && (
                  <p className={styles.email}>{consultation.email}</p>
                )}
              </div>
            ))
          )}
        </div>

        <div className={styles.consultationDetails}>
          {selectedConsultation ? (
            <>
              <div className={styles.detailsHeader}>
                <h2>Деталі запиту</h2>
                <span className={`${styles.status} ${styles[selectedConsultation.status]}`}>
                  {getStatusLabel(selectedConsultation.status)}
                </span>
              </div>

              <div className={styles.detailsContent}>
                <div className={styles.detailsSection}>
                  <h3>Контактна інформація</h3>
                  <p><strong>Ім&apos;я:</strong> {selectedConsultation.name}</p>
                  <p><strong>Телефон:</strong> {selectedConsultation.phone}</p>
                  {selectedConsultation.email && (
                    <p><strong>Email:</strong> {selectedConsultation.email}</p>
                  )}
                  <p><strong>Дата запиту:</strong> {new Date(selectedConsultation.createdAt).toLocaleString('uk-UA')}</p>
                </div>

                <div className={styles.detailsSection}>
                  <h3>Повідомлення</h3>
                  <p>{selectedConsultation.message}</p>
                </div>

                {selectedConsultation.response && (
                  <div className={styles.detailsSection}>
                    <h3>Відповідь</h3>
                    <p>{selectedConsultation.response}</p>
                  </div>
                )}

                <div className={styles.actions}>
                  {selectedConsultation.status === 'new' && (
                    <button
                      onClick={() => handleStatusChange('inProgress')}
                      className={styles.statusButton}
                    >
                      Взяти в обробку
                    </button>
                  )}

                  {selectedConsultation.status !== 'completed' && (
                    <form onSubmit={handleResponseSubmit} className={styles.responseForm}>
                      <textarea
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        placeholder="Введіть вашу відповідь..."
                        required
                      />
                      <button type="submit">Надіслати відповідь</button>
                    </form>
                  )}

                  <button
                    onClick={() => setShowDeleteConfirmation(true)}
                    className={styles.deleteButton}
                  >
                    Видалити консультацію
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.noSelection}>
              <p>Виберіть запит для перегляду деталей</p>
            </div>
          )}
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showDeleteConfirmation}
        title="Підтвердження видалення"
        message="Ви впевнені, що хочете видалити цю консультацію? Цю дію неможливо скасувати."
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirmation(false)}
      />
    </div>
  );
} 