import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/store/header";
import { Footer } from "@/components/store/footer";
import { Logo } from "@/components/store/logo";
import { SUPPORTED_LOCALES, TRANSLATIONS, type Locale } from "@/lib/seo-data";
import { Leaf, FlaskConical, Heart, Shield, Award, Users } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const ABOUT_CONTENT: Record<string, {
  hero: { eyebrow: string; title: string; subtitle: string };
  mission: { eyebrow: string; title: string; text1: string; text2: string; text3: string };
  values: { title: string; subtitle: string; items: { icon: string; title: string; desc: string }[] };
  process: { eyebrow: string; title: string; subtitle: string; steps: { num: string; title: string; desc: string }[] };
  quality: { eyebrow: string; title: string; text: string; stats: { value: string; label: string }[] };
  cta: { title: string; subtitle: string; button: string };
}> = {
  en: {
    hero: {
      eyebrow: "Our Story",
      title: "Crafted with intention, delivered with care",
      subtitle: "CBD Boutique was founded on the belief that premium wellness products should be accessible, transparent, and rigorously tested. We bridge the gap between traditional herbal wisdom and modern scientific standards, bringing you the finest CBD products Europe has to offer."
    },
    mission: {
      eyebrow: "Our Mission",
      title: "Where nature meets science",
      text1: "Our journey began in 2019 when our founders, passionate about natural wellness and frustrated by the lack of quality standards in the CBD industry, set out to create something different. They traveled across Europe visiting hemp farms, extraction facilities, and research laboratories to understand what truly makes a premium CBD product.",
      text2: "What they discovered was remarkable: the best CBD comes from organically grown European hemp, carefully extracted using supercritical CO2 methods, and rigorously tested by independent laboratories. This became the foundation of CBD Boutique's promise to our customers.",
      text3: "Today, we work directly with a network of certified organic farms across Switzerland, Italy, and the Netherlands. Every product in our collection undergoes a minimum of three independent lab tests before it reaches your hands, ensuring purity, potency, and safety at every step."
    },
    values: {
      title: "Our Core Values",
      subtitle: "These principles guide every decision we make, from sourcing to shipping.",
      items: [
        { icon: "leaf", title: "Organic Origins", desc: "We source exclusively from EU-certified organic hemp farms. No pesticides, no herbicides, no synthetic fertilizers. Just pure, naturally grown hemp that produces the richest cannabinoid profiles." },
        { icon: "flask", title: "Scientific Rigor", desc: "Every batch is tested by accredited third-party laboratories for cannabinoid content, terpene profiles, heavy metals, pesticides, and microbial contamination. Full COA reports are available for every product." },
        { icon: "heart", title: "Wellness First", desc: "We formulate our products based on the latest CBD research and clinical studies. Our team includes pharmacists and wellness experts who ensure optimal bioavailability and efficacy in every formulation." },
        { icon: "shield", title: "Full Transparency", desc: "From seed to shelf, we maintain complete traceability. Scan any product's QR code to see its full journey: the farm it came from, the extraction date, and its complete lab analysis." },
        { icon: "award", title: "Premium Extraction", desc: "We exclusively use supercritical CO2 extraction, the gold standard in the industry. This preserves the full spectrum of cannabinoids, terpenes, and flavonoids while leaving zero solvent residues." },
        { icon: "users", title: "Expert Guidance", desc: "Our in-house CBD specialists are certified through the European CBD Association. They provide free, personalized consultations to help you find the right product, dosage, and routine for your needs." }
      ]
    },
    process: {
      eyebrow: "Our Process",
      title: "From seed to serenity",
      subtitle: "A meticulous four-stage process ensures every product meets our exacting standards.",
      steps: [
        { num: "01", title: "Cultivation", desc: "Our partner farms in Switzerland and Italy grow organic hemp varieties specifically selected for their rich cannabinoid and terpene content. Grown in mineral-rich Alpine soil without pesticides or synthetic inputs." },
        { num: "02", title: "Extraction", desc: "State-of-the-art supercritical CO2 extraction facilities process the harvested hemp. This method preserves the plant's full spectrum of beneficial compounds while ensuring absolute purity, with zero solvent residues." },
        { num: "03", title: "Testing", desc: "Every extraction batch undergoes comprehensive testing by accredited independent laboratories. We test for cannabinoid potency, terpene profile, heavy metals, pesticides, residual solvents, and microbial contamination." },
        { num: "04", title: "Formulation", desc: "Our team of pharmacists and formulation experts create products optimized for bioavailability. We use premium carrier oils, natural flavors, and precise cannabinoid ratios to deliver consistent, effective results." }
      ]
    },
    quality: {
      eyebrow: "Our Commitment",
      title: "Quality without compromise",
      text: "We believe quality CBD shouldn't require a leap of faith. That's why we publish every lab result, trace every ingredient, and stand behind every product with our 30-day satisfaction guarantee. When you shop with CBD Boutique, you're choosing a partner who values your wellness as much as you do.",
      stats: [
        { value: "50,000+", label: "Customers Served" },
        { value: "99.7%", label: "Purity Standard" },
        { value: "3x", label: "Lab Tested" },
        { value: "30-Day", label: "Guarantee" },
      ]
    },
    cta: {
      title: "Experience the CBD Boutique difference",
      subtitle: "Browse our curated collection of premium, lab-tested CBD products and discover natural wellness that meets the highest European standards.",
      button: "Shop Collection"
    }
  },
  es: {
    hero: {
      eyebrow: "Nuestra Historia",
      title: "Creado con intencion, entregado con cuidado",
      subtitle: "CBD Boutique nacio de la creencia de que los productos de bienestar premium deben ser accesibles, transparentes y rigurosamente testados. Unimos la sabiduria herbal tradicional con los estandares cientificos modernos, trayendote los mejores productos CBD que Europa puede ofrecer."
    },
    mission: {
      eyebrow: "Nuestra Mision",
      title: "Donde la naturaleza se encuentra con la ciencia",
      text1: "Nuestro viaje comenzo en 2019 cuando nuestros fundadores, apasionados por el bienestar natural y frustrados por la falta de estandares de calidad en la industria del CBD, decidieron crear algo diferente. Viajaron por Europa visitando granjas de canamo, instalaciones de extraccion y laboratorios de investigacion.",
      text2: "Lo que descubrieron fue notable: el mejor CBD proviene de canamo europeo cultivado organicamente, extraido cuidadosamente con metodos de CO2 supercritico y rigurosamente testado por laboratorios independientes.",
      text3: "Hoy trabajamos directamente con una red de granjas organicas certificadas en Suiza, Italia y los Paises Bajos. Cada producto pasa por un minimo de tres pruebas de laboratorio independientes antes de llegar a tus manos."
    },
    values: {
      title: "Nuestros Valores Fundamentales",
      subtitle: "Estos principios guian cada decision que tomamos, desde el abastecimiento hasta el envio.",
      items: [
        { icon: "leaf", title: "Origenes Organicos", desc: "Utilizamos exclusivamente canamo de granjas organicas certificadas por la UE. Sin pesticidas, sin herbicidas, sin fertilizantes sinteticos. Solo canamo puro cultivado naturalmente." },
        { icon: "flask", title: "Rigor Cientifico", desc: "Cada lote es analizado por laboratorios independientes acreditados para contenido de cannabinoides, perfil de terpenos, metales pesados, pesticidas y contaminacion microbiana." },
        { icon: "heart", title: "Bienestar Primero", desc: "Formulamos basandonos en las ultimas investigaciones y estudios clinicos. Nuestro equipo incluye farmaceuticos y expertos en bienestar que aseguran la biodisponibilidad optima." },
        { icon: "shield", title: "Transparencia Total", desc: "De la semilla al estante, mantenemos trazabilidad completa. Escanea el codigo QR de cualquier producto para ver su viaje completo." },
        { icon: "award", title: "Extraccion Premium", desc: "Usamos exclusivamente extraccion CO2 supercritica, el estandar de oro de la industria. Esto preserva el espectro completo de cannabinoides y terpenos." },
        { icon: "users", title: "Guia Experta", desc: "Nuestros especialistas en CBD estan certificados por la Asociacion Europea de CBD. Ofrecen consultas gratuitas y personalizadas." }
      ]
    },
    process: {
      eyebrow: "Nuestro Proceso",
      title: "De la semilla a la serenidad",
      subtitle: "Un proceso meticuloso en cuatro etapas asegura que cada producto cumpla nuestros estandares.",
      steps: [
        { num: "01", title: "Cultivo", desc: "Nuestras granjas asociadas en Suiza e Italia cultivan variedades de canamo organico seleccionadas por su rico contenido de cannabinoides y terpenos." },
        { num: "02", title: "Extraccion", desc: "Instalaciones de extraccion CO2 supercritica de ultima generacion procesan el canamo cosechado, preservando el espectro completo de compuestos beneficiosos." },
        { num: "03", title: "Analisis", desc: "Cada lote de extraccion se somete a pruebas exhaustivas por laboratorios independientes acreditados." },
        { num: "04", title: "Formulacion", desc: "Nuestro equipo de farmaceuticos y expertos crea productos optimizados para la biodisponibilidad." }
      ]
    },
    quality: {
      eyebrow: "Nuestro Compromiso",
      title: "Calidad sin compromisos",
      text: "Creemos que el CBD de calidad no deberia requerir un acto de fe. Por eso publicamos cada resultado de laboratorio, rastreamos cada ingrediente y respaldamos cada producto con nuestra garantia de satisfaccion de 30 dias.",
      stats: [
        { value: "50.000+", label: "Clientes Atendidos" },
        { value: "99.7%", label: "Estandar de Pureza" },
        { value: "3x", label: "Testado en Lab" },
        { value: "30 Dias", label: "Garantia" },
      ]
    },
    cta: {
      title: "Experimenta la diferencia CBD Boutique",
      subtitle: "Explora nuestra coleccion curada de productos CBD premium y testados en laboratorio.",
      button: "Ver Coleccion"
    }
  },
  de: {
    hero: {
      eyebrow: "Unsere Geschichte",
      title: "Mit Absicht gefertigt, mit Sorgfalt geliefert",
      subtitle: "CBD Boutique wurde mit der Uberzeugung gegrundet, dass Premium-Wellness-Produkte zuganglich, transparent und rigoros getestet sein sollten."
    },
    mission: {
      eyebrow: "Unsere Mission",
      title: "Wo Natur auf Wissenschaft trifft",
      text1: "Unsere Reise begann 2019, als unsere Grunder, leidenschaftlich fur naturliches Wohlbefinden, sich aufmachten, etwas Anderes zu schaffen.",
      text2: "Was sie entdeckten war bemerkenswert: Das beste CBD kommt von biologisch angebautem europaischem Hanf.",
      text3: "Heute arbeiten wir direkt mit einem Netzwerk zertifizierter Bio-Farmen in der Schweiz, Italien und den Niederlanden zusammen."
    },
    values: {
      title: "Unsere Kernwerte",
      subtitle: "Diese Prinzipien leiten jede Entscheidung, die wir treffen.",
      items: [
        { icon: "leaf", title: "Bio-Ursprunge", desc: "100% biologisch angebauter Hanf von EU-zertifizierten Farmen ohne Pestizide oder synthetische Dungemittel." },
        { icon: "flask", title: "Wissenschaftliche Strenge", desc: "Jede Charge wird von akkreditierten Drittlaboren auf Cannabinoidgehalt, Terpenprofil und Verunreinigungen getestet." },
        { icon: "heart", title: "Wellness Zuerst", desc: "Formuliert basierend auf den neuesten CBD-Forschungen und klinischen Studien fur optimale Bioverfugbarkeit." },
        { icon: "shield", title: "Volle Transparenz", desc: "Vollstandige Ruckverfolgbarkeit von der Saat bis zum Regal. QR-Code scannen fur den kompletten Produktweg." },
        { icon: "award", title: "Premium-Extraktion", desc: "Ausschliesslich uberkritische CO2-Extraktion, der Goldstandard der Branche." },
        { icon: "users", title: "Expertenberatung", desc: "Unsere CBD-Spezialisten bieten kostenlose, personalisierte Beratungen an." }
      ]
    },
    process: {
      eyebrow: "Unser Prozess",
      title: "Vom Samen zur Gelassenheit",
      subtitle: "Ein sorgfaltiger vierstufiger Prozess sichert hochste Qualitatsstandards.",
      steps: [
        { num: "01", title: "Anbau", desc: "Biologischer Hanf aus der Schweiz und Italien, ausgewahlt fur reichen Cannabinoid- und Terpengehalt." },
        { num: "02", title: "Extraktion", desc: "Modernste uberkritische CO2-Extraktion bewahrt das volle Spektrum nutzlicher Verbindungen." },
        { num: "03", title: "Prufung", desc: "Umfassende Tests durch akkreditierte unabhangige Labore." },
        { num: "04", title: "Formulierung", desc: "Experten-Team optimiert Produkte fur maximale Bioverfugbarkeit." }
      ]
    },
    quality: {
      eyebrow: "Unser Engagement",
      title: "Qualitat ohne Kompromisse",
      text: "Jedes Laborergebnis wird veroffentlicht, jede Zutat wird ruckverfolgt. 30-Tage-Zufriedenheitsgarantie auf alle Produkte.",
      stats: [
        { value: "50.000+", label: "Kunden Bedient" },
        { value: "99.7%", label: "Reinheitsstandard" },
        { value: "3x", label: "Laborgetestet" },
        { value: "30 Tage", label: "Garantie" },
      ]
    },
    cta: {
      title: "Erleben Sie den CBD Boutique Unterschied",
      subtitle: "Entdecken Sie unsere kuratierte Kollektion premium CBD-Produkte.",
      button: "Kollektion Ansehen"
    }
  },
  fr: {
    hero: {
      eyebrow: "Notre Histoire",
      title: "Cree avec intention, livre avec soin",
      subtitle: "CBD Boutique a ete fondee sur la conviction que les produits de bien-etre premium doivent etre accessibles, transparents et rigoureusement testes."
    },
    mission: {
      eyebrow: "Notre Mission",
      title: "Ou la nature rencontre la science",
      text1: "Notre voyage a commence en 2019 quand nos fondateurs ont decide de creer quelque chose de different dans l'industrie du CBD.",
      text2: "Ce qu'ils ont decouvert etait remarquable: le meilleur CBD provient de chanvre europeen biologique.",
      text3: "Aujourd'hui, nous travaillons directement avec un reseau de fermes bio certifiees en Suisse, Italie et aux Pays-Bas."
    },
    values: {
      title: "Nos Valeurs Fondamentales",
      subtitle: "Ces principes guident chaque decision, de l'approvisionnement a la livraison.",
      items: [
        { icon: "leaf", title: "Origines Bio", desc: "Chanvre exclusivement issu de fermes biologiques certifiees UE. Sans pesticides ni engrais synthetiques." },
        { icon: "flask", title: "Rigueur Scientifique", desc: "Chaque lot teste par des laboratoires tiers accredites pour le contenu en cannabinoides et les contaminants." },
        { icon: "heart", title: "Bien-etre d'Abord", desc: "Formules basees sur les dernieres recherches CBD pour une biodisponibilite optimale." },
        { icon: "shield", title: "Transparence Totale", desc: "Tracabilite complete de la graine au produit fini. Scannez le QR code pour le parcours complet." },
        { icon: "award", title: "Extraction Premium", desc: "Exclusivement extraction CO2 supercritique, le standard d'or de l'industrie." },
        { icon: "users", title: "Conseils Experts", desc: "Nos specialistes CBD certifies offrent des consultations gratuites et personnalisees." }
      ]
    },
    process: {
      eyebrow: "Notre Processus",
      title: "De la graine a la serenite",
      subtitle: "Un processus meticuleux en quatre etapes garantit les plus hauts standards.",
      steps: [
        { num: "01", title: "Culture", desc: "Chanvre bio de Suisse et d'Italie, selectionne pour sa richesse en cannabinoides et terpenes." },
        { num: "02", title: "Extraction", desc: "Extraction CO2 supercritique de pointe preservant le spectre complet des composes benefiques." },
        { num: "03", title: "Tests", desc: "Tests complets par des laboratoires independants accredites." },
        { num: "04", title: "Formulation", desc: "Equipe d'experts optimisant la biodisponibilite de chaque produit." }
      ]
    },
    quality: {
      eyebrow: "Notre Engagement",
      title: "Qualite sans compromis",
      text: "Chaque resultat de laboratoire est publie, chaque ingredient est trace. Garantie satisfaction 30 jours sur tous les produits.",
      stats: [
        { value: "50 000+", label: "Clients Servis" },
        { value: "99.7%", label: "Standard de Purete" },
        { value: "3x", label: "Teste en Labo" },
        { value: "30 Jours", label: "Garantie" },
      ]
    },
    cta: {
      title: "Decouvrez la difference CBD Boutique",
      subtitle: "Explorez notre collection de produits CBD premium et testes en laboratoire.",
      button: "Voir la Collection"
    }
  }
};

