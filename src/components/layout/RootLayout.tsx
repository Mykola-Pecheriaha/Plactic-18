'use client';

import { FC, ReactNode } from 'react';
import Header from '@/components/Header/Header';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Footer from '@/components/layout/Footer';
import styles from './RootLayout.module.css';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.fixedHeader}>
        <Header />
        <Breadcrumbs />
      </div>
      <main className={styles.mainContent}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout; 