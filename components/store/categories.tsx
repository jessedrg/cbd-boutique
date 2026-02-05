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

const categoryDescriptions: Record<string, Record<Category, string>> = {
  en: {
    'cbd-oil': 'Full-spectrum and broad-spectrum CBD oils with precise dosing. Available in various concentrations from 5% to 30%, our oils are CO2-extracted for maximum purity.',
    'cbd-flowers': 'Hand-selected premium hemp flowers grown organically in Switzerland and Italy. Rich in terpenes and cannabinoids for the most natural CBD experience.',
    'cbd-edibles': 'Artisan CBD gummies, chocolates, and honey. Each piece is precisely dosed for consistent, delicious wellness support throughout your day.',
    'cbd-cosmetics': 'Nourishing CBD skincare formulated with botanical extracts. From serums to balms, each product is designed to support healthy, radiant skin.',
    'cbd-vape': 'Premium CBD vape cartridges and e-liquids. Fast-acting formulas with natural terpene profiles for an authentic, enjoyable experience.',
    'cbd-capsules': 'Convenient CBD softgel capsules for precise, on-the-go dosing. Each capsule delivers a consistent measure of full-spectrum CBD.',
    'cbd-pets': 'Specially formulated CBD products for dogs and cats. Gentle, vet-approved formulas to support your companion\'s comfort and wellbeing.',
    'cbd-isolate': 'Pure CBD isolate crystals with 99%+ purity. Versatile and THC-free, ideal for creating custom formulations and precise dosing.',
    'cbd-topicals': 'Targeted CBD creams, balms, and roll-ons for localized relief. Enriched with essential oils for soothing, effective application.',
    'cbd-tinctures': 'Sublingual CBD tinctures for rapid absorption. Crafted with MCT oil carrier for enhanced bioavailability and easy daily use.',
  },
  es: {
    'cbd-oil': 'Aceites CBD de espectro completo y amplio con dosificacion precisa. Disponibles en concentraciones del 5% al 30%, extraidos con CO2 para maxima pureza.',
    'cbd-flowers': 'Flores de canamo premium seleccionadas a mano, cultivadas organicamente en Suiza e Italia. Ricas en terpenos y cannabinoides.',
    'cbd-edibles': 'Gominolas, chocolates y miel de CBD artesanales. Cada pieza esta dosificada con precision para un bienestar consistente.',
    'cbd-cosmetics': 'Cosmetica CBD nutritiva formulada con extractos botanicos. Desde serums hasta balsamos, cada producto cuida tu piel.',
    'cbd-vape': 'Cartuchos de vapeo y e-liquidos CBD premium. Formulas de accion rapida con perfiles terpenicos naturales.',
    'cbd-capsules': 'Capsulas blandas de CBD para dosificacion precisa. Cada capsula entrega una medida consistente de CBD de espectro completo.',
    'cbd-pets': 'Productos CBD especialmente formulados para perros y gatos. Formulas suaves aprobadas por veterinarios.',
    'cbd-isolate': 'Cristales de CBD aislado con pureza del 99%+. Versatiles y sin THC, ideales para formulaciones personalizadas.',
    'cbd-topicals': 'Cremas, balsamos y roll-ons de CBD para alivio localizado. Enriquecidos con aceites esenciales.',
    'cbd-tinctures': 'Tinturas sublinguales de CBD para absorcion rapida. Elaboradas con aceite MCT para mayor biodisponibilidad.',
  },
  de: {
    'cbd-oil': 'Vollspektrum- und Breitspektrum-CBD-Ole mit praziser Dosierung. Verfugbar in verschiedenen Konzentrationen von 5% bis 30%.',
    'cbd-flowers': 'Handverlesene Premium-Hanfbluten, biologisch angebaut in der Schweiz und Italien. Reich an Terpenen und Cannabinoiden.',
    'cbd-edibles': 'Handgefertigte CBD-Gummis, Schokoladen und Honig. Jedes Stuck ist fur eine konsistente Wellness-Unterstutzung dosiert.',
    'cbd-cosmetics': 'Nahrende CBD-Hautpflege mit botanischen Extrakten. Von Seren bis Balsamen fur gesunde, strahlende Haut.',
    'cbd-vape': 'Premium CBD-Vape-Kartuschen und E-Liquids. Schnell wirkende Formeln mit naturlichen Terpenprofilen.',
    'cbd-capsules': 'Praktische CBD-Weichgelkapseln fur prazise Dosierung unterwegs.',
    'cbd-pets': 'Speziell formulierte CBD-Produkte fur Hunde und Katzen. Sanfte, veterinar-zugelassene Formeln.',
    'cbd-isolate': 'Reine CBD-Isolatkristalle mit 99%+ Reinheit. Vielseitig und THC-frei.',
    'cbd-topicals': 'Gezielte CBD-Cremes, Balsame und Roll-ons fur lokale Linderung.',
    'cbd-tinctures': 'Sublinguale CBD-Tinkturen fur schnelle Absorption. Mit MCT-Ol fur erhohte Bioverfugbarkeit.',
  },
  fr: {
    'cbd-oil': 'Huiles CBD a spectre complet et large avec dosage precis. Disponibles en concentrations de 5% a 30%, extraites au CO2.',
    'cbd-flowers': 'Fleurs de chanvre premium selectionnees a la main, cultivees biologiquement en Suisse et en Italie.',
    'cbd-edibles': 'Bonbons, chocolats et miel CBD artisanaux. Chaque piece est dosee avec precision.',
    'cbd-cosmetics': 'Soins CBD nourrissants formules avec des extraits botaniques. Des serums aux baumes pour une peau saine.',
    'cbd-vape': 'Cartouches vape et e-liquides CBD premium. Formules a action rapide avec des profils terpeniques naturels.',
    'cbd-capsules': 'Capsules CBD molles pratiques pour un dosage precis en deplacement.',
    'cbd-pets': 'Produits CBD specialement formules pour chiens et chats. Formules douces approuvees par les veterinaires.',
    'cbd-isolate': 'Cristaux d\'isolat CBD pur a 99%+ de purete. Polyvalents et sans THC.',
    'cbd-topicals': 'Cremes, baumes et roll-ons CBD cibles pour un soulagement localise.',
    'cbd-tinctures': 'Teintures sublinguales CBD pour une absorption rapide. Elaborees avec huile MCT.',
  },
};

