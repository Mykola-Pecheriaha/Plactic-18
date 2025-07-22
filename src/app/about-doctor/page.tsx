'use client';

import { AboutBort } from '@/components/AboutBort/AboutBort';
import { Educationcareer } from '@/components/Educationcareer/Educationcareer';
import { Diplomcertificates } from '@/components/Diplomcertificates/Diplomcertificates';
import { Clinic } from '@/components/Clinic/Clinic';
import ConsultationCTA from '@/components/ConsultationCTA/ConsultationCTA';

export default function AboutDoctor() {
  return (
    <div>
      <AboutBort />
      <Educationcareer />
      <Diplomcertificates />
      <Clinic />
      <ConsultationCTA />
    </div>
  );
} 