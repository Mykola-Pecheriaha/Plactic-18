import Link from 'next/link';
import Image from 'next/image';

const blogPosts = [
  {
    id: 'rhinoplasty-myths',
    title: 'Міфи про ринопластику: що потрібно знати',
    excerpt: 'Розвінчуємо найпоширеніші міфи про операцію з корекції носа та розповідаємо про реальні факти.',
    date: '2024-03-21',
    image: '/images/blog/rhinoplasty-myths.jpg',
    category: 'Ринопластика'
  },
  {
    id: 'preparing-for-surgery',
    title: 'Як підготуватися до пластичної операції',
    excerpt: 'Корисні поради та рекомендації для пацієнтів, які планують пластичну операцію.',
    date: '2024-03-18',
    image: '/images/blog/surgery-preparation.jpg',
    category: 'Загальне'
  },
  {
    id: 'post-surgery-care',
    title: 'Догляд після операції: важливі моменти',
    excerpt: 'Рекомендації щодо відновлення та догляду за собою після пластичної операції.',
    date: '2024-03-15',
    image: '/images/blog/post-surgery.jpg',
    category: 'Реабілітація'
  }
];

export default function Blog() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Блог
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Link 
            key={post.id}
            href={`/blog/${post.id}`}
            className="group block"
          >
            <article className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm transition-transform group-hover:scale-105">
              <div className="relative w-full aspect-video">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-sm text-accent-color">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString('uk-UA')}
                  </span>
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-accent-color">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {post.excerpt}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Підписатися на оновлення
        </h2>
        <form className="max-w-md mx-auto">
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-accent-color text-white rounded-lg hover:bg-accent-color-dark transition-colors"
            >
              Підписатися
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 