# Personal Website

A minimalist personal website inspired by [n-o-d-e.net](https://n-o-d-e.net/), built with Next.js and designed for GitHub Pages hosting.

## Features

- **Markdown-powered content**: Write blog posts, TIL, and works in markdown
- **Auto-generated art**: SVG art generation for posts without images
- **Syntax highlighting**: Atom One Dark theme for code blocks
- **Responsive design**: Clean, terminal-inspired aesthetic
- **GitHub Pages ready**: Automatic static site generation and deployment

## Quick Start

### Development

1. **Clone and install**:
```bash
git clone <your-repo>
cd blog
npm install
```

2. **Start development server**:
```bash
npm run dev
```

3. **Build for production**:
```bash
npm run build
npm run export
```

### Deployment to GitHub Pages

1. **Enable GitHub Pages** in your repository settings
2. **Push to main branch** - GitHub Actions will automatically build and deploy
3. **Custom domain** (optional): Add `CNAME` file to `public/` directory

## Content Structure

Add markdown files to these directories:

- `content/blog/` - Blog posts
- `content/til/` - Today I Learned posts  
- `content/works/` - Project showcases
- `content/about.md` - About page content

### Frontmatter Format

```markdown
---
title: "Your Post Title"
date: "2025-01-15" (optional - uses file date if not specified)
excerpt: "Brief description for listings"
image: "path/to/image.jpg" (optional - generates SVG art if not provided)
---

Your content in markdown...
```

## Customization

- **Colors/Fonts**: Edit `app/globals.css`
- **Navigation**: Modify `app/layout.tsx`
- **Auto-generated art**: Customize `lib/generateArt.ts`

## Tech Stack

- **Next.js 15** - React framework with static generation
- **TypeScript** - Type safety
- **Remark** - Markdown processing
- **Highlight.js** - Syntax highlighting
- **Share Tech Mono** - Authentic n-o-d-e.net typography

## License

MIT License - feel free to use and modify for your own projects.
Same structure, but for showcasing projects and work.

## Customization

- Edit `app/page.tsx` to update your name and bio
- Modify `app/layout.tsx` for navigation changes
- Update `app/globals.css` for styling tweaks
- Change `next.config.ts` basePath for your repository name

## Deployment

### GitHub Pages (Automatic)

1. Push to your GitHub repository
2. Go to repository Settings > Pages
3. Set Source to "GitHub Actions"
4. The site will auto-deploy on every push to main

### Manual Build

```bash
npm run build
```

The static files will be in the `out/` directory.

## File Organization

```
├── app/                 # Next.js app directory
│   ├── blog/           # Blog routes
│   ├── til/            # TIL routes  
│   ├── works/          # Works routes
│   └── layout.tsx      # Main layout
├── content/            # Markdown content
│   ├── blog/          # Blog posts
│   ├── til/           # TIL posts
│   └── works/         # Works/projects
├── lib/               # Utilities
│   └── markdown.ts    # Markdown processing
└── .github/           # GitHub Actions
    └── workflows/
        └── deploy.yml # Auto-deployment
```

## Writing Content

Just create a `.md` file in the appropriate content folder and push to GitHub. The site will automatically:

- Generate a webpage for your post
- Add it to the homepage listings
- Include publish and last modified dates
- Apply syntax highlighting to code blocks
- Make it accessible via clean URLs

## Design Philosophy

This site follows the minimalist, terminal-inspired aesthetic of n-o-d-e.net:
- Black background with green terminal text
- Monospace fonts throughout
- Simple navigation
- Content-focused design
- Fast loading and accessible

## License

MIT
