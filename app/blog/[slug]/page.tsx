import { getAllPostSlugs, getPostData } from '../../../lib/markdown';
import { notFound } from 'next/navigation';

interface Params {
  slug: string;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs('blog');
  return slugs.map(({ params }) => ({
    slug: params.slug,
  }));
}

export default async function BlogPost({ 
  params 
}: { 
  params: Promise<Params>
}) {
  const resolvedParams = await params;
  
  try {
    const post = await getPostData('blog', resolvedParams.slug);

    return (
      <>
        <script dangerouslySetInnerHTML={{
          __html: `
            if (typeof hljs !== 'undefined') {
              hljs.highlightAll();
            }
          `
        }} />
        <article>
          <header>
            <div className="title">{post.title}</div>
            <div className="post-meta">
              Published: {post.date} | Last modified: {post.lastModified}
            </div>
          </header>
          
          <div 
            className="content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <footer style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #444' }}>
            <a href="/blog">← Back to Blog</a>
          </footer>
        </article>
      </>
    );
  } catch (error) {
    notFound();
  }
}
