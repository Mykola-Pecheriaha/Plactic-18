import { FC } from 'react';
import Button from '@/components/ui/Button/Button';
import styles from './Demo.module.css';

const DemoPage: FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} fade-in`}>Демонстрація анімацій</h1>
      
      <section className={`${styles.section} slide-in`}>
        <h2>Кнопки</h2>
        <div className={styles.buttonGrid}>
          <Button>Звичайна</Button>
          <Button variant="secondary">Другорядна</Button>
          <Button variant="outline">Контурна</Button>
        </div>
        
        <div className={styles.buttonGrid}>
          <Button size="small">Маленька</Button>
          <Button size="medium">Середня</Button>
          <Button size="large">Велика</Button>
        </div>
        
        <div className={styles.buttonGrid}>
          <Button isAnimated={false}>Без анімації</Button>
          <Button disabled>Неактивна</Button>
          <Button className="custom-class">З додатковим класом</Button>
        </div>
      </section>
      
      <section className={`${styles.section} slide-in`}>
        <h2>Анімації появи</h2>
        <div className={styles.animationGrid}>
          <div className="fade-in">
            <h3>Fade In</h3>
            <p>Плавна поява елемента</p>
          </div>
          
          <div className="slide-in">
            <h3>Slide In</h3>
            <p>Поява з ковзанням</p>
          </div>
          
          <div className="button-animated">
            <h3>Pulse</h3>
            <p>Пульсуюча анімація</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DemoPage; 