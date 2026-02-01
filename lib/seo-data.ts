// =============================================================================
// CBD BOUTIQUE - PREMIUM SEO DATABASE
// Multi-language, Multi-country, High-Intent Keywords
// =============================================================================

export const LOCALES = {
  es: { name: 'Español', countries: ['spain'] },
  en: { name: 'English', countries: ['usa', 'uk', 'canada', 'australia', 'ireland'] },
  de: { name: 'Deutsch', countries: ['germany', 'austria', 'switzerland-de'] },
  fr: { name: 'Français', countries: ['france', 'belgium-fr', 'switzerland-fr'] },
  it: { name: 'Italiano', countries: ['italy', 'switzerland-it'] },
  pt: { name: 'Português', countries: ['portugal'] },
  nl: { name: 'Nederlands', countries: ['netherlands', 'belgium-nl'] },
  pl: { name: 'Polski', countries: ['poland'] },
  cs: { name: 'Čeština', countries: ['czechia'] },
  el: { name: 'Ελληνικά', countries: ['greece'] },
} as const;

export type Locale = keyof typeof LOCALES;
export const SUPPORTED_LOCALES = Object.keys(LOCALES) as Locale[];

// =============================================================================
// CITIES BY COUNTRY
// =============================================================================

export const CITIES_BY_COUNTRY: Record<string, { name: string; slug: string; population: number }[]> = {
  spain: [
    { name: 'Madrid', slug: 'madrid', population: 3223000 },
    { name: 'Barcelona', slug: 'barcelona', population: 1620000 },
    { name: 'Valencia', slug: 'valencia', population: 791000 },
    { name: 'Sevilla', slug: 'sevilla', population: 688000 },
    { name: 'Zaragoza', slug: 'zaragoza', population: 666000 },
    { name: 'Málaga', slug: 'malaga', population: 571000 },
    { name: 'Murcia', slug: 'murcia', population: 447000 },
    { name: 'Palma de Mallorca', slug: 'palma', population: 416000 },
    { name: 'Bilbao', slug: 'bilbao', population: 346000 },
    { name: 'Alicante', slug: 'alicante', population: 334000 },
    { name: 'Granada', slug: 'granada', population: 232000 },
    { name: 'San Sebastián', slug: 'san-sebastian', population: 187000 },
    { name: 'Santander', slug: 'santander', population: 172000 },
    { name: 'Marbella', slug: 'marbella', population: 147000 },
    { name: 'Ibiza', slug: 'ibiza', population: 50000 },
  ],
  usa: [
    { name: 'New York', slug: 'new-york', population: 8336000 },
    { name: 'Los Angeles', slug: 'los-angeles', population: 3979000 },
    { name: 'Chicago', slug: 'chicago', population: 2693000 },
    { name: 'Miami', slug: 'miami', population: 454000 },
    { name: 'San Francisco', slug: 'san-francisco', population: 873000 },
    { name: 'Denver', slug: 'denver', population: 727000 },
    { name: 'Seattle', slug: 'seattle', population: 737000 },
    { name: 'Austin', slug: 'austin', population: 978000 },
    { name: 'Portland', slug: 'portland', population: 653000 },
    { name: 'San Diego', slug: 'san-diego', population: 1424000 },
  ],
  uk: [
    { name: 'London', slug: 'london', population: 8982000 },
    { name: 'Manchester', slug: 'manchester', population: 553000 },
    { name: 'Birmingham', slug: 'birmingham', population: 1141000 },
    { name: 'Edinburgh', slug: 'edinburgh', population: 527000 },
    { name: 'Bristol', slug: 'bristol', population: 463000 },
    { name: 'Brighton', slug: 'brighton', population: 229000 },
    { name: 'Leeds', slug: 'leeds', population: 793000 },
    { name: 'Glasgow', slug: 'glasgow', population: 633000 },
  ],
  germany: [
    { name: 'Berlin', slug: 'berlin', population: 3645000 },
    { name: 'Hamburg', slug: 'hamburg', population: 1841000 },
    { name: 'München', slug: 'muenchen', population: 1472000 },
    { name: 'Köln', slug: 'koeln', population: 1086000 },
    { name: 'Frankfurt', slug: 'frankfurt', population: 753000 },
    { name: 'Düsseldorf', slug: 'duesseldorf', population: 619000 },
  ],
  france: [
    { name: 'Paris', slug: 'paris', population: 2161000 },
    { name: 'Lyon', slug: 'lyon', population: 516000 },
    { name: 'Marseille', slug: 'marseille', population: 861000 },
    { name: 'Bordeaux', slug: 'bordeaux', population: 257000 },
    { name: 'Nice', slug: 'nice', population: 342000 },
  ],
  italy: [
    { name: 'Milano', slug: 'milano', population: 1352000 },
    { name: 'Roma', slug: 'roma', population: 2873000 },
    { name: 'Firenze', slug: 'firenze', population: 382000 },
    { name: 'Torino', slug: 'torino', population: 870000 },
  ],
  netherlands: [
    { name: 'Amsterdam', slug: 'amsterdam', population: 873000 },
    { name: 'Rotterdam', slug: 'rotterdam', population: 651000 },
    { name: 'Den Haag', slug: 'den-haag', population: 545000 },
    { name: 'Utrecht', slug: 'utrecht', population: 358000 },
  ],
  portugal: [
    { name: 'Lisboa', slug: 'lisboa', population: 545000 },
    { name: 'Porto', slug: 'porto', population: 237000 },
  ],
  austria: [
    { name: 'Wien', slug: 'wien', population: 1897000 },
    { name: 'Salzburg', slug: 'salzburg', population: 155000 },
  ],
  'switzerland-de': [
    { name: 'Zürich', slug: 'zuerich', population: 421000 },
    { name: 'Basel', slug: 'basel', population: 177000 },
    { name: 'Bern', slug: 'bern', population: 134000 },
  ],
  canada: [
    { name: 'Toronto', slug: 'toronto', population: 2731000 },
    { name: 'Vancouver', slug: 'vancouver', population: 631000 },
    { name: 'Montreal', slug: 'montreal', population: 1762000 },
  ],
  australia: [
    { name: 'Sydney', slug: 'sydney', population: 5312000 },
    { name: 'Melbourne', slug: 'melbourne', population: 5078000 },
  ],
  ireland: [
    { name: 'Dublin', slug: 'dublin', population: 1173000 },
    { name: 'Cork', slug: 'cork', population: 210000 },
  ],
  'belgium-fr': [
    { name: 'Bruxelles', slug: 'bruxelles', population: 185000 },
  ],
  'belgium-nl': [
    { name: 'Antwerpen', slug: 'antwerpen', population: 529000 },
    { name: 'Gent', slug: 'gent', population: 263000 },
  ],
  'switzerland-fr': [
    { name: 'Genève', slug: 'geneve', population: 201000 },
    { name: 'Lausanne', slug: 'lausanne', population: 139000 },
  ],
  'switzerland-it': [
    { name: 'Lugano', slug: 'lugano', population: 63000 },
  ],
  poland: [
    { name: 'Warszawa', slug: 'warszawa', population: 1790000 },
    { name: 'Kraków', slug: 'krakow', population: 780000 },
  ],
  czechia: [
    { name: 'Praha', slug: 'praha', population: 1309000 },
  ],
  greece: [
    { name: 'Αθήνα', slug: 'athina', population: 664000 },
  ],
};

