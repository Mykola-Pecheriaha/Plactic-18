import type React from "react"
import styles from "./TestimonialCard.module.css"

interface TestimonialCardProps {
  name: string
  procedure: string
  text: string
  rating: number
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, procedure, text, rating }) => {
  return (
    <div className={styles.card}>
      <div className={styles.rating}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={i < rating ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${styles.star} ${i < rating ? styles.filled : ""}`}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
      <p className={styles.text}>{text}</p>
      <div className={styles.footer}>
        <p className={styles.name}>{name}</p>
        <p className={styles.procedure}>{procedure}</p>
      </div>
    </div>
  )
}

export default TestimonialCard
