import { getAllPosts } from '../lib/markdown';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function getAboutData() {
  try {
    const aboutPath = path.join(process.cwd(), 'content', 'about.md');
    const fileContents = fs.readFileSync(aboutPath, 'utf8');
    const { data } = matter(fileContents);
    return {
      name: data.name || "Your Name",
      bio: data.bio || "Welcome to my personal website."
    };
  } catch (error) {
    return {
      name: "Your Name",
      bio: "Welcome to my personal website. I'm a developer, writer, and maker.\n\nThis is where I share my thoughts, learnings, and projects."
    };
  }
}

export default function Home() {
  const aboutData = getAboutData();
  const blogPosts = getAllPosts('blog').slice(0, 7);
  const tilPosts = getAllPosts('til').slice(0, 7);
  const works = getAllPosts('works').slice(0, 5);

  return (
    <div>
      {/* About Section */}
      <div className="title">{aboutData.name}</div>
      <div className="about-content">
        {aboutData.bio}
      </div>

      {/* Blog Section */}
      {blogPosts.length > 0 && (
        <div>
          <div className="subtitle">BLOG</div>
          <div id="list">
            {blogPosts.map((post) => (
              <li key={post.slug}>
                <span className="post-meta">[{post.date}]</span>
                <a href={`/blog/${post.slug}`}>{post.title.toUpperCase()}</a>
              </li>
            ))}
            {blogPosts.length === 7 && (
              <li>
                <a href="/blog">MORE POSTS →</a>
              </li>
            )}
          </div>
        </div>
      )}

      {/* TIL Section */}
      {tilPosts.length > 0 && (
        <div>
          <div className="subtitle">TODAY I LEARNED</div>
          <div id="list">
            {tilPosts.map((post) => (
              <li key={post.slug}>
                <span className="post-meta">[{post.date}]</span>
                <a href={`/til/${post.slug}`}>{post.title.toUpperCase()}</a>
              </li>
            ))}
            {tilPosts.length === 7 && (
              <li>
                <a href="/til">MORE TIL →</a>
              </li>
            )}
          </div>
        </div>
      )}

      {/* Works Section */}
      {works.length > 0 && (
        <div>
          <div className="subtitle">WORKS</div>
          <div id="list">
            {works.map((work) => (
              <li key={work.slug}>
                <span className="post-meta">[{work.date}]</span>
                <a href={`/works/${work.slug}`}>{work.title.toUpperCase()}</a>
              </li>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
