# 个人主页 · Personal Site

单页展示型个人官网，**苹果官网设计风格**（深空黑/莫兰迪浅灰双主题 · 毛玻璃 · 大圆角 · 极简高级），双端响应式，可直接静态部署。

线上地址：**https://keeevinnn.github.io/**

## 项目结构

```
E:\personal-site\
├── index.html        # 单页官网（导航 / Hero / 关于我 / 项目作品 / 联系方式 / 页脚）
├── css\
│   └── style.css     # 苹果风设计系统（双主题变量、毛玻璃、动效、响应式）
├── js\
│   └── main.js       # SITE 配置 + 全部交互（主题/导航/弹窗/复制/懒加载/返回顶部）
└── README.md
```

## ★ 如何改成你自己的信息（唯一入口）

所有个人真实信息统一用「XX」占位，**只需修改 `js/main.js` 顶部的 `SITE` 配置对象**，全站自动生效，无需改动 HTML 结构：

| 配置项 | 说明 |
|---|---|
| `brand` / `name` | 昵称（Logo）与姓名 |
| `hero` | 首屏主标题、副标题、座右铭 |
| `avatar` | 头像图片 URL（留空显示 XX 占位） |
| `basic` | 年龄 / 所在地 / 职业 |
| `intro` | 个人简介（可多段，支持 `<b>` 加粗） |
| `skills` | 技能标签（可增删） |
| `timeline` | 经历履历（教育/工作，可增删） |
| `projects` | 作品数组：名称/简介/技术栈/时间/分类/封面/链接/详情；**清空为 `[]` 自动显示"暂无作品"空状态** |
| `contacts` | 社交渠道：GitHub / Gitee / 小红书 / 邮箱 / 微信（type: link=跳转，copy=一键复制） |
| `footer` | 版权年份、署名、可选 ICP 备案文案（`icp` 字段） |

## 功能清单

- 全局吸顶导航（毛玻璃、滚动高亮当前板块、移动端汉堡菜单）
- Hero 首屏：全屏适配、轻微视差、极简粒子动画、主按钮跳转
- 关于我：基础信息卡 / 分段简介 / 技能标签悬浮高亮 / 时间轴履历
- 项目作品：自适应网格（PC 三列 → 平板两列 → 手机单列）、悬浮特效、点击弹窗详情、GitHub/在线预览跳转、空状态
- 联系方式：图标卡片、**一键复制邮箱/微信号 + 成功提示**、轻量留言板（前端模拟）
- 深色/浅色模式切换（localStorage 持久化）
- 返回顶部、平滑滚动、图片懒加载、滚动入场动画
- SEO 基础（title / description / keywords / OG / 语义化标签）、`prefers-reduced-motion` 无障碍适配
- 无第三方依赖、无构建步骤，兼容 Chrome / Edge / Safari

## 本地预览与部署

```bash
# 本地预览
cd E:\personal-site
python -m http.server 8080     # 访问 http://localhost:8080

# 部署（推送后 GitHub Pages 约 1-2 分钟自动更新）
git add -A
git commit -m "更新内容"
git push
```
