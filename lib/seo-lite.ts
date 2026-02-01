// ULTRA-LIGHTWEIGHT SEO SYSTEM
// No heavy data loading, no memory issues, always works

export const LOCALES = ['es', 'en', 'de', 'fr', 'it', 'pt', 'nl', 'pl', 'sv', 'da', 'no', 'fi', 'cs', 'ro', 'hu', 'el', 'bg', 'sk', 'hr', 'sl', 'et', 'lv', 'lt', 'mt', 'ga', 'tr', 'ru', 'uk', 'ja', 'ko', 'zh', 'ar'] as const;
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

// Complete translations for all locales
export const T: Record<Locale, Trans> = {
  es: { products: 'Productos Ortopédicos', in: 'en', shipping: 'Envío Gratis', warranty: 'Garantía 2 Años', support: 'Soporte 24/7', home: 'Inicio', contact: 'Contacto', viewAll: 'Ver Todo', shop: 'Tienda', description: 'Descubre nuestra selección premium de productos ortopédicos. Ofrecemos entrega rápida, soporte experto y productos de calidad.', qualityDesc: 'Productos con estrictos estándares de calidad', deliveryDesc: 'Entrega rápida a domicilio', supportDesc: 'Equipo de expertos disponible' },
  en: { products: 'Orthopedic Products', in: 'in', shipping: 'Free Shipping', warranty: '2 Year Warranty', support: '24/7 Support', home: 'Home', contact: 'Contact', viewAll: 'View All', shop: 'Shop', description: 'Discover our premium orthopedic products. Fast delivery, expert support, and quality products.', qualityDesc: 'Products meet strict quality standards', deliveryDesc: 'Fast delivery to your door', supportDesc: 'Expert team available to help' },
  de: { products: 'Orthopädische Produkte', in: 'in', shipping: 'Kostenloser Versand', warranty: '2 Jahre Garantie', support: '24/7 Support', home: 'Startseite', contact: 'Kontakt', viewAll: 'Alle Anzeigen', shop: 'Shop', description: 'Entdecken Sie unsere Premium-Auswahl an orthopädischen Produkten.', qualityDesc: 'Produkte erfüllen strenge Qualitätsstandards', deliveryDesc: 'Schnelle Lieferung', supportDesc: 'Expertenteam verfügbar' },
  fr: { products: 'Produits Orthopédiques', in: 'à', shipping: 'Livraison Gratuite', warranty: 'Garantie 2 Ans', support: 'Support 24/7', home: 'Accueil', contact: 'Contact', viewAll: 'Voir Tout', shop: 'Boutique', description: 'Découvrez notre sélection premium de produits orthopédiques.', qualityDesc: 'Produits aux normes de qualité strictes', deliveryDesc: 'Livraison rapide', supportDesc: 'Équipe d\'experts disponible' },
  it: { products: 'Prodotti Ortopedici', in: 'a', shipping: 'Spedizione Gratuita', warranty: 'Garanzia 2 Anni', support: 'Supporto 24/7', home: 'Home', contact: 'Contatto', viewAll: 'Vedi Tutto', shop: 'Negozio', description: 'Scopri la nostra selezione premium di prodotti ortopedici.', qualityDesc: 'Prodotti con standard di qualità rigorosi', deliveryDesc: 'Consegna veloce', supportDesc: 'Team di esperti disponibile' },
  pt: { products: 'Produtos Ortopédicos', in: 'em', shipping: 'Frete Grátis', warranty: 'Garantia 2 Anos', support: 'Suporte 24/7', home: 'Início', contact: 'Contato', viewAll: 'Ver Tudo', shop: 'Loja', description: 'Descubra nossa seleção premium de produtos ortopédicos.', qualityDesc: 'Produtos com padrões de qualidade rigorosos', deliveryDesc: 'Entrega rápida', supportDesc: 'Equipe de especialistas disponível' },
  nl: { products: 'Orthopedische Producten', in: 'in', shipping: 'Gratis Verzending', warranty: '2 Jaar Garantie', support: '24/7 Ondersteuning', home: 'Home', contact: 'Contact', viewAll: 'Bekijk Alles', shop: 'Winkel', description: 'Ontdek onze premium selectie orthopedische producten.', qualityDesc: 'Producten voldoen aan strenge kwaliteitsnormen', deliveryDesc: 'Snelle levering', supportDesc: 'Deskundig team beschikbaar' },
  pl: { products: 'Produkty Ortopedyczne', in: 'w', shipping: 'Darmowa Wysyłka', warranty: '2 Lata Gwarancji', support: 'Wsparcie 24/7', home: 'Strona główna', contact: 'Kontakt', viewAll: 'Zobacz Wszystko', shop: 'Sklep', description: 'Odkryj naszą premium selekcję produktów ortopedycznych.', qualityDesc: 'Produkty spełniają surowe standardy jakości', deliveryDesc: 'Szybka dostawa', supportDesc: 'Zespół ekspertów dostępny' },
  sv: { products: 'Ortopediska Produkter', in: 'i', shipping: 'Fri Frakt', warranty: '2 Års Garanti', support: 'Support 24/7', home: 'Hem', contact: 'Kontakt', viewAll: 'Visa Alla', shop: 'Butik', description: 'Upptäck vårt premiumutbud av ortopediska produkter för förbättrad rörlighet.', qualityDesc: 'Produkter uppfyller strikta kvalitetsstandarder', deliveryDesc: 'Snabb leverans till din dörr', supportDesc: 'Expertteam tillgängligt' },
  da: { products: 'Ortopædiske Produkter', in: 'i', shipping: 'Gratis Fragt', warranty: '2 Års Garanti', support: 'Support 24/7', home: 'Hjem', contact: 'Kontakt', viewAll: 'Se Alle', shop: 'Butik', description: 'Opdag vores premium udvalg af ortopædiske produkter.', qualityDesc: 'Produkter opfylder strenge kvalitetsstandarder', deliveryDesc: 'Hurtig levering', supportDesc: 'Ekspertteam tilgængeligt' },
  no: { products: 'Ortopediske Produkter', in: 'i', shipping: 'Gratis Frakt', warranty: '2 Års Garanti', support: 'Support 24/7', home: 'Hjem', contact: 'Kontakt', viewAll: 'Se Alle', shop: 'Butikk', description: 'Oppdag vårt premium utvalg av ortopediske produkter.', qualityDesc: 'Produkter oppfyller strenge kvalitetsstandarder', deliveryDesc: 'Rask levering', supportDesc: 'Ekspertteam tilgjengelig' },
  fi: { products: 'Ortopediset Tuotteet', in: 'kaupungissa', shipping: 'Ilmainen Toimitus', warranty: '2 Vuoden Takuu', support: 'Tuki 24/7', home: 'Etusivu', contact: 'Yhteystiedot', viewAll: 'Näytä Kaikki', shop: 'Kauppa', description: 'Tutustu premium-valikoimaamme ortopedisia tuotteita.', qualityDesc: 'Tuotteet täyttävät tiukat laatuvaatimukset', deliveryDesc: 'Nopea toimitus', supportDesc: 'Asiantuntijatiimi käytettävissä' },
  cs: { products: 'Ortopedické Produkty', in: 'v', shipping: 'Doprava Zdarma', warranty: '2 Roky Záruka', support: 'Podpora 24/7', home: 'Domů', contact: 'Kontakt', viewAll: 'Zobrazit Vše', shop: 'Obchod', description: 'Objevte náš prémiový výběr ortopedických produktů.', qualityDesc: 'Produkty splňují přísné standardy kvality', deliveryDesc: 'Rychlé doručení', supportDesc: 'Tým odborníků k dispozici' },
  ro: { products: 'Produse Ortopedice', in: 'în', shipping: 'Livrare Gratuită', warranty: 'Garanție 2 Ani', support: 'Suport 24/7', home: 'Acasă', contact: 'Contact', viewAll: 'Vezi Tot', shop: 'Magazin', description: 'Descoperă selecția noastră premium de produse ortopedice.', qualityDesc: 'Produse cu standarde stricte de calitate', deliveryDesc: 'Livrare rapidă', supportDesc: 'Echipă de experți disponibilă' },
  hu: { products: 'Ortopédiai Termékek', in: 'ban', shipping: 'Ingyenes Szállítás', warranty: '2 Év Garancia', support: 'Támogatás 24/7', home: 'Főoldal', contact: 'Kapcsolat', viewAll: 'Összes Megtekintése', shop: 'Bolt', description: 'Fedezze fel prémium ortopédiai termékkínálatunkat.', qualityDesc: 'Termékek szigorú minőségi előírásoknak megfelelnek', deliveryDesc: 'Gyors szállítás', supportDesc: 'Szakértői csapat elérhető' },
  el: { products: 'Ορθοπεδικά Προϊόντα', in: 'σε', shipping: 'Δωρεάν Αποστολή', warranty: 'Εγγύηση 2 Ετών', support: 'Υποστήριξη 24/7', home: 'Αρχική', contact: 'Επικοινωνία', viewAll: 'Δείτε Όλα', shop: 'Κατάστημα', description: 'Ανακαλύψτε την premium επιλογή μας ορθοπεδικών προϊόντων.', qualityDesc: 'Προϊόντα με αυστηρά πρότυπα ποιότητας', deliveryDesc: 'Γρήγορη παράδοση', supportDesc: 'Ομάδα ειδικών διαθέσιμη' },
  bg: { products: 'Ортопедични Продукти', in: 'в', shipping: 'Безплатна Доставка', warranty: '2 Години Гаранция', support: 'Поддръжка 24/7', home: 'Начало', contact: 'Контакт', viewAll: 'Виж Всички', shop: 'Магазин', description: 'Открийте нашата премиум селекция от ортопедични продукти.', qualityDesc: 'Продукти със строги стандарти за качество', deliveryDesc: 'Бърза доставка', supportDesc: 'Екип от експерти на разположение' },
  sk: { products: 'Ortopedické Produkty', in: 'v', shipping: 'Doprava Zadarmo', warranty: '2 Roky Záruka', support: 'Podpora 24/7', home: 'Domov', contact: 'Kontakt', viewAll: 'Zobraziť Všetko', shop: 'Obchod', description: 'Objavte náš prémiový výber ortopedických produktov.', qualityDesc: 'Produkty spĺňajú prísne normy kvality', deliveryDesc: 'Rýchle doručenie', supportDesc: 'Tím odborníkov k dispozícii' },
  hr: { products: 'Ortopedski Proizvodi', in: 'u', shipping: 'Besplatna Dostava', warranty: '2 Godine Jamstva', support: 'Podrška 24/7', home: 'Početna', contact: 'Kontakt', viewAll: 'Pogledaj Sve', shop: 'Trgovina', description: 'Otkrijte našu premium selekciju ortopedskih proizvoda.', qualityDesc: 'Proizvodi zadovoljavaju stroge standarde kvalitete', deliveryDesc: 'Brza dostava', supportDesc: 'Tim stručnjaka dostupan' },
  sl: { products: 'Ortopedski Izdelki', in: 'v', shipping: 'Brezplačna Dostava', warranty: '2 Leti Garancije', support: 'Podpora 24/7', home: 'Domov', contact: 'Kontakt', viewAll: 'Poglej Vse', shop: 'Trgovina', description: 'Odkrijte našo premium izbiro ortopedskih izdelkov.', qualityDesc: 'Izdelki izpolnjujejo stroge standarde kakovosti', deliveryDesc: 'Hitra dostava', supportDesc: 'Strokovni tim na voljo' },
  et: { products: 'Ortopeediline Tooted', in: 'linnas', shipping: 'Tasuta Saatmine', warranty: '2 Aasta Garantii', support: 'Tugi 24/7', home: 'Avaleht', contact: 'Kontakt', viewAll: 'Vaata Kõiki', shop: 'Pood', description: 'Avasta meie premium valik ortopeedilist tooteid.', qualityDesc: 'Tooted vastavad rangetele kvaliteedistandarditele', deliveryDesc: 'Kiire kohaletoimetamine', supportDesc: 'Ekspertide meeskond saadaval' },
  lv: { products: 'Ortopēdiskie Produkti', in: 'pilsētā', shipping: 'Bezmaksas Piegāde', warranty: '2 Gadu Garantija', support: 'Atbalsts 24/7', home: 'Sākums', contact: 'Kontakti', viewAll: 'Skatīt Visus', shop: 'Veikals', description: 'Atklājiet mūsu premium ortopēdisko produktu izvēli.', qualityDesc: 'Produkti atbilst stingriem kvalitātes standartiem', deliveryDesc: 'Ātra piegāde', supportDesc: 'Ekspertu komanda pieejama' },
  lt: { products: 'Ortopediniai Produktai', in: 'mieste', shipping: 'Nemokamas Pristatymas', warranty: '2 Metų Garantija', support: 'Palaikymas 24/7', home: 'Pradžia', contact: 'Kontaktai', viewAll: 'Žiūrėti Visus', shop: 'Parduotuvė', description: 'Atraskite mūsų premium ortopedinių produktų pasirinkimą.', qualityDesc: 'Produktai atitinka griežtus kokybės standartus', deliveryDesc: 'Greitas pristatymas', supportDesc: 'Ekspertų komanda pasiekiama' },
  mt: { products: 'Prodotti Ortopediċi', in: 'f\'', shipping: 'Kunsinna B\'xejn', warranty: 'Garanzija 2 Snin', support: 'Appoġġ 24/7', home: 'Paġna Ewlenija', contact: 'Kuntatt', viewAll: 'Ara Kollox', shop: 'Ħanut', description: 'Skopri l-għażla premium tagħna ta\' prodotti ortopediċi.', qualityDesc: 'Prodotti b\'standards stretti ta\' kwalità', deliveryDesc: 'Kunsinna mgħaġġla', supportDesc: 'Tim ta\' esperti disponibbli' },
  ga: { products: 'Táirgí Ortaipéideacha', in: 'i', shipping: 'Seachadta Saor in Aisce', warranty: 'Baránta 2 Bhliain', support: 'Tacaíocht 24/7', home: 'Baile', contact: 'Teagmháil', viewAll: 'Féach ar Gach', shop: 'Siopa', description: 'Faigh amach faoinár rogha préimhe de tháirgí ortaipéideacha.', qualityDesc: 'Táirgí le caighdeáin docht cáilíochta', deliveryDesc: 'Seachadadh tapa', supportDesc: 'Foireann saineolaithe ar fáil' },
  tr: { products: 'Ortopedik Ürünler', in: 'de', shipping: 'Ücretsiz Kargo', warranty: '2 Yıl Garanti', support: 'Destek 24/7', home: 'Ana Sayfa', contact: 'İletişim', viewAll: 'Tümünü Gör', shop: 'Mağaza', description: 'Premium ortopedik ürün seçkimizi keşfedin.', qualityDesc: 'Ürünler sıkı kalite standartlarını karşılar', deliveryDesc: 'Hızlı teslimat', supportDesc: 'Uzman ekip mevcut' },
  ru: { products: 'Ортопедические Товары', in: 'в', shipping: 'Бесплатная Доставка', warranty: 'Гарантия 2 Года', support: 'Поддержка 24/7', home: 'Главная', contact: 'Контакты', viewAll: 'Смотреть Все', shop: 'Магазин', description: 'Откройте для себя наш премиальный выбор ортопедических товаров.', qualityDesc: 'Товары соответствуют строгим стандартам качества', deliveryDesc: 'Быстрая доставка', supportDesc: 'Команда экспертов доступна' },
  uk: { products: 'Ортопедичні Товари', in: 'у', shipping: 'Безкоштовна Доставка', warranty: 'Гарантія 2 Роки', support: 'Підтримка 24/7', home: 'Головна', contact: 'Контакти', viewAll: 'Дивитись Все', shop: 'Магазин', description: 'Відкрийте для себе наш преміальний вибір ортопедичних товарів.', qualityDesc: 'Товари відповідають суворим стандартам якості', deliveryDesc: 'Швидка доставка', supportDesc: 'Команда експертів доступна' },
  ja: { products: '整形外科用品', in: 'の', shipping: '送料無料', warranty: '2年保証', support: '24時間サポート', home: 'ホーム', contact: 'お問い合わせ', viewAll: 'すべて見る', shop: 'ショップ', description: 'プレミアム整形外科用品のセレクションをご覧ください。', qualityDesc: '厳格な品質基準を満たす製品', deliveryDesc: '迅速な配送', supportDesc: '専門家チームが対応' },
  ko: { products: '정형외과 제품', in: '에서', shipping: '무료 배송', warranty: '2년 보증', support: '24시간 지원', home: '홈', contact: '연락처', viewAll: '모두 보기', shop: '상점', description: '프리미엄 정형외과 제품 셀렉션을 살펴보세요.', qualityDesc: '엄격한 품질 기준을 충족하는 제품', deliveryDesc: '빠른 배송', supportDesc: '전문가 팀 이용 가능' },
  zh: { products: '骨科产品', in: '在', shipping: '免费送货', warranty: '2年保修', support: '24/7支持', home: '首页', contact: '联系我们', viewAll: '查看全部', shop: '商店', description: '探索我们的优质骨科产品系列。', qualityDesc: '产品符合严格的质量标准', deliveryDesc: '快速配送', supportDesc: '专家团队随时为您服务' },
  ar: { products: 'منتجات العظام', in: 'في', shipping: 'شحن مجاني', warranty: 'ضمان سنتين', support: 'دعم 24/7', home: 'الرئيسية', contact: 'اتصل بنا', viewAll: 'عرض الكل', shop: 'متجر', description: 'اكتشف مجموعتنا المميزة من منتجات العظام.', qualityDesc: 'منتجات تلبي معايير الجودة الصارمة', deliveryDesc: 'توصيل سريع', supportDesc: 'فريق خبراء متاح' },
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
