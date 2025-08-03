import { getAllPosts } from '../lib/markdown';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

async function getAboutData() {
  try {
    const aboutPath = path.join(process.cwd(), 'content', 'about.md');
    const fileContents = fs.readFileSync(aboutPath, 'utf8');
    const { data } = matter(fileContents);
    
    // Process bio markdown to HTML
    const processedBio = await remark()
      .use(remarkHtml)
      .process(data.bio || "Welcome to my personal website.");
    
    // Add target="_blank" to external links
    const bioWithTargets = processedBio.toString().replace(
      /<a href="https?:\/\/[^"]*"/g,
      '$& target="_blank" rel="noopener noreferrer"'
    );
    
    return {
      name: data.name || "Dibyajyoti Mishra",
      bio: bioWithTargets
    };
  } catch (error) {
    return {
      name: "Dibyajyoti Mishra",
      bio: "Silent Talks"
    };
  }
}

export default async function Home() {
  const aboutData = await getAboutData();
  const blogPosts = getAllPosts('blog').slice(0, 7);
  const tilPosts = getAllPosts('til').slice(0, 7);

  return (
    <div>
      {/* About Section */}
      <div className="title">{aboutData.name}</div>
      <div 
        className="about-content"
        dangerouslySetInnerHTML={{ __html: aboutData.bio }}
      />

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
    </div>
  );
}
