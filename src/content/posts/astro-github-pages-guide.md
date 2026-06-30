---
title: "使用 Astro 部署 GitHub Pages 完整指南"
description: "从零开始，使用 Astro 静态站点生成器搭建个人博客，并通过 GitHub Actions 自动部署到 GitHub Pages。"
pubDate: 2026-06-28
updatedDate: 2026-06-30
tags:
  - Astro
  - GitHub Pages
  - GitHub Actions
  - Tutorial
category: "Engineering"
draft: false
---

本文详细介绍如何使用 Astro 搭建博客并部署到 GitHub Pages。

## 技术栈

- **Astro** — 静态站点生成器
- **TypeScript** — 类型安全
- **Markdown / MDX** — 内容编写
- **GitHub Actions** — CI/CD 自动部署
- **GitHub Pages** — 免费托管

## 本地开发

安装依赖并启动开发服务器：

```bash
npm install
npm run dev
```

开发服务器默认在 `http://localhost:4321` 启动，支持热更新。

## 创建新文章

使用内置脚本快速创建文章：

```bash
npm run new:post "文章标题"
```

脚本会自动：

1. 生成带有日期的文件名
2. 写入 frontmatter 模板
3. 避免覆盖已有文件

## 文章管理

所有文章存放在 `src/content/posts/` 目录下，每篇文章是独立的 Markdown 文件。

### Frontmatter 示例

```yaml
---
title: "文章标题"
description: "文章摘要"
pubDate: 2026-06-30
tags:
  - Tag1
  - Tag2
category: "Engineering"
draft: false
---
```

### 草稿管理

将 `draft` 设置为 `true` 即可将文章标记为草稿。草稿文章在开发模式下可见，但不会出现在生产构建中。

## 部署流程

1. 将代码推送到 GitHub 仓库的 `main` 分支
2. GitHub Actions 自动触发构建
3. 构建产物部署到 GitHub Pages
4. 访问 `https://<username>.github.io/<repo>/` 查看网站

## 路径配置

部署时需要注意 base path 的配置：

- 用户主页仓库（`username.github.io`）：`base: "/"`
- 项目仓库：`base: "/repo-name/"`

配置在 `astro.config.mjs` 和 `src/site.config.ts` 中统一管理。

## 总结

Astro + GitHub Pages 的组合非常适合个人博客的长期维护——所有文章以文本文件形式存储在 Git 仓库中，通过 CI/CD 自动部署，无需服务器成本。
