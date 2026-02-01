"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, Menu, X, ChevronDown, Globe } from "lucide-react";
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

// CBD Categories
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
  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;

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

  return (
    <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors",
        transparent 
          ? "bg-transparent backdrop-blur-sm border-b border-white/10" 
          : "bg-background/80 backdrop-blur-xl border-b border-border/50"
      )}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href={`/${locale === 'en' ? '' : locale}`} className="flex items-center gap-3">
            <span className={cn("text-xl font-serif font-light tracking-wide", transparent ? "text-white" : "text-foreground")}>CBD Boutique</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger className={cn("flex items-center gap-1 text-xs uppercase tracking-[0.15em] transition-colors", transparent ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground")}>
                {t.nav.shop}
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 p-2">
                {CATEGORIES.map((cat) => (
                  <DropdownMenuItem key={cat.slug} asChild>
                    <Link href={`/${locale === 'en' ? '' : locale + '/'}${cat.slug}`} className="cursor-pointer">
                      {getCatName(cat)}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href={`/${locale === 'en' ? '' : locale + '/'}about`} className={cn("text-xs uppercase tracking-[0.15em] transition-colors", transparent ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground")}>
              {t.nav.about}
            </Link>
            <Link href={`/${locale === 'en' ? '' : locale + '/'}contact`} className={cn("text-xs uppercase tracking-[0.15em] transition-colors", transparent ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground")}>
              {t.nav.contact}
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className={cn("h-9 w-9", transparent && "text-white hover:text-white hover:bg-white/10")} onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className={cn("h-9 w-9", transparent && "text-white hover:text-white hover:bg-white/10")}>
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {Object.entries(LOCALE_NAMES).map(([code, name]) => (
                  <DropdownMenuItem key={code} asChild>
                    <Link href={`/${code === 'en' ? '' : code}`} className={cn("cursor-pointer", locale === code && "font-semibold")}>
                      {name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" className={cn("h-9 w-9 relative", transparent && "text-white hover:text-white hover:bg-white/10")} onClick={openCart}>
              <ShoppingBag className="h-4 w-4" />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-accent-foreground text-[10px] font-medium flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </Button>

            <Button variant="ghost" size="icon" className={cn("h-9 w-9 lg:hidden", transparent && "text-white hover:text-white hover:bg-white/10")} onClick={() => setIsMenuOpen(true)}>
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="py-4 border-t border-border/50">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="search" 
                placeholder={locale === 'es' ? 'Buscar productos...' : 'Search products...'} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 bg-muted/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" 
                autoFocus 
              />
            </form>
          </div>
        )}
      </div>

      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0">
          <SheetHeader className="p-6 border-b">
            <SheetTitle>{locale === 'es' ? 'Menu' : 'Menu'}</SheetTitle>
          </SheetHeader>
          <div className="p-6 space-y-6 overflow-y-auto">
            {/* Search in mobile menu */}
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
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
                  className="w-full h-12 pl-10 pr-4 bg-muted/50 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-ring" 
                />
              </form>
            </div>

            <div className="border-t border-border/50 pt-6">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                {locale === 'es' ? 'Categorias' : 'Categories'}
              </p>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <Link key={cat.slug} href={`/${locale === 'en' ? '' : locale + '/'}${cat.slug}`} className="block text-base py-2 hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>
                    {getCatName(cat)}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="pt-6 border-t border-border/50">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                {locale === 'es' ? 'Idioma' : 'Language'}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(LOCALE_NAMES).slice(0, 9).map(([code, name]) => (
                  <Link key={code} href={`/${code === 'en' ? '' : code}`} className={cn("text-sm py-2 px-3 rounded-md text-center transition-colors", locale === code ? "bg-foreground text-background font-medium" : "bg-muted hover:bg-muted/80")} onClick={() => setIsMenuOpen(false)}>
                    {name.split(' ')[0]}
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
