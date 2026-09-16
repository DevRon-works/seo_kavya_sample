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
