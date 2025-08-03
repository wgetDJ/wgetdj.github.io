import { getAllPosts } from '../../lib/markdown';

export default function WorksIndex() {
  const posts = getAllPosts('works');

  return (
    <div>
      <div className="title">WORKS</div>
      
      {posts.length === 0 ? (
        <p>No works yet.</p>
      ) : (
        <div id="list">
          {posts.map((post) => (
            <li key={post.slug}>
              <span className="post-meta">[{post.date}]</span>
              <a href={`/works/${post.slug}`}>{post.title}</a>
            </li>
          ))}
        </div>
      )}
    </div>
  );
}
