import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/store/header";
import { Footer } from "@/components/store/footer";
import { CTA } from "@/components/store/cta";
import { ShopifyProducts } from "@/components/store/shopify-products";
import { ProductLanding } from "@/components/seo/product-landing";
import {
  SUPPORTED_LOCALES,
  CATEGORY_TRANSLATIONS,
  type Locale,
} from "@/lib/seo-data";

// Force dynamic rendering
export const dynamic = "force-dynamic";

// Valid product types
const VALID_TYPES = [
  "cbd-oil",
  "cbd-vape",
  "cbd-flowers",
  "cbd-capsules",
  "cbd-isolate",
  "cbd-edibles",
] as const;

type ProductType = (typeof VALID_TYPES)[number];

// Map locale to default country
const LOCALE_COUNTRY: Record<string, { country: string; countryCode: string }> = {
  es: { country: "spain", countryCode: "ES" },
  en: { country: "uk", countryCode: "GB" },
  de: { country: "germany", countryCode: "DE" },
  fr: { country: "france", countryCode: "FR" },
  it: { country: "italy", countryCode: "IT" },
  pt: { country: "spain", countryCode: "ES" },
  nl: { country: "germany", countryCode: "DE" },
  pl: { country: "germany", countryCode: "DE" },
  cs: { country: "germany", countryCode: "DE" },
  el: { country: "italy", countryCode: "IT" },
};

// Product names for SEO
const PRODUCT_NAMES_ES: Record<ProductType, string> = {
  "cbd-oil": "Aceite CBD",
  "cbd-vape": "CBD Vape",
  "cbd-flowers": "Flores CBD",
  "cbd-capsules": "Capsulas CBD",
  "cbd-isolate": "Aislado CBD",
  "cbd-edibles": "Comestibles CBD",
};

const COUNTRY_NAMES_ES: Record<string, string> = {
  spain: "Espana",
  uk: "Reino Unido",
  germany: "Alemania",
  france: "Francia",
  italy: "Italia",
};

interface PageProps {
  params: Promise<{ locale: string; type: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, type } = await params;
  const validLocale = SUPPORTED_LOCALES.includes(locale as Locale)
    ? (locale as Locale)
    : "es";

  if (!VALID_TYPES.includes(type as ProductType)) {
    return { title: "Producto no encontrado | CBD Boutique" };
  }

  const productType = type as ProductType;
  const productName = PRODUCT_NAMES_ES[productType];
  const { country } = LOCALE_COUNTRY[validLocale] || LOCALE_COUNTRY.es;
  const countryName = COUNTRY_NAMES_ES[country] || "Espana";

  const title = `${productName} en ${countryName} - Guia Completa ${new Date().getFullYear()}`;
  const description = `Compra ${productName} en ${countryName}. Productos organicos, testados en laboratorio. Envio discreto 24-48h. Legalidad, dosificacion y resenas verificadas. Desde 15EUR.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/productos/${type}`,
    },
    openGraph: {
      title: `${title} | CBD Boutique`,
      description,
      url: `/${locale}/productos/${type}`,
      siteName: "CBD Boutique",
      locale: "es_ES",
      type: "website",
      images: [
        {
          url: "https://images.unsplash.com/photo-1556928045-16f7f50be0f3?w=1200&h=630&fit=crop",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | CBD Boutique`,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ProductoLandingPage({ params }: PageProps) {
  const { locale, type } = await params;
  const validLocale = SUPPORTED_LOCALES.includes(locale as Locale)
    ? (locale as Locale)
    : "es";

  if (!VALID_TYPES.includes(type as ProductType)) {
    notFound();
  }

  const productType = type as ProductType;
  const { country, countryCode } =
    LOCALE_COUNTRY[validLocale] || LOCALE_COUNTRY.es;

  const catTranslations =
    CATEGORY_TRANSLATIONS[validLocale] || CATEGORY_TRANSLATIONS.en;

  // Map product type to collection for Shopify products
  const collectionMap: Record<ProductType, string> = {
    "cbd-oil": "cbd-oil",
    "cbd-vape": "cbd-vape",
    "cbd-flowers": "cbd-flowers",
    "cbd-capsules": "cbd-capsules",
    "cbd-isolate": "cbd-isolate",
    "cbd-edibles": "cbd-edibles",
  };

  return (
    <main className="min-h-screen bg-background">
      <Header locale={validLocale} />

      {/* Full Product Landing with all 6 sections */}
      <ProductLanding
        locale={validLocale}
        productType={productType}
        country={country}
        countryCode={countryCode}
      />

      {/* Shopify Products */}
      <ShopifyProducts
        locale={validLocale}
        collection={collectionMap[productType]}
        title={
          catTranslations[collectionMap[productType] as keyof typeof catTranslations] ||
          PRODUCT_NAMES_ES[productType]
        }
        limit={8}
      />

      <CTA locale={validLocale} />
      <Footer locale={validLocale} />
    </main>
  );
}
