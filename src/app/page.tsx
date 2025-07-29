'use client';

import BigBord from '@/components/BigBord/BigBord';
import ConsultationForm from '@/components/ConsultationForm/ConsultationForm';
import { useState } from 'react';
import Doctor from "@/components/Doctor/Doctor"

export default function Home() {
  const [isConsultationFormOpen, setIsConsultationFormOpen] = useState(false);

  return (
    <>
      <BigBord onConsultationClick={() => setIsConsultationFormOpen(true)} />
        <Doctor />
      <ConsultationForm 
        isOpen={isConsultationFormOpen} 
        onClose={() => setIsConsultationFormOpen(false)} 
      />
    </>
  );
}
