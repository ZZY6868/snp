/**
 * Site-wide configuration.
 *
 * IMPORTANT: Update these values before deploying.
 * - `url`: Your GitHub Pages URL (e.g., "https://username.github.io")
 * - `base`: "/" for user repos (username.github.io), "/repo-name/" for project repos
 * - GitHub Pages Settings → Source: "GitHub Actions"
 */
export const SITE_CONFIG = {
  /** Full URL of your deployed site (no trailing slash) */
  url: "https://zzy6868.github.io",
  /**
   * Base path for the site.
   * - "/" if deploying to a user/org Pages repo (username.github.io)
   * - "/repo-name/" if deploying to a project repo
   */
  base: "/snp/",
  /** Site title shown in header and SEO */
  title: "Snp",
  /** Short site description for SEO and intro */
  description: "A personal blog about technology, programming, and life.",
  /** Default author name */
  author: "Agent47",
  /** HTML lang attribute */
  lang: "zh-CN",
  /** Number of posts per page on blog list */
  postsPerPage: 10,
  /** Copyright years (e.g., "2026") */
  copyrightYears: "2026",
} as const;