// =============================================================================
// CBD PRODUCT CATEGORIES
// =============================================================================

export const CATEGORIES = [
  'cbd-oil',
  'cbd-flowers',
  'cbd-edibles',
  'cbd-cosmetics',
  'cbd-vape',
  'cbd-capsules',
  'cbd-pets',
  'cbd-isolate',
  'cbd-topicals',
  'cbd-tinctures',
] as const;

export type Category = typeof CATEGORIES[number];

export const PRODUCT_TYPES: Record<Category, string[]> = {
  'cbd-oil': ['full-spectrum', 'broad-spectrum', 'isolate', '5-percent', '10-percent', '15-percent', '20-percent', '30-percent', 'organic', 'premium'],
  'cbd-flowers': ['indoor', 'outdoor', 'greenhouse', 'premium', 'sativa', 'indica', 'hybrid', 'organic', 'trimmed', 'untrimmed'],
  'cbd-edibles': ['gummies', 'chocolate', 'cookies', 'honey', 'tea', 'coffee', 'drinks', 'candy', 'brownies', 'mints'],
  'cbd-cosmetics': ['face-cream', 'body-lotion', 'serum', 'lip-balm', 'eye-cream', 'face-mask', 'cleanser', 'anti-aging', 'moisturizer', 'sunscreen'],
  'cbd-vape': ['cartridges', 'disposable', 'e-liquid', 'pens', 'pods', 'kits', 'batteries', 'coils', 'tanks', 'accessories'],
  'cbd-capsules': ['softgels', 'tablets', 'pills', 'sleep', 'energy', 'focus', 'relax', 'immunity', 'daily', 'extra-strength'],
  'cbd-pets': ['dogs', 'cats', 'horses', 'treats', 'oil', 'calming', 'joint', 'anxiety', 'senior', 'organic'],
  'cbd-isolate': ['powder', 'crystals', 'slab', '99-percent', 'bulk', 'wholesale', 'lab-tested', 'organic', 'pure', 'premium'],
  'cbd-topicals': ['balm', 'salve', 'cream', 'roll-on', 'patch', 'muscle', 'joint', 'pain', 'recovery', 'sports'],
  'cbd-tinctures': ['sublingual', 'drops', 'spray', 'mint', 'natural', 'citrus', 'berry', 'vanilla', 'unflavored', 'high-potency'],
};

