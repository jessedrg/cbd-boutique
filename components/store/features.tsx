"use client";

import { useState } from "react";
import { Leaf, FlaskConical, Truck, Award, ChevronRight } from "lucide-react";
import { TRANSLATIONS, type Locale } from "@/lib/seo-data";
import { cn } from "@/lib/utils";

interface FeaturesProps {
  locale: Locale;
}

const FEATURE_DATA: Record<string, {
  eyebrow: string;
  title: string;
  subtitle: string;
  features: { title: string; shortDesc: string; longDesc: string; detail: string }[];
  processEyebrow: string;
  processTitle: string;
  processSubtitle: string;
  steps: { num: string; title: string; desc: string }[];
}> = {
  en: {
    eyebrow: "Why Choose Us",
    title: "Committed to excellence in every product",
    subtitle: "We've built CBD Boutique on four uncompromising pillars that set us apart in the European CBD market. Click each feature to learn more about our standards.",
    features: [
      { 
        title: "Organic European Hemp",
        shortDesc: "EU-certified organic farms, zero pesticides",
        longDesc: "Every product in our collection is sourced from certified organic European hemp farms in Switzerland, Italy, and the Netherlands. We maintain direct relationships with our growers, visiting each farm annually to verify organic practices and sustainable cultivation methods.",
        detail: "Our hemp is grown in mineral-rich Alpine soil at elevations above 600 meters, where clean air and natural UV exposure produce plants with exceptionally rich cannabinoid and terpene profiles. No pesticides, herbicides, heavy metals, or synthetic fertilizers are used at any stage of cultivation."
      },
      { 
        title: "Independent Lab Testing",
        shortDesc: "Triple-tested by accredited laboratories",
        longDesc: "We partner with three separate accredited independent laboratories across Europe to test every batch for cannabinoid profile, terpene content, heavy metals, pesticides, residual solvents, and microbial contamination. Full certificates of analysis (COA) are published for every product.",
        detail: "Our testing protocol exceeds industry standards: each batch undergoes HPLC analysis for cannabinoid quantification, GC-MS for terpene profiling, and ICP-MS for heavy metal screening. Results are published within 48 hours of testing and linked to each product's QR code."
      },
      { 
        title: "24-Hour Discreet Shipping",
        shortDesc: "Free tracked delivery across Europe",
        longDesc: "Your order ships in plain, unmarked packaging within 24 hours of purchase. We offer tracked delivery across 27 European countries with free shipping on orders over 50 EUR. Express next-day delivery is available in Switzerland, Germany, France, and the Benelux region.",
        detail: "All shipments include temperature-controlled packaging to protect product integrity. We use carbon-neutral shipping partners and offset 200% of our logistics carbon footprint through certified reforestation programs in the Swiss Alps."
      },
      { 
        title: "Expert CBD Guidance",
        shortDesc: "Certified specialists, free consultations",
        longDesc: "Our in-house team of CBD specialists holds certifications from the European Industrial Hemp Association. They provide free, personalized consultations via live chat, video call, email, or phone to help you find the right product, dosage, and routine for your specific wellness goals.",
        detail: "Each specialist completes 120+ hours of training covering cannabinoid science, the endocannabinoid system, product formulation, and wellness coaching. We also maintain a comprehensive knowledge base and dosing guide available in 10 languages."
      },
    ],
    processEyebrow: "Our Process",
    processTitle: "From seed to your doorstep",
    processSubtitle: "A meticulous journey that ensures every drop and every flower meets the highest European standards for purity, potency, and safety.",
    steps: [
      { num: "01", title: "Organic Cultivation", desc: "Our partner farms cultivate heritage hemp varieties in mineral-rich Alpine soil. Each plant is hand-tended, harvested at peak maturity, and slow-dried to preserve the full spectrum of cannabinoids, terpenes, and flavonoids." },
      { num: "02", title: "CO2 Extraction", desc: "State-of-the-art supercritical CO2 extraction facilities process the dried hemp at precisely controlled temperatures and pressures. This pharmaceutical-grade method yields pure, solvent-free extracts while preserving delicate plant compounds." },
      { num: "03", title: "Triple Lab Testing", desc: "Every extraction batch is sent to three independent laboratories for comprehensive analysis: cannabinoid potency via HPLC, terpene profiling via GC-MS, and contaminant screening via ICP-MS. Only batches meeting our strict criteria proceed to formulation." },
      { num: "04", title: "Expert Formulation", desc: "Our team of pharmacists and formulation scientists create products optimized for bioavailability. We use organic MCT oil carriers, natural terpene blends, and precise cannabinoid ratios to deliver consistent, effective results you can trust." },
    ],
  },
  es: {
    eyebrow: "Por Que Elegirnos",
    title: "Compromiso con la excelencia en cada producto",
    subtitle: "Hemos construido CBD Boutique sobre cuatro pilares inquebrantables que nos distinguen en el mercado europeo de CBD.",
    features: [
      {
        title: "Cáñamo Orgánico Europeo",
        shortDesc: "Granjas orgánicas certificadas por la UE, cero pesticidas",
        longDesc: "Cada producto proviene de granjas de cáñamo orgánico certificadas en Suiza, Italia y los Países Bajos. Mantenemos relaciones directas con nuestros agricultores, visitando cada granja anualmente.",
        detail: "Nuestro cáñamo crece en suelo alpino rico en minerales a elevaciones superiores a 600 metros, donde el aire limpio y la exposición natural a los UV producen plantas con perfiles excepcionalmente ricos en cannabinoides y terpenos."
      },
      {
        title: "Pruebas Independientes",
        shortDesc: "Triple testado por laboratorios acreditados",
        longDesc: "Colaboramos con tres laboratorios independientes acreditados para analizar cada lote. Certificados de analisis completos disponibles para cada producto.",
        detail: "Nuestro protocolo de pruebas supera los estandares de la industria: analisis HPLC para cuantificacion de cannabinoides, GC-MS para perfiles terpenicos e ICP-MS para metales pesados."
      },
      {
        title: "Envio Discreto en 24h",
        shortDesc: "Entrega gratuita con seguimiento en Europa",
        longDesc: "Tu pedido se envia en embalaje discreto en 24 horas. Ofrecemos entrega con seguimiento en 27 paises europeos con envio gratuito en pedidos superiores a 50 EUR.",
        detail: "Todos los envios incluyen embalaje con control de temperatura. Usamos transportistas con neutralidad de carbono y compensamos el 200% de nuestra huella de carbono logistica."
      },
      {
        title: "Guia Experta en CBD",
        shortDesc: "Especialistas certificados, consultas gratuitas",
        longDesc: "Nuestros especialistas en CBD tienen certificaciones de la Asociación Europea del Cáñamo Industrial. Ofrecen consultas gratuitas y personalizadas.",
        detail: "Cada especialista completa mas de 120 horas de formacion cubriendo ciencia de cannabinoides, el sistema endocannabinoide y coaching de bienestar."
      },
    ],
    processEyebrow: "Nuestro Proceso",
    processTitle: "De la semilla a tu puerta",
    processSubtitle: "Un viaje meticuloso que asegura que cada gota y cada flor cumple los mas altos estandares europeos de pureza, potencia y seguridad.",
    steps: [
      { num: "01", title: "Cultivo Orgánico", desc: "Nuestras granjas asociadas cultivan variedades de cáñamo en suelo alpino rico en minerales. Cada planta es cuidada a mano, cosechada en su punto óptimo y secada lentamente." },
      { num: "02", title: "Extracción CO2", desc: "Instalaciones de extracción CO2 supercrítica de última generación procesan el cáñamo a temperaturas y presiones controladas con precisión. Este método de grado farmacéutico produce extractos puros." },
      { num: "03", title: "Triple Analisis", desc: "Cada lote de extraccion se envia a tres laboratorios independientes para analisis exhaustivo: potencia de cannabinoides, perfil terpenico y deteccion de contaminantes." },
      { num: "04", title: "Formulacion Experta", desc: "Nuestro equipo de farmaceuticos crea productos optimizados para la biodisponibilidad, usando aceite MCT organico y proporciones precisas de cannabinoides." },
    ],
  },
  de: {
    eyebrow: "Warum Uns Wahlen",
    title: "Engagement fur Exzellenz in jedem Produkt",
    subtitle: "Wir haben CBD Boutique auf vier kompromisslosen Saulen aufgebaut, die uns im europaischen CBD-Markt auszeichnen.",
    features: [
      {
        title: "Europaischer Bio-Hanf",
        shortDesc: "EU-zertifizierte Bio-Farmen, keine Pestizide",
        longDesc: "Jedes Produkt stammt von zertifizierten Bio-Hanffarmen in der Schweiz, Italien und den Niederlanden. Wir pflegen direkte Beziehungen zu unseren Anbauern.",
        detail: "Unser Hanf wachst in mineralreichem Alpenboden auf uber 600 Metern Hohe, wo saubere Luft und naturliche UV-Exposition Pflanzen mit aussergewohnlich reichen Profilen hervorbringen."
      },
      {
        title: "Unabhangige Labortests",
        shortDesc: "Dreifach getestet von akkreditierten Laboren",
        longDesc: "Wir arbeiten mit drei akkreditierten unabhangigen Laboren zusammen, um jede Charge umfassend zu testen.",
        detail: "Unser Testprotokoll ubertrifft Branchenstandards: HPLC-Analyse fur Cannabinoid-Quantifizierung, GC-MS fur Terpenprofil und ICP-MS fur Schwermetallscreening."
      },
      {
        title: "24h Diskreter Versand",
        shortDesc: "Kostenlose Sendungsverfolgung in Europa",
        longDesc: "Ihre Bestellung wird innerhalb von 24 Stunden in diskreter Verpackung versendet. Wir bieten Sendungsverfolgung in 27 europaischen Landern.",
        detail: "Alle Sendungen enthalten temperaturkontrollierte Verpackung. Wir nutzen klimaneutrale Versandpartner."
      },
      {
        title: "CBD-Expertenberatung",
        shortDesc: "Zertifizierte Spezialisten, kostenlose Beratung",
        longDesc: "Unsere CBD-Spezialisten haben Zertifizierungen der Europaischen Industriehanf-Vereinigung.",
        detail: "Jeder Spezialist absolviert uber 120 Stunden Ausbildung in Cannabinoidwissenschaft und Wellness-Coaching."
      },
    ],
    processEyebrow: "Unser Prozess",
    processTitle: "Vom Samen bis zu Ihrer Tur",
    processSubtitle: "Eine sorgfaltige Reise, die sicherstellt, dass jeder Tropfen und jede Blute den hochsten europaischen Standards entspricht.",
    steps: [
      { num: "01", title: "Bio-Anbau", desc: "Unsere Partnerfarmen bauen Heritage-Hanfsorten in mineralreichem Alpenboden an. Jede Pflanze wird von Hand gepflegt und langsam getrocknet." },
      { num: "02", title: "CO2-Extraktion", desc: "Modernste uberkritische CO2-Extraktionsanlagen verarbeiten den getrockneten Hanf bei prazise kontrollierten Temperaturen." },
      { num: "03", title: "Dreifache Prufung", desc: "Jede Charge wird an drei unabhangige Labore zur umfassenden Analyse gesendet." },
      { num: "04", title: "Experten-Formulierung", desc: "Unser Team aus Apothekern und Formulierungswissenschaftlern entwickelt Produkte fur optimale Bioverfugbarkeit." },
    ],
  },
  fr: {
    eyebrow: "Pourquoi Nous Choisir",
    title: "Engagement pour l'excellence dans chaque produit",
    subtitle: "Nous avons bati CBD Boutique sur quatre piliers intransigeants qui nous distinguent sur le marche europeen du CBD.",
    features: [
      {
        title: "Chanvre Bio Europeen",
        shortDesc: "Fermes bio certifiees UE, zero pesticide",
        longDesc: "Chaque produit provient de fermes de chanvre bio certifiees en Suisse, Italie et aux Pays-Bas. Nous maintenons des relations directes avec nos cultivateurs.",
        detail: "Notre chanvre pousse dans un sol alpin riche en mineraux a plus de 600 metres d'altitude, ou l'air pur et l'exposition naturelle aux UV produisent des plantes exceptionnelles."
      },
      {
        title: "Tests de Laboratoire",
        shortDesc: "Triple test par des laboratoires accredites",
        longDesc: "Nous collaborons avec trois laboratoires independants accredites pour tester chaque lot de maniere exhaustive.",
        detail: "Notre protocole de test depasse les standards de l'industrie: analyse HPLC, profilage GC-MS et detection ICP-MS."
      },
      {
        title: "Livraison Discrete 24h",
        shortDesc: "Livraison suivie gratuite en Europe",
        longDesc: "Votre commande est expediee en emballage discret sous 24 heures. Livraison suivie dans 27 pays europeens.",
        detail: "Tous les envois incluent un emballage a temperature controlee. Nous compensons 200% de notre empreinte carbone logistique."
      },
      {
        title: "Conseils Experts CBD",
        shortDesc: "Specialistes certifies, consultations gratuites",
        longDesc: "Nos specialistes CBD detiennent des certifications de l'Association Europeenne du Chanvre Industriel.",
        detail: "Chaque specialiste complete plus de 120 heures de formation en science des cannabinoides et coaching bien-etre."
      },
    ],
    processEyebrow: "Notre Processus",
    processTitle: "De la graine a votre porte",
    processSubtitle: "Un parcours meticuleux qui garantit que chaque goutte et chaque fleur repond aux plus hauts standards europeens.",
    steps: [
      { num: "01", title: "Culture Biologique", desc: "Nos fermes partenaires cultivent des varietes de chanvre patrimoniales dans un sol alpin riche en mineraux." },
      { num: "02", title: "Extraction CO2", desc: "Des installations d'extraction CO2 supercritique de pointe traitent le chanvre a des temperatures et pressions controlees." },
      { num: "03", title: "Triple Test", desc: "Chaque lot est envoye a trois laboratoires independants pour une analyse complete." },
      { num: "04", title: "Formulation Experte", desc: "Notre equipe de pharmaciens et scientifiques cree des produits optimises pour la biodisponibilite." },
    ],
  },
};

