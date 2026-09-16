# KavyaClub

A responsive, static information website built with HTML, CSS, and a small progressive-enhancement script. No build step, runtime dependencies, account forms, tracking, or backend.

## Preview

Run `python -m http.server 8000` in this directory and open http://localhost:8000. The homepage also works directly from `index.html`. Preview `404.html` through the local server because its links are root-relative.

## Project structure

```text
index.html
404.html
robots.txt
sitemap.xml
assets/
  css/style.css
  js/script.js
  js/expiration.js
  images/favicon.svg
  images/social-card.png
```

## Publish

1. Replace every `https://kavyaclub.example` occurrence in `index.html`, `robots.txt`, and `sitemap.xml` with the real HTTPS origin. The `.example` domain is an intentional placeholder, not a live destination. Keep the supplied external registration and Telegram links unchanged.
2. Upload these static files to your host's public root. No installation or build command is needed. For a subdirectory deployment, adjust the root-relative URLs in `404.html` to that base path.
3. Configure the host to serve `404.html` with HTTP status **404** for missing URLs. Do not rewrite missing pages to the homepage or return HTTP 200 for errors.
4. Verify canonical and social metadata on the public domain; confirm the sitemap and social image are accessible. Submit the sitemap to your search-engine webmaster tools if desired. Indexability is enabled as requested; indexing and search placement are not guaranteed.

## Content and SEO decisions

- One primary H1, semantic sections, logical headings, descriptive links, real fragment targets, original content, canonical metadata, Open Graph and Twitter large-image cards.
- Organization and WebSite JSON-LD describe only the visible brand. No invented statistics, testimonials, reviews, address, or ratings. The homepage does not need a one-item breadcrumb.
- The six FAQs use native details/summary controls and remain usable without JavaScript. FAQPage markup is intentionally omitted: Google retired FAQ rich results in May 2026 and removed its documentation in June 2026. Source: https://developers.google.com/search/updates (May 8 and June 15, 2026 entries). The visible FAQ is useful independently of rich-result eligibility.
- External destinations are normal, inspectable links with `target="_blank"` and `rel="noopener noreferrer"`; destination URLs are also displayed in access and contact sections. No click interception, redirects, or simulated registration.
- Navigation remains available without JavaScript. The enhanced mobile menu supports Escape, expanded-state announcements, and focus transfer. Native FAQ controls support keyboard access. Motion respects reduced-motion settings.
- No fonts, scripts, or illustrations are requested from third-party services. The hero uses lightweight decorative CSS and inline SVG, so there are no hero image downloads or late image layout shifts. The raster social image is for link previews and is not downloaded by the page.

## Future pages

Section IDs `about`, `prediction`, `how-it-works`, `faq`, and `contact` provide stable links today. Move content into substantive `/about`, `/prediction`, `/how-it-works`, `/faq`, and `/contact` pages only when each merits its own original content. Add `/blog` when articles exist; no empty pages are linked or indexed. Give each new page its own title, description, H1, canonical, internal links, and sitemap entry.

## Verification performed

- Chromium browser checks at widths 320, 375, 425, 768, 1024, 1366, and 1920: no horizontal document scrolling.
- axe automated WCAG 2 A/AA and 2.1 AA checks: no reported violations at those widths; the custom 404 page also passed. Automated checks do not replace assistive-technology testing.
- Mobile menu opening, Escape dismissal, section-link dismissal and focus transfer; every FAQ expansion; JavaScript-disabled navigation and FAQs; internal fragment targets; one H1; JSON-LD parsing; external link security attributes; local asset responses; 404 home link: passed.
- Desktop and mobile screenshots visually reviewed. JavaScript syntax and sitemap XML parsing passed; no browser script errors were observed.
- Initial HTML, CSS, JavaScript, and favicon total approximately 46 KB uncompressed. No production Core Web Vitals field measurement has been performed; hosting and real-user conditions affect those metrics.
- External CTA hrefs match the supplied destinations. The browsing service could not open those external URLs, so third-party availability and account flows remain unverified.
- The local Python server is for previews and does not automatically use the custom error page. Configure that behavior on the production host as described above.

Browser-testing tools were installed in the system temporary directory, not included as website dependencies.

## Demo expiration

Both HTML pages load `assets/js/expiration.js` synchronously at the start of the head, before normal metadata, styles, and scripts. The single `EXPIRATION_DATE` constant is **`2026-09-19T00:00:00+08:00`**: September 19, 2026 at midnight in Asia/Manila, equivalent to September 18 at 16:00 UTC. The explicit UTC+8 offset fixes the deadline independently of the visitor's timezone.

Before the deadline, the website works normally with no expiration warning. At or after the deadline, the script stops the original document and replaces it with a minimal expiration screen, the title `Demo Expired`, and `noindex, nofollow`. Normal metadata, structured data, navigation, and page content are removed from the rendered document. Open tabs also check at the deadline, at most every minute for clock changes, and when resumed or made visible. Browsers can delay timers while a device is suspended.

An invalid/non-finite device clock or an unparseable expiration constant displays a minimal unavailable screen asking the visitor to check their device clock. It also uses `noindex, nofollow` rather than exposing normal content.

### Test without waiting

1. In `assets/js/expiration.js`, temporarily change only `EXPIRATION_DATE` to yesterday's date at `T00:00:00+08:00`. Reload the homepage and `/404.html`: both should show only the expiration screen. Inspect the rendered head to confirm `Demo Expired`, `noindex, nofollow`, and no normal social metadata or JSON-LD.
2. Set the constant to a future date and reload: normal navigation, FAQs, and CTAs should work with no warning. An invalid string can be used to test the unavailable state.
3. **Restore `const EXPIRATION_DATE = '2026-09-19T00:00:00+08:00';` after testing.** Hard-refresh if your browser has cached the script. Publish script changes along with both HTML files and avoid long-lived immutable caching for this file.

This is a client-side demo mechanism, **not a security control**. It relies on the device's clock and JavaScript running successfully. JavaScript can be disabled or modified, and a valid but incorrect clock can bypass the check. The static HTML is still delivered by the host and remains visible in source; speculative browser requests may start before the check executes. JavaScript does not change HTTP status codes, `robots.txt`, the sitemap, cached search results, or metadata seen by crawlers that do not execute JavaScript. Preventing delivery of the source or enforcing expiration for every crawler would require host/server controls outside this static demo's scope.

Expiration was browser-tested on both pages one millisecond before, exactly at, and after the cutoff in Asia/Manila, America/Los_Angeles, and Pacific/Kiritimati. Open-tab expiration, page-resume clock changes, invalid clock/configuration handling, removal of normal metadata/content, and pre-expiration navigation/FAQ behavior passed. The expired screen passed automated accessibility checks at 320px, and the normal UI script did not execute on an expired initial visit. Tests used browser clock overrides and request interception; the production constant remains unchanged.
