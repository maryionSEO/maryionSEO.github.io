/* Maryion — analytics, gated behind consent.
 *
 * One shared file instead of the gtag snippet pasted into every page: new notes
 * only need the one <script> line, and the measurement ID lives in exactly one
 * place. Paths to it are relative, like the rest of the site's internal links,
 * so the pages still work when opened straight from the Finder.
 *
 * Nothing is sent to Google until the visitor clicks Accept. That is the order
 * the ePrivacy Directive asks for: consent first, cookies second.
 */
(function () {
  'use strict';

  var MEASUREMENT_ID = 'G-FSGSXJ2K2T';
  var STORAGE_KEY    = 'maryion.consent';
  var LIVE_HOSTS     = ['maryionseo.com', 'www.maryionseo.com'];

  var choice = null;
  try { choice = localStorage.getItem(STORAGE_KEY); } catch (e) { /* private mode */ }

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  /* Consent Mode v2 — deny everything up front. This has to run before gtag.js
     loads, otherwise the defaults it assumes are Google's, not mine. */
  gtag('consent', 'default', {
    ad_storage:         'denied',
    ad_user_data:       'denied',
    ad_personalization: 'denied',
    analytics_storage:  'denied',
    wait_for_update:    500
  });

  if (choice === 'granted')     startAnalytics();
  else if (choice !== 'denied') showBanner();

  function startAnalytics() {
    gtag('consent', 'update', { analytics_storage: 'granted' });

    /* Local previews and file:// opens would otherwise land in the real reports,
       and on a site this quiet my own reloads would drown out every visitor.
       The banner still renders off-host, so it can be previewed; only the
       measuring is skipped. */
    if (LIVE_HOSTS.indexOf(location.hostname) === -1) return;

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
    document.head.appendChild(s);

    /* Queued on dataLayer; gtag.js drains the queue once it arrives. */
    gtag('js', new Date());
    gtag('config', MEASUREMENT_ID);
  }

  function remember(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* ignore */ }
  }

  function showBanner() {
    var css = document.createElement('style');
    css.textContent = [
      '.consent{position:fixed;left:1rem;right:1rem;bottom:1rem;z-index:50;',
        'max-width:34rem;margin-inline:auto;padding:1.25rem 1.375rem;',
        'background:#232323;color:#F9F9F9;border:1px solid rgba(249,249,249,.14);',
        'border-radius:.75rem;box-shadow:0 18px 40px rgba(0,0,0,.45);',
        'font-family:Archivo,system-ui,sans-serif;font-size:.9375rem;line-height:1.55}',
      '.consent p{margin:0 0 1rem}',
      '.consent-actions{display:flex;flex-wrap:wrap;gap:.625rem}',
      '.consent button{font:inherit;font-weight:600;cursor:pointer;',
        'padding:.5625rem 1.125rem;border-radius:.4375rem;border:1px solid transparent}',
      '.consent .yes{background:#F6EB61;color:#1A1A1A}',
      '.consent .yes:hover{background:#F9C74F}',
      '.consent .no{background:transparent;color:#F9F9F9;border-color:rgba(249,249,249,.3)}',
      '.consent .no:hover{border-color:#F9F9F9}',
      '.consent :focus-visible{outline:2px solid #F6EB61;outline-offset:3px}',
      '@media (prefers-reduced-motion:no-preference){',
        '.consent{animation:consent-in .4s cubic-bezier(.22,.68,.3,1) both}',
        '@keyframes consent-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}}'
    ].join('');
    document.head.appendChild(css);

    var box = document.createElement('div');
    box.className = 'consent';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Analytics consent');
    box.innerHTML =
      '<p>I’d like to use Google Analytics to see which pages get read. ' +
      'It sets cookies and sends data to Google. Nothing is measured unless you say yes.</p>' +
      '<div class="consent-actions">' +
        '<button type="button" class="yes">Accept analytics</button>' +
        '<button type="button" class="no">No thanks</button>' +
      '</div>';

    function close() { box.remove(); }

    box.querySelector('.yes').addEventListener('click', function () {
      remember('granted');
      startAnalytics();
      close();
    });

    box.querySelector('.no').addEventListener('click', function () {
      remember('denied');
      close();
    });

    document.body.appendChild(box);
  }
})();
