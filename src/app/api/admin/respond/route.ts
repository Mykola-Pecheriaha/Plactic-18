import { consultationManager } from '@/lib/consultations';
import { NotificationService } from '@/lib/notifications';

// Ініціалізуємо сервіс нотифікацій
const notificationService = NotificationService.getInstance();

// Ініціалізуємо сервіси, якщо є необхідні змінні середовища
if (process.env.SMTP_HOST) {
  notificationService.initializeEmail({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    user: process.env.SMTP_USER || '',
    password: process.env.SMTP_PASSWORD || '',
    fromEmail: process.env.SMTP_FROM_EMAIL || '',
  });
}

if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  notificationService.initializeSMS({
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER || '',
  });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { id, response } = data;

    if (!id || !response) {
      return new Response('Missing required fields', { status: 400 });
    }

    const consultation = await consultationManager.getConsultation(id);
    if (!consultation) {
      return new Response('Consultation not found', { status: 404 });
    }

    await consultationManager.updateConsultation({
      ...consultation,
      status: 'completed',
      response,
    });

    // Відправляємо повідомлення
    await notificationService.sendConsultationResponse(consultation, response);

    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('Error handling consultation response:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 