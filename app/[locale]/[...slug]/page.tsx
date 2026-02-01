import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/store/header";
import { Features } from "@/components/store/features";
import { CTA } from "@/components/store/cta";
import { Footer } from "@/components/store/footer";
import { 
  SUPPORTED_LOCALES, 
  TRANSLATIONS, 
  CATEGORIES, 
  CATEGORY_TRANSLATIONS,
  LOCALES,
  INTENT_TRANSLATIONS,
  PREPOSITION_IN,
  PRODUCT_TYPES,
  type Locale, 
  type Category 
} from "@/lib/seo-data";
import citiesData from "@/lib/cities-processed.json";

// Type for cities data
type CityData = { name: string; slug: string; population: number };
const CITIES_DB = citiesData as Record<string, CityData[]>;
import { Leaf, FlaskConical, Truck, Shield, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Force dynamic - no build time generation
export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ locale: string; slug: string[] }>;
}

// Parse the slug to extract intent, category, and city
function parseSlug(slugParts: string[], locale: Locale) {
  const fullSlug = slugParts.join('-').toLowerCase();
  const catTranslations = CATEGORY_TRANSLATIONS[locale] || CATEGORY_TRANSLATIONS.en;
  const intentTranslations = INTENT_TRANSLATIONS[locale] || INTENT_TRANSLATIONS.en;
  
  let detectedCategory: Category | null = null;
  let detectedIntent: string | null = null;
  let detectedCity: { name: string; slug: string } | null = null;
  
  // Find category
  for (const cat of CATEGORIES) {
    const translatedCat = catTranslations[cat].replace(/ /g, '-').toLowerCase();
    if (fullSlug.includes(translatedCat) || fullSlug.includes(cat)) {
      detectedCategory = cat;
      break;
    }
  }
  
  // Find intent
  for (const [intentKey, intentValue] of Object.entries(intentTranslations)) {
    const intentSlug = intentValue.replace(/ /g, '-').toLowerCase();
    if (fullSlug.startsWith(intentSlug) || fullSlug.includes(`-${intentSlug}-`)) {
      detectedIntent = intentKey;
      break;
    }
  }
  
  // Find city from massive database
  const localeData = LOCALES[locale];
  for (const country of localeData.countries) {
    const cities = CITIES_DB[country];
    if (cities) {
      for (const city of cities) {
        if (fullSlug.includes(city.slug)) {
          detectedCity = { name: city.name, slug: city.slug };
          break;
        }
      }
    }
    if (detectedCity) break;
  }
  
  return { category: detectedCategory, intent: detectedIntent, city: detectedCity };
}

// Generate SEO-optimized title
function generateTitle(category: Category | null, intent: string | null, city: { name: string; slug: string } | null, locale: Locale): string {
  const catTranslations = CATEGORY_TRANSLATIONS[locale] || CATEGORY_TRANSLATIONS.en;
  const intentTranslations = INTENT_TRANSLATIONS[locale] || INTENT_TRANSLATIONS.en;
  const preposition = PREPOSITION_IN[locale] || 'in';
  
  let title = '';
  
  if (intent && intentTranslations[intent as keyof typeof intentTranslations]) {
    title += intentTranslations[intent as keyof typeof intentTranslations].charAt(0).toUpperCase() + 
             intentTranslations[intent as keyof typeof intentTranslations].slice(1) + ' ';
  }
  
  if (category) {
    title += catTranslations[category].charAt(0).toUpperCase() + catTranslations[category].slice(1);
  }
  
  if (city) {
    title += ` ${preposition} ${city.name}`;
  }
  
  return title || 'CBD Products';
}

