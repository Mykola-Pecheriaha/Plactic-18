import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import styles from './ServicePage.module.css';

const servicesData = {
  // ... your services data ...
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `Service - ${resolvedParams.slug}`,
    description: `Service page for ${resolvedParams.slug}`,
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const service = servicesData[resolvedParams.slug as keyof typeof servicesData];

  if (!service) {
    notFound();
  }

  return (
    <div className={styles.servicePage}>
      <h1>Service: {resolvedParams.slug}</h1>
      {/* Your service page content */}
    </div>
  );
} 