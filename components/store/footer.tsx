"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TRANSLATIONS, CATEGORY_TRANSLATIONS, CATEGORIES, type Locale } from "@/lib/seo-data";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const [email, setEmail] = useState("");
  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;
  const catTranslations = CATEGORY_TRANSLATIONS[locale] || CATEGORY_TRANSLATIONS.en;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="border-t border-border/30 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="py-16 lg:py-20 grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          <div className="md:col-span-2">
            <Link href={`/${locale === 'en' ? '' : locale}`} className="inline-block mb-6">
              <span className="text-xl font-serif font-light tracking-wide">CBD Boutique</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-8 max-w-sm font-light leading-relaxed">
              Premium CBD products sourced from the finest European hemp. Lab-tested, organic, and delivered with care.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Newsletter</p>
              <div className="flex gap-2 max-w-sm">
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter your email" 
                  className="flex-1 min-w-0 h-12 px-4 text-sm bg-transparent border border-border focus:border-foreground focus:outline-none transition-colors" 
                  required 
                />
                <Button type="submit" className="h-12 px-4 rounded-none">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-6">{t.nav.shop}</h4>
            <ul className="space-y-3">
              {CATEGORIES.slice(0, 6).map((cat) => (
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

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-6">Company</h4>
            <ul className="space-y-3">
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}about`} className="text-sm text-foreground/70 hover:text-foreground transition-colors font-light">{t.nav.about}</Link></li>
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}contact`} className="text-sm text-foreground/70 hover:text-foreground transition-colors font-light">{t.nav.contact}</Link></li>
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}shipping`} className="text-sm text-foreground/70 hover:text-foreground transition-colors font-light">Shipping</Link></li>
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}faq`} className="text-sm text-foreground/70 hover:text-foreground transition-colors font-light">FAQ</Link></li>
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}lab-reports`} className="text-sm text-foreground/70 hover:text-foreground transition-colors font-light">Lab Reports</Link></li>
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-muted-foreground tracking-wide">
            &copy; {new Date().getFullYear()} CBD Boutique. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href={`/${locale === 'en' ? '' : locale + '/'}privacy`} className="text-[10px] text-muted-foreground hover:text-foreground transition-colors tracking-wide">
              {t.footer.privacy}
            </Link>
            <Link href={`/${locale === 'en' ? '' : locale + '/'}terms`} className="text-[10px] text-muted-foreground hover:text-foreground transition-colors tracking-wide">
              {t.footer.terms}
            </Link>
            <Link href={`/${locale === 'en' ? '' : locale + '/'}legal`} className="text-[10px] text-muted-foreground hover:text-foreground transition-colors tracking-wide">
              {t.footer.legal}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