// Generate SEO description
function generateDescription(category: Category | null, intent: string | null, city: { name: string; slug: string } | null, locale: Locale): string {
  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;
  const catTranslations = CATEGORY_TRANSLATIONS[locale] || CATEGORY_TRANSLATIONS.en;
  
  const categoryName = category ? catTranslations[category] : 'CBD';
  const cityText = city ? ` ${PREPOSITION_IN[locale]} ${city.name}` : '';
  
  const descriptions: Record<string, string> = {
    es: `Compra ${categoryName}${cityText} de la más alta calidad. Productos orgánicos, testados en laboratorio, envío discreto 24-48h. ✓ Legal ✓ Certificado ✓ Garantía`,
    en: `Buy ${categoryName}${cityText} of the highest quality. Organic, lab-tested products, discreet shipping 24-48h. ✓ Legal ✓ Certified ✓ Guaranteed`,
    de: `Kaufen Sie ${categoryName}${cityText} in höchster Qualität. Bio, laborgetestet, diskreter Versand 24-48h. ✓ Legal ✓ Zertifiziert ✓ Garantiert`,
    fr: `Achetez ${categoryName}${cityText} de la plus haute qualité. Bio, testé en labo, livraison discrète 24-48h. ✓ Légal ✓ Certifié ✓ Garanti`,
    it: `Acquista ${categoryName}${cityText} della massima qualità. Biologico, testato in laboratorio, spedizione discreta 24-48h. ✓ Legale ✓ Certificato ✓ Garantito`,
    pt: `Compre ${categoryName}${cityText} da mais alta qualidade. Orgânico, testado em laboratório, envio discreto 24-48h. ✓ Legal ✓ Certificado ✓ Garantido`,
    nl: `Koop ${categoryName}${cityText} van de hoogste kwaliteit. Biologisch, labgetest, discrete verzending 24-48u. ✓ Legaal ✓ Gecertificeerd ✓ Gegarandeerd`,
    pl: `Kup ${categoryName}${cityText} najwyższej jakości. Organiczne, testowane laboratoryjnie, dyskretna wysyłka 24-48h. ✓ Legalny ✓ Certyfikowany ✓ Gwarantowany`,
    cs: `Kupte ${categoryName}${cityText} nejvyšší kvality. Bio, laboratorně testované, diskrétní doručení 24-48h. ✓ Legální ✓ Certifikováno ✓ Zaručeno`,
    el: `Αγοράστε ${categoryName}${cityText} υψηλότερης ποιότητας. Βιολογικό, εργαστηριακά ελεγμένο, διακριτική αποστολή 24-48ω. ✓ Νόμιμο ✓ Πιστοποιημένο ✓ Εγγυημένο`,
  };
  
  return descriptions[locale] || descriptions.en;
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const validLocale = SUPPORTED_LOCALES.includes(locale as Locale) ? locale as Locale : 'en';
  const { category, intent, city } = parseSlug(slug || [], validLocale);
  
  const title = generateTitle(category, intent, city, validLocale);
  const description = generateDescription(category, intent, city, validLocale);
  const canonicalUrl = `/${locale}/${slug?.join('/') || ''}`;
  
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${title} | CBD Boutique`,
      description,
      url: canonicalUrl,
      siteName: 'CBD Boutique',
      locale: locale === 'es' ? 'es_ES' : locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      type: 'website',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | CBD Boutique`,
      description,
      images: ['/og-image.jpg'],
    },
    robots: { index: true, follow: true },
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const validLocale = SUPPORTED_LOCALES.includes(locale as Locale) ? locale as Locale : 'en';
  const t = TRANSLATIONS[validLocale] || TRANSLATIONS.en;
  const catTranslations = CATEGORY_TRANSLATIONS[validLocale] || CATEGORY_TRANSLATIONS.en;
  
  const { category, intent, city } = parseSlug(slug || [], validLocale);
  const pageTitle = generateTitle(category, intent, city, validLocale);
  const pageDescription = generateDescription(category, intent, city, validLocale);
  
  // Get product types for this category
  const productTypes = category ? PRODUCT_TYPES[category] : [];
  
  // Get related categories
  const relatedCategories = CATEGORIES.filter(c => c !== category).slice(0, 4);

  // Category images
  const categoryImages: Record<Category, string> = {
    'cbd-oil': 'https://images.unsplash.com/photo-1556928045-16f7f50be0f3?w=800&h=600&fit=crop',
    'cbd-flowers': 'https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=800&h=600&fit=crop',
    'cbd-edibles': 'https://images.unsplash.com/photo-1629398778375-39113a6d6d1a?w=800&h=600&fit=crop',
    'cbd-cosmetics': 'https://images.unsplash.com/photo-1584091779872-08a4377c24be?w=800&h=600&fit=crop',
    'cbd-vape': 'https://images.unsplash.com/photo-1605117913123-1f455435b384?w=800&h=600&fit=crop',
    'cbd-capsules': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=600&fit=crop',
    'cbd-pets': 'https://moosesmokeshop.com/cdn/shop/products/cbd_pet_canninus_grandes.jpg?v=1689900237',
    'cbd-isolate': 'https://theimperiumcbd.com/wp-content/uploads/2022/12/CBD-Isolate-scaled-scaled.jpg',
    'cbd-topicals': 'https://www.beautymarket.es/estetica/fotos/33164_bew3.jpg',
    'cbd-tinctures': 'https://images.unsplash.com/photo-1556928045-16f7f50be0f3?w=800&h=600&fit=crop',
  };

  const heroImage = category ? categoryImages[category] : 'https://images.unsplash.com/photo-1617101815102-e5728e6685fc?w=1920&h=1080&fit=crop';

  return (
    <main className="min-h-screen bg-background">
      <Header locale={validLocale} transparent />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={pageTitle}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-32">
          <div className="max-w-2xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-white/60 text-sm mb-6">
              <Link href={`/${validLocale}`} className="hover:text-white transition-colors">
                {t.nav.home}
              </Link>
              <span>/</span>
              {category && (
                <>
                  <Link href={`/${validLocale}/${category}`} className="hover:text-white transition-colors capitalize">
                    {catTranslations[category]}
                  </Link>
                  {city && <span>/</span>}
                </>
              )}
              {city && <span className="text-white">{city.name}</span>}
            </nav>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight mb-6">
              {pageTitle}
            </h1>
            
            {/* Description */}
            <p className="text-lg text-white/80 font-light mb-8 max-w-xl">
              {pageDescription}
            </p>
            
            {/* Trust badges - translated for all locales */}
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Leaf, text: { es: 'Orgánico', en: 'Organic', de: 'Bio', fr: 'Bio', it: 'Biologico', pt: 'Orgânico', nl: 'Biologisch', pl: 'Organiczny', cs: 'Bio', el: 'Βιολογικό' }[validLocale] || 'Organic' },
                { icon: FlaskConical, text: { es: 'Testado', en: 'Lab Tested', de: 'Laborgetestet', fr: 'Testé Labo', it: 'Testato', pt: 'Testado', nl: 'Labgetest', pl: 'Testowany', cs: 'Testováno', el: 'Ελεγμένο' }[validLocale] || 'Lab Tested' },
                { icon: Truck, text: { es: 'Envío 24h', en: '24h Shipping', de: 'Versand 24h', fr: 'Livraison 24h', it: 'Spedizione 24h', pt: 'Envio 24h', nl: 'Verzending 24u', pl: 'Wysyłka 24h', cs: 'Doručení 24h', el: 'Αποστολή 24ω' }[validLocale] || '24h Shipping' },
                { icon: Shield, text: { es: 'Legal', en: 'Legal', de: 'Legal', fr: 'Légal', it: 'Legale', pt: 'Legal', nl: 'Legaal', pl: 'Legalny', cs: 'Legální', el: 'Νόμιμο' }[validLocale] || 'Legal' },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-white/80 text-sm">
                  <badge.icon className="h-4 w-4" strokeWidth={1.5} />
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
            
            {/* CTA */}
            <Button size="lg" className="h-14 px-10 text-xs uppercase tracking-[0.2em] font-medium rounded-none" asChild>
              <Link href={`/${validLocale}/${category || 'cbd-oil'}`}>
                {t.hero.cta}
                <ArrowRight className="ml-3 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <Features locale={validLocale} />

      {/* Product Types Section */}
      {productTypes.length > 0 && (
        <section className="py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
                {locale === 'es' ? 'Tipos de Producto' : 'Product Types'}
              </span>
              <h2 className="text-3xl lg:text-4xl font-serif font-light tracking-tight">
                {category ? catTranslations[category] : 'CBD'} {locale === 'es' ? 'Disponibles' : 'Available'}
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {productTypes.map((type) => (
                <Link
                  key={type}
                  href={`/${validLocale}/${category}-${type}`}
                  className="group p-6 bg-background border border-border/50 hover:border-foreground/20 transition-colors text-center"
                >
                  <h3 className="text-sm font-medium capitalize group-hover:text-foreground/80 transition-colors">
                    {type.replace(/-/g, ' ')}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Local SEO Content Section */}
      {city && (
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
                  {locale === 'es' ? `CBD en ${city.name}` : `CBD in ${city.name}`}
                </span>
                <h2 className="text-3xl lg:text-4xl font-serif font-light tracking-tight mb-6">
                  {locale === 'es' 
                    ? `Tu tienda de CBD de confianza en ${city.name}` 
                    : `Your trusted CBD shop in ${city.name}`}
                </h2>
                <div className="space-y-4 text-muted-foreground font-light">
                  <p>
                    {locale === 'es'
                      ? `Descubre la mejor selección de productos CBD premium en ${city.name}. Ofrecemos envío discreto y rápido a toda la ciudad y alrededores.`
                      : `Discover the best selection of premium CBD products in ${city.name}. We offer discreet and fast shipping throughout the city and surrounding areas.`}
                  </p>
                  <p>
                    {locale === 'es'
                      ? `Todos nuestros productos son 100% legales, orgánicos y testados en laboratorios independientes. Garantizamos la máxima calidad y pureza.`
                      : `All our products are 100% legal, organic and tested in independent laboratories. We guarantee the highest quality and purity.`}
                  </p>
                </div>
                
                <ul className="mt-8 space-y-3">
                  {[
                    locale === 'es' ? 'Envío discreto en 24-48h' : 'Discreet shipping in 24-48h',
                    locale === 'es' ? 'Productos certificados y legales' : 'Certified and legal products',
                    locale === 'es' ? 'Atención al cliente especializada' : 'Specialized customer service',
                    locale === 'es' ? 'Garantía de satisfacción' : 'Satisfaction guarantee',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-foreground/70" strokeWidth={2} />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="relative aspect-square">
                <Image
                  src={heroImage}
                  alt={`CBD ${city.name}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Categories */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-light tracking-tight">
              {locale === 'es' ? 'Otras Categorías' : 'Other Categories'}
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedCategories.map((cat) => (
              <Link
                key={cat}
                href={`/${validLocale}/${cat}`}
                className="group relative aspect-[3/4] overflow-hidden bg-muted"
              >
                <Image
                  src={categoryImages[cat]}
                  alt={catTranslations[cat]}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg text-white font-serif font-light capitalize">
                    {catTranslations[cat]}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA locale={validLocale} />
      <Footer locale={validLocale} />
    </main>
  );
}
