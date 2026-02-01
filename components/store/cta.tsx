"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TRANSLATIONS, type Locale } from "@/lib/seo-data";

interface CTAProps {
  locale: Locale;
}

export function CTA({ locale }: CTAProps) {
  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;

  const benefits = [
    t.features.quality,
    t.features.lab,
    t.features.shipping,
    t.features.support,
  ];

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative bg-foreground text-background p-12 lg:p-20 overflow-hidden">
          <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
              <span className="text-[10px] uppercase tracking-[0.3em] text-background/60">
                Premium CBD
              </span>
              <h2 className="text-3xl lg:text-5xl font-serif font-light tracking-tight leading-tight">
                {t.cta.title}
              </h2>
              <p className="text-background/60 text-base lg:text-lg max-w-md font-light">
                {t.cta.subtitle}
              </p>
              <Button 
                size="lg" 
                variant="secondary" 
                className="h-14 px-10 text-xs uppercase tracking-[0.2em] font-medium text-foreground rounded-none" 
                asChild
              >
                <Link href={`/${locale === 'en' ? '' : locale + '/'}cbd-oil`}>
                  {t.cta.button}
                  <ArrowRight className="ml-3 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="space-y-6">
              {benefits.map((point, i) => (
                <div key={i} className="flex items-center gap-4 pb-6 border-b border-background/10 last:border-0">
                  <div className="h-8 w-8 border border-background/30 flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-background/80" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm text-background/80 font-light">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
