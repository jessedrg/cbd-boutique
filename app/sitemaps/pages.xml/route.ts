import { SUPPORTED_LOCALES } from "@/lib/seo-data";
import { INDEXED_PRODUCT_TYPES } from "@/lib/seo-index";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cbdboutique.io";

export async function GET() {
  const urls: { loc: string; priority: number; changefreq: string }[] = [];
  
  // Homepage
  urls.push({ loc: BASE_URL, priority: 1.0, changefreq: "daily" });
  
  // Locale homepages
  for (const locale of SUPPORTED_LOCALES) {
    urls.push({ loc: `${BASE_URL}/${locale}`, priority: 1.0, changefreq: "daily" });
  }

  // Static pages per locale
  for (const locale of SUPPORTED_LOCALES) {
    urls.push({ loc: `${BASE_URL}/${locale}/about`, priority: 0.5, changefreq: "monthly" });
    urls.push({ loc: `${BASE_URL}/${locale}/contact`, priority: 0.5, changefreq: "monthly" });
  }
  
  // Static pages without locale
  urls.push({ loc: `${BASE_URL}/about`, priority: 0.4, changefreq: "monthly" });
  urls.push({ loc: `${BASE_URL}/contact`, priority: 0.4, changefreq: "monthly" });

  // Product landing pages (rich content, high value)
  for (const locale of SUPPORTED_LOCALES) {
    for (const type of INDEXED_PRODUCT_TYPES) {
      urls.push({ loc: `${BASE_URL}/${locale}/productos/${type}`, priority: 0.8, changefreq: "weekly" });
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ loc, priority, changefreq }) => `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
