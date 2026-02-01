// CBD BOUTIQUE - LIGHTWEIGHT SEO SYSTEM
// No heavy data loading, no memory issues, always works

export const LOCALES = ['es', 'en', 'de', 'fr', 'it', 'pt', 'nl', 'pl', 'cs', 'el'] as const;
export type Locale = typeof LOCALES[number];

type Trans = {
  products: string;
  in: string;
  shipping: string;
  warranty: string;
  support: string;
  home: string;
  contact: string;
  viewAll: string;
  shop: string;
  description: string;
  qualityDesc: string;
  deliveryDesc: string;
  supportDesc: string;
};

// Complete translations for CBD products
export const T: Record<Locale, Trans> = {
  es: { products: 'Productos CBD Premium', in: 'en', shipping: 'Envío Discreto 24h', warranty: 'Garantía de Calidad', support: 'Asesoría Experta', home: 'Inicio', contact: 'Contacto', viewAll: 'Ver Todo', shop: 'Tienda', description: 'Descubre nuestra selección premium de productos CBD. Orgánicos, testados en laboratorio, envío discreto.', qualityDesc: 'Productos 100% orgánicos y certificados', deliveryDesc: 'Envío discreto en 24-48h', supportDesc: 'Equipo de expertos en CBD disponible' },
  en: { products: 'Premium CBD Products', in: 'in', shipping: 'Discreet 24h Shipping', warranty: 'Quality Guarantee', support: 'Expert Guidance', home: 'Home', contact: 'Contact', viewAll: 'View All', shop: 'Shop', description: 'Discover our premium CBD products. Organic, lab-tested, discreet shipping.', qualityDesc: '100% organic and certified products', deliveryDesc: 'Discreet shipping in 24-48h', supportDesc: 'CBD expert team available' },
  de: { products: 'Premium CBD Produkte', in: 'in', shipping: 'Diskreter Versand 24h', warranty: 'Qualitätsgarantie', support: 'Expertenberatung', home: 'Startseite', contact: 'Kontakt', viewAll: 'Alle Anzeigen', shop: 'Shop', description: 'Entdecken Sie unsere Premium CBD Produkte. Bio, laborgetestet, diskreter Versand.', qualityDesc: '100% biologische und zertifizierte Produkte', deliveryDesc: 'Diskreter Versand in 24-48h', supportDesc: 'CBD-Expertenteam verfügbar' },
  fr: { products: 'Produits CBD Premium', in: 'à', shipping: 'Livraison Discrète 24h', warranty: 'Garantie Qualité', support: 'Conseil Expert', home: 'Accueil', contact: 'Contact', viewAll: 'Voir Tout', shop: 'Boutique', description: 'Découvrez nos produits CBD premium. Bio, testés en labo, livraison discrète.', qualityDesc: 'Produits 100% bio et certifiés', deliveryDesc: 'Livraison discrète en 24-48h', supportDesc: 'Équipe d\'experts CBD disponible' },
  it: { products: 'Prodotti CBD Premium', in: 'a', shipping: 'Spedizione Discreta 24h', warranty: 'Garanzia Qualità', support: 'Consulenza Esperta', home: 'Home', contact: 'Contatto', viewAll: 'Vedi Tutto', shop: 'Negozio', description: 'Scopri i nostri prodotti CBD premium. Biologici, testati in laboratorio, spedizione discreta.', qualityDesc: 'Prodotti 100% biologici e certificati', deliveryDesc: 'Spedizione discreta in 24-48h', supportDesc: 'Team di esperti CBD disponibile' },
  pt: { products: 'Produtos CBD Premium', in: 'em', shipping: 'Envio Discreto 24h', warranty: 'Garantia de Qualidade', support: 'Orientação Especializada', home: 'Início', contact: 'Contato', viewAll: 'Ver Tudo', shop: 'Loja', description: 'Descubra nossos produtos CBD premium. Orgânicos, testados em laboratório, envio discreto.', qualityDesc: 'Produtos 100% orgânicos e certificados', deliveryDesc: 'Envio discreto em 24-48h', supportDesc: 'Equipe de especialistas CBD disponível' },
  nl: { products: 'Premium CBD Producten', in: 'in', shipping: 'Discrete Verzending 24u', warranty: 'Kwaliteitsgarantie', support: 'Expert Advies', home: 'Home', contact: 'Contact', viewAll: 'Bekijk Alles', shop: 'Winkel', description: 'Ontdek onze premium CBD producten. Biologisch, labgetest, discrete verzending.', qualityDesc: '100% biologische en gecertificeerde producten', deliveryDesc: 'Discrete verzending in 24-48u', supportDesc: 'CBD-expertteam beschikbaar' },
  pl: { products: 'Produkty CBD Premium', in: 'w', shipping: 'Dyskretna Wysyłka 24h', warranty: 'Gwarancja Jakości', support: 'Porada Eksperta', home: 'Strona główna', contact: 'Kontakt', viewAll: 'Zobacz Wszystko', shop: 'Sklep', description: 'Odkryj nasze produkty CBD premium. Organiczne, testowane laboratoryjnie, dyskretna wysyłka.', qualityDesc: 'Produkty 100% organiczne i certyfikowane', deliveryDesc: 'Dyskretna wysyłka w 24-48h', supportDesc: 'Zespół ekspertów CBD dostępny' },
  cs: { products: 'Premium CBD Produkty', in: 'v', shipping: 'Diskrétní Doručení 24h', warranty: 'Záruka Kvality', support: 'Odborné Poradenství', home: 'Domů', contact: 'Kontakt', viewAll: 'Zobrazit Vše', shop: 'Obchod', description: 'Objevte naše prémiové CBD produkty. Bio, laboratorně testované, diskrétní doručení.', qualityDesc: '100% bio a certifikované produkty', deliveryDesc: 'Diskrétní doručení za 24-48h', supportDesc: 'Tým CBD odborníků k dispozici' },
  el: { products: 'Premium CBD Προϊόντα', in: 'σε', shipping: 'Διακριτική Αποστολή 24ω', warranty: 'Εγγύηση Ποιότητας', support: 'Ειδική Καθοδήγηση', home: 'Αρχική', contact: 'Επικοινωνία', viewAll: 'Δείτε Όλα', shop: 'Κατάστημα', description: 'Ανακαλύψτε τα premium CBD προϊόντα μας. Βιολογικά, εργαστηριακά ελεγμένα, διακριτική αποστολή.', qualityDesc: '100% βιολογικά και πιστοποιημένα προϊόντα', deliveryDesc: 'Διακριτική αποστολή σε 24-48ω', supportDesc: 'Ομάδα ειδικών CBD διαθέσιμη' },
};

// Format ANY slug to readable title - NEVER fails, ZERO memory
export function formatSlugToTitle(slug: string): string {
  if (!slug) return '';
  // Decode URL-encoded characters (e.g., %C3%A4 -> ä)
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    // If decode fails, use original
  }
  return decoded
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Get locale safely - defaults to 'en'
export function getLocale(locale: string): Locale {
  return LOCALES.includes(locale as Locale) ? locale as Locale : 'en';
}

// Get translations safely
export function getT(locale: string) {
  return T[getLocale(locale)] || T.en;
}
