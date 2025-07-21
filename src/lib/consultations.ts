export interface Consultation {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  createdAt: string;
  status: 'new' | 'inProgress' | 'completed';
  response?: string;
}

class ConsultationManager {
  private consultations: Consultation[] = [];
  private subscribers: (() => void)[] = [];

  constructor() {
    // Завантажуємо дані з localStorage при ініціалізації
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('consultations');
      if (saved) {
        this.consultations = JSON.parse(saved);
      }
    }
  }

  private save() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('consultations', JSON.stringify(this.consultations));
      // Сповіщаємо інші вкладки про зміни
      window.dispatchEvent(new Event('consultationsUpdated'));
      // Викликаємо підписників
      this.subscribers.forEach(callback => callback());
    }
  }

  getConsultations(): Consultation[] {
    return [...this.consultations];
  }

  getConsultation(id: string): Consultation | undefined {
    return this.consultations.find(c => c.id === id);
  }

  addConsultation(consultation: Omit<Consultation, 'id' | 'createdAt' | 'status'>) {
    const newConsultation: Consultation = {
      ...consultation,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    this.consultations.push(newConsultation);
    this.save();
    return newConsultation;
  }

  updateConsultation(updatedConsultation: Consultation) {
    const index = this.consultations.findIndex(c => c.id === updatedConsultation.id);
    if (index !== -1) {
      this.consultations[index] = updatedConsultation;
      this.save();
      return true;
    }
    return false;
  }

  deleteConsultation(id: string) {
    const index = this.consultations.findIndex(c => c.id === id);
    if (index !== -1) {
      this.consultations.splice(index, 1);
      this.save();
      return true;
    }
    return false;
  }

  subscribe(callback: () => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }
}

export const consultationManager = new ConsultationManager();

// Додаємо типи для подій
declare global {
  interface WindowEventMap {
    'consultationsUpdated': CustomEvent<void>;
  }
} 