'use client';

import styles from "./Diplomcertificates.module.css";
import { DiplomcertificatesGallery } from "../DiplomcertificatesGallery/DiplomcertificatesGallery";
import type { GalleryImage } from "../DiplomcertificatesGallery/DiplomcertificatesGallery";

interface DiplomcertificatesProps {
  className?: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: "/images/sertificats/Diplom.jpg",
    alt: "Освіта лікаря",
    width: 800,
    height: 600,
    title: "Диплом з відзнакою",
  },
  {
    src: "/images/sertificats/SertifPlastici.jpg",
    alt: "Освіта лікаря",
    width: 800,
    height: 600,
    title: "Сертифікат до Диплому з відзнакою",
  },
  {
    src: "/images/sertificats/Categori.jpg",
    alt: "Освіта лікаря",
    width: 800,
    height: 600,
    title: "Category",
  },
  {
    src: "/images/sertificats/Sertificat10.jpg",
    alt: "Освіта лікаря",
    width: 800,
    height: 600,
    title: "Диплом з відзнакою",
  },
  {
    src: "/images/sertificats/Sertificat1.jpg",
    alt: "Освіта лікаря",
    width: 800,
    height: 600,
    title: "Диплом з відзнакою",
  },
  {
    src: "/images/sertificats/Sertificat2.jpg",
    alt: "Кар'єра лікаря",
    width: 800,
    height: 600,
    title: "Професійна діяльність",
  },
  {
    src: "/images/sertificats/Sertificat3.jpg",
    alt: "Медичні курси",
    width: 800,
    height: 600,
    title: "Підвищення кваліфікації",
  },
  {
    src: "/images/sertificats/Sertificat5.jpg",
    alt: "Медичні курси",
    width: 800,
    height: 600,
    title: "Підвищення кваліфікації",
  },
  {
    src: "/images/sertificats/Sertificat8.jpg",
    alt: "Медичні курси",
    width: 800,
    height: 600,
    title: "Підвищення кваліфікації",
  },
  {
    src: "/images/sertificats/Sertificat9.jpg",
    alt: "Медичні курси",
    width: 800,
    height: 600,
    title: "Підвищення кваліфікації",
  },
  {
    src: "/images/sertificats/Sertificat6.jpg",
    alt: "Медичні курси",
    width: 800,
    height: 600,
    title: "Підвищення кваліфікації",
  },
  {
    src: "/images/sertificats/Sertificat11.jpg",
    alt: "Медичні курси",
    width: 800,
    height: 600,
    title: "Підвищення кваліфікації",
  },
  {
    src: "/images/sertificats/Sertificat12.jpg",
    alt: "Медичні курси",
    width: 800,
    height: 600,
    title: "Підвищення кваліфікації",
  },
  {
    src: "/images/sertificats/Sertificat4.jpg",
    alt: "Хірургічна практика",
    width: 800,
    height: 600,
    title: "Хірургічна практика",
  },
];

export function Diplomcertificates({ className }: DiplomcertificatesProps) {
  return (
    <section className={`${styles.diplomcertificatesSection} ${className || ""}`}>
      <div className={styles.container}>
        <h1 className={styles.mainTitle}>Дипломи та сертифікати</h1>

        <div className={styles.galleryWrapper}>
          <DiplomcertificatesGallery images={galleryImages} />
        </div>
      </div>
    </section>
  );
}

export default Diplomcertificates; 