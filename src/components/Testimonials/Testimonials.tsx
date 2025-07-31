import type React from "react"
import styles from "./Testimonials.module.css"
import TestimonialCard from "./TestimonialCard"

interface TestimonialsProps {
  backgroundColor?: string
}

const Testimonials: React.FC<TestimonialsProps> = ({ backgroundColor }) => {
  const testimonials = [
    {
      id: 1,
      name: "Олена К.",
      procedure: "Ринопластика",
      text: "Я завжди комплексувала через форму свого носа. Після операції я нарешті почуваюся впевнено. Результат перевершив мої очікування!",
      rating: 5,
    },
    {
      id: 2,
      name: "Максим П.",
      procedure: "Ліпосакція",
      text: "Незважаючи на регулярні тренування, я не міг позбутися жиру на животі. Після процедури я нарешті отримав бажаний рельєф.",
      rating: 5,
    },
    {
      id: 3,
      name: "Ірина В.",
      procedure: "Блефаропластика",
      text: "Мої очі виглядали втомленими через нависання повік. Після операції я виглядаю значно молодше і свіжіше.",
      rating: 4,
    },
    {
      id: 4,
      name: "Наталія Д.",
      procedure: "Збільшення грудей",
      text: "Після народження дітей моя грудь втратила об'єм. Завдяки професіоналізму лікаря я отримала природний результат.",
      rating: 5,
    },
    {
      id: 5,
      name: "Андрій К.",
      procedure: "Отопластика",
      text: "Все життя соромився своїх вух, що стирчали. Операція була швидкою, а результат просто чудовий!",
      rating: 5,
    },
    {
      id: 6,
      name: "Марія С.",
      procedure: "Підтяжка обличчя",
      text: "У 55 років я вирішила зробити підтяжку. Результат дуже природний, ніхто не здогадується про операцію!",
      rating: 5,
    },
  ]

  // Створюємо стиль для секції
  const sectionStyle: React.CSSProperties = backgroundColor ? { backgroundColor } : {}

  return (
    <section className={styles.testimonials} style={sectionStyle}>
      <div className={styles.container}>
        {/* Заголовок */}
        <div className={styles.header}>
          <h2 className={styles.title}>Відгуки пацієнтів</h2>
          <p className={styles.subtitle}>Що говорять наші пацієнти про результати та досвід</p>
        </div>

        {/* Сітка відгуків */}
        <div className={styles.grid}>
          {testimonials.map(testimonial => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              procedure={testimonial.procedure}
              text={testimonial.text}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
