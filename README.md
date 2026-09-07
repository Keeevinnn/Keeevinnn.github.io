# 个人主页 · Personal Site

一个纯静态的个人网页前端，风格参考「词元枢阁 Token Nexus」（米白网格背景 · 暖黑文字 · 蓝紫强调色 · 明暗双主题）。

## 项目结构

```
E:\personal-site\
├── index.html        # 主页（Hero + 能力板块 + 精选项目）
├── projects.html     # 项目页（搜索 + 分类筛选 + 卡片网格）
├── about.html        # 关于页（名片卡 + 技能标签 + 经历时间线）
├── contact.html      # 联系页（联系方式 + 留言表单）
├── css\
│   └── style.css     # 全站样式（含浅色/深色双主题）
├── js\
│   └── main.js       # 交互脚本（主题/导航/项目渲染/表单/动画）
└── README.md
```

## 本地打开

方式一：直接双击 `index.html` 即可在浏览器打开（纯静态，无需任何依赖）。

方式二：本地启动一个静态服务（可选）：

```bash
cd E:\personal-site
python -m http.server 8080
# 浏览器访问 http://localhost:8080
```

## 把网站改成你自己的

所有占位内容都标注了 `TODO`，共两类位置：

1. **HTML 页面内**（搜索 `TODO:`）：
   - 站名「个人主页 / Portfolio」
   - 首页 Hero 的「你的名字」、职业描述、技术栈
   - 关于页的头像、姓名、经历时间线
   - 联系页的邮箱、GitHub、Gitee 地址
   - 页脚版权

2. **`js/main.js` 顶部**：
   - `PROJECTS` 数组：项目列表（名称/简介/技术栈/分类/状态/链接），首页精选由 `featured: true` 控制
   - `SKILLS` 数组：关于页的技能标签

## 功能特性

- 浅色 / 深色 / 跟随系统 三档主题，选择会保存在本地（localStorage）
- 项目页：关键词搜索 + 分类筛选（数据驱动，改 `PROJECTS` 即自动更新）
- 联系页：表单前端校验 + 模拟提交反馈（未接后端，接入真实接口时修改 `initForm` 的提交逻辑）
- 滚动入场动画、移动端响应式导航
- 无第三方依赖、无构建步骤，可直接部署到任意静态托管（GitHub Pages / Gitee Pages / Nginx 等）
