import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  lastModified: string;
  content: string;
  excerpt?: string;
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function getFileStats(filePath: string) {
  const stats = fs.statSync(filePath);
  return {
    created: formatDate(stats.birthtime),
    modified: formatDate(stats.mtime)
  };
}

function enhanceHTML(html: string): string {
  return html.replace(/<pre><code class="language-(\w+)">/g, '<pre><code class="hljs language-$1">');
}

export async function getPostData(type: 'blog' | 'til' | 'works', slug: string): Promise<PostData> {
  const fullPath = path.join(contentDirectory, type, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { created, modified } = getFileStats(fullPath);

  const matterResult = matter(fileContents);
  
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(matterResult.content);
  
  const contentHtml = enhanceHTML(processedContent.toString());

  return {
    slug,
    title: matterResult.data.title || slug,
    date: matterResult.data.date || created,
    lastModified: modified,
    content: contentHtml,
    excerpt: matterResult.data.excerpt || ''
  };
}

export function getAllPosts(type: 'blog' | 'til' | 'works'): PostData[] {
  const fullPath = path.join(contentDirectory, type);
  
  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const fileNames = fs.readdirSync(fullPath);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const filePath = path.join(fullPath, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { created, modified } = getFileStats(filePath);
      
      const matterResult = matter(fileContents);

      return {
        slug,
        title: matterResult.data.title || slug,
        date: matterResult.data.date || created,
        lastModified: modified,
        content: '',
        excerpt: matterResult.data.excerpt || ''
      };
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostSlugs(type: 'blog' | 'til' | 'works'): { params: { slug: string } }[] {
  const fullPath = path.join(contentDirectory, type);
  
  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const fileNames = fs.readdirSync(fullPath);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, '')
        }
      };
    });
}
