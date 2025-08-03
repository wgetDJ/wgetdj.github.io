import { getAllPosts } from '../../lib/markdown';

export default function TilIndex() {
  const posts = getAllPosts('til');

  return (
    <div>
      <div className="title">TODAY I LEARNED</div>
      
      {posts.length === 0 ? (
        <p>No TIL posts yet.</p>
      ) : (
        <div id="list">
          {posts.map((post) => (
            <li key={post.slug}>
              <span className="post-meta">[{post.date}]</span>
              <a href={`/til/${post.slug}`}>{post.title}</a>
            </li>
          ))}
        </div>
      )}
    </div>
  );
}
