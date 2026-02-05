"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TRANSLATIONS, type Locale } from "@/lib/seo-data";

interface CTAProps {
  locale: Locale;
}

const CTA_CONTENT: Record<string, {
  eyebrow: string;
  title: string;
  subtitle: string;
  button: string;
  benefits: string[];
}> = {
  en: {
    eyebrow: "The CBD Boutique Difference",
    title: "Experience wellness, naturally",
    subtitle: "Join over 50,000 customers across Europe who trust CBD Boutique for their daily wellness routine. Every product is backed by our quality guarantee and 30-day satisfaction promise.",
    button: "Shop Best Sellers",
    benefits: [
      "Organic, non-GMO European hemp sourced from certified farms",
      "Independent third-party lab testing with full COA transparency",
      "Free tracked shipping across Europe on all orders over 50 EUR",
      "Dedicated CBD specialists available for personalized guidance",
      "30-day money-back satisfaction guarantee on all products",
    ],
  },
  es: {
    eyebrow: "La Diferencia CBD Boutique",
    title: "Experimenta el bienestar, naturalmente",
    subtitle: "Unete a mas de 50.000 clientes en toda Europa que confian en CBD Boutique para su rutina diaria de bienestar. Cada producto esta respaldado por nuestra garantia de calidad y nuestra promesa de satisfaccion de 30 dias.",
    button: "Ver Mas Vendidos",
    benefits: [
      "Cáñamo europeo orgánico, sin OGM, de granjas certificadas",
      "Pruebas independientes de laboratorio con transparencia total de COA",
      "Envio gratuito con seguimiento en toda Europa en pedidos superiores a 50 EUR",
      "Especialistas en CBD dedicados para orientacion personalizada",
      "Garantia de devolucion de 30 dias en todos los productos",
    ],
  },
  de: {
    eyebrow: "Der CBD Boutique Unterschied",
    title: "Wellness naturlich erleben",
    subtitle: "Schliessen Sie sich uber 50.000 Kunden in ganz Europa an, die CBD Boutique fur ihre tagliche Wellness-Routine vertrauen. Jedes Produkt ist durch unsere Qualitatsgarantie gesichert.",
    button: "Bestseller Ansehen",
    benefits: [
      "Biologischer, gentechnikfreier europaischer Hanf von zertifizierten Farmen",
      "Unabhangige Drittlabortests mit voller COA-Transparenz",
      "Kostenloser Versand mit Sendungsverfolgung in ganz Europa ab 50 EUR",
      "Engagierte CBD-Spezialisten fur personalisierte Beratung",
      "30 Tage Zufriedenheitsgarantie auf alle Produkte",
    ],
  },
  fr: {
    eyebrow: "La Difference CBD Boutique",
    title: "Vivez le bien-etre, naturellement",
    subtitle: "Rejoignez plus de 50 000 clients a travers l'Europe qui font confiance a CBD Boutique pour leur routine bien-etre quotidienne. Chaque produit est soutenu par notre garantie qualite.",
    button: "Voir les Best-sellers",
    benefits: [
      "Chanvre europeen biologique, sans OGM, provenant de fermes certifiees",
      "Tests en laboratoire tiers independants avec transparence totale des COA",
      "Livraison suivie gratuite dans toute l'Europe a partir de 50 EUR",
      "Specialistes CBD dedies pour un accompagnement personnalise",
      "Garantie satisfaction 30 jours sur tous les produits",
    ],
  },
};

export function CTA({ locale }: CTAProps) {
  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;
  const content = CTA_CONTENT[locale] || CTA_CONTENT.en;

  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative bg-primary text-primary-foreground p-6 sm:p-12 lg:p-20 overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
            <svg viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M40 16.3L32.7 7.4L30.7 4.1L32.3 0L22.6 8.2L29.9 17L31.9 20.3L30.3 24.4L40 16.3Z" fill="currentColor"/>
              <path d="M25.9 12.3L14.5 12.5L10.7 12L8.60001 8.2L8.89999 20.9L20.3 20.7L24.1 21.2L26.2 25L25.9 12.3Z" fill="currentColor"/>
              <path d="M14 20.9L7.10001 30L4.39999 32.8L0 32.1L10.1 39.7L17 30.6L19.7 27.9L24.1 28.6L14 20.9Z" fill="currentColor"/>
              <path d="M13.3 35.6L16 46.7L16.5 50.5L13.2 53.5L25.4 50.3L22.6 39.2L22.1 35.4L25.4 32.5L13.3 35.6Z" fill="currentColor"/>
              <path d="M24.3 45.3L34.6 50.1L37.9 52.2L38.2 56.6L43.3 45L32.9 40.2L29.6 38.2L29.3 33.8L24.3 45.3Z" fill="currentColor"/>
              <path d="M38.7 42.7L48.9 37.6L52.5 36.3L56.1 38.8L50.3 27.6L40.1 32.7L36.4 34L32.8 31.5L38.7 42.7Z" fill="currentColor"/>
              <path d="M45.7 29.8L48 18.6L49.3 14.9L53.5 13.7L41.1 11.2L38.8 22.4L37.5 26.1L33.3 27.3L45.7 29.8Z" fill="currentColor"/>
            </svg>
          </div>

          <div className="relative grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
              <span className="text-[10px] uppercase tracking-[0.3em] text-primary-foreground/60">
                {content.eyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif font-light tracking-tight leading-tight">
                {content.title}
              </h2>
              <p className="text-primary-foreground/60 text-sm sm:text-base lg:text-lg max-w-md font-light leading-relaxed">
                {content.subtitle}
              </p>
              <Button 
                size="lg" 
                className="h-12 sm:h-14 px-6 sm:px-10 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-none" 
                asChild
              >
                <Link href={`/${locale === 'en' ? '' : locale + '/'}cbd-oil`}>
                  {content.button}
                  <ArrowRight className="ml-3 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="space-y-5">
              {content.benefits.map((point, i) => (
                <div key={i} className="flex items-start gap-4 pb-5 border-b border-primary-foreground/10 last:border-0 last:pb-0">
                  <div className="h-6 w-6 border border-primary-foreground/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 text-primary-foreground/80" strokeWidth={2} />
                  </div>
                  <span className="text-sm text-primary-foreground/80 font-light leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
