"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TRANSLATIONS, type Locale } from "@/lib/seo-data";

interface HeroProps {
  locale: Locale;
  cityName?: string;
}

const HERO_CONTENT: Record<string, {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  cta: string;
  ctaSecondary: string;
  stat1: { value: string; label: string };
  stat2: { value: string; label: string };
  stat3: { value: string; label: string };
}> = {
  en: {
    badge: "European Organic Hemp",
    titleLine1: "Premium CBD",
    titleLine2: "for modern wellness",
    subtitle: "Discover our curated collection of organic, third-party lab-tested CBD products. From full-spectrum oils to artisan-crafted edibles, every product is sourced from certified European farms and delivered with care to your door.",
    cta: "Explore Collection",
    ctaSecondary: "Our Story",
    stat1: { value: "50,000+", label: "Happy Customers" },
    stat2: { value: "4.9/5", label: "Average Rating" },
    stat3: { value: "100%", label: "Lab Tested" },
  },
  es: {
    badge: "Canamo Organico Europeo",
    titleLine1: "CBD Premium",
    titleLine2: "para el bienestar moderno",
    subtitle: "Descubre nuestra coleccion curada de productos CBD organicos, testados por laboratorios independientes. Desde aceites de espectro completo hasta comestibles artesanales, cada producto proviene de granjas europeas certificadas y se entrega con cuidado a tu puerta.",
    cta: "Explorar Coleccion",
    ctaSecondary: "Nuestra Historia",
    stat1: { value: "50.000+", label: "Clientes Satisfechos" },
    stat2: { value: "4.9/5", label: "Valoracion Media" },
    stat3: { value: "100%", label: "Testado en Lab" },
  },
  de: {
    badge: "Europaischer Bio-Hanf",
    titleLine1: "Premium CBD",
    titleLine2: "fur modernes Wohlbefinden",
    subtitle: "Entdecken Sie unsere kuratierte Kollektion biologischer, von Drittlaboren getesteter CBD-Produkte. Von Vollspektrum-Olen bis hin zu handgefertigten Lebensmitteln stammt jedes Produkt von zertifizierten europaischen Farmen.",
    cta: "Kollektion Entdecken",
    ctaSecondary: "Unsere Geschichte",
    stat1: { value: "50.000+", label: "Zufriedene Kunden" },
    stat2: { value: "4.9/5", label: "Durchschnittliche Bewertung" },
    stat3: { value: "100%", label: "Laborgetestet" },
  },
  fr: {
    badge: "Chanvre Bio Europeen",
    titleLine1: "CBD Premium",
    titleLine2: "pour le bien-etre moderne",
    subtitle: "Decouvrez notre collection de produits CBD biologiques, testes par des laboratoires tiers. Des huiles a spectre complet aux comestibles artisanaux, chaque produit provient de fermes europeennes certifiees.",
    cta: "Decouvrir la Collection",
    ctaSecondary: "Notre Histoire",
    stat1: { value: "50 000+", label: "Clients Satisfaits" },
    stat2: { value: "4.9/5", label: "Note Moyenne" },
    stat3: { value: "100%", label: "Teste en Labo" },
  },
};

export function Hero({ locale }: HeroProps) {
  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;
  const content = HERO_CONTENT[locale] || HERO_CONTENT.en;

  return (
    <section className="relative min-h-[100svh] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image 
          src="/images/hero-cbd.jpg" 
          alt="Premium CBD oil bottles and organic hemp botanicals arranged on natural stone" 
          fill 
          className="object-cover" 
          priority 
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/30" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-32 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-8 bg-primary-foreground/40" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-primary-foreground/70 font-medium">
              {content.badge}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95] mb-8 text-primary-foreground">
            <span className="block">{content.titleLine1}</span>
            <span className="block text-primary-foreground/70">{content.titleLine2}</span>
          </h1>

          {/* Description - rich content for SEO */}
          <p className="text-base sm:text-lg text-primary-foreground/60 max-w-lg leading-relaxed mb-12 font-light">
            {content.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="h-14 px-10 text-xs uppercase tracking-[0.2em] font-medium rounded-none bg-primary-foreground text-foreground hover:bg-primary-foreground/90 cursor-pointer" 
              onClick={() => {
                const collectionsSection = document.getElementById('collections');
                if (collectionsSection) {
                  collectionsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {content.cta}
              <ArrowRight className="ml-3 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-14 px-10 text-xs uppercase tracking-[0.2em] font-medium bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-none" 
              asChild
            >
              <Link href={`/${locale === 'en' ? '' : locale + '/'}about`}>
                {content.ctaSecondary}
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-10 mt-16 pt-8 border-t border-primary-foreground/15">
            <div>
              <p className="text-2xl font-serif font-light text-primary-foreground">{content.stat1.value}</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/50 mt-1">{content.stat1.label}</p>
            </div>
            <div className="h-10 w-px bg-primary-foreground/15" />
            <div>
              <p className="text-2xl font-serif font-light text-primary-foreground">{content.stat2.value}</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/50 mt-1">{content.stat2.label}</p>
            </div>
            <div className="h-10 w-px bg-primary-foreground/15" />
            <div>
              <p className="text-2xl font-serif font-light text-primary-foreground">{content.stat3.value}</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/50 mt-1">{content.stat3.label}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.3em] text-primary-foreground/40">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary-foreground/30 to-transparent" />
      </div>
    </section>
  );
}
