import { useEffect } from 'react';

type HotkeyCallback = (e: KeyboardEvent) => void;

interface HotkeyConfig {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  callback: HotkeyCallback;
}

export function useHotkeys(config: HotkeyConfig) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Перевіряємо, чи не знаходимося в полі вводу
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      const matchesKey = e.key.toLowerCase() === config.key.toLowerCase();
      const matchesCtrl = config.ctrlKey ? e.ctrlKey : !e.ctrlKey;
      const matchesShift = config.shiftKey ? e.shiftKey : !e.shiftKey;
      const matchesAlt = config.altKey ? e.altKey : !e.altKey;

      if (matchesKey && matchesCtrl && matchesShift && matchesAlt) {
        e.preventDefault();
        config.callback(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [config]);
} 