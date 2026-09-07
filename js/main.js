/* ==========================================================================
 * 个人主页 · 交互脚本
 * 功能：主题切换 / 移动端导航 / 项目渲染与筛选 / 技能标签 / 表单校验 / 入场动画
 * ======================================================================== */
(function () {
  'use strict';

  /* ---------- 0. 页脚年份 ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ========================================================================
   * 1. 项目数据
   * --------------------------------------------------------------
   * 这里是全站项目列表，按需增删改。字段说明：
   *   name  项目名称        desc  一句话简介
   *   tags  技术栈标签      cat   分类（决定筛选 chip）
   *   icon  卡片图标（单字或字母）   status  状态文字  ok/warn 控制状态点颜色
   *   href  详情链接（可填 # 或真实地址）   featured  是否出现在首页精选
   * ======================================================================== */
  var PROJECTS = [
    {
      name: '智绘笔记',
      desc: '支持 AI 摘要与手写识别的笔记应用，离线可用，端到端加密存储。',
      tags: ['React', 'TypeScript', 'IndexedDB'],
      cat: 'Web 应用',
      icon: '智',
      status: '维护中',
      ok: true,
      href: '#',
      featured: true
    },
    {
      name: 'ApiBoard',
      desc: '轻量 API 调试与文档工具，像管理后台一样管理你的接口。',
      tags: ['Vue 3', 'Node.js', 'WebSocket'],
      cat: 'Web 应用',
      icon: 'A',
      status: '已上线',
      ok: true,
      href: '#',
      featured: true
    },
    {
      name: 'AutoDeploy CLI',
      desc: '一条命令完成构建、测试与部署的自动化工具，支持多环境回滚。',
      tags: ['Node.js', 'Shell', 'CI/CD'],
      cat: '工具链',
      icon: 'D',
      status: '已上线',
      ok: true,
      href: '#',
      featured: true
    },
    {
      name: 'PixelForge',
      desc: '浏览器内的像素画编辑器，支持图层、动效导出与分享社区。',
      tags: ['Canvas', 'TypeScript', 'PWA'],
      cat: 'Web 应用',
      icon: 'P',
      status: '开发中',
      ok: false,
      href: '#',
      featured: false
    },
    {
      name: 'ChatFlow',
      desc: '可视化搭建 AI 对话工作流，拖拽节点即可生成多轮智能体。',
      tags: ['React', 'Python', 'LLM'],
      cat: 'AI 应用',
      icon: 'C',
      status: '已上线',
      ok: true,
      href: '#',
      featured: false
    },
    {
      name: '数据洞察仪表盘',
      desc: '通用 BI 仪表盘模板，支持拖拽图表、自定义指标与定时报表。',
      tags: ['ECharts', 'Vue 3', 'PostgreSQL'],
      cat: 'Web 应用',
      icon: 'BI',
      status: '维护中',
      ok: true,
      href: '#',
      featured: false
    },
    {
      name: 'OpenAPI 网关',
      desc: '面向团队的统一 API 网关，提供密钥管理、用量统计与限流。',
      tags: ['Go', 'Redis', 'gRPC'],
      cat: '工具链',
      icon: 'G',
      status: '维护中',
      ok: true,
      href: '#',
      featured: false
    },
    {
      name: '每日一题',
      desc: '命令行刷题助手，聚合多平台算法题，支持打卡与学习曲线统计。',
      tags: ['Python', 'CLI', 'SQLite'],
      cat: 'AI 应用',
      icon: 'Q',
      status: '开发中',
      ok: false,
      href: '#',
      featured: false
    }
  ];

  /* ---------- 技能标签（关于页） ---------- */
  var SKILLS = ['TypeScript', 'React', 'Vue 3', 'Node.js', 'Go', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'Git', 'CI/CD', 'AI 应用开发', 'UI/UX 基础'];

  /* ========================================================================
   * 2. 主题切换（浅色 / 深色 / 跟随系统，localStorage 持久化）
   * ======================================================================== */
  var THEME_KEY = 'ps-theme';

  function resolveTheme(pref) {
    if (pref === 'light' || pref === 'dark') return pref;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(pref) {
    var theme = resolveTheme(pref);
    document.documentElement.setAttribute('data-theme', theme);
    var icon = document.getElementById('themeIcon');
    if (icon) {
      if (theme === 'dark') {
        icon.innerHTML = '<path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8Z"/>';
      } else {
        icon.innerHTML = '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5 5l1.7 1.7M17.3 17.3 19 19M19 5l-1.7 1.7M6.7 17.3 5 19"/>';
      }
    }
    document.querySelectorAll('.theme-opt').forEach(function (opt) {
      opt.classList.toggle('sel', opt.getAttribute('data-theme') === pref);
    });
  }

  function initTheme() {
    var saved = localStorage.getItem(THEME_KEY) || 'system';
    applyTheme(saved);

    var btn = document.getElementById('themeBtn');
    var pop = document.getElementById('themePop');
    if (btn && pop) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        pop.classList.toggle('open');
      });
      pop.querySelectorAll('.theme-opt').forEach(function (opt) {
        opt.addEventListener('click', function () {
          var pref = opt.getAttribute('data-theme');
          localStorage.setItem(THEME_KEY, pref);
          applyTheme(pref);
          pop.classList.remove('open');
        });
      });
      document.addEventListener('click', function (e) {
        if (!pop.contains(e.target)) pop.classList.remove('open');
      });
    }
    // 跟随系统时响应系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
      if ((localStorage.getItem(THEME_KEY) || 'system') === 'system') applyTheme('system');
    });
  }

  /* ========================================================================
   * 3. 移动端导航
   * ======================================================================== */
  function initNav() {
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    if (!toggle || !links) return;
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
      });
    });
  }

  /* ========================================================================
   * 4. 项目卡片渲染与筛选
   * ======================================================================== */
  function cardHTML(p) {
    var statusClass = p.ok === false ? 'warn' : '';
    return (
      '<article class="card">' +
      '  <div class="card-top">' +
      '    <span class="card-ico">' + p.icon + '</span>' +
      '    <h3 class="card-name">' + p.name + '</h3>' +
      '  </div>' +
      '  <p class="card-desc">' + p.desc + '</p>' +
      '  <div class="card-meta">' + p.tags.map(function (t) { return '<span class="pill pill-tech">' + t + '</span>'; }).join('') + '</div>' +
      '  <div class="card-foot">' +
      '    <div class="card-stat">' +
      '      <span>分类<b>' + p.cat + '</b></span>' +
      '      <span>状态<b class="status ' + statusClass + '">' + p.status + '</b></span>' +
      '    </div>' +
      '    <a class="card-link" href="' + p.href + '" target="_blank" rel="noopener">详情 →</a>' +
      '  </div>' +
      '</article>'
    );
  }

  function renderFeatured() {
    var grid = document.getElementById('featuredGrid');
    if (!grid) return;
    grid.innerHTML = PROJECTS.filter(function (p) { return p.featured; }).slice(0, 3).map(cardHTML).join('');
  }

  function renderProjects() {
    var grid = document.getElementById('projectGrid');
    var bar = document.getElementById('filterBar');
    var count = document.getElementById('projectCount');
    var empty = document.getElementById('emptyState');
    var input = document.getElementById('searchInput');
    if (!grid) return;

    var cats = ['全部'].concat(
      PROJECTS.map(function (p) { return p.cat; }).filter(function (c, i, arr) { return arr.indexOf(c) === i; })
    );

    if (bar) {
      bar.innerHTML = cats.map(function (c, i) {
        return '<button class="chip' + (i === 0 ? ' sel' : '') + '" data-cat="' + c + '">' + c + '</button>';
      }).join('');
    }

    var state = { cat: '全部', kw: '' };

    function update() {
      var kw = state.kw.trim().toLowerCase();
      var list = PROJECTS.filter(function (p) {
        var okCat = state.cat === '全部' || p.cat === state.cat;
        var okKw = !kw ||
          p.name.toLowerCase().indexOf(kw) !== -1 ||
          p.desc.toLowerCase().indexOf(kw) !== -1 ||
          p.tags.join(' ').toLowerCase().indexOf(kw) !== -1 ||
          p.cat.toLowerCase().indexOf(kw) !== -1;
        return okCat && okKw;
      });
      grid.innerHTML = list.map(cardHTML).join('');
      if (count) count.innerHTML = '共 <b>' + list.length + '</b> 个项目';
      if (empty) empty.classList.toggle('show', list.length === 0);
    }

    if (bar) bar.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      bar.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('sel'); });
      chip.classList.add('sel');
      state.cat = chip.getAttribute('data-cat');
      update();
    });

    if (input) input.addEventListener('input', function () {
      state.kw = input.value;
      update();
    });

    update();
  }

  /* ---------- 技能标签（关于页） ---------- */
  function renderSkills() {
    var cloud = document.getElementById('skillCloud');
    if (!cloud) return;
    cloud.innerHTML = SKILLS.map(function (s) { return '<span class="skill-item">' + s + '</span>'; }).join('');
  }

  /* ========================================================================
   * 5. 联系表单：前端校验 + 模拟提交
   * ======================================================================== */
  function initForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    var msg = document.getElementById('formMsg');

    function show(type, text) {
      msg.className = 'form-msg ' + type;
      msg.textContent = text;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var text = form.message.value.trim();
      var agree = form.agree ? form.agree.checked : document.getElementById('fAgree').checked;

      if (!name) return show('err', '请填写你的称呼。');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return show('err', '邮箱格式不正确，请检查后重试。');
      if (!text) return show('err', '留言内容不能为空。');
      if (!agree) return show('err', '请先勾选同意隐私说明。');

      show('ok', '已收到你的留言，我会尽快回复你！');
      form.reset();
      setTimeout(function () { msg.className = 'form-msg'; }, 6000);
    });
  }

  /* ========================================================================
   * 6. 滚动入场动画
   * ======================================================================== */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 启动 ---------- */
  initTheme();
  initNav();
  renderFeatured();
  renderProjects();
  renderSkills();
  initForm();
  initReveal();
})();
