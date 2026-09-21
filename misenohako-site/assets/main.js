(() => {
  // モバイルメニュー
  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  };
  btn.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });

  // フッターの年
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // 問い合わせフォーム（Formspree想定）
  const form = document.getElementById('contact-form');
  const status = form.querySelector('.form-status');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form.action.includes('YOUR_FORM_ID')) {
      status.textContent = 'フォームの送信先が未設定です。README.md を確認してください。';
      status.className = 'form-status is-error';
      return;
    }
    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;
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
      status.textContent = '送信しました。2営業日以内にご返信します。';
      status.className = 'form-status is-ok';
    } catch {
      status.textContent = '送信できませんでした。お手数ですが、メールまたはInstagram DMからご連絡ください。';
      status.className = 'form-status is-error';
    } finally {
      submit.disabled = false;
    }
  });
})();
