import { ClinicInfo } from '@/components/ClinicInfo';
import { ClinicMap } from '@/components/ClinicMap';
import styles from './page.module.css';

export const metadata = {
  title: 'Контакти | Клініка',
  description: 'Контактна інформація та місцезнаходження клініки',
};

export default function ContactsPage() {
  return (
    <main className={styles.main}>
      <ClinicInfo />
      <ClinicMap />
    </main>
  );
} 