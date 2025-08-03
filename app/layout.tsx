import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WGETDJ - Personal Website",
  description: "A minimalist personal website with blog, TIL, and works sections",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
        <script>hljs.highlightAll();</script>
      </head>
      <body>
        <div className="header">
          <div className="logodiv">
            <div className="header-container">
              <a href="/" className="title">WGETDJ</a>
              <div className="content-area">
                <nav className="nav-menu">
                  <a href="/blog">BLOG</a>
                  <span className="nav-separator">/</span>
                  <a href="/til">TIL</a>
                  <span className="nav-separator">/</span>
                  <a href="/works">WORKS</a>
                </nav>
              </div>
            </div>
          </div>
        </div>
        
        <div id="page">
          <div id="content">
            {children}
          </div>
          
          <div id="footer">
          </div>
        </div>
      </body>
    </html>
  );
}
