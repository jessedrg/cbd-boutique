// =============================================================================
// SEO AUDIT REPORT - Downloadable INDEX / NOINDEX classification
// =============================================================================
// GET /api/seo-audit           -> JSON summary
// GET /api/seo-audit?format=csv -> CSV download (for Google Search Console bulk removal)
// GET /api/seo-audit?format=txt -> Plain text list of noindex URLs
// =============================================================================

import {
  SUPPORTED_LOCALES,
  LOCALES,
  CATEGORIES,
  CATEGORY_TRANSLATIONS,
  CATEGORY_SLUGS,
  INTENT_TRANSLATIONS,
  SEARCH_INTENTS,
  CITIES_BY_COUNTRY,
  type Locale,
  type Category,
} from "@/lib/seo-data";
import {
  getIndexDecision,
  PRIMARY_COUNTRY,
  INDEXED_PRODUCT_TYPES,
  MIN_CITY_POPULATION_FOR_INDEX,
  type PageSignals,
} from "@/lib/seo-index";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cbdboutique.io";

interface AuditEntry {
  url: string;
  locale: string;
  type: string;
  index: boolean;
  tier: string;
  reason: string;
  priority: number;
}

function buildFullAudit(): AuditEntry[] {
  const entries: AuditEntry[] = [];

  for (const locale of SUPPORTED_LOCALES) {
    const catTrans = CATEGORY_TRANSLATIONS[locale] || CATEGORY_TRANSLATIONS.en;
    const catSlugs = CATEGORY_SLUGS[locale] || CATEGORY_SLUGS.en;
    const intentTrans = INTENT_TRANSLATIONS[locale] || INTENT_TRANSLATIONS.en;
    const localeData = LOCALES[locale];

    // --- Static pages ---
    entries.push({
      url: `${BASE_URL}/${locale}`,
      locale,
      type: "homepage",
      index: true,
      tier: "tier1",
      reason: "Locale homepage",
      priority: 1.0,
    });

    for (const page of ["about", "contact"]) {
      entries.push({
        url: `${BASE_URL}/${locale}/${page}`,
        locale,
        type: "static",
        index: true,
        tier: "tier1",
        reason: `Static ${page} page`,
        priority: 0.5,
      });
    }

    // --- Product landing pages ---
    for (const productType of INDEXED_PRODUCT_TYPES) {
      entries.push({
        url: `${BASE_URL}/${locale}/productos/${productType}`,
        locale,
        type: "product-landing",
        index: true,
        tier: "tier1",
        reason: "Rich product landing (300+ words, FAQs, reviews)",
        priority: 0.8,
      });
    }

    // --- Pure category pages ---
    for (const cat of CATEGORIES) {
      const catSlug = catSlugs[cat];
      const decision = getIndexDecision({ locale, category: cat, intent: null, city: null });
      entries.push({
        url: `${BASE_URL}/${locale}/${catSlug}`,
        locale,
        type: "category",
        index: decision.index,
        tier: decision.tier,
        reason: decision.reason,
        priority: decision.sitemapPriority,
      });
    }

    // --- Intent + category pages ---
    for (const intent of SEARCH_INTENTS) {
      const intentSlug = intentTrans[intent]?.replace(/ /g, "-");
      if (!intentSlug) continue;

      for (const cat of CATEGORIES) {
        const catSlug = catSlugs[cat];
        const decision = getIndexDecision({ locale, category: cat, intent, city: null });
        entries.push({
          url: `${BASE_URL}/${locale}/${intentSlug}-${catSlug}`,
          locale,
          type: "intent+category",
          index: decision.index,
          tier: decision.tier,
          reason: decision.reason,
          priority: decision.sitemapPriority,
        });
      }
    }

    // --- Category + city pages (all countries for this locale) ---
    for (const country of localeData.countries) {
      const cities = CITIES_BY_COUNTRY[country] || [];
      for (const city of cities) {
        for (const cat of CATEGORIES) {
          const catSlug = catSlugs[cat];
          const decision = getIndexDecision({
            locale,
            category: cat,
            intent: null,
            city: { name: city.name, slug: city.slug, population: city.population, country },
          });
          entries.push({
            url: `${BASE_URL}/${locale}/${catSlug}-${city.slug}`,
            locale,
            type: "category+city",
            index: decision.index,
            tier: decision.tier,
            reason: decision.reason,
            priority: decision.sitemapPriority,
          });
        }
      }
    }
  }

  return entries;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format") || "json";
  const filter = searchParams.get("filter"); // "index", "noindex", or null for all

  const allEntries = buildFullAudit();
  const filtered = filter === "index"
    ? allEntries.filter(e => e.index)
    : filter === "noindex"
      ? allEntries.filter(e => !e.index)
      : allEntries;

  // --- Summary stats ---
  const indexCount = allEntries.filter(e => e.index).length;
  const noindexCount = allEntries.filter(e => !e.index).length;
  const byLocale: Record<string, { index: number; noindex: number }> = {};
  const byType: Record<string, { index: number; noindex: number }> = {};

  for (const entry of allEntries) {
    if (!byLocale[entry.locale]) byLocale[entry.locale] = { index: 0, noindex: 0 };
    if (!byType[entry.type]) byType[entry.type] = { index: 0, noindex: 0 };
    if (entry.index) {
      byLocale[entry.locale].index++;
      byType[entry.type].index++;
    } else {
      byLocale[entry.locale].noindex++;
      byType[entry.type].noindex++;
    }
  }

  // --- CSV format (for Google Search Console or spreadsheet) ---
  if (format === "csv") {
    const header = "url,locale,type,index,tier,reason,priority";
    const rows = filtered.map(e =>
      `"${e.url}","${e.locale}","${e.type}","${e.index}","${e.tier}","${e.reason}","${e.priority}"`
    );
    const csv = [header, ...rows].join("\n");

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="seo-audit-${filter || "all"}-${new Date().toISOString().split("T")[0]}.csv"`,
        "Cache-Control": "no-cache",
      },
    });
  }

  // --- TXT format (plain URL list, useful for GSC URL removal tool) ---
  if (format === "txt") {
    const urls = filtered.map(e => e.url).join("\n");

    return new Response(urls, {
      headers: {
        "Content-Type": "text/plain",
        "Content-Disposition": `attachment; filename="seo-${filter || "all"}-urls-${new Date().toISOString().split("T")[0]}.txt"`,
        "Cache-Control": "no-cache",
      },
    });
  }

  // --- JSON format (full audit with summary) ---
  return Response.json({
    generated: new Date().toISOString(),
    summary: {
      total: allEntries.length,
      index: indexCount,
      noindex: noindexCount,
      reduction: `${((noindexCount / allEntries.length) * 100).toFixed(1)}% of pages are now noindex`,
      byLocale,
      byType,
      thresholds: {
        minCityPopulation: MIN_CITY_POPULATION_FOR_INDEX,
        primaryCountries: PRIMARY_COUNTRY,
        indexedIntents: ["buy"],
        indexedProductTypes: INDEXED_PRODUCT_TYPES,
      },
    },
    instructions: {
      sitemap: `Submit ONLY ${BASE_URL}/sitemap.xml to Google Search Console`,
      noindex: "Noindex pages use <meta name='robots' content='noindex, follow'> automatically",
      gscRemoval: `Download the noindex URL list: ${BASE_URL}/api/seo-audit?format=txt&filter=noindex`,
      csvAudit: `Download full CSV audit: ${BASE_URL}/api/seo-audit?format=csv`,
      indexOnly: `Download indexed URLs only: ${BASE_URL}/api/seo-audit?format=csv&filter=index`,
    },
    entries: filtered.slice(0, 200),
    note: filtered.length > 200
      ? `Showing first 200 of ${filtered.length} entries. Use ?format=csv for complete download.`
      : undefined,
  }, {
    headers: { "Cache-Control": "no-cache" },
  });
}
