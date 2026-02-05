"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TRANSLATIONS, type Locale } from "@/lib/seo-data";
import { cn } from "@/lib/utils";

interface HeroProps {
  locale: Locale;
  cityName?: string;
}

const HERO_CONTENT: Record<string, {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  subtitleExtra: string;
  cta: string;
  ctaSecondary: string;
  stat1: { value: string; label: string };
  stat2: { value: string; label: string };
  stat3: { value: string; label: string };
  stat4: { value: string; label: string };
  trustLine: string;
  rotatingWords: string[];
}> = {
  en: {
    badge: "European Organic Hemp",
    titleLine1: "Premium CBD",
    titleLine2: "for modern wellness",
    subtitle: "Discover our curated collection of organic, third-party lab-tested CBD products. From full-spectrum oils to artisan-crafted edibles, every product is sourced from certified European farms and delivered with care to your door.",
    subtitleExtra: "We believe that wellness should be accessible, transparent, and rooted in nature. Each formulation is developed in collaboration with pharmacists and herbalists, combining centuries of botanical wisdom with cutting-edge extraction technology.",
    cta: "Explore Collection",
    ctaSecondary: "Our Story",
    stat1: { value: "50,000+", label: "Happy Customers" },
    stat2: { value: "4.9/5", label: "Average Rating" },
    stat3: { value: "100%", label: "Lab Tested" },
    stat4: { value: "24h", label: "Fast Shipping" },
    trustLine: "Trusted by wellness enthusiasts across 27 European countries",
    rotatingWords: ["wellness", "balance", "serenity", "vitality", "harmony"],
  },
  es: {
    badge: "Cáñamo Orgánico Europeo",
    titleLine1: "CBD Premium",
    titleLine2: "para el bienestar moderno",
    subtitle: "Descubre nuestra coleccion curada de productos CBD organicos, testados por laboratorios independientes. Desde aceites de espectro completo hasta comestibles artesanales, cada producto proviene de granjas europeas certificadas.",
    subtitleExtra: "Creemos que el bienestar debe ser accesible, transparente y arraigado en la naturaleza. Cada formulacion esta desarrollada en colaboracion con farmaceuticos y herbolarios, combinando siglos de sabiduria botanica con tecnologia de extraccion de vanguardia.",
    cta: "Explorar Coleccion",
    ctaSecondary: "Nuestra Historia",
    stat1: { value: "50.000+", label: "Clientes Satisfechos" },
    stat2: { value: "4.9/5", label: "Valoracion Media" },
    stat3: { value: "100%", label: "Testado en Lab" },
    stat4: { value: "24h", label: "Envio Rapido" },
    trustLine: "La confianza de los amantes del bienestar en 27 paises europeos",
    rotatingWords: ["bienestar", "equilibrio", "serenidad", "vitalidad", "armonia"],
  },
  de: {
    badge: "Europaischer Bio-Hanf",
    titleLine1: "Premium CBD",
    titleLine2: "fur modernes Wohlbefinden",
    subtitle: "Entdecken Sie unsere kuratierte Kollektion biologischer, von Drittlaboren getesteter CBD-Produkte. Von Vollspektrum-Olen bis hin zu handgefertigten Lebensmitteln stammt jedes Produkt von zertifizierten europaischen Farmen.",
    subtitleExtra: "Wir glauben, dass Wellness zuganglich, transparent und in der Natur verwurzelt sein sollte. Jede Formulierung wird in Zusammenarbeit mit Apothekern und Krauterkundigen entwickelt.",
    cta: "Kollektion Entdecken",
    ctaSecondary: "Unsere Geschichte",
    stat1: { value: "50.000+", label: "Zufriedene Kunden" },
    stat2: { value: "4.9/5", label: "Durchschnittliche Bewertung" },
    stat3: { value: "100%", label: "Laborgetestet" },
    stat4: { value: "24h", label: "Schneller Versand" },
    trustLine: "Vertraut von Wellness-Enthusiasten in 27 europaischen Landern",
    rotatingWords: ["Wohlbefinden", "Balance", "Gelassenheit", "Vitalitat", "Harmonie"],
  },
  fr: {
    badge: "Chanvre Bio Europeen",
    titleLine1: "CBD Premium",
    titleLine2: "pour le bien-etre moderne",
    subtitle: "Decouvrez notre collection de produits CBD biologiques, testes par des laboratoires tiers. Des huiles a spectre complet aux comestibles artisanaux, chaque produit provient de fermes europeennes certifiees.",
    subtitleExtra: "Nous croyons que le bien-etre doit etre accessible, transparent et enracine dans la nature. Chaque formulation est developpee en collaboration avec des pharmaciens et des herboristes.",
    cta: "Decouvrir la Collection",
    ctaSecondary: "Notre Histoire",
    stat1: { value: "50 000+", label: "Clients Satisfaits" },
    stat2: { value: "4.9/5", label: "Note Moyenne" },
    stat3: { value: "100%", label: "Teste en Labo" },
    stat4: { value: "24h", label: "Livraison Rapide" },
    trustLine: "La confiance des passionnes de bien-etre dans 27 pays europeens",
    rotatingWords: ["bien-etre", "equilibre", "serenite", "vitalite", "harmonie"],
  },
};

