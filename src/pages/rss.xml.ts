import rss from "@astrojs/rss";
import { SITE_CONFIG } from "../site.config";
import { getPublishedPosts } from "../utils";

export async function GET() {
  const posts = await getPublishedPosts();

  return rss({
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    site: SITE_CONFIG.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.slug}`,
      categories: [
        ...post.data.tags,
        ...(post.data.category ? [post.data.category] : []),
      ],
    })),
    customData: `<language>${SITE_CONFIG.lang}</language>`,
  });
}
