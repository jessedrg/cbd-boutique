import type { Metadata } from "next";
import { Header } from "@/components/store/header";
import { Features } from "@/components/store/features";
import { ShopifyProducts } from "@/components/store/shopify-products";
import { CTA } from "@/components/store/cta";
import { Footer } from "@/components/store/footer";
import { formatSlugToTitle, getLocale, getT, type Locale } from "@/lib/seo-lite";
import { type Category } from "@/lib/seo-data";

// Map translated category slugs to Shopify collection handles
const COLLECTION_MAP: Record<string, Category> = {
  // Spanish
  'sillas-de-ruedas': 'wheelchairs',
  'andadores': 'walkers',
  'bastones': 'canes',
  'seguridad-bano': 'bathroom-safety',
  'camas': 'beds',
  'cojines': 'cushions',
  'rampas': 'ramps',
  'sillones-elevadores': 'lift-chairs',
  'scooters': 'scooters',
  'accesorios': 'accessories',
  // English
  'wheelchairs': 'wheelchairs',
  'walkers': 'walkers',
  'canes': 'canes',
  'bathroom-safety': 'bathroom-safety',
  'beds': 'beds',
  'cushions': 'cushions',
  'ramps': 'ramps',
  'lift-chairs': 'lift-chairs',
  'scooters': 'scooters',
  'accessories': 'accessories',
  // German
  'rollstuhle': 'wheelchairs',
  'rollatoren': 'walkers',
  'gehstocke': 'canes',
  'badsicherheit': 'bathroom-safety',
  'betten': 'beds',
  'kissen': 'cushions',
  'rampen': 'ramps',
  'aufstehsessel': 'lift-chairs',
  'zubehor': 'accessories',
  // French
  'fauteuils-roulants': 'wheelchairs',
  'deambulateurs': 'walkers',
  'cannes': 'canes',
  'securite-salle-de-bain': 'bathroom-safety',
  'lits': 'beds',
  'coussins': 'cushions',
  'rampes': 'ramps',
  'fauteuils-releveurs': 'lift-chairs',
  'accessoires': 'accessories',
};

// Extract collection handle from slug parts
function extractCollectionFromSlug(slugParts: string[]): string | undefined {
  // Join slug parts and look for category keywords
  const fullSlug = slugParts.join('-').toLowerCase();
  
  // Check each collection key
  for (const [key, collection] of Object.entries(COLLECTION_MAP)) {
    if (fullSlug.includes(key)) {
      return collection;
    }
  }
  
  return undefined;
}

// Force dynamic - no build time generation
export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ locale: string; slug: string[] }>;
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = getT(locale);
  const title = formatSlugToTitle(slug?.join('-') || '');
  const pageTitle = title || t.products;
  const description = `${pageTitle}. ${t.shipping}. ${t.warranty}. ${t.support}. ${t.qualityDesc}`;
  const canonicalUrl = `/${locale}/${slug?.join('/') || ''}`;
  
  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${pageTitle} | Vidalib`,
      description,
      url: canonicalUrl,
      siteName: 'Vidalib',
      locale: locale === 'es' ? 'es_ES' : locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${pageTitle} - Vidalib`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pageTitle} | Vidalib`,
      description,
      images: ['/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const validLocale = getLocale(locale);
  const t = getT(locale);
  const pageTitle = formatSlugToTitle(slug?.join('-') || '') || t.products;
  
  // Extract collection from slug for product filtering
  const collection = extractCollectionFromSlug(slug || []);

  return (
    <main className="min-h-screen bg-background">
      <Header locale={validLocale} />
      
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-muted-foreground mb-4">
            <a href={`/${validLocale}`} className="hover:text-foreground">{t.home}</a>
            <span className="mx-2">/</span>
            <span className="text-foreground">{pageTitle}</span>
          </nav>
          
          <h1 className="text-3xl lg:text-5xl font-serif font-medium tracking-tight mb-6 text-balance">
            {pageTitle}
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-3xl mb-8">
            {t.description}
          </p>
          
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-background rounded-full border">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              {t.shipping}
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-background rounded-full border">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              {t.warranty}
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-background rounded-full border">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              {t.support}
            </span>
          </div>
        </div>
      </section>

      <Features locale={validLocale} />
      <ShopifyProducts locale={validLocale} collection={collection} title={pageTitle} limit={12} />
      
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-serif font-medium mb-4">{pageTitle}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.description}
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  {t.shipping}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  {t.warranty}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  {t.support}
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-background rounded-lg border">
                <h4 className="font-medium mb-1">{t.warranty}</h4>
                <p className="text-sm text-muted-foreground">{t.qualityDesc}</p>
              </div>
              <div className="p-4 bg-background rounded-lg border">
                <h4 className="font-medium mb-1">{t.shipping}</h4>
                <p className="text-sm text-muted-foreground">{t.deliveryDesc}</p>
              </div>
              <div className="p-4 bg-background rounded-lg border">
                <h4 className="font-medium mb-1">{t.support}</h4>
                <p className="text-sm text-muted-foreground">{t.supportDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <CTA locale={validLocale} />
      <Footer locale={validLocale} />
    </main>
  );
}
