import { FC } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

interface ServiceCategory {
  title: string;
  items: {
    name: string;
    path: string;
  }[];
}

const servicesData: ServiceCategory[] = [
  {
    title: 'Пластика обличчя',
    items: [
      { name: 'Підтяжка обличчя', path: '/services/facelift-section' },
      { name: 'Блефаропластика', path: '/services/blepharoplasty' },
      { name: 'Корекція вух', path: '/services/ear-correction' },
    ],
  },
  {
    title: 'Пластика грудей',
    items: [
      { name: 'Збільшення грудей', path: '/services/breast-augmentation' },
      { name: 'Заміна або видалення імплантів', path: '/services/implant-replacement' },
      { name: 'Підтяжка грудей, корекція соска та ареоли', path: '/services/breast-lift' },
      { name: 'Видалення гінекомастії', path: '/services/gynecomastia' },
    ],
  },
  {
    title: 'Пластика тіла',
    items: [
      { name: 'Абдомінопластика', path: '/services/abdominoplasty' },
      { name: 'Ліпосакція', path: '/services/liposuction' },
      { name: 'Видалення шийного горба', path: '/services/neck-hump-removal' },
      { name: 'Збільшення сідниць', path: '/services/buttock-augmentation' },
    ],
  },
  {
    title: 'Загальна хірургія',
    items: [
      { name: 'Видалення доброякісних пухлин', path: '/services/benign-tumor-removal' },
      { name: 'Синдром карпального каналу', path: '/services/carpal-tunnel' },
      { name: 'Лікування гриж', path: '/services/hernia-treatment' },
      { name: 'Лікування варикозу вен', path: '/services/varicose-veins' },
      { name: 'Проктологія (задній прохід)', path: '/services/proctology' },
    ],
  },
];

interface ServicesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const ServicesDropdown: FC<ServicesDropdownProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.servicesDropdown}>
      <div className={styles.servicesGrid}>
        {servicesData.map((category, index) => (
          <div key={index} className={styles.serviceCategory}>
            <h3 className={styles.categoryTitle}>{category.title}</h3>
            <ul className={styles.servicesList}>
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Link 
                    href={item.path} 
                    className={styles.serviceLink}
                    onClick={onClose}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesDropdown; 