import { NextResponse } from 'next/server';
import { consultationManager, Consultation } from '@/lib/consultations';
import { type NextRequest } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { response } = await request.json();
    const { id } = await params;

    console.log('Отримано запит на відповідь:', {
      id,
      responseLength: response?.length
    });

    // Валідація даних
    if (!response || typeof response !== 'string') {
      console.log('Помилка валідації: некоректна відповідь');
      return NextResponse.json(
        { error: 'Відповідь є обов\'язковою та має бути текстом' },
        { status: 400 }
      );
    }

    if (!id) {
      console.log('Помилка валідації: відсутній ID');
      return NextResponse.json(
        { error: 'ID консультації є обов\'язковим' },
        { status: 400 }
      );
    }

    // Оновлюємо консультацію через менеджер
    try {
      // Спочатку перевіряємо, чи існує консультація
      const consultation = await consultationManager.getConsultation(id);
      if (!consultation) {
        return new Response('Consultation not found', { status: 404 });
      }

      await consultationManager.updateConsultation({
        ...consultation,
        status: 'completed',
        response,
      });

      // Отримуємо оновлену консультацію
      const updatedConsultation = consultationManager.getConsultations()
        .find((c: Consultation) => c.id === id);

      if (!updatedConsultation) {
        throw new Error('Консультацію не знайдено після оновлення');
      }

      console.log('Консультацію успішно оновлено:', {
        id: updatedConsultation.id,
        name: updatedConsultation.name,
        status: updatedConsultation.status
      });

      return NextResponse.json(
        { 
          message: 'Відповідь успішно надіслано',
          consultation: updatedConsultation
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error updating consultation:', error);
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Помилка при оновленні консультації' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error responding to consultation:', error);
    return NextResponse.json(
      { error: 'Внутрішня помилка сервера' },
      { status: 500 }
    );
  }
} 