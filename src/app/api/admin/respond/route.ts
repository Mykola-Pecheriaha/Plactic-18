import { NextResponse } from 'next/server';
import { NotificationService } from '@/lib/notifications';
import { consultationManager, type Consultation } from '@/lib/client/consultationManager';

const notificationService = NotificationService.getInstance();

// Ініціалізуємо сервіс email нотифікацій
notificationService.initializeEmail({
  host: process.env.SMTP_HOST || '',
  port: parseInt(process.env.SMTP_PORT || '587'),
  user: process.env.SMTP_USER || '',
  password: process.env.SMTP_PASSWORD || '',
  fromEmail: process.env.SMTP_FROM || '',
});

export async function POST(request: Request) {
  try {
    const { consultationId, response } = await request.json();
    
    const consultation = consultationManager.getConsultation(consultationId);
    if (!consultation) {
      return NextResponse.json({ error: 'Consultation not found' }, { status: 404 });
    }

    const notifications = await notificationService.sendConsultationResponse(consultation, response);
    
    // Оновлюємо статус консультації
    const updatedConsultation: Consultation = {
      ...consultation,
      status: 'completed',
      response,
    };
    
    consultationManager.updateConsultation(updatedConsultation);

    return NextResponse.json({ success: true, notifications });
  } catch (error) {
    console.error('Error responding to consultation:', error);
    return NextResponse.json({ error: 'Failed to respond to consultation' }, { status: 500 });
  }
} 