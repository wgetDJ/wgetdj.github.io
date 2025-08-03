import { getAllPosts } from '../../lib/markdown';

export default function BlogIndex() {
  const posts = getAllPosts('blog');

  return (
    <div>
      <div className="title">BLOG</div>
      
      {posts.length === 0 ? (
        <p>No blog posts yet.</p>
      ) : (
        <div id="list">
          {posts.map((post) => (
            <li key={post.slug}>
              <span className="post-meta">[{post.date}]</span>
              <a href={`/blog/${post.slug}`}>{post.title}</a>
            </li>
          ))}
        </div>
      )}
    </div>
  );
}
