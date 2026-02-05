import { Droplets, Brain, Moon, Activity, ShieldCheck, Sparkles } from "lucide-react";
import { type Locale } from "@/lib/seo-data";

interface CBDEducationProps {
  locale: Locale;
}

const EDUCATION_CONTENT: Record<string, {
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string;
  whatIsCbd: { title: string; text: string };
  benefits: { icon: string; title: string; desc: string }[];
  spectrumTitle: string;
  spectrumSubtitle: string;
  spectrums: { name: string; desc: string }[];
  dosageTitle: string;
  dosageText: string;
  disclaimer: string;
}> = {
  en: {
    eyebrow: "CBD Education",
    title: "Understanding CBD",
    subtitle: "Everything you need to know about cannabidiol and how it can support your wellness journey",
    intro: "Cannabidiol (CBD) is one of over 100 naturally occurring cannabinoids found in the Cannabis sativa plant. Unlike THC, CBD is non-psychoactive and is legal across the European Union when extracted from industrial hemp containing less than 0.2% THC. Research into CBD has expanded significantly, with studies exploring its potential to support overall wellbeing.",
    whatIsCbd: {
      title: "What is CBD?",
      text: "CBD interacts with the body's endocannabinoid system (ECS), a complex cell-signaling network that plays a role in regulating sleep, mood, appetite, immune function, and homeostasis. The ECS contains receptors (CB1 and CB2) distributed throughout the body. CBD's interaction with these receptors, along with other molecular pathways, is what researchers believe contributes to its wide range of potential wellness applications."
    },
    benefits: [
      { icon: "droplets", title: "Natural Plant Extract", desc: "CBD is extracted from organically grown European hemp using supercritical CO2 methods, preserving the full spectrum of beneficial cannabinoids, terpenes, and flavonoids without harmful solvents." },
      { icon: "brain", title: "Endocannabinoid System", desc: "CBD supports the body's endocannabinoid system, helping maintain homeostasis. The ECS regulates critical functions including sleep-wake cycles, mood, immune response, and inflammatory processes." },
      { icon: "moon", title: "Daily Wellness Routine", desc: "Many users incorporate CBD into their daily wellness rituals, finding that consistent use supports a sense of calm and balance. CBD oils can be taken sublingually for faster absorption, while edibles offer a convenient alternative." },
      { icon: "activity", title: "Bioavailability Matters", desc: "Different consumption methods offer varying bioavailability rates. Sublingual oils absorb at approximately 20-30%, while topical applications target specific areas. Our formulations are optimized with carrier oils to enhance absorption." },
      { icon: "shield", title: "Safety & Research", desc: "The World Health Organization has recognized CBD as generally well-tolerated with a good safety profile. Ongoing clinical trials continue to explore CBD's potential applications in supporting overall wellness and quality of life." },
      { icon: "sparkles", title: "Entourage Effect", desc: "Full-spectrum CBD products contain a complete range of cannabinoids, terpenes, and flavonoids that work synergistically. This 'entourage effect' means the combined compounds may be more effective than CBD isolate alone." },
    ],
    spectrumTitle: "Understanding CBD Spectrums",
    spectrumSubtitle: "Choosing the right spectrum type is essential for your wellness goals.",
    spectrums: [
      { name: "Full Spectrum", desc: "Contains all naturally occurring cannabinoids (including trace THC below 0.2%), terpenes, and flavonoids. Offers the full entourage effect for maximum potential benefits. Best for experienced users seeking comprehensive wellness support." },
      { name: "Broad Spectrum", desc: "Contains multiple cannabinoids and terpenes but with THC completely removed. Provides most of the entourage effect without any THC. Ideal for those who want enhanced benefits but zero THC exposure." },
      { name: "CBD Isolate", desc: "Pure CBD in crystalline form, containing 99%+ cannabidiol with no other cannabinoids or terpenes. THC-free and flavorless. Perfect for those seeking precise CBD dosing or who are sensitive to other cannabinoids." },
    ],
    dosageTitle: "Finding Your Optimal Dosage",
    dosageText: "CBD dosage varies based on individual factors including body weight, metabolism, the condition being addressed, and product concentration. We recommend starting with a low dose (10-15mg daily) and gradually increasing over two to three weeks until you find your optimal level. Our CBD specialists offer free consultations to help you determine the right starting point and product for your specific needs.",
    disclaimer: "Disclaimer: CBD products sold by CBD Boutique are food supplements and are not intended to diagnose, treat, cure, or prevent any disease. Always consult your healthcare provider before starting any new supplement, especially if you are pregnant, nursing, or taking medication.",
  },
  es: {
    eyebrow: "Educacion CBD",
    title: "Entendiendo el CBD",
    subtitle: "Todo lo que necesitas saber sobre el cannabidiol y como puede apoyar tu bienestar",
    intro: "El cannabidiol (CBD) es uno de los mas de 100 cannabinoides que se encuentran de forma natural en la planta Cannabis sativa. A diferencia del THC, el CBD no es psicoactivo y es legal en toda la Union Europea cuando se extrae de canamo industrial con menos del 0.2% de THC. La investigacion sobre el CBD se ha expandido significativamente, con estudios que exploran su potencial para apoyar el bienestar general.",
    whatIsCbd: {
      title: "Que es el CBD?",
      text: "El CBD interactua con el sistema endocannabinoide del cuerpo (SEC), una compleja red de senalizacion celular que desempena un papel en la regulacion del sueno, el estado de animo, el apetito, la funcion inmunitaria y la homeostasis. El SEC contiene receptores (CB1 y CB2) distribuidos por todo el cuerpo. La interaccion del CBD con estos receptores es lo que los investigadores creen que contribuye a sus posibles aplicaciones de bienestar."
    },
    benefits: [
      { icon: "droplets", title: "Extracto Vegetal Natural", desc: "El CBD se extrae de canamo europeo cultivado organicamente usando metodos de CO2 supercritico, preservando el espectro completo de cannabinoides, terpenos y flavonoides beneficiosos." },
      { icon: "brain", title: "Sistema Endocannabinoide", desc: "El CBD apoya el sistema endocannabinoide del cuerpo, ayudando a mantener la homeostasis. El SEC regula funciones criticas como los ciclos sueno-vigilia, el estado de animo y la respuesta inmune." },
      { icon: "moon", title: "Rutina Diaria de Bienestar", desc: "Muchos usuarios incorporan el CBD a sus rituales diarios de bienestar, encontrando que el uso consistente apoya una sensacion de calma y equilibrio." },
      { icon: "activity", title: "La Biodisponibilidad Importa", desc: "Los diferentes metodos de consumo ofrecen tasas de biodisponibilidad variables. Los aceites sublinguales se absorben aproximadamente al 20-30%, mientras que las aplicaciones topicas se dirigen a areas especificas." },
      { icon: "shield", title: "Seguridad e Investigacion", desc: "La Organizacion Mundial de la Salud ha reconocido que el CBD es generalmente bien tolerado con un buen perfil de seguridad. Los ensayos clinicos continuan explorando sus aplicaciones potenciales." },
      { icon: "sparkles", title: "Efecto Sequito", desc: "Los productos CBD de espectro completo contienen una gama completa de cannabinoides, terpenos y flavonoides que trabajan sinergicamente. Este 'efecto sequito' significa que los compuestos combinados pueden ser mas efectivos." },
    ],
    spectrumTitle: "Entendiendo los Espectros CBD",
    spectrumSubtitle: "Elegir el tipo de espectro correcto es esencial para tus objetivos de bienestar.",
    spectrums: [
      { name: "Espectro Completo", desc: "Contiene todos los cannabinoides naturales (incluido THC traza por debajo del 0.2%), terpenos y flavonoides. Ofrece el efecto sequito completo. Ideal para usuarios experimentados." },
      { name: "Espectro Amplio", desc: "Contiene multiples cannabinoides y terpenos pero con THC completamente eliminado. Proporciona la mayoria del efecto sequito sin ningun THC." },
      { name: "Aislado de CBD", desc: "CBD puro en forma cristalina, con mas del 99% de cannabidiol. Sin THC y sin sabor. Perfecto para quienes buscan una dosificacion precisa de CBD." },
    ],
    dosageTitle: "Encontrar tu Dosis Optima",
    dosageText: "La dosificacion de CBD varia segun factores individuales como el peso corporal, el metabolismo y la concentracion del producto. Recomendamos comenzar con una dosis baja (10-15mg diarios) y aumentar gradualmente durante dos a tres semanas. Nuestros especialistas en CBD ofrecen consultas gratuitas.",
    disclaimer: "Aviso: Los productos CBD vendidos por CBD Boutique son suplementos alimenticios y no estan destinados a diagnosticar, tratar, curar o prevenir ninguna enfermedad. Consulte siempre a su proveedor de atencion medica.",
  },
  de: {
    eyebrow: "CBD Wissen",
    title: "CBD verstehen",
    subtitle: "Alles was Sie uber Cannabidiol wissen mussen und wie es Ihr Wohlbefinden unterstutzen kann",
    intro: "Cannabidiol (CBD) ist eines von uber 100 naturlich vorkommenden Cannabinoiden in der Cannabis sativa Pflanze. Im Gegensatz zu THC ist CBD nicht psychoaktiv und ist in der gesamten Europaischen Union legal, wenn es aus Industriehanf mit weniger als 0.2% THC extrahiert wird.",
    whatIsCbd: {
      title: "Was ist CBD?",
      text: "CBD interagiert mit dem Endocannabinoid-System des Korpers, einem komplexen Zellsignalnetzwerk, das eine Rolle bei der Regulierung von Schlaf, Stimmung, Appetit, Immunfunktion und Homoostase spielt."
    },
    benefits: [
      { icon: "droplets", title: "Naturlicher Pflanzenextrakt", desc: "CBD wird aus biologisch angebautem europaischem Hanf mittels uberkritischer CO2-Methoden extrahiert." },
      { icon: "brain", title: "Endocannabinoid-System", desc: "CBD unterstutzt das Endocannabinoid-System des Korpers und hilft bei der Aufrechterhaltung der Homoostase." },
      { icon: "moon", title: "Tagliche Wellness-Routine", desc: "Viele Nutzer integrieren CBD in ihre taglichen Wellness-Rituale fur ein Gefuhl von Ruhe und Balance." },
      { icon: "activity", title: "Bioverfugbarkeit zahlt", desc: "Verschiedene Konsummethoden bieten unterschiedliche Bioverfugbarkeitsraten. Unsere Formulierungen sind optimiert." },
      { icon: "shield", title: "Sicherheit & Forschung", desc: "Die WHO hat CBD als allgemein gut vertraglich mit gutem Sicherheitsprofil anerkannt." },
      { icon: "sparkles", title: "Entourage-Effekt", desc: "Vollspektrum-CBD-Produkte enthalten eine komplette Reihe von Cannabinoiden, die synergetisch wirken." },
    ],
    spectrumTitle: "CBD-Spektren verstehen",
    spectrumSubtitle: "Die Wahl des richtigen Spektrumtyps ist entscheidend fur Ihre Wellness-Ziele.",
    spectrums: [
      { name: "Vollspektrum", desc: "Enthalt alle naturlich vorkommenden Cannabinoide, Terpene und Flavonoide. Bietet den vollen Entourage-Effekt." },
      { name: "Breitspektrum", desc: "Enthalt mehrere Cannabinoide und Terpene, aber THC ist vollstandig entfernt." },
      { name: "CBD-Isolat", desc: "Reines CBD in kristalliner Form mit uber 99% Cannabidiol. THC-frei und geschmacksneutral." },
    ],
    dosageTitle: "Ihre optimale Dosierung finden",
    dosageText: "Die CBD-Dosierung variiert je nach individuellen Faktoren. Wir empfehlen, mit einer niedrigen Dosis (10-15mg taglich) zu beginnen und schrittweise uber zwei bis drei Wochen zu erhohen.",
    disclaimer: "Hinweis: CBD-Produkte von CBD Boutique sind Nahrungserganzungsmittel und nicht zur Diagnose, Behandlung oder Vorbeugung von Krankheiten bestimmt.",
  },
  fr: {
    eyebrow: "Education CBD",
    title: "Comprendre le CBD",
    subtitle: "Tout ce que vous devez savoir sur le cannabidiol et comment il peut soutenir votre bien-etre",
    intro: "Le cannabidiol (CBD) est l'un des plus de 100 cannabinoides naturellement presents dans la plante Cannabis sativa. Contrairement au THC, le CBD n'est pas psychoactif et est legal dans toute l'Union europeenne lorsqu'il est extrait de chanvre industriel contenant moins de 0.2% de THC.",
    whatIsCbd: {
      title: "Qu'est-ce que le CBD?",
      text: "Le CBD interagit avec le systeme endocannabinoide du corps, un reseau complexe de signalisation cellulaire qui joue un role dans la regulation du sommeil, de l'humeur, de l'appetit et de l'homeostasie."
    },
    benefits: [
      { icon: "droplets", title: "Extrait Vegetal Naturel", desc: "Le CBD est extrait de chanvre europeen biologique par des methodes de CO2 supercritique, preservant le spectre complet." },
      { icon: "brain", title: "Systeme Endocannabinoide", desc: "Le CBD soutient le systeme endocannabinoide du corps, aidant a maintenir l'homeostasie." },
      { icon: "moon", title: "Routine Bien-etre", desc: "De nombreux utilisateurs integrent le CBD dans leurs rituels quotidiens de bien-etre." },
      { icon: "activity", title: "La Biodisponibilite Compte", desc: "Les differentes methodes de consommation offrent des taux de biodisponibilite variables." },
      { icon: "shield", title: "Securite & Recherche", desc: "L'OMS a reconnu que le CBD est generalement bien tolere avec un bon profil de securite." },
      { icon: "sparkles", title: "Effet d'Entourage", desc: "Les produits CBD a spectre complet contiennent une gamme complete de cannabinoides qui fonctionnent en synergie." },
    ],
    spectrumTitle: "Comprendre les Spectres CBD",
    spectrumSubtitle: "Choisir le bon type de spectre est essentiel pour vos objectifs de bien-etre.",
    spectrums: [
      { name: "Spectre Complet", desc: "Contient tous les cannabinoides, terpenes et flavonoides naturels. Offre l'effet d'entourage complet." },
      { name: "Large Spectre", desc: "Contient plusieurs cannabinoides et terpenes mais avec le THC completement elimine." },
      { name: "Isolat de CBD", desc: "CBD pur sous forme cristalline a plus de 99% de cannabidiol. Sans THC et sans gout." },
    ],
    dosageTitle: "Trouver votre dosage optimal",
    dosageText: "Le dosage CBD varie selon les facteurs individuels. Nous recommandons de commencer par une faible dose (10-15mg par jour) et d'augmenter progressivement sur deux a trois semaines.",
    disclaimer: "Avertissement: Les produits CBD vendus par CBD Boutique sont des complements alimentaires et ne sont pas destines a diagnostiquer, traiter ou prevenir une maladie.",
  },
};

