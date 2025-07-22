'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Breadcrumbs.module.css';

const routeNames: { [key: string]: string } = {
  'services': 'Послуги',
  'about-doctor': 'Про лікаря',
  'contact': 'Контакти',
  'blog': 'Блог',
  'admin': 'Адмін-панель',
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  if (pathname === '/') return null;

  const pathSegments = pathname.split('/').filter(Boolean);
  
  return (
    <div className={styles.breadcrumbsContainer}>
      <div className={styles.breadcrumbs}>
        <Link href="/" className={styles.breadcrumbLink}>
          Головна
        </Link>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const label = routeNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
          
          return (
            <div key={href} className={styles.breadcrumbItem}>
              <span className={styles.separator}>/</span>
              {index === pathSegments.length - 1 ? (
                <span className={styles.currentPage}>{label}</span>
              ) : (
                <Link href={href} className={styles.breadcrumbLink}>
                  {label}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
} 