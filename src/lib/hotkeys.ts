type HotkeyCallback = () => void;

interface HotkeyConfig {
  key: string;
  altKey?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  callback: HotkeyCallback;
  priority?: number; // Додаємо пріоритет для гарячих клавіш
}

class HotkeyManager {
  private static instance: HotkeyManager;
  private hotkeys: HotkeyConfig[] = [];

  private constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', this.handleKeyDown);
    }
  }

  public static getInstance(): HotkeyManager {
    if (!HotkeyManager.instance) {
      HotkeyManager.instance = new HotkeyManager();
    }
    return HotkeyManager.instance;
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    // Ігноруємо, якщо фокус на полі вводу
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.target instanceof HTMLSelectElement
    ) {
      return;
    }

    // Сортуємо гарячі клавіші за пріоритетом (вищий пріоритет першим)
    const sortedHotkeys = [...this.hotkeys].sort((a, b) => 
      (b.priority || 0) - (a.priority || 0)
    );

    for (const hotkey of sortedHotkeys) {
      const matchesKey = e.key.toLowerCase() === hotkey.key.toLowerCase();
      
      // Перевіряємо модифікатори тільки якщо вони вказані
      const matchesAlt = hotkey.altKey === undefined ? true : e.altKey === hotkey.altKey;
      const matchesCtrl = hotkey.ctrlKey === undefined ? true : e.ctrlKey === hotkey.ctrlKey;
      const matchesShift = hotkey.shiftKey === undefined ? true : e.shiftKey === hotkey.shiftKey;

      if (matchesKey && matchesAlt && matchesCtrl && matchesShift) {
        e.preventDefault();
        e.stopPropagation(); // Зупиняємо подальше розповсюдження події
        hotkey.callback();
        break; // Виходимо після першого співпадіння
      }
    }
  };

  public register(config: HotkeyConfig): void {
    // Встановлюємо пріоритет за замовчуванням
    const configWithPriority = {
      ...config,
      priority: config.priority || 0
    };
    this.hotkeys.push(configWithPriority);
  }

  public unregister(key: string): void {
    this.hotkeys = this.hotkeys.filter(hotkey => hotkey.key !== key);
  }

  public cleanup(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', this.handleKeyDown);
    }
    this.hotkeys = [];
  }
}

export const hotkeyManager = HotkeyManager.getInstance(); 