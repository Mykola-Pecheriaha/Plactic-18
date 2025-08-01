'use client';

import BigBord from '@/components/BigBord/BigBord';
import ConsultationForm from '@/components/ConsultationForm/ConsultationForm';
import { useState } from 'react';
import Doctor from "@/components/Doctor/Doctor"
import SideBySideGallery from "@/components/SideBySideGallery/SideBySideGallery"
import BigBordFace from "@/components/BigBordFace/BigBordFace"
import BigBordBody from "@/components/BigBordBody/BigBordBody"
import BigClinic from "@/components/BigClinic/BigClinic"
import Testimonials from "@/components/Testimonials/Testimonials"
import ConsultationCTA from '@/components/ConsultationCTA/ConsultationCTA';

export default function Home() {
  const [isConsultationFormOpen, setIsConsultationFormOpen] = useState(false);

  return (
    <>
      <BigBord onConsultationClick={() => setIsConsultationFormOpen(true)} />
        <Doctor />
        <SideBySideGallery />
        <BigBordFace />
        <BigBordBody />
        <BigClinic />
        <Testimonials />
        <ConsultationCTA />
      <ConsultationForm 
        isOpen={isConsultationFormOpen} 
        onClose={() => setIsConsultationFormOpen(false)} 
      />
    </>
  );
}
