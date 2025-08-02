import type React from "react"
import FaceliftSection from "@/components/FaceliftSection/FaceliftSection"
import FaceliftDetails from "@/components/FaceliftDetails/FaceliftDetails"
// import FaceLiftPreparation from "@/components/FaceLiftPreparation/FaceLiftPreparation"
// import FaceliftFAQ from "@/components/FaceliftFAQ/FaceliftFAQ"

const FaceliftSectionPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Використовуємо реальний компонент FaceliftSection */}
      <FaceliftSection backgroundColor="#EDF5E8FF" />

      {/* Додаємо компонент FaceliftDetails */}
      <FaceliftDetails backgroundColor="#f0f9ff" />

      {/* Додаємо компонент FaceLiftPreparation */}
      {/* <FaceLiftPreparation backgroundColor="#e8f5e8" /> */}

      {/* Додаємо компонент FaceliftFAQ */}
      {/* <FaceliftFAQ backgroundColor="#f0f9ff" /> */}
    </div>
  )
}

export default FaceliftSectionPage
