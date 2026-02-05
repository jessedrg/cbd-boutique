"use client";

import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, Menu, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { TRANSLATIONS, SUPPORTED_LOCALES, type Locale } from "@/lib/seo-data";
import { useCart } from "@/components/cart/cart-context";
import { Logo } from "@/components/store/logo";

const CATEGORIES = [
  { slug: 'cbd-oil', name: { es: 'Aceite CBD', en: 'CBD Oil', de: 'CBD Öl', fr: 'Huile CBD', it: 'Olio CBD', pt: 'Óleo CBD', nl: 'CBD Olie', pl: 'Olej CBD', cs: 'CBD Olej', el: 'Έλαιο CBD' } },
  { slug: 'cbd-flowers', name: { es: 'Flores CBD', en: 'CBD Flowers', de: 'CBD Blüten', fr: 'Fleurs CBD', it: 'Fiori CBD', pt: 'Flores CBD', nl: 'CBD Bloemen', pl: 'Kwiaty CBD', cs: 'CBD Květy', el: 'Άνθη CBD' } },
  { slug: 'cbd-cosmetics', name: { es: 'Cosmética', en: 'Cosmetics', de: 'Kosmetik', fr: 'Cosmétiques', it: 'Cosmetici', pt: 'Cosméticos', nl: 'Cosmetica', pl: 'Kosmetyki', cs: 'Kosmetika', el: 'Καλλυντικά' } },
  { slug: 'cbd-edibles', name: { es: 'Comestibles', en: 'Edibles', de: 'Lebensmittel', fr: 'Comestibles', it: 'Edibili', pt: 'Comestíveis', nl: 'Eetbaar', pl: 'Jedzenie', cs: 'Jídlo', el: 'Εδώδιμα' } },
  { slug: 'cbd-vape', name: { es: 'Vape', en: 'Vape', de: 'Vape', fr: 'Vape', it: 'Vape', pt: 'Vape', nl: 'Vape', pl: 'Vape', cs: 'Vape', el: 'Vape' } },
  { slug: 'cbd-pets', name: { es: 'Mascotas', en: 'Pets', de: 'Haustiere', fr: 'Animaux', it: 'Animali', pt: 'Animais', nl: 'Huisdieren', pl: 'Zwierzęta', cs: 'Mazlíčci', el: 'Κατοικίδια' } },
];

const LOCALE_NAMES: Record<string, string> = {
  es: 'ES', en: 'EN', de: 'DE', fr: 'FR', it: 'IT', pt: 'PT',
  nl: 'NL', pl: 'PL', cs: 'CS', el: 'EL',
};

interface HeaderProps {
  locale: Locale;
  transparent?: boolean;
}

