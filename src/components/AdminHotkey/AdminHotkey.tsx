'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { hotkeyManager } from '@/lib/hotkeys';
import styles from './AdminHotkey.module.css';

export function AdminHotkey() {
  const router = useRouter();
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // Реєструємо гарячу клавішу з високим пріоритетом
    hotkeyManager.register({
      key: 'a',
      altKey: true,
      priority: 100, // Високий пріоритет для адмін-клавіш
      callback: () => {
        console.log('Гаряча клавіша Alt + A активована');
        router.push('/admin');
      }
    });

    // Показуємо підказку при натисканні Alt
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && !showTooltip) {
        console.log('Alt натиснуто - показуємо підказку');
        setShowTooltip(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!e.altKey && showTooltip) {
        console.log('Alt відпущено - ховаємо підказку');
        timeoutId = setTimeout(() => {
          setShowTooltip(false);
        }, 500);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      // Прибираємо обробники та гарячу клавішу
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      hotkeyManager.unregister('a');
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showTooltip, router]); // Додаємо router в залежностях

  if (!showTooltip) return null;

  return (
    <div className={styles.tooltip}>
      <p>Натисніть <kbd>Alt</kbd> + <kbd>A</kbd> для переходу до адмін-панелі</p>
    </div>
  );
} 