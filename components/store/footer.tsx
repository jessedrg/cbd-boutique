"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TRANSLATIONS, CATEGORY_TRANSLATIONS, CATEGORIES, type Locale } from "@/lib/seo-data";
import { Logo } from "@/components/store/logo";

interface FooterProps {
  locale: Locale;
}

const FOOTER_CONTENT: Record<string, {
  description: string;
  newsletter: string;
  newsletterCta: string;
  shopTitle: string;
  companyTitle: string;
  legalTitle: string;
  about: string;
  contact: string;
  shipping: string;
  faq: string;
  labReports: string;
  blog: string;
  privacy: string;
  terms: string;
  legal: string;
  cookies: string;
  copyright: string;
}> = {
  en: {
    description: "CBD Boutique is a premium European CBD retailer offering organic, lab-tested products sourced from certified farms across Switzerland, Italy, and the Netherlands. We are committed to transparency, quality, and your wellness journey.",
    newsletter: "Subscribe to our newsletter for exclusive offers, CBD wellness tips, and new product announcements.",
    newsletterCta: "Subscribe",
    shopTitle: "Shop CBD",
    companyTitle: "Company",
    legalTitle: "Legal",
    about: "About Us",
    contact: "Contact",
    shipping: "Shipping & Returns",
    faq: "FAQ",
    labReports: "Lab Reports",
    blog: "CBD Guide",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    legal: "Legal Notice",
    cookies: "Cookie Policy",
    copyright: "All rights reserved. CBD Boutique is a registered trademark.",
  },
  es: {
    description: "CBD Boutique es un minorista europeo premium de CBD que ofrece productos organicos, testados en laboratorio, procedentes de granjas certificadas en Suiza, Italia y los Paises Bajos. Nos comprometemos con la transparencia, la calidad y tu bienestar.",
    newsletter: "Suscribete a nuestro boletin para ofertas exclusivas, consejos de bienestar CBD y anuncios de nuevos productos.",
    newsletterCta: "Suscribirse",
    shopTitle: "Tienda CBD",
    companyTitle: "Empresa",
    legalTitle: "Legal",
    about: "Sobre Nosotros",
    contact: "Contacto",
    shipping: "Envios y Devoluciones",
    faq: "Preguntas Frecuentes",
    labReports: "Informes de Laboratorio",
    blog: "Guia CBD",
    privacy: "Politica de Privacidad",
    terms: "Terminos de Servicio",
    legal: "Aviso Legal",
    cookies: "Politica de Cookies",
    copyright: "Todos los derechos reservados. CBD Boutique es una marca registrada.",
  },
  de: {
    description: "CBD Boutique ist ein Premium-CBD-Handler aus Europa, der biologische, laborgetestete Produkte von zertifizierten Farmen in der Schweiz, Italien und den Niederlanden anbietet.",
    newsletter: "Abonnieren Sie unseren Newsletter fur exklusive Angebote, CBD-Wellness-Tipps und Neuproduktankundigungen.",
    newsletterCta: "Abonnieren",
    shopTitle: "CBD Shop",
    companyTitle: "Unternehmen",
    legalTitle: "Rechtliches",
    about: "Uber Uns",
    contact: "Kontakt",
    shipping: "Versand & Ruckgabe",
    faq: "Haufige Fragen",
    labReports: "Laborberichte",
    blog: "CBD Ratgeber",
    privacy: "Datenschutz",
    terms: "AGB",
    legal: "Impressum",
    cookies: "Cookie-Richtlinie",
    copyright: "Alle Rechte vorbehalten. CBD Boutique ist eine eingetragene Marke.",
  },
  fr: {
    description: "CBD Boutique est un detaillant premium europeen de CBD offrant des produits biologiques et testes en laboratoire, provenant de fermes certifiees en Suisse, Italie et aux Pays-Bas.",
    newsletter: "Abonnez-vous a notre newsletter pour des offres exclusives, des conseils bien-etre CBD et des annonces de nouveaux produits.",
    newsletterCta: "S'abonner",
    shopTitle: "Boutique CBD",
    companyTitle: "Entreprise",
    legalTitle: "Mentions Legales",
    about: "A Propos",
    contact: "Contact",
    shipping: "Livraison & Retours",
    faq: "FAQ",
    labReports: "Rapports Labo",
    blog: "Guide CBD",
    privacy: "Politique de Confidentialite",
    terms: "Conditions Generales",
    legal: "Mentions Legales",
    cookies: "Politique de Cookies",
    copyright: "Tous droits reserves. CBD Boutique est une marque deposee.",
  },
};

export function Footer({ locale }: FooterProps) {
  const [email, setEmail] = useState("");
  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;
  const catTranslations = CATEGORY_TRANSLATIONS[locale] || CATEGORY_TRANSLATIONS.en;
  const content = FOOTER_CONTENT[locale] || FOOTER_CONTENT.en;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="border-t border-border/30 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href={`/${locale === 'en' ? '' : locale}`} className="inline-block mb-6">
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground mb-8 max-w-sm font-light leading-relaxed">
              {content.description}
            </p>
            
            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="space-y-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">{content.newsletterCta}</p>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">{content.newsletter}</p>
              <div className="flex gap-2 max-w-sm">
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter your email" 
                  className="flex-1 min-w-0 h-12 px-4 text-sm bg-transparent border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors" 
                  required 
                />
                <Button type="submit" className="h-12 px-4 rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>

          {/* Shop column */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-6 font-medium">{content.shopTitle}</h4>
            <ul className="space-y-3">
              {CATEGORIES.slice(0, 7).map((cat) => (
                <li key={cat}>
                  <Link 
                    href={`/${locale === 'en' ? '' : locale + '/'}${cat}`} 
                    className="text-sm text-foreground/70 hover:text-foreground transition-colors font-light capitalize"
                  >
                    {catTranslations[cat]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-6 font-medium">{content.companyTitle}</h4>
            <ul className="space-y-3">
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}about`} className="text-sm text-foreground/70 hover:text-foreground transition-colors font-light">{content.about}</Link></li>
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}contact`} className="text-sm text-foreground/70 hover:text-foreground transition-colors font-light">{content.contact}</Link></li>
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}shipping`} className="text-sm text-foreground/70 hover:text-foreground transition-colors font-light">{content.shipping}</Link></li>
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}faq`} className="text-sm text-foreground/70 hover:text-foreground transition-colors font-light">{content.faq}</Link></li>
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}lab-reports`} className="text-sm text-foreground/70 hover:text-foreground transition-colors font-light">{content.labReports}</Link></li>
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}cbd-guide`} className="text-sm text-foreground/70 hover:text-foreground transition-colors font-light">{content.blog}</Link></li>
            </ul>
          </div>

          {/* Legal column */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-6 font-medium">{content.legalTitle}</h4>
            <ul className="space-y-3">
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}privacy`} className="text-sm text-foreground/70 hover:text-foreground transition-colors font-light">{content.privacy}</Link></li>
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}terms`} className="text-sm text-foreground/70 hover:text-foreground transition-colors font-light">{content.terms}</Link></li>
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}legal`} className="text-sm text-foreground/70 hover:text-foreground transition-colors font-light">{content.legal}</Link></li>
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}cookies`} className="text-sm text-foreground/70 hover:text-foreground transition-colors font-light">{content.cookies}</Link></li>
            </ul>

            {/* Trust badges */}
            <div className="mt-8 pt-6 border-t border-border/30">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3 font-medium">
                {locale === 'es' ? 'Certificaciones' : 'Certifications'}
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="text-[10px] uppercase tracking-wider px-3 py-1.5 border border-border text-muted-foreground">EU Compliant</span>
                <span className="text-[10px] uppercase tracking-wider px-3 py-1.5 border border-border text-muted-foreground">{'THC <0.2%'}</span>
                <span className="text-[10px] uppercase tracking-wider px-3 py-1.5 border border-border text-muted-foreground">Lab Tested</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-muted-foreground tracking-wide">
            &copy; {new Date().getFullYear()} CBD Boutique. {content.copyright}
          </p>
          <div className="flex items-center gap-6">
            <Link href={`/${locale === 'en' ? '' : locale + '/'}privacy`} className="text-[10px] text-muted-foreground hover:text-foreground transition-colors tracking-wide">
              {content.privacy}
            </Link>
            <Link href={`/${locale === 'en' ? '' : locale + '/'}terms`} className="text-[10px] text-muted-foreground hover:text-foreground transition-colors tracking-wide">
              {content.terms}
            </Link>
            <Link href={`/${locale === 'en' ? '' : locale + '/'}legal`} className="text-[10px] text-muted-foreground hover:text-foreground transition-colors tracking-wide">
              {content.legal}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
