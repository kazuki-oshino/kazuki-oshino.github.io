/* ============================================================
   MONOLITH NOIR — インタラクション & アニメーション
   ============================================================ */

(function () {
  'use strict';

  // 動作軽減設定の確認
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 言語判定（日本語ブラウザは日本語、それ以外は英語）
  const LANG = navigator.language.startsWith('ja') ? 'ja' : 'en';

  const EN = {
    // Hero
    'hero.tagline': 'Putting user experience first,<br>crafting meaningful and intuitive products.',
    // About
    'about.p1': 'A full-stack engineer with backend expertise, working across frontend, mobile, and infrastructure. Over 11 years of experience building products in diverse domains including security, entertainment, HR, and food-tech.',
    'about.p2': 'What I value most in development is a relentless user perspective. From button placement to screen transition flows, I always consider the 5W1H and pursue "meaningful, easy-to-use services." My belief is that design and implementation should be driven by user experience, not just technical correctness.',
    'about.p3': 'Skilled in DDD-based architecture design and performance tuning, I have served as an architect responsible for overall system design. Currently focused on driving AI adoption across the organization and planning/developing AI-powered services. With experience managing a team of 20, a service I helped build as a core developer won the "HR Award 2020" Grand Prize. I also develop and operate multiple mobile apps independently.',
    // Experience 1
    'exp.1.period': 'May 2022 — Present',
    'exp.1.role': 'Senior Engineer / Architect',
    'exp.1.company': 'Web company (~100 employees)',
    'exp.1.b1': 'Led DDD-based system design and development as a backend specialist for a mobile ordering service',
    'exp.1.b2': 'Responsible for overall system architecture design as an architect',
    'exp.1.b3': 'Drove performance tuning initiatives and shared insights through a <a href="https://note.com/scg_tech/n/nf234de34ea4d" target="_blank" rel="noopener">technical article</a>',
    'exp.1.b4': 'Also contributed to frontend (React / Next.js) and mobile app (Flutter) development',
    'exp.1.b5': 'Developed an AI-powered marketing message generation service for users',
    'exp.1.b6': 'Tech stack: Go / TypeScript / MySQL / AWS / Kubernetes',
    // Experience 2
    'exp.2.period': 'Sep 2021 — Present',
    'exp.2.role': 'Independent Development',
    'exp.2.company': 'Developing and operating multiple iOS / Android apps',
    'exp.2.b1': 'End-to-end development of multiple mobile apps from planning to release, including brain training apps',
    'exp.2.b2': 'Built with Flutter / Dart / Swift, deployed for both iOS and Android',
    'exp.2.b3': 'Selected optimal architectures per app: Firebase / Riverpod / MVVM, etc.',
    'exp.2.b4': 'Flagship brain training app achieved over 10,000 total downloads',
    // Experience 3
    'exp.3.period': 'Oct 2019 — Aug 2021',
    'exp.3.role': 'Manager / Team Leader',
    'exp.3.company': 'Systems development company (~50 employees)',
    'exp.3.b1': 'Designed, developed, and maintained a new employee benefits platform',
    'exp.3.b2': 'Tech stack: Java / TypeScript / Spring Boot / Vue.js / MySQL',
    'exp.3.b3': 'Led a 20-member team within a 100-person project, including client negotiations',
    'exp.3.b4': 'Won the "HR Award 2020" Grand Prize in the Professional category by the Japan HR Department',
    // Experience 4
    'exp.4.period': 'Dec 2018 — Sep 2019',
    'exp.4.role': 'Lead / Team Leader',
    'exp.4.company': 'IT company (~1,000 employees)',
    'exp.4.b1': 'Led the replacement of an entertainment information website',
    'exp.4.b2': 'Tech stack: Java / Spring Boot / Oracle Database',
    'exp.4.b3': 'Managed a 4-member development team within a 20-person project',
    'exp.4.b4': 'Led technology selection considering existing tech stack and team skills',
    'exp.4.b5': 'Also managed outsourced SES partner members',
    // Experience 5
    'exp.5.period': 'Apr 2017 — Dec 2018',
    'exp.5.role': 'Lead / Team Leader',
    'exp.5.company': 'IT company (~1,000 employees)',
    'exp.5.b1': 'Replaced and maintained a web security automated scanning service',
    'exp.5.b2': 'Tech stack: PHP / CakePHP / MySQL',
    'exp.5.b3': 'Migrated ~200 client companies in phases with zero incidents',
    'exp.5.b4': 'Created design documents through reverse engineering of legacy systems',
    'exp.5.b5': 'Also managed outsourced SES partner members',
    // Experience 6
    'exp.6.period': 'Jan 2017 — Mar 2017',
    'exp.6.role': 'Lead',
    'exp.6.company': 'IT company (~1,000 employees)',
    'exp.6.b1': 'Participated as a member of a 10-person team in batch development for a power systems project',
    'exp.6.b2': 'Tech stack: Java / Oracle Database',
    'exp.6.b3': 'Promoted to Lead, began managing outsourced SES partner members',
    // Experience 7
    'exp.7.period': 'Oct 2015 — Dec 2016',
    'exp.7.role': 'Member',
    'exp.7.company': 'IT company (~1,000 employees)',
    'exp.7.b1': 'Participated as a member of a 30-person team in social insurance system maintenance',
    'exp.7.b2': 'Tech stack: VB.NET',
    // Experience 8
    'exp.8.period': 'Apr 2015 — Sep 2015',
    'exp.8.role': 'Member',
    'exp.8.company': 'IT company (~1,000 employees)',
    'exp.8.b1': 'Developed an internal attendance management system in a 2-person team',
    'exp.8.b2': 'Tech stack: Java / Wagby / AWS',
    // Contact
    'contact.message': 'Feel free to get in touch.',
  };

  /* ----- 多言語切替 ----- */
  function applyTranslations() {
    if (LANG === 'ja') return;

    document.documentElement.lang = 'en';

    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Portfolio and resume of Kazuki Oshino, Software Engineer');

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (EN[key] == null) return;
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = EN[key];
      } else {
        el.textContent = EN[key];
      }
    });
  }

  /* ----- ヒーロー名の文字分割アニメーション ----- */
  function initHeroName() {
    const nameEl = document.querySelector('.hero-name');
    if (!nameEl) return;

    const text = nameEl.textContent;
    nameEl.innerHTML = text
      .split('')
      .map((char, i) => {
        if (char === ' ') {
          return `<span class="char is-space" style="--i: ${i}">&nbsp;</span>`;
        }
        return `<span class="char" style="--i: ${i}">${char}</span>`;
      })
      .join('');
  }

  /* ----- マウス追従グロー ----- */
  function initCursorGlow() {
    const glow = document.querySelector('.cursor-glow');
    if (!glow || prefersReducedMotion) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // スムーズな追従（ラープ）
    function animate() {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;
      glow.style.transform = `translate(${currentX - 300}px, ${currentY - 300}px)`;
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  /* ----- スクロールトリガーのリビールアニメーション ----- */
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    if (prefersReducedMotion) {
      reveals.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach((el, i) => {
      // 同一セクション内の要素にスタガード遅延を設定
      const section = el.closest('.section') || el.closest('.hero');
      if (section) {
        const siblings = section.querySelectorAll('.reveal');
        const index = Array.from(siblings).indexOf(el);
        el.style.setProperty('--reveal-delay', `${index * 0.12}s`);
      }
      observer.observe(el);
    });
  }

  /* ----- タイムライン進行アニメーション ----- */
  function initTimeline() {
    const timeline = document.querySelector('.timeline');
    if (!timeline || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timeline.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(timeline);
  }

  /* ----- ナビゲーションのスクロール検知 ----- */
  function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          nav.classList.toggle('is-scrolled', window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----- グラスカードの3Dチルト効果 ----- */
  function initCardTilt() {
    if (prefersReducedMotion) return;

    const cards = document.querySelectorAll('.glass-card');

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        card.style.transform = `perspective(800px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateZ(8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ----- スムーズスクロール（Safari対応強化） ----- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* ----- 初期化 ----- */
  function init() {
    initHeroName();
    applyTranslations();
    initCursorGlow();
    initScrollReveal();
    initTimeline();
    initNavScroll();
    initCardTilt();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
