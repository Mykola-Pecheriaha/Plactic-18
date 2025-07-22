import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Blog.module.css';
import { getAllPosts } from '@/lib/blog';

export default async function BlogPage() {
  const blogPosts = await getAllPosts();

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Блог Миколи Печеряги</h1>
      
      <div className={styles.blogGrid}>
        {blogPosts.map((post) => (
          <article key={post.slug} className={styles.blogPost}>
            <div className={styles.imageContainer}>
              <Image
                src={post.mainImage}
                alt={post.title}
                fill
                className={styles.image}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className={styles.socialStats}>
                <span>❤ 0</span>
                <span>💬 0</span>
              </div>
            </div>
            
            <div className={styles.postContent}>
              <div className={styles.date}>{post.date}</div>
              <h2 className={styles.title}>{post.title}</h2>
              <p className={styles.excerpt}>{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                Детальніше →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 