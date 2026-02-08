const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cbdboutique.io'

export async function GET() {
  const robotsTxt = `# CBD Boutique Robots.txt
# ${BASE_URL}
# Updated: Only indexable pages are in sitemaps. Thin city pages are noindex via meta.

User-agent: *
Allow: /

# Sitemaps (only high-quality indexed pages)
Sitemap: ${BASE_URL}/sitemap.xml

# Crawl-delay for polite crawling
Crawl-delay: 1

# Block admin, API, and internal routes
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

# Block old massive sitemaps path (no longer generated)
Disallow: /sitemaps-massive/

# Googlebot specific - no crawl delay needed
User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /sitemaps-massive/

User-agent: Bingbot
Allow: /
Crawl-delay: 2

User-agent: Yandex
Allow: /
Crawl-delay: 2
`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
