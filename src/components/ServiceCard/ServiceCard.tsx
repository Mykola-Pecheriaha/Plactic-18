'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
  title: string;
  image: string;
  slug: string;
  category: string;
}

const ServiceCard: FC<ServiceCardProps> = ({ title, image, slug, category }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/services/${slug}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div 
      className={styles.card} 
      onClick={handleClick} 
      onKeyPress={handleKeyPress}
      role="button" 
      tabIndex={0}
    >
      <div className={styles.imageContainer}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.category}>{category}</div>
        <h3 className={styles.title}>{title}</h3>
      </div>
    </div>
  );
};

export default ServiceCard; 