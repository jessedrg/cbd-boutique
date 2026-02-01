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

export function Hero({ locale, cityName }: HeroProps) {
  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;
  const titleParts = t.hero.title.split('\n');

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center">
      {/* Full-screen background image with overlay */}
      <div className="absolute inset-0">
        <Image 
          src="https://images.unsplash.com/photo-1611070960720-61fe2fdc5d3c?q=80&w=2070&auto=format&fit=crop" 
          alt="CBD botanical" 
          fill 
          className="object-cover" 
          priority 
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-32">
        <div className="max-w-2xl">
          {/* Minimal badge */}
          <div className="mb-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-medium">
              Premium CBD Collection
            </span>
          </div>

          {/* Large serif title - architectural style */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95] mb-8">
            {titleParts.map((part, i) => (
              <span key={i} className="block">
                {part}
              </span>
            ))}
          </h1>

          {/* Subtle description */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed mb-12 font-light">
            {t.hero.subtitle}
          </p>

          {/* Minimal CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="h-14 px-10 text-xs uppercase tracking-[0.2em] font-medium rounded-none" 
              asChild
            >
              <Link href={`/${locale === 'en' ? '' : locale + '/'}cbd-oil`}>
                {t.hero.cta}
                <ArrowRight className="ml-3 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-14 px-10 text-xs uppercase tracking-[0.2em] font-medium bg-transparent border-foreground/20 hover:bg-foreground/5 rounded-none" 
              asChild
            >
              <Link href={`/${locale === 'en' ? '' : locale + '/'}about`}>
                {t.nav.about}
              </Link>
            </Button>
          </div>

          {/* Trust indicators - minimal */}
          <div className="flex items-center gap-8 mt-16 pt-8 border-t border-border/30">
            <div>
              <p className="text-2xl font-serif font-light">50k+</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">Customers</p>
            </div>
            <div className="h-8 w-px bg-border/30" />
            <div>
              <p className="text-2xl font-serif font-light">4.9★</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">Rating</p>
            </div>
            <div className="h-8 w-px bg-border/30" />
            <div>
              <p className="text-2xl font-serif font-light">Lab</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">Tested</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-foreground/30 to-transparent" />
      </div>
    </section>
  );
}
