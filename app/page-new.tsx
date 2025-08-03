import { getAllPosts } from '../lib/markdown';

interface AboutData {
  name: string;
  bio: string;
}

// This would typically come from a markdown file or config
const aboutData: AboutData = {
  name: "Your Name",
  bio: `Welcome to my personal website. I'm a developer, writer, and maker.
  
This is where I share my thoughts, learnings, and projects.`
};

export default function Home() {
  const blogPosts = getAllPosts('blog').slice(0, 7);
  const tilPosts = getAllPosts('til').slice(0, 7);
  const works = getAllPosts('works').slice(0, 5);

  return (
    <div className="space-y-8">
      {/* About Section */}
      <section>
        <h1 className="text-2xl mb-4">{aboutData.name}</h1>
        <div className="whitespace-pre-line">
          {aboutData.bio}
        </div>
      </section>

      {/* Blog Section */}
      {blogPosts.length > 0 && (
        <section>
          <h2 className="text-xl mb-4">BLOG</h2>
          <ul className="post-list">
            {blogPosts.map((post) => (
              <li key={post.slug}>
                <a href={`/blog/${post.slug}`} className="hover:text-white">
                  [{post.date}] {post.title}
                </a>
              </li>
            ))}
          </ul>
          {blogPosts.length === 7 && (
            <div className="mt-4">
              <a href="/blog" className="hover:text-white">MORE POSTS →</a>
            </div>
          )}
        </section>
      )}

      {/* TIL Section */}
      {tilPosts.length > 0 && (
        <section>
          <h2 className="text-xl mb-4">TODAY I LEARNED</h2>
          <ul className="post-list">
            {tilPosts.map((post) => (
              <li key={post.slug}>
                <a href={`/til/${post.slug}`} className="hover:text-white">
                  [{post.date}] {post.title}
                </a>
              </li>
            ))}
          </ul>
          {tilPosts.length === 7 && (
            <div className="mt-4">
              <a href="/til" className="hover:text-white">MORE TIL →</a>
            </div>
          )}
        </section>
      )}

      {/* Works Section */}
      {works.length > 0 && (
        <section>
          <h2 className="text-xl mb-4">WORKS</h2>
          <ul className="post-list">
            {works.map((work) => (
              <li key={work.slug}>
                <a href={`/works/${work.slug}`} className="hover:text-white">
                  [{work.date}] {work.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