export function Header({ locale, transparent = false }: HeaderProps) {
  const router = useRouter();
  const { totalQuantity, openCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const basePath = locale === 'en' ? '' : `/${locale}`;
      router.push(`${basePath}/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const getCatName = (cat: typeof CATEGORIES[0]) => {
    return cat.name[locale as keyof typeof cat.name] || cat.name.en;
  };

  const isTransparent = transparent && !scrolled;

  return (
    <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isTransparent
          ? "bg-transparent" 
          : "bg-background/95 backdrop-blur-xl border-b border-border/40 shadow-sm"
      )}>
      {/* Top announcement bar */}
      <div className={cn(
        "transition-all duration-300 overflow-hidden",
        scrolled ? "h-0" : "h-8"
      )}>
        <div className={cn(
          "h-8 flex items-center justify-center text-[10px] uppercase tracking-[0.25em]",
          isTransparent ? "bg-white/10 text-white/80" : "bg-primary text-primary-foreground"
        )}>
          {locale === 'es' ? 'Envio gratis en pedidos +50EUR | CBD legal y certificado' : 
           locale === 'de' ? 'Kostenloser Versand ab 50EUR | Legales & zertifiziertes CBD' :
           locale === 'fr' ? 'Livraison gratuite des 50EUR | CBD legal et certifie' :
           'Free shipping on orders +50EUR | Legal & certified CBD'}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale === 'en' ? '' : locale}`} className="flex items-center gap-3">
            <Logo variant={isTransparent ? "white" : "default"} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(
                "flex items-center gap-1 text-[11px] uppercase tracking-[0.15em] font-medium transition-colors",
                isTransparent ? "text-white/90 hover:text-white" : "text-foreground/70 hover:text-foreground"
              )}>
                {t.nav.shop}
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 p-2 bg-card">
                {CATEGORIES.map((cat) => (
                  <DropdownMenuItem key={cat.slug} asChild>
                    <Link href={`/${locale === 'en' ? '' : locale + '/'}${cat.slug}`} className="cursor-pointer text-card-foreground">
                      {getCatName(cat)}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href={`/${locale === 'en' ? '' : locale + '/'}about`} className={cn(
              "text-[11px] uppercase tracking-[0.15em] font-medium transition-colors",
              isTransparent ? "text-white/90 hover:text-white" : "text-foreground/70 hover:text-foreground"
            )}>
              {t.nav.about}
            </Link>
            <Link href={`/${locale === 'en' ? '' : locale + '/'}contact`} className={cn(
              "text-[11px] uppercase tracking-[0.15em] font-medium transition-colors",
              isTransparent ? "text-white/90 hover:text-white" : "text-foreground/70 hover:text-foreground"
            )}>
              {t.nav.contact}
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-9 w-9", isTransparent && "text-white hover:text-white hover:bg-white/10")}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-9 w-9", isTransparent && "text-white hover:text-white hover:bg-white/10")}
                  aria-label="Language"
                >
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 bg-card">
                {Object.entries(LOCALE_NAMES).map(([code, name]) => (
                  <DropdownMenuItem key={code} asChild>
                    <Link href={`/${code === 'en' ? '' : code}`} className={cn("cursor-pointer text-card-foreground", locale === code && "font-semibold")}>
                      {name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className={cn("h-9 w-9 relative", isTransparent && "text-white hover:text-white hover:bg-white/10")}
              onClick={openCart}
              aria-label="Cart"
            >
              <ShoppingBag className="h-4 w-4" />
              {totalQuantity > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] font-medium flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={cn("h-9 w-9 lg:hidden", isTransparent && "text-white hover:text-white hover:bg-white/10")}
              onClick={() => setIsMenuOpen(true)}
              aria-label="Menu"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-border/30">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder={locale === 'es' ? 'Buscar productos...' : 'Search products...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-secondary text-secondary-foreground rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                autoFocus
              />
            </form>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0 bg-background">
          <SheetHeader className="p-6 border-b border-border">
            <SheetTitle className="flex items-center gap-3">
              <Logo />
            </SheetTitle>
          </SheetHeader>
          <div className="p-6 space-y-8 overflow-y-auto">
            {/* Search */}
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.2em] mb-3">
                {locale === 'es' ? 'Buscar' : 'Search'}
              </p>
              <form onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  const basePath = locale === 'en' ? '' : `/${locale}`;
                  router.push(`${basePath}/search?q=${encodeURIComponent(searchQuery.trim())}`);
                  setIsMenuOpen(false);
                  setSearchQuery("");
                }
              }} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder={locale === 'es' ? 'Buscar productos...' : 'Search products...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 bg-secondary text-secondary-foreground text-base focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </form>
            </div>

            {/* Categories */}
            <div className="border-t border-border/50 pt-6">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.2em] mb-4">
                {locale === 'es' ? 'Categorias' : 'Categories'}
              </p>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/${locale === 'en' ? '' : locale + '/'}${cat.slug}`}
                    className="block text-base py-2.5 text-foreground/80 hover:text-primary transition-colors font-light"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {getCatName(cat)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Pages */}
            <div className="border-t border-border/50 pt-6">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.2em] mb-4">
                {locale === 'es' ? 'Paginas' : 'Pages'}
              </p>
              <div className="space-y-1">
                <Link href={`/${locale === 'en' ? '' : locale + '/'}about`} className="block text-base py-2.5 text-foreground/80 hover:text-primary transition-colors font-light" onClick={() => setIsMenuOpen(false)}>
                  {t.nav.about}
                </Link>
                <Link href={`/${locale === 'en' ? '' : locale + '/'}contact`} className="block text-base py-2.5 text-foreground/80 hover:text-primary transition-colors font-light" onClick={() => setIsMenuOpen(false)}>
                  {t.nav.contact}
                </Link>
              </div>
            </div>

            {/* Language */}
            <div className="pt-6 border-t border-border/50">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.2em] mb-4">
                {locale === 'es' ? 'Idioma' : 'Language'}
              </p>
              <div className="grid grid-cols-5 gap-2">
                {Object.entries(LOCALE_NAMES).map(([code, name]) => (
                  <Link
                    key={code}
                    href={`/${code === 'en' ? '' : code}`}
                    className={cn(
                      "text-sm py-2 px-3 text-center transition-colors",
                      locale === code
                        ? "bg-primary text-primary-foreground font-medium"
                        : "bg-secondary text-secondary-foreground hover:bg-muted"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
