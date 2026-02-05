import Link from "next/link";
import { type Locale } from "@/lib/seo-lite";
import { CATEGORY_TRANSLATIONS, CATEGORIES } from "@/lib/seo-data";

interface LocalSEOProps {
  locale: Locale;
}

const SEO_CONTENT: Record<string, {
  title: string;
  subtitle: string;
  body: string;
  bodyExtra: string;
  shipping: { title: string; text: string };
  quality: { title: string; text: string };
  legal: { title: string; text: string };
  browseTitle: string;
}> = {
  en: {
    title: "Premium CBD Products in Europe",
    subtitle: "Your Trusted Source for Organic, Lab-Tested Cannabidiol",
    body: "CBD Boutique is a leading European retailer specializing in premium CBD products sourced from certified organic hemp farms in Switzerland, Italy, and the Netherlands. Since our founding in 2019, we have served over 50,000 customers across 27 European countries, delivering the highest quality cannabidiol products with full transparency and third-party lab testing. Our extensive product range includes full-spectrum and broad-spectrum CBD oils in concentrations from 5% to 30%, premium hand-selected CBD flowers grown in the Swiss Alps, artisan CBD edibles including gummies and chocolates, CBD-infused skincare and cosmetics, CBD products for pets, and pure CBD isolate crystals.",
    bodyExtra: "Every product at CBD Boutique undergoes a rigorous triple-testing protocol: HPLC analysis for cannabinoid quantification, GC-MS for terpene profiling, and ICP-MS for heavy metal screening. We publish full Certificates of Analysis (COA) for every batch, which customers can access via QR codes on our packaging. Our commitment to quality has earned us recognition as one of Europe's most trusted CBD brands, with an average customer rating of 4.9 out of 5 stars across verified reviews.",
    shipping: {
      title: "Fast, Discreet European Shipping",
      text: "We offer free tracked shipping on all orders over 50 EUR across the European Union, Switzerland, Norway, and the United Kingdom. Standard delivery takes 2-4 business days, with express next-day delivery available in select countries. All orders ship in plain, unmarked packaging within 24 hours of purchase for maximum privacy."
    },
    quality: {
      title: "EU-Compliant, Organic CBD",
      text: "All CBD Boutique products are fully compliant with European Union regulations, containing less than 0.2% THC. Our hemp is grown without pesticides, herbicides, or synthetic fertilizers on certified organic farms. We use supercritical CO2 extraction to produce pure, solvent-free extracts that preserve the full spectrum of beneficial cannabinoids, terpenes, and flavonoids."
    },
    legal: {
      title: "Legal CBD Across Europe",
      text: "CBD products with less than 0.2% THC are legal in most European countries. Our products are classified as food supplements under EU regulations. We recommend customers check their specific country's laws regarding CBD. CBD Boutique products are not intended to diagnose, treat, cure, or prevent any disease. Always consult a healthcare professional before starting any supplement."
    },
    browseTitle: "Browse Our CBD Categories"
  },
  es: {
    title: "Productos CBD Premium en Europa",
    subtitle: "Tu Fuente de Confianza para Cannabidiol Organico y Testado en Laboratorio",
    body: "CBD Boutique es un minorista europeo lider especializado en productos CBD premium procedentes de granjas de canamo organico certificadas en Suiza, Italia y los Paises Bajos. Desde nuestra fundacion en 2019, hemos atendido a mas de 50.000 clientes en 27 paises europeos. Nuestra amplia gama incluye aceites CBD de espectro completo y amplio en concentraciones del 5% al 30%, flores CBD premium seleccionadas a mano cultivadas en los Alpes suizos, comestibles CBD artesanales como gominolas y chocolates, cosmetica infusionada con CBD, productos CBD para mascotas y cristales de aislado de CBD puro.",
    bodyExtra: "Cada producto pasa por un riguroso protocolo de triple testado: analisis HPLC para cuantificacion de cannabinoides, GC-MS para perfilado terpenico e ICP-MS para deteccion de metales pesados. Publicamos Certificados de Analisis completos para cada lote, accesibles mediante codigos QR en nuestro embalaje.",
    shipping: {
      title: "Envio Rapido y Discreto en Europa",
      text: "Ofrecemos envio gratuito con seguimiento en pedidos superiores a 50 EUR en toda la Union Europea, Suiza, Noruega y el Reino Unido. Entrega estandar en 2-4 dias laborables. Todos los pedidos se envian en embalaje discreto en 24 horas."
    },
    quality: {
      title: "CBD Organico Conforme a la UE",
      text: "Todos los productos de CBD Boutique cumplen con las regulaciones de la Union Europea, conteniendo menos del 0.2% de THC. Nuestro canamo se cultiva sin pesticidas en granjas organicas certificadas. Usamos extraccion CO2 supercritica para producir extractos puros."
    },
    legal: {
      title: "CBD Legal en Toda Europa",
      text: "Los productos CBD con menos del 0.2% de THC son legales en la mayoria de paises europeos. Nuestros productos se clasifican como suplementos alimenticios segun las regulaciones de la UE. Recomendamos verificar las leyes especificas de cada pais."
    },
    browseTitle: "Explora Nuestras Categorias CBD"
  },
  de: {
    title: "Premium CBD Produkte in Europa",
    subtitle: "Ihre Vertrauenswurdige Quelle fur Biologisches, Laborgetestetes Cannabidiol",
    body: "CBD Boutique ist ein fuhrender europaischer Handler fur Premium-CBD-Produkte von zertifizierten Bio-Hanffarmen in der Schweiz, Italien und den Niederlanden. Seit 2019 haben wir uber 50.000 Kunden in 27 europaischen Landern bedient. Unser umfangreiches Sortiment umfasst Vollspektrum- und Breitspektrum-CBD-Ole in Konzentrationen von 5% bis 30%, handverlesene Premium-CBD-Bluten, handgefertigte CBD-Lebensmittel, CBD-Kosmetik, CBD-Produkte fur Haustiere und reine CBD-Isolatkristalle.",
    bodyExtra: "Jedes Produkt durchlauft ein strenges Dreifach-Testprotokoll: HPLC-Analyse, GC-MS-Terpenprofilierung und ICP-MS-Schwermetallscreening. Wir veroffentlichen vollstandige Analysezertifikate fur jede Charge.",
    shipping: { title: "Schneller, Diskreter Versand", text: "Kostenloser Versand ab 50 EUR in der gesamten EU, Schweiz und UK. Lieferung in 2-4 Werktagen. Diskreter Versand innerhalb von 24 Stunden." },
    quality: { title: "EU-Konformes Bio-CBD", text: "Alle Produkte enthalten weniger als 0.2% THC und entsprechen den EU-Vorschriften. Biologisch angebaut, CO2-extrahiert." },
    legal: { title: "Legales CBD in Europa", text: "CBD-Produkte mit weniger als 0.2% THC sind in den meisten europaischen Landern legal. Nahrungserganzungsmittel gemaess EU-Vorschriften." },
    browseTitle: "Unsere CBD-Kategorien Durchsuchen"
  },
  fr: {
    title: "Produits CBD Premium en Europe",
    subtitle: "Votre Source de Confiance pour le Cannabidiol Biologique et Teste en Laboratoire",
    body: "CBD Boutique est un detaillant europeen leader specialise dans les produits CBD premium provenant de fermes de chanvre bio certifiees en Suisse, Italie et aux Pays-Bas. Depuis 2019, nous avons servi plus de 50 000 clients dans 27 pays europeens. Notre gamme comprend des huiles CBD a spectre complet et large, des fleurs CBD premium, des comestibles artisanaux, des cosmetiques au CBD, des produits CBD pour animaux et des cristaux d'isolat CBD pur.",
    bodyExtra: "Chaque produit passe par un protocole de triple test rigoureux. Nous publions les certificats d'analyse complets pour chaque lot, accessibles via les codes QR sur nos emballages.",
    shipping: { title: "Livraison Rapide et Discrete", text: "Livraison gratuite des 50 EUR dans toute l'UE, Suisse et UK. Delai de 2-4 jours ouvrables. Emballage discret." },
    quality: { title: "CBD Bio Conforme UE", text: "Moins de 0.2% THC, conforme aux reglementations UE. Culture biologique, extraction CO2." },
    legal: { title: "CBD Legal en Europe", text: "Les produits CBD avec moins de 0.2% THC sont legaux dans la plupart des pays europeens. Complements alimentaires selon les normes UE." },
    browseTitle: "Parcourir Nos Categories CBD"
  },
};

