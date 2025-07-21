'use client';

import { FC } from 'react';
import ServiceCard from '@/components/ServiceCard/ServiceCard';
import styles from './Services.module.css';

const servicesData = [
  {
    category: 'Пластика обличчя',
    items: [
      { title: 'Підтяжка обличчя', slug: 'face-lift', image: '/images/services/face-1.jpg' },
      { title: 'Блефаропластика', slug: 'blepharoplasty', image: '/images/services/face-2.jpg' },
      { title: 'Корекція вух', slug: 'ear-correction', image: '/images/services/face-3.jpg' },
    ]
  },
  {
    category: 'Пластика грудей',
    items: [
      { title: 'Збільшення грудей', slug: 'breast-augmentation', image: '/images/services/breast-1.jpg' },
      { title: 'Заміна або видалення імплантів', slug: 'implant-replacement', image: '/images/services/breast-2.jpg' },
      { title: 'Підтяжка грудей', slug: 'breast-lift', image: '/images/services/breast-3.jpg' },
      { title: 'Видалення гінекомастії', slug: 'gynecomastia', image: '/images/services/breast-4.jpg' },
    ]
  },
  {
    category: 'Пластика тіла',
    items: [
      { title: 'Абдомінопластика', slug: 'abdominoplasty', image: '/images/services/body-1.jpg' },
      { title: 'Ліпосакція', slug: 'liposuction', image: '/images/services/body-2.jpg' },
      { title: 'Видалення шийного горба', slug: 'neck-hump-removal', image: '/images/services/body-3.jpg' },
      { title: 'Збільшення сідниць', slug: 'buttock-augmentation', image: '/images/services/body-4.jpg' },
    ]
  },
  {
    category: 'Загальна хірургія',
    items: [
      { title: 'Видалення доброякісних пухлин', slug: 'benign-tumor-removal', image: '/images/services/surgery-1.jpg' },
      { title: 'Синдром карпального каналу', slug: 'carpal-tunnel', image: '/images/services/surgery-2.jpg' },
      { title: 'Лікування гриж', slug: 'hernia-treatment', image: '/images/services/surgery-3.jpg' },
      { title: 'Лікування варикозу вен', slug: 'varicose-veins', image: '/images/services/surgery-4.jpg' },
      { title: 'Проктологія', slug: 'proctology', image: '/images/services/surgery-5.jpg' },
    ]
  }
];

const ServicesPage: FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Наші послуги</h1>
      <div className={styles.categories}>
        {servicesData.map((category, categoryIndex) => (
          <section key={categoryIndex} className={styles.category}>
            <h2 className={styles.categoryTitle}>{category.category}</h2>
            <div className={styles.grid}>
              {category.items.map((service, serviceIndex) => (
                <div key={serviceIndex} className={styles.cardWrapper}>
                  <ServiceCard
                    title={service.title}
                    image={service.image}
                    slug={service.slug}
                    category={category.category}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage; 