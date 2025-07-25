// @ts-nocheck
import React from 'react';
import Image from 'next/image';
import styles from './BlogPost.module.css';
import BlogComments from '@/components/BlogComments/BlogComments';
import { getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Статтю не знайдено',
      description: 'Запитана стаття не існує'
    };
  }

  return {
    title: post.title,
    description: post.excerpt
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.date}>{post.date}</div>
      </header>

      <div className={styles.mainImageContainer}>
        <Image
          src={post.mainImage}
          alt={post.title}
          fill
          className={styles.mainImage}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className={styles.content}>
        {post.content.map((section, index) => {
          switch (section.type) {
            case 'text':
              return <p key={index} className={styles.paragraph}>{section.content}</p>;
            case 'heading':
              return <h2 key={index} className={styles.sectionHeading}>{section.content}</h2>;
            case 'image':
              return (
                <div key={index} className={styles.imageContainer}>
                  <Image
                    src={section.content}
                    alt="Ілюстрація до статті"
                    fill
                    className={styles.contentImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              );
            default:
              return null;
          }
        })}
      </div>

      <BlogComments postSlug={params.slug} />
    </article>
  );
} 