export function LocalSEO({ locale }: LocalSEOProps) {
  const content = SEO_CONTENT[locale as string] || SEO_CONTENT.en;
  const catTranslations = CATEGORY_TRANSLATIONS[locale as string] || CATEGORY_TRANSLATIONS.en;

  return (
    <section className="py-20 lg:py-28 border-t border-border/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main SEO content */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-2xl lg:text-3xl font-serif font-light tracking-tight mb-3 text-center">
            {content.title}
          </h2>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground text-center mb-10">
            {content.subtitle}
          </p>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground font-light leading-relaxed">{content.body}</p>
            <p className="text-sm text-muted-foreground/70 font-light leading-relaxed">{content.bodyExtra}</p>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid md:grid-cols-3 gap-10 lg:gap-16 mb-20">
          <div>
            <h3 className="text-xs uppercase tracking-[0.15em] font-medium mb-3">{content.shipping.title}</h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">{content.shipping.text}</p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.15em] font-medium mb-3">{content.quality.title}</h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">{content.quality.text}</p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.15em] font-medium mb-3">{content.legal.title}</h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">{content.legal.text}</p>
          </div>
        </div>

        {/* Category links for internal linking */}
        <div className="text-center">
          <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6 font-medium">{content.browseTitle}</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/${locale === 'en' ? '' : locale + '/'}${cat}`}
                className="text-[11px] uppercase tracking-wider px-4 py-2 border border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                {catTranslations[cat]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
