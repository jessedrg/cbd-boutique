import { SUPPORTED_LOCALES, CATEGORIES, CATEGORY_TRANSLATIONS, LOCALES, INTENT_TRANSLATIONS, type Locale } from "@/lib/seo-data";
import { getIndexableUrls } from "@/lib/seo-index";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cbdboutique.io";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const cleanLocale = slug.replace('.xml', '') as Locale;
  
  if (!SUPPORTED_LOCALES.includes(cleanLocale)) {
    return new Response("Not found", { status: 404 });
  }

  const catTranslations = CATEGORY_TRANSLATIONS[cleanLocale] || CATEGORY_TRANSLATIONS.en;
  const intentTranslations = INTENT_TRANSLATIONS[cleanLocale] || INTENT_TRANSLATIONS.en;

  // Build cities by country from seo-data (inline, no massive JSON import)
  const localeData = LOCALES[cleanLocale];
  const citiesByCountry: Record<string, { name: string; slug: string; population: number }[]> = {};
  
  // Import cities from seo-data.ts (the small curated list, NOT the 45k massive file)
  const { CITIES_BY_COUNTRY } = await import("@/lib/seo-data");
  for (const country of localeData.countries) {
    if (CITIES_BY_COUNTRY[country]) {
      citiesByCountry[country] = CITIES_BY_COUNTRY[country];
    }
  }

  // Only get URLs that pass the index check
  const indexableUrls = getIndexableUrls(
    cleanLocale,
    citiesByCountry,
    catTranslations,
    intentTranslations as Record<string, string>,
    BASE_URL
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexableUrls.map(({ url, priority }) => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
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
