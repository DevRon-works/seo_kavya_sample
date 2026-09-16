(() => {
  'use strict';

  // September 19, 2026 at 00:00:00 in Asia/Manila (UTC+8).
  // The explicit offset makes this independent of the visitor's local timezone.
  // For development, temporarily set this to a past/future ISO timestamp, then restore it.
  const EXPIRATION_DATE = '2026-09-19T00:00:00+08:00';
  const expirationTime = Date.parse(EXPIRATION_DATE);
  let timer;
  let replaced = false;

  function showUnavailable(invalidDate) {
    if (replaced) return;
    replaced = true;
    clearTimeout(timer);
    document.removeEventListener('visibilitychange', checkExpiration);
    window.removeEventListener('pageshow', checkExpiration);

    // Stop the original document and replace it, including its SEO metadata.
    // This script must be parser-blocking and precede normal styles/scripts/content.
    // Only fixed markup is inserted; no URL parameters or visitor input are used.
    window.stop();
    document.documentElement.className = '';
    document.documentElement.innerHTML = `
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>${invalidDate ? 'Demo Unavailable' : 'Demo Expired'}</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; min-height: 100svh; display: grid;
      place-items: center; padding: 24px; background: #fff8cf; color: #253b27;
      font-family: system-ui, sans-serif; text-align: center; }
    main { max-width: 36rem; }
    h1 { font-size: clamp(1.5rem, 5vw, 2rem); line-height: 1.3; }
    p { line-height: 1.6; }
  </style>
</head>
<body><main><h1>${invalidDate
      ? 'This demo website is currently unavailable.'
      : 'This demo website is no longer available.'}</h1>${invalidDate
      ? '<p>Please check your device date and time, then reload this page.</p>'
      : ''}</main></body>
`;
  }

  function checkExpiration() {
    if (replaced) return;
    clearTimeout(timer);
    const now = Date.now();

    // Fail closed for an unreadable clock or invalid configuration, without crashing.
    // A valid but incorrect device clock cannot be detected without a trusted server.
    if (!Number.isFinite(now) || !Number.isFinite(expirationTime)) {
      showUnavailable(true);
      return;
    }
    const remaining = expirationTime - now;
    if (remaining <= 0) {
      showUnavailable(false);
      return;
    }

    // Also expire tabs left open across midnight. Short rechecks handle clock changes
    // and avoid setTimeout's maximum delay; resume events cover suspended/background tabs.
    timer = setTimeout(checkExpiration, Math.min(remaining, 60_000));
  }

  document.addEventListener('visibilitychange', checkExpiration);
  window.addEventListener('pageshow', checkExpiration);
  checkExpiration();
})();