export function Categories({ locale }: CategoriesProps) {
  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;
  const catTranslations = CATEGORY_TRANSLATIONS[locale] || CATEGORY_TRANSLATIONS.en;
  const descriptions = categoryDescriptions[locale] || categoryDescriptions.en;

  const featuredCategories = CATEGORIES.slice(0, 4);
  const otherCategories = CATEGORIES.slice(4);

  return (
    <section id="collections" className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-8 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-4 block">
              {locale === 'es' ? 'Nuestra Coleccion' : locale === 'de' ? 'Unsere Kollektion' : locale === 'fr' ? 'Notre Collection' : 'Our Collection'}
            </span>
            <h2 className="text-3xl lg:text-5xl font-serif font-light tracking-tight mb-4">
              {t.categories.title}
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed">
              {locale === 'es' ? 'Explora nuestra gama completa de productos CBD de alta calidad, cada uno cuidadosamente seleccionado y rigurosamente testado para tu bienestar.' :
               locale === 'de' ? 'Entdecken Sie unser komplettes Sortiment an hochwertigen CBD-Produkten, jedes sorgfaltig ausgewahlt und rigoros getestet.' :
               locale === 'fr' ? 'Explorez notre gamme complete de produits CBD de haute qualite, chacun soigneusement selectionne et rigoureusement teste.' :
               'Explore our complete range of high-quality CBD products, each one carefully curated and rigorously tested for your wellbeing.'}
            </p>
          </div>
          <Link 
            href={`/${locale === 'en' ? '' : locale + '/'}shop`}
            className="hidden lg:inline-flex items-center text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors mt-6 lg:mt-0"
          >
            {locale === 'es' ? 'Ver todos los productos' : locale === 'de' ? 'Alle Produkte anzeigen' : locale === 'fr' ? 'Voir tous les produits' : 'View All Products'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {/* Featured Categories - Large Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-3 sm:mb-5">
          {featuredCategories.map((category) => (
            <Link 
              key={category} 
              href={`/${locale === 'en' ? '' : locale + '/'}${category}`} 
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <Image
                src={categoryImages[category]}
                alt={`${catTranslations[category]} - ${descriptions[category]?.substring(0, 60)}`}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6">
                <h3 className="text-sm sm:text-lg text-primary-foreground font-serif font-light mb-1 sm:mb-2 capitalize">
                  {catTranslations[category]}
                </h3>
                <p className="text-xs text-primary-foreground/60 font-light leading-relaxed line-clamp-2">
                  {descriptions[category]?.substring(0, 80)}...
                </p>
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-6 right-6 w-10 h-10 border border-primary-foreground/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                <ArrowRight className="h-4 w-4 text-primary-foreground" />
              </div>
            </Link>
          ))}
        </div>

        {/* Other Categories - Smaller Grid */}
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
          {otherCategories.map((category) => (
            <Link 
              key={category} 
              href={`/${locale === 'en' ? '' : locale + '/'}${category}`} 
              className="group relative aspect-square overflow-hidden"
            >
              <Image
                src={categoryImages[category]}
                alt={catTranslations[category]}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/50 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-xs text-primary-foreground uppercase tracking-[0.15em] font-light text-center px-2">
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
            className="inline-flex items-center justify-center h-12 px-8 border border-foreground text-foreground text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
          >
            {locale === 'es' ? 'Ver todos los productos' : 'View All Products'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
