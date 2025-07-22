'use client';

import { FC } from 'react';
import styles from './Changelog.module.css';

interface ChangelogEntry {
  date: string;
  version: string;
  changes: string[];
}

const changelogData: ChangelogEntry[] = [
  {
    date: '2025-03-28',
    version: '1.2.0',
    changes: [
      'Додано розділ послуг з детальними описами',
      'Покращено навігацію по сайту',
      'Оновлено дизайн головної сторінки'
    ]
  },
  {
    date: '2025-03-15',
    version: '1.1.0',
    changes: [
      'Додано форму запису на консультацію',
      'Оптимізовано завантаження зображень',
      'Виправлено дрібні помилки в інтерфейсі'
    ]
  },
  {
    date: '2025-03-01',
    version: '1.0.0',
    changes: [
      'Запуск сайту',
      'Основна інформація про послуги',
      'Контактна форма',
      'Адаптивний дизайн'
    ]
  }
];

const ChangelogPage: FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Щоденник змін</h1>
      <div className={styles.timeline}>
        {changelogData.map((entry, index) => (
          <div key={index} className={styles.entry}>
            <div className={styles.metadata}>
              <span className={styles.date}>{entry.date}</span>
              <span className={styles.version}>Версія {entry.version}</span>
            </div>
            <div className={styles.changes}>
              <ul>
                {entry.changes.map((change, changeIndex) => (
                  <li key={changeIndex}>{change}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChangelogPage; 