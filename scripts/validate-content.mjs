import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('src/content/posts');
const markdownFiles = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (entry.isFile() && entry.name.endsWith('.md')) markdownFiles.push(full);
  }
}

await walk(root);
const errors = [];
for (const file of markdownFiles) {
  const source = await readFile(file, 'utf8');
  const match = source.match(/^---\s*\n([\s\S]*?)\n---(?:\s*\n|$)/);
  const relative = path.relative(process.cwd(), file);
  if (!match) { errors.push(`${relative}: missing YAML frontmatter`); continue; }
  const frontmatter = match[1];
  for (const key of ['title', 'date', 'category']) {
    if (!new RegExp(`^${key}:\\s*.+$`, 'm').test(frontmatter)) errors.push(`${relative}: missing required field '${key}'`);
  }
  const date = frontmatter.match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})["']?\s*$/m)?.[1];
  if (!date || Number.isNaN(Date.parse(`${date}T00:00:00Z`))) errors.push(`${relative}: date must use YYYY-MM-DD`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Content validation passed: ${markdownFiles.length} Markdown files checked.`);
}