function getIcon(name: string) {
  switch (name) {
    case 'leaf': return Leaf;
    case 'flask': return FlaskConical;
    case 'heart': return Heart;
    case 'shield': return Shield;
    case 'award': return Award;
    case 'users': return Users;
    default: return Leaf;
  }
}

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};
  const content = ABOUT_CONTENT[locale] || ABOUT_CONTENT.en;
  
  return {
    title: `About | CBD Boutique`,
    description: content.hero.subtitle,
    alternates: { canonical: `/${locale}/about` },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();
  
  const validLocale = locale as Locale;
  const content = ABOUT_CONTENT[locale] || ABOUT_CONTENT.en;

  return (
    <main className="min-h-screen bg-background">
      <Header locale={validLocale} transparent />
      
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1617101815102-e5728e6685fc?w=1920&h=1080&fit=crop"
            alt="Organic hemp field in European countryside"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-foreground/50" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
          <span className="text-[10px] uppercase tracking-[0.4em] text-primary-foreground/70 mb-6 block">
            {content.hero.eyebrow}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight mb-8 leading-tight text-primary-foreground">
            {content.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/70 font-light max-w-2xl mx-auto leading-relaxed">
            {content.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6 block">
                {content.mission.eyebrow}
              </span>
              <h2 className="text-3xl lg:text-4xl font-serif font-light tracking-tight mb-8">
                {content.mission.title}
              </h2>
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed font-light">
                  {content.mission.text1}
                </p>
                <p className="text-muted-foreground leading-relaxed font-light">
                  {content.mission.text2}
                </p>
                <p className="text-muted-foreground leading-relaxed font-light">
                  {content.mission.text3}
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=800&h=1000&fit=crop"
                alt="Premium CBD oil extraction process"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-secondary/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-serif font-light tracking-tight mb-4">
              {content.values.title}
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed">{content.values.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {content.values.items.map((value, index) => {
              const IconComponent = getIcon(value.icon);
              return (
                <article key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 mb-6 border border-border bg-background">
                    <IconComponent className="h-6 w-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm uppercase tracking-[0.15em] font-medium mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    {value.desc}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
              {content.process.eyebrow}
            </span>
            <h2 className="text-3xl lg:text-4xl font-serif font-light tracking-tight mb-4">
              {content.process.title}
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed">{content.process.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {content.process.steps.map((step, index) => (
              <article key={index} className="relative">
                <div className="text-5xl font-serif font-light text-primary/20 mb-4">
                  {step.num}
                </div>
                <h3 className="text-sm uppercase tracking-[0.15em] font-medium mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  {step.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Commitment */}
      <section className="py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary-foreground/60 mb-6 block">
              {content.quality.eyebrow}
            </span>
            <h2 className="text-3xl lg:text-5xl font-serif font-light tracking-tight mb-8">
              {content.quality.title}
            </h2>
            <p className="text-lg text-primary-foreground/70 font-light leading-relaxed">
              {content.quality.text}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {content.quality.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl lg:text-4xl font-serif font-light mb-2">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <Logo className="justify-center mb-8" />
          <h2 className="text-3xl lg:text-4xl font-serif font-light tracking-tight mb-4">
            {content.cta.title}
          </h2>
          <p className="text-muted-foreground mb-10 font-light max-w-xl mx-auto leading-relaxed">
            {content.cta.subtitle}
          </p>
          <Link 
            href={`/${locale}/cbd-oil`}
            className="inline-flex items-center justify-center h-14 px-12 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] font-medium hover:bg-primary/90 transition-colors"
          >
            {content.cta.button}
          </Link>
        </div>
      </section>

      <Footer locale={validLocale} />
    </main>
  );
}
