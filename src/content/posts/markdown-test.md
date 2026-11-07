---
title: Markdown 增强功能测试
date: "2026-08-19"
category: 技术折腾
tags: [Markdown, 测试, 前端]
excerpt: 测试代码块、列表、引用、表格和图片等常用 Markdown 内容。
pinned: false
draft: false
---

这篇文章用于检查新版博客的 Markdown 阅读体验。

## 代码块复制

鼠标悬停在代码块右上角会出现复制按钮：

```javascript
function hello() {
  console.log("Hello, World!");
  return { status: "ok", data: [1, 2, 3] };
}
```

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))
```

## 提示与说明

> [!NOTE]
> 文章正文采用普通阅读表面，避免玻璃透明度影响长时间阅读。

> [!TIP]
> 可以在 Markdown 中正常使用标题、列表、链接和代码块。

## 表格

| 项目 | 处理方式 |
| --- | --- |
| 页面切换 | 使用独立路由 |
| 阅读布局 | 普通滚动 |
| 玻璃材质 | 只用于少量界面组件 |
