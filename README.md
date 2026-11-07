# boxueduocai · Immersive Blog 2.0

一个以 Astro 为基础的个人博客重构版本：保留 Liquid Glass 的视觉识别度，同时把文章阅读、路由、性能和维护性放在第一位。

## 设计原则

- Astro 继续作为静态站点框架，不迁移到 Jekyll / Hexo / Hugo。
- 文章使用独立 URL 和普通滚动，不使用一镜到底、FLIP 或整页扩散动画。
- 真正的折射效果只用于少量高优先级控件；正文不使用高强度透明玻璃。
- `backdrop-filter` 有纯色背景降级；移动端使用更轻的材质。
- 支持深浅色切换、搜索、文章目录、阅读进度、代码复制、分类、标签、归档、RSS、Sitemap、Twikoo 评论和可选音乐播放器。
- 无第三方字体 CDN、无全屏粒子背景、无强制自动播放音乐。

## 环境要求

- Node.js 20.19+ 或 22.12+
- npm 10+

## 本地运行

```bash
npm install
npm run dev
```

生产构建与预览：

```bash
npm run validate:content
npm run check
npm run build
npm run preview
```

## 目录结构

```text
src/
├── components/
│   ├── comments/       # 评论组件
│   ├── glass/          # 玻璃表面组件
│   ├── layout/         # Header / Footer / 页面框架
│   ├── navigation/     # 搜索面板与导航
│   ├── posts/          # 文章卡片与列表
│   ├── reader/         # 文章目录、阅读进度、文章工具
│   └── widgets/        # 作者卡片、标签云等
├── config/             # 站点、外观、功能、集成配置
├── content/posts/      # Markdown 文章
├── data/               # 播放列表等站点数据
├── layouts/            # 页面 Layout
├── lib/                # 内容查询、URL 工具
├── pages/              # Astro 路由
├── scripts/            # 浏览器端功能
├── styles/             # Tokens、基础、组件、阅读样式
└── content.config.ts   # 文章字段校验
```

根目录 `scripts/validate-content.mjs` 用于在构建前检查文章 Frontmatter。

## 新增文章

在 `src/content/posts/` 新建 `.md` 文件：

```md
---
title: 文章标题
date: "2026-11-07"
category: 技术折腾
tags: [Astro, 前端]
excerpt: 一句话摘要。
pinned: false
draft: false
---

从这里开始写正文。
```

文章文件名会成为 URL，例如 `my-first-post.md` 对应 `/posts/my-first-post/`。

## 全局配置

- `src/config/site.ts`：站点标题、作者、简介、社交链接。
- `src/config/appearance.ts`：配色与玻璃材质参数。
- `src/config/features.ts`：功能开关。
- `src/config/integrations.ts`：Twikoo 与外部服务设置。

## 管理页面

`/admin/` 提供 Twikoo 管理员入口，使用原有环境地址；登录凭据由 Twikoo 管理端处理，本站不保存管理员密码。

## 评论系统

默认保留原项目的 Twikoo 环境地址：`https://kwitoo-bxdc.vercel.app`。如更换服务，请修改 `src/config/integrations.ts`。评论脚本采用可见时才加载的方式；网络或服务不可用时会显示提示，不影响文章正文。

## 图片、音乐与原仓库资源

本交付包含自绘 SVG 头像与站点标识，避免依赖第三方图片服务。出于当前环境无法从原仓库下载二进制文件，本包没有复制原仓库中的 PNG 头像和 MP3 音频。需要恢复旧图片时，将文件放到 `public/assets/images/` 并修改 `src/config/site.ts`；音乐功能默认关闭；播放器组件和播放逻辑已准备好，若要启用，请先把有权使用的音频放入 `public/assets/music/`，确认 `src/data/music.ts` 中的路径正确，再把 `src/config/features.ts` 的 `musicPlayer` 改为 `true`。

## 液态玻璃实现说明

本站使用渐进增强策略：常规环境使用 `backdrop-filter`、透明层、内外高光和边缘色彩；不支持滤镜时回退到足够不透明的纯色面板。它是 Web 端的 Liquid Glass 风格实现，不是 Apple 官方 API，也不宣称 CSS 模糊等同于真实光学折射。此前自研的 WebGL2 实验仓库可独立继续研究，不直接挂载为全站背景渲染器。

## GitHub Pages 部署

仓库已包含 Actions 工作流。将代码推送到 `main` 后会执行 `npm install`、Astro 检查和构建，再发布 `dist/`。在 GitHub 仓库 Settings → Pages 中选择 GitHub Actions。

项目仓库会自动使用 `/仓库名/` 作为 base；若使用自定义域名，请设置 `SITE_URL`，并按域名部署情况设置 `BASE_PATH`。GitHub Actions 默认 canonical origin 为 `https://boxueduocai666.github.io`。

## Vercel 部署

直接导入仓库，Framework Preset 选择 Astro，Build Command 使用 `npm run build`，Output Directory 使用 `dist`。Vercel 构建默认 canonical origin 为当前博客的 `https://bxdcblog.vercel.app`；若绑定了其他正式域名，请设置 `SITE_URL` 环境变量。

## 改版范围与后续事项

当前版本是结构与 UI 的完整首版，不覆盖原仓库。原仓库仍应保留作为回滚备份。交付前应在可联网环境执行 `npm install && npm run check && npm run build`，并使用真实移动设备测试 Chrome / Edge / Safari / UC / QQ / 华为浏览器以及中国大陆不同运营商线路。
