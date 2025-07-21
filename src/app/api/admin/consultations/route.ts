import { NextResponse } from 'next/server';
import { consultationManager, Consultation } from '@/lib/consultations';

export async function GET() {
  try {
    console.log('Отримано запит на список консультацій для адмін-панелі');
    
    const consultations = consultationManager.getConsultations();
    console.log('Повертаємо консультації:', consultations.map((c: Consultation) => ({
      id: c.id,
      name: c.name,
      status: c.status
    })));
    
    return NextResponse.json(consultations);
  } catch (error) {
    console.error('Error fetching consultations:', error);
    return NextResponse.json(
      { error: 'Помилка при отриманні консультацій' },
      { status: 500 }
    );
  }
} 