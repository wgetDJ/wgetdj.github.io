import { getAllPostSlugs, getPostData } from '../../../lib/markdown';
import { notFound } from 'next/navigation';

interface Params {
  slug: string;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs('til');
  return slugs.map(({ params }) => ({
    slug: params.slug,
  }));
}

export default async function TilPost({ 
  params 
}: { 
  params: Promise<Params>
}) {
  const resolvedParams = await params;
  
  try {
    const post = await getPostData('til', resolvedParams.slug);

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
              Published: {post.date}
            </div>
          </header>
          
          <div 
            className="content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <footer style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #444' }}>
            <a href="/til">← Back to TIL</a>
          </footer>
        </article>
      </>
    );
  } catch (error) {
    notFound();
  }
}
