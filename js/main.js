/* ==========================================================================
 * 个人主页 · 交互脚本
 * --------------------------------------------------------------------------
 * ★ 修改个人信息只需编辑下方 SITE 配置对象，全站自动生效。
 *   - 所有隐私/专属信息统一使用「XX」占位，请替换为你的真实信息
 *   - projects 数组清空（[]）时页面自动显示"暂无作品"空状态
 *   - 作品封面：cover 填图片 URL 即自动懒加载；留空显示 XX 极简占位
 * ========================================================================== */
(function () {
  'use strict';

  /* ========================================================================
   * SITE —— 全站个人信息配置（唯一修改入口）
   * ======================================================================== */
  var SITE = {
    /* 品牌 / 昵称 */
    brand: 'XX',                  // Logo 与导航昵称
    name: 'XX',                   // 姓名

    /* Hero 首屏 */
    hero: {
      badge: '在线 · 接受合作邀约',
      title: 'XX 的个人主页',       // 主标题（Hello, I'm XX）
      sub: '前端开发者 / 设计爱好者 / 自由创作者',
      motto: '保持好奇，持续创造，用代码把想法变成现实。'
    },

    /* 头像：填图片 URL 自动加载，留空显示 XX 占位 */
    avatar: '',

    /* 关于我 · 基础信息 */
    basic: {
      age: 'XX',                  // 年龄
      location: 'XX',             // 所在地
      career: 'XX'                // 职业
    },

    /* 关于我 · 个人简介（可多段） */
    intro: [
      '你好，我是 <b>XX</b>，一名对技术与设计充满热情的创作者。我相信好的产品源于对细节的执着，享受把复杂问题拆解成简洁优雅的解决方案。',
      '工作之外，我喜欢探索新事物、记录生活、打磨自己的小项目。期待与有趣的你相遇。'
    ],

    /* 关于我 · 技能标签（可增删） */
    skills: ['Vue', 'React', 'TypeScript', 'UI 设计', 'Node.js', '剪辑', '摄影', 'AI 工具'],

    /* 关于我 · 经历履历（可增删） */
    timeline: [
      { date: '20XX.XX — 至今', title: 'XX · 职业', desc: '负责 XX 相关工作，主导多个项目的落地与交付。' },
      { date: '20XX.XX — 20XX.XX', title: 'XX 经历', desc: '参与 XX，积累了 XX 方面的实践经验。' },
      { date: '20XX.XX', title: 'XX 教育经历', desc: '就读于 XX，主修 XX 专业。' }
    ],

    /* ======================================================================
     * 项目作品（可增删；全部清空时页面显示空状态）
     * 字段：name 名称 / desc 简介 / tech 技术栈标签 / time 上线时间
     *       cover 封面图URL（留空显示占位）/ cat 分类
     *       github 仓库链接 / demo 在线预览链接 / detail 详情补充说明
     * ==================================================================== */
    projects: [
      {
        name: 'XX',
        desc: '项目简介待补充，用一两句话说明这个项目做了什么、解决了什么问题。',
        tech: ['XX', 'XX'],
        time: '20XX.XX',
        cover: '',
        cat: 'XX',
        github: '#',
        demo: '#',
        detail: '项目详情补充说明：背景、方案与成果（可在此扩展多段文字）。'
      },
      {
        name: 'XX',
        desc: '项目简介待补充，用一两句话说明这个项目做了什么、解决了什么问题。',
        tech: ['XX', 'XX'],
        time: '20XX.XX',
        cover: '',
        cat: 'XX',
        github: '#',
        demo: '#',
        detail: '项目详情补充说明：背景、方案与成果（可在此扩展多段文字）。'
      },
      {
        name: 'XX',
        desc: '项目简介待补充，用一两句话说明这个项目做了什么、解决了什么问题。',
        tech: ['XX', 'XX'],
        time: '20XX.XX',
        cover: '',
        cat: 'XX',
        github: '#',
        demo: '#',
        detail: '项目详情补充说明：背景、方案与成果（可在此扩展多段文字）。'
      }
    ],

    /* ======================================================================
     * 联系方式（图标 + 文字，地址统一 XX 占位）
     * type 决定图标与复制行为：link=跳转链接 / copy=点击复制
     * ==================================================================== */
    contacts: [
      { name: 'GitHub',   value: 'XX',     type: 'link', href: 'https://github.com/',      ico: 'GH' },
      { name: 'Gitee',    value: 'XX',     type: 'link', href: 'https://gitee.com/',        ico: 'GE' },
      { name: '小红书',    value: 'XX',     type: 'link', href: 'https://www.xiaohongshu.com/', ico: '红' },
      { name: '邮箱',      value: 'XX',     type: 'copy', ico: '✉' },
      { name: '微信',      value: 'XX',     type: 'copy', ico: '微' }
    ],

    /* 页脚 */
    footer: {
      year: '20XX',                // 版权年份
      name: 'XX',                  // 版权署名
      tech: '原生 HTML / CSS / JavaScript'
    }
  };

  /* ==========================================================================
   * 工具函数
   * ======================================================================== */
  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function toast(text) {
    var t = $('toast'), txt = $('toastText');
    txt.textContent = text;
    t.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function () { t.classList.remove('show'); }, 2200);
  }

  /* ==========================================================================
   * 1. 渲染文案（从 SITE 写入页面）
   * ======================================================================== */
  function renderText() {
    $('brandMark').textContent = SITE.brand.slice(0, 2);
    $('brandName').textContent = SITE.brand;
    document.title = SITE.name + ' 的个人主页 · Portfolio';

    $('heroBadge').textContent = SITE.hero.badge;
    $('heroTitle').textContent = SITE.hero.title;
    $('heroSub').textContent = SITE.hero.sub;
    $('heroMotto').textContent = SITE.hero.motto;

    $('infoName').textContent = SITE.name;
    $('infoName2').textContent = SITE.name;
    $('infoAge').textContent = SITE.basic.age;
    $('infoLoc').textContent = SITE.basic.location;
    $('infoCareer').textContent = SITE.basic.career;

    /* 头像：有 URL 懒加载，无则显示占位 */
    var avatarImg = $('avatarImg');
    if (SITE.avatar) {
      avatarImg.dataset.src = SITE.avatar;
      avatarImg.alt = SITE.name + ' 的头像';
      $('avatarWrap').querySelector('.ph').style.display = 'none';
    }

    /* 简介段落 */
    $('aboutIntro').innerHTML = SITE.intro.map(function (p) {
      return '<p class="para">' + p + '</p>';
    }).join('');

    /* 技能标签 */
    $('skillCloud').innerHTML = SITE.skills.map(function (s) {
      return '<span class="skill-item">' + esc(s) + '</span>';
    }).join('');

    /* 时间轴 */
    $('timeline').innerHTML = SITE.timeline.map(function (t) {
      return '<div class="tl-item">' +
        '<div class="tl-date">' + esc(t.date) + '</div>' +
        '<div class="tl-title">' + esc(t.title) + '</div>' +
        '<div class="tl-desc">' + esc(t.desc) + '</div>' +
        '</div>';
    }).join('');

    /* 页脚 */
    $('footerYear').textContent = SITE.footer.year;
    $('footerName').textContent = SITE.footer.name;
    $('icpSlot').style.display = SITE.footer.icp ? 'block' : 'none';
    if (SITE.footer.icp) $('icpSlot').textContent = SITE.footer.icp;
  }

  /* ==========================================================================
   * 2. 项目作品渲染 + 筛选 + 空状态
   * ======================================================================== */
  function cardHTML(p, i) {
    var cover = p.cover
      ? '<img data-src="' + esc(p.cover) + '" alt="' + esc(p.name) + '" loading="lazy" />'
      : '<div class="ph">XX<small>封面占位</small></div>';
    return '<article class="card" data-index="' + i + '" role="button" tabindex="0" aria-label="查看作品 ' + esc(p.name) + ' 详情">' +
      '<div class="card-cover">' + cover + '</div>' +
      '<div class="card-body">' +
      '<h3>' + esc(p.name) + '</h3>' +
      '<p class="desc">' + esc(p.desc) + '</p>' +
      '<div class="card-tags">' + p.tech.map(function (t) { return '<span class="tag-pill">' + esc(t) + '</span>'; }).join('') + '</div>' +
      '<div class="card-foot">' +
      '<span class="card-time">' + esc(p.time) + '</span>' +
      '<span class="card-more">详情 →</span>' +
      '</div>' +
      '</div>' +
      '</article>';
  }

  function renderProjects() {
    var grid = $('cardGrid');
    var bar = $('filterBar');
    var empty = $('emptyState');
    var projects = SITE.projects;

    /* 分类：全部 + 去重分类 */
    var cats = ['全部'].concat(
      projects.map(function (p) { return p.cat; }).filter(function (c, i, arr) { return c && arr.indexOf(c) === i; })
    );
    bar.innerHTML = cats.map(function (c, i) {
      return '<button class="chip' + (i === 0 ? ' sel' : '') + '" data-cat="' + esc(c) + '">' + esc(c) + '</button>';
    }).join('');

    var state = { cat: '全部' };

    function update() {
      var list = projects.filter(function (p) {
        return state.cat === '全部' || p.cat === state.cat;
      });
      if (list.length === 0) {
        grid.innerHTML = '';
        empty.classList.add('show');
      } else {
        empty.classList.remove('show');
        grid.innerHTML = list.map(function (p, i) {
          /* 用原数组索引定位详情数据 */
          return cardHTML(p, projects.indexOf(p));
        }).join('');
        bindCardEvents();
      }
    }

    bar.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      bar.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('sel'); });
      chip.classList.add('sel');
      state.cat = chip.getAttribute('data-cat');
      update();
    });

    update();
  }

  /* ==========================================================================
   * 3. 作品详情弹窗
   * ======================================================================== */
  function openModal(i) {
    var p = SITE.projects[i];
    if (!p) return;
    $('modalCover').innerHTML = p.cover
      ? '<img src="' + esc(p.cover) + '" alt="' + esc(p.name) + '" />'
      : '<span class="ph">XX</span>';
    $('modalTitle').textContent = p.name;
    $('modalTime').textContent = p.time ? '上线时间 · ' + p.time : '';
    $('modalDesc').textContent = p.detail || p.desc;
    $('modalTags').innerHTML = p.tech.map(function (t) { return '<span class="tag-pill">' + esc(t) + '</span>'; }).join('');
    var actions = '';
    if (p.github && p.github !== '#') actions += '<a class="btn btn-sm btn-ghost" href="' + esc(p.github) + '" target="_blank" rel="noopener">GitHub ↗</a>';
    if (p.demo && p.demo !== '#') actions += '<a class="btn btn-sm btn-primary" href="' + esc(p.demo) + '" target="_blank" rel="noopener">在线预览 ↗</a>';
    $('modalActions').innerHTML = actions || '<span style="color:var(--text-2);font-size:0.9rem;">链接待补充</span>';
    $('modalMask').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    $('modalMask').classList.remove('open');
    document.body.style.overflow = '';
  }

  function bindCardEvents() {
    document.querySelectorAll('.card').forEach(function (card) {
      card.addEventListener('click', function () { openModal(Number(card.dataset.index)); });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(Number(card.dataset.index)); }
      });
    });
  }

  $('modalClose').addEventListener('click', closeModal);
  $('modalMask').addEventListener('click', function (e) { if (e.target === $('modalMask')) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  /* ==========================================================================
   * 4. 联系方式 + 一键复制
   * ======================================================================== */
  function renderContacts() {
    $('contactGrid').innerHTML = SITE.contacts.map(function (c) {
      var attrs = c.type === 'link'
        ? 'href="' + esc(c.href) + '" target="_blank" rel="noopener"'
        : 'href="javascript:void(0)" data-copy="' + esc(c.value) + '"';
      var tip = c.type === 'copy' ? '<span class="copy-tip">点击复制</span>' : '';
      return '<a class="contact-item" ' + attrs + '>' +
        tip +
        '<span class="ci-ico">' + esc(c.ico) + '</span>' +
        '<b>' + esc(c.name) + '</b>' +
        '<span>' + esc(c.value) + '</span>' +
        '</a>';
    }).join('');

    /* 复制逻辑 */
    document.querySelectorAll('[data-copy]').forEach(function (el) {
      el.addEventListener('click', function () {
        var val = el.getAttribute('data-copy');
        if (!val || val === 'XX') { toast('请先在配置中填写 ' + el.querySelector('b').textContent + ' 地址'); return; }
        function done() { toast('已复制 ' + el.querySelector('b').textContent + '：' + val); }
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(val).then(done).catch(function () { fallbackCopy(val, done); });
        } else {
          fallbackCopy(val, done);
        }
      });
    });
  }

  function fallbackCopy(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* ignore */ }
    document.body.removeChild(ta);
    done();
  }

  /* ==========================================================================
   * 5. 留言板（轻量模拟，接入后端时替换 submit 逻辑）
   * ======================================================================== */
  function initGuestForm() {
    var form = $('guestForm');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = $('gbName').value.trim();
      var msg = $('gbMsg').value.trim();
      var email = $('gbEmail').value.trim();
      if (!name) { toast('请填写你的称呼'); return; }
      if (!msg) { toast('留言内容不能为空'); return; }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast('邮箱格式不正确'); return; }
      toast('留言已收到，感谢你的反馈！');
      form.reset();
    });
  }

  /* ==========================================================================
   * 6. 主题切换（浅色 / 深色，localStorage 持久化，默认深空黑）
   * ======================================================================== */
  var THEME_KEY = 'ps-theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var icon = $('themeIcon');
    if (theme === 'light') {
      icon.innerHTML = '<path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8Z"/>';
    } else {
      icon.innerHTML = '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5 5l1.7 1.7M17.3 17.3 19 19M19 5l-1.7 1.7M6.7 17.3 5 19"/>';
    }
  }

  function initTheme() {
    var saved = localStorage.getItem(THEME_KEY) || 'dark';
    applyTheme(saved);
    $('themeBtn').addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  }

  /* ==========================================================================
   * 7. 导航：吸顶 / 汉堡菜单 / 丝滑滚动 / 视差惯性跟随 / 滚动高亮
   * ======================================================================== */
  function initNav() {
    var header = $('siteHeader');
    var toggle = $('navToggle');
    var links = $('navLinks');
    var backTop = $('backTop');
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---- 丝滑平滑滚动：easeInOutCubic 缓动，接管全部锚点跳转 ---- */
    function smoothScrollTo(targetY, duration) {
      if (reduced) { window.scrollTo(0, targetY); return; }
      var startY = window.scrollY;
      var diff = targetY - startY;
      if (Math.abs(diff) < 1) return;
      var t0 = performance.now();
      function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }
      function step(now) {
        var p = Math.min(1, (now - t0) / duration);
        window.scrollTo(0, startY + diff * easeInOutCubic(p));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });

    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        links.classList.remove('open');
        var y = (id === '#top' || target === document.body) ? 0 : target.getBoundingClientRect().top + window.scrollY - 64;
        smoothScrollTo(Math.max(0, y), 900);
        history.replaceState(null, '', id);
      });
    });

    backTop.addEventListener('click', function () { smoothScrollTo(0, 800); });

    /* ---- Hero 视差：惯性跟随（lerp 缓动，丝滑不跳变） ---- */
    var heroInner = document.querySelector('.hero-inner');
    var paraTarget = 0, paraCurrent = 0, paraRunning = false;
    function paraLoop() {
      paraCurrent += (paraTarget - paraCurrent) * 0.09;
      if (Math.abs(paraTarget - paraCurrent) < 0.05 && window.scrollY === 0) {
        heroInner.style.transform = 'none';
        heroInner.style.opacity = '1';
        paraRunning = false;
        return;
      }
      heroInner.style.transform = 'translateY(' + paraCurrent.toFixed(2) + 'px)';
      heroInner.style.opacity = String(Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.8)));
      requestAnimationFrame(paraLoop);
    }
    window.addEventListener('scroll', function () {
      var y = Math.min(window.scrollY, window.innerHeight);
      paraTarget = y * 0.18;
      if (!paraRunning) { paraRunning = true; requestAnimationFrame(paraLoop); }
    }, { passive: true });

    /* ---- 吸顶加深 + 返回顶部显隐 ---- */
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      header.classList.toggle('scrolled', y > 10);
      backTop.classList.toggle('show', y > 500);
    }, { passive: true });

    /* ---- scrollspy：滚动高亮当前板块导航 ---- */
    var sections = ['top', 'about', 'projects', 'contact'].map(function (id) {
      return document.getElementById(id);
    });
    var navAnchors = links.querySelectorAll('a');
    window.addEventListener('scroll', function () {
      var pos = window.scrollY + 140;
      var current = 'top';
      sections.forEach(function (sec) {
        if (sec && sec.offsetTop <= pos) current = sec.id;
      });
      navAnchors.forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
      });
    }, { passive: true });
  }

  /* ==========================================================================
   * 8. 入场动画 + 图片懒加载
   * ======================================================================== */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  function initLazy() {
    var imgs = document.querySelectorAll('img[data-src]');
    if (!('IntersectionObserver' in window)) {
      imgs.forEach(function (img) {
        img.src = img.dataset.src;
        img.classList.add('loaded');
      });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var img = en.target;
        img.src = img.dataset.src;
        img.addEventListener('load', function () { img.classList.add('loaded'); });
        img.addEventListener('error', function () {
          img.style.display = 'none';
          var ph = img.parentElement.querySelector('.ph');
          if (ph) ph.style.display = 'grid';
        });
        io.unobserve(img);
      });
    }, { rootMargin: '200px 0px' });
    imgs.forEach(function (img) { io.observe(img); });
  }

  /* ==========================================================================
   * 启动
   * ======================================================================== */
  renderText();
  renderProjects();
  renderContacts();
  initGuestForm();
  initTheme();
  initNav();
  initReveal();
  initLazy();
})();
