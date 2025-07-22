export interface Consultation {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  source?: string;
  response?: string;
}

class ConsultationManager {
  private consultations: Consultation[] = [];
  private readonly storageKey = 'consultations';

  constructor() {
    if (typeof window !== 'undefined') {
      const savedConsultations = localStorage.getItem(this.storageKey);
      if (savedConsultations) {
        this.consultations = JSON.parse(savedConsultations);
      }
    }
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(this.consultations));
    }
  }

  addConsultation(data: Omit<Consultation, 'id' | 'status' | 'createdAt'> & { status?: Consultation['status'], createdAt?: string }): Consultation {
    const consultation: Consultation = {
      id: Date.now().toString(),
      status: data.status || 'pending',
      createdAt: data.createdAt || new Date().toISOString(),
      ...data
    };

    this.consultations.unshift(consultation);
    this.saveToStorage();
    return consultation;
  }

  getConsultations(): Consultation[] {
    return this.consultations;
  }

  getConsultationById(id: string): Consultation | undefined {
    return this.consultations.find(c => c.id === id);
  }

  updateConsultation(id: string, data: Partial<Omit<Consultation, 'id'>>): Consultation | undefined {
    const index = this.consultations.findIndex(c => c.id === id);
    if (index === -1) return undefined;

    this.consultations[index] = {
      ...this.consultations[index],
      ...data
    };

    this.saveToStorage();
    return this.consultations[index];
  }

  deleteConsultation(id: string): boolean {
    const index = this.consultations.findIndex(c => c.id === id);
    if (index === -1) return false;

    this.consultations.splice(index, 1);
    this.saveToStorage();
    return true;
  }
}

export const consultationManager = new ConsultationManager();

// Додаємо типи для подій
declare global {
  interface WindowEventMap {
    'consultationsUpdated': CustomEvent<void>;
  }
} 