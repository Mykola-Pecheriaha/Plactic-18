import { NextResponse } from 'next/server';
import { consultationManager } from '@/lib/consultations';

export async function GET() {
  // TODO: Додати аутентифікацію
  return NextResponse.json(consultationManager.getConsultations());
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Валідація даних
    if (!data.name || !data.phone) {
      return NextResponse.json(
        { error: 'Ім\'я та телефон обов\'язкові' },
        { status: 400 }
      );
    }
    
    try {
      // Створюємо нову консультацію
      const newConsultation = {
        ...data,
        status: 'new',
        createdAt: new Date().toISOString(),
      };

      console.log('Створюємо нову консультацію:', newConsultation);

      // Додаємо до списку через менеджер
      const addedConsultation = consultationManager.addConsultation(newConsultation);
      console.log('Консультацію додано:', addedConsultation);

      return NextResponse.json(
        { 
          message: 'Запит на консультацію успішно створено',
          consultation: addedConsultation
        },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error creating consultation:', error);
      return NextResponse.json(
        { error: 'Помилка при створенні консультації' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error parsing request:', error);
    return NextResponse.json(
      { error: 'Помилка при обробці запиту' },
      { status: 400 }
    );
  }
} 