'use server';

interface QuestionFormData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  question: string;
  type: "question" | "consultation";
  service?: string;
  createdAt: Date;
  status: "new" | "read" | "replied";
}

interface ActionResult {
  success: boolean;
  message: string;
  data?: QuestionFormData;
}

let questions: QuestionFormData[] = [];

export async function submitQuestion(prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const question = formData.get("question") as string;

    if (!name || name.trim().length < 2) {
      return {
        success: false,
        message: "Ім'я повинно містити принаймні 2 символи",
      };
    }

    if (!email || !isValidEmail(email)) {
      return {
        success: false,
        message: "Введіть коректний email адрес",
      };
    }

    if (!question || question.trim().length < 10) {
      return {
        success: false,
        message: "Запитання повинно містити принаймні 10 символів",
      };
    }

    const questionData: QuestionFormData = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || undefined,
      question: question.trim(),
      type: "question",
      createdAt: new Date(),
      status: "new",
    };

    questions.unshift(questionData);

    console.log(`🩺 Нове запитання від ${questionData.name} (${questionData.email})`);

    return {
      success: true,
      message: "Ваше запитання успішно відправлено! Лікар зв'яжеться з вами найближчим часом.",
      data: questionData,
    };
  } catch (error) {
    console.error("❌ Помилка при обробці запитання:", error);
    return {
      success: false,
      message: "Виникла помилка при відправці запитання. Спробуйте ще раз або зв'яжіться з нами напряму.",
    };
  }
}

export async function getAllQuestions(): Promise<QuestionFormData[]> {
  return questions;
}

export async function updateQuestionStatus(id: string, status: "new" | "read" | "replied"): Promise<boolean> {
  const questionIndex = questions.findIndex(q => q.id === id);
  if (questionIndex !== -1) {
    questions[questionIndex].status = status;
    return true;
  }
  return false;
}

export async function deleteQuestion(id: string): Promise<boolean> {
  const initialLength = questions.length;
  questions = questions.filter(q => q.id !== id);
  return questions.length < initialLength;
}

export async function getConsultations(): Promise<QuestionFormData[]> {
  return questions.filter(q => q.type === "consultation");
}

export async function getQuestions(): Promise<QuestionFormData[]> {
  return questions.filter(q => q.type === "question");
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
} 