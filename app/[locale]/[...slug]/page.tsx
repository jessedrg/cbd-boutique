import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/store/header";
import { Features } from "@/components/store/features";
import { CTA } from "@/components/store/cta";
import { Footer } from "@/components/store/footer";
import { ShopifyProducts } from "@/components/store/shopify-products";
import { ScrollToProductsButton } from "@/components/store/scroll-to-products";
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
import { Leaf, FlaskConical, Truck, Shield, Check, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FAQSection, ProductSchema } from "@/components/seo/faq-section";

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

// Category images for OG
const OG_IMAGES: Record<string, string> = {
  'cbd-oil': 'https://images.unsplash.com/photo-1556928045-16f7f50be0f3?w=1200&h=630&fit=crop',
  'cbd-flowers': 'https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=1200&h=630&fit=crop',
  'cbd-edibles': 'https://images.unsplash.com/photo-1629398778375-39113a6d6d1a?w=1200&h=630&fit=crop',
  'cbd-cosmetics': 'https://images.unsplash.com/photo-1584091779872-08a4377c24be?w=1200&h=630&fit=crop',
  'cbd-vape': 'https://images.unsplash.com/photo-1605117913123-1f455435b384?w=1200&h=630&fit=crop',
  'cbd-capsules': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&h=630&fit=crop',
  'default': 'https://images.unsplash.com/photo-1612995923001-27d03779d023?w=1200&h=630&fit=crop',
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const validLocale = SUPPORTED_LOCALES.includes(locale as Locale) ? locale as Locale : 'en';
  const { category, intent, city } = parseSlug(slug || [], validLocale);
  
  const title = generateTitle(category, intent, city, validLocale);
  const description = generateDescription(category, intent, city, validLocale);
  const canonicalUrl = `/${locale}/${slug?.join('/') || ''}`;
  const ogImage = category ? (OG_IMAGES[category] || OG_IMAGES.default) : OG_IMAGES.default;
  
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | CBD Boutique`,
      description,
      images: [ogImage],
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

  // Translations for the page
  const texts: Record<string, { viewProducts: string; from: string; reviews: string; trusted: string }> = {
    es: { viewProducts: 'Ver Productos', from: 'Desde', reviews: 'Lo que dicen nuestros clientes', trusted: 'Tienda de confianza' },
    en: { viewProducts: 'View Products', from: 'From', reviews: 'What our customers say', trusted: 'Trusted shop' },
    de: { viewProducts: 'Produkte Ansehen', from: 'Ab', reviews: 'Was unsere Kunden sagen', trusted: 'Vertrauenswürdiger Shop' },
    fr: { viewProducts: 'Voir Produits', from: 'À partir de', reviews: 'Ce que disent nos clients', trusted: 'Boutique de confiance' },
    it: { viewProducts: 'Vedi Prodotti', from: 'Da', reviews: 'Cosa dicono i nostri clienti', trusted: 'Negozio di fiducia' },
    pt: { viewProducts: 'Ver Produtos', from: 'Desde', reviews: 'O que dizem nossos clientes', trusted: 'Loja de confiança' },
    nl: { viewProducts: 'Bekijk Producten', from: 'Vanaf', reviews: 'Wat onze klanten zeggen', trusted: 'Betrouwbare winkel' },
    pl: { viewProducts: 'Zobacz Produkty', from: 'Od', reviews: 'Co mówią nasi klienci', trusted: 'Zaufany sklep' },
  };
  const pageTexts = texts[validLocale] || texts.en;

  return (
    <main className="min-h-screen bg-background">
      <Header locale={validLocale} />
      
      {/* Modern Hero Section - Side by side layout */}
      <section className="pt-20 pb-16 lg:pt-24 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-muted-foreground text-sm mb-6">
                <Link href={`/${validLocale}`} className="hover:text-foreground transition-colors">
                  {t.nav.home}
                </Link>
                <span>/</span>
                {category && (
                  <span className="text-foreground capitalize">
                    {catTranslations[category]}
                  </span>
                )}
              </nav>
              
              {/* Badge */}
              <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
                CBD Boutique
              </span>
              
              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight mb-6">
                {pageTitle}
              </h1>
              
              {/* Description */}
              <p className="text-lg text-muted-foreground font-light mb-8 max-w-lg leading-relaxed">
                {pageDescription}
              </p>
              
              {/* Price indicator */}
              <div className="mb-8">
                <span className="text-sm text-muted-foreground">{pageTexts.from}</span>
                <p className="text-3xl font-light">15€</p>
              </div>
              
              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 mb-8">
                {[
                  { icon: Leaf, text: { es: 'Orgánico', en: 'Organic', de: 'Bio', fr: 'Bio' }[validLocale] || 'Organic' },
                  { icon: FlaskConical, text: { es: 'Testado', en: 'Lab Tested', de: 'Laborgetestet', fr: 'Testé' }[validLocale] || 'Lab Tested' },
                  { icon: Truck, text: { es: 'Envío 24h', en: '24h Shipping', de: 'Versand 24h', fr: 'Livraison 24h' }[validLocale] || '24h Shipping' },
                  { icon: Shield, text: { es: 'Legal', en: 'Legal', de: 'Legal', fr: 'Légal' }[validLocale] || 'Legal' },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 text-muted-foreground text-sm px-3 py-1.5 bg-muted/50 rounded-full">
                    <badge.icon className="h-4 w-4" strokeWidth={1.5} />
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>
              
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <ScrollToProductsButton 
                  text={pageTexts.viewProducts}
                  className="inline-flex items-center justify-center gap-2 h-14 px-10 bg-foreground text-background text-xs uppercase tracking-[0.2em] font-medium hover:bg-foreground/90 transition-colors cursor-pointer"
                />
                <Button variant="outline" size="lg" className="h-14 px-10 text-xs uppercase tracking-[0.2em] font-medium" asChild>
                  <Link href={`/${validLocale}/contact`}>
                    {t.nav.contact}
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Image - Landscape format */}
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                <Image
                  src={heroImage}
                  alt={pageTitle}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shopify Products - Right after hero */}
      <ShopifyProducts 
        locale={validLocale} 
        collection={category || 'cbd-oil'} 
        title={category ? catTranslations[category] : 'CBD Products'}
        limit={8}
      />

      {/* Features Bar */}
      <section className="py-16 border-y border-border/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: { es: 'Envío Gratis', en: 'Free Shipping', de: 'Kostenloser Versand', fr: 'Livraison Gratuite' }[validLocale] || 'Free Shipping', desc: { es: 'Pedidos +50€', en: 'Orders +50€', de: 'Bestellungen +50€', fr: 'Commandes +50€' }[validLocale] || 'Orders +50€' },
              { title: { es: '100% Legal', en: '100% Legal', de: '100% Legal', fr: '100% Légal' }[validLocale] || '100% Legal', desc: { es: 'THC <0.2%', en: 'THC <0.2%', de: 'THC <0.2%', fr: 'THC <0.2%' }[validLocale] || 'THC <0.2%' },
              { title: { es: 'Lab Tested', en: 'Lab Tested', de: 'Laborgetestet', fr: 'Testé Labo' }[validLocale] || 'Lab Tested', desc: { es: 'Certificado', en: 'Certified', de: 'Zertifiziert', fr: 'Certifié' }[validLocale] || 'Certified' },
              { title: { es: 'Devoluciones', en: 'Returns', de: 'Rückgabe', fr: 'Retours' }[validLocale] || 'Returns', desc: { es: '30 días', en: '30 days', de: '30 Tage', fr: '30 jours' }[validLocale] || '30 days' },
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Check className="w-5 h-5 text-foreground" />
                </div>
                <p className="text-sm font-medium">{feature.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-light text-center mb-16 tracking-tight">
            {pageTexts.reviews}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {(() => {
              const reviews: Record<string, { text: string; author: string; product: string }[]> = {
                es: [
                  { text: 'Excelente calidad del aceite CBD. Me ha ayudado mucho con el estrés y el sueño. Envío rápido y discreto.', author: 'María G.', product: 'Aceite CBD 10%' },
                  { text: 'Las flores CBD son increíbles. Aroma natural y efecto relajante. Muy recomendable.', author: 'Carlos R.', product: 'Flores CBD Premium' },
                  { text: 'Servicio al cliente excepcional. Resolvieron todas mis dudas sobre los productos. Volveré a comprar.', author: 'Ana M.', product: 'Cápsulas CBD' },
                ],
                en: [
                  { text: 'Excellent CBD oil quality. It has helped me a lot with stress and sleep. Fast and discreet shipping.', author: 'Mary G.', product: 'CBD Oil 10%' },
                  { text: 'The CBD flowers are amazing. Natural aroma and relaxing effect. Highly recommended.', author: 'Charles R.', product: 'Premium CBD Flowers' },
                  { text: 'Exceptional customer service. They answered all my questions about the products. Will buy again.', author: 'Anna M.', product: 'CBD Capsules' },
                ],
                de: [
                  { text: 'Ausgezeichnete CBD-Öl Qualität. Hat mir sehr bei Stress und Schlaf geholfen. Schneller und diskreter Versand.', author: 'Maria G.', product: 'CBD Öl 10%' },
                  { text: 'Die CBD-Blüten sind erstaunlich. Natürliches Aroma und entspannende Wirkung. Sehr empfehlenswert.', author: 'Karl R.', product: 'Premium CBD Blüten' },
                  { text: 'Außergewöhnlicher Kundenservice. Sie haben alle meine Fragen beantwortet. Werde wieder kaufen.', author: 'Anna M.', product: 'CBD Kapseln' },
                ],
                fr: [
                  { text: 'Excellente qualité d\'huile CBD. M\'a beaucoup aidé avec le stress et le sommeil. Livraison rapide et discrète.', author: 'Marie G.', product: 'Huile CBD 10%' },
                  { text: 'Les fleurs CBD sont incroyables. Arôme naturel et effet relaxant. Très recommandé.', author: 'Charles R.', product: 'Fleurs CBD Premium' },
                  { text: 'Service client exceptionnel. Ils ont répondu à toutes mes questions. J\'achèterai à nouveau.', author: 'Anne M.', product: 'Capsules CBD' },
                ],
              };
              const r = reviews[validLocale] || reviews.en;
              return r.map((review, i) => (
                <div key={i} className="bg-background p-8 rounded-xl">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">"{review.text}"</p>
                  <div className="border-t border-border/50 pt-4">
                    <p className="text-sm font-medium">{review.author}</p>
                    <p className="text-xs text-muted-foreground mt-1">{review.product}</p>
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* Related Categories - Horizontal cards */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-light text-center mb-16 tracking-tight">
            {locale === 'es' ? 'Otras Categorías' : 'Other Categories'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedCategories.map((cat) => (
              <Link
                key={cat}
                href={`/${validLocale}/${cat}`}
                className="group"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted mb-4">
                  <Image
                    src={categoryImages[cat]}
                    alt={catTranslations[cat]}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <h3 className="text-lg font-medium capitalize group-hover:text-muted-foreground transition-colors">
                  {catTranslations[cat]}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {pageTexts.from} <span className="text-foreground">15€</span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with Schema */}
      <FAQSection 
        locale={validLocale} 
        product={category ? catTranslations[category] : 'CBD'} 
        city={city?.name}
        priceMin={15}
        priceMax={150}
      />

      {/* Product Schema */}
      <ProductSchema
        name={pageTitle}
        description={pageDescription}
        priceMin={15}
        priceMax={150}
        brand="CBD Boutique"
        image={heroImage}
      />

      <CTA locale={validLocale} />
      <Footer locale={validLocale} />
    </main>
  );
}
