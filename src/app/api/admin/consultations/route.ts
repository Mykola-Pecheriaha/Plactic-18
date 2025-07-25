import { NextResponse } from 'next/server';
import { consultationManager, Consultation } from '@/lib/consultations';

export async function GET() {
  try {
    const consultations = consultationManager.getConsultations();
    return NextResponse.json(consultations);
  } catch (error) {
    console.error('Error fetching consultations:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, message, source, status } = data;

    // Валідація даних
    if (!name || !email || !message) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Створюємо нову консультацію
    const consultation = consultationManager.addConsultation({
      name,
      email,
      message,
      source,
      status: status || 'pending',
      createdAt: new Date().toISOString(),
    });

    if (!consultation) {
      throw new Error('Failed to create consultation');
    }

    return NextResponse.json(consultation);
  } catch (error) {
    console.error('Error creating consultation:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 