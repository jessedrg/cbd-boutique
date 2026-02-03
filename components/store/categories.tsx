import React from "react"
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { TRANSLATIONS, CATEGORY_TRANSLATIONS, CATEGORIES, type Locale, type Category } from "@/lib/seo-data";

interface CategoriesProps {
  locale: Locale;
}

const categoryImages: Record<Category, string> = {
  'cbd-oil': 'https://images.unsplash.com/photo-1556928045-16f7f50be0f3?w=600&h=800&fit=crop',
  'cbd-flowers': 'https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=600&h=800&fit=crop',
  'cbd-edibles': 'https://images.unsplash.com/photo-1629398778375-39113a6d6d1a?w=600&h=800&fit=crop',
  'cbd-cosmetics': 'https://images.unsplash.com/photo-1584091779872-08a4377c24be?w=600&h=800&fit=crop',
  'cbd-vape': 'https://images.unsplash.com/photo-1605117913123-1f455435b384?w=600&h=800&fit=crop',
  'cbd-capsules': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=800&fit=crop',
  'cbd-pets': 'https://moosesmokeshop.com/cdn/shop/products/cbd_pet_canninus_grandes.jpg?v=1689900237',
  'cbd-isolate': 'https://theimperiumcbd.com/wp-content/uploads/2022/12/CBD-Isolate-scaled-scaled.jpg',
  'cbd-topicals': 'https://www.beautymarket.es/estetica/fotos/33164_bew3.jpg',
  'cbd-tinctures': 'https://moosesmokeshop.com/cdn/shop/products/cbd_pet_canninus_grandes.jpg?v=1689900237',
};

const categoryDescriptions: Record<Category, Record<string, string>> = {
  'cbd-oil': { en: 'Full spectrum oils', es: 'Aceites de espectro completo', de: 'Vollspektrum-Öle', fr: 'Huiles à spectre complet' },
  'cbd-flowers': { en: 'Premium hemp flowers', es: 'Flores de cáñamo premium', de: 'Premium Hanfblüten', fr: 'Fleurs de chanvre premium' },
  'cbd-edibles': { en: 'Gummies & chocolates', es: 'Gominolas y chocolates', de: 'Gummis & Schokolade', fr: 'Bonbons & chocolats' },
  'cbd-cosmetics': { en: 'Skincare & beauty', es: 'Cuidado de la piel', de: 'Hautpflege & Beauty', fr: 'Soins de la peau' },
  'cbd-vape': { en: 'Vape cartridges', es: 'Cartuchos de vapeo', de: 'Vape-Kartuschen', fr: 'Cartouches vape' },
  'cbd-capsules': { en: 'Softgel capsules', es: 'Cápsulas blandas', de: 'Weichkapseln', fr: 'Capsules molles' },
  'cbd-pets': { en: 'For your companions', es: 'Para tus mascotas', de: 'Für Ihre Haustiere', fr: 'Pour vos animaux' },
  'cbd-isolate': { en: 'Pure CBD crystals', es: 'Cristales de CBD puro', de: 'Reine CBD-Kristalle', fr: 'Cristaux CBD purs' },
  'cbd-topicals': { en: 'Creams & balms', es: 'Cremas y bálsamos', de: 'Cremes & Balsame', fr: 'Crèmes & baumes' },
  'cbd-tinctures': { en: 'Sublingual drops', es: 'Gotas sublinguales', de: 'Sublinguale Tropfen', fr: 'Gouttes sublinguales' },
};

export function Categories({ locale }: CategoriesProps) {
  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;
  const catTranslations = CATEGORY_TRANSLATIONS[locale] || CATEGORY_TRANSLATIONS.en;

  const featuredCategories = CATEGORIES.slice(0, 4);
  const otherCategories = CATEGORIES.slice(4);

  return (
    <section id="collections" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-4 block">
              Collection
            </span>
            <h2 className="text-3xl lg:text-5xl font-serif font-light tracking-tight">
              {t.categories.title}
            </h2>
          </div>
          <Link 
            href={`/${locale === 'en' ? '' : locale + '/'}shop`}
            className="hidden lg:inline-flex items-center text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors mt-6 lg:mt-0"
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {/* Featured Categories - Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {featuredCategories.map((category) => (
            <Link 
              key={category} 
              href={`/${locale === 'en' ? '' : locale + '/'}${category}`} 
              className="group relative aspect-[3/4] overflow-hidden bg-muted"
            >
              <Image
                src={categoryImages[category]}
                alt={catTranslations[category]}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-lg text-white font-serif font-light mb-1 capitalize">
                  {catTranslations[category]}
                </h3>
                <p className="text-xs text-white/70 font-light">
                  {categoryDescriptions[category][locale] || categoryDescriptions[category].en}
                </p>
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-6 right-6 w-10 h-10 border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
            </Link>
          ))}
        </div>

        {/* Other Categories - Smaller Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {otherCategories.map((category) => (
            <Link 
              key={category} 
              href={`/${locale === 'en' ? '' : locale + '/'}${category}`} 
              className="group relative aspect-square overflow-hidden bg-muted"
            >
              <Image
                src={categoryImages[category]}
                alt={catTranslations[category]}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-xs text-white uppercase tracking-[0.15em] font-light text-center px-2">
                  {catTranslations[category]}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="lg:hidden mt-10 text-center">
          <Link 
            href={`/${locale === 'en' ? '' : locale + '/'}shop`}
            className="inline-flex items-center justify-center h-12 px-8 border border-foreground text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
