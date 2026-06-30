/**
 * new-post.mjs — Create a new blog post from the command line.
 *
 * Usage:
 *   npm run new:post "My Post Title"
 *
 * Generates: src/content/posts/YYYY-MM-DD-slug.md
 */

import { writeFile, access, mkdir } from "node:fs/promises";
import { constants } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const postsDir = join(__dirname, "..", "src", "content", "posts");

const title = process.argv[2];

if (!title || title.trim().length === 0) {
  console.error('Usage: npm run new:post "Post Title"');
  console.error("  Provide a post title as a quoted argument.");
  process.exit(1);
}

const now = new Date();
const dateStr = now.toISOString().split("T")[0]; // YYYY-MM-DD

/**
 * Generate a URL-safe slug from text.
 * Extracts ASCII words; falls back to a short timestamp-based ID for
 * titles that contain only non-ASCII characters (e.g., Chinese).
 */
function slugify(text) {
  const asciiWords = text.match(/[a-zA-Z0-9]+/g);
  if (asciiWords && asciiWords.length > 0) {
    return asciiWords.join("-").toLowerCase();
  }
  // Fallback: use timestamp-based short ID
  return `post-${Date.now().toString(36)}`;
}

const slug = slugify(title);
const filename = `${dateStr}-${slug}.md`;
const filepath = join(postsDir, filename);

// Ensure posts directory exists
await mkdir(postsDir, { recursive: true });

// Check for existing file to avoid overwriting
try {
  await access(filepath, constants.F_OK);
  console.error(`Error: File already exists: src/content/posts/${filename}`);
  console.error("  Choose a different title or remove the existing file first.");
  process.exit(1);
} catch {
  // File doesn't exist, proceed
}

const frontmatter = [
  "---",
  `title: "${title}"`,
  'description: ""',
  `pubDate: ${dateStr}`,
  "tags: []",
  'category: ""',
  "draft: false",
  "---",
  "",
  "Write your content here.",
  "",
].join("\n");

await writeFile(filepath, frontmatter, "utf-8");
console.log(`Created: src/content/posts/${filename}`);
console.log("");
console.log("Frontmatter fields:");
console.log("  title — Post title");
console.log("  description — Post summary for SEO and post cards");
console.log("  pubDate — Publication date (YYYY-MM-DD)");
console.log("  updatedDate — (optional) Last updated date");
console.log("  tags — List of tags e.g. [Astro, Blog]");
console.log("  category — (optional) Primary category");
console.log("  draft — Set to true to hide from production");
