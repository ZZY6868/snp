---
title: "Hello World — 我的第一篇博文"
description: "这是使用 Astro 和 GitHub Pages 搭建个人博客的第一篇文章，介绍博客的搭建过程和功能。"
pubDate: 2026-06-25
tags:
  - Blog
  - Astro
category: "Engineering"
draft: false
---

欢迎来到我的个人博客！这是第一篇博文，记录了这个博客的搭建过程。

## 为什么选择 Astro

[Astro](https://astro.build) 是一个现代化的静态站点生成器，非常适合搭建内容为主的网站。它的核心理念是"零 JavaScript 优先"——默认情况下，页面不包含任何客户端 JavaScript，只在需要交互时才加载。

### Astro 的主要优势

1. **内容优先**：以 Markdown 和 MDX 为核心的内容管理
2. **零 JS 默认**：生成的页面是纯静态 HTML
3. **组件生态**：支持多种框架（React、Vue、Svelte 等）的组件
4. **出色的性能**：极小的构建产物，Lighthouse 满分

## 博客的功能

这个博客支持以下功能：

- 📝 **Markdown 写作**：所有文章以 Markdown 格式维护
- 🏷️ **标签和分类**：文章可以设置标签和分类
- 📅 **归档**：按年份和月份归档
- 🔍 **SEO 优化**：自动生成 sitemap 和 RSS
- 🌙 **暗色模式**：跟随系统主题自动切换
- 📱 **响应式设计**：适合桌面和移动端阅读

## 代码示例

下面是一个简单的 JavaScript 代码示例：

```javascript
function greet(name) {
  return `Hello, ${name}! Welcome to my blog.`;
}

console.log(greet("World"));
```

以及一段 TypeScript 代码：

```typescript
interface Post {
  title: string;
  pubDate: Date;
  tags: string[];
  draft: boolean;
}

const getPublishedPosts = (posts: Post[]): Post[] =>
  posts
    .filter((p) => !p.draft)
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
```

## 结语

这个博客会持续更新技术文章和生活记录。如果你有任何问题或建议，欢迎通过 RSS 订阅或在 GitHub 上提 Issue。