export function Hero({ locale }: HeroProps) {
  const content = HERO_CONTENT[locale] || HERO_CONTENT.en;
  const [currentWord, setCurrentWord] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [wordFading, setWordFading] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const rotateWord = useCallback(() => {
    setWordFading(true);
    setTimeout(() => {
      setCurrentWord((prev) => (prev + 1) % content.rotatingWords.length);
      setWordFading(false);
    }, 400);
  }, [content.rotatingWords.length]);

  useEffect(() => {
    const interval = setInterval(rotateWord, 3000);
    return () => clearInterval(interval);
  }, [rotateWord]);

  return (
    <section className="relative h-[100svh] min-h-[600px] max-h-[1200px] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image 
          src="/images/hero-cbd.jpg" 
          alt="Premium CBD oil bottles and organic hemp botanicals arranged on natural stone" 
          fill 
          className="object-cover scale-105"
          priority 
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/75 to-foreground/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-foreground/20" />
      </div>

      {/* Decorative lines - hidden on mobile */}
      <div className="absolute top-0 left-[10%] w-px h-full bg-primary-foreground/5 hidden lg:block" />
      <div className="absolute top-0 left-[90%] w-px h-full bg-primary-foreground/5 hidden lg:block" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl pt-32 sm:pt-36 lg:pt-40">
          {/* Badge */}
          <div className={cn(
            "mb-6 sm:mb-10 flex items-center gap-3 sm:gap-4 transition-all duration-1000 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <div className="h-px w-8 sm:w-12 bg-primary-foreground/30" />
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-primary-foreground/60 font-medium">
              {content.badge}
            </span>
          </div>

          {/* Title */}
          <h1 className={cn(
            "font-serif text-[2.5rem] sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.9] mb-3 sm:mb-4 text-primary-foreground transition-all duration-1000 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <span className="block">{content.titleLine1}</span>
          </h1>

          {/* Rotating word */}
          <div className={cn(
            "font-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-6 sm:mb-10 transition-all duration-1000 delay-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <span className="text-primary-foreground/50">
              {locale === 'es' ? 'para tu ' : locale === 'de' ? 'fur Ihr ' : locale === 'fr' ? 'pour votre ' : 'for your '}
            </span>
            <span className={cn(
              "text-primary-foreground/80 italic transition-all duration-400",
              wordFading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
            )}>
              {content.rotatingWords[currentWord]}
            </span>
          </div>

          {/* Description */}
          <div className={cn(
            "space-y-3 sm:space-y-4 mb-8 sm:mb-12 transition-all duration-1000 delay-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <p className="text-xs sm:text-sm md:text-base text-primary-foreground/50 max-w-lg leading-relaxed font-light">
              {content.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-primary-foreground/35 max-w-lg leading-relaxed font-light hidden md:block">
              {content.subtitleExtra}
            </p>
          </div>

          {/* CTAs */}
          <div className={cn(
            "flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 transition-all duration-1000 delay-[900ms]",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <Button 
              size="lg" 
              className="h-12 sm:h-14 px-6 sm:px-10 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium rounded-none bg-primary-foreground text-foreground hover:bg-primary-foreground/90 cursor-pointer" 
              onClick={() => {
                const collectionsSection = document.getElementById('collections');
                if (collectionsSection) {
                  collectionsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {content.cta}
              <ArrowRight className="ml-2 sm:ml-3 h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-12 sm:h-14 px-6 sm:px-10 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 rounded-none" 
              asChild
            >
              <Link href={`/${locale === 'en' ? '' : locale + '/'}about`}>
                {content.ctaSecondary}
              </Link>
            </Button>
          </div>

          {/* Trust line */}
          <p className={cn(
            "text-[9px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.15em] text-primary-foreground/25 mb-6 sm:mb-10 transition-all duration-1000 delay-[1000ms]",
            isVisible ? "opacity-100" : "opacity-0"
          )}>
            {content.trustLine}
          </p>

          {/* Stats */}
          <div className={cn(
            "grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 border-t border-primary-foreground/10 transition-all duration-1000 delay-[1100ms]",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            {[content.stat1, content.stat2, content.stat3, content.stat4].map((stat, i) => (
              <div key={i}>
                <p className="text-lg sm:text-2xl lg:text-3xl font-serif font-light text-primary-foreground">{stat.value}</p>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.15em] text-primary-foreground/40 mt-0.5 sm:mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator - hidden on short viewports */}
      <div className={cn(
        "absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 sm:gap-2 transition-all duration-1000 delay-[1300ms] hidden sm:flex",
        isVisible ? "opacity-100" : "opacity-0"
      )}>
        <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.4em] text-primary-foreground/30">Scroll</span>
        <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary-foreground/30 animate-bounce" />
      </div>

      {/* Side text - desktop only */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block">
        <span className="text-[9px] uppercase tracking-[0.5em] text-primary-foreground/15 [writing-mode:vertical-lr] rotate-180">
          CBD Boutique &mdash; Est. 2019
        </span>
      </div>
    </section>
  );
}
