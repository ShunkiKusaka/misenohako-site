document.documentElement.classList.add('js');
(() => {
  /* ---- ハンバーガーメニュー ---- */
  const menuBtn = document.querySelector('.menu-toggle');
  const menu = document.getElementById('site-menu');
  const setMenuOpen = (open) => {
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  };
  menuBtn.addEventListener('click', () => setMenuOpen(!menu.classList.contains('is-open')));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenuOpen(false); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenuOpen(false); });

  /* ---- スクロール演出：画面に入ったら静かにフェードイン ---- */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion) {
    revealEls.forEach(el => el.classList.add('is-visible'));
  } else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---- 数字のカウントアップ ---- */
  const numsSection = document.querySelector('.numbers');
  const counters = document.querySelectorAll('.num-count');
  const runCount = () => {
    counters.forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      if (reduceMotion) { el.textContent = target; return; }
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  };
  if (numsSection && 'IntersectionObserver' in window) {
    const numIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { runCount(); numIo.unobserve(entry.target); }
      });
    }, { threshold: 0.4 });
    numIo.observe(numsSection);
  } else {
    runCount();
  }

  /* ---- 予約タブ切り替え ---- */
  const tabs = document.querySelectorAll('.reserve-tab');
  const panels = { 'panel-room': document.getElementById('panel-room'), 'panel-banquet': document.getElementById('panel-banquet') };
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      const target = tab.getAttribute('aria-controls');
      Object.entries(panels).forEach(([id, panel]) => {
        if (!panel) return;
        const active = id === target;
        panel.classList.toggle('is-active', active);
        panel.hidden = !active;
      });
    });
  });

  /* ---- フォーム送信共通処理（Formspree想定） ---- */
  const setupForm = (form) => {
    if (!form) return;
    const status = form.querySelector('.form-status');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (form.action.includes('YOUR_FORM_ID')) {
        status.textContent = 'フォームの送信先が未設定です。README.md を確認してください。';
        status.className = 'form-status is-error';
        return;
      }
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      status.className = 'form-status';
      status.textContent = '送信中です…';
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (!res.ok) throw new Error();
        form.reset();
        window.location.href = '/samples/ginza/thanks/';
        return;
      } catch {
        status.textContent = '送信できませんでした。お手数ですが、お電話にてご連絡ください。';
        status.className = 'form-status is-error';
      } finally {
        submitBtn.disabled = false;
      }
    });
  };
  setupForm(document.getElementById('room-form'));
  setupForm(document.getElementById('banquet-form'));

  /* ---- ギャラリーの拡大表示（Lightbox） ---- */
  const lightbox = document.getElementById('lightbox');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const galItems = document.querySelectorAll('.gal-item');
  const closeBtn = document.querySelector('.lightbox-close');
  const openLightbox = (caption) => {
    lightboxCaption.textContent = caption;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
  };
  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  };
  galItems.forEach(item => {
    item.addEventListener('click', () => openLightbox(item.dataset.caption || ''));
  });
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
})();
