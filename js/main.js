/* ============================================================
   MONOLITH NOIR — インタラクション & アニメーション
   ============================================================ */

(function () {
  'use strict';

  // 動作軽減設定の確認
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
