import { promises as fs } from 'fs';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  mainImage: string;
  excerpt: string;
  content: {
    type: 'text' | 'image' | 'heading';
    content: string;
  }[];
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const postsDirectory = path.join(process.cwd(), 'src/content/blog/posts');
    const fileNames = await fs.readdir(postsDirectory);
    
    const posts = await Promise.all(
      fileNames
        .filter(fileName => fileName.endsWith('.json'))
        .map(async (fileName) => {
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = await fs.readFile(fullPath, 'utf8');
          return JSON.parse(fileContents) as BlogPost;
        })
    );

    return posts.sort((post1, post2) => {
      // Сортування за датою (найновіші спочатку)
      const date1 = new Date(post1.date);
      const date2 = new Date(post2.date);
      return date2.getTime() - date1.getTime();
    });
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(process.cwd(), 'src/content/blog/posts', `${slug}.json`);
    const fileContents = await fs.readFile(fullPath, 'utf8');
    return JSON.parse(fileContents) as BlogPost;
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
} 