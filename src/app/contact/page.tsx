export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Контакти
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Наша адреса
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            вул. Технологічна, 123
            <br />
            м. Київ, 01001
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Електронна пошта
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            info@myapp.com
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Телефон
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            +38 (044) 123-45-67
          </p>
        </div>
      </div>
    </div>
  );
} 