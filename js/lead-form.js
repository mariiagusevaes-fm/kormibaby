(function () {
  // ВРЕМЕННО: пока Beget недоступен, заявки идут через Formspree (formspree.io),
  // а не через /send-lead.php (PHP не работает на GitHub Pages).
  // Вставьте сюда ID формы с formspree.io (часть после /f/):
  var FORMSPREE_ID = 'xkjjkvpe';
  var FORMSPREE_URL = 'https://formspree.io/f/' + FORMSPREE_ID;

  // Перехватываем клик на фазе capture, до того как инлайн-обработчик страницы
  // заменит innerHTML модалки (и вместе с ним удалит поля формы) на "Заявка принята!".
  document.addEventListener('click', function (e) {
    var btn = e.target && e.target.closest && e.target.closest('#modalSend');
    if (!btn) return;

    var nameEl = document.getElementById('mName');
    var phoneEl = document.getElementById('mPhone');
    var svcEl = document.getElementById('mSvc');
    if (!nameEl || !phoneEl) return;

    var name = nameEl.value.trim();
    var phone = phoneEl.value.trim();
    var phoneDigits = phone.replace(/\D/g, '');
    if (!name || phoneDigits.length < 10) return;

    var payload = {
      name: name,
      phone: phone,
      situation: svcEl ? svcEl.value.trim() : '',
      source: location.href,
      _subject: 'Заявка с сайта kormybaby.ru — ' + name
    };

    fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    }).catch(function (err) {
      console.error('Lead send failed:', err);
    });
  }, true);
})();
