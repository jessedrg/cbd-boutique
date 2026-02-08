// =============================================================================
// CBD BOUTIQUE - SEO INDEX & NOINDEX STRATEGY
// =============================================================================
// This file defines EXACTLY which pages get indexed and which get noindex.
// Goal: Only index pages with real value. Noindex thin/duplicate content.
//
// BEFORE: ~630,000+ pages all set to index:true (massive thin content risk)
// AFTER:  ~1,200-2,000 high-quality indexed pages + everything else noindex
// =============================================================================

import { LOCALES, CATEGORIES, type Locale, type Category } from "./seo-data";

// =============================================================================
// TIER 1: INDEX - HIGH VALUE PAGES (always indexed, in sitemaps)
// =============================================================================
// These pages have unique content, real search volume, and actual user value.
//
// 1. Static pages: homepage, locale homes, about, contact
//    Count: 1 + 10 + 10 + 10 = 31
//
// 2. Pure category pages: /{locale}/{category-slug}
//    These are the core money pages. Each has the Shopify products grid,
//    category-specific content, and unique meta descriptions.
//    Count: 10 locales x 10 categories = 100
//
// 3. Product landing pages: /{locale}/productos/{type}
//    Rich content pages with 300+ words, FAQs, dosage guides, reviews.
//    Count: 10 locales x 6 types = 60
//
// 4. Shopify product detail pages: /{locale}/product/{handle}
//    Real product pages with images, descriptions, prices.
//    Count: dynamic (depends on Shopify catalog)
//
// TOTAL TIER 1: ~191 + Shopify products

// =============================================================================
// TIER 2: INDEX - MEDIUM VALUE (indexed, in sitemaps, but lower priority)
// =============================================================================
// Category + Top City pages for cities with population > 100,000
// ONLY for the primary country of each locale.
// These have real local search intent ("comprar aceite cbd madrid").
//
// Count per locale: ~10-40 cities x 10 categories = 100-400
// Total across 10 locales: ~1,000-2,000
//
// Also: "buy/comprar" intent + category (1 intent x 10 categories x 10 locales = 100)
// This is the highest-intent keyword and deserves its own page.

// =============================================================================
// TIER 3: NOINDEX - THIN CONTENT (rendered but noindex, NOT in sitemaps)
// =============================================================================
// These pages still render (no 404) but get noindex meta tag.
// Google can crawl them via internal links but won't index them.
//
// - Category + small cities (pop < 100,000)
// - Category + non-primary country cities (Mexico cities for /es/, etc.)
// - All intent + category combos except "buy" (best, cheap, premium, etc.)
// - All intent + category + city triple combos
// - All modifier + category combos (organic, premium, lab-tested)
// - All massive sitemap pages
//
// TOTAL TIER 3: ~628,000+ pages -> NOINDEX

// =============================================================================
// CONFIGURATION
// =============================================================================

// Minimum population for a city page to be indexed
export const MIN_CITY_POPULATION_FOR_INDEX = 100_000;

// Primary country per locale (only index cities from this country)
export const PRIMARY_COUNTRY: Record<Locale, string> = {
  es: "spain",
  en: "uk",
  de: "germany",
  fr: "france",
  it: "italy",
  pt: "portugal",
  nl: "netherlands",
  pl: "poland",
  cs: "czechia",
  el: "greece",
};

// The ONLY search intent that gets its own indexed page
// All other intents (best, cheap, premium, organic, etc.) are noindex
export const INDEXED_INTENTS = ["buy"] as const;

// Product landing page types that get indexed
export const INDEXED_PRODUCT_TYPES = [
  "cbd-oil",
  "cbd-vape",
  "cbd-flowers",
  "cbd-capsules",
  "cbd-isolate",
  "cbd-edibles",
] as const;

// =============================================================================
// INDEXABILITY CHECK FUNCTION
// =============================================================================
// This is the single source of truth for whether a page gets indexed.
// Used by: generateMetadata() in page.tsx, sitemap generators.

export interface PageSignals {
  locale: Locale;
  category: Category | null;
  intent: string | null;
  city: { name: string; slug: string; population?: number; country?: string } | null;
}

export type IndexTier = "tier1" | "tier2" | "noindex";

export interface IndexDecision {
  index: boolean;
  tier: IndexTier;
  reason: string;
  canonicalOverride?: string; // If set, point canonical to this URL instead
  sitemapPriority: number;
}

