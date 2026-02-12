(function () {
  const EXPECTED_PASS = 'J4c4rt42026!';

  function buildOverlayHtml() {
    return (
      '<div id="lab-password-overlay" class="fixed inset-0 z-[999999] flex items-center justify-center bg-black/70 px-5 top-0 left-0 w-screen h-screen bg-white">' +
      '  <div class="w-[50%] max-w-md rounded bg-white p-6 shadow-xl">' +
      '    <div class="flex justify-center">' +
      '      <img src="https://cdn.mscdirect.com/global/v2/img/header/msc-logo.svg?im=Resize,width=212,height=46" alt="MSC" class="h-10" />' +
      '    </div>' +
      '    <p class="text-lg font-bold">Restricted access</p>' +
      '    <p class="mt-1 text-sm text-gray-600">Write the password to continue</p>' +
      '    <div class="mt-4 flex w-full items-center gap-3 rounded border border-gray-300 bg-white px-3 py-2">' +
      '      <input id="lab-password-input" type="password" autocomplete="current-password" class="w-full bg-transparent outline-none px-3 py-1" placeholder="Password" />' +
      '    </div>' +
      '    <div class="mt-3 flex gap-3">' +
      '      <button id="lab-password-submit" class="w-full rounded bg-blue-600 px-3 py-2 font-bold text-white" type="button">Enter</button>' +
      '      <button id="lab-password-cancel" class="w-full rounded border border-gray-300 bg-white px-3 py-2 font-bold text-gray-800" type="button">Cancel</button>' +
      '    </div>' +
      '    <p id="lab-password-error" class="mt-3 hidden text-sm font-bold text-red-600">Access Denied</p>' +
      '  </div>' +
      '</div>'
    );
  }

  function init() {
    if (document.getElementById('lab-password-overlay')) return;

    if (!document.body) return;

    // Si ya se accedió antes, no mostrar el overlay
    if (localStorage.getItem('lab-password-authorized') === 'true') return;

    document.body.insertAdjacentHTML('afterbegin', buildOverlayHtml());

    const overlay = document.getElementById('lab-password-overlay');
    const input = document.getElementById('lab-password-input');
    const submit = document.getElementById('lab-password-submit');
    const cancel = document.getElementById('lab-password-cancel');
    const error = document.getElementById('lab-password-error');

    if (!overlay || !input || !submit || !cancel || !error) return;

    document.documentElement.style.overflow = 'hidden';

    function deny() {
      document.documentElement.style.overflow = '';
      document.body.innerHTML =
        '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#111;color:#fff;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;padding:24px;text-align:center;"><div><div style="font-size:20px;font-weight:700;">Denied Access</div></div></div>';
    }

    function allow() {
      document.documentElement.style.overflow = '';
      localStorage.setItem('lab-password-authorized', 'true');
      overlay.remove();
    }

    function check() {
      const value = String(input.value || '');
      const ok = value === EXPECTED_PASS;

      if (ok) {
        allow();
        return;
      }

      error.classList.remove('hidden');
    }

    submit.addEventListener('click', check);
    cancel.addEventListener('click', deny);

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') check();
      if (e.key === 'Escape') deny();
    });

    setTimeout(function () {
      input.focus();
    }, 0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
