import { LOCALES } from "@/lib/seo-lite";

const BASE_URL = "https://vidalib.com";

export async function GET() {
  const sitemaps = [
    `${BASE_URL}/sitemaps/pages.xml`,
    ...LOCALES.map(locale => `${BASE_URL}/sitemaps/${locale}.xml`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(url => `  <sitemap>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
