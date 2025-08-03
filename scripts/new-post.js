#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length < 2) {
  console.log('Usage: npm run new-post <type> <title>');
  console.log('Types: blog, til, works');
  console.log('Example: npm run new-post blog "My New Blog Post"');
  process.exit(1);
}

const [type, title] = args;
const validTypes = ['blog', 'til', 'works'];

if (!validTypes.includes(type)) {
  console.error(`Invalid type: ${type}. Must be one of: ${validTypes.join(', ')}`);
  process.exit(1);
}

// Create slug from title
const slug = title
  .toLowerCase()
  .replace(/[^\w\s-]/g, '') // Remove special characters
  .replace(/\s+/g, '-') // Replace spaces with hyphens
  .trim();

const date = new Date().toISOString().split('T')[0];
const contentDir = path.join(process.cwd(), 'content', type);
const filePath = path.join(contentDir, `${slug}.md`);

// Ensure directory exists
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

// Check if file already exists
if (fs.existsSync(filePath)) {
  console.error(`File already exists: ${filePath}`);
  process.exit(1);
}

// Create markdown template
const template = `---
title: "${title}"
date: "${date}"
excerpt: "Add a brief description here"
---

# ${title}

Your content goes here...

## Section

Add your content using markdown syntax.

\`\`\`javascript
// Code example
console.log("Hello, World!");
\`\`\`
`;

fs.writeFileSync(filePath, template);
console.log(`Created new ${type} post: ${filePath}`);
console.log(`Edit the file and push to deploy!`);