const ICONS = [Leaf, FlaskConical, Truck, Award];

export function Features({ locale }: FeaturesProps) {
  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;
  const data = FEATURE_DATA[locale] || FEATURE_DATA.en;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-16 lg:mb-20 max-w-3xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-4 block">
            {data.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light tracking-tight mb-4 sm:mb-6 text-balance">
            {data.title}
          </h2>
          <p className="text-muted-foreground font-light leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        {/* Interactive Features - Accordion style */}
        <div className="max-w-4xl mx-auto mb-24 lg:mb-32">
          {data.features.map((feature, index) => {
            const Icon = ICONS[index];
            const isExpanded = expandedIndex === index;
            return (
              <article 
                key={index} 
                className="border-b border-border/50 last:border-0"
              >
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="w-full py-5 sm:py-8 flex items-center gap-4 sm:gap-6 text-left group cursor-pointer"
                >
                  <div className={cn(
                    "w-10 h-10 sm:w-14 sm:h-14 border flex items-center justify-center flex-shrink-0 transition-all duration-300",
                    isExpanded ? "bg-primary border-primary" : "border-border bg-secondary group-hover:border-primary/50"
                  )}>
                    <Icon className={cn(
                      "h-5 w-5 transition-colors duration-300",
                      isExpanded ? "text-primary-foreground" : "text-foreground/60"
                    )} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm uppercase tracking-[0.15em] font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground font-light">{feature.shortDesc}</p>
                  </div>
                  <ChevronRight className={cn(
                    "h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-300",
                    isExpanded && "rotate-90"
                  )} />
                </button>
                <div className={cn(
                  "overflow-hidden transition-all duration-500",
                  isExpanded ? "max-h-96 pb-8" : "max-h-0"
                )}>
                  <div className="pl-4 sm:pl-20 pr-4 sm:pr-8 space-y-4">
                    <p className="text-muted-foreground font-light leading-relaxed">{feature.longDesc}</p>
                    <p className="text-sm text-muted-foreground/70 font-light leading-relaxed">{feature.detail}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Process timeline */}
        <div className="relative">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-4 block">
              {data.processEyebrow}
            </span>
            <h2 className="text-3xl lg:text-4xl font-serif font-light tracking-tight mb-4">
              {data.processTitle}
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed">
              {data.processSubtitle}
            </p>
          </div>

          {/* Timeline */}
          <div className="relative max-w-5xl mx-auto">
            {/* Vertical line on desktop */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/50 hidden lg:block" />
            
            {data.steps.map((step, index) => (
              <div key={index} className={cn(
                "relative grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16 last:mb-0",
                index % 2 === 0 ? "lg:text-right" : ""
              )}>
                {/* Step number marker */}
                <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-background border border-border flex items-center justify-center z-10 hidden lg:flex">
                  <span className="text-sm font-serif text-primary/60">{step.num}</span>
                </div>

                {/* Content */}
                <div className={cn(
                  "lg:pr-16",
                  index % 2 !== 0 && "lg:col-start-2 lg:pl-16 lg:pr-0 lg:text-left"
                )}>
                  <div className="flex items-center gap-4 mb-4 lg:hidden">
                    <span className="text-3xl font-serif font-light text-primary/30">{step.num}</span>
                    <div className="h-px flex-1 bg-border/30" />
                  </div>
                  <h3 className="text-sm uppercase tracking-[0.15em] font-medium mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">{step.desc}</p>
                </div>

                {/* Empty space for alternating layout */}
                {index % 2 === 0 && <div className="hidden lg:block" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
