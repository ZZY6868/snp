import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { SITE_CONFIG } from "./src/site.config";

export default defineConfig({
  site: SITE_CONFIG.url,
  base: SITE_CONFIG.base,
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes("/draft"),
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
  trailingSlash: "ignore",
});