// =============================================================================
// CATEGORY TRANSLATIONS
// =============================================================================

export const CATEGORY_TRANSLATIONS: Record<Locale, Record<Category, string>> = {
  es: {
    'cbd-oil': 'aceite cbd',
    'cbd-flowers': 'flores cbd',
    'cbd-edibles': 'comestibles cbd',
    'cbd-cosmetics': 'cosmética cbd',
    'cbd-vape': 'vape cbd',
    'cbd-capsules': 'cápsulas cbd',
    'cbd-pets': 'cbd mascotas',
    'cbd-isolate': 'aislado cbd',
    'cbd-topicals': 'tópicos cbd',
    'cbd-tinctures': 'tinturas cbd',
  },
  en: {
    'cbd-oil': 'cbd oil',
    'cbd-flowers': 'cbd flowers',
    'cbd-edibles': 'cbd edibles',
    'cbd-cosmetics': 'cbd cosmetics',
    'cbd-vape': 'cbd vape',
    'cbd-capsules': 'cbd capsules',
    'cbd-pets': 'cbd for pets',
    'cbd-isolate': 'cbd isolate',
    'cbd-topicals': 'cbd topicals',
    'cbd-tinctures': 'cbd tinctures',
  },
  de: {
    'cbd-oil': 'cbd öl',
    'cbd-flowers': 'cbd blüten',
    'cbd-edibles': 'cbd lebensmittel',
    'cbd-cosmetics': 'cbd kosmetik',
    'cbd-vape': 'cbd vape',
    'cbd-capsules': 'cbd kapseln',
    'cbd-pets': 'cbd für haustiere',
    'cbd-isolate': 'cbd isolat',
    'cbd-topicals': 'cbd salben',
    'cbd-tinctures': 'cbd tinkturen',
  },
  fr: {
    'cbd-oil': 'huile cbd',
    'cbd-flowers': 'fleurs cbd',
    'cbd-edibles': 'comestibles cbd',
    'cbd-cosmetics': 'cosmétiques cbd',
    'cbd-vape': 'vape cbd',
    'cbd-capsules': 'gélules cbd',
    'cbd-pets': 'cbd animaux',
    'cbd-isolate': 'isolat cbd',
    'cbd-topicals': 'topiques cbd',
    'cbd-tinctures': 'teintures cbd',
  },
  it: {
    'cbd-oil': 'olio cbd',
    'cbd-flowers': 'fiori cbd',
    'cbd-edibles': 'edibili cbd',
    'cbd-cosmetics': 'cosmetici cbd',
    'cbd-vape': 'vape cbd',
    'cbd-capsules': 'capsule cbd',
    'cbd-pets': 'cbd animali',
    'cbd-isolate': 'isolato cbd',
    'cbd-topicals': 'topici cbd',
    'cbd-tinctures': 'tinture cbd',
  },
  pt: {
    'cbd-oil': 'óleo cbd',
    'cbd-flowers': 'flores cbd',
    'cbd-edibles': 'comestíveis cbd',
    'cbd-cosmetics': 'cosméticos cbd',
    'cbd-vape': 'vape cbd',
    'cbd-capsules': 'cápsulas cbd',
    'cbd-pets': 'cbd animais',
    'cbd-isolate': 'isolado cbd',
    'cbd-topicals': 'tópicos cbd',
    'cbd-tinctures': 'tinturas cbd',
  },
  nl: {
    'cbd-oil': 'cbd olie',
    'cbd-flowers': 'cbd bloemen',
    'cbd-edibles': 'cbd eetbaar',
    'cbd-cosmetics': 'cbd cosmetica',
    'cbd-vape': 'cbd vape',
    'cbd-capsules': 'cbd capsules',
    'cbd-pets': 'cbd huisdieren',
    'cbd-isolate': 'cbd isolaat',
    'cbd-topicals': 'cbd zalven',
    'cbd-tinctures': 'cbd tincturen',
  },
  pl: {
    'cbd-oil': 'olej cbd',
    'cbd-flowers': 'kwiaty cbd',
    'cbd-edibles': 'jedzenie cbd',
    'cbd-cosmetics': 'kosmetyki cbd',
    'cbd-vape': 'vape cbd',
    'cbd-capsules': 'kapsułki cbd',
    'cbd-pets': 'cbd zwierzęta',
    'cbd-isolate': 'izolat cbd',
    'cbd-topicals': 'maści cbd',
    'cbd-tinctures': 'nalewki cbd',
  },
  cs: {
    'cbd-oil': 'cbd olej',
    'cbd-flowers': 'cbd květy',
    'cbd-edibles': 'cbd jídlo',
    'cbd-cosmetics': 'cbd kosmetika',
    'cbd-vape': 'cbd vape',
    'cbd-capsules': 'cbd kapsle',
    'cbd-pets': 'cbd mazlíčci',
    'cbd-isolate': 'cbd izolát',
    'cbd-topicals': 'cbd masti',
    'cbd-tinctures': 'cbd tinktury',
  },
  el: {
    'cbd-oil': 'έλαιο cbd',
    'cbd-flowers': 'άνθη cbd',
    'cbd-edibles': 'εδώδιμα cbd',
    'cbd-cosmetics': 'καλλυντικά cbd',
    'cbd-vape': 'vape cbd',
    'cbd-capsules': 'κάψουλες cbd',
    'cbd-pets': 'cbd κατοικίδια',
    'cbd-isolate': 'απομονωμένο cbd',
    'cbd-topicals': 'τοπικά cbd',
    'cbd-tinctures': 'βάμματα cbd',
  },
};

