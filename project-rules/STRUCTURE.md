# Структура проєкту

## Загальна структура

```
src/
├── app/                    # Сторінки додатку (Next.js App Router)
│   ├── layout.tsx         # Головний layout з Header та Footer
│   ├── page.tsx           # Головна сторінка
│   └── globals.css        # Глобальні стилі та теми
├── components/            # Компоненти
│   ├── Header/           # Компонент хедера
│   │   ├── Header.tsx    # Основний файл
│   │   └── Header.module.css  # Стилі
│   ├── Footer/           # Компонент футера
│   │   ├── Footer.tsx
│   │   └── Footer.module.css
│   └── [ІншіКомпоненти]/ # Інші компоненти за тією ж структурою
└── public/               # Статичні файли
    └── images/           # Зображення

```

## Правила структури

1. **Компоненти**:
   - Кожен компонент у власній папці
   - Назва папки = назва компонента
   - В папці: основний файл (.tsx) + файл стилів (.module.css)

2. **Сторінки** (в app/):
   - Кожна сторінка у власній папці
   - Назва папки = URL шлях
   - В папці: page.tsx + модульні стилі

3. **Зображення**:
   - Всі зображення в public/images/
   - Підпапки за категоріями (якщо потрібно)

## Стилі та теми

1. **Теми**:
   - Темна та світла теми
   - Кольори через CSS змінні в globals.css
   - Адаптивний дизайн через медіа-запити

2. **Модульні стилі**:
   - Для кожного компонента свій .module.css
   - Назви класів у camelCase
   - Уникати глобальних стилів

## Технічний стек

1. **Фреймворк**: Next.js
2. **Мова**: TypeScript
3. **Стилі**: CSS Modules
4. **Роутинг**: App Router (Next.js 13+)

## Правила написання коду

1. **Компоненти**:
```typescript
// ComponentName/ComponentName.tsx
import { FC } from 'react';
import styles from './ComponentName.module.css';

interface ComponentNameProps {
  // props interface
}

const ComponentName: FC<ComponentNameProps> = ({ /* props */ }) => {
  return (
    <div className={styles.container}>
      {/* component content */}
    </div>
  );
};

export default ComponentName;
```

2. **Стилі**:
```css
/* ComponentName.module.css */
.container {
  /* component styles */
}

/* Медіа-запити */
@media (max-width: 768px) {
  .container {
    /* mobile styles */
  }
}
```

## Адаптивність

1. **Брейкпоінти**:
   - Mobile: < 768px
   - Tablet: 768px - 1024px
   - Desktop: > 1024px

2. **Підхід**:
   - Mobile First
   - Медіа-запити в модульних стилях
   - Гнучкі розміри (%, rem, em)

## Компоненти сторінок

1. **Header**:
   - Логотип
   - Навігаційне меню
   - Адаптивне меню для мобільних

2. **Footer**:
   - Контактна інформація
   - Навігаційні посилання
   - Соціальні мережі

3. **Основний контент**:
   - Компоненти специфічні для кожної сторінки
   - Модульна структура
   - Перевикористовувані елементи 