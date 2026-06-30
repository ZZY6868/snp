import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

/**
 * Get all published posts sorted by date descending.
 */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection(
    "posts",
    (entry: CollectionEntry<"posts">) => {
      return import.meta.env.PROD ? !entry.data.draft : true;
    },
  );
  return posts.sort(
    (a: Post, b: Post) =>
      b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

/**
 * Extract headings from raw markdown body for TOC generation.
 */
export function getHeadings(
  body: string,
): { depth: number; text: string; slug: string }[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const headings: { depth: number; text: string; slug: string }[] = [];
  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(body)) !== null) {
    const depth = match[1].length;
    const text = match[2].trim();
    // Generate slug matching what rehype-slug would produce (if we used it)
    const slug = text
      .toLowerCase()
      .replace(/[^\w一-鿿\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/(^-|-$)/g, "");
    headings.push({ depth, text, slug });
  }
  return headings;
}

/**
 * Get all unique tags with post counts.
 */
export function getTagsWithCount(
  posts: Post[],
): { tag: string; count: number }[] {
  const tagMap = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }
  }
  return [...tagMap.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/**
 * Get all unique categories with post counts.
 */
export function getCategoriesWithCount(
  posts: Post[],
): { category: string; count: number }[] {
  const catMap = new Map<string, number>();
  for (const post of posts) {
    const cat = post.data.category;
    if (cat) {
      catMap.set(cat, (catMap.get(cat) || 0) + 1);
    }
  }
  return [...catMap.entries()]
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category));
}

/**
 * Filter posts by tag.
 */
export function filterPostsByTag(posts: Post[], tag: string): Post[] {
  return posts.filter((p) => p.data.tags.includes(tag));
}

/**
 * Filter posts by category.
 */
export function filterPostsByCategory(
  posts: Post[],
  category: string,
): Post[] {
  return posts.filter((p) => p.data.category === category);
}

/**
 * Group posts by year and month for archive view.
 */
export function groupPostsByYearMonth(
  posts: Post[],
): { year: number; months: { month: number; posts: Post[] }[] }[] {
  const yearMap = new Map<number, Map<number, Post[]>>();
  for (const post of posts) {
    const d = post.data.pubDate;
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    if (!yearMap.has(year)) yearMap.set(year, new Map());
    const monthMap = yearMap.get(year)!;
    if (!monthMap.has(month)) monthMap.set(month, []);
    monthMap.get(month)!.push(post);
  }
  return [...yearMap.entries()]
    .map(([year, monthMap]) => ({
      year,
      months: [...monthMap.entries()]
        .map(([month, posts]) => ({ month, posts }))
        .sort((a, b) => b.month - a.month),
    }))
    .sort((a, b) => b.year - a.year);
}

/**
 * Get adjacent posts for prev/next navigation.
 * Posts are sorted newest-to-oldest (index 0 = newest).
 * "Previous" = chronologically older (published before this post).
 * "Next"     = chronologically newer (published after this post).
 */
export function getAdjacentPosts(
  posts: Post[],
  currentSlug: string,
): { prev: Post | null; next: Post | null } {
  const idx = posts.findIndex((p) => p.slug === currentSlug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx < posts.length - 1 ? posts[idx + 1] : null,
    next: idx > 0 ? posts[idx - 1] : null,
  };
}
