'use client';

import BigBord from '@/components/BigBord/BigBord';
import ConsultationForm from '@/components/ConsultationForm/ConsultationForm';
import { useState } from 'react';

export default function Home() {
  const [isConsultationFormOpen, setIsConsultationFormOpen] = useState(false);

  return (
    <>
      <BigBord onConsultationClick={() => setIsConsultationFormOpen(true)} />
      <ConsultationForm 
        isOpen={isConsultationFormOpen} 
        onClose={() => setIsConsultationFormOpen(false)} 
      />
    </>
  );
}