export function getIndexDecision(signals: PageSignals): IndexDecision {
  const { locale, category, intent, city } = signals;

  // --- TIER 1: Pure category page (no intent, no city) ---
  if (category && !intent && !city) {
    return {
      index: true,
      tier: "tier1",
      reason: "Pure category page - core money page",
      sitemapPriority: 0.9,
    };
  }

  // --- TIER 1: "buy" intent + category (no city) ---
  if (category && intent === "buy" && !city) {
    return {
      index: true,
      tier: "tier1",
      reason: "Buy intent + category - highest commercial intent",
      sitemapPriority: 0.85,
    };
  }

  // --- NOINDEX: Any other intent + category (no city) ---
  if (category && intent && intent !== "buy" && !city) {
    // Canonicalize to the pure category page
    return {
      index: false,
      tier: "noindex",
      reason: `Intent "${intent}" is duplicate of category page - noindex`,
      sitemapPriority: 0,
    };
  }

  // --- TIER 2 or NOINDEX: Category + City ---
  if (category && city && !intent) {
    const isPrimaryCountry = city.country === PRIMARY_COUNTRY[locale];
    const isLargeCity = (city.population || 0) >= MIN_CITY_POPULATION_FOR_INDEX;

    if (isPrimaryCountry && isLargeCity) {
      return {
        index: true,
        tier: "tier2",
        reason: `Category + major city (${city.name}, pop ${city.population}) - real local intent`,
        sitemapPriority: 0.7,
      };
    }

    return {
      index: false,
      tier: "noindex",
      reason: isPrimaryCountry
        ? `City too small (${city.name}, pop ${city.population || "unknown"}) - noindex`
        : `Non-primary country city (${city.country}) for locale ${locale} - noindex`,
      sitemapPriority: 0,
    };
  }

  // --- NOINDEX: Intent + Category + City (always thin) ---
  if (category && intent && city) {
    return {
      index: false,
      tier: "noindex",
      reason: "Triple combo (intent+category+city) - always thin content",
      sitemapPriority: 0,
    };
  }

  // --- NOINDEX: No category detected (malformed URL) ---
  if (!category) {
    return {
      index: false,
      tier: "noindex",
      reason: "No category detected - cannot classify page",
      sitemapPriority: 0,
    };
  }

  // Default: noindex for safety
  return {
    index: false,
    tier: "noindex",
    reason: "Unclassified page pattern - default noindex",
    sitemapPriority: 0,
  };
}

// =============================================================================
// SITEMAP URL GENERATOR
// =============================================================================
// Only generates URLs for pages that should be indexed (tier1 + tier2).

export function getIndexableUrls(
  locale: Locale,
  citiesByCountry: Record<string, { name: string; slug: string; population: number }[]>,
  catTranslations: Record<Category, string>,
  intentTranslations: Record<string, string>,
  baseUrl: string
): { url: string; priority: number; tier: IndexTier }[] {
  const urls: { url: string; priority: number; tier: IndexTier }[] = [];
  const prefix = `${baseUrl}/${locale}`;

  // TIER 1: Pure category pages
  for (const cat of CATEGORIES) {
    const catSlug = catTranslations[cat].replace(/ /g, "-");
    urls.push({ url: `${prefix}/${catSlug}`, priority: 0.9, tier: "tier1" });
  }

  // TIER 1: "buy" + category
  const buySlug = intentTranslations["buy"]?.replace(/ /g, "-");
  if (buySlug) {
    for (const cat of CATEGORIES) {
      const catSlug = catTranslations[cat].replace(/ /g, "-");
      urls.push({
        url: `${prefix}/${buySlug}-${catSlug}`,
        priority: 0.85,
        tier: "tier1",
      });
    }
  }

  // TIER 2: Category + major city (primary country, pop > 100k)
  const primaryCountry = PRIMARY_COUNTRY[locale];
  const primaryCities = citiesByCountry[primaryCountry] || [];
  const majorCities = primaryCities.filter(
    (c) => c.population >= MIN_CITY_POPULATION_FOR_INDEX
  );

  for (const city of majorCities) {
    for (const cat of CATEGORIES) {
      const catSlug = catTranslations[cat].replace(/ /g, "-");
      urls.push({
        url: `${prefix}/${catSlug}-${city.slug}`,
        priority: 0.7,
        tier: "tier2",
      });
    }
  }

  return urls;
}

// =============================================================================
// SUMMARY: INDEX BUDGET
// =============================================================================
// 
// Locale  | Tier1 (cat+buy) | Tier2 (cat+city>100k) | Total Indexed
// --------|-----------------|----------------------|---------------
// es      | 20              | ~40 cities x 10 = 400 | ~420
// en      | 20              | ~15 cities x 10 = 150 | ~170
// de      | 20              | ~15 cities x 10 = 150 | ~170
// fr      | 20              | ~5 cities x 10 = 50   | ~70
// it      | 20              | ~8 cities x 10 = 80   | ~100
// pt      | 20              | ~3 cities x 10 = 30   | ~50
// nl      | 20              | ~5 cities x 10 = 50   | ~70
// pl      | 20              | ~5 cities x 10 = 50   | ~70
// cs      | 20              | ~1 city x 10 = 10     | ~30
// el      | 20              | ~2 cities x 10 = 20   | ~40
// --------|-----------------|----------------------|---------------
// TOTAL   | 200             | ~990                  | ~1,190
//
// Plus static pages: ~31
// Plus product landings: ~60
// Plus Shopify products: variable
//
// GRAND TOTAL INDEXED: ~1,300 pages (down from ~630,000)
// =============================================================================