// =============================================================================
// SEARCH INTENTS - High Intent Keywords
// =============================================================================

export const SEARCH_INTENTS = [
  'buy', 'best', 'cheap', 'premium', 'organic', 'online', 'delivery',
  'shop', 'store', 'price', 'quality', 'legal', 'lab-tested', 'natural',
  'pure', 'strongest', 'reviews', 'near-me', 'wholesale', 'bulk'
] as const;

export type SearchIntent = typeof SEARCH_INTENTS[number];

export const INTENT_TRANSLATIONS: Record<Locale, Record<SearchIntent, string>> = {
  es: {
    buy: 'comprar', best: 'mejor', cheap: 'barato', premium: 'premium', organic: 'orgánico',
    online: 'online', delivery: 'envío', shop: 'tienda', store: 'tienda', price: 'precio',
    quality: 'calidad', legal: 'legal', 'lab-tested': 'testado', natural: 'natural',
    pure: 'puro', strongest: 'más fuerte', reviews: 'opiniones', 'near-me': 'cerca de mi',
    wholesale: 'mayorista', bulk: 'al por mayor'
  },
  en: {
    buy: 'buy', best: 'best', cheap: 'cheap', premium: 'premium', organic: 'organic',
    online: 'online', delivery: 'delivery', shop: 'shop', store: 'store', price: 'price',
    quality: 'quality', legal: 'legal', 'lab-tested': 'lab tested', natural: 'natural',
    pure: 'pure', strongest: 'strongest', reviews: 'reviews', 'near-me': 'near me',
    wholesale: 'wholesale', bulk: 'bulk'
  },
  de: {
    buy: 'kaufen', best: 'beste', cheap: 'günstig', premium: 'premium', organic: 'bio',
    online: 'online', delivery: 'lieferung', shop: 'shop', store: 'geschäft', price: 'preis',
    quality: 'qualität', legal: 'legal', 'lab-tested': 'laborgetestet', natural: 'natürlich',
    pure: 'rein', strongest: 'stärkste', reviews: 'bewertungen', 'near-me': 'in der nähe',
    wholesale: 'großhandel', bulk: 'großmenge'
  },
  fr: {
    buy: 'acheter', best: 'meilleur', cheap: 'pas cher', premium: 'premium', organic: 'bio',
    online: 'en ligne', delivery: 'livraison', shop: 'boutique', store: 'magasin', price: 'prix',
    quality: 'qualité', legal: 'légal', 'lab-tested': 'testé en labo', natural: 'naturel',
    pure: 'pur', strongest: 'plus fort', reviews: 'avis', 'near-me': 'près de moi',
    wholesale: 'grossiste', bulk: 'en gros'
  },
  it: {
    buy: 'comprare', best: 'migliore', cheap: 'economico', premium: 'premium', organic: 'biologico',
    online: 'online', delivery: 'consegna', shop: 'negozio', store: 'negozio', price: 'prezzo',
    quality: 'qualità', legal: 'legale', 'lab-tested': 'testato', natural: 'naturale',
    pure: 'puro', strongest: 'più forte', reviews: 'recensioni', 'near-me': 'vicino a me',
    wholesale: 'ingrosso', bulk: 'all\'ingrosso'
  },
  pt: {
    buy: 'comprar', best: 'melhor', cheap: 'barato', premium: 'premium', organic: 'orgânico',
    online: 'online', delivery: 'entrega', shop: 'loja', store: 'loja', price: 'preço',
    quality: 'qualidade', legal: 'legal', 'lab-tested': 'testado', natural: 'natural',
    pure: 'puro', strongest: 'mais forte', reviews: 'avaliações', 'near-me': 'perto de mim',
    wholesale: 'atacado', bulk: 'a granel'
  },
  nl: {
    buy: 'kopen', best: 'beste', cheap: 'goedkoop', premium: 'premium', organic: 'biologisch',
    online: 'online', delivery: 'levering', shop: 'winkel', store: 'winkel', price: 'prijs',
    quality: 'kwaliteit', legal: 'legaal', 'lab-tested': 'labgetest', natural: 'natuurlijk',
    pure: 'puur', strongest: 'sterkste', reviews: 'reviews', 'near-me': 'bij mij in de buurt',
    wholesale: 'groothandel', bulk: 'bulk'
  },
  pl: {
    buy: 'kupić', best: 'najlepszy', cheap: 'tani', premium: 'premium', organic: 'organiczny',
    online: 'online', delivery: 'dostawa', shop: 'sklep', store: 'sklep', price: 'cena',
    quality: 'jakość', legal: 'legalny', 'lab-tested': 'testowany', natural: 'naturalny',
    pure: 'czysty', strongest: 'najsilniejszy', reviews: 'opinie', 'near-me': 'blisko mnie',
    wholesale: 'hurtownia', bulk: 'hurt'
  },
  cs: {
    buy: 'koupit', best: 'nejlepší', cheap: 'levný', premium: 'premium', organic: 'bio',
    online: 'online', delivery: 'doručení', shop: 'obchod', store: 'obchod', price: 'cena',
    quality: 'kvalita', legal: 'legální', 'lab-tested': 'testováno', natural: 'přírodní',
    pure: 'čistý', strongest: 'nejsilnější', reviews: 'recenze', 'near-me': 'poblíž',
    wholesale: 'velkoobchod', bulk: 'velké množství'
  },
  el: {
    buy: 'αγορά', best: 'καλύτερο', cheap: 'φθηνό', premium: 'premium', organic: 'βιολογικό',
    online: 'online', delivery: 'παράδοση', shop: 'κατάστημα', store: 'κατάστημα', price: 'τιμή',
    quality: 'ποιότητα', legal: 'νόμιμο', 'lab-tested': 'εργαστηριακά', natural: 'φυσικό',
    pure: 'καθαρό', strongest: 'ισχυρότερο', reviews: 'κριτικές', 'near-me': 'κοντά μου',
    wholesale: 'χονδρική', bulk: 'χύμα'
  },
};

