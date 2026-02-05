import { Leaf, FlaskConical, Truck, Award } from "lucide-react";
import { TRANSLATIONS, type Locale } from "@/lib/seo-data";

interface FeaturesProps {
  locale: Locale;
}

const FEATURE_DESCRIPTIONS: Record<string, { quality: string; lab: string; shipping: string; support: string }> = {
  en: {
    quality: "Every product in our collection is sourced from certified organic European hemp farms, ensuring the purest CBD with no pesticides, heavy metals, or synthetic additives.",
    lab: "We partner with accredited independent laboratories to test every batch for cannabinoid profile, terpene content, and contaminant screening. Full certificates of analysis are available for every product.",
    shipping: "Your order ships in plain, unmarked packaging within 24 hours. We offer tracked delivery across Europe with free shipping on orders over 50 EUR.",
    support: "Our trained CBD specialists are available to help you find the right product, dosage, and routine. Reach us via live chat, email, or phone for personalized guidance.",
  },
  es: {
    quality: "Cada producto de nuestra coleccion proviene de granjas de canamo organico europeas certificadas, asegurando el CBD mas puro sin pesticidas, metales pesados ni aditivos sinteticos.",
    lab: "Colaboramos con laboratorios independientes acreditados para analizar cada lote. Certificados de analisis completos disponibles para cada producto.",
    shipping: "Tu pedido se envia en embalaje discreto en 24 horas. Ofrecemos entrega con seguimiento en toda Europa con envio gratuito en pedidos superiores a 50 EUR.",
    support: "Nuestros especialistas en CBD estan disponibles para ayudarte a encontrar el producto, la dosis y la rutina adecuados. Contactanos por chat, email o telefono.",
  },
  de: {
    quality: "Jedes Produkt stammt von zertifizierten Bio-Hanffarmen in Europa und garantiert reinstes CBD ohne Pestizide, Schwermetalle oder synthetische Zusatzstoffe.",
    lab: "Wir arbeiten mit akkreditierten unabhangigen Laboren zusammen, um jede Charge zu testen. Vollstandige Analysezertifikate fur jedes Produkt verfugbar.",
    shipping: "Ihre Bestellung wird innerhalb von 24 Stunden in diskreter Verpackung versendet. Wir bieten Sendungsverfolgung in ganz Europa mit kostenlosem Versand ab 50 EUR.",
    support: "Unsere CBD-Spezialisten helfen Ihnen das richtige Produkt, die richtige Dosierung und Routine zu finden. Erreichen Sie uns per Chat, E-Mail oder Telefon.",
  },
  fr: {
    quality: "Chaque produit provient de fermes de chanvre bio certifiees en Europe, garantissant le CBD le plus pur sans pesticides, metaux lourds ni additifs synthetiques.",
    lab: "Nous collaborons avec des laboratoires independants accredites pour tester chaque lot. Certificats d'analyse complets disponibles pour chaque produit.",
    shipping: "Votre commande est expediee en emballage discret sous 24 heures. Livraison suivie dans toute l'Europe avec livraison gratuite a partir de 50 EUR.",
    support: "Nos specialistes CBD sont disponibles pour vous aider a trouver le bon produit, le bon dosage et la bonne routine. Contactez-nous par chat, email ou telephone.",
  },
};

export function Features({ locale }: FeaturesProps) {
  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;
  const descriptions = FEATURE_DESCRIPTIONS[locale] || FEATURE_DESCRIPTIONS.en;

  const features = [
    { icon: Leaf, title: t.features.quality, desc: descriptions.quality },
    { icon: FlaskConical, title: t.features.lab, desc: descriptions.lab },
    { icon: Truck, title: t.features.shipping, desc: descriptions.shipping },
    { icon: Award, title: t.features.support, desc: descriptions.support },
  ];

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-4 block">
            {locale === 'es' ? 'Por que elegirnos' : locale === 'de' ? 'Warum uns wahlen' : locale === 'fr' ? 'Pourquoi nous choisir' : 'Why choose us'}
          </span>
          <h2 className="text-3xl lg:text-4xl font-serif font-light tracking-tight text-balance">
            {locale === 'es' ? 'Compromiso con la excelencia en cada producto' :
             locale === 'de' ? 'Engagement fur Exzellenz in jedem Produkt' :
             locale === 'fr' ? 'Engagement pour l\'excellence dans chaque produit' :
             'Committed to excellence in every product'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {features.map((feature, index) => (
            <article key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 mb-6 border border-border bg-secondary group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                <feature.icon className="h-5 w-5 text-foreground/70 group-hover:text-primary-foreground transition-colors duration-300" strokeWidth={1.5} />
              </div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-medium mb-4">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">{feature.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