function getIcon(name: string) {
  switch (name) {
    case 'droplets': return Droplets;
    case 'brain': return Brain;
    case 'moon': return Moon;
    case 'activity': return Activity;
    case 'shield': return ShieldCheck;
    case 'sparkles': return Sparkles;
    default: return Droplets;
  }
}

export function CBDEducation({ locale }: CBDEducationProps) {
  const content = EDUCATION_CONTENT[locale] || EDUCATION_CONTENT.en;

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-4 block">
            {content.eyebrow}
          </span>
          <h2 className="text-3xl lg:text-5xl font-serif font-light tracking-tight mb-6 text-balance">
            {content.title}
          </h2>
          <p className="text-muted-foreground font-light leading-relaxed mb-6">
            {content.subtitle}
          </p>
          <p className="text-sm text-muted-foreground/70 font-light leading-relaxed">
            {content.intro}
          </p>
        </div>

        {/* What is CBD */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="border-l-2 border-primary/30 pl-8 py-4">
            <h3 className="text-xl font-serif font-light mb-4">{content.whatIsCbd.title}</h3>
            <p className="text-muted-foreground font-light leading-relaxed">{content.whatIsCbd.text}</p>
          </div>
        </div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 mb-24">
          {content.benefits.map((benefit, index) => {
            const IconComponent = getIcon(benefit.icon);
            return (
              <article key={index} className="group">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 border border-border bg-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                    <IconComponent className="h-5 w-5 text-foreground/60 group-hover:text-primary-foreground transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-light">{benefit.desc}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Spectrum types */}
        <div className="bg-secondary/50 p-10 lg:p-16 mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-serif font-light tracking-tight mb-3">{content.spectrumTitle}</h3>
            <p className="text-sm text-muted-foreground font-light">{content.spectrumSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {content.spectrums.map((spectrum, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 border border-primary/20 flex items-center justify-center">
                  <span className="text-2xl font-serif font-light text-primary/60">{index + 1}</span>
                </div>
                <h4 className="text-sm font-medium uppercase tracking-wider mb-3">{spectrum.name}</h4>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{spectrum.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dosage guidance */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h3 className="text-2xl font-serif font-light mb-4">{content.dosageTitle}</h3>
          <p className="text-muted-foreground font-light leading-relaxed">{content.dosageText}</p>
        </div>

        {/* Disclaimer */}
        <div className="max-w-3xl mx-auto text-center border-t border-border/50 pt-8">
          <p className="text-[11px] text-muted-foreground/50 font-light leading-relaxed italic">
            {content.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