// =============================================================================
// PREPOSITION "IN" TRANSLATIONS
// =============================================================================

export const PREPOSITION_IN: Record<Locale, string> = {
  es: 'en', en: 'in', de: 'in', fr: 'à', it: 'a', pt: 'em', nl: 'in',
  pl: 'w', cs: 'v', el: 'στην'
};

// =============================================================================
// PAGE TRANSLATIONS
// =============================================================================

export const TRANSLATIONS: Record<Locale, {
  hero: { title: string; subtitle: string; cta: string };
  features: { quality: string; qualityDesc: string; shipping: string; shippingDesc: string; support: string; supportDesc: string; lab: string; labDesc: string };
  products: { title: string; viewAll: string };
  categories: { title: string };
  cta: { title: string; subtitle: string; button: string };
  footer: { about: string; contact: string; legal: string; privacy: string; terms: string };
  nav: { home: string; shop: string; about: string; contact: string };
}> = {
  es: {
    hero: { title: 'CBD Premium\nde Origen Natural', subtitle: 'Productos de CBD de la más alta calidad. Orgánicos, testados en laboratorio, envío discreto.', cta: 'Explorar Colección' },
    features: { quality: 'Calidad Premium', qualityDesc: 'Solo los mejores extractos de cáñamo europeo', shipping: 'Envío Discreto', shippingDesc: 'Entrega rápida en packaging neutro', support: 'Asesoría Experta', supportDesc: 'Equipo especializado a tu disposición', lab: 'Testado en Lab', labDesc: 'Certificados de análisis disponibles' },
    products: { title: 'Nuestra Selección', viewAll: 'Ver Todo' },
    categories: { title: 'Categorías' },
    cta: { title: 'Descubre el Bienestar Natural', subtitle: 'Únete a miles de clientes satisfechos', button: 'Comprar Ahora' },
    footer: { about: 'Sobre Nosotros', contact: 'Contacto', legal: 'Aviso Legal', privacy: 'Privacidad', terms: 'Términos' },
    nav: { home: 'Inicio', shop: 'Tienda', about: 'Nosotros', contact: 'Contacto' }
  },
  en: {
    hero: { title: 'Premium CBD\nNaturally Sourced', subtitle: 'Highest quality CBD products. Organic, lab-tested, discreet shipping.', cta: 'Explore Collection' },
    features: { quality: 'Premium Quality', qualityDesc: 'Only the finest European hemp extracts', shipping: 'Discreet Shipping', shippingDesc: 'Fast delivery in neutral packaging', support: 'Expert Guidance', supportDesc: 'Specialized team at your service', lab: 'Lab Tested', labDesc: 'Certificates of analysis available' },
    products: { title: 'Our Selection', viewAll: 'View All' },
    categories: { title: 'Categories' },
    cta: { title: 'Discover Natural Wellness', subtitle: 'Join thousands of satisfied customers', button: 'Shop Now' },
    footer: { about: 'About Us', contact: 'Contact', legal: 'Legal Notice', privacy: 'Privacy', terms: 'Terms' },
    nav: { home: 'Home', shop: 'Shop', about: 'About', contact: 'Contact' }
  },
  de: {
    hero: { title: 'Premium CBD\nNatürlich Gewonnen', subtitle: 'Höchste Qualität CBD Produkte. Bio, laborgetestet, diskreter Versand.', cta: 'Kollektion Entdecken' },
    features: { quality: 'Premium Qualität', qualityDesc: 'Nur die besten europäischen Hanfextrakte', shipping: 'Diskreter Versand', shippingDesc: 'Schnelle Lieferung in neutraler Verpackung', support: 'Expertenberatung', supportDesc: 'Spezialisiertes Team zu Ihren Diensten', lab: 'Laborgetestet', labDesc: 'Analysezertifikate verfügbar' },
    products: { title: 'Unsere Auswahl', viewAll: 'Alle Anzeigen' },
    categories: { title: 'Kategorien' },
    cta: { title: 'Entdecken Sie Natürliches Wohlbefinden', subtitle: 'Schließen Sie sich tausenden zufriedenen Kunden an', button: 'Jetzt Kaufen' },
    footer: { about: 'Über Uns', contact: 'Kontakt', legal: 'Impressum', privacy: 'Datenschutz', terms: 'AGB' },
    nav: { home: 'Startseite', shop: 'Shop', about: 'Über Uns', contact: 'Kontakt' }
  },
  fr: {
    hero: { title: 'CBD Premium\nD\'Origine Naturelle', subtitle: 'Produits CBD de la plus haute qualité. Bio, testés en laboratoire, livraison discrète.', cta: 'Explorer la Collection' },
    features: { quality: 'Qualité Premium', qualityDesc: 'Uniquement les meilleurs extraits de chanvre européen', shipping: 'Livraison Discrète', shippingDesc: 'Livraison rapide en emballage neutre', support: 'Conseil Expert', supportDesc: 'Équipe spécialisée à votre service', lab: 'Testé en Labo', labDesc: 'Certificats d\'analyse disponibles' },
    products: { title: 'Notre Sélection', viewAll: 'Voir Tout' },
    categories: { title: 'Catégories' },
    cta: { title: 'Découvrez le Bien-être Naturel', subtitle: 'Rejoignez des milliers de clients satisfaits', button: 'Acheter Maintenant' },
    footer: { about: 'À Propos', contact: 'Contact', legal: 'Mentions Légales', privacy: 'Confidentialité', terms: 'CGV' },
    nav: { home: 'Accueil', shop: 'Boutique', about: 'À Propos', contact: 'Contact' }
  },
  it: {
    hero: { title: 'CBD Premium\nDi Origine Naturale', subtitle: 'Prodotti CBD della massima qualità. Biologici, testati in laboratorio, spedizione discreta.', cta: 'Esplora Collezione' },
    features: { quality: 'Qualità Premium', qualityDesc: 'Solo i migliori estratti di canapa europea', shipping: 'Spedizione Discreta', shippingDesc: 'Consegna veloce in confezione neutra', support: 'Consulenza Esperta', supportDesc: 'Team specializzato al tuo servizio', lab: 'Testato in Lab', labDesc: 'Certificati di analisi disponibili' },
    products: { title: 'La Nostra Selezione', viewAll: 'Vedi Tutto' },
    categories: { title: 'Categorie' },
    cta: { title: 'Scopri il Benessere Naturale', subtitle: 'Unisciti a migliaia di clienti soddisfatti', button: 'Acquista Ora' },
    footer: { about: 'Chi Siamo', contact: 'Contatto', legal: 'Note Legali', privacy: 'Privacy', terms: 'Termini' },
    nav: { home: 'Home', shop: 'Negozio', about: 'Chi Siamo', contact: 'Contatto' }
  },
  pt: {
    hero: { title: 'CBD Premium\nDe Origem Natural', subtitle: 'Produtos CBD da mais alta qualidade. Orgânicos, testados em laboratório, envio discreto.', cta: 'Explorar Coleção' },
    features: { quality: 'Qualidade Premium', qualityDesc: 'Apenas os melhores extratos de cânhamo europeu', shipping: 'Envio Discreto', shippingDesc: 'Entrega rápida em embalagem neutra', support: 'Orientação Especializada', supportDesc: 'Equipe especializada ao seu serviço', lab: 'Testado em Lab', labDesc: 'Certificados de análise disponíveis' },
    products: { title: 'Nossa Seleção', viewAll: 'Ver Tudo' },
    categories: { title: 'Categorias' },
    cta: { title: 'Descubra o Bem-estar Natural', subtitle: 'Junte-se a milhares de clientes satisfeitos', button: 'Comprar Agora' },
    footer: { about: 'Sobre Nós', contact: 'Contato', legal: 'Aviso Legal', privacy: 'Privacidade', terms: 'Termos' },
    nav: { home: 'Início', shop: 'Loja', about: 'Sobre', contact: 'Contato' }
  },
  nl: {
    hero: { title: 'Premium CBD\nNatuurlijk Gewonnen', subtitle: 'Hoogste kwaliteit CBD producten. Biologisch, labgetest, discrete verzending.', cta: 'Collectie Ontdekken' },
    features: { quality: 'Premium Kwaliteit', qualityDesc: 'Alleen de beste Europese hennep extracten', shipping: 'Discrete Verzending', shippingDesc: 'Snelle levering in neutrale verpakking', support: 'Expert Advies', supportDesc: 'Gespecialiseerd team tot uw dienst', lab: 'Labgetest', labDesc: 'Analysecertificaten beschikbaar' },
    products: { title: 'Onze Selectie', viewAll: 'Bekijk Alles' },
    categories: { title: 'Categorieën' },
    cta: { title: 'Ontdek Natuurlijk Welzijn', subtitle: 'Sluit u aan bij duizenden tevreden klanten', button: 'Nu Kopen' },
    footer: { about: 'Over Ons', contact: 'Contact', legal: 'Juridisch', privacy: 'Privacy', terms: 'Voorwaarden' },
    nav: { home: 'Home', shop: 'Winkel', about: 'Over Ons', contact: 'Contact' }
  },
  pl: {
    hero: { title: 'Premium CBD\nNaturalnego Pochodzenia', subtitle: 'Najwyższej jakości produkty CBD. Organiczne, testowane laboratoryjnie, dyskretna wysyłka.', cta: 'Odkryj Kolekcję' },
    features: { quality: 'Jakość Premium', qualityDesc: 'Tylko najlepsze europejskie ekstrakty konopne', shipping: 'Dyskretna Wysyłka', shippingDesc: 'Szybka dostawa w neutralnym opakowaniu', support: 'Porada Eksperta', supportDesc: 'Wyspecjalizowany zespół do Twojej dyspozycji', lab: 'Testowane w Lab', labDesc: 'Certyfikaty analizy dostępne' },
    products: { title: 'Nasz Wybór', viewAll: 'Zobacz Wszystko' },
    categories: { title: 'Kategorie' },
    cta: { title: 'Odkryj Naturalne Samopoczucie', subtitle: 'Dołącz do tysięcy zadowolonych klientów', button: 'Kup Teraz' },
    footer: { about: 'O Nas', contact: 'Kontakt', legal: 'Nota Prawna', privacy: 'Prywatność', terms: 'Regulamin' },
    nav: { home: 'Strona główna', shop: 'Sklep', about: 'O Nas', contact: 'Kontakt' }
  },
  cs: {
    hero: { title: 'Premium CBD\nPřírodního Původu', subtitle: 'Nejvyšší kvalita CBD produktů. Bio, laboratorně testované, diskrétní doručení.', cta: 'Prozkoumat Kolekci' },
    features: { quality: 'Premium Kvalita', qualityDesc: 'Pouze nejlepší evropské konopné extrakty', shipping: 'Diskrétní Doručení', shippingDesc: 'Rychlé doručení v neutrálním balení', support: 'Odborné Poradenství', supportDesc: 'Specializovaný tým k vašim službám', lab: 'Testováno v Lab', labDesc: 'Certifikáty analýzy k dispozici' },
    products: { title: 'Náš Výběr', viewAll: 'Zobrazit Vše' },
    categories: { title: 'Kategorie' },
    cta: { title: 'Objevte Přírodní Pohodu', subtitle: 'Připojte se k tisícům spokojených zákazníků', button: 'Koupit Nyní' },
    footer: { about: 'O Nás', contact: 'Kontakt', legal: 'Právní Upozornění', privacy: 'Soukromí', terms: 'Podmínky' },
    nav: { home: 'Domů', shop: 'Obchod', about: 'O Nás', contact: 'Kontakt' }
  },
  el: {
    hero: { title: 'Premium CBD\nΦυσικής Προέλευσης', subtitle: 'Υψηλότερης ποιότητας προϊόντα CBD. Βιολογικά, εργαστηριακά ελεγμένα, διακριτική αποστολή.', cta: 'Εξερεύνηση Συλλογής' },
    features: { quality: 'Premium Ποιότητα', qualityDesc: 'Μόνο τα καλύτερα ευρωπαϊκά εκχυλίσματα κάνναβης', shipping: 'Διακριτική Αποστολή', shippingDesc: 'Γρήγορη παράδοση σε ουδέτερη συσκευασία', support: 'Ειδική Καθοδήγηση', supportDesc: 'Εξειδικευμένη ομάδα στη διάθεσή σας', lab: 'Εργαστηριακά Ελεγμένο', labDesc: 'Πιστοποιητικά ανάλυσης διαθέσιμα' },
    products: { title: 'Η Επιλογή Μας', viewAll: 'Δείτε Όλα' },
    categories: { title: 'Κατηγορίες' },
    cta: { title: 'Ανακαλύψτε τη Φυσική Ευεξία', subtitle: 'Γίνετε μέλος χιλιάδων ικανοποιημένων πελατών', button: 'Αγοράστε Τώρα' },
    footer: { about: 'Σχετικά με Εμάς', contact: 'Επικοινωνία', legal: 'Νομική Σημείωση', privacy: 'Απόρρητο', terms: 'Όροι' },
    nav: { home: 'Αρχική', shop: 'Κατάστημα', about: 'Σχετικά', contact: 'Επικοινωνία' }
  },
};
