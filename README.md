# SNP Blog

基于 [Astro](https://astro.build) 的静态个人博客，使用 Markdown 管理文章，通过 GitHub Actions 自动部署到 GitHub Pages。

## 功能

- 📝 Markdown / MDX 文章管理
- 🏷️ 标签和分类系统
- 📅 按年份/月份归档
- 🌙 跟随系统的暗色模式
- 📱 响应式设计（桌面 + 移动端）
- 🔍 SEO 优化（Open Graph、Canonical URL）
- 📡 RSS Feed
- 🗺️ Sitemap 自动生成
- ⚡ GitHub Actions 自动部署
- 📋 文章创建脚本

## 项目结构

```
.
├── .github/workflows/deploy.yml    # GitHub Actions 部署配置
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── scripts/
│   └── new-post.mjs                # 文章创建脚本
├── src/
│   ├── components/                 # UI 组件
│   │   ├── SEO.astro
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── PostCard.astro
│   │   └── TOC.astro
│   ├── content/
│   │   ├── config.ts               # 文章 Schema 定义
│   │   └── posts/                  # 文章 Markdown 文件
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── PostLayout.astro
│   ├── pages/
│   │   ├── index.astro             # 首页
│   │   ├── blog/
│   │   │   ├── index.astro         # 文章列表
│   │   │   └── [...slug].astro     # 文章详情
│   │   ├── tags/
│   │   │   ├── index.astro         # 标签列表
│   │   │   └── [tag].astro         # 标签文章列表
│   │   ├── categories/
│   │   │   ├── index.astro         # 分类列表
│   │   │   └── [category].astro    # 分类文章列表
│   │   ├── archive.astro           # 归档页
│   │   └── rss.xml.ts              # RSS Feed
│   ├── styles/
│   │   └── global.css              # 全局样式
│   ├── site.config.ts              # 站点配置
│   └── utils.ts                    # 工具函数
├── astro.config.mjs                # Astro 配置
├── package.json
├── tsconfig.json
└── README.md
```

## 本地开发

### 前置要求

- **Node.js** >= 18（推荐 LTS 版本）
- **npm** >= 9

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

浏览器访问 `http://localhost:4321`。开发服务器支持热更新，修改文章或代码后页面自动刷新。

### 构建检查

```bash
# 类型检查 + 生产构建
npm run build

# 本地预览生产构建
npm run preview
```

## 新建文章

使用内置脚本快速创建文章：

```bash
npm run new:post "文章标题"
```

脚本会自动：

1. 生成带日期的文件名（如 `2026-06-30-my-post-title.md`）
2. 填充 frontmatter 模板
3. 检查文件名冲突，避免覆盖已有文件

### 文章 Frontmatter

```yaml
---
title: "文章标题"           # 必填
description: "文章摘要"      # 必填，用于 SEO 和文章卡片
pubDate: 2026-06-30         # 必填，发布日期
updatedDate: 2026-06-30     # 可选，更新日期
tags:                        # 可选，标签列表
  - Astro
  - Blog
category: "Engineering"      # 可选，分类
draft: false                 # 可选，设为 true 则生产环境隐藏
author: "Author Name"        # 可选，覆盖默认作者
---
```

### 草稿管理

将 `draft: true` 设置为 true，该文章将：

- ✅ 在 `npm run dev` 开发模式下可见
- ❌ 在生产构建 (`npm run build`) 中隐藏
- ❌ 不会出现在 RSS Feed 中

## 部署到 GitHub Pages

### 1. 修改站点配置

编辑 `src/site.config.ts`：

```typescript
export const SITE_CONFIG = {
  url: "https://<username>.github.io",  // 改为你的 GitHub Pages URL
  base: "/",                             // 用户主页用 "/"，项目仓库用 "/repo-name/"
  title: "My Blog",                      // 你的博客标题
  description: "...",                    // 你的博客描述
  author: "Your Name",                   // 你的名字
  lang: "zh-CN",
  postsPerPage: 10,
  copyrightYears: "2026",
};
```

编辑 `astro.config.mjs`：

```javascript
export default defineConfig({
  site: SITE_CONFIG.url,
  base: SITE_CONFIG.base,
  // ...
});
```

### 2. 更新 robots.txt

编辑 `public/robots.txt`，将 `https://example.com` 改为你的站点 URL。

### 3. 创建 GitHub 仓库

- **用户/组织主页**：创建 `username.github.io` 仓库
- **项目仓库**：创建任意名称的仓库（如 `my-blog`）

### 4. 推送代码

```bash
git init
git add .
git commit -m "Initial commit: Astro blog"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

### 5. 配置 GitHub Pages

1. 进入仓库 **Settings** → **Pages**
2. **Source** 选择 **GitHub Actions**
3. 推送后，GitHub Actions 自动运行 `.github/workflows/deploy.yml`
4. 在 **Actions** 标签页查看构建进度
5. 构建完成后，访问 Settings → Pages 中显示的 URL

### 6. 手动触发部署

在 GitHub 仓库的 **Actions** 标签页 → **Deploy to GitHub Pages** → **Run workflow**。

## 常见问题

### 页面样式丢失（CSS 404）

通常是 **base path 配置错误**。

- 如果你的 URL 是 `https://username.github.io` 且为 `username.github.io` 仓库 → `base: "/"`
- 如果你的 URL 是 `https://username.github.io/my-blog` → `base: "/my-blog/"`

修改 `src/site.config.ts` 中的 `base` 字段，并相应修改 `astro.config.mjs`。**注意末尾斜杠**：`base` 必须以 `/` 开头，项目仓库还需以 `/` 结尾。

### 文章页面 404

检查文章 slug 和 URL 路径：

- 文章 `src/content/posts/my-post.md` → URL: `/blog/my-post`
- 中文文件名不影响 slug（slug 取自 frontmatter 或文件名本身）
- 检查文章 `draft` 是否为 `false`

### GitHub Actions 权限错误

确保仓库 Settings → Actions → General → Workflow permissions 设置为：

- **Read and write permissions**（推荐）
- 或至少勾选 **Allow GitHub Actions to create and approve pull requests**

如果使用组织仓库，管理员可能需要批准 Actions。

### RSS / Sitemap 地址错误

检查 `astro.config.mjs` 中的 `site` 是否配置为你的实际 URL。RSS 和 Sitemap 中的链接使用此值生成绝对 URL。

### 草稿文章为什么不显示

`draft: true` 的文章**仅在开发模式**下可见：
- `npm run dev` → ✅ 可见
- `npm run build` → ❌ 不可见
- GitHub Pages 部署 → ❌ 不可见

这是设计行为，确保未完成的文章不会意外发布。

### 配置自定义域名

1. 在 `public/` 目录下创建 `CNAME` 文件，内容为你的域名（如 `blog.example.com`）
2. 在 DNS 提供商处添加 CNAME 记录指向 `username.github.io`
3. 修改 `src/site.config.ts` 中的 `url` 为 `https://blog.example.com`
4. GitHub Pages 会自动配置 HTTPS

### 本地开发端口冲突

Astro 默认使用 `4321` 端口。如果端口被占用：

```bash
npm run dev -- --port 3000
```

## 技术栈

- [Astro](https://astro.build) — 静态站点生成器
- [TypeScript](https://www.typescriptlang.org/) — 类型安全
- Markdown / MDX — 内容编写
- GitHub Actions — CI/CD
- GitHub Pages — 托管

## 许可

MIT